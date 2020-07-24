import React from "react";
import { connect } from "dva";

import { Layout, Menu, Badge, Popover } from "antd";

const { Header } = Layout;
import { asyncRoutes } from "@/router/config";
import DropMenu from "./DropMenu";
import noImg from "@/assets/images/global/no-img.png";
import icon1 from "@/assets/images/layout/icon1.png";
import icon2 from "@/assets/images/layout/icon2.png";

const Name = ({ user, dispatch }) => (
  <Popover
    placement="bottom"
    content={<DropMenu user={user} dispatch={dispatch} />}
    trigger="hover"
  >
    <span>
      <img
        className="layout_header-img"
        src={`${user.headIcon ? process.env.FILE_URL + user.headIcon : noImg}`}
      />
    </span>
  </Popover>
);

const Comp = (props) => {
  const { carCount, user, path, history } = props;

  return (
    <Header>
      <div className="layout_header-main">
        <div className="logo">
          <img
            width="81px"
            height="37px"
            src={process.env.FILE_URL + "/data/static/img/100001.png"}
          />
          <span className="layout_header-logo">助力企业数字化转型</span>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[path]}
          style={{ lineHeight: "60px" }}
        >
          {_.map(
            asyncRoutes,
            (item) =>
              !item.hidden && (
                <Menu.Item
                  key={item.path}
                  onClick={(e) => history.push(`${item.path}`)}
                >
                  {item.title}
                </Menu.Item>
              )
          )}
          <Menu.Item onClick={(e) => window.open("")}>文档中心</Menu.Item>
        </Menu>

        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "60px" }}>
          <Menu.Item onClick={(e) => history.push("/admin/message")}>
            <img className="layout_header-icon" src={icon2} />
            <span>消息(2)</span>
          </Menu.Item>
          <Menu.Item onClick={(e) => history.push("/admin/car")}>
            <Badge dot={!!carCount}>
              <img className="layout_header-icon" src={icon1} />
            </Badge>
            <span>购物车</span>
          </Menu.Item>
          <Name user={user} />
        </Menu>
      </div>
    </Header>
  );
};

export default connect(({ app, account }) => ({
  carCount: app.carCount,
  user: account.user,
}))(Comp);
