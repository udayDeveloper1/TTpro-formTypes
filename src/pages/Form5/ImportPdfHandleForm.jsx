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

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment"; // Import moment.js
import {
    addFormHandlinkTrading,
  addPdfFormHandlinkTrading,
  form1Set,
  formFill1,
} from "../../api/Form1Api";
import { cloneDeep, forEach } from "lodash";
import TagInput from "../../component/Tags";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ImportPdfHandleForm = () => {
  const [form] = AntdForm.useForm();
  const [form2] = AntdForm.useForm();
  const [formNo, setFormNo] = useState("1");
  const [data, setdata] = useState("1");
//   const [getDetials, setDetails] = useState({
//     id: "658b3a62-f8a2-478f-b97f-99bba37c73b0",
//     file_name: "AVIRAT NPOP.pdf",
//     extracted_data: {
//       file_title: "abc",
//       main_certificate_details: {
//         title: "Noah Anderson",
//         certificate_no: "438",
//         main_address: "Modi dolores id magn",
//         this_is_to_certify_that_the_product_and_area_inspected_by_certification_body_tq_cert_services_private_limited_are_in_accordance_with_requirements_of:
//           ["Test 1", "Test 2", "Test 3", "Test 4"],
//         for_the_following_process: "Est neque occaecat ",
//         // valid_from: "2025-01-15T18:30:00.000Z",
//         // valid_till: "2025-01-08T18:30:00.000Z",
//         this_certificate_is_valid_for_those_products_and_area_specified_in_the_annexe_certification_characteristics:
//           "Sed nesciunt unde d",
//         extra_note: "Culpa labore eiusmo",
//       },
//       certification_characteristics: {
//         certificate_no: "843",
//         main_value: "Quos doloribus omnis",
//         "trader_product(s)": [
//           {
//             product_s_no: "Quo praesentium volu",
//             "product(s)": "Hammett Gray",
//             variety: "Suscipit aspernatur ",
//             organic_status: "Et in ut magni aliqu",
//             labeling_category: "Ducimus consequat ",
//           },
//           {
//             SNo: "",
//             InvoiceNo: "",
//             InvoiceDate: "2025-01-22T11:04:40.882Z",
//             product_s_no: "Fine",
//             "product(s)": "Test product",
//             variety: "Test product verity",
//             organic_status: "Fine",
//             labeling_category: "Fine",
//           },
//         ],
//       },
//     },
//     created_at: "2025-01-22T11:05:10.300000Z",
//     updated_at: "2025-01-22T11:05:10.300000Z",
//   });

  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    try {
      let fomrData = new FormData();
      fomrData.append("pdf", values.UploadPdf[0].originFileObj);
      let res = await addPdfFormHandlinkTrading(fomrData);
      console.log("response pdf review", res);

      if (res) {
        console.log(res);
        setFormNo("2");
        setdata(res);

        let RawMaterialDetails = [];
        res?.certified_raw_materials_and_declared_geographic_origin?.forEach(
          (ele, ind) => {
            let countrys = [];
            ele?.country?.split(",")?.forEach((ele, ind) => {
              countrys.push({ CountryName: ele });
            });
            let obj = {
              OrganicCotton: ele.material_details,
              RawMaterialsCertifiedWeight: ele.certified_weight,
              CountryArea: countrys,
            };
            RawMaterialDetails.push(obj);
          }
        );

        if (RawMaterialDetails.length === 0) {
          RawMaterialDetails.push({
            OrganicCotton: "",
            RawMaterialsCertifiedWeight: "",
            CountryArea: [{ CountryName: "" }],
          });
        }

        console.log(res?.certified_input_references?.farm_scs);

        let inputTcs = [];
        inputTcs = res?.certified_input_references?.input_tcs.split(",") || [];
        let farm_tcs = [];
        farm_tcs = res?.certified_input_references?.farm_tcs?.split(",") || [];
        let farm_scs = [];
        farm_scs = res?.certified_input_references?.farm_scs?.split(",") || [];
        console.log(inputTcs, farm_scs, farm_tcs);

        setTags(inputTcs);
        setTags1(farm_tcs);
        setTags2(farm_scs);

        const UpdatedAdditionalDeclarationItem = res?.extracted_data?.main_certificate_details?.this_is_to_certify_that_the_product_and_area_inspected_by_certification_body_tq_cert_services_private_limited_are_in_accordance_with_requirements_of?.map((item) => {
            return {
              additionalDeclarationItem: item // Add a key with the current item as its value
            };
          });
        form2.setFieldsValue({
          CertificateName: res?.extracted_data?.main_certificate_details?.title,
          CertificateNumber: res?.extracted_data?.main_certificate_details?.certificate_no,
          CertificationAddress : res?.extracted_data?.main_certificate_details?.main_address,
          FollowingProcess: res?.extracted_data?.main_certificate_details?.for_the_following_process,
          CertificationCharacteristics: res?.extracted_data?.main_certificate_details?.this_certificate_is_valid_for_those_products_and_area_specified_in_the_annexe_certification_characteristics,
          ExtraNote: res?.extracted_data?.main_certificate_details?.extra_note,
          valid_from:dayjs(res?.extracted_data?.main_certificate_details?.valid_from, "DD/MM/YYYY") ,
          valid_till:dayjs(res?.extracted_data?.main_certificate_details?.valid_till, "DD/MM/YYYY") ,
          additionalDeclaration: UpdatedAdditionalDeclarationItem,
          CertificateNumberCHAR: res?.extracted_data?.certification_characteristics?.certificate_no,
          CertificationAddressCHAR: res?.extracted_data?.certification_characteristics?.main_value,
          ProductDetails: res?.extracted_data?.certification_characteristics?.["trader_product(s)"],
          datePicker: moment(new Date()),
        });
      }
    } catch (error) {
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
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      message.error("You can only upload PDF files!");
      return;
    }

    return isPdf || Upload.LIST_IGNORE;
  };

  const [tags, setTags] = useState([]);
  const [tags1, setTags1] = useState([]);
  const [tags2, setTags2] = useState([]);

  const handleSubmit2 = async (values) => {
    try {
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
      console.log(data);
      let res = await addFormHandlinkTrading(data);
      navigate("/form_5_handelingList");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const beforeUpload2 = (file) => {
    const isValidType = file.type === "image/png" || file.type === "image/jpeg";
    if (!isValidType) {
      message.error("You can only upload PNG or JPG files!");
    }
    return isValidType;
  };

  useEffect(() => {
    
    // setFormNo("2");
    // form2.setFieldsValue({
    //     CertificateName: getDetials?.extracted_data?.main_certificate_details?.title,
    //     CertificateNumber: getDetials?.extracted_data?.main_certificate_details?.certificate_no,
    //     CertificationAddress : getDetials?.extracted_data?.main_certificate_details?.main_address,
    //     FollowingProcess: getDetials?.extracted_data?.main_certificate_details?.for_the_following_process,
    //     CertificationCharacteristics: getDetials?.extracted_data?.main_certificate_details?.this_certificate_is_valid_for_those_products_and_area_specified_in_the_annexe_certification_characteristics,
    //     ExtraNote: getDetials?.extracted_data?.main_certificate_details?.extra_note,
    //     valid_from: getDetials?.extracted_data?.main_certificate_details?.valid_from,
    //     valid_till: getDetials?.extracted_data?.main_certificate_details?.valid_till,
    //     additionalDeclaration: [
    //       {
    //         additionalDeclarationItem: "",
    //       },
    //     ],
    //     CertificateNumberCHAR: getDetials?.extracted_data?.certification_characteristics?.certificate_no,
    //     CertificationAddressCHAR: getDetials?.extracted_data?.certification_characteristics?.main_value,
    //     ProductDetails: [
    //       {
    //         product_s_no: "",
    //         "product(s)": "",
    //         variety: "",
    //         organic_status: "",
    //         labeling_category: "",
    //       },
    //     ],
    //     // datePicker: moment(new Date()),
    //   });
  }, []);

  return formNo === "1" ? (
    <AntdForm
      form={form}
      onFinish={handleSubmit}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout="vertical"
      className="form_1  rounded-xl shadow-xl"
      style={{ maxWidth: 800, margin: "0 auto" }}
      initialValues={{ UploadPdf: [] }}
    >
      <section className="section">
        <h2 className=" pb-5 section-title">
          Upload PDF Handling and Trading SC type
        </h2>
        <div className="">
          <div className="flex items-center md:justify-between flex-wrap">
            <AntdForm.Item
              label="Upload Pdf Here"
              name="UploadPdf"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              className="pt-5 w-full md:w-[49%] UploadPdf"
              rules={[{ required: true, message: "Please upload a PDF file!" }]}
            >
              <Upload
                action="/upload.do"
                listType="picture-card"
                beforeUpload={beforeUpload}
                accept=".pdf"
                maxCount={1}
                onChange={(info) => {}}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Pdf</div>
                </button>
              </Upload>
            </AntdForm.Item>
          </div>
        </div>
      </section>
      <AntdForm.Item className=" submitButtonGroup">
        <Button type="primary" htmlType="submit" className="submit-btn ">
          Submit
        </Button>
      </AntdForm.Item>
    </AntdForm>
  ) : (
    <div className="container mx-auto  ">
      <AntdForm
        form={form2}
        onFinish={handleSubmit2}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="vertical"
        className="form_1  rounded-xl shadow-xl"
        style={{ maxWidth: 900, margin: "0 auto" }}
      >
        <h1 className="text-2xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center">
          Handling and Trading SC type
        </h1>
        {/* upload logo and qrcode */}

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
                <DatePicker className="datePickerIpnut"   format="DD/MM/YYYY"/>
              </AntdForm.Item>

              <AntdForm.Item
                label="Valid End Date"
                name="valid_till"
                className="w-full md:w-[49%]"
              >
                <DatePicker className="datePickerIpnut"   format="DD/MM/YYYY"/>
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
                        {/* Remove Icon */}
                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            className="dynamic-delete-button absolute right-0 top-0"
                            onClick={() => {
                                // const removedItem = fields.find(field => field.name === 'additionalDeclarationItem');
                                // console.log("Removing item:", removedItem);
                                remove(name); // Removes the current declaration
                              }} // Removes the current declaration
                          />
                        )}
                        <div className="flex md:justify-between flex-wrap ">
                          <AntdForm.Item
                            {...restField}
                            label="Additional Declaration Item"
                            name={[name, "additionalDeclarationItem"]}
                            className="w-full"
                          >
                            <Input placeholder="Enter additional Declaration Item" />
                          </AntdForm.Item>
                        </div>
                      </div>
                    ))}
                    <AntdForm.Item>
                      <Button
                        type="dashed"
                        onClick={() =>
                          add({
                            additionalDeclarationItem: "", // Default value for new items
                          })
                        }
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Declaration Item
                      </Button>
                    </AntdForm.Item>
                  </>
                )}
              </AntdForm.List>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="pb-5 section-title">Certification Characteristics:</h2>
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
  );
};

export default ImportPdfHandleForm;
