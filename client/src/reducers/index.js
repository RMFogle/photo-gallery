import { combineReducers } from "redux";

import photos from "./photos";
import errors from "./errors";

export const reducers = combineReducers({ photos, errors });