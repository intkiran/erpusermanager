import User from "../models/User";
import { apiError } from "../controller/apiError";

export const getUser = async id => {
  let existingUser = null;
  const user = await User.findById(id, function(err, user) {
    if (err) throw new apiError("unable to find user.", 500);
    existingUser = user;
  });
  return existingUser;
};

export const getAllUsers = async () => {
  return User.find({}).exec();
};
export const loginUser = async user => {
  const username = user.username;
  const password = user.password;
  console.log("kiran loginuser", user);
  const newUser = await User.findOne({ username });
  console.log("kiran loginuser newUser", newUser);

  if (!newUser || !newUser.authenticate(password)) {
    const err = new apiError("Please verify your credentials.", 500);
    throw err;
  }
  return { user: newUser.toJSON(), token: newUser.generateToken(newUser) }; //user.generateToken();
};

export const addUser = async user => {
  let newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    password: user.password,
    role: user.role
  });
  let addedUser = await newUser.save();
  return addedUser;
};

export const updateUser = async user => {
  let newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    role: user.role
  });
  let userr = null;
  User.updateOne({ _id: user._id }, { $set: user }, function(
    err,
    newUpdatedUser
  ) {
    if (err) throw new apiError("unable to updated user.", 500);
    userr = newUpdatedUser;
  });
  return userr;
};

export const deleteUser = async id => {
  let deleteUser = null;
  await User.findByIdAndDelete(id, (err, user) => {
    if (err) throw new apiError("unable to delete user.", 500);
    deleteUser = user;
  });
  return deleteUser;
};
