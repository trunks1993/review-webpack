/*
 * @Date: 2020-07-02 16:24:34
 * @LastEditTime: 2020-07-16 19:31:56
 */
// layout下的子模块
import ChildLayout from '@/pages';
import Dashboard from '@/pages/dashboard';
import Pay from '@/pages/pay';

import ShopHome from '@/pages/shop/home';
import PurchaseOrder from '@/pages/shop/purchaseOrder';
import ServiceOrder from '@/pages/shop/serviceOrder';

/** 运营管理-交易管理--交易订单 */
import Order from '@/pages/operations/transaction/Order';
/** 运营管理-交易管理--交易对账 */
import Reconciliation from '@/pages/operations/transaction/Reconciliation';

/** 运营管理-业务管理--应用信息 */
import Application from '@/pages/operations/businessInfo/application';
/** 运营管理-业务管理--修改应用 */
import ModifyApp from '@/pages/operations/businessInfo/modifyApp';
/** 运营管理-业务管理--账号信息 */
import Account from '@/pages/operations/businessInfo/account';

import module_shop_menu_icon from '@/assets/images/global/module_shop_menu_icon.png';
import module_fund_menu_icon from '@/assets/images/global/module_fund_menu_icon.png';
import module_operations_menu_icon from '@/assets/images/global/module_operations_menu_icon.png';

// 动态路由
export const asyncRoutes = [
  {
    id: 0,
    title: '首页',
    path: '/admin/dashboard',
    component: Dashboard,
  },
  {
    id: 1,
    title: '权益商城',
    component: ChildLayout,
    path: '/admin/shop',
    icon: module_shop_menu_icon,
    children: [
      {
        id: 11,
        title: '权益商城',
        path: '/admin/shop/home',
        icon: 'icon-gouwuche',
        component: ShopHome,
        isLeaf: true,
      },
      {
        id: 12,
        title: '采购管理',
        icon: 'icon-shujuguanli',
        children: [
          {
            id: 121,
            title: '采购订单',
            path: '/admin/shop/purchaseOrder',
            component: PurchaseOrder,
            isLeaf: true,
          },
          {
            id: 122,
            title: '售后订单',
            path: '/admin/shop/serviceOrder',
            component: ServiceOrder,
            isLeaf: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: '运营管理',
    component: ChildLayout,
    icon: module_operations_menu_icon,
    path: '/admin/operations',
    children: [
      {
        id: 21,
        title: '交易管理',
        icon: 'icon-tongji',
        children: [
          {
            id: 211,
            title: '交易订单',
            path: '/admin/operations/transaction/order',
            component: Order,
            isLeaf: true,
          },
          {
            id: 212,
            title: '交易对账',
            path: '/admin/operations/transaction/reconciliation',
            component: Reconciliation,
            isLeaf: true,
          },
        ],
      },
      {
        id: 22,
        title: '业务管理',
        icon: 'icon-guanli',
        children: [
          {
            id: 221,
            title: '应用信息',
            path: '/admin/operations/businessInfo/application',
            component: Application,
            isLeaf: true,
          },
          {
            id: 221,
            title: '修改应用',
            path: '/admin/operations/businessInfo/modifyapp',
            component: ModifyApp,
            isLeaf: true,
          },
          {
            id: 222,
            title: '实名认证',
            path: '/dashboard',
            component: Dashboard,
            isLeaf: true,
          },
          {
            id: 223,
            title: '账号信息',
            path: '/admin/operations/businessInfo/account',
            component: Account,
            isLeaf: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: '资金管理',
    component: ChildLayout,
    icon: module_fund_menu_icon,
    path: '/admin/fund',
    children: [
      {
        id: 31,
        title: '资金总览',
        path: '/dashboard',
        icon: 'icon-tongji',
        component: Dashboard,
        isLeaf: true,
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
            isLeaf: true,
          },
          {
            id: 322,
            title: '提现',
            path: '/dashboard',
            component: Dashboard,
            isLeaf: true,
          },
          {
            id: 323,
            title: '资金流水',
            path: '/dashboard',
            component: Dashboard,
            isLeaf: true,
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
            isLeaf: true,
          },
          {
            id: 332,
            title: '财务对账',
            path: '/dashboard',
            component: Dashboard,
            isLeaf: true,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: '消息',
    path: '/admin/message',
    hidden: true,
    component: Dashboard,
  },
  {
    id: 5,
    title: '购物车',
    path: '/admin/car',
    hidden: true,
    component: Dashboard,
  },
  {
    id: 6,
    title: '支付',
    path: '/admin/pay',
    component: Pay,
  },
];
