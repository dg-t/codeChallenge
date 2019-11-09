const { Router } = require("express");
const router = Router();

router.get("/health", function(req, res) {
    res.body = "Up and running";
    // QUESTION: why this endpoint blocks the app?
    // Is a route at the root path of this Router that sends back a message "Up and running"
    // Is the container for the middleware on this router
    // The middleware and routes attached to this Router will be running as long as we are accessing a route that starts at the root path, imported in app.use("/", router)
});

module.exports = router;