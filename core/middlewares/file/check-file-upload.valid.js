const {
    fileOptions: {
        PHOTO_MAX_SIZE, PHOTOS_MIMETYPES
    }
} = require('../../constants');
const { ErrorHandler, errorCodes, errorMessages: { FILE_NOT_VALID } } = require('../../error');

module.exports = (req, res, next) => {
    try {
        const { files } = req;
        const photos = [];

        if (files) {
            const allFiles = Object.values(files);
            for (let i = 0; i < allFiles.length; i++) {
                const { name, size, mimetype } = allFiles[i];
                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new ErrorHandler(errorCodes.BAD_REQUEST, FILE_NOT_VALID.customCode, `file ${name} is too big!`);
                    }
                    photos.push(allFiles[i]);
                }
            }
        }

        req.photos = photos;
        next();
    } catch (e) {
        next(e);
    }
};
