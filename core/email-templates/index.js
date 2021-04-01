const { emailActions } = require('../constants');

module.exports = {
    [emailActions.ACTIVATE]: {
        templateName: 'activate',
        subject: 'Activate your account'
    }
};
