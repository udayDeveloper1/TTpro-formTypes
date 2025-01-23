import React, { useEffect, useRef, useState } from "react";
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
  InputRef,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import moment from "moment"; // Import moment.js
import {
  addFormHandlinkTrading,
  form1Set,
  form2submit,
} from "../../api/Form1Api";
import { cloneDeep } from "lodash";
import TagInput from "../../component/Tags";
import { useNavigate } from "react-router-dom";
import { Slidebar } from "../../layout/Slidebar";
import Spinner from "../../layout/Spinner";
import { toast } from "react-toastify";

const HandleForm = () => {
  const [form] = AntdForm.useForm();
  const [tags, setTags] = useState([]);
  const [tags2, setTags2] = useState([]);
  const [tagsArray, setTagsArray] = useState([[]]);
  const [tags2Array, setTags2Array] = useState([[]]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const transportDetails = tags.map((tag, index) => ({
      ModeOfTransport: "",
      TransportDocument: tag,
      DateOfTransport: null,
      vehicleNo: tags2[index] || [],
    }));

    if (transportDetails.length === 0) {
      transportDetails.push({
        ModeOfTransport: "",
        TransportDocument: [],
        DateOfTransport: null,
        vehicleNo: [],
      });
    }

    form.setFieldsValue({
      CertificateName: "",
      CertificateNumber: "",
      FollowingProcess: "",
      CertificationCharacteristics: "",
      ExtraNote: "",
      valid_from: "",
      valid_till: "",
      additionalDeclaration: [
        {
          additionalDeclarationItem: "",
        },
      ],
      CertificateNumberCHAR: "",
      CertificationAddressCHAR: "",
      ProductDetails: [
        {
          product_s_no: "",
          "product(s)": "",
          variety: "",
          organic_status: "",
          labeling_category: "",
        },
      ],
      datePicker: moment(new Date()),
    });
  }, [form]);

  const handleSubmit = async (values) => {
    console.log("Form submitted with values:", values);
    try {
      setLoading(true)
      let UpdatedAdditionalDeclarationItem = values?.additionalDeclaration?.map(
        (item) => item?.additionalDeclarationItem
      );

      let data = {
        file_name: "AVIRAT NPOP.pdf",
        extracted_data: {
          file_title: "abc",
          main_certificate_details: {
            title: values.CertificateName,
            certificate_no: values.CertificateNumber,
            main_address: values.CertificationAddress,
            this_is_to_certify_that_the_product_and_area_inspected_by_certification_body_tq_cert_services_private_limited_are_in_accordance_with_requirements_of:
              UpdatedAdditionalDeclarationItem,
            for_the_following_process: values?.FollowingProcess,
            valid_from: values?.valid_from,
            valid_till: values?.valid_till,
            this_certificate_is_valid_for_those_products_and_area_specified_in_the_annexe_certification_characteristics:
              values?.CertificationCharacteristics,
            extra_note: values?.ExtraNote,
            transaction_certificate_number: values.TransactionCertificateNo,
          },
          certification_characteristics: {
            certificate_no: values?.CertificateNumberCHAR,
            main_value: values?.CertificationAddressCHAR,
            "trader_product(s)": values?.ProductDetails,
          },
        },
      };
      const response = addFormHandlinkTrading(data);
      console.log(response);
      setLoading(false)
    } catch (error) {
      toast.error('Something Went Wrong.')
      setLoading(false)
      console.log(error);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file) => {
    const isValidType = file.type === "image/png" || file.type === "image/jpeg";
    if (!isValidType) {
      message.error("You can only upload PNG or JPG files!");
    }
    return isValidType;
  };

  return (
    <>
      {loading && <Spinner message="Loading..." isActive={loading} />}
      <div className='flex'><div style={{ width: "20%" }}>  <Slidebar /></div>  <div style={{ width: "80%" }}> 
      <div className="container mx-auto">
        <AntdForm
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="vertical"
          className="form_1  rounded-xl shadow-xl"
          style={{ maxWidth: 900, margin: "0 auto" }}
        >
          <h1 className="text-2xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center">
            Handling and Trading SC type
          </h1>

          {/* certificate info */}
          <section className="section">
            <h2 className=" pb-5 section-title">Certificate Details:</h2>
            <div className="">
              <div className="flex items-center md:justify-between flex-wrap">
                <AntdForm.Item
                  label="Certificate Name"
                  name="CertificateName"
                  className="w-full md:w-[49%]"
                >
                  <Input placeholder="Enter Certificate Name" />
                </AntdForm.Item>
                <AntdForm.Item
                  label="Certificate Number"
                  name="CertificateNumber"
                  className="w-full md:w-[49%]"
                >
                  <Input placeholder="Enter Certificate Number" />
                </AntdForm.Item>
              </div>
              <div className="flex items-center md:justify-between flex-wrap">
                <AntdForm.Item
                  label="Certification Address"
                  name="CertificationAddress"
                  className="w-full md:w-[49%]"
                >
                  <Input placeholder="Enter Certification Address" />
                </AntdForm.Item>

                <AntdForm.Item
                  label="Following Process"
                  name="FollowingProcess"
                  className="w-full md:w-[49%]"
                >
                  <Input placeholder="Enter Following Process" />
                </AntdForm.Item>
              </div>

              <div className="flex items-center md:justify-between flex-wrap">
                <AntdForm.Item
                  label="Certification Characteristics"
                  name="CertificationCharacteristics"
                  className="w-full md:w-[49%]"
                >
                  <Input placeholder="Enter Certification Characteristics" />
                </AntdForm.Item>
                <AntdForm.Item
                  label="Extra Note"
                  name="ExtraNote"
                  className="w-full md:w-[49%]"
                >
                  <Input placeholder="Enter Extra Note" />
                </AntdForm.Item>
              </div>

              <div className="flex items-center md:justify-between flex-wrap">
                <AntdForm.Item
                  label="Valid Start Date"
                  name="valid_from"
                  className="w-full md:w-[49%]"
                >
                  <DatePicker className="datePickerIpnut" />
                </AntdForm.Item>

                <AntdForm.Item
                  label="Valid End Date"
                  name="valid_till"
                  className="w-full md:w-[49%]"
                >
                  <DatePicker className="datePickerIpnut" />
                </AntdForm.Item>
              </div>
              {/* <h2 className="text-2xl pb-5 section-title">
              {" "}
              Additional Declaration by the Certification Body
            </h2> */}
              {/* <div className="flex md:justify-between flex-wrap"> */}
              <div className="w-full">
                <AntdForm.List name="additionalDeclaration">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className="pb-5 w-full relative">
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              className="dynamic-delete-button remove_invoiceList absolute right-0 top-0"
                              onClick={() => remove(name)}
                            />
                          )}
                          <div className="flex md:justify-between flex-wrap">
                            <AntdForm.Item
                              {...restField}
                              label="Additional Declaration Item"
                              name={[name, "additionalDeclarationItem"]}
                              className="w-full"
                            >
                              <Input placeholder="Enter additional Declaration Item" />
                            </AntdForm.Item>
                          </div>

                          {/* <div className="flex md:justify-between flex-wrap ">
                         
                        </div> */}
                        </div>
                      ))}
                      <AntdForm.Item>
                        <Button
                          type="dashed"
                          onClick={() =>
                            add({
                              SNo: "",
                              InvoiceNo: "",
                              InvoiceDate: moment(new Date()),
                            })
                          }
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Invoice Details
                        </Button>
                      </AntdForm.Item>
                    </>
                  )}
                </AntdForm.List>
              </div>
            </div>
          </section>

          <section className="section">
            <h2 className="pb-5 section-title">
              Certification Characteristics:
            </h2>
            <div className="">
              <div className="flex items-center md:justify-between flex-wrap">
                <AntdForm.Item
                  label="Certificate Characteristics Number"
                  name="CertificateNumberCHAR"
                  className="w-full md:w-[49%]"
                >
                  <Input placeholder="Enter Certificate Characteristics Number" />
                </AntdForm.Item>
                <AntdForm.Item
                  label="Certification Characteristics Address"
                  name="CertificationAddressCHAR"
                  className="w-full md:w-[49%]"
                >
                  <Input placeholder="Enter Certification Characteristics Address" />
                </AntdForm.Item>
              </div>

              <div className="w-full">
                <h2 className="pb-5 section-title">Trader Product:</h2>
                <AntdForm.List name="ProductDetails">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className="pb-5 w-full relative">
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              className="dynamic-delete-button remove_invoiceList absolute right-0 top-0"
                              onClick={() => remove(name)}
                            />
                          )}
                          <div className="flex md:justify-between flex-wrap">
                            <AntdForm.Item
                              {...restField}
                              label="Product Serial No."
                              name={[name, "product_s_no"]}
                              className="w-full md:w-[49%]"
                            >
                              <Input placeholder="Enter Serial No." />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label="Product Name"
                              name={[name, "product(s)"]}
                              className="w-full md:w-[49%]"
                            >
                              <Input placeholder="Enter Product Name" />
                            </AntdForm.Item>
                          </div>
                          <div className="flex md:justify-between flex-wrap">
                            <AntdForm.Item
                              {...restField}
                              label="Product Variety"
                              name={[name, "variety"]}
                              className="w-full md:w-[49%]"
                            >
                              <Input placeholder="Enter Product Variety" />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label="Organic Status"
                              name={[name, "organic_status"]}
                              className="w-full md:w-[49%]"
                            >
                              <Input placeholder="Enter Organic Status" />
                            </AntdForm.Item>
                          </div>
                          <div className="flex md:justify-between flex-wrap">
                            <AntdForm.Item
                              {...restField}
                              label="Product Labeling Category"
                              name={[name, "labeling_category"]}
                              className="w-full md:w-[49%]"
                            >
                              <Input placeholder="Enter Product Labeling Category" />
                            </AntdForm.Item>
                          </div>
                        </div>
                      ))}
                      <AntdForm.Item>
                        <Button
                          type="dashed"
                          onClick={() =>
                            add({
                              SNo: "",
                              InvoiceNo: "",
                              InvoiceDate: moment(new Date()),
                            })
                          }
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Invoice Details
                        </Button>
                      </AntdForm.Item>
                    </>
                  )}
                </AntdForm.List>
              </div>
            </div>
          </section>

          <AntdForm.Item className=" submitButtonGroup">
            <Button type="primary" htmlType="submit" className="submit-btn ">
              Submit
            </Button>
          </AntdForm.Item>
        </AntdForm>
      </div>
      </div>
      </div>
    </>
  );
};

export default HandleForm;
