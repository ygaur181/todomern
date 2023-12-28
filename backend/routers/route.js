const { getAllTodos, updateTodo, getOne, updateCompleted, uptodo, deleteTodo } = require("../controller/todoCon");


const router = require("express").Router();

router.route("/todo").get(getAllTodos).post(updateTodo);
router.route("/todo/:id").get(getOne);
router.route("/todo/:id").put(updateCompleted).delete(deleteTodo);
router.route("/todoupdate/:id").put(uptodo);



module.exports = router;