import {
  Button,
  Cascader,
  ColorPicker,
  DatePicker,
  Form as AntdForm,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  message,
  Space,
  theme,
  Tag,
  InputRef
} from 'antd'
import React from 'react'
// const CustomFormItem  = ({ label, name, rules, placeholder }) => {
//   return (

//         <AntdForm.Item dependencies={[name]} noStyle>
//           {({ getFieldValue }) => (
//             <AntdForm.Item
//               label={label}
//               name={name}
//               className={`w-full md:w-[49%] ${!getFieldValue(name)?.trim() ? 'empty_field' : ''}`}
//               rules={rules}
//             >
//               <Input placeholder={placeholder} />
//             </AntdForm.Item>
//           )}
//         </AntdForm.Item>
//       );
// }

const CustomFormItem = ({ label, name, rules, placeholder,classList, component: Component, ...rest }) => (
  <AntdForm.Item dependencies={[name]} noStyle>
    {({ getFieldValue }) => (
      <AntdForm.Item
        label={label}
        name={name}
        className={`w-full md:w-[49%]   ${!getFieldValue(name)?.toString().trim() ? 'empty_field' : ''} ${classList}`}
        rules={rules}
      >
        <Component placeholder={placeholder} {...rest} className="datePickerIpnut"/>
      </AntdForm.Item>
    )}
  </AntdForm.Item>
);

export default CustomFormItem