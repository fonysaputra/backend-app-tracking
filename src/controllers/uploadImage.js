
const upload = require("../middleware/uploads");
const fs = require("fs");

exports.uploadsImages = async (req, res) => {
    try {
        await upload(req, res);

        if (req.file == undefined) {
            return res.status(400).send(
                { code: 400, message: "Choose a file to upload", data: null }
            );
        }
        const fileName = req.file.originalname.toLowerCase().split(' ').join('-');
        const extFile = process.env.HOST + "/uploads/" + fileName
        res.status(200).send({
            code: 200, message: "Success Upload Images", data: { 
                filename: extFile,
                 originalname: fileName, 
                 encoding: "image", 
                 mimetype: req.file.mimetype,size:20,
                 path:process.env.HOST + "/uploads/", fieldname:"image"
                
                }
        });
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                code: 200, data: null, message: "File size should be less than 5MB",
            });
        }

        res.status(500).send({
            code: 200, data: null, message: `Error occured: ${err}`,
        });
    }
};


exports.getImages = async (req, res) => {
    const fileName = req.params.name;
    const path = __basedir + "/uploads/";

    res.download(path + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "File can not be downloaded: " + err,
            });
        }
    });
};
