
const upload = require('./fileupload');
const singleUpload = upload.single('file');

const fileupload = function (req, res) {

    singleUpload(req, res, function (err) {

        if (err) {
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }

        return res.status(200).json({ 'imageUrl': req.file.location });
    });
}



module.exports = { fileupload }