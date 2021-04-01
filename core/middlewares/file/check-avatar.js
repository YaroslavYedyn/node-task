const { ErrorHandler, errorMessages, errorCodes } = require('../../error');

module.exports = (req, res, next) => {
    try {
        const { photos } = req;

        if (photos.length > 1) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BODY_NOT_VALID.customCode, 'Body not valid!');
        }

        [req.avatar] = photos;
        next();
    } catch (e) {
        next(e);
    }
};
