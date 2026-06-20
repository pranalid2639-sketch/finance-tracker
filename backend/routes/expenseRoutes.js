const express = require("express");



const router = express.Router();



const expense = require("../controllers/expenseController");



const limit = require("../controllers/limitController");



const authMiddleware = require("../middleware/authMiddleware");



router.get(

  "/expenses",

  authMiddleware,

  expense.getExpenses

);



router.post(

  "/expenses",

  authMiddleware,

  expense.addExpense

);



router.delete(

  "/expenses/:id",

  authMiddleware,

  expense.deleteExpense

);

router.put(

  "/expenses/:id",

  authMiddleware,

  expense.updateExpense

);

router.get(



  "/limits",



  authMiddleware,



  limit.getLimit



);



router.put(



  "/limits",



  authMiddleware,



  limit.updateLimit



);



module.exports = router;

