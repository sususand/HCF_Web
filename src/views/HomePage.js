import React, { useState } from "react";
import { Upload, Button, Table, Tag } from "antd";
import { connect, useSelector } from "react-redux";
import {
  uploadOrders,
  planHala,
  planNonHala,
} from "../store/action/OrderAction";
import Papa from "papaparse"; // A powerful CSV parser library for JavaScript
import { InboxOutlined, CarOutlined } from "@ant-design/icons";
import "../common/common.css";
import AlertSuccessModal from "../layouts/alert/AlertSuccessModal";
import AlertWarningModal from "../layouts/alert/AlertWarningModal";
import moment from "moment";

const NoDataComponent = () => (
  <div
    style={{
      height: "56vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    There are no customer orders.
  </div>
);

const HomePage = ({ uploadOrders, planNonHala, planHala }) => {
  const csvData = useSelector((state) => state.orderLists.orders);

  const [successModal, openSuccessModal] = useState(false);
  const [warningModal, openWarningModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileUpload = ({ file }) => {
    // Check if file is a CSV
    console.log(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      const csv = e.target.result;
      // Parse CSV data
      Papa.parse(csv, {
        complete: async (result) => {
          // Filter out rows that are completely empty or null
          const filteredData = result.data.filter((row) => {
            // Check if all values in the row are empty or null
            return Object.values(row).some(
              (value) => value !== null && value !== ""
            );
          });

          // Extract data from parsed result
          console.log("after reading from csv file ", filteredData);
          if (filteredData && filteredData.length > 0) {
            await uploadOrders(filteredData).then((res) => {
              console.log("res from [home page] ", res);

              if (res) {
                if (res.status === 200) {
                  setMessage(res.msg);
                  openSuccessModal(true);
                  return;
                }
                setMessage(res.msg);
                openWarningModal(true);
              } else {
                setMessage("Internal server error .");
                openWarningModal(true);
              }
            });
          } else {
            setMessage("There is no order to import!");
            openWarningModal(true);
          }
        },
        header: true, // Assume first row as header
      });
    };

    reader.readAsText(file);
  };

  const columns = [
    {
      title: "Order Date",
      dataIndex: "order_created_date",
      key: "order_created_date",
      width: 100,
      render: (date) => <span>{moment(date).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      width: 200,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
    },
    {
      title: "Deli Fee",
      dataIndex: "delivery_fee",
      key: "delivery_fee",
      width: 100,
    },
    {
      title: "Order Type",
      dataIndex: "order_type",
      key: "order_type",
      width: 100,
      render: (text) => <span>{text === "1" ? "Hala" : "Non-Hala"}</span>,
    },
    {
      title: "Order Priority",
      dataIndex: "order_priority",
      key: "order_priority",
      width: 100,
      render: (text) => (
        <>{text === "1" ? <Tag color="green">Hight</Tag> : <Tag>Normal</Tag>}</>
      ),
    },
    {
      title: "Preferred Time",
      dataIndex: "prefer_time",
      key: "prefer_time",
      width: 100,
    },
    {
      title: "Preferred Shift",
      dataIndex: "prefer_shift",
      key: "prefer_shift",
      width: 100,
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const planHalaRoute = () => {
    planHala().then((response) => {
      console.log("respone s ", response);
      if (response) {
        setMessage(response.msg);
        if (response.status === 200) {
          openSuccessModal(true);
        } else {
          openWarningModal(true);
        }
      }
    });
  };
  const planNonHalaRoute = () => {
    planNonHala().then((response) => {
      console.log("Response from PlanNONRoutes", response);
      if (response) {
        setMessage(response.msg);
        if (response.status === 200) {
          openSuccessModal(true);
        } else openWarningModal(true);
      }
    });
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Upload
          customRequest={({ file }) => handleFileUpload({ file })}
          accept=".csv"
          maxCount={1}
          showUploadList={false} // Hide file list after upload
        >
          <p className="ant-upload-drag-icon">
            <Button>
              <InboxOutlined />
              Upload CSV File
            </Button>
          </p>
        </Upload>

        <div style={{ marginTop: 14 }}>
          <Button onClick={planHalaRoute}>
            <CarOutlined />
            Plan Hala Routes
          </Button>
          <Button onClick={planNonHalaRoute}>
            <CarOutlined /> Plan Non-Hala Routes
          </Button>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Table
          size="small"
          bordered
          scroll={{ x: "100%", y: "65vh" }}
          locale={{
            emptyText: <NoDataComponent />,
          }}
          sticky
          rowSelection={rowSelection}
          columns={columns}
          dataSource={csvData}
          pagination={{
            defaultPageSize: 50,
            position: ["bottomCenter"],
            total: csvData.length,
            showTotal: (total) => `Total ${total} orders`,
          }}
        />
      </div>
      <AlertSuccessModal
        message={message}
        open={successModal}
        onClose={() => openSuccessModal(false)}
      />
      <AlertWarningModal
        message={message}
        open={warningModal}
        onClose={() => openWarningModal(false)}
      />
    </div>
  );
};

const mapDispatchToProps = {
  uploadOrders,
  planHala,
  planNonHala,
};

export default connect(null, mapDispatchToProps)(HomePage);
