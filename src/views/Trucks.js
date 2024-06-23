import React, { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import TruckModal from "../layouts/TruckModal";
import { getTrucks, deleteTruck } from "../store/action/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import AlertWarningModal from "../layouts/alert/AlertWarningModal";
import AlertConfirmModal from "../layouts/alert/AlertConfirmModal";

const Trucks = () => {
  const [title, setTitle] = useState("");
  const [truckModal, openTruckModal] = useState(false);
  const [confirmModal, openConfirmModal] = useState(false);
  const [warningModal, openWarningModal] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [truckID, setTruckID] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrucks());
  }, [dispatch]);

  const columns = [
    {
      title: "Truck ID",
      dataIndex: "truck_id",
      key: "truck_id",
      width: 100,
    },
    {
      title: "Truck Type",
      dataIndex: "truck_type",
      key: "truck_type",
      width: 100,
      render: (type) => <span>{type === "0" ? "Non-Hala" : "Hala"}</span>,
    },
    {
      title: "Shift",
      dataIndex: "shift",
      key: "shift",
      width: 100,
      render: (shift) => (
        <span>{shift === "0" ? "8AM to 11:30 AM" : "7 AM to 16 PM"}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (text, record) => (
        <span>
          <Tag color="green" onClick={() => handleEdit(record)}>
            Edit
          </Tag>

          <Tag color="volcano" onClick={() => handleDelete(record)}>
            Delete
          </Tag>
        </span>
      ),
    },
  ];

  const NoDataComponent = () => (
    <div
      style={{
        height: "56vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      There are no trucks.
    </div>
  );

  // Edit Function
  const handleEdit = (record) => {
    // Implement your edit logic here
    console.log("Editing truck ID:", record.truck_id);
    // Example: Open a modal for editing
    // showModal(true);
    setTitle("Update Truck");
    setData(record);
    openTruckModal(true);
  };

  // Delete Truck Function
  const handleDelete = (record) => {
    console.log("Deleting truck ID:", record.truck_id);
    setTruckID(record.truck_id);
    setMessage("Are you sure to delete?");
    openConfirmModal(true);
  };

  const trucks = useSelector((state) => state.orderLists.trucks);
  console.log("Trucks list ", trucks);
  return (
    <div>
      <Button
        style={{ marginTop: 16 }}
        onClick={() => {
          setTitle("Add New Truck");
          setData({});
          openTruckModal(true);
        }}
      >
        Add New Truck
      </Button>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Table
          dataSource={trucks}
          sticky
          locale={{
            emptyText: <NoDataComponent />,
          }}
          size="small"
          columns={columns}
          pagination={{
            position: ["bottomCenter"],
          }}
        />
      </div>

      <TruckModal
        title={title}
        data={data}
        open={truckModal}
        onClose={() => openTruckModal(false)}
      />
      <AlertWarningModal
        message={message}
        open={warningModal}
        onClose={() => openWarningModal(false)}
      />
      <AlertConfirmModal
        message={message}
        open={confirmModal}
        onClose={() => openConfirmModal(false)}
        confirmFunc={() => {
          dispatch(deleteTruck(truckID));
        }}
      />
    </div>
  );
};

export default Trucks;
