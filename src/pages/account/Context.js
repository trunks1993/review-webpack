/*
 * @Date: 2020-06-30 14:21:12
 * @LastEditTime: 2020-06-30 16:25:08
 */

import { createContext } from "react";

const Context = createContext(() => {});
const SignInLoadingContext = createContext(false);

export { Context, SignInLoadingContext };
