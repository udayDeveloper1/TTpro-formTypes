import { Form as AntdForm, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const CustomFormList = ({ name, label, placeholder }) => {
  return (
    <AntdForm.List name={name}>
      {(fields, { add, remove }) => (
        <>
          <AntdForm.Item label={label} required className='w-full md:w-[49%]'>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                <AntdForm.Item
                  {...restField}
                  name={[name, 'value']} // Ensure correct field naming
                  rules={[{ required: true, message: `${label} is required` }]}
                  style={{ flex: 1 }}
                >
                  <Input placeholder={placeholder} />
                </AntdForm.Item>

                {fields.length > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
              </Space>
            ))}

            <AntdForm.Item>
              <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                Add {label}
              </Button>
            </AntdForm.Item>
          </AntdForm.Item>
        </>
      )}
    </AntdForm.List>
  );
};

export default CustomFormList;
