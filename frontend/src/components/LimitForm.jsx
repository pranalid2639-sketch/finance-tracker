import { useEffect, useState } from "react";
import api from "../api";

function LimitForm() {
  const [dailyLimit, setDailyLimit] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");

  useEffect(() => {
    getLimits();
  }, []);

  async function getLimits() {
    try {
      const response = await api.get("/limits");

      setDailyLimit(response.data.daily_limit);

      setMonthlyLimit(response.data.monthly_limit);

    } catch (error) {
      console.log(error);
    }
  }

  async function updateLimits() {
    try {
      await api.put("/limits", {
        daily_limit: dailyLimit,
        monthly_limit: monthlyLimit,
      });

      alert("Limits Updated");

    } catch (error) {
      console.log(error);
    }
  }

  return (

  <div>

    <h2>📌 Set Spending Limits</h2>

    <div>

      <label>Daily Limit (₹)</label>

      <input
        type="number"
        value={dailyLimit}
        onChange={(e) => setDailyLimit(e.target.value)}
      />

    </div>

    <div>

      <label>Monthly Limit (₹)</label>

      <input
        type="number"
        value={monthlyLimit}
        onChange={(e) => setMonthlyLimit(e.target.value)}
      />

    </div>

    <button onClick={updateLimits}>

      Update Limits

    </button>

  </div>

);
}

export default LimitForm;