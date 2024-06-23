import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import "../common/common.css";

function HeaderLayout() {
  const location = useLocation();
  return (
    <div>
      <Menu
        mode="horizontal"
        style={{
          display: "flex",
          background: "#EBEEF3",
          alignItems: "center",
        }}
        defaultSelectedKeys={["/import-orders"]}
        selectedKeys={location.pathname}
      >
        <Menu.Item key="/import-orders">
          <Link to="/import-orders">Import Orders</Link>
        </Menu.Item>
        <Menu.Item key="/trucks">
          <Link to="/trucks">Trucks</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default HeaderLayout;
