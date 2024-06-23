import { combineReducers } from "redux";
import OrderListsReducer from "./OrderListReducer"; // Create this reducer

const rootReducer = combineReducers({
  orderLists: OrderListsReducer,
  // Add more reducers if needed
});

export default rootReducer;
