const pool = require("../db");

// GET EXPENSES

exports.getExpenses = async (req, res) => {

  try {

    const userId = req.user.id;

    const result = await pool.query(

      `SELECT *

       FROM expenses

       WHERE user_id=$1

       ORDER BY id DESC`,

      [userId]

    );

    res.json(result.rows);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Error"

    });

  }

};


// ADD EXPENSE

exports.addExpense = async (req, res) => {

  try {

    const { title, amount } = req.body;

    const userId = req.user.id;

    const result = await pool.query(

      `INSERT INTO expenses

      (title,amount,user_id)

      VALUES($1,$2,$3)

      RETURNING *`,

      [title, amount, userId]

    );

    res.json(result.rows[0]);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Error"

    });

  }

};


// DELETE EXPENSE

exports.deleteExpense = async (req, res) => {

  try {

    const { id } = req.params;

    const userId = req.user.id;

    await pool.query(

      `DELETE FROM expenses

       WHERE id=$1

       AND user_id=$2`,

      [id, userId]

    );

    res.json({

      message: "Deleted"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Error"

    });

  }

};


// UPDATE EXPENSE

exports.updateExpense = async (req, res) => {

  try {

    const { id } = req.params;

    const { title, amount } = req.body;

    const userId = req.user.id;

    const result = await pool.query(

      `UPDATE expenses

       SET title=$1,

       amount=$2

       WHERE id=$3

       AND user_id=$4

       RETURNING *`,

      [

        title,

        amount,

        id,

        userId

      ]

    );

    res.json(result.rows[0]);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Error"

    });

  }

};