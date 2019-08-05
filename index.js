// implement your API here
const express = require("express");

const Hubs = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("hello world, its Mike!");
});

server.get("/api/users", (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json({ message: "error getting the list of users" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const hubId = req.params.id;
  Hubs.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "error getting user by ID" });
    });
});

server.post("/api/users", (req, res) => {
  const hubInfo = req.body;
  console.log("hub info from body!: ", hubInfo);
  Hubs.insert(hubInfo)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json({ message: "error adding the hub" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const hubId = req.params.id;

  Hubs.remove(hubId)
    .then(hub => {
      res.status(200).json({ message: "hub got deleted!" });
    })
    .catch(error => {
      res.status(500).json({ message: "error removing hub" });
    });
});

const port = 8001;

server.listen(port, () => {
  console.log(`Running on port ${port} captain!`);
});
