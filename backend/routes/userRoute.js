const express = require('express');
const {registerUser, loginUser, loginStatus, getUser, logoutUser, loginAsSeller, getUserBalance, getAllUser, estimateIncome} = require('../controllers/userCtr');
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logged-in", loginStatus);
router.get("/logout", logoutUser);
router.post("seller", loginAsSeller);
router.get("/getuser", protect, getUser);
router.get("sell-amount", protect, getUserBalance);

router.get("/estimate-income", protect, isAdmin, estimateIncome);
router.get("/users", protect, isAdmin, getAllUser);
module.exports = router;