/*
 * @Author: Dad
 * @Date: 2020-07-15 11:40:08
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-17 14:58:55
 */
import React from 'react';
import UNHEAD from '@/assets/images/dashboard/Unhead.png';
import DELETE from '@/assets/images/operations/delete.png';
import EYE from '@/assets/images/dashboard/eye.png';
import UNEYE from '@/assets/images/dashboard/Uneye.png';
import { createHashHistory } from 'history';
const history = createHashHistory();
import { Button } from 'antd';

const List = ({ setVisible, appVisible, showDeleteConfirm, list }) => {
  return (
    <div className="app-list">
      <div className="app-list--head">
        <span className="app-list--headImg">
          <img
            src={list?.iconUrl ? process.env.FILE_URL + list?.iconUrl : UNHEAD}
            alt=""
          />
        </span>
        <span className="app-list--headInfo">
          <div className="app-list--headTitle">{list?.appName}</div>
          <div className="app-list--headDesc">{list?.resume}</div>
        </span>
        <span
          className="app-list--headIcon"
          onClick={() => showDeleteConfirm(list?.id)}
        >
          <img src={DELETE} alt="" />
        </span>
      </div>
      <div className="app-list--content">
        <div className="app-list--keyVal">
          <span className="app-list-key">AppKey:</span>
          <span className="app-list-val">{list?.appKey}</span>
        </div>
        <div className="app-list--keyVal">
          <span className="app-list-key">SecretKey:</span>
          <span className="app-list-val" style={{ fontSize: 10 }}>
            {appVisible[list.id]
              ? arrSecret[list.id]
              : '**********************'}
          </span>
          <span
            className="app-list-visible"
            onClick={() => setVisible(list?.id)}
          >
            <img src={appVisible[list.id] ? EYE : UNEYE} alt="" />
          </span>
        </div>
      </div>
      <div className="app-list--footer">
        <Button
          className="app-list--leftBut"
          onClick={() =>
            history.push(
              `/admin/operations/businessInfo/configapp?appId=${list?.id}`
            )
          }
        >
          应用配置
        </Button>
        <Button
          className="app-list--rightBut"
          onClick={() =>
            history.push(
              `/admin/operations/businessInfo/modifyapp?appId=${list?.id}`
            )
          }
        >
          修改
        </Button>
      </div>
    </div>
  );
};
export default List;
