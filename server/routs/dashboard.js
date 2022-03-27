const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

//all todos and name

router.get("/", authorize, async (req, res) => {
    try {
       
      const user = await pool.query(
        "SELECT * FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
        [req.user.id]
        );
      
      
      res.json(user.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
//create a todo
router.post("/todos",authorize, async (req,res) => {
    try {
      const {title} = req.body;
      const {description} = req.body;
      const newTodo = await pool.query("INSERT INTO todos (user_id,description,title) VALUES($1,$2,$3) RETURNING *",[
        req.user.id,description,title
      ]);

      res.json(newTodo.rows[0])
    } catch (err) {
      console.error(err.message);
    }
});  

//update a todo
router.put("/todos/:id",authorize, async (req,res) => {
  try {
    const {id} = req.params;
    const{title} = req.body;
    const {description} = req.body;
    const updateTodo = await pool.query("UPDATE todos SET description = $1 AND title = $2 WHERE todo_id = $3 AND user_id = $4 RETURNING *",[
      description, title, id, req.user.id
    ]);
    if(updateTodo.rows.length === 0) {
      return res.json("you don't have this todo")
    }
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
}); 

//delete a todo
router.delete("/todos/:id",authorize, async (req,res) => {
  try {
    const {id} = req.params;
    const deleteTodo = await pool.query("DELETE from todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",[
      id,req.user.id
    ]);
    if(deleteTodo.rows.length === 0) {
      res.json("you dont have this todo");
    }
    res.json("Todo was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});
  
module.exports = router;
  