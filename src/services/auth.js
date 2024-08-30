import { User } from "../db/models/user.js";

export const createUser = async (payload) => {
return await User.create(payload);
};
