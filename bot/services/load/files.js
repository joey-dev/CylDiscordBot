const fs = require('fs');


const locationOfChangesFolder = "./changes/";

module.exports.run = async (client, services) => {
    try {
        fs.readdir(locationOfChangesFolder, (error, files) => {
            files.forEach(fileName => {
                fs.readFile(locationOfChangesFolder + fileName, "utf8", (error, fileData) => {
                    const lines = fileData.split(/\r?\n/);
                    const firstLine = lines[0];
                    const fileLocation = firstLine.split("// location: ")[1];
                    console.log(fileLocation);

                    fs.unlink(fileLocation + fileName, () => {
                        fs.rename(locationOfChangesFolder + fileName, fileLocation + fileName, () => {
                            console.log(locationOfChangesFolder + fileName);
                            console.log(fileLocation + fileName);
                            console.log("changed data of file: " + fileName)
                            fs.unlink(locationOfChangesFolder + fileName, () => console.log("old file deleted of: " + fileName));
                        });
                    });
                });
            });
        });
    }
    catch (e) {
        console.log(e);
    }
}
