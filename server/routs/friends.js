const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");


// get all friends data
router.get("/all-friend",authorize, async (req, res) => {
    try {
        const allFriends = await pool.query("SELECT * FROM users AS u WHERE u.user_id = $1",
        [req.user.id]);
        res.json(allFriends.rows)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// add a friend