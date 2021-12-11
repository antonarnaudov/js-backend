const {Router} = require("express");
const router = Router();

const homeControler = require("./routeControlers/homeControler.js");
const authCntroler = require("./routeControlers/authControler")
const housingControler = require("./routeControlers/housingControler")

router.use("/", homeControler);
router.use("/auth", authCntroler);
router.use("/housing", housingControler);
router.get("/*", (req, res) => {
    res.render("err/404", {title: "Error"});
})

module.exports = router;