const express = require("express");
const upload = require("../config/multerConfig");

const router = express.Router();

// Upload a single file
router.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    res.status(200).json({
        success: true,
        message: "File uploaded successfully",
        filePath: `/uploads/${req.file.filename}`,
    });
});

// Upload multiple files
router.post("/uploads", upload.array("files", 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const filePaths = req.files.map(file => `/uploads/${file.filename}`);
    res.status(200).json({
        success: true,
        message: "Files uploaded successfully",
        filePaths: filePaths,
    });
});

module.exports = router;
