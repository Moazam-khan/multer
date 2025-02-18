const express = require("express");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./utils/errorHandler");
const cors = require('cors');

const app = express();
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Routes
app.use("/api", uploadRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));