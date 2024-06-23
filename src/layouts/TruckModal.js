import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Modal, Row } from "antd";
import AlertSuccessModal from "./alert/AlertSuccessModal";
import AlertWarningModal from "./alert/AlertWarningModal";
import { useDispatch } from "react-redux";
import {
  addTrucks,
  registerTrucks,
  updateTruck,
  updateTrucks,
} from "../store/action/OrderAction";

const { Option } = Select;
const TruckModal = ({ title, data, open, onClose }) => {
  const [form] = Form.useForm();
  console.log("data from modal ", data);
  const [successModal, openSuccessModal] = useState(false);
  const [warningModal, openWarningModal] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    // Set initial form values when data changes
    if (Object.keys(data).length !== 0) {
      form.setFieldsValue({
        truck_id: data.truck_id,
        truck_type: data.truck_type,
        shift: data.shift,
      });
    }
  }, [data, form]);

  // Form submission handler
  const onFinish = async (values) => {
    if (Object.keys(data).length !== 0) {
      dispatch(updateTruck(values));
      form.resetFields();
      onClose();
      // console.log(response);
      // if (response.status === 200) {
      //   setMessage("Truck successfully updated.");
      //   openSuccessModal(true);
      //   onClose();
      //   form.resetFields();
      // } else {
      //   setMessage("Internal Server Error.");
      //   openWarningModal(true);
      // }
    } else {
      dispatch(registerTrucks(values));
      form.resetFields();
      onClose();

      // if (response.status === 200) {
      //   setMessage("Truck successfully registered.");
      //   console.log("truck register success in modal ");
      //   openSuccessModal(true);
      //   onClose();
      //   form.resetFields();
      // } else if (response.status === 409) {
      //   setMessage("Truck already exists.");
      //   openWarningModal(true);
      // } else {
      //   setMessage("Internal Server Error.");
      //   openWarningModal(true);
      // }
    }
  };

  return (
    <>
      <Modal
        title={title}
        open={open}
        onCancel={() => {
          form.resetFields();
          onClose();
        }}
        footer={null} // Custom footer button
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          labelAlign="left"
          wrapperCol={{ span: 12 }}
        >
          <Form.Item
            label="Truck ID"
            name="truck_id"
            rules={[{ required: true, message: "Please input truck ID!" }]}
          >
            <Input disabled={Object.keys(data).length !== 0 ? true : false} />
          </Form.Item>

          <Form.Item
            label="Truck Type"
            name="truck_type"
            rules={[{ required: true, message: "Please select truck type!" }]}
          >
            <Select>
              <Option value="0">Non-Hala</Option>
              <Option value="1">Hala</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Shift"
            name="shift"
            rules={[{ required: true, message: "Please select shift!" }]}
          >
            <Select>
              <Option value="0">Morning</Option>
              <Option value="1">Whole Day</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 12 }}>
            <Row>
              <Button
                onClick={() => {
                  form.resetFields();
                  onClose();
                }}
                style={{
                  width: 100,
                  marginRight: 8,
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                {Object.keys(data).length !== 0 ? "Update" : "Register"}
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
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
    </>
  );
};

export default TruckModal;
