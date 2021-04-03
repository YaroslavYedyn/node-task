const { authService } = require('../services');

module.exports = async () => {
    await authService.deleteToken({
        updatedAt: { $lte: new Date(new Date() - 240 * 60 * 60 * 100) }
    });
};
