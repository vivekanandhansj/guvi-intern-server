import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash1 = bcrypt.hashSync(req.body.password, salt);
    const hash2 = bcrypt.hashSync(req.body.confirmpassword, salt);
    const newUser = new User({
      ...req.body,
      password: hash1,
      confirmpassword: hash2,
    });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    //1. check email
    const user = await User.findOne({ email: req.body.email });
    //2. user not found
    if (!user) return next(createError(404, " User not found!"));
    // user found
    //3. check user password same or not
    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    // //4.  whether password wrong
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const id = user._id;
    res.status(200).json(id);
  } catch (err) {
    next(err);
  }
};
