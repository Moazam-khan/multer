  "# multer" 

# Multer: File Uploads in Node.js

Multer is a popular middleware for handling `multipart/form-data` in Node.js, primarily used for uploading files. It simplifies the process of handling file uploads in Express.js applications. Below is a detailed explanation of how Multer works and how you can use it to handle different file types.

---

## **Table of Contents**
1. [What is Multer?](#what-is-multer)
2. [How Multer Works](#how-multer-works)
3. [Installation](#installation)
4. [Basic Usage](#basic-usage)
5. [Handling Different File Types](#handling-different-file-types)
6. [Configuration Options](#configuration-options)
7. [Error Handling](#error-handling)
8. [Example Code](#example-code)
9. [References](#references)

---

## **What is Multer?**
Multer is a Node.js middleware designed to handle `multipart/form-data`, which is primarily used for uploading files. It adds a `file` or `files` object to the `request` object, making it easy to access uploaded files in your route handlers.

---

## **How Multer Works**
1. When a file is uploaded via a form with `enctype="multipart/form-data"`, Multer processes the request.
2. It parses the form data and extracts the files.
3. The files are stored in a specified directory (or in memory), and their metadata (e.g., filename, size, MIME type) is made available in the `req.file` or `req.files` object.

---

## **Installation**
To use Multer, install it via npm:
```bash
npm install multer
```

---

## **Basic Usage**
Here’s a basic example of using Multer in an Express.js application:

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

// Initialize upload variable
const upload = multer({ storage });

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

---

## **Handling Different File Types**
Multer can handle various file types, such as images, videos, PDFs, and more. You can use the `fileFilter` option to restrict uploads to specific file types.

### Example: Allowing Only Images
```javascript
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false); // Reject the file
  }
};

const upload = multer({ storage, fileFilter });
```

### Example: Handling Multiple File Types
```javascript
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'), false); // Reject the file
  }
};

const upload = multer({ storage, fileFilter });
```

---

## **Configuration Options**
Multer provides several configuration options:
- **`storage`**: Defines where and how files are stored (e.g., disk or memory).
- **`fileFilter`**: Controls which files are accepted.
- **`limits`**: Sets limits on file size, number of files, etc.
- **`dest`**: A fallback option to specify a directory for file uploads.

### Example: Setting File Size Limit
```javascript
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});
```

---

## **Error Handling**
Multer throws errors for various reasons (e.g., file size exceeded, invalid file type). You can handle these errors in your route handler or using Express's error-handling middleware.

### Example: Error Handling Middleware
```javascript
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send('File upload error: ' + err.message);
  } else if (err) {
    res.status(400).send('Error: ' + err.message);
  }
});
```

---

## **Example Code**
Here’s a complete example of an Express.js application using Multer to handle file uploads:

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'), false);
  }
};

// Initialize upload variable
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send('File upload error: ' + err.message);
  } else if (err) {
    res.status(400).send('Error: ' + err.message);
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

---

## **References**
- [Multer GitHub Repository](https://github.com/expressjs/multer)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js File System Module](https://nodejs.org/api/fs.html)

---

This README provides a comprehensive guide to using Multer for file uploads in Node.js. You can customize it further to suit your project's needs! Let me know if you need additional help.
