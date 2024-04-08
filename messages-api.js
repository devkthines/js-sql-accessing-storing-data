// Import required dependencies
const express = require('express');

// Create an instance of Express
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware function to limit messages
let messageCount = 0;
const messageLimit = 5;
const messageLimitMiddleware = (req, res, next) => {
    if (messageCount >= messageLimit) {
        return res.status(429).send("Too Many Requests");
    }
    messageCount++;
    next();
};

// Endpoint for receiving and processing messages
app.post('/messages', messageLimitMiddleware, (req, res) => {
    const { text } = req.body;

    // Validate incoming request
    if (!text || text.trim() === '') {
        return res.status(400).send("Bad Request");
    }

    // Log message to console
    console.log("Received message:", text);

    // Respond with JSON object
    res.json({ message: "Message received loud and clear" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
