import React from "react";
import { Modal } from "antd";
import { ExclamationOutlined } from "@ant-design/icons";
import "./alert.css";

const AlertConfirmModal = ({ message, open, onClose, confirmFunc }) => {
  return (
    <Modal
      centered={true}
      width={350}
      open={open} // Set visible to true to display the modal
      onCancel={onClose} // Handle cancel event with onOk function
      footer={
        <button
          style={{
            backgroundColor: "#E13B0A",
            color: "white",
            width: "80px",
            border: "none",
            padding: "5px 0px",
            borderRadius: "6px",
          }}
          onClick={() => {
            confirmFunc();
            onClose();
          }}
        >
          OK
        </button>
      } // Custom footer button
    >
      <div>
        <div className="outer-exc">
          <div className="inner-exc">
            <ExclamationOutlined color="#D46B08" className="exc-icon" />
          </div>
        </div>
        <span>{message}</span>
      </div>
    </Modal>
  );
};

export default AlertConfirmModal;
