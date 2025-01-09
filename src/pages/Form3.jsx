
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form as AntdForm,
  Input,
  Space,
  DatePicker,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { form3submit } from "../api/Form1Api";
import { useNavigate } from "react-router-dom";
import { router } from "../Routes/Router";

const { TextArea } = Input;

const Form3 = () => {
  const [form] = AntdForm.useForm(); // Get the form instance
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
        "scope_certificate": "",
        "holder": "",
        "version": "",
        "certification_body": "",
        "place_and_date_of_issue": "",
        "last_updated": "",
        "address": "",
        "ceo": "",
        "idfl_license-no": "",
        "note": "",
      //   "products_appendix": [
      //   {
      //     "product_number": "",
      //     "product_category_product_details": "",
      //     "material_composition": "",
      //     "standard": "",
      //     "facility_name": [""],
      //   },
      // ],
      "products_appendix": [
        {
          "product_number": "",
          "category": "",
          "product_details": "",
          "material_composition": "",
          "label_grade": "",
          "facility_number": [""],
        }
      ],
      "site_appendix": [
        {
            "facility_name": "",
            "process_categories": "",
            "address": "",
        },
      ],
      "independently_certified_subcontractor_appendix": [
        {
            "subcontractor_name": "",
            "certification_body": "",
            "expiry_date": "",
            "address": "",
            "process_categories": "",
            "standards": "",
            "number": "",
            "license_number": "",
        },
      ]
    });
  }, [form]);

  // Handle form submission with typed values
  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    const payload = {
      file_name: "ScopeCertificate_Example.pdf",
      extracted_data: {...values}
    }
    await form3submit(payload);
    // navigate("/form3view", { state: { formData: values }});
    navigate("/list-form-3");
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <h2 className="text-3xl md:text-4xl font-medium mb-6 text-center">
        GOTS Certificate Form
      </h2>
      <AntdForm
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="form-container p-6 rounded-lg shadow-md bg-white"
        style={{ maxWidth: 900, margin: "0 auto" }}
        initialValues={{ "facility_number": [""] }}
      >

        <h3 className="text-xl font-semibold mb-4">1. Scope Certificate</h3>
        <div className="product-item border border-gray-300 rounded-md p-4 mb-4">
            <div className="flex flex-wrap -mx-2">
                <AntdForm.Item
                    label="Scope Certificate Number"
                    name="scope_certificate"
                    className="px-2 w-full md:w-1/2"
                >
                    <Input placeholder="Enter Scope Certificate Number" />
                </AntdForm.Item>
                <AntdForm.Item
                    label="Holder"
                    name="holder"
                    className="px-2 w-full md:w-1/2"
                >
                    <Input placeholder="Enter Holder" />
                </AntdForm.Item>
            </div>
            <div className="flex flex-wrap -mx-2">
                <AntdForm.Item
                    label="Version"
                    name="version"
                    className="px-2 w-full md:w-1/2"
                >
                    <Input placeholder="Enter Version" />
                </AntdForm.Item>
                <AntdForm.Item
                    label="Certification Body"
                    name="certification-body"
                    className="px-2 w-full md:w-1/2"
                >
                    <Input placeholder="Enter Certification Body" />
                </AntdForm.Item>
            </div>
            <div className="flex flex-wrap -mx-2">
                <AntdForm.Item
                    label="Place and Date of Issue (YYYY-MM-DD)"
                    name="place_and_date_of_issue"
                    className="px-2 w-full md:w-1/2"
                >
                    <DatePicker className="w-full"/>
                </AntdForm.Item>
                <AntdForm.Item
                    label="Last Updated"
                    name="last_updated"
                    className="px-2 w-full md:w-1/2"
                >
                    <DatePicker className="w-full"/>
                </AntdForm.Item>
            </div>
            <div className="flex flex-wrap -mx-2">
                <AntdForm.Item
                    label="Address"
                    name="address"
                    className="px-2 w-full md:w-1/2"
                >
                    <Input placeholder="Enter Address" />
                </AntdForm.Item>
                <AntdForm.Item
                    label="CEO"
                    name="ceo"
                    className="px-2 w-full md:w-1/2"
                >
                    <Input placeholder="Enter CEO" />
                </AntdForm.Item>
            </div>
            <div className="flex flex-wrap -mx-2">
                <AntdForm.Item
                    label="IDFL License No"
                    name="idfl_license_no"
                    className="px-2 w-full md:w-1/2"
                >
                    <Input placeholder="Enter IDFL License No" />
                </AntdForm.Item>
                <AntdForm.Item
                    label="Note"
                    name="note"
                    className="px-2 w-full md:w-1/2"
                >
                    <Input placeholder="Enter Note" />
                </AntdForm.Item>
            </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">2. Products Appendix</h3>
        <AntdForm.List name="products_appendix">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="product-item border border-gray-300 rounded-md p-4 mb-4"
                >
                  <div className="flex flex-wrap -mx-2">
                    <AntdForm.Item
                      {...restField}
                      label="Product Number"
                      name={[name, "product_number"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Product Number" />
                    </AntdForm.Item>
                    <AntdForm.Item
                      {...restField}
                      label="Product Category "
                      name={[name, "category"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Product Category" />
                    </AntdForm.Item>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                  <AntdForm.Item
                      {...restField}
                      label="Product Details "
                      name={[name, "product_details"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Product Details" />
                    </AntdForm.Item>
                    <AntdForm.Item
                      {...restField}
                      label="Material Composition"
                      name={[name, "material_composition"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Material Composition" />
                    </AntdForm.Item>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    
                    <AntdForm.Item
                      {...restField}
                      label="Standard (Label Grade)"
                      name={[name, "label_grade"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Standard (Label Grade)" />
                    </AntdForm.Item>
                  </div>
                  <AntdForm.List name={[name, "facility_number"]}>
                    {(facilityFields, { add: addFacility, remove: removeFacility }) => (
                      <>
                        <h4 className="font-semibold mb-2">Facility Number(s)</h4>
                        {facilityFields.map(({ key: facilityKey, name: facilityName }) => (
                          <div key={facilityKey} className="flex items-center mb-2">
                            <AntdForm.Item
                              name={[facilityName]}
                              rules={[{ required: true, message: "Enter Facility Number" }]}
                              style={{ flex: 1 }}
                            >
                              <Input placeholder="Facility Number" />
                            </AntdForm.Item>
                            {facilityFields.length > 1 && (
                              <MinusCircleOutlined
                                className="ml-2 text-red-500"
                                onClick={() => removeFacility(facilityName)}
                              />
                            )}
                          </div>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => addFacility("")}
                          icon={<PlusOutlined />}
                          block
                        >
                          Add Facility Number
                        </Button>
                      </>
                    )}
                  </AntdForm.List>
                  {fields.length > 1 && (
                    <Button
                      type="text"
                      danger
                      className="mt-4"
                      onClick={() => remove(name)}
                    >
                      Remove Product
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    "product_number": "",
                    "category": "",
                    "product_details": "",
                    "material_composition": "",
                    "label_grade": "",
                    "facility_number": [""],
                  })
                }
                icon={<PlusOutlined />}
                block
                className="mb-4"
              >
                Add New Product
              </Button>
            </>
          )}
        </AntdForm.List>

        <h3 className="text-xl font-semibold mb-4">3. Site Appendix</h3>
        <AntdForm.List name="site_appendix">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="product-item border border-gray-300 rounded-md p-4 mb-4"
                >
                  <div className="flex flex-wrap -mx-2">
                    <AntdForm.Item
                      {...restField}
                      label="Facility Name - TE-ID"
                      name={[name, "facility_name"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Facility Name - TE-ID" />
                    </AntdForm.Item>
                    <AntdForm.Item
                      {...restField}
                      label="Process Categories"
                      name={[name, "process_categories"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Process Categories" />
                    </AntdForm.Item>
                  </div>
                  {/* <div className="flex flex-wrap -mx-2"> */}
                    <AntdForm.Item
                      {...restField}
                      label="Address"
                      name={[name, "address"]}
                      className="px-2 w-full"
                    >
                      <Input placeholder="Enter Address" />
                    </AntdForm.Item>
                  {/* </div> */}
                  {fields.length > 1 && (
                    <Button
                      type="text"
                      danger
                      className="mt-4"
                      onClick={() => remove(name)}
                    >
                      Remove Site
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    "facility_name": "",
                    "process_categories": "",
                    "address": ""
                  })
                }
                icon={<PlusOutlined />}
                block
                className="mb-4"
              >
                Add New Site
              </Button>
            </>
          )}
        </AntdForm.List>

        <h3 className="text-xl font-semibold mb-4">4. Independently Certified Subcontractor Appendix</h3>
        <AntdForm.List name="independently_certified_subcontractor_appendix">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  className="product-item border border-gray-300 rounded-md p-4 mb-4"
                >
                  <div className="flex flex-wrap -mx-2">
                    <AntdForm.Item
                      {...restField}
                      label="Subcontractor Name - TE-ID"
                      name={[name, "subcontractor_name"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Subcontractor Name - TE-ID" />
                    </AntdForm.Item>
                    <AntdForm.Item
                      {...restField}
                      label="Certification Body"
                      name={[name, "certification_body"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Certification Body" />
                    </AntdForm.Item>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <AntdForm.Item
                      {...restField}
                      label="Expiry Date"
                      name={[name, "expiry_date"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <DatePicker className="w-full"/>
                    </AntdForm.Item>
                    <AntdForm.Item
                      {...restField}
                      label="Address"
                      name={[name, "address"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Address" />
                    </AntdForm.Item>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    <AntdForm.Item
                      {...restField}
                      label="Process Categories"
                      name={[name, "process_categories"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Process Categories" />
                    </AntdForm.Item>
                    <AntdForm.Item
                      {...restField}
                      label="Standards"
                      name={[name, "standards"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Standards" />
                    </AntdForm.Item>
                    <AntdForm.Item
                      {...restField}
                      label="Number"
                      name={[name, "number"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter Number" />
                    </AntdForm.Item>
                    <AntdForm.Item
                      {...restField}
                      label="License Number"
                      name={[name, "license_number"]}
                      className="px-2 w-full md:w-1/2"
                    >
                      <Input placeholder="Enter License Number" />
                    </AntdForm.Item>
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="text"
                      danger
                      className="mt-4"
                      onClick={() => remove(name)}
                    >
                      Remove Subcontractor
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  add({
                    "subcontractor_name": "",
                    "certification_body": "",
                    "expiry_date": "",
                    "address": "",
                    "process_categories": "",
                    "standards": ""
                  })
                }
                icon={<PlusOutlined />}
                block
                className="mb-4"
              >
                Add New Subcontractor
              </Button>
            </>
          )}
        </AntdForm.List>
        <AntdForm.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </AntdForm.Item>
      </AntdForm>
    </div>
  );
  
};

export default Form3;
