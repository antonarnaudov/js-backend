const { Router } = require("express");
const router = Router();

const homeController = require("./routeControlers/homeControler.js");
const authController = require("./routeControlers/authControler")
const playController = require("./routeControlers/playControler")

router.use("/", homeController);
router.use("/auth", authController);
router.use("/play", playController);
router.get("/*", (req, res) => {
    throw { message: "Page not found!", status: 404 }
})

module.exports = router;