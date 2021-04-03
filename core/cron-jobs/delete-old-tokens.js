const dayjs = require('dayjs');

const { authService } = require('../services');

module.exports = async () => {
    const user = await authService.deleteToken({
        updatedAt: {
            $lte: dayjs(new Date())
                .subtract(10, 'day')
                .format()
        }
    });
    console.log(user);
};
