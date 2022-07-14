import { Request } from "express";

import UserTypes from "../types/user.types";

export type UserRequest = Request & {
   user?: UserTypes;
};
