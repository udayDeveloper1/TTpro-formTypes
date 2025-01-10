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
import {
  MinusCircleOutlined,
  PlusOutlined,
  TransactionOutlined
} from '@ant-design/icons'
import moment from 'moment' // Import moment.js
import { form1Set } from '../api/Form1Api'
import { cloneDeep } from 'lodash'
import TagInput from '../component/Tags'
const Form1 = () => {
  const [form] = AntdForm.useForm()

  const [tags, setTags] = useState([])
  const [tags2, setTags2] = useState([])
  const [tagsArray, setTagsArray] = useState([[]]) // For TransportDocument
  const [tags2Array, setTags2Array] = useState([[]]) // For vehicleNo

  useEffect(() => {
    const transportDetails = tags.map((tag, index) => ({
      ModeOfTransport: '',
      TransportDocument: tag,
      DateOfTransport: null,
      vehicleNo: tags2[index] || []
    }))
    if (transportDetails.length === 0) {
      transportDetails.push({
        ModeOfTransport: '',
        TransportDocument: [],
        DateOfTransport: null,
        vehicleNo: []
      })
    }
    form.setFieldsValue({
      UploadQrCode: [],
      UploadLogoImage: [],
      UploadBarcode: [],
      CertificateName: '',
      CertificationAddress: '',
      TransactionCertificateNo: '',
      SellerName: '',
      SellerAddress: '',
      SellerPAN: '',
      BuyerName: '',
      BuyerAddress: '',
      BuyerPAN: '',
      PlaceOfDispatch: '',
      PlaceOfDestination: '',
      DeclarationText: '',
      OrganicMaterialCertificationNOP: '',
      OrganicMaterialCertificationNPOP: '',
      DeclarationsText: '',
      DeclarationList: [{ DeclarationList_: '' }],
      ShipmentDetails: [
        {
          ShipmentNo_: '',
          ShipmentDate_: null,
          ShipmentDocNo_: '',
          ShipmentsGrossShippingWeight_: '',
          InvoiceReferences_: '',
          ConsigneeNameAndAddress_: '',
          TEID: ''
        }
      ],
      ProductDetails: [
        {
          ProductNo: '',
          OrderNo: '',
          ArticleNo: '',
          NumberofUnits: '',
          ProductsNetShippingWeight: '',
          SupplementaryWeight: '',
          ProductsCertifiedWeight: '',
          ProductionDate: '',
          Productcategory: '',
          ProductDetail: '',
          MaterialComposition: '',
          StandardLabelGrade: '',
          AdditionalInfo: '',
          LastProcessor: '',
          licenseNo: '',
          TEID: '',
          Country: ''
        }
      ],
      RawMaterialDetails: [
        {
          Product: '',
          HSCode: '',
          NPOPOrganicCompliance: '',
          LotNoQuantity: '',
          TradeName: '',
          packingDetails: [{ packingDetail: '' }]
        }
      ],
      InvoiceList: [
        {
          SNo: '',
          InvoiceNo: '',
          InvoiceDate: null
        }
      ],
      TransportDetails: transportDetails,
      additionalDeclaration: [
        {
          additionalDeclarationItem: ''
        }
      ],
      TraderTCsforOrganicMaterial: '',
      outsourcedSubcontractor: '',
      datePicker: moment(new Date())
    })
  }, [form])

  // Handle form submission with typed values
  const handleSubmit = async values => {
    console.log('Form submitted with values:', values)
    // let shipmentDetail = values.ShipmentDetails.map((ele, ind) => {
    //   let obj = {
    //     shipment_no: ele.ShipmentNo_,
    //     shipment_date: ele.ShipmentDate_,
    //     shipment_doc_no: ele.ShipmentDocNo_,
    //     gross_shipping_weight: ele.ShipmentsGrossShippingWeight_,
    //     invoice_references: ele.InvoiceReferences_,
    //     consignee_name_and_address: ele.ConsigneeNameAndAddress_
    //   }
    //   return obj
    // })
    // let productDetail = values.ProductDetails.map((ele, ind) => {
    //   let obj = {
    //     product_no: ele.ProductNo,
    //     order_no: ele.OrderNo,
    //     article_no: ele.ArticleNo,
    //     number_of_units: ele.NumberofUnits,
    //     net_shipping_weight: ele.ProductsNetShippingWeight,
    //     supplementary_weight: ele.SupplementaryWeight,
    //     certified_weight: ele.ProductsCertifiedWeight,
    //     production_date: ele.ProductionDate,
    //     product_category: ele.Productcategory,
    //     product_detail: ele.ProductDetail,
    //     material_composition: ele.MaterialComposition,
    //     standard_label_grade: ele.StandardLabelGrade,
    //     additional_info: ele.AdditionalInfo,
    //     last_processor: ele.LastProcessor,
    //     license_number: ele.licenseNo,
    //     country: ele.Country
    //   }
    //   return obj
    // })

    // let contents = []
    // values.DeclarationList?.forEach((ele, ind) => {
    //   let str = ele.DeclarationList_
    //   contents.push(str)
    // })

    // let certified_raw_materials_and_declared_geographic_origin =
    //   values.RawMaterialDetails.map((ele, ind) => {
    //     let obj = {
    //       material_details: ele.OrganicCotton,
    //       certified_weight: ele.RawMaterialsCertifiedWeight,
    //       country: ele.CountryArea.map(item => item.CountryName).join(', ')
    //     }
    //     return obj
    //   })

    // try {
    //   let data = {
    //     file_name: 'example_tc_file.pdf',
    //     extracted_data: {
    //       certification_body: {
    //         main_value: values.CertificationDetails,
    //         licensing_code_of_certification_body: values.CertificateLicenseCode
    //       },
    //       seller_of_certified_products: {
    //         main_value: values.SellerDetails,
    //         sc_number: values.SellerSCNumber,
    //         license_no: values.SellerLicenseNumber
    //       },
    //       buyer_of_certified_products: {
    //         main_value: values.BuyerDetails,
    //         license_no: values.BuyerLicenseNo
    //       },
    //       gross_shipping_weight: values.GrossShippingWeight,
    //       net_shipping_weight: values.NetShippingWeight,
    //       certified_weight: values.WeightsCertifiedWeight,
    //       declarations_by_certification_body: {
    //         main_value: values.DeclarationText,
    //         contents: contents,
    //         certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules:
    //           values.OrganicMaterialCertificationNOP,
    //         certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules:
    //           values.OrganicMaterialCertificationNPOP,
    //         extra_note: values.DeclarationsText
    //       },
    //       certified_input_references: {
    //         input_tcs: values.InputTCs,
    //         farm_scs: values.FarmSCs,
    //         farm_tcs: values.FarmSCs,
    //         trader_tcs_for_organic_materia: values.TraderTCsforOrganicMaterial
    //       },
    //       shipments: shipmentDetail,
    //       certified_products: productDetail,
    //       certified_raw_materials_and_declared_geographic_origin:
    //         certified_raw_materials_and_declared_geographic_origin,
    //       declarations_by_seller_of_certified_products: {
    //         the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor:
    //           values.outsourcedSubcontractor
    //       }
    //     }
    //   }
    //   console.log(data)

    //   let res = await form1Set(data)
    //   console.log(res)
    // } catch (error) {
    //   console.log(error)
    // }

   let data =  {
    "file_title": "",
    "qr_info": "{253} SS08008456039022024002111",
    "certification_body":{
        "name": "Global Certification Society",
        "address": "Ward NO.9 V.P.O. Chowki Khalet, Near Ravidas Mandir, Tehsil Palampur" 
    },
    "transaction_certificate_number":"ORG/TC/2402/002111",
    "seller_of_individual/ICS":{
        "name":"Vedakunda Sangam Seva Sansthan",
        "address":"128, Gram: Piplai KhurdPost: Piplai Khurd KhargoneMadhya Pradesh(451001)",
        "PAN":""
    },
    "buyer":{
        "name":"Sainath Cotton Industries",
        "address":"Sr-No-479, At-Kotadi, Vijapur-Mansa Road, Mahesana(382870)",
        "PAN":"ABAFS8267Q"
    },
    "place_of_dispatch":"Piplai Khurd",
    "place_of_destination":"Kotadi Vijapur (GJ)",
    "product_details":[
        {
            "product_name":"Raw Cotton",
            "hs_code":"52010011",
            "NPOP_organic_compliance_C1/C2/C3/organic":"Organic",
            "lot_no":"2023114898",
            "quantity_in_MT":"227.220000",
            "trade_name":[
                "Organic Raw",
                "Cotton"
            ],
            "packing_details":[
                "2220.000000Kg X 1 Nos. = 227.220000 Cotton 2220.000000 Kg",
                "15000.000000Kg X 15 Nos. = 225000.000000 Kg"
            ]
        }
    ],
    "transaction_details":{
        "order_or_contact_number":"VSSS/RC/04",
        "invoice_details":[{
            "s_no":"1",
            "invoice_number":"VSSS/RC/04",
            "invoice_date":"feb 2 2024"
        }],
        "transport_details":[
            {
                "mode_of_transport":"Road",
                "transport_document_numbers":"955 To 960, 1421 To 1426, 1871 To 1874.",
                "vehicle_number_or_bull_cart_or_air_or_others":[
                    "RIL9GB3749",
                    "MPO9HG2521",
                    "MH18BG9669",
                    "MPOQSHHO819",
                    "RJO9GC0074",
                    "RJO9GB7886",
                    "MP48H1931",
                    "MP09HG6469",
                    "MP45H6750",
                    "MPO9HF5457",
                    "MPO9HF5632",
                    "MPO9HF5951",
                    "MP11H0102",
                    "MP15P2500",
                    "RJ14GA6096",
                    "RJ36GA4033"
                ],
                "date_of_transport":"02/02/2024"
            }
        ]

    },
    "additional_declaration_by_the_certification_body":{
        "this_is_to_cerify_that":[
            "This Transaction Certificate is issued after satisfying ourselves with the required inspection under the checked programmes at S.No.7 above",
            "On the date of issue of this Transaction Certificate, the Accreditation of this Certification Body under NPOP is valid.",
            "The above information is correct to the best of our knowledge and belief."
        ],
        "issue_date":"20/02/2024"
    },
    "name_and_signature_of_the_authorised_person":{
        "name":"Vikas Kumar",
        "position":"Chief Executive Officer"
    }
}
  }
  const normFile = e => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const beforeUpload = file => {
    const isValidType = file.type === 'image/png' || file.type === 'image/jpeg'
    if (!isValidType) {
      message.error('You can only upload PNG or JPG files!')
    }
    return isValidType
  }

  return (
    <div className='container mx-auto  '>
      <AntdForm
        form={form}
        onFinish={handleSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout='vertical'
        className='form_1  rounded-xl shadow-xl'
        style={{ maxWidth: 900, margin: '0 auto' }}
      >
        <h1 className='text-2xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center'>
          Transaction Certificate (TC) Form Type 2
        </h1>
        {/* upload logo and qrcode */}
        <section className='section'>
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
                  beforeUpload={beforeUpload}
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
              {/* upload logo */}
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
                  beforeUpload={beforeUpload}
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
              {/* Barcode Scanner */}
              <AntdForm.Item
                label='Upload Barcode Image'
                name={'UploadBarcode'}
                valuePropName='fileList'
                getValueFromEvent={normFile}
                className='pt-5 w-full md:w-[49%]'
              >
                <Upload
                  action='/upload.do'
                  listType='picture-card'
                  beforeUpload={beforeUpload}
                  accept='.png,.jpg,.jpeg'
                  maxCount={1}
                >
                  <button
                    style={{ border: 0, background: 'none' }}
                    type='button'
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Barcode Image</div>
                  </button>
                </Upload>
              </AntdForm.Item>
              {/* Certificate Images */}
              <AntdForm.Item
                label='Upload Certificates'
                name={'UploadCertificate'}
                valuePropName='fileList'
                getValueFromEvent={normFile}
                className='pt-5 w-full md:w-[49%]'
              >
                <Upload
                  action='/upload.do'
                  listType='picture-card'
                  beforeUpload={beforeUpload}
                  accept='.png,.jpg,.jpeg'
                >
                  <button
                    style={{ border: 0, background: 'none' }}
                    type='button'
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload Certificates</div>
                  </button>
                </Upload>
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* certificate info */}
        <section className='section'>
          <h2 className=' pb-5 section-title'>Certificate Body Information:</h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Certificate Name'
                name='CertificateName'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Certificate Name' />
              </AntdForm.Item>
              <AntdForm.Item
                label='Certification Address'
                name='CertificationAddress'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Certification Address' />
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* Transaction info */}
        <section className='section'>
          <h2 className=' pb-5 section-title'>Transaction Certificate No:</h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Transaction Certificate No'
                name='TransactionCertificateNo'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Transaction Certificate No' />
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* Seller of Certified Products */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            Seller of (Name and Address of Individual/ICS)
          </h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Seller Name'
                name='SellerName'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Seller Name' />
              </AntdForm.Item>
              <AntdForm.Item
                label='Seller Address'
                name='SellerAddress'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Seller Address' />
              </AntdForm.Item>
            </div>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='PAN Number'
                name='SellerPAN'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter PAN Number' />
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* Buyer of Certified Products */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            Buyer of (Name and Address)
          </h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Buyer Name'
                name='BuyerName'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Buyer Name' />
              </AntdForm.Item>
              <AntdForm.Item
                label='Buyer Address'
                name='BuyerAddress'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Buyer Address' />
              </AntdForm.Item>
            </div>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='PAN Number'
                name='BuyerPAN'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter PAN Number' />
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* Place Of Dispatch */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'> Place Of Dispatch</h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Place Of Dispatch'
                name='PlaceOfDispatch'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Place Of Dispatch' />
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* Place Of Destination */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'> Place Of Destination</h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Place Of Destination'
                name='PlaceOfDestination'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Place Of Destination' />
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* NPOP Organic Compliance */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            NPOP Organic Compliance
          </h2>
          <div className=''>
            <AntdForm.List name='RawMaterialDetails'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className='pb-5'>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Product'
                          name={[name, 'Product']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Product Name' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label='HS Code'
                          name={[name, 'HSCode']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter HS Code' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='NPOP Organic Compliance'
                          name={[name, 'NPOPOrganicCompliance']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter NPOP Organic Compliance' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label='Lot No & Quantity(in MT)'
                          name={[name, 'LotNoQuantity']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Lot No & Quantity(in MT)' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Trade Name'
                          name={[name, 'TradeName']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Trade Name' />
                        </AntdForm.Item>
                        <div className='w-full md:w-[49%] packingDetail'>
                          <AntdForm.List
                            {...restField}
                            name={[name, 'packingDetails']}
                          >
                            {(
                              packingDetailField,
                              {
                                add: addPackingDetail,
                                remove: removePackingDetail
                              }
                            ) => (
                              <>
                                {packingDetailField.map(
                                  ({
                                    key: packingKey,
                                    name: packingDetailName,
                                    ...packingRestField
                                  }) => (
                                    <div
                                      key={packingKey}
                                      className='flex md:justify-between flex-wrap'
                                    >
                                      <AntdForm.Item
                                        {...packingRestField}
                                        label='Packing Detail'
                                        name={[
                                          packingDetailName,
                                          'packingDetail'
                                        ]}
                                        className='w-full'
                                      >
                                        <Input placeholder='Enter Packing Detail' />
                                      </AntdForm.Item>
                                      {packingDetailField.length > 1 && (
                                        <MinusCircleOutlined
                                          className='dynamic-delete-button'
                                          onClick={() =>
                                            removePackingDetail(
                                              packingDetailName
                                            )
                                          }
                                        />
                                      )}
                                    </div>
                                  )
                                )}
                                <AntdForm.Item>
                                  <Button
                                    type='dashed'
                                    onClick={() =>
                                      addPackingDetail({ packingDetail: '' })
                                    }
                                    block
                                    icon={<PlusOutlined />}
                                  >
                                    Add Packing Detail
                                  </Button>
                                </AntdForm.Item>
                              </>
                            )}
                          </AntdForm.List>
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              className='dynamic-delete-button'
                              onClick={() => remove(name)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <AntdForm.Item>
                    <Button
                      type='dashed'
                      onClick={() =>
                        add({
                          Product: '',
                          HSCode: '',
                          NPOPOrganicCompliance: '',
                          LotNoQuantity: '',
                          TradeName: '',
                          packingDetails: [{ packingDetail: '' }]
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

        {/* Transaction Details */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>Transaction Details</h2>
          <div className='flex items-center md:justify-between flex-wrap'>
            <AntdForm.Item
              label='Order/Contact No.'
              name='OrderContactNo'
              className='w-full md:w-[49%]'
            >
              <Input placeholder='Enter Order/Contact No.' />
            </AntdForm.Item>
          </div>
          <div className='flex items-center md:justify-between flex-wrap'>
            <div className='ant-col ant-col-8 ant-form-item-label css-dev-only-do-not-override-7ny38l'>
              <label htmlFor='InvoiceNoDate' className='' title='Invoice No. & Date'>
                Invoice No. & Date
              </label>
            </div>
            <AntdForm.List name='InvoiceList'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className='pb-5 w-full relative'>
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          className='dynamic-delete-button remove_invoiceList absolute right-0 top-0'
                          onClick={() => remove(name)}
                        />
                      )}
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Serial No.'
                          name={[name, 'SNo']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Serial No.' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label='Invoice No.'
                          name={[name, 'InvoiceNo']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Invoice No.' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Invoice Date'
                          name={[name, 'InvoiceDate']}
                          className='w-full md:w-[49%]'
                        >
                          <DatePicker className='datePickerIpnut' />
                        </AntdForm.Item>
                      </div>
                    </div>
                  ))}
                  <AntdForm.Item>
                    <Button
                      type='dashed'
                      onClick={() =>
                        add({
                          SNo: '',
                          InvoiceNo: '',
                          InvoiceDate: moment(new Date())
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
            <AntdForm.List name='TransportDetails'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <div key={key} className='pb-5 w-full relative'>
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          className='dynamic-delete-button remove_invoiceList absolute right-0 top-0'
                          onClick={() => {
                            remove(name)
                            setTagsArray(prev =>
                              prev.filter((_, i) => i !== index)
                            )
                            setTags2Array(prev =>
                              prev.filter((_, i) => i !== index)
                            )
                          }}
                        />
                      )}
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Mode of Transport'
                          name={[name, 'ModeOfTransport']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Mode of Transport' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          name={[name, 'TransportDocument']}
                          label='Transport Document No.'
                          className='w-full md:w-[49%]'
                        >
                          <TagInput
                            tags={tagsArray[index] || []}
                            setTags={newTags =>
                              setTagsArray(prev => {
                                const updated = [...prev]
                                updated[index] = newTags
                                return updated
                              })
                            }
                            name='TransportDocument'
                          />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Date of Transport'
                          name={[name, 'DateOfTransport']}
                          className='w-full md:w-[49%]'
                        >
                          <DatePicker className='datePickerIpnut' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          name={[name, 'vehicleNo']}
                          label='Vehicle No.'
                          className='w-full md:w-[49%]'
                        >
                          <TagInput
                            tags={tags2Array[index] || []}
                            setTags={newTags =>
                              setTags2Array(prev => {
                                const updated = [...prev]
                                updated[index] = newTags
                                return updated
                              })
                            }
                            name='vehicleNo'
                          />
                        </AntdForm.Item>
                      </div>
                    </div>
                  ))}
                  <AntdForm.Item>
                    <Button
                      type='dashed'
                      onClick={() => {
                        add({
                          ModeOfTransport: '',
                          TransportDocument: [],
                          DateOfTransport: null,
                          vehicleNo: []
                        })
                        setTagsArray(prev => [...prev, []])
                        setTags2Array(prev => [...prev, []])
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Transport Details
                    </Button>
                  </AntdForm.Item>
                </>
              )}
            </AntdForm.List>
          </div>
        </section>

        {/* Additional Declaration by the Certification Body */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            {' '}
            Additional Declaration by the Certification Body
          </h2>
          <div className=''>
            {/* <AntdForm.List name='additionalDeclaration'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className='pb-5'>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='additional Declaration Item'
                          name={[name, 'additionalDeclarationItem']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter additional Declaration Item' />
                        </AntdForm.Item>
                      </div>
                    </div>
                  ))}
                  <AntdForm.Item>
                    <Button
                      type='dashed'
                      onClick={() =>
                        add({
                          additionalDeclarationItem: ''
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
            </AntdForm.List> */}
            <AntdForm.List name="additionalDeclaration">
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }) => (
        <div key={key} className="pb-5 w-full relative">
          {/* Remove Icon */}
          {fields.length > 1 && (
            <MinusCircleOutlined
              className="dynamic-delete-button absolute right-0 top-0"
              onClick={() => remove(name)} // Removes the current declaration
            />
          )}
          <div className="flex md:justify-between flex-wrap">
            <AntdForm.Item
              {...restField}
              label="Additional Declaration Item"
              name={[name, 'additionalDeclarationItem']}
              className="w-full md:w-[49%]"
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
              additionalDeclarationItem: '', // Default value for new items
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
        </section>

        {/* Issued Date */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>Issued Date</h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Issued Date'
                name='IssuedDate'
                className='w-full md:w-[49%]'
              >
                <DatePicker className='datePickerIpnut' />
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
    </div>
  )
}

export default Form1
