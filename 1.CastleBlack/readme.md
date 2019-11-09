# REST API implementation

This is a Game of Thrones inspired REST API game. You are responsible to create the engine of the game.

## Your tasks

1. Implement the endpoints in **./src/api.js** file with the most suitable code for players and objects management REST API. You will find detailed instructions in this file.
2. Write some tests for your code. Use test folder for this purpose. -- All enpoints are tested with postman api testing
3. Answer all commented questions you find in the code. -- Question as answered as comments in Code and below:

    - #### QUESTION: any reason is this line here? 
        - For security reason: x-powered-by show publicly which software an app is running
        - Disabling x-powered-by can prevent attackers know that an app is running express

    - #### QUESTION: why this endpoint blocks the app?
        - Is a route at the root path of this Router that sends back a message "Up and running"
        - Is the container for the middleware on this router
        - The middleware and routes attached to this Router will be running as long as we are accessing a route that starts at the root path, imported in app.use("/", router)

### Required endpoints

You have to create endpoints (as many as you consider) to support the following functionality:

#### All endpoint are easily accessible from the Postman Collection ####
1. List all players. -- 
(Method: GET - Postman Collection) - Type on localhost: http://localhost:8080/api/players
2. Create player: adds a new player to data source. -- (Method: POST - Postman Collection)
3. Get player by id: returns the player for the given id. -- (Method: GET - Postman Collection) Type on localhost: http://localhost:8080/api/players/:id
4. Arm a player with an object in its bag. -- (Method: PUT - Postman Collection)
5. Kill a player: sets player health to 0. -- (Method: PUT - Postman Collection)/ Could be made with method: DELETE if we wish to completely destroy player from the game.
6. Create object: adds a new object to data source. -- (Method: POST - Postman Collection)
7. Get object by id: returns the object for the given id. (Method: GET - Postman Collection) Type on localhost: http://localhost:8080/api/objects/:id
8. Upgrade object: increase/descrease the value of the object given by id with a new value (Method: PUT - Postman Collection)
9. Destroy object: remove an object from available objects -- (Method: DELETE - Postman Collection)

**Bonus:**

1. Include a postman collection in utils folder to test the app. -- Postman Collection included
2. Add basic authentication to /api path.
3. Implement pick up item endpoint: one player add to its bag one item that doesn't belong to any other player.
4. Implement attack player endpoint: one player attacks another player using an object from its bag. Adjust health accordingly
5. Implement steal bag from player endpoint: one player steals everything from another player. Bag objects are moved from one player to another.
6. Implement resurrect player endpoint: bring back to life a dead player using its id.
7. Implement use object endpoint: a player use an object against another player or itself.
8. Are you having fun? You are free to extend the game with new functionality.

## Game Rules

1. You are free to implement as many endpoints as you need.
2. You can use inline comments, git commits or readme file to justify your decissions.
3. Bag size is unlimited.
4. Bear in mind RESTful API concepts.
5. One object can be used by multiple players

**Use your own criteria for any rule that is not clear. Justify it.**

## How to run the application using a local server

To run the project, open a terminal and execute the following command from project root path:

Install dependencies

> yarn

Start a local server

> yarn start

A local server will start on port 8080.

> http://localhost:8080

## How to run the application using Docker

Build the image:

> docker build -t <your username>/payvision-frontend-castleblack .

Run the image on localhost port 8081:

> docker run -p 8081:8080 -d <your username>/payvision-frontend-castleblack

Enter the container:

> docker exec -it <container id> sh

Print logs:

> docker logs <container id>
> docker logs -f --tail 10 <container id>
