const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.showNotes = (req, res) => {
  
  const query = "SELECT * FROM notes";

  db.query(query, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error retrieving todos" });
    } else {
      res.status(200).json(results);
    }
  });
};
exports.saveTodos = (req, res) => {
  //console.log(req.body);
  const userId = req.body.userId; // Use the userId from the request
  const text = req.body.text;
 
  if (!userId || !text) {
    return res.status(400).json({ error: "Both userId and text are required." });
  }

  db.query(
    "INSERT INTO notes SET ? ",
    { ref_id: userId, text: text },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
       // console.log(results);
       res.status(200).json({ message: "Todo saved successfully" });
        // return res.render("login", {
        //   message: "user registered",
        // });
       // console.log(results);
      }
    }
  );
};
// exports.getSingleTodo = (req, res) => {
//   const todoId = req.params.id; // Get the todo ID from the request parameters
//   const query = `SELECT * FROM notes WHERE id = ${todoId}`;

//   db.query(query, (error, result) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({ error: "Error retrieving todo" });
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ error: "Todo not found" });
//     }

//     const todo = result[0];
//     res.status(200).json(todo);
//   });
// };

exports.deleteSingleTodo = (req, res) => {
  const todoId = req.params.id; // Get the todo ID from the request parameters
  const query = `DELETE FROM notes WHERE id = ${todoId}`;

  db.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error deleting todo" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  });
};
exports.updateTodo = (req, res) => {
  const todoId = req.params.id;
  const newText = req.body.text;

  const query = `UPDATE notes SET text = '${newText}' WHERE id = ${todoId}`;

  db.query(query, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error updating todo" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully" });
  });
};
