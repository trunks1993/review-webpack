/*
 * @Date: 2020-07-18 16:49:25
 * @LastEditTime: 2020-07-21 09:29:27
 */
import React from 'react';
import { connect } from 'dva';
import { Badge } from 'antd';
import car from '@/assets/images/shop/car.png';
import { createHashHistory } from 'history';
const history = createHashHistory();

const Car = (props) => {
  const { carData } = props;
  return (
    <div className="car-box">
      <div className="car-box_car" onClick={() => history.push('/admin/car')}>
        <Badge count={carData?.cartItemList?.length}>
          <img src={car} />
        </Badge>
        <span className="car-box_car-title">购物车</span>
      </div>
    </div>
  );
};
export default connect(({ account }) => ({ carData: account.carData }))(Car);
