/*
 * @Date: 2020-05-29 11:05:46
 * @LastEditTime: 2020-07-27 20:48:08
 */

// import React from "react";
import router from '@/router';
import dva from 'dva';
import createLoading from 'dva-loading';

import _ from 'lodash';
import models from '@/models';

import '@/styles/base.less';

const app = dva();

app.use(createLoading());

_.map(_.values(models), (item) => app.model(item));

app.router(router);

app.start('#app');
