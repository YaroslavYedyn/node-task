const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { ErrorHandler, errorMessages: { WRONG_MAIL_ACTION }, errorCodes } = require('../error');
const { EMAIL_ROOT, EMAIL_ROOT_PASSWORD } = require('../config/config');
const emailTemplates = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'core', 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ROOT,
        pass: EMAIL_ROOT_PASSWORD
    }
});

module.exports = {
    sendMail: async (userMail, action, context) => {
        try {
            const templateInfo = emailTemplates[action];

            if (!templateInfo) {
                throw new ErrorHandler(errorCodes.SERVER_ERROR, WRONG_MAIL_ACTION.customCode, 'Wrong mail action!');
            }

            const html = await templateParser.render(templateInfo.templateName, context);

            return transporter.sendMail({
                from: EMAIL_ROOT,
                to: userMail,
                subject: templateInfo.subject,
                html
            });
        } catch (e) {
            console.log(e);
        }
    }
};
