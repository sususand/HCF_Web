const initialState = {
  orders: [],
  trucks: [],
  routes: [],
};
// Add a 'key' property to each object
const addKey = (csvData) => {
  return csvData.map((order, index) => ({
    ...order,
    key: index.toString(), // Use a unique identifier as key (index here, but ideally use a more meaningful unique identifier)
  }));
};

const OrderListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ORDERS":
      return {
        ...state,
        orders: addKey(action.payload),
      };

    case "ADD_ALL_TRUCKS":
      return {
        ...state,
        trucks: action.payload,
      };

    case "ADD_TRUCKS":
      console.log("add truck ", action.payload);
      return {
        ...state,
        trucks: [...state.trucks, action.payload],
      };

    case "UPDATE_TRUCKS":
      console.log("update truck ", action.payload);
      return {
        ...state,
        trucks: state.trucks.map((truck) =>
          truck.truck_id === action.payload.truck_id
            ? { ...truck, ...action.payload }
            : truck
        ),
      };

    case "DELETE_TRUCK":
      console.log("delete truck ", action.payload);
      return {
        ...state,
        trucks: state.trucks.filter(
          (truck) => truck.truck_id !== action.payload
        ), // Filter out the deleted truck by truck_id
      };

    default:
      return state;
  }
};

export default OrderListsReducer;
