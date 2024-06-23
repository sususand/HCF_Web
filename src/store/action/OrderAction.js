export const addOrders = (orders) => ({
  type: "ADD_ORDERS",
  payload: orders,
});

export const addTrucks = (trucks) => ({
  type: "ADD_TRUCKS",
  payload: trucks,
});

export const updateTrucks = (trucks) => ({
  type: "UPDATE_TRUCKS",
  payload: trucks,
});

export const addAllTrucks = (trucks) => ({
  type: "ADD_ALL_TRUCKS",
  payload: trucks,
});

export const delTruck = (id) => ({
  type: "DELETE_TRUCK",
  payload: id,
});

export const uploadOrders = (orders) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:4000/upload-orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orders),
    });

    if (!response.ok) {
      console.log("Res", response);
    }

    // Parse response data
    const data = await response.json();
    dispatch(addOrders(data.resultData));
    return { status: response.status, msg: data.msg };
  } catch (error) {
    console.error("Connection failed for Order import. ", error.message);
    // Handle error cases
  }
};

export const planHala = () => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:4000/plan-hala-route`, {
      method: "POST",
    });
    console.log("Respone from hala action ", response);
    const res = await response.json();
    return { status: response.status, msg: res.msg };
  } catch (error) {
    console.error("Connection failed for Order import. ", error.message);
  }
};

export const planNonHala = () => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:4000/plan-non-hala-route`, {
      method: "POST",
    });
    console.log("Respone from non hala action ", response);
    const res = await response.json();
    return { status: response.status, msg: res.msg };
  } catch (error) {
    console.error("Connection failed for Order import. ", error.message);
  }
};

export const getTrucks = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:4000/get-trucks", {
      method: "GET",
    });
    console.log("Respone truck get ", response);
    if (!response.ok) {
      console.log("Res", response);
    }

    // Parse response data
    const data = await response.json();
    dispatch(addAllTrucks(data.resultData));
  } catch (error) {
    console.log("Connection failed for getting truck data . ", error);
  }
};

export const updateTruck = (values) => async (dispatch) => {
  console.log("Update values:", values);
  //Send data to backend API using axios
  await fetch("http://localhost:4000/update-truck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => {
      dispatch(updateTrucks(values));
      return { status: response.status };
    })
    .catch((error) => {
      console.error("Error adding truck:", error);
      // Handle error as needed
    });
};

export const registerTrucks = (values) => async (dispatch) => {
  console.log("add  values:", values);
  //Send data to backend API using axios
  await fetch("http://localhost:4000/add-truck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => {
      dispatch(addTrucks(values));
      return { status: response.status };
    })
    .catch((error) => {
      console.error("Error adding truck:", error);
    });
};

export const deleteTruck = (truck_id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:4000/delete-truck/${truck_id}`,
      {
        method: "DELETE",
      }
    );
    console.log("Respone truck delete ", response);
    if (!response.ok) {
      console.log("Res", response);
    }
    dispatch(delTruck(truck_id));
  } catch (error) {
    console.log("Connection failed for deleting truck. ", error);
  }
};
