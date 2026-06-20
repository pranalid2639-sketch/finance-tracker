import PieChart from "./PieChart";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SummaryCards from "./SummaryCards";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import LimitForm from "./LimitForm";

function Dashboard() {

  const navigate = useNavigate();

  // Protect Dashboard
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/");

    }

  }, [navigate]);

  // Logout
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <h1>💰 Finance Tracker</h1>
        <p>

  {new Date().toLocaleDateString(

    "en-IN",

    {

      weekday:"long",

      day:"numeric",

      month:"long",

      year:"numeric",

    }

  )}

</p>

        <button
          className="logout-btn"
          onClick={logout}
        >

          Logout

        </button>

      </div>

      {/* Summary Cards */}

      <SummaryCards />

      {/* Forms */}

      <div className="dashboard-grid">

        <div className="card">

          <LimitForm />

        </div>

        <div className="card">

          <ExpenseForm />

        </div>

      </div>

      {/* Expense List */}

      <div className="card">

        <ExpenseList />

        <div className="card">

  <PieChart />

</div>

      </div>
      <footer className="footer">

  Finance Tracker © 2026

  <br />

  Developed by Pranali Dhore

</footer>

    </div>

  );

}

export default Dashboard;