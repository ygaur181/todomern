const { createUser, viewUser, updateUser, deleteUser, loginUser } = require("../controller/userCon");
4


const router = require("express").Router();

router.route("/signup").post(createUser);
// router.route("/user").get(authMiddleware,viewUser).put(authMiddleware,updateUser).delete(authMiddleware,deleteUser);
router.route("/login").post(loginUser)

module.exports = router;
