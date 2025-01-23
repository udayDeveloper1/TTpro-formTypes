import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Form as AntdForm,
  Input,
  Space,
  DatePicker,
  message,
  Upload
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import {
  form3submit,
  formcropProductionSet,
  formFill3,
  pdfExtractTypeProdCrop
} from '../api/Form1Api'
import moment from 'moment'
import dayjs from 'dayjs'
import { formatDateToDDMMYYYY } from '../utils/utils'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import TagInput from '../component/Tags'

const ImportPdfScopeProduction = () => {
  const [form] = AntdForm.useForm()
  const [form2] = AntdForm.useForm()
  const [formNo, setFormNo] = useState('1')
  const [tags, setTags] = useState([])
  const navigate = useNavigate()
  const handleResponse = response => {
    let res = response?.extracted_data
    console.log(res);
    
    let ICSInfo = res?.certification_characteristics?.ICS_info?.map(
      (ele, ind) => {
        let obj = {
          icsName: ele?.ics_name,
          IcsAddress: ele?.address,
          IcsNoOfFarmers: ele?.no_of_farmers,
          IcsArea: ele?.area
        }
        return obj
      }
    )

    let producerProduct = res?.approved_products_list?.[
      'producer_product(s)'
    ]?.map((ele, ind) => {
      let obj = {
        producerSeason: ele?.['season'],
        producerProductSNo: ele?.['product_s_no'],
        producerProducts: ele?.['product(s)'],
        organicStatus: ele?.['organic_status'],
        producerVariety: ele?.['variety']?.toString(),
        cropType: ele?.['crop_type'],
        areaInHa: ele?.['area(in Ha.)'],
        estQuantityInMT: ele?.['est_quantity_in_MT']
      }
      return obj
    })

    let ApprovedFarmerList = res?.approved_products_list?.[
      'approved_farmer_list'
    ]?.map((ele, ind) => {
      let obj = {
        approvedState: ele?.['state'],
        approvedDistrict: ele?.['district'],
        approvedTaluk: ele?.['taluk']
      }
      return obj
    })
    setTags(
      res?.main_certificate_details
        ?.this_is_to_certify_that_the_product_and_area_inspected_by_certification_body_tq_cert_services_private_limited_are_in_accordance_with_requirements_of
    )
    form2.setFieldsValue({
      UploadQrCode: [],
      UploadBarcodeImage: [],
      ICSInfo: ICSInfo,
      producerProduct: producerProduct,
      ApprovedFarmerList: ApprovedFarmerList,
      certificateNo2: res?.certification_characteristics?.certificate_no,
      forTheFollowingProcess:
        res?.main_certificate_details?.for_the_following_process,
      validFrom: dayjs(res?.main_certificate_details?.valid_from, 'DD/MM/YYYY'),
      validTill: dayjs(res?.main_certificate_details?.valid_till, 'DD/MM/YYYY'),
      thisCertificateIsValidForThoseProductsAndAreaSpecifiedInTheAnnExeCertificationCharacteristics:
        res?.main_certificate_details
          ?.this_certificate_is_valid_for_those_products_and_area_specified_in_the_annexe_certification_characteristics,
      extraNote: res?.main_certificate_details?.extra_note,
      certificateTitle: res?.main_certificate_details?.title,
      certificateNo: res?.main_certificate_details?.certificate_no,
      certificateAddress: res?.main_certificate_details?.main_address,
      this_is_to_certify_that_the_product_and_area_inspected_by_certification_body_tq_cert_services_private_limited_are_in_accordance_with_requirements_of:
        [],
      managedBy: res?.certification_characteristics?.managed_by
    })
  }

  const handleSubmit = async values => {
    try {
      let fomrData = new FormData()

      fomrData.append('pdf', values.UploadPdf[0].originFileObj)
      let res = await pdfExtractTypeProdCrop(fomrData)

      if (res) {
        setFormNo('2')
        handleResponse(res)
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

    return isPdf || Upload.LIST_IGNORE
  }

  useEffect(() => {
    form2.setFieldsValue({
      scope_certificate: {
        certificate_number: '',
        holder: '',
        version: '',
        certification_body: '',
        address: '',
        ceo_name: '',
        date_of_issue: '',
        additional_notes: ''
      },
      products_appendix: [
        {
          product_number: '',
          category: '',
          product_details: '',
          material_composition: '',
          label_grade: '',
          facility_number: ''
        }
      ],
      site_appendix: {
        facility_name: '',
        process_categories: [''],
        address: ''
      },
      independently_certified_subcontractor_appendix: [
        {
          subcontractor_name: '',
          certification_body: '',
          expiry_date: '',
          address: '',
          process_categories: [''],
          // "standards": "",
          number: '',
          license_number: ''
        }
      ]
    })
  }, [form2])

  const handleSubmit2 = async values => {
    let icsInfo = values?.ICSInfo?.map((ele, ind) => {
      let obj = {
        ics_name: ele?.icsName,
        address: ele?.IcsAddress,
        no_of_farmers: ele?.IcsNoOfFarmers,
        area: ele?.IcsArea
      }
      return obj
    })

    let producerProduct = values?.producerProduct?.map((ele, ind) => {
      let obj = {
        season: ele?.producerSeason,
        product_s_no: ele?.producerProductSNo,
        'product(s)': ele?.producerProducts,
        organic_status: ele?.organicStatus,
        variety: ele?.producerVariety,
        crop_type: ele?.cropType,
        'area(in Ha.)': ele?.areaInHa,
        est_quantity_in_MT: ele?.estQuantityInMT
      }
      return obj;
    })

    let approved_farmer_list = values?.ApprovedFarmerList?.map((ele, ind) => {
      let obj = {
        state: ele?.approvedState,
        district: ele?.approvedDistrict,
        taluk: ele?.approvedTaluk
      }
      return obj
    })

    try {
      let data = {
        file_name: 'NOPSCO_1 (1).PDF',
        extracted_data: {
          main_certificate_details: {
            title: values?.certificateTitle,
            certificate_no: values?.certificateNo,
            main_address: values?.certificateAddress,
            this_is_to_certify_that_the_product_and_area_inspected_by_certification_body_tq_cert_services_private_limited_are_in_accordance_with_requirements_of:
              tags,
            for_the_following_process: values?.forTheFollowingProcess,
            valid_from: formatDateToDDMMYYYY(values?.validFrom),
            valid_till: formatDateToDDMMYYYY(values?.validTill),
            this_certificate_is_valid_for_those_products_and_area_specified_in_the_annexe_certification_characteristics:
              values?.thisCertificateIsValidForThoseProductsAndAreaSpecifiedInTheAnnExeCertificationCharacteristics,
            extra_note: values?.extraNote
          },
          certification_characteristics: {
            certificate_no: values?.certificateNo2,
            managed_by: values?.managedBy,
            ICS_info: icsInfo
          },
          approved_products_list: {
            'producer_product(s)': producerProduct,
            approved_farmer_list: approved_farmer_list
          }
        }
      }
      console.log(data);
      
      let res = await formcropProductionSet(data)

      if (Object.keys(res)?.length > 0) {
        toast.success('Data Added SuccessFully.')
        navigate('/tCTypeCropProductionList')
      } else {
        toast.error('Something Went Wrong.')
      }
    } catch (error) {
      toast.error('Something Went Wrong.')
      console.log(error)
    }
  }

  const beforeUpload2 = file => {
    const isValidType = file.type === 'image/png' || file.type === 'image/jpeg'
    if (!isValidType) {
      message.error('You can only upload PNG or JPG files!')
    }
    return isValidType
  }

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
    <div className='container mx-auto py-10 px-4 md:px-0'>
      <h2 className='text-3xl md:text-4xl font-medium mb-6 text-center'>
        SC Crop and Production Form
      </h2>
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
          SC Crop and Production Form
        </h1>
        {/* upload logo and qrcode */}
        <section className='section'>
          <h3 className='section-title pb-0 '>Upload Logo And Qr Code: </h3>
          <div className=''>
            <div className='flex  md:justify-between flex-wrap'>
              {/* Qr code */}
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
              {/* upload barcode */}
              <AntdForm.Item
                label='Upload Barcode Image'
                name={'UploadBarcodeImage'}
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
        </section>

        {/* certificate info */}
        <section className='section'>
          <h2 className=' pb-5 section-title'>Certificate Details</h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Certificate Title'
                name='certificateTitle'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Certificate Title' />
              </AntdForm.Item>
              <AntdForm.Item
                label='Certificate Number'
                name='certificateNo'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Certificate Number' />
              </AntdForm.Item>
            </div>
            <div className='flex md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Certificate Address'
                name='certificateAddress'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Certificate Address' />
              </AntdForm.Item>
              <AntdForm.Item
                label='For the following process'
                name='forTheFollowingProcess'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='For the following process' />
              </AntdForm.Item>
            </div>
            <div className='flex md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Valid From'
                name='validFrom'
                className='w-full md:w-[49%]'
              >
                <DatePicker className='datePickerIpnut' format='DD/MM/YYYY' />
              </AntdForm.Item>
              <AntdForm.Item
                label='Valid Till'
                name='validTill'
                className='w-full md:w-[49%]'
              >
                <DatePicker className='datePickerIpnut' format='DD/MM/YYYY' />
              </AntdForm.Item>
            </div>
            <div className='flex md:justify-between flex-wrap items-end'>
              <AntdForm.Item
                label='This Certificate is valid for those products and area specified in the annexe certification characteristics'
                name='thisCertificateIsValidForThoseProductsAndAreaSpecifiedInTheAnnExeCertificationCharacteristics'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Certificate Detail' />
              </AntdForm.Item>
              <AntdForm.Item
                label='Extra Note'
                name='extraNote'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Extra Note' />
              </AntdForm.Item>
            </div>
            <div className='flex md:justify-between flex-wrap relative flex-col'>
              <AntdForm.Item
                name='this_is_to_certify_that_the_product_and_area_inspected_by_certification_body_tq_cert_services_private_limited_are_in_accordance_with_requirements_of'
                label='This is to certify that the product and area inspected by certification body tq cert services private limited are in accordance with requirements of'
                className='w-full'
              >
                <TagInput tags={tags} setTags={setTags} name='InputTCs' />
              </AntdForm.Item>
            </div>
          </div>
        </section>

        {/* Certification Characteristics */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            Certification Characteristics
          </h2>
          <div className=''>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Certificate Number'
                name='certificateNo2'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Certificate Number' />
              </AntdForm.Item>
              <AntdForm.Item
                label='Managed By'
                name='managedBy'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Managed By' />
              </AntdForm.Item>
            </div>
            <h3 className='text-xl pb-5 section-title pt-5'>ICS Info:</h3>
            <AntdForm.List name='ICSInfo'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className='pb-5 relative'>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='ICS Name'
                          name={[name, 'icsName']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Ics Name' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label='ICS Address'
                          name={[name, 'IcsAddress']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Ics Address' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='ICS Number of Farmers'
                          name={[name, 'IcsNoOfFarmers']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Number of Farmers' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label='ICS Area'
                          name={[name, 'IcsArea']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Ics Area' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap absolute top-0 right-0'>
                        <div className='w-full md:w-[49%] packingDetail'>
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
                          icsName: '',
                          IcsAddress: '',
                          IcsNoOfFarmers: '',
                          IcsArea: ''
                        })
                      }
                      block
                      icon={<PlusOutlined />}
                    >
                      Add ICS Info
                    </Button>
                  </AntdForm.Item>
                </>
              )}
            </AntdForm.List>
          </div>
        </section>

        {/* Buyer of Certified Products */}
        <section className='section'>
          <h2 className='text-2xl pb-5 section-title'>
            Approved Products List:
          </h2>
          <div className=''>
            <h2 className='text-xl py-5 section-title'>Producer Product(s):</h2>
            <AntdForm.List name='producerProduct'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className='pb-5 relative'>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Season'
                          name={[name, 'producerSeason']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Season' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label='Product s no'
                          name={[name, 'producerProductSNo']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Product s no' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Product(s)'
                          name={[name, 'producerProducts']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Ics Address' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label='Organic Status'
                          name={[name, 'organicStatus']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Ics Area' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Variety'
                          name={[name, 'producerVariety']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Variety' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label='Crop Type'
                          name={[name, 'cropType']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Crop Type' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Area (in Ha.)'
                          name={[name, 'areaInHa']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='areaInHa' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label='Est Quantity in MT'
                          name={[name, 'estQuantityInMT']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Est Quantity in MT' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap absolute top-0 right-0'>
                        <div className='w-full md:w-[49%] packingDetail'>
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
                          producerSeason: '',
                          producerProductSNo: '',
                          producerProducts: '',
                          organicStatus: '',
                          producerVariety: '',
                          cropType: '',
                          areaInHa: '',
                          estQuantityInMT: ''
                        })
                      }
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Producer Product
                    </Button>
                  </AntdForm.Item>
                </>
              )}
            </AntdForm.List>
          </div>
          <div className=''>
            <h2 className='text-xl py-5 section-title'>
              Approved Farmer List:
            </h2>
            <AntdForm.List name='ApprovedFarmerList'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className='pb-5 relative'>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='State'
                          name={[name, 'approvedState']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter State' />
                        </AntdForm.Item>
                        <AntdForm.Item
                          {...restField}
                          label={`District`}
                          name={[name, 'approvedDistrict']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter District' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap'>
                        <AntdForm.Item
                          {...restField}
                          label='Taluk'
                          name={[name, 'approvedTaluk']}
                          className='w-full md:w-[49%]'
                        >
                          <Input placeholder='Enter Ics Taluk' />
                        </AntdForm.Item>
                      </div>
                      <div className='flex md:justify-between flex-wrap absolute top-0 right-0'>
                        <div className='w-full md:w-[49%] packingDetail'>
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
                          approvedState: '',
                          approvedDistrict: '',
                          approvedTaluk: ''
                        })
                      }
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Approved Farmer
                    </Button>
                  </AntdForm.Item>
                </>
              )}
            </AntdForm.List>
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

export default ImportPdfScopeProduction
