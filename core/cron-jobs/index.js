const cron = require('node-cron');

const deleteOldTokens = require('./delete-old-tokens');

module.exports = () => {
    cron.schedule('0 1 * * *', async () => {
        await deleteOldTokens();
    });
};
