import { combineReducers } from "redux";
import app from "./app";
import game from "./game";
import chess from "./chess";

// 合并所有模块的reducer成一个根reducer
const rootReducer = combineReducers({
  app,
  game,
  chess
});

export default rootReducer;
