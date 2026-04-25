const express = require('express');
const {registerUser, loginUser, loginStatus, getUser, logoutUser, loginAsSeller, getUserBalance, getAllUser, estimateIncome} = require('../controllers/userCtr');
const router = express.Router();
const { protect, isAdmin } = require("../middleWare/authMiddleWare");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/loggedin", loginStatus);
router.get("/logout", logoutUser);
router.post("/seller", loginAsSeller);
router.get("/getuser", protect, getUser);
router.get("/sell-amount", protect, getUserBalance);

router.get("/estimate-income", protect, isAdmin, estimateIncome);
router.get("/users", protect, isAdmin, getAllUser);
module.exports = router;