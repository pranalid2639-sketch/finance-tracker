import { useEffect, useState } from "react";

import api from "../api";

function ExpenseList() {

  const [expenses, setExpenses] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");

  const [editAmount, setEditAmount] = useState("");

  const [search, setSearch] = useState("");

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

  async function deleteExpense(id) {

    try {

      await api.delete(

        `/expenses/${id}`

      );

      getExpenses();

    }

    catch (error) {

      console.log(error);

    }

  }

  function startEdit(expense) {

    setEditingId(

      expense.id

    );

    setEditTitle(

      expense.title

    );

    setEditAmount(

      expense.amount

    );

  }

  async function saveEdit(id) {

    try {

      await api.put(

        `/expenses/${id}`,

        {

          title: editTitle,

          amount: editAmount,

        }

      );

      setEditingId(

        null

      );

      getExpenses();

    }

    catch (error) {

      console.log(error);

    }

  }

  const filteredExpenses = expenses.filter(

    (expense) =>

      expense.title

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )

  );

  return (

    <div>

      <h2>

        Expense History

      </h2>

      <input

        type="text"

        placeholder="🔍 Search Expense"

        value={search}

        onChange={(e) =>

          setSearch(

            e.target.value

          )

        }

        className="search-box"

      />

      {

        filteredExpenses.length === 0 ?

        (

          <p>

            No expenses found

          </p>

        )

        :

        (

          filteredExpenses.map(

            (expense) => (

              <div

                key={expense.id}

                className="expense-item"

              >

                {

                  editingId === expense.id ?

                  (

                    <>

                      <input

                        type="text"

                        value={editTitle}

                        onChange={(e) =>

                          setEditTitle(

                            e.target.value

                          )

                        }

                      />

                      <input

                        type="number"

                        value={editAmount}

                        onChange={(e) =>

                          setEditAmount(

                            e.target.value

                          )

                        }

                      />

                      <button

                        onClick={() =>

                          saveEdit(

                            expense.id

                          )

                        }

                      >

                        💾 Save

                      </button>

                    </>

                  )

                  :

                  (

                    <>

                      <span>

                        {expense.title}

                        {" - "}

                        ₹{expense.amount}

                      </span>

                      <button

                        onClick={() =>

                          startEdit(

                            expense

                          )

                        }

                      >

                        ✏️ Edit

                      </button>

                      <button

                        onClick={() =>

                          deleteExpense(

                            expense.id

                          )

                        }

                      >

                        🗑️ Delete

                      </button>

                    </>

                  )

                }

              </div>

            )

          )

        )

      }

    </div>

  );

}

export default ExpenseList;