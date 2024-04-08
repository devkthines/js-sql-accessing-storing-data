// Import required dependencies
const express = require('express');
const Sequelize = require('sequelize');

// Create an instance of Express
const app = express();
const PORT = 3000;

// Sequelize setup
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Define Movie model
const Movie = sequelize.define('Movie', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    yearOfRelease: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    synopsis: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log("Database synced");
        // Insert example data
        Movie.bulkCreate([
            { title: 'Movie 1', yearOfRelease: 2000, synopsis: 'Synopsis 1' },
            { title: 'Movie 2', yearOfRelease: 2010, synopsis: 'Synopsis 2' },
            { title: 'Movie 3', yearOfRelease: 2020, synopsis: 'Synopsis 3' }
        ]);
    })
    .catch(err => console.error("Error syncing database:", err));

// Routes for CRUD operations on Movie resources
app.post('/movies', (req, res) => {
    // Create a new movie resource
});

app.get('/movies', (req, res) => {
    // Read all movies
});

app.get('/movies/:id', (req, res) => {
    // Read a single movie resource
});

app.put('/movies/:id', (req, res) => {
    // Update a single movie resource
});

app.delete('/movies/:id', (req, res) => {
    // Delete a single movie resource
});

// Pagination for fetching multiple movie resources
app.get('/movies', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    Movie.findAndCountAll({ limit, offset })
        .then(result => {
            const { count, rows } = result;
            res.json({
                data: rows,
                total: count
            });
        })
        .catch(err => {
            console.error("Error fetching movies:", err);
            res.status(500).send("Internal Server Error");
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
