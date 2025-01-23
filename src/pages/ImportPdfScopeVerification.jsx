import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form as AntdForm,
  Input,
  Space,
  DatePicker,
  message,
  Upload
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { form3submit, formFill3 } from "../api/Form1Api";
import moment from "moment";
import dayjs from "dayjs";

const ImportPdfScopeVerification = () => {
    const [form] = AntdForm.useForm();
    const [form2] = AntdForm.useForm();
    const [formNo, setFormNo] = useState('1');

    const handleResponse = (response) => {
        // Extract data from response
        const { scope_certificate, products_appendix, site_appendix, independently_certified_subcontractor_appendix } = response.extracted_data;
        // Populate form fields
        form2.setFieldsValue({
            scope_certificate: {
                certificate_number: scope_certificate.certificate_number,
                holder: scope_certificate.holder,
                version: scope_certificate.version,
                certification_body: scope_certificate.certification_body,
                address: scope_certificate.address,
                date_of_issue: dayjs(scope_certificate.date_of_issue, "DD/MM/YYYY"),
                ceo_name: scope_certificate.ceo_name,
                additional_notes: scope_certificate.additional_notes,
            },
          products_appendix: products_appendix.map((product) => ({
            product_number: product.product_number,
            category: product.category,
            product_details: product.product_details,
            material_composition: product.material_composition,
            label_grade: product.label_grade,
            facility_number: product.facility_number
          })),
          site_appendix: {
            facility_name: site_appendix.facility_name,
            address: site_appendix.address,
            process_categories: site_appendix.process_categories,
          },
          independently_certified_subcontractor_appendix: independently_certified_subcontractor_appendix.map((subcontractor) => ({
            subcontractor_name: subcontractor.subcontractor_name,
            number: subcontractor.number,
            license_number: subcontractor.license_number,
            certification_body: subcontractor.certification_body,
            expiry_date: dayjs(subcontractor.expiry_date, "DD/MM/YYYY"),
            address: subcontractor.address,
            process_categories: subcontractor.process_categories,
          })),
        });
      };

    const handleSubmit = async values => {
        console.log('Form submitted with values:', values)
        try {
          console.log(values.UploadPdf[0])
    
          let fomrData = new FormData()
          fomrData.append('pdf', values.UploadPdf[0].originFileObj)
          let res = await formFill3(fomrData)
          if(res) {
            handleResponse(res);
            setFormNo('2')
          }
        } catch (error) {
          console.log(error)
        }
      }

      const normFile = e => {
        if (Array.isArray(e)) {
          return e
        }
        return e?.fileList
      }

      const beforeUpload = file => {
        const isPdf = file.type === 'application/pdf'
        if (!isPdf) {
          message.error('You can only upload PDF files!')
          return
        }
        console.log(isPdf || Upload.LIST_IGNORE)
    
        return isPdf || Upload.LIST_IGNORE
      }

      useEffect(() => {
          form2.setFieldsValue({
              "scope_certificate": {
                "certificate_number": "",
                "holder": "",
                "version": "",
                "certification_body": "",
                "address": "",
                "ceo_name": "",
                "date_of_issue": "",
                "additional_notes": ""
            },
            "products_appendix": [
              {
                "product_number": "",
                "category": "",
                "product_details": "",
                "material_composition": "",
                "label_grade": "",
                "facility_number": "",
              }
            ],
            "site_appendix":
              {
                  "facility_name": "",
                  "process_categories": [""],
                  "address": "",
              },
            "independently_certified_subcontractor_appendix": [
              {
                  "subcontractor_name": "",
                  "certification_body": "",
                  "expiry_date": "",
                  "address": "",
                  "process_categories": [""],
                  // "standards": "",
                  "number": "",
                  "license_number": "",
              },
            ]
          });
        }, [form2]);

        // Handle form submission with typed values
  const handleSubmit2 = async (values) => {

    const formattedValues = {
      scope_certificate: {
        certificate_number: values.scope_certificate.certificate_number || "",
        holder: values.scope_certificate.holder || "",
        version: values.scope_certificate.version || "",
        certification_body: values.scope_certificate.certification_body || "",
        address: values.scope_certificate.address || "",
        ceo_name: values.scope_certificate.ceo_name || "",
        date_of_issue: values.scope_certificate.date_of_issue || "",
        additional_notes: values.scope_certificate.additional_notes || "",
      },
      site_appendix: {
        facility_name: values.site_appendix.facility_name || "",
        process_categories: values.site_appendix.process_categories || [""],
        address: values.site_appendix.address || "",
      },
      products_appendix: (values.products_appendix || []).map((product) => ({
        product_number: product.product_number || "",
        category: product.category || "",
        product_details: product.product_details || "",
        material_composition: product.material_composition || "",
        label_grade: product.label_grade || "",
        facility_number: product.facility_number || "",
      })),
      independently_certified_subcontractor_appendix: (
        values.independently_certified_subcontractor_appendix || []
      ).map((subcontractor) => ({
        subcontractor_name: subcontractor.subcontractor_name || "",
        certification_body: subcontractor.certification_body || "",
        expiry_date: subcontractor.expiry_date || "",
        address: subcontractor.address || "",
        process_categories: subcontractor.process_categories || [""],
        // standards: subcontractor.standards || "",
        number: subcontractor.number || "",
        license_number: subcontractor.license_number || "",
      })),
    }
    const payload = {
      file_name: "ScopeCertificate_Example.pdf",
      extracted_data: formattedValues
    }
    // console.log(payload);
    
    await form3submit(payload);
    // navigate("/form3view", { state: { formData: values }});
    // navigate("/list-form-3");
  };
// =================handle submit 2
        // const beforeUpload2 = file => {
        //     const isValidType = file.type === 'image/png' || file.type === 'image/jpeg'
        //     if (!isValidType) {
        //       message.error('You can only upload PNG or JPG files!')
        //     }
        //     return isValidType
        //   }
          return formNo === '1' ? (
  <AntdForm
              form={form}
              onFinish={handleSubmit}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout='vertical'
              className='form_1  rounded-xl shadow-xl'
              style={{ maxWidth: 800, margin: '0 auto' }}
              initialValues={{ UploadPdf: [] }}
            >
              <section className='section'>
                <h2 className=' pb-5 section-title'> Data Through Pdf: </h2>
                <div className=''>
                  <div className='flex items-center md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Upload Pdf Here'
                      name='UploadPdf'
                      valuePropName='fileList'
                      getValueFromEvent={normFile}
                      className='pt-5 w-full md:w-[49%] UploadPdf'
                      rules={[{ required: true, message: 'Please upload a PDF file!' }]}
                    >
                      <Upload
                        action='/upload.do'
                        listType='picture-card'
                        beforeUpload={beforeUpload}
                        accept='.pdf'
                        maxCount={1}
                        onChange={info => console.log('File List:', info.fileList)}
                      >
                        <button style={{ border: 0, background: 'none' }} type='button'>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload Pdf</div>
                        </button>
                      </Upload>
                    </AntdForm.Item>
                  </div>
                </div>
              </section>
        
              <AntdForm.Item className=' submitButtonGroup'>
                <Button type='primary' htmlType='submit' className='submit-btn '>
                  Submit
                </Button>
              </AntdForm.Item>
            </AntdForm>
          ) : (
                  <div className="container mx-auto py-10 px-4 md:px-0">
                        <h2 className="text-3xl md:text-4xl font-medium mb-6 text-center">
                          Scope Certificate Form
                        </h2>
                        <AntdForm
                          form={form2}
                          onFinish={handleSubmit2}
                          layout="vertical"
                          className="form-container p-6 rounded-lg shadow-md bg-white"
                          style={{ maxWidth: 900, margin: "0 auto" }}
                          initialValues={{ "process_categories": [""] }}
                        >
                  
                          <h3 className="text-xl font-semibold mb-4">1. Scope Certificate</h3>
                          <div className="product-item border border-gray-300 rounded-md p-4 mb-4">
                          {/* <AntdForm.List name="scope_certificate"> */}
                              <div className="flex flex-wrap -mx-2">
                                  <AntdForm.Item
                                      label="Scope Certificate Number"
                                      name={["scope_certificate", "certificate_number"]}
                                      className="px-2 w-full md:w-1/2"
                                  >
                                      <Input placeholder="Enter Scope Certificate Number" />
                                  </AntdForm.Item>
                                  <AntdForm.Item
                                      label="Holder"
                                      name={["scope_certificate", "holder"]}
                                      className="px-2 w-full md:w-1/2"
                                  >
                                      <Input placeholder="Enter Holder" />
                                  </AntdForm.Item>
                              </div>
                              <div className="flex flex-wrap -mx-2">
                                  <AntdForm.Item
                                      label="Version"
                                      name={["scope_certificate", "version"]}
                                      className="px-2 w-full md:w-1/2"
                                  >
                                      <Input placeholder="Enter Version" />
                                  </AntdForm.Item>
                                  <AntdForm.Item
                                      label="Certification Body"
                                      name={["scope_certificate", "certification_body"]}
                                      className="px-2 w-full md:w-1/2"
                                  >
                                      <Input placeholder="Enter Certification Body" />
                                  </AntdForm.Item>
                              </div>
                              <div className="flex flex-wrap -mx-2">
                                  <AntdForm.Item
                                      label="Address"
                                      name={["scope_certificate","address"]}
                                      className="px-2 w-full md:w-1/2"
                                  >
                                      <Input placeholder="Enter Address" />
                                  </AntdForm.Item>
                                  <AntdForm.Item
                                      label="CEO"
                                      name={["scope_certificate", "ceo_name"]}
                                      className="px-2 w-full md:w-1/2"
                                  >
                                      <Input placeholder="Enter CEO" />
                                  </AntdForm.Item>
                              </div>
                              <div className="flex flex-wrap -mx-2">
                              <AntdForm.Item
                                      label="Place and Date of Issue (YYYY-MM-DD)"
                                      name={["scope_certificate", "date_of_issue"]}
                                      className="px-2 w-full md:w-1/2"
                                  >
                                      <DatePicker className="w-full datePickerIpnut" format="DD/MM/YYYY" />
                                  </AntdForm.Item>
                                  <AntdForm.Item
                                      label="Note"
                                      name={["scope_certificate", "additional_notes"]}
                                      className="px-2 w-full md:w-1/2"
                                  >
                                      <Input placeholder="Enter Note" />
                                  </AntdForm.Item>
                              </div>
                            {/* </AntdForm.List> */}
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
                                    <AntdForm.Item
                                        label="Facility Number"
                                        name={[name, "facility_number"]}
                                        className="px-2 w-full md:w-1/2"
                                      >
                                        <Input placeholder="Enter Facility Number" />
                                      </AntdForm.Item>
                                    {/* <AntdForm.List name={[name, "facility_number"]}>
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
                                    </AntdForm.List> */}
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
                                      "facility_number": "",
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
                                  <div
                                    className="product-item border border-gray-300 rounded-md p-4 mb-4"
                                  >
                                    <div className="flex flex-wrap -mx-2">
                                      <AntdForm.Item
                                        label="Facility Name"
                                        name={["site_appendix", "facility_name"]}
                                        className="px-2 w-full md:w-1/2"
                                      >
                                        <Input placeholder="Enter Facility Name - TE-ID" />
                                      </AntdForm.Item>
                                      <div>
                                                  <AntdForm.List name={["site_appendix", "process_categories"]}>
                                                    {(fields, { add, remove }) => (
                                                        <AntdForm.Item label="Process Category" required>
                                                          {fields.map(({ key, name, ...restField }, index) => (
                                                            <Space
                                                              key={key}
                                                              style={{ display: "flex", marginBottom: 8 }}
                                                              align="baseline"
                                                            >
                                                              <AntdForm.Item
                                                                {...restField}
                                                                name={[name]}                                      
                                                                style={{ flex: 1 }}
                                                              >
                                                                <Input
                                                                  placeholder={`Process Category ${index + 1}`}
                                                                />
                                                              </AntdForm.Item>
                                      
                                                              {/* Conditionally render the remove button if more than one item exists */}
                                                              {fields.length > 1 && (
                                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                                              )}
                                                            </Space>
                                                          ))}
                                      
                                                          <AntdForm.Item>
                                                            <Button
                                                              type="dashed"
                                                              onClick={() => add()}
                                                              block
                                                              icon={<PlusOutlined />}
                                                            >
                                                              Add field
                                                            </Button>
                                                          </AntdForm.Item>
                                                        </AntdForm.Item>
                                                    )}
                                                  </AntdForm.List>
                                                </div>
                                    </div>
                                      <AntdForm.Item
                                        label="Address"
                                        name={["site_appendix", "address"]}
                                        className="px-2 w-full"
                                      >
                                        <Input placeholder="Enter Address" />
                                      </AntdForm.Item>
                                    {/* </div> */}
                                    
                                  </div>
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
                                        <DatePicker className="w-full datePickerIpnut"format="DD/MM/YYYY"/>
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
                                      {/* <AntdForm.Item
                                        {...restField}
                                        label="Process Categories"
                                        name={[name, "process_categories"]}
                                        className="px-2 w-full md:w-1/2"
                                      >
                                        <Input placeholder="Enter Process Categories" />
                                      </AntdForm.Item> */}
                                      {/* <ProcessCategories fieldName={name} /> */}
                                      <AntdForm.List name={[name, "process_categories"]}>
                                      {(processCategoryFields, { add: addProcessCategory, remove: removeProcessCategory }) => (
                                        <>
                                          <h4 className="font-semibold mb-2">ProcessCategory(s)</h4>
                                          {processCategoryFields.map(({ key: processCategoryKey, name: processCategoryName }) => (
                                            <div key={processCategoryKey} className="flex items-center mb-2">
                                              <AntdForm.Item
                                                name={[processCategoryName]}
                                                rules={[{ required: true, message: "Enter Process Category" }]}
                                                style={{ flex: 1 }}
                                              >
                                                <Input placeholder="Process Category" />
                                              </AntdForm.Item>
                                              {processCategoryFields.length > 1 && (
                                                <MinusCircleOutlined
                                                  className="ml-2 text-red-500"
                                                  onClick={() => removeProcessCategory(processCategoryName)}
                                                />
                                              )}
                                            </div>
                                          ))}
                                          <Button
                                            type="dashed"
                                            onClick={() => addProcessCategory("")}
                                            icon={<PlusOutlined />}
                                            block
                                          >
                                            Add Process Category
                                          </Button>
                                        </>
                                      )}
                                    </AntdForm.List>
                                      {/* <AntdForm.Item
                                        {...restField}
                                        label="Standards"
                                        name={[name, "standards"]}
                                        className="px-2 w-full md:w-1/2"
                                      >
                                        <Input placeholder="Enter Standards" />
                                      </AntdForm.Item> */}
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
                                      "process_categories": [""],
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
          )
}

export default ImportPdfScopeVerification;