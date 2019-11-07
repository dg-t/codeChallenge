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
    var allPlayers = [];
    for (p = 0; p < players.length; p++) {
        if (players[p]) {
            allPlayers.push(players[p]);
        }
    }
    // Display result
    res.json(allPlayers);
});

// CREATE A PLAYER
api.post("/players", function(req, res) {

    // Validation error 400 bad request
    if (!req.body.name || req.body.name.length < 3)
        return res.status(400).json("Name is required and should be minimum 3 characters");

    else if (!req.body.age || (req.body.age < 18 || req.body.age > 60))
        return res.status(400).json("Age is required and should be between 18 and 60");

    else if (req.body.health < 0 || req.body.health > 100)
        return res.status(400).json("Health must be between 0 and 100");

    else if (!req.body.bag || req.body.bag < 0)
        return res.status(400).json("Bag is required and cannot be less then 0");


    // Creat new player
    const player = {
        id: players.length + 1,
        name: req.body.name,
        age: req.body.age,
        health: req.body.health,
        bag: req.body.bag
    };
    // Push new player to players array  
    // display result in postman collection attached in the utils folder
    players.push(player);
    res.json(player);
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

// UPDATE PLAYER BAG
api.put("/players/:id/bag", function(req, res) {

    const player = players.find(p => p.id === parseInt(req.params.id)); // Find the player with the specific ID
    var object = []; // Get all object that can be added to the bag
    var addItem = req.body.bag; // New item

    // Check for all available objects
    for (o = 0; o < objects.length; o++) {
        if (objects[o]) {
            object.push(objects[o].name);
        }
    }

    // Validation error 400 bad request
    if (!player) return res.status(404).json("Player doesn't exist!");

    // Validation error 400 bad request
    else if (!addItem || addItem < 0)
        return res.status(400).json("Bag is required and cannot be less then 1");

    // Check if object exist
    else if (object.indexOf(addItem) != -1) {
        object.push(addItem)
    } else {
        return res.status(400).json("Object does not exist");
    }

    // Add object to player bag
    player["bag"].push(addItem);
    // Return the updated player
    res.send(player);

});

// UPDATE PLAYER HEALTH (Use PUT request so player is not completely destroyed, and can be resurrected)
api.put("/players/:id/health", function(req, res) {

    // Find the player with the specific ID
    const player = players.find(p => p.id === parseInt(req.params.id));
    // Validation error 400 bad request
    if (!player) return res.status(404).json("The player with the given ID was not found!");

    // Validation error 400 bad request
    else if (req.body.health < 0 || req.body.health > 100)
        return res.status(400).json("Health must be between 0 and 100");

    // Update health
    player.health = req.body.health;
    // Return the updated player
    res.send(player);
});

// DELETE A PLAYER (If choose to completely destroy player from the game)
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

// UPDATE OBJECT VALUE
api.put("/objects/:id/value", function(req, res) {

    // Find object with specific ID
    const object = objects.find(o => o.id === parseInt(req.params.id));
    // Validation error 400 bad request
    if (!object) return res.status(404).json("The object with the given ID was not found!");

    // Validation error 400 bad request
    else if (!req.body.value || (req.body.value < -20 || req.body.value > 20))
        return res.status(400).json("Object value is required and should be between -20 and +20");

    // Update object
    object.value = req.body.value;
    // Return the updated player
    res.send(object);
});

// DELETE AN OBJECT
api.delete("/objects/:id", function(req, res) {
    // Find object with specific ID
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