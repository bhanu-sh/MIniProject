const multer = require('multer');
const express = require('express');
const fs = require('fs'); // Import the 'fs' module for file system operations

const router = express.Router();

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, './uploads') },
    filename: (req, file, cb) => { cb(null, file.originalname) }
});

const uploader = multer({ storage: myStorage });

router.post('/uploadfile', uploader.single('myfile'), (req, res) => {
    res.json({ status: 'success' });
});

// Add a new route for deleting files
router.delete('/deletefile/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = `./uploads/${filename}`;

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
                res.status(500).json({ status: 'error', message: 'File deletion failed' });
            } else {
                res.json({ status: 'success', message: 'File deleted successfully' });
            }
        });
    } else {
        res.status(404).json({ status: 'error', message: 'File not found' });
    }
});

module.exports = router;
