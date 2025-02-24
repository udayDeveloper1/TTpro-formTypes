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
import { form1Set, form2submit } from '../../api/Form1Api'
import { cloneDeep } from 'lodash'
import TagInput from '../../component/Tags'
import { Slidebar } from '../../layout/Slidebar'
import Spinner from '../../layout/Spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const TcType2Form = () => {
  const [form] = AntdForm.useForm()
  const [tags, setTags] = useState([])
  const [tags2, setTags2] = useState([])
  const [tagsArray, setTagsArray] = useState([[]])
  const [tags2Array, setTags2Array] = useState([[]])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
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
      OrderContactNo: '',
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
          LotNo: '',
          TradeName: [''],
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
      AuthorisedName: '',
      AuthorisedPosition: '',
      // TraderTCsforOrganicMaterial: '',
      // outsourcedSubcontractor: '',
      datePicker: moment(new Date())
    })
  }, [form])

  const handleSubmit = async values => {
    setLoading(true)
    
    let productDetails = []
    values?.RawMaterialDetails?.map((ele, ind) => {
      let tradeNames = []
      // Ensure TradeName is an array before using forEach
      if (Array.isArray(ele?.TradeName)) {
        ele?.TradeName?.forEach((elem, index) => {
          tradeNames.push(elem.TradeName)
        })
      } else if (ele?.TradeName) {
        // Handle case where TradeName is not an array but a string or undefined
        tradeNames.push(ele?.TradeName)
      }

      let packingDetails = []
      // Ensure packingDetails is an array before using forEach
      if (Array.isArray(ele?.packingDetails)) {
        ele?.packingDetails?.forEach((elem, index) => {
          packingDetails.push(elem.packingDetail)
        })
      }

      let obj = {
        hs_code: ele?.HSCode,
        quantity_in_MT: ele?.LotNo,
        'NPOP_organic_compliance_C1/C2/C3/organic': ele?.NPOPOrganicCompliance,
        lot_no: ele.LotNo,
        product_name: ele?.Product,
        trade_name: tradeNames,
        packing_details: packingDetails
      }
      productDetails.push(obj)
    })

    let invoiceDetails = []
    values?.InvoiceList?.map((ele, ind) => {
      let obj = {
        s_no: ele.SNo,
        invoice_number: ele.InvoiceNo,
        invoice_date: ele.InvoiceDate
      }
      invoiceDetails.push(obj)
    })

    let transport_details = []

    values?.TransportDetails?.map((ele, ind) => {
      
      let transport_document_numbers = tagsArray[ind]?.join(',') || ''
      let obj = {
        mode_of_transport: ele.ModeOfTransport,
        transport_document_numbers: transport_document_numbers,
        vehicle_number_or_bull_cart_or_air_or_others: tags2Array[ind],
        date_of_transport: ele.DateOfTransport
      }
      transport_details.push(obj)
    })

    let this_is_to_cerify_that = []
    // Ensure additionalDeclaration is an array before using forEach
    if (Array.isArray(values?.additionalDeclaration)) {
      values.additionalDeclaration.forEach((ele, ind) => {
        this_is_to_cerify_that.push(ele?.additionalDeclarationItem)
      })
    }

    let data = {
      file_name: 'abc',
      extracted_data: {
        file_title: 'abc',
        qr_info: '{253} SS08008456039022024002111',
        certification_body: {
          name: values.CertificateName,
          address: values.CertificationAddress
        },
        transaction_certificate_number: values.TransactionCertificateNo,
        'seller_of_individual/ICS': {
          name: values.SellerName,
          address: values.SellerAddress,
          PAN: values.SellerPAN
        },
        buyer: {
          name: values.BuyerName,
          address: values.BuyerAddress,
          PAN: values.BuyerPAN
        },
        place_of_dispatch: values.PlaceOfDispatch,
        place_of_destination: values.PlaceOfDestination,
        product_details: productDetails,

        transaction_details: {
          order_or_contact_number: values.OrderContactNo,
          invoice_details: invoiceDetails,
          transport_details: transport_details
        },
        additional_declaration_by_the_certification_body: {
          this_is_to_cerify_that: this_is_to_cerify_that,
          issue_date: values.IssuedDate  || null
        },
        name_and_signature_of_the_authorised_person: {
          name: values.AuthorisedName,
          position: values.AuthorisedPosition
        }
      }
    }

    try {
      const response = await form2submit(data)
      if (response) {
        navigate('/tcType2List')
        toast.success('Form submitted Successfully.')
      } else {
        toast.error('Something went Wrong.')
      }
    } catch (error) {
      toast.error('Something went Wrong.')
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
    const isValidType = file.type === 'image/png' || file.type === 'image/jpeg'
    if (!isValidType) {
      message.error('You can only upload PNG or JPG files!')
    }
    return isValidType
  }

  return (
    <>
      {loading && <Spinner message='Loading...' isActive={loading} />}
      <div className='flex'>
        {' '}
        <div style={{ width: '20%' }}>
          {' '}
          <Slidebar />
        </div>{' '}
        <div style={{ width: '80%' }}>
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

              {/* certificate info */}
              <section className='section'>
                <h2 className=' pb-5 section-title'>
                  Certificate Body Information:
                </h2>
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
                <h2 className=' pb-5 section-title'>
                  Transaction Certificate No:
                </h2>
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
                <h2 className='text-2xl pb-5 section-title'>
                  {' '}
                  Place Of Dispatch
                </h2>
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
                <h2 className='text-2xl pb-5 section-title'>
                  {' '}
                  Place Of Destination
                </h2>
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
                                label='Lot No'
                                name={[name, 'LotNo']}
                                className='w-full md:w-[49%]'
                              >
                                <Input placeholder='Enter Lot No' />
                              </AntdForm.Item>
                            </div>
                            <div className='flex md:justify-between flex-wrap'>
                              <div className='w-full md:w-[49%]'>
                                <AntdForm.List
                                  name={[name, 'TradeName']}
                                  initialValue={['']}
                                >
                                  {(
                                    tradeNameFields,
                                    {
                                      add: addTradeName,
                                      remove: removeTradeName
                                    }
                                  ) => (
                                    <>
                                      {tradeNameFields.map(
                                        ({
                                          key: tradeNameKey,
                                          name: tradeNameName,
                                          ...tradeNameRestField
                                        }) => (
                                          <div
                                            key={tradeNameKey}
                                            className='flex md:justify-between flex-wrap relative'
                                          >
                                            <AntdForm.Item
                                              {...tradeNameRestField}
                                              label='Trade Name'
                                              name={[
                                                tradeNameName,
                                                'TradeName'
                                              ]}
                                              className='w-full'
                                            >
                                              <Input placeholder='Enter Trade Name' />
                                            </AntdForm.Item>
                                            {tradeNameFields.length > 1 && (
                                              <MinusCircleOutlined
                                                className='dynamic-delete-button tradeNameDelete'
                                                onClick={() =>
                                                  removeTradeName(tradeNameName)
                                                }
                                              />
                                            )}
                                          </div>
                                        )
                                      )}
                                      <AntdForm.Item>
                                        <Button
                                          type='dashed'
                                          onClick={() => addTradeName('')}
                                          block
                                          icon={<PlusOutlined />}
                                        >
                                          Add Trade Name
                                        </Button>
                                      </AntdForm.Item>
                                    </>
                                  )}
                                </AntdForm.List>
                              </div>
                              <div className='w-full md:w-[49%] packingDetail relative'>
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
                                            addPackingDetail({
                                              packingDetail: ''
                                            })
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
                                    className='dynamic-delete-button '
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
                                LotNo: '',
                                TradeName: [''],
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
                <h2 className='text-2xl pb-5 section-title'>
                  Transaction Details
                </h2>
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
                    <label
                      htmlFor='InvoiceNoDate'
                      className=''
                      title='Invoice No. & Date'
                    >
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
                                <DatePicker className='datePickerIpnut' format={"DD/MM/YYYY"} />
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
                  <AntdForm.List name='additionalDeclaration'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div key={key} className='pb-5 w-full relative'>
                            {/* Remove Icon */}
                            {fields.length > 1 && (
                              <MinusCircleOutlined
                                className='dynamic-delete-button absolute right-0 top-0'
                                onClick={() => remove(name)} // Removes the current declaration
                              />
                            )}
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Additional Declaration Item'
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
                                additionalDeclarationItem: '' // Default value for new items
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

              {/* Name and Signature of the Authorised Person */}
              <section className='section'>
                <h2 className='text-2xl pb-5 section-title'>Authorised Info</h2>
                <div className=''>
                  <div className='flex items-center md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Authorised Name'
                      name='AuthorisedName'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Authorised Name' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Authorised Position'
                      name='AuthorisedPosition'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Authorised Position' />
                    </AntdForm.Item>
                  </div>
                </div>
              </section>

              <AntdForm.Item className=' submitButtonGroup'>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='submit-btn '
                >
                  Submit
                </Button>
              </AntdForm.Item>
            </AntdForm>
          </div>
        </div>
      </div>
    </>
  )
}

export default TcType2Form
