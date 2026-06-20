import { useEffect, useState } from "react";

import api from "../api";

function SummaryCards() {

  const [expenses, setExpenses] = useState([]);

  const [limits, setLimits] = useState({

    monthly_limit: 0,

  });

  useEffect(() => {

    getData();

    const interval = setInterval(

      getData,

      2000

    );

    return () => clearInterval(interval);

  }, []);

  async function getData() {

    try {

      const expenseRes = await api.get(

        "/expenses"

      );

      const limitRes = await api.get(

        "/limits"

      );

      setExpenses(

        expenseRes.data

      );

      setLimits(

        limitRes.data

      );

    }

    catch (error) {

      console.log(error);

    }

  }

  let monthlyTotal = 0;

  const now = new Date();

  expenses.forEach((expense) => {

    const expenseDate = new Date(

      expense.expense_date

    );

    if (

      expenseDate.getMonth() ===

      now.getMonth() &&

      expenseDate.getFullYear() ===

      now.getFullYear()

    ) {

      monthlyTotal += Number(

        expense.amount

      );

    }

  });

  const monthlyPercent =

    limits.monthly_limit > 0

      ? Math.min(

          (

            monthlyTotal /

            limits.monthly_limit

          ) * 100,

          100

        )

      : 0;

  return (

    <>

      <div className="summary-grid">

        <div className="summary-card">

          <h3>📅 Monthly Spend</h3>

          <h2>

            ₹{monthlyTotal}

          </h2>

        </div>

        <div className="summary-card">

          <h3>🎯 Monthly Limit</h3>

          <h2>

            ₹{limits.monthly_limit}

          </h2>

        </div>

      </div>

      <div className="progress-card">

        <h3>

          Monthly Usage

          ({monthlyPercent.toFixed(0)}%)

        </h3>

        <div className="progress-bar">

          <div

            className="progress-fill"

            style={{

              width:

              `${monthlyPercent}%`

            }}

          ></div>

        </div>

      </div>

    </>

  );

}

export default SummaryCards;