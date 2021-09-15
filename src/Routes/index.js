const { Router } = require("express");
const router = Router();
const { signup, signin } = require("../Controllers/user");
const {addData, getData, approveData} = require("../Controllers/attendance")
const { auth } = require("../Middlewares/auth");

// User
router.post("/signup", signup);
router.post("/signin", signin);

// Attendance
router.post("/attendance", auth, addData);
router.get("/get-data", auth, getData);
router.patch("/approve/:id", auth, approveData);


module.exports = router;