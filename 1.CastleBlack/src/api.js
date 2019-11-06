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
    if (!player) return res.status(404).json("The player with the given ID was not found!");

    // Display result
    res.json(player);
});

// ADD A PLAYER
api.post("/players", function(req, res) {

    // Validation error 400 bad request
    if (!req.body.name || req.body.name.length < 3)
        return res.status(400).json("Name is required and should be minimum 3 characters");

    else if (!req.body.age || (req.body.age < 18 || req.body.age > 60))
        return res.status(400).json("Age is required and should be between 18 and 60");

    else if (!req.body.bag || (req.body.bag[0] < 0 || req.body.bag[0] > 5))
        return res.status(400).json("Bag is required and should be between 1 and 5");


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

// DELETE A PLAYER
api.delete("/players/:id", function(req, res) {
    //Look if the copurse exist
    const player = players.find(p => p.id === parseInt(req.params.id));
    // Validation error 404 if object doesnt exist
    if (!player) return res.status(404).json("The player with the given ID was not found!");

    // Destroy player
    const index = players.indexOf(player);
    objects.splice(index, 1);

    // Return the same player
    res.json(player);
});


// ENDPOINT: OBJECTS
// LIST ALL OBJECTS
api.get("/objects", function(req, res) {

    // Get all objects
    var objectInfo = [];
    for (o = 0; o < objects.length; o++) {
        if (objects[o]) {
            objectInfo.push(objects[o]); // objects[o].name + " " + objects[o].value
        }
    }
    // Display result
    res.json(objectInfo);
});

// GET SPECIFIC OBJECT BY ID
api.get("/objects/:id", function(req, res) {

    // Find the object with the specific ID
    const object = objects.find(o => o.id === parseInt(req.params.id));

    // Validation error 400 bad request
    if (!object) {
        res.status(404).json("The object with the given ID was not found!");
    } else {
        // Display result
        res.json(object);
    }
});

// ADD AN OBJECT
api.post("/objects", function(req, res) {

    // Validation error 400 bad request
    if (!req.body.name || req.body.name.length < 2) {
        res.status(400).json("Object name is required and should be minimum 2 characters");
        return;
    } else if (!req.body.value || (req.body.value < -20 || req.body.value > 20)) {
        res.status(400).json("Object value is required and should be between -20 and +20");
        return;
    }

    // Creat new object
    const object = {
        id: objects.length + 1,
        name: req.body.name,
        value: req.body.value
    };

    // Push new object to objects array  
    // display result in postman collection attached in the utils folder
    objects.push(object);
    res.json(object);
});

// DELETE AN OBJECT
api.delete("/objects/:id", function(req, res) {
    //Look if the copurse exist
    const object = objects.find(o => o.id === parseInt(req.params.id));
    // Validation error 404 if object doesnt exist
    if (!object) return res.status(404).json("The object with the given ID was not found!");

    // Destroy object
    const index = objects.indexOf(object);
    objects.splice(index, 1);

    // Return the same object
    res.json(object);
});



module.exports = api