import React, { useEffect, useRef, useState } from 'react'
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

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment' // Import moment.js
import { form1Set, formFill1 } from '../../api/Form1Api'
import { cloneDeep, forEach } from 'lodash'
import TagInput from '../../component/Tags'
import dayjs from 'dayjs'
import { Slidebar } from '../../layout/Slidebar'
import Spinner from '../../layout/Spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ImportPdfTCtype1 = () => {
  const [form] = AntdForm.useForm()
  const [form2] = AntdForm.useForm()
  const [formNo, setFormNo] = useState('1')
  const [data, setdata] = useState('1')
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const navigate = useNavigate();
  const handleSubmit = async values => {
    setLoading(true)
    try {
      let fomrData = new FormData()
      fomrData.append('pdf', values.UploadPdf[0].originFileObj)
      let response = await formFill1(fomrData)
      let res = response?.data?.extracted_data

      if (response?.status_code === 200 || response?.status_code === 201) {
        setFormNo('2')
        setdata(res)
        toast.success("pdf submitted Successfully.")
        let DeclarationList_ = []
        res?.declarations_by_certification_body?.contents?.forEach((ele, ind) => {
          let obj = {
            DeclarationList_: ele
          }
          DeclarationList_.push(obj)
        })
        if (DeclarationList_.length === 0) {
          DeclarationList_ = [{ DeclarationList_: '' }]
        }
        let ShipmentDetailss = []
        res?.shipments?.forEach((ele, ind) => {
          let obj = {
            ShipmentNo_: ele?.shipment_no,
            ShipmentDate_: dayjs(ele.shipment_date, "DD/MM/YYYY"),
            ShipmentDocNo_: ele.shipment_doc_no,
            ShipmentsGrossShippingWeight_: ele.gross_shipping_weight,
            InvoiceReferences_: ele.invoice_references,
            ConsigneeNameAndAddress_: ele.consignee_name_and_address
          }
          ShipmentDetailss.push(obj)
        })
    
        if (ShipmentDetailss.length === 0) {
          ShipmentDetailss = [
            {
              ShipmentNo_: '',
              ShipmentDate_: '',
              ShipmentDocNo_: '',
              ShipmentsGrossShippingWeight_: '',
              InvoiceReferences_: '',
              ConsigneeNameAndAddress_: ''
            }
          ]
        }
    
        let ProductDetails = []
    
        res?.certified_products?.map((ele, ind) => {
          let obj = {
            ProductNo: ele.product_no,
            OrderNo: ele.order_no,
            ArticleNo: ele.article_no,
            NumberofUnits: ele.number_of_units,
            ProductsNetShippingWeight: ele.net_shipping_weight,
            SupplementaryWeight: ele.supplementary_weight,
            ProductsCertifiedWeight: ele.certified_weight,
            ProductionDate: dayjs(ele.production_date, "DD/MM/YYYY"),
            Productcategory: ele.product_category,
            ProductDetail: ele.product_detail,
            MaterialComposition: ele.material_composition,
            StandardLabelGrade: ele.standard_label_grade,
            AdditionalInfo: ele.additional_info,
            LastProcessor: ele.last_processor,
            licenseNo: ele.license_number,
            Country: ele.country
          }
          ProductDetails.push(obj)
        })
        if (ProductDetails.length === 0) {
          ProductDetails = [
            {
              ProductNo: '',
              OrderNo: '',
              ArticleNo: '',
              NumberofUnits: '',
              ProductsNetShippingWeight: '',
              SupplementaryWeight: '',
              ProductsCertifiedWeight: '',
              ProductionDate: null,
              Productcategory: '',
              ProductDetail: '',
              MaterialComposition: '',
              StandardLabelGrade: '',
              AdditionalInfo: '',
              LastProcessor: '',
              licenseNo: '',
              Country: ''
            }
          ]
        }
    
        let RawMaterialDetails = []
        res?.certified_raw_materials_and_declared_geographic_origin?.forEach(
          (ele, ind) => {
            let countrys = []
            ele?.country?.split(',')?.forEach((ele, ind) => {
              countrys.push({ CountryName: ele })
            })
            let obj = {
              OrganicCotton: ele.material_details,
              RawMaterialsCertifiedWeight: ele.certified_weight,
              CountryArea: countrys
            }
            RawMaterialDetails.push(obj)
          }
        )
        if (RawMaterialDetails.length === 0) {
          RawMaterialDetails.push({
            OrganicCotton: '',
            RawMaterialsCertifiedWeight: '',
            CountryArea: [{ CountryName: '' }]
          })
        }
    
        let inputTcs = []
        // inputTcs = res?.certified_input_references?.input_tcs.split(',') || []
        inputTcs = res?.certified_input_references?.input_tcs.split(/[,:;]\s*/).filter(Boolean) || []
        let farm_tcs = []
        // farm_tcs = res?.certified_input_references?.farm_tcs?.split(',') || []
        farm_tcs = res?.certified_input_references?.farm_tcs.split(/[,:;]\s*/).filter(Boolean) || []
        let farm_scs = []
        // farm_scs = res?.certified_input_references?.farm_scs?.split(',') || []
        farm_scs = res?.certified_input_references?.farm_scs.split(/[,:;]\s*/).filter(Boolean) || []
    
        setTags(inputTcs)
        setTags1(farm_scs)
        setTags2(farm_tcs)
    
        form2.setFieldsValue({
          UploadQrCode: [],
          UploadLogoImage: [],
          CertificationDetails: res?.certification_body?.main_value,
          CertificateLicenseCode:
          res?.certification_body?.licensing_code_of_certification_body,
          SellerDetails: res?.seller_of_certified_products?.main_value,
          SellerSCNumber: res?.seller_of_certified_products?.sc_number,
          SellerLicenseNumber: res?.seller_of_certified_products?.license_no,
          BuyerDetails: res?.buyer_of_certified_products?.main_value,
          BuyerLicenseNo: res?.buyer_of_certified_products?.license_no,
          GrossShippingWeight: res?.gross_shipping_weight,
          NetShippingWeight: res?.net_shipping_weight,
          WeightsCertifiedWeight: res?.certified_weight,
          DeclarationText: res?.declarations_by_certification_body?.main_value,
          OrganicMaterialCertificationNOP:
          res?.declarations_by_certification_body
              ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules,
          OrganicMaterialCertificationNPOP:
          res?.declarations_by_certification_body
              ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules,
          DeclarationsText: res?.declarations_by_certification_body?.extra_note,
          DeclarationList: DeclarationList_,
          ShipmentDetails: ShipmentDetailss,
          ProductDetails: ProductDetails,
          RawMaterialDetails: RawMaterialDetails,
          InputTCs: inputTcs,
          FarmSCs: farm_scs,
          FarmTCs: farm_tcs,
          TraderTCsforOrganicMaterial:
          res?.certified_input_references?.trader_tcs_for_organic_material,
          outsourcedSubcontractor:
          res?.declarations_by_seller_of_certified_products
              ?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
        })
      }else{
        toast.error("Something went Wrong.")
      }
    } catch (error) {
      toast.error("Something went Wrong.")
      console.log(error)
    }
    setLoading(false)
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

    return isPdf || Upload.LIST_IGNORE
  }

  const [tags, setTags] = useState([])
  const [tags1, setTags1] = useState([])
  const [tags2, setTags2] = useState([])

  // Handle form submission with typed values
  const handleSubmit2 = async values => {
    setLoading2(true)
    let shipmentDetail = values.ShipmentDetails.map((ele, ind) => {
      let obj = {
        shipment_no: ele.ShipmentNo_,
        shipment_date: ele.ShipmentDate_,
        shipment_doc_no: ele.ShipmentDocNo_,
        gross_shipping_weight: ele.ShipmentsGrossShippingWeight_,
        invoice_references: ele.InvoiceReferences_,
        consignee_name_and_address: ele.ConsigneeNameAndAddress_
      }
      return obj
    })
    let productDetail = values.ProductDetails.map((ele, ind) => {
      let obj = {
        product_no: ele.ProductNo,
        order_no: ele.OrderNo,
        article_no: ele.ArticleNo,
        number_of_units: ele.NumberofUnits,
        net_shipping_weight: ele.ProductsNetShippingWeight,
        supplementary_weight: ele.SupplementaryWeight,
        certified_weight: ele.ProductsCertifiedWeight,
        production_date: ele.ProductionDate,
        product_category: ele.Productcategory,
        product_detail: ele.ProductDetail,
        material_composition: ele.MaterialComposition,
        standard_label_grade: ele.StandardLabelGrade,
        additional_info: ele.AdditionalInfo,
        last_processor: ele.LastProcessor,
        license_number: ele.licenseNo,
        country: ele.Country
      }
      return obj
    })

    let contents = []
    values.DeclarationList?.forEach((ele, ind) => {
      let str = ele.DeclarationList_
      contents.push(str)
    })

    let certified_raw_materials_and_declared_geographic_origin =
      values.RawMaterialDetails.map((ele, ind) => {
        let obj = {
          material_details: ele.OrganicCotton,
          certified_weight: ele.RawMaterialsCertifiedWeight,
          country: ele.CountryArea.map(item => item.CountryName).join(', ')
        }
        return obj
      })

    try {
      let data = {
        file_name: 'example_tc_file.pdf',
        extracted_data: {
          certification_body: {
            main_value: values.CertificationDetails,
            licensing_code_of_certification_body: values.CertificateLicenseCode
          },
          seller_of_certified_products: {
            main_value: values.SellerDetails,
            sc_number: values.SellerSCNumber,
            license_no: values.SellerLicenseNumber
          },
          buyer_of_certified_products: {
            main_value: values.BuyerDetails,
            license_no: values.BuyerLicenseNo
          },
          gross_shipping_weight: values.GrossShippingWeight,
          net_shipping_weight: values.NetShippingWeight,
          certified_weight: values.WeightsCertifiedWeight,
          declarations_by_certification_body: {
            main_value: values.DeclarationText,
            contents: contents,
            certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules:
              values.OrganicMaterialCertificationNOP,
            certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules:
              values.OrganicMaterialCertificationNPOP,
            extra_note: values.DeclarationsText
          },
          certified_input_references: {
            input_tcs: values.InputTCs?.join(","),
            farm_scs: values.FarmSCs?.join(","),
            farm_tcs: values.FarmTCs?.join(","),
            trader_tcs_for_organic_material: values.TraderTCsforOrganicMaterial
          },
          shipments: shipmentDetail,
          certified_products: productDetail,
          certified_raw_materials_and_declared_geographic_origin:
            certified_raw_materials_and_declared_geographic_origin,
          declarations_by_seller_of_certified_products: {
            the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor:
              values.outsourcedSubcontractor
          }
        }
      }

      let res = await form1Set(data)
  if(res?.status_code === 200 || res?.status_code === 201){
    navigate("/tcType1List")
    toast.success("Form submitted Successfully.")
  }else{
    toast.error("Something went Wrong.")
  }
    } catch (error) {
      console.log(error)
    }
    setLoading2(false)
  }

  const beforeUpload2 = file => {
    const isValidType = file.type === 'image/png' || file.type === 'image/jpeg'
    if (!isValidType) {
      message.error('You can only upload PNG or JPG files!')
    }
    return isValidType
  }

  return formNo === '1' ? (<>
        {loading && <Spinner message='Loading...' isActive={loading} />}{' '}
     <div className='flex'>   <div style={{ width: "20%" }}>   <Slidebar /></div>
        <div style={{ width: "80%" }}><AntdForm
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
        <h2 className=' pb-5 section-title'>Upload PDF For Transaction Certificate (TC) Form </h2>
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
                onChange={info => {}}
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
    </AntdForm></div></div>
    </> ) : (
      <>
            {loading2 && <Spinner message='Loading...' isActive={loading2} />}{' '}
            <div className='flex'>   <div style={{ width: "20%" }}>       <Slidebar /></div>
         <div style={{ width: "80%" }}> <div className='container mx-auto  '>
      <AntdForm
        form={form2}
        onFinish={handleSubmit2}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout='vertical'
        className='form_1  rounded-xl shadow-xl'
        style={{ maxWidth: 900, margin: '0 auto' }}
      >
        <h1 className='text-3xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center'>
        Transaction Certificate (TC) Form Type 1
        </h1>
        {/* upload logo and qrcode */}
        {/* <section className='section'>
          <h3 className='section-title pb-0 '>Upload Logo And Qr Code: </h3>
          <div className=''>
            <div className='flex  md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Upload Qr Code'
                name={'UploadQrCode'}
                valuePropName='fileList'
                getValueFromEvent={normFile}
                className='pt-5  w-full md:w-[49%]'
              >
                <Upload
                  action='/upload.do'
                  listType='picture-card'
                  beforeUpload={beforeUpload2}
                  accept='.png,.jpg,.jpeg'
                  maxCount={1}
                >
                  <button
                    style={{ border: 0, background: 'none' }}
                    type='button'
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Qr Code</div>
                  </button>
                </Upload>
              </AntdForm.Item>
              <AntdForm.Item
                label='Upload Logo Image'
                name={'UploadLogoImage'}
                valuePropName='fileList'
                getValueFromEvent={normFile}
                className='pt-5 w-full md:w-[49%]'
              >
                <Upload
                  action='/upload.do'
                  listType='picture-card'
                  beforeUpload={beforeUpload2}
                  accept='.png,.jpg,.jpeg'
                  maxCount={1}
                >
                  <button
                    style={{ border: 0, background: 'none' }}
                    type='button'
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Logo Image</div>
                  </button>
                </Upload>
              </AntdForm.Item>
            </div>
          </div>
        </section> */}

        {/* certificate info */}
        <section className='section'>
          <h2 className=' pb-5 section-title'>
            {' '}
            Certificate Body Information:{' '}
          </h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Certification Details'
                name='CertificationDetails'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Certification Details' />
              </AntdForm.Item>
              <AntdForm.Item
                label='License Code'
                name='CertificateLicenseCode'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter License Code' />
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* Seller of Certified Products */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            Seller of Certified Products Information:{' '}
          </h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Seller Details'
                name='SellerDetails'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Seller Details' />
              </AntdForm.Item>
              <AntdForm.Item
                label='SC Number'
                name='SellerSCNumber'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter SC Number' />
              </AntdForm.Item>
            </div>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='License No'
                name='SellerLicenseNumber'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Seller License Number' />
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* Buyer of Certified Products */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            Buyer of certified product(s) Information:
          </h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Buyer Details'
                name='BuyerDetails'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Buyer Details' />
              </AntdForm.Item>

              <AntdForm.Item
                label='License No.'
                name='BuyerLicenseNo'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter License No.' />
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* 4.5.6. Weights */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'> Weights</h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Gross Shipping Weight'
                name='GrossShippingWeight'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Gross Shipping Weight' />
              </AntdForm.Item>
              <AntdForm.Item
                label='Net Shipping Weight'
                name='NetShippingWeight'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Net Shipping Weight' />
              </AntdForm.Item>
            </div>
            <AntdForm.Item
              label='Certified Weight'
              name='WeightsCertifiedWeight'
            >
              <Input placeholder='Enter Certified Weight' />
            </AntdForm.Item>
          </div>
        </section>

        {/* Declarations by Certification Body */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            {' '}
            Declarations by Certification Body
          </h2>
          <div className=''>
            <div className=''>
              <AntdForm.Item
                label='Declaration Text'
                name='DeclarationText'
                className=''
              >
                <Input placeholder='Enter DeclarationText' />
              </AntdForm.Item>
            </div>
            <div>
              <AntdForm.List name='DeclarationList'>
                {(fields, { add, remove }) => (
                  <>
                    <AntdForm.Item label='Declaration List' required>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <Space
                          key={key}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align='baseline'
                        >
                          <AntdForm.Item
                            {...restField}
                            name={[name, 'DeclarationList_']}
                            rules={[
                              {
                                required: true,
                                message: 'At least 1 Declaration Rule'
                              }
                            ]}
                            style={{ flex: 1 }}
                          >
                            <Input
                              placeholder={`Declaration List`}
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
                          type='dashed'
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                      </AntdForm.Item>
                    </AntdForm.Item>
                  </>
                )}
              </AntdForm.List>
            </div>
            <div className='flex flex-wrap md:justify-between'>
              <div className='w-full'>
                <AntdForm.Item
                  label='Certification of the organic material used for the products listed complies with USDA NOP rules:'
                  name='OrganicMaterialCertificationNOP'
                >
                  <Input placeholder='Enter Organic Material Certification' />
                </AntdForm.Item>
              </div>
              <div className='w-full'>
                <AntdForm.Item
                  label='Certification of the organic material used for the products listed complies with APEDA NPOP rules:'
                  name='OrganicMaterialCertificationNPOP'
                >
                  <Input placeholder='Enter Organic Material Certification' />
                </AntdForm.Item>
              </div>
              <div className='w-full'>
                <AntdForm.Item label='Declaration Text' name='DeclarationsText'>
                  <Input placeholder='Enter organic material Text' />
                </AntdForm.Item>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Certified Input References  */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            {' '}
            Certified Input References{' '}
          </h2>
          <div className=''>
            <div className='flex md:justify-between flex-wrap'>
              <div className='w-full'>
                <>
                  {/* InputTCs */}
                  <AntdForm.Item name='InputTCs' label='Input TCs'>
                    <TagInput tags={tags} setTags={setTags} name='InputTCs' />
                  </AntdForm.Item>

                  {/* FarmSCs */}
                  <AntdForm.Item name='FarmSCs' label='Farm SCs'>
                    <TagInput tags={tags1} setTags={setTags1} name='FarmSCs' />
                  </AntdForm.Item>

                  {/* FarmTCs */}
                  <AntdForm.Item name='FarmTCs' label='Farm TCs'>
                    <TagInput tags={tags2} setTags={setTags2} name='FarmTCs' />
                  </AntdForm.Item>
                </>
              </div>
              <AntdForm.Item
                label='Trader(s) Transaction Certificates numbers of First Raw material:'
                name='TraderTCsforOrganicMaterial'
                className='w-full'
              >
                <Input placeholder='Enter Trader(s) Transaction Certificates numbers of First Raw material:' />
              </AntdForm.Item>
            </div>
          </div>
        </section>
        {/* 9. Shipments */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'> Shipments </h2>
          <div className='Shipments'>
            <AntdForm.List name='ShipmentDetails'>
              {(fields, { add, remove }) => (
                <>
                  {/* {console.log(index) } */}
                  <AntdForm.Item required>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Space
                        key={key}
                        style={{ display: 'flex', marginBottom: 8 }}
                        align='baseline'
                      >
                        <div className='md:pb-5'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Shipment No.'
                              name={[name, 'ShipmentNo_']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Shipment No.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Shipment Date:'
                              name={[name, 'ShipmentDate_']}
                              className='w-full md:w-[49%]'
                              format="DD/MM/YYYY"
                            >
                              <DatePicker className='datePickerIpnut' format="DD/MM/YYYY"/>
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Shipment Doc No.'
                              name={[name, 'ShipmentDocNo_']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Shipment Doc No.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Gross Shipping Weight:'
                              name={[name, 'ShipmentsGrossShippingWeight_']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Gross Shipping Weight' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Invoice References:'
                              name={[name, 'InvoiceReferences_']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Invoice References' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Consignee Name and Address:'
                              name={[name, 'ConsigneeNameAndAddress_']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Consignee Name and Address' />
                            </AntdForm.Item>
                          </div>
                        </div>
                        {fields.length > 1 && (
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        )}
                      </Space>
                    ))}

                    <AntdForm.Item>
                      <Button
                        type='dashed'
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </AntdForm.Item>
                  </AntdForm.Item>
                </>
              )}
            </AntdForm.List>
          </div>
        </section>
        {/* 10. Certified Products */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>Certified Products </h2>
          <AntdForm.List name='ProductDetails'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className='pb-5'>
                    <div className='flex md:justify-between flex-wrap'>
                      <AntdForm.Item
                        {...restField}
                        label='Product No.:'
                        name={[name, 'ProductNo']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Product No.' />
                      </AntdForm.Item>
                      <AntdForm.Item
                        {...restField}
                        label='Order No.:'
                        name={[name, 'OrderNo']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Order No.' />
                      </AntdForm.Item>
                    </div>
                    <div className='flex md:justify-between flex-wrap'>
                      <AntdForm.Item
                        {...restField}
                        label='Article No.:'
                        name={[name, 'ArticleNo']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Article No.' />
                      </AntdForm.Item>
                      <AntdForm.Item
                        {...restField}
                        label='Number of Units:'
                        name={[name, 'NumberofUnits']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Number of Units' />
                      </AntdForm.Item>
                    </div>
                    <div className='flex md:justify-between flex-wrap'>
                      <AntdForm.Item
                        {...restField}
                        label='Net Shipping Weight'
                        name={[name, 'ProductsNetShippingWeight']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Net Shipping Weight' />
                      </AntdForm.Item>
                      <AntdForm.Item
                        {...restField}
                        label='Supplementary Weight'
                        name={[name, 'SupplementaryWeight']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Supplementary Weight' />
                      </AntdForm.Item>
                    </div>
                    {/* Add more fields similarly */}

                    <div className='flex md:justify-between flex-wrap'>
                      <AntdForm.Item
                        {...restField}
                        label='Production Date:'
                        name={[name, 'ProductionDate']}
                        className='w-full md:w-[49%]'
                      >
                        {/* <Input placeholder="Enter Production Date" /> */}
                        <DatePicker className='datePickerIpnut' format="DD/MM/YYYY"/>
                      </AntdForm.Item>
                      <AntdForm.Item
                        {...restField}
                        label='Product Category'
                        name={[name, 'Productcategory']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Product Category' />
                      </AntdForm.Item>
                    </div>
                    <div className='flex md:justify-between flex-wrap'>
                      <AntdForm.Item
                        {...restField}
                        label='Product Detail:'
                        name={[name, 'ProductDetail']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Product Detail' />
                      </AntdForm.Item>
                      <AntdForm.Item
                        {...restField}
                        label='Material Composition'
                        name={[name, 'MaterialComposition']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Material Composition' />
                      </AntdForm.Item>
                    </div>
                    <div className='flex md:justify-between flex-wrap'>
                      <AntdForm.Item
                        {...restField}
                        label='Standard Label Grade:'
                        name={[name, 'StandardLabelGrade']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Standard Label Grade' />
                      </AntdForm.Item>
                      <AntdForm.Item
                        {...restField}
                        label='Additional Info'
                        name={[name, 'AdditionalInfo']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Additional Info' />
                      </AntdForm.Item>
                    </div>
                    <div className='flex md:justify-between flex-wrap'>
                      <AntdForm.Item
                        {...restField}
                        label='Last Processor:'
                        name={[name, 'LastProcessor']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Last Processor' />
                      </AntdForm.Item>
                      <AntdForm.Item
                        {...restField}
                        label='License No:'
                        name={[name, 'licenseNo']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter License No' />
                      </AntdForm.Item>
                    </div>
                    {/* <div className='flex md:justify-between flex-wrap'>
                    
                    </div> */}
                    <div className='flex md:justify-between flex-wrap'>
                      <AntdForm.Item
                        {...restField}
                        label='Certified Weight:'
                        name={[name, 'ProductsCertifiedWeight']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Certified Weight' />
                      </AntdForm.Item>
                      <AntdForm.Item
                        {...restField}
                        label='Country'
                        name={[name, 'Country']}
                        className='w-full md:w-[49%]'
                      >
                        <Input placeholder='Enter Country' />
                      </AntdForm.Item>
                    </div>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        className='dynamic-delete-button'
                        onClick={() => remove(name)}
                      />
                    )}
                  </div>
                ))}
                <AntdForm.Item>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Product
                  </Button>
                </AntdForm.Item>
              </>
            )}
          </AntdForm.List>
        </section>

        {/* 11. Certified Raw Materials and Declared Geographic Origin */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            Certified Raw Materials and Declared Geographic Origin{' '}
          </h2>
          <div className=''>
            <AntdForm.List name='RawMaterialDetails'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className='pb-5 relative'>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Organic Cotton'
                          name={[name, 'OrganicCotton']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Organic Cotton' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label='Certified Weight:'
                          name={[name, 'RawMaterialsCertifiedWeight']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Certified Weight' />
                        </AntdForm.Item>
                      </div>
                      <AntdForm.List name={[name, 'CountryArea']}>
                        {(
                          countryFields,
                          { add: addCountry, remove: removeCountry }
                        ) => (
                          <>
                            {countryFields.map(
                              ({
                                key: countryKey,
                                name: countryName,
                                ...countryRestField
                              }) => (
                                <div
                                  key={countryKey}
                                  className='flex md:justify-between flex-wrap'
                                >
                                  <AntdForm.Item
                                    {...countryRestField}
                                    label='Country Name'
                                    name={[countryName, 'CountryName']}
                                    className='w-full md:w-[49%]'
                                  >
                                    <Input placeholder='Enter Country Name' />
                                  </AntdForm.Item>
                                  {countryFields.length > 1 && (
                                    <MinusCircleOutlined
                                      className='dynamic-delete-button'
                                      onClick={() => removeCountry(countryName)}
                                    />
                                  )}
                                </div>
                              )
                            )}
                            <AntdForm.Item>
                              <Button
                                type='dashed'
                                onClick={() => addCountry()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add Country
                              </Button>
                            </AntdForm.Item>
                          </>
                        )}
                      </AntdForm.List>
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          className='dynamic-delete-button OrganicCottonDelete'
                          onClick={() => remove(name)}
                        />
                      )}
                    </div>
                  ))}
                  <AntdForm.Item>
                    <Button
                      type='dashed'
                      onClick={() =>
                        add({
                          OrganicCotton: '',
                          RawMaterialsCertifiedWeight: '',
                          CountryArea: [{ CountryName: '' }] // Add default country input here
                        })
                      }
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Raw Material
                    </Button>
                  </AntdForm.Item>
                </>
              )}
            </AntdForm.List>
          </div>
        </section>

        {/* 12. Declarations by Seller of Certified Products */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            Declarations by Seller of Certified Products
          </h2>
          <div className=''>
            <div className='flex md:justify-between flex-wrap'>
              <AntdForm.Item
                label='The certified product(s) covered in this certificate have been outsourced to a subcontractor:'
                name='outsourcedSubcontractor'
                className='w-full'
              >
                <Input placeholder='The certified product(s) covered in this certificate have been outsourced to a subcontractor' />
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
    </div></div>
    </div>
    </>
  )
}

export default ImportPdfTCtype1
