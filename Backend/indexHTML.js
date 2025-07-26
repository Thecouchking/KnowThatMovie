const express = require('express')
const cors=require('cors')
const mongoose = require('mongoose');
const app = express()
const port = 3005

app.use(cors());


//write function inside
// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/tmdb');
//     console.log("db connected")
// }

// main().catch(err => console.log(err));


async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/tmdbHTML');
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:");
    process.exit(1);
  }
}

main();

const movieSchema = new mongoose.Schema({
  id: Number, 
  title: String,
  release_date: Date,
  poster_path: String,
});

const Movies = mongoose.model('Movies', movieSchema);

app.get('/',async (req, res) => {
  try{
  const docs=await Movies.find({});
  res.json(docs);
}catch(error){
  res.status(500).json({ error: 'Server Error'});
}})

app.get('/search',async (req, res) => {
  const{name}=req.query
  try{
  const docs=await Movies.find({
    title:{$regex: name, $options:'i'}
  });
  res.json(docs);
}catch(error){
  res.status(500).json({ error: 'Server Error'});
}})



