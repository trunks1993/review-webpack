/*
 * @Date: 2020-07-02 16:24:34
 * @LastEditTime: 2020-07-02 22:03:35
 */
// layout下的子模块
import Dashboard from '@/pages/dashboard';
import Shop from '@/pages/shop';
import Operations from '@/pages/operations';
import Fund from '@/pages/fund';

import ShopHome from '@/pages/shop/home';
import PurchaseOrder from '@/pages/shop/purchaseOrder';
import ServiceOrder from '@/pages/shop/serviceOrder';

import module_shop_menu_icon from '@/assets/images/global/module_shop_menu_icon.png';
import module_fund_menu_icon from '@/assets/images/global/module_fund_menu_icon.png';
import module_operations_menu_icon from '@/assets/images/global/module_operations_menu_icon.png';

// 动态路由
export const asyncRoutes = [
  {
    id: 0,
    title: '首页',
    path: '/dashboard',
    component: Dashboard,
  },
  {
    id: 1,
    title: '权益商城',
    component: Shop,
    path: '/shop',
    icon: module_shop_menu_icon,
    children: [
      {
        id: 11,
        title: '权益商城',
        path: '/home',
        icon: 'icon-gouwuche',
        component: ShopHome,
      },
      {
        id: 12,
        title: '采购管理',
        icon: 'icon-shujuguanli',
        children: [
          {
            id: 121,
            title: '采购订单',
            path: '/purchaseOrder',
            component: PurchaseOrder,
          },
          {
            id: 122,
            title: '售后订单',
            path: '/serviceOrder',
            component: ServiceOrder,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: '运营管理',
    component: Operations,
    icon: module_operations_menu_icon,
    path: '/operations',
    children: [
      {
        id: 21,
        title: '交易管理',
        path: '/dashboard',
        icon: 'icon-tongji',
        children: [
          {
            id: 211,
            title: '交易订单',
            path: '/dashboard',
            component: Dashboard,
          },
          {
            id: 212,
            title: '交易对账',
            path: '/dashboard',
            component: Dashboard,
          },
        ],
      },
      {
        id: 22,
        title: '业务管理',
        path: '/dashboard',
        icon: 'icon-guanli',
        children: [
          {
            id: 221,
            title: '应用信息',
            path: '/dashboard',
            component: Dashboard,
          },
          {
            id: 222,
            title: '实名认证',
            path: '/dashboard',
            component: Dashboard,
          },
          {
            id: 223,
            title: '账号信息',
            path: '/dashboard',
            component: Dashboard,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: '资金管理',
    component: Fund,
    icon: module_fund_menu_icon,
    path: '/fund',
    children: [
      {
        id: 31,
        title: '资金总览',
        path: '/dashboard',
        icon: 'icon-tongji',
        component: Dashboard,
      },
      {
        id: 32,
        title: '充值提现',
        path: '/dashboard',
        icon: 'icon-qiandai',
        children: [
          {
            id: 321,
            title: '充值',
            path: '/dashboard',
            component: Dashboard,
          },
          {
            id: 322,
            title: '提现',
            path: '/dashboard',
            component: Dashboard,
          },
          {
            id: 323,
            title: '资金流水',
            path: '/dashboard',
            component: Dashboard,
          },
        ],
      },
      {
        id: 33,
        title: '财务管理',
        path: '/dashboard',
        icon: 'icon-guanli',
        children: [
          {
            id: 331,
            title: '财务流水',
            path: '/dashboard',
            component: Dashboard,
          },
          {
            id: 332,
            title: '财务对账',
            path: '/dashboard',
            component: Dashboard,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: '消息',
    path: '/message',
    hidden: true,
    component: Dashboard,
  },
  {
    id: 5,
    title: '购物车',
    path: '/car',
    hidden: true,
    component: Dashboard,
  },
];
