// implement your API here
const express = require("express");

const User = require("./data/db.js");

const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("hello world, its Mike!");
});

server.get("/api/users", (req, res) => {
  User.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The list of users could not be retrieved" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user's information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  console.log("User info from body!: ", userInfo);
  if (req.body.name && req.body.bio) {
    User.insert(userInfo)
      .then(result => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error adding the user to the database."
        });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide name and a bio for the user" });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  User.remove(userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "error removing hub" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  User.update(id, changes)
    .then(updated => {
      if (req.body.name && req.body.bio) {
        if (updated) {
          res.status(200).json(req.body);
        } else {
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exist" });
        }
      } else {
        res
          .status(400)
          .json({ message: "Please provide name and a bio for the user" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error updating user!" });
    });
});

const port = 8001;

server.listen(port, () => {
  console.log(`Running on port ${port} captain!`);
});
