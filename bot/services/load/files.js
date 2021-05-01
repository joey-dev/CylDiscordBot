const fs = require('fs');


const locationOfChangesFolder = "./changes/";

module.exports.run = async (client, services) => {
    try {
        fs.readdir(locationOfChangesFolder, (error, files) => {
            files.forEach(fileName => {
                fs.readFile(locationOfChangesFolder + fileName, fileData => {
                    const lines = fileData.split(/\r?\n/);
                    const firstLine = lines[0];
                    const fileLocation = firstLine.split("// location: ");

                    fs.unlink(fileLocation + fileName, () => {
                        fs.rename(locationOfChangesFolder + fileName, fileLocation + fileName, () => console.log("changed data of file:" + fileName));
                    });
                });
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}
