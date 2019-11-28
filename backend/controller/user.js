import * as UserService from "../services/user.service";

export const getUser = async id => {
  const response = await UserService.getUser(id);
  return response;
};

export const getAllUsers = async () => {
  const response = await UserService.getAllUsers();
  return response;
};

export const addUser = async newUser => {
  const user = await UserService.addUser(newUser);
  return user;
};

export const updateUser = async user => {
  const updatedUser = await UserService.updateUser(user);
  return updatedUser;
};

export const deleteUser = async id => {
  const deuser = await UserService.deleteUser(id);
  return deuser;
};
