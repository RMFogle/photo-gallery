import { combineReducers } from "redux";

import photos from "./photos";
import errors from "./errors";
import alert from "./alert";
import auth from "./auth";

export const reducers = combineReducers({ photos, errors, alert, auth });