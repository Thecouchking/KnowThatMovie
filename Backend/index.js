const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/tmdb');
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}
main();

const movieSchema = new mongoose.Schema({
  title: String,
  release_date: Date,
  vote_average: Number,
  vote_count: Number,
  original_language: String,
  overview: String,
  poster_path: String 
});

const Movies = mongoose.model('Movies', movieSchema);

app.get('/', async (req, res) => {
  try {
    const docs = await Movies.find({});
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

app.get('/search', async (req, res) => {
  const { name } = req.query;
  try {
    const docs = await Movies.find({
      title: { $regex: name, $options: 'i' }
    });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    const newMovie = new Movies(req.body);
    const saved = await newMovie.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving movie:", error);
    res.status(400).json({ error: "Invalid movie data" });
  }
});

app.put('/api/movies', async (req, res) => {
  const { _id, ...updateData } = req.body;
  if (!_id) {
    return res.status(400).json({ error: "Movie ID is required for update." });
  }     
  try {
    const updated = await Movies.findByIdAndUpdate(_id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Movie not found." });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Failed to update movie." });
  }
});

