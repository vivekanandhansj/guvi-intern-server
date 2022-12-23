import User from "../model/User.js";

export const editUser = async (req,res,next)=>{
  try {
    const edit = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(edit);
  } catch (err) {
    next(err);
  }
}

export const viewUser = async (req,res,next)=>{
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
