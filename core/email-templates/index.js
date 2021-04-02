const { emailActions } = require('../constants');

module.exports = {
    [emailActions.ACTIVATE]: {
        templateName: 'activate',
        subject: 'Activate your account'
    },
    [emailActions.FORGOT_PASSWORD]: {
        templateName: 'forgot',
        subject: 'Change password'
    }
};
