const pool = require("../db");

exports.getLimit = async (req, res) => {

  try {

    const userId = req.user.id;

    const result = await pool.query(

      `SELECT *

       FROM limits

       WHERE user_id=$1`,

      [userId]

    );

    if (result.rows.length === 0) {

      return res.json({

        daily_limit: 0,

        monthly_limit: 0

      });

    }

    res.json(result.rows[0]);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Error"

    });

  }

};



exports.updateLimit = async (req, res) => {

  try {

    const userId = req.user.id;

    const {

      daily_limit,

      monthly_limit

    } = req.body;

    const existing = await pool.query(

      `SELECT *

       FROM limits

       WHERE user_id=$1`,

      [userId]

    );

    if (existing.rows.length === 0) {

      await pool.query(

        `INSERT INTO limits

        (daily_limit,monthly_limit,user_id)

        VALUES($1,$2,$3)`,

        [

          daily_limit,

          monthly_limit,

          userId

        ]

      );

    }

    else {

      await pool.query(

        `UPDATE limits

         SET daily_limit=$1,

         monthly_limit=$2

         WHERE user_id=$3`,

        [

          daily_limit,

          monthly_limit,

          userId

        ]

      );

    }

    res.json({

      message: "Limits Updated"

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

      message: "Error"

    });

  }

};