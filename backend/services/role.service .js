import Role from "../models/Role";
import { apiError } from "../controller/apiError";

export const getRole = async id => {
  let existingRole = null;
  const role = await Role.findById(id, function(err, role) {
    if (err) throw new apiError("unable to find role.", 500);
    existingRole = role;
  });
  return existingRole;
};

export const getAllRoles = async () => {
  return Role.find({}).exec();
};

export const addRole = async role => {
  let newRole = new Role({
    role: role.name,
    description: role.description
  });
  let addedRole = await newRole.save();
  return addedRole;
};

export const updateRole = async role => {
  let newRole = new Role({
    role: role.name,
    description: role.description
  });
  let roler= null;
  Role.updateOne({ _id: role._id }, { $set: role }, function(
    err,
    newUpdatedRole
  ) {
    if (err) throw new apiError("unable to updated role.", 500);
    roler = newUpdatedRole;
  });
  return roler;
};

export const deleteRole = async id => {
  let deleteRole = null;
  await Role.findByIdAndDelete(id, (err, role) => {
    if (err) throw new apiError("unable to delete role.", 500);
    deleteRole = role;
  });
  return deleteRole;
};
