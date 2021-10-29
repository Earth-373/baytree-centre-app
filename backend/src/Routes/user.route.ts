import express, { Request, Response, Router } from "express";
import User from "../Models/user.model";
import UserController from "../Controllers/user.controller";
import extractJWT from "../middleware/extractJWT";

const router: Router = express.Router();

router.route("/").get((req: Request, res: Response) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(UserController.addUser);
router.route("/getuser").get(UserController.getUsers);

router.route("/view/get/:type").get(UserController.getViewUsers);
router.route("/migrateusers").get(UserController.createUsersFromViews);
router.route("/validate").get(extractJWT, UserController.validateToken);
router.route("/register").post(UserController.register);
router.route("/login").post(UserController.login);

router.route("/me/goal").post(UserController.createGoalForMentee);
router.route("/me/mentee_profile/:id").get(UserController.getMenteeProfileById);
router.route("/me/mentee_profile/:id").patch(UserController.updateMenteeProfileById);

export default router;

