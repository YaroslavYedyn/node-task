const path = require('path');
const uuid = require('uuid').v1;
const fs = require('fs-extra').promises;

module.exports = {
    downloadFile: async (file, fileType, pathFolderName) => {
        const pathWithoutStatic = path.join(pathFolderName, `${uuid()}`, fileType);
        const documentFolder = path.join(process.cwd(), 'core', 'static', pathWithoutStatic);

        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuid()}.${fileExtension}`;

        const pathDocument = path.join(documentFolder, fileName);
        const uploadPath = path.join(pathWithoutStatic, fileName);

        await fs.mkdir(documentFolder, { recursive: true });
        await file.mv(pathDocument);
        return uploadPath;
    },
    deleteFile: (filePath = '') => {
        const folder = path.join(process.cwd(), 'core', 'static', filePath);

        fs.rmdir(folder, {
            recursive: true,
        });
    }
};
