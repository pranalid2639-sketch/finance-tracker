import { useEffect, useState } from "react";

import api from "../api";

import { Pie } from "react-chartjs-2";

import {

  Chart as ChartJS,

  ArcElement,

  Tooltip,

  Legend

} from "chart.js";

ChartJS.register(

  ArcElement,

  Tooltip,

  Legend

);

function PieChart() {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {

    getExpenses();

  }, []);

  async function getExpenses() {

    try {

      const response = await api.get(

        "/expenses"

      );

      setExpenses(

        response.data

      );

    }

    catch (error) {

      console.log(error);

    }

  }

  const labels = expenses.map(

    (expense) => expense.title

  );

  const amounts = expenses.map(

    (expense) => Number(

      expense.amount

    )

  );

  const data = {

    labels,

    datasets: [

      {

        label: "Expenses",

        data: amounts,

        backgroundColor: [

          "#FF6384",

          "#36A2EB",

          "#FFCE56",

          "#4BC0C0",

          "#9966FF",

          "#FF9F40",

          "#8BC34A",

          "#E91E63",

          "#009688",

          "#795548"

        ],

        borderColor: "#ffffff",

        borderWidth: 2,

      }

    ]

  };

  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        position: "bottom",

      }

    }

  };

  return (

    <div>

      <h2

        style={{

          textAlign: "center"

        }}

      >

        📊 Expense Distribution

      </h2>

      <div className="pie-container">

        <Pie

          data={data}

          options={options}

        />

      </div>

    </div>

  );

}

export default PieChart;