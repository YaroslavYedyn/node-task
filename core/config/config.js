module.exports = {
    PORT: process.env.PORT || 5050,
    URL_MONGO: process.env.URL_MONGO || 'mongodb://localhost/test-node',

    CRON_JOB_PERIOD: process.env.CRON_JOB_PERIOD || '0 1 * * *',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000',

    EMAIL_ROOT: process.env.EMAIL_ROOT || 'test@gmail.com',
    EMAIL_ROOT_PASSWORD: process.env.EMAIL_ROOT_PASSWORD || 'test12345',
};
