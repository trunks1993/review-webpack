/*
 * @Date: 2020-06-23 10:24:25
 * @LastEditTime: 2020-06-23 22:53:26
 */

import React, { useState } from "react";
import MapForm from "@/components/MapForm";

const { CstInput } = MapForm;

export default () => {
  const [form, setForm] = useState({});
  return (
    <div>
      <MapForm onCreate={(form) => setForm(form)}>
        <CstInput
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "用户名不能为空",
            },
          ]}
        />
      </MapForm>
    </div>
  );
};
