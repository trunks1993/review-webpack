/*
 * @Author: Dad
 * @Date: 2020-07-14 10:16:03
 * @LastEditors: Dad
 * @LastEditTime: 2020-07-15 10:16:39
 */
import React, { useState } from 'react';
import EYE from '@/assets/images/dashboard/eye.png';
import UNEYE from '@/assets/images/dashboard/Uneye.png';
import GET from '@/assets/images/dashboard/get.png';
import SET from '@/assets/images/dashboard/set.png';
import UNSJ from '@/assets/images/dashboard/Unsj.png';
import { Icon, Tooltip, Button, Tabs } from 'antd';

const text1 = <span className="content-text" >当前账户可用余额</span>;
const text2 = <span className="content-text" >当前账户冻结金额</span>;
const operations = <span className="content-left--right">更多交易<Icon type="right-circle" style={{ marginLeft: 5 }} /></span>;

const content = ({ list }) => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="content">
      <div className="content-left">
        <div className="content-left--title">
                    我的余额
          <span onClick={() => setVisible(!visible)} style={{ marginLeft: 10 }}>
            <img src={visible ? EYE : UNEYE} alt="" />
          </span>
          <span className="content-left--right">
                      资金管理
            <Icon type="right-circle" style={{ marginLeft: 5 }} />
          </span>
        </div>
        <div className="content-left--content">
          <div className="content-balance">
            <div className="content-balance--left">
              <img src={GET} alt="" />
            </div>
            <div className="content-balance--right">
              <div className="content-balance--text" >
                {'账户可用余额(元)'}
                <Tooltip placement="right" title={text1}>
                  <Icon type="question-circle" theme="filled" style={{ marginLeft: 4 }} />
                </Tooltip>
              </div>
              <span className="content-balance--money">
                                ￥{visible ? list?.amount : '*****'}
              </span>
            </div>
          </div>
          <div style={{ clear: 'both' }} />
          <div className="content-balance">
            <div className="content-balance--left">
              <img src={SET} alt="" />
            </div>
            <div className="content-balance--right">
              <div className="content-balance--text" >
                {'账户冻结金额(元)'}
                <Tooltip placement="right" title={text2}>
                  <Icon type="question-circle" theme="filled" style={{ marginLeft: 4 }} />
                </Tooltip>
              </div>
              <span className="content-balance--money">
                                ￥{visible ? list?.frozeAmount : '*****'}
              </span>
            </div>
          </div>
          <div style={{ clear: 'both' }} />
          <div>
            <Button type="primary" className="content-but--left">充值</Button>
            <Button className="content-but--right">提现</Button>
          </div>
        </div>
      </div>
      <div className="content-right">
        <Tabs tabBarExtraContent={operations}>
          <Tabs.TabPane tab={<div className="content-title">昨日交易</div>} key="1">
            <div className="content-sj">
              <img src={UNSJ} alt="" />
              <div>暂无数据</div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab={<div className="content-title">昨日收支</div>} key="2">
            <div className="content-sj">
              <img src={UNSJ} alt="" />
              <div>暂无数据</div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className="content-clean" />
    </div>
  );
};
export default content;
