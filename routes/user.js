import  express from "express";
import {editUser, viewUser} from "../controller/user.js";


const router = express.Router();
//update user
router.put("/edituser/:id", editUser);
router.get("/viewuser/:id", viewUser);

export default router;