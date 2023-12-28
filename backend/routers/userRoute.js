const { createUser, viewUser, updateUser, deleteUser, loginUser } = require("../controller/userCon");
const { authMiddleware } = require("../middlewares/auth");
4


const router = require("express").Router();

router.route("/").post(createUser);
router.route("/user").get(authMiddleware,viewUser).put(authMiddleware,updateUser).delete(authMiddleware,deleteUser);
router.route("/login").get(loginUser)

module.exports = router;
