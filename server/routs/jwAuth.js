const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validate = require("../middleware/validate")
const authorize = require("../middleware/authorize")


//authorizeentication


//register
router.post("/register", validate, async (req, res) => {
    const { email, name, password } = req.body;
  
    try {
      const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
        email
      ]);
  
      if (user.rows.length > 0) {
        return res.status(401).json("User already exist!");
      }

      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      
      
      let newUser = await pool.query(
        "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
      );
  
      jwtToken = jwtGenerator(newUser.rows[0].user_id);
      return res.json({jwtToken});
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


//login
router.post("/login", validate, async (req,res) => {
  const {email, password} = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1",[
      email
    ])
    if (user.rows.length<0) {
      return res.status(401).json("Invalid Credential");
    }
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({jwtToken});

  } catch (err) {
    console.error(err);
  }

});

// for verifyng user's token to see if it a matching one 
router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
module.exports = router;