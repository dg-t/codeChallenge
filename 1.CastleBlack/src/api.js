const { Router } = require("express");
const api = Router();

// This will be your data source
const players = [
    { id: 1, name: "Jon Snow", age: 23, health: 100, bag: [1] },
    { id: 2, name: "Littlefinger", age: 35, health: 100, bag: [2] },
    { id: 3, name: "Daenerys Targaryen", age: 20, health: 100, bag: [3] },
    { id: 4, name: "Samwell Tarly", age: 18, health: 100, bag: [4] }
];
const objects = [
    { id: 1, name: "spoon", value: -1 },
    { id: 2, name: "knife", value: -10 },
    { id: 3, name: "sword", value: -20 },
    { id: 4, name: "potion", value: +20 }
];

// ENDPOINT: PLAYERS
// LIST ALL PLAYERS
api.get("/players", function(req, res) {

    // Get all players
    var playersName = [];
    for (p = 0; p < players.length; p++) {
        if (players[p]) {
            playersName.push(players[p].name);
        }
    }
    // Display result
    res.json(playersName);
});

// GET SPECIFIC PLAYER BY ID
api.get("/players/:id", function(req, res) {

    // Find the player with the specific ID
    const player = players.find(p => p.id === parseInt(req.params.id));

    // Validation error 400 bad request
    if (!player) {
        res.status(404).json("The player with the given ID was not found!");
    } else {
        // Display result
        res.json(player);
    }
});

// ADD A PLAYER
api.post("/players", function(req, res) {

    // Validation error 400 bad request
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).json("Name is required and should be minimum 3 characters");
        return;
    } else if (!req.body.age || (req.body.age < 18 || req.body.age > 60)) {
        res.status(400).json("Age is required and should be between 18 and 60");
        return;
    } else if (!req.body.bag || (req.body.bag[0] < 0 || req.body.bag[0] > 5)) {
        res.status(400).json("Bag is required and should be between 1 and 5");
        return;
    }

    // Creat new player
    const player = {
        id: players.length + 1,
        name: req.body.name,
        age: req.body.age,
        health: 100,
        bag: req.body.bag
    };
    // Push new player to players array  
    // display result in postman collection attached in the utils folder
    players.push(player);
    res.json(player);
});

module.exports = api