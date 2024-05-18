const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const router = express.Router();

// Configure AWS SDK v3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const s3Storage = multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname);
    }
});

const uploader = multer({ storage: s3Storage });

router.post('/uploadfile', uploader.single('myfile'), async (req, res) => {
    const fileKey = req.file.key;
    const bucketName = process.env.S3_BUCKET_NAME;

    try {
        const getObjectParams = {
            Bucket: bucketName,
            Key: fileKey,
        };

        const fileUrl = getObjectParams.Key;
        console.log(`File uploaded: ${fileUrl}`);

        res.json({ status: 'success', fileUrl: fileUrl });
    } catch (err) {
        console.error(`Error generating signed URL: ${err}`);
        res.status(500).json({ status: 'error', message: 'Failed to generate file URL' });
    }
});

router.delete('/deletefile/:filename', (req, res) => {
    const fileUrl = req.params.filename;
    const bucketName = process.env.S3_BUCKET_NAME;

    try {
        const deleteObjectParams = {
            Bucket: bucketName,
            Key: fileUrl,
        };

        const command = new DeleteObjectCommand(deleteObjectParams);
        s3.send(command);

        console.log(`File deleted: ${fileUrl}`);
        res.json({ status: 'success', message: 'File deleted successfully' });
    } catch (err) {
        console.error(`Error deleting file: ${err}`);
        res.status(500).json({ status: 'error', message: 'Failed to delete file' });
    }
});

module.exports = router;
