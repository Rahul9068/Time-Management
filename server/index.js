const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/taskdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.log('Error connecting to database:', error.message);
});

const taskSchema = mongoose.Schema({
  title: String,
  description: String
})

const Keeper = mongoose.model("Keeper", taskSchema)


app.get("/api/getAll", (req, res) => {
  Keeper.find({})
    .then((keeperList) => {
      res.status(200).send(keeperList);
    })
    .catch((err) => {
      console.log(err);
    });

});

app.post("/api/addNew", (req, res) => {
  const { title, description } = req.body
  const keeperObj = new Keeper({
    title: title,
    description: description
  })
  keeperObj.save();
  Keeper.find({})
    .then((keeperList) => {
      res.status(200).send(keeperList);
    })
    .catch((err) => {
      console.log(err);
    });
})

app.post("/api/delete", (req, res) => {
  const {id} = req.body
  Keeper.deleteOne({_id:id})
    .then(() => {
      return Keeper.find({});
    })
    .then((keeperList) => {
      res.status(200).send(keeperList);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8000, () => {
  console.log("backend started");
})