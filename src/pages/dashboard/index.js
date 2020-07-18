/*
 * @Date: 2020-07-01 11:32:59
 * @LastEditTime: 2020-07-17 14:55:06
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import Title from './title';
import Content from './content';
import Footer from './footer';
import User from './user';
import Platform from './platform';
import { getAccount } from '@/services/dashboard';

const dashboard = ({ list }) => {
  const [amountList, setAmountList] = useState({});

  useEffect(() => {
    getNumber();
  }, []);

  /** 获取用户账号余额 */
  const getNumber = async () => {
    const [err, data, msg] = await getAccount();
    if (!err) {
      setAmountList(data);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <Title />
        <Content list={amountList} />
        <Footer />
      </div>
      <div className="dashboard-right">
        <User list={list} />
        <Platform />
      </div>
    </div>
  );
};

export default connect(({ account }) => ({
  list: account.user,
}))(dashboard);
