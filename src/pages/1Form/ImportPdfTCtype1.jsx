

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
import {
  createFormTcType1,
  exportPdfTcType1,
  form1Set,
  formFill1
} from '../../api/Form1Api'
import { cloneDeep, forEach } from 'lodash'
import TagInput from '../../component/Tags'
import dayjs from 'dayjs'
import { Slidebar } from '../../layout/Slidebar'
import Spinner from '../../layout/Spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { formatDateToDDMMYYYY, links } from '../../utils/utils'
import CustomFormItem from '../../layout/CustomFormItem'
import { debounce } from 'lodash'
import TagWithError from '../../component/TagsWithError'
import { useState } from 'react'

const ImportPdfTCtype1 = () => {
  const [form] = AntdForm.useForm()
  const [form2] = AntdForm.useForm()
  const [formNo, setFormNo] = useState('1')
  const [data, setdata] = useState('1')
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [emptyFields, setEmptyFields] = useState({})

  const navigate = useNavigate();

  const handleChange = async values => {
    setLoading(true)
    try {
      // fomrData.append('tc-type-1', values.UploadPdf[0].originFileObj)

      let fomrData = new FormData()
      console.log('values.UploadPdf[0].originFileObj', values?.fileList[0]?.originFileObj);
      fomrData.append('tc-type-1', values?.fileList[0]?.originFileObj);

      let response = await exportPdfTcType1(fomrData)
      let res = response?.data?.extracted_data

      if (response?.status_code === 200 || response?.status_code === 201) {

        setFormNo('2')
        setdata(res)
        toast.success('pdf submitted Successfully.')

        let inputTcs = []
        inputTcs =
          res?.certified_input_references?.input_tcs
            .split(/[,:;]\s*/)
            .filter(Boolean) || []
        let farm_tcs = []
        farm_tcs =
          res?.certified_input_references?.farm_tcs
            .split(/[,:;]\s*/)
            .filter(Boolean) || []
        let farm_scs = []
        farm_scs =
          res?.certified_input_references?.farm_scs
            .split(/[,:;]\s*/)
            .filter(Boolean) || []

        setTags(inputTcs)
        setTags1(farm_scs)
        setTags2(farm_tcs)

        let cb_address = res?.certification_body?.cb_address?.map(
          (ele, ind) => {
            let obj = {
              cb_address_: ele
            }
            return obj
          }
        )

        let seller_address =
          res?.seller_of_certified_products?.seller_address?.map((ele, ind) => {
            let obj = {
              seller_address_: ele
            }
            return obj
          })

        let buyer_address =
          res?.buyer_of_certified_products?.buyer_address?.map((ele, ind) => {
            let obj = {
              buyer_address_: ele
            }
            return obj
          })

        let certified_weight = res?.certified_weight?.map((ele, ind) => {
          let obj = {
            certified_weight_: ele
          }
          return obj
        })

        let ShipmentDetails = res?.shipments?.map((ele, ind) => {
          let consignee_address =
            ele?.consignee_name_and_address?.consignee_address?.map(
              (ele, ind) => {
                let obj = {
                  consignee_address_: ele
                }
                return obj
              }
            )

          let obj = {
            shipment_no: ele?.shipment_no,
            shipment_date:
              res?.shipment_date === ''
                ? null
                : dayjs(ele?.shipment_date, 'DD/mm/YYYY'),
            shipment_doc_no: ele?.shipment_doc_no,
            gross_shipping_weight: ele?.gross_shipping_weight,
            invoice_references: ele?.invoice_references,
            consignee_name: ele?.consignee_name_and_address?.consignee_name,
            consignee_address: consignee_address,
            consignee_town: ele?.consignee_name_and_address?.consignee_town,
            consignee_postcode:
              ele?.consignee_name_and_address?.consignee_postcode,
            consignee_state_or_province:
              ele?.consignee_name_and_address?.consignee_state_or_province,
            consignee_country_or_area:
              ele?.consignee_name_and_address?.consignee_country_or_area,
            consignee_te_id: ele?.consignee_name_and_address?.te_id
          }
          return obj
        })

        let ProductDetails = res?.certified_products?.map((ele, ind) => {
          let obj = {
            product_no: ele?.product_no,
            order_no: ele?.order_no,
            article_no: ele?.article_no,
            number_of_units: ele?.number_of_units,
            products_net_shipping_weight: ele?.net_shipping_weight,
            supplementary_weight: ele?.supplementary_weight,
            products_certified_weight: ele?.certified_weight,
            production_date:
              res?.production_date === ''
                ? null
                : dayjs(ele?.production_date, 'DD/MM/YYYY'),
            product_category: ele?.product_category,
            product_detail: ele?.product_detail,
            material_composition: ele?.material_composition,
            standard_label_grade: ele?.standard_label_grade,
            additional_info: ele?.additional_info,
            last_processor: ele?.last_processor,
            products_te_id: ele?.te_id,
            products_Country: ele?.country
          }

          return obj
        })

        let certified_components = res?.certified_components?.map(
          (ele, ind) => {
            let obj = {
              product_component_no: ele?.product_component_no,
              component_detail: ele?.component_detail,
              product_component_net_shipping_weight: ele?.net_shipping_weight,
              product_component_material_composition: ele?.material_composition,
              product_component_supplementary_weight: ele?.supplementary_weight,
              product_component_standard_name: ele?.standard?.name,
              product_component_label_grade: ele?.standard?.label_grade,
              product_component_certified_weight: ele?.certified_weight,
              product_component_additional_info: ele?.additional_info
            }
            return obj
          }
        )
        if (certified_components?.length === 0) {
          certified_components.push({
            product_component_no: '',
            component_detail: '',
            product_component_net_shipping_weight: '',
            product_component_material_composition: '',
            product_component_supplementary_weight: '',
            product_component_standard_name: '',
            product_component_label_grade: '',
            product_component_certified_weight: '',
            product_component_additional_info: ''
          })
        }

        let certified_raw_materials_and_declared_geographic_origin =
          res?.certified_raw_materials_and_declared_geographic_origin?.map(
            (ele, ind) => {
              let obj = {
                certified_raw_material: ele?.certified_raw_material,
                certified_certified_weight: ele?.certified_weight,
                certified_state_or_provice: ele?.country_or_area,
                certified_country_or_area: ele?.state_or_provice
              }
              return obj
            }
          )

        form2.setFieldsValue({
          file_name: response?.data?.file_name,
          cb_name: res?.certification_body?.cb_name,
          cb_address: cb_address,
          trader_tcs_for_organic_material:
            res?.certified_input_references?.trader_tcs_for_organic_material,
          town: res?.certification_body?.town,
          postcode: res?.certification_body?.postcode,
          state_or_province: res?.certification_body?.state_or_province,
          country_or_area: res?.certification_body?.country_or_area,
          licensing_code_of_certification_body:
            res?.certification_body?.licensing_code_of_certification_body,
          seller_name: res?.seller_of_certified_products?.seller_name,
          seller_town: res?.seller_of_certified_products?.seller_town,
          seller_postcode: res?.seller_of_certified_products?.seller_postcode,
          seller_state_or_province:
            res?.seller_of_certified_products?.seller_state_or_province,
          seller_country_or_area:
            res?.seller_of_certified_products?.seller_country_or_area,
          seller_on_behalf_of:
            res?.seller_of_certified_products?.seller_on_behalf_of,
          seller_certified_organization_name:
            res?.seller_of_certified_products
              ?.seller_certified_organization_name,
          sc_number: res?.seller_of_certified_products?.sc_number,
          textile_exchange_id: res?.seller_of_certified_products?.trader_te_id,
          client_number: res?.seller_of_certified_products?.client_number,
          seller_licence_number:
            res?.seller_of_certified_products?.seller_licence_number,
          non_certified_trader:
            res?.seller_of_certified_products?.non_certified_trader,
          trader_te_id: res?.seller_of_certified_products?.trader_te_id,
          seller_address: seller_address,
          buyer_name: res?.buyer_of_certified_products?.buyer_name,
          buyer_address: buyer_address,
          buyer_town: res?.buyer_of_certified_products?.buyer_town,
          buyer_postcode: res?.buyer_of_certified_products?.buyer_postcode,
          buyer_state_or_province:
            res?.buyer_of_certified_products?.buyer_state_or_province,
          buyer_country_or_area:
            res?.buyer_of_certified_products?.buyer_country_or_area,
          buyer_on_behalf_of:
            res?.buyer_of_certified_products?.buyer_on_behalf_of,
          buyer_certified_organization_name:
            res?.buyer_of_certified_products?.buyer_certified_organization_name,
          buyer_textile_exchange_id:
            res?.buyer_of_certified_products?.textile_exchange_id,
          buyer_cb_acronym: res?.buyer_of_certified_products?.buyer_cb_acronym,
          buyer_client_number: res?.buyer_of_certified_products?.client_number,
          buyer_licence_number:
            res?.buyer_of_certified_products?.buyer_licence_number,
          buyer_trader_te_id: res?.buyer_of_certified_products?.trader_te_id,
          gross_shipping_weight: res?.gross_shipping_weight,
          net_shipping_weight: res?.net_shipping_weight,
          certified_weight: certified_weight,
          an_organic_farmin_standards_which_is_closed_by:
            res?.declarations_by_certification_body
              ?.an_organic_farmin_standards_which_is_closed_by,
          tc_standard: res?.declarations_by_certification_body?.tc_standard,
          certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules:
            res?.declarations_by_certification_body
              ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules,
          tc_organic_farm_standard:
            res?.declarations_by_certification_body?.tc_organic_farm_standard,
          ShipmentDetails: ShipmentDetails,
          ProductDetails: ProductDetails,
          certified_components: certified_components,
          header_tc_number: res?.header?.tc_number,
          tc_version_number: res?.header?.tc_version_number,
          header_tc_standard: res?.header?.tc_standard,
          tc_place_of_issue: res?.footer?.tc_place_of_issue,
          tc_date_of_issue:
            res?.footer?.tc_date_of_issue === ''
              ? null
              : dayjs(res?.footer?.tc_date_of_issue, 'DD/MM/YYYY'),
          name_of_authorized_signatory:
            res?.footer?.name_of_authorized_signatory,
          tc_status: res?.footer?.tc_status,
          tc_last_updated:
            res?.footer?.tc_last_updated === ''
              ? null
              : dayjs(res?.footer?.tc_last_updated, 'DD/MM/YYYY'),
          certified_raw_material_list:
            certified_raw_materials_and_declared_geographic_origin,
          the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor:
            res?.declarations_by_seller_of_certified_products
              ?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
        })
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

  const handleSubmit2 = async values => {
    setLoading2(true)

    let cb_address = values?.cb_address?.map((ele, ind) => {
      return ele?.cb_address_
    })

    let seller_address = values?.seller_address?.map((ele, ind) => {
      return ele?.seller_address_
    })

    let buyer_address = values?.buyer_address?.map((ele, ind) => {
      return ele?.buyer_address_
    })

    let certified_weight = values?.certified_weight?.map((ele, ind) => {
      return ele?.certified_weight_
    })

    let input_tcs = tags?.join(';')
    let farm_scs = tags1?.join(';')
    let farm_tcs = tags2?.join(';')

    let shipmentList = values?.ShipmentDetails?.map((ele, ind) => {
      let consignee_address = ele?.consignee_address?.map((ele, ind) => {
        return ele?.consignee_address_
      })
      let obj = {
        shipment_no: ele?.shipment_no,
        shipment_date: formatDateToDDMMYYYY(ele?.shipment_date),
        shipment_doc_no: ele?.shipment_doc_no,
        gross_shipping_weight: ele?.gross_shipping_weight,
        invoice_references: ele?.invoice_references,
        consignee_name_and_address: {
          consignee_name: ele?.consignee_name,
          consignee_address: consignee_address,
          consignee_town: ele?.consignee_town,
          consignee_postcode: ele?.consignee_postcode,
          consignee_state_or_province: ele?.consignee_state_or_province,
          consignee_country_or_area: ele?.consignee_country_or_area,
          te_id: ele?.consignee_te_id
        }
      }
      return obj
    })

    let ProductDetails = values?.ProductDetails?.map((ele, ind) => {
      console.log(ele)

      let obj = {
        product_no: ele?.product_no,
        order_no: ele?.order_no,
        article_no: ele?.article_no,
        number_of_units: ele?.number_of_units,
        net_shipping_weight: ele?.products_net_shipping_weight,
        supplementary_weight: ele?.supplementary_weight,
        certified_weight: ele?.products_certified_weight,
        production_date: formatDateToDDMMYYYY(ele?.production_date),
        product_category: ele?.product_category,
        product_detail: ele?.product_detail,
        material_composition: ele?.material_composition,
        standard_label_grade: ele?.standard_label_grade,
        additional_info: ele?.additional_info,
        last_processor: ele?.last_processor,
        te_id: ele?.products_te_id,
        country: ele?.products_Country
      }
      return obj
    })

    let certified_components = values?.certified_components?.map((ele, ind) => {
      let obj = {
        product_component_no: ele?.product_component_no,
        component_detail: ele?.component_detail,
        net_shipping_weight: ele?.product_component_net_shipping_weight,
        material_composition: ele?.product_component_material_composition,
        supplementary_weight: ele?.product_component_supplementary_weight,
        standard: {
          name: ele?.product_component_standard_name,
          label_grade: ele?.product_component_label_grade
        },
        certified_weight: ele?.product_component_certified_weight,
        additional_info: ele?.product_component_additional_info
      }
      return obj
    })

    let certified_raw_materials_and_declared_geographic_origin =
      values?.certified_raw_material_list?.map((ele, ind) => {
        let obj = {
          certified_raw_material: (ele?.certified_raw_material)?.replace(/\).*$/, ")"),
          certified_weight: ele?.certified_certified_weight,
          state_or_provice: ele?.certified_state_or_provice,
          country_or_area: ele?.certified_country_or_area
        }
        return obj
      })

    let data = {
      file_name: values?.file_name,
      extracted_data: {
        certification_body: {
          cb_name: values?.cb_name,
          cb_address: cb_address,
          town: values?.town,
          postcode: values?.postcode,
          state_or_province: values?.state_or_province,
          country_or_area: values?.country_or_area,
          licensing_code_of_certification_body:
            values?.licensing_code_of_certification_body
        },
        seller_of_certified_products: {
          seller_name: values?.seller_name,
          seller_address: seller_address,
          seller_town: values?.seller_town,
          seller_postcode: values?.seller_postcode,
          seller_state_or_province: values?.seller_state_or_province,
          seller_country_or_area: values?.seller_country_or_area,
          seller_on_behalf_of: values?.seller_on_behalf_of,
          seller_certified_organization_name:
            values?.seller_certified_organization_name,
          sc_number: values?.sc_number,
          textile_exchange_id: values?.textile_exchange_id,
          client_number: values?.client_number,
          seller_licence_number: values?.seller_licence_number,
          non_certified_trader: values?.non_certified_trader,
          trader_te_id: values?.trader_te_id
        },
        buyer_of_certified_products: {
          buyer_name: values?.buyer_name,
          buyer_address: buyer_address,
          buyer_town: values?.buyer_town,
          buyer_postcode: values?.buyer_postcode,
          buyer_state_or_province: values?.buyer_state_or_province,
          buyer_country_or_area: values?.buyer_country_or_area,
          buyer_on_behalf_of: values?.buyer_on_behalf_of,
          buyer_certified_organization_name:
            values?.buyer_certified_organization_name,
          textile_exchange_id: values?.buyer_textile_exchange_id,
          buyer_cb_acronym: values?.buyer_cb_acronym,
          client_number: values?.buyer_client_number,
          buyer_licence_number: values?.buyer_licence_number,
          trader_te_id: values?.buyer_trader_te_id
        },
        gross_shipping_weight: values?.gross_shipping_weight,
        net_shipping_weight: values?.net_shipping_weight,
        certified_weight: certified_weight,
        declarations_by_certification_body: {
          an_organic_farmin_standards_which_is_closed_by:
            values?.an_organic_farmin_standards_which_is_closed_by,
          tc_standard: values?.tc_standard,
          certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules:
            values?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules,
          tc_organic_farm_standard: values?.tc_organic_farm_standard
        },
        certified_input_references: {
          input_tcs: input_tcs,
          farm_scs: farm_scs,
          farm_tcs: farm_tcs,
          trader_tcs_for_organic_material:
            values?.trader_tcs_for_organic_material
        },
        shipments: shipmentList,
        certified_products: ProductDetails,
        certified_components: certified_components,
        certified_raw_materials_and_declared_geographic_origin:
          certified_raw_materials_and_declared_geographic_origin,
        declarations_by_seller_of_certified_products: {
          the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor:
            values?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
        },
        header: {
          tc_number: values?.header_tc_number,
          tc_version_number: values?.tc_version_number,
          tc_standard: values?.header_tc_standard
        },
        footer: {
          tc_place_of_issue: values?.tc_place_of_issue,
          tc_date_of_issue: formatDateToDDMMYYYY(values?.tc_date_of_issue),
          tc_status: values?.tc_status,
          tc_last_updated: formatDateToDDMMYYYY(values?.tc_last_updated),
          name_of_authorized_signatory: values?.name_of_authorized_signatory
        }
      }
    }

    try {
      let response = await createFormTcType1(data)
      console.log(response)
      if (response?.status_code === 200 || response?.status_code === 201) {
        toast.success(response?.message)
        navigate(`${links.tcType1List}`)
      } else {
        toast.error(response?.message)
      }
    } catch (error) {
      toast.error('Something Went Wrong')
    }
    setLoading2(false)
  }

  const handleValuesChange = debounce(changedValues => {
    if (changedValues?.ShipmentDetails) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues.ShipmentDetails)?.forEach(key => {
          const shipmentDetail = changedValues?.ShipmentDetails?.[key]
          if (shipmentDetail) {
            Object?.keys(shipmentDetail)?.forEach(field => {
              const fieldValue = shipmentDetail?.[field]
              const fieldName = `${key}-${field}`
              updatedEmptyFields[fieldName] = !fieldValue
            })
          }
        })
        return updatedEmptyFields
      })
    } else if (changedValues?.cb_address) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.cb_address)?.forEach(key => {
        const cbAddressValue = form?.getFieldValue([
          'cb_address',
          key,
          'cb_address_'
        ])
        updatedEmptyFields[key] = !cbAddressValue
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.seller_address) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.seller_address)?.forEach(key => {
        const sellerAddressValue = form?.getFieldValue([
          'seller_address',
          key,
          'seller_address_'
        ])
        updatedEmptyFields[key] = !sellerAddressValue
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.buyer_address) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.buyer_address)?.forEach(key => {
        const buyerAddressValue = form?.getFieldValue([
          'buyer_address',
          key,
          'buyer_address_'
        ])
        updatedEmptyFields[key] = !buyerAddressValue
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.certified_weight) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.certified_weight)?.forEach(key => {
        const certifiedWeight = form?.getFieldValue([
          'certified_weight',
          key,
          'certified_weight_'
        ])
        updatedEmptyFields[key] = !certifiedWeight
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.ProductDetails) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues?.ProductDetails)?.forEach(key => {
          const ProductDetail = changedValues?.ProductDetails?.[key]
          if (ProductDetail) {
            Object.keys(ProductDetail)?.forEach(field => {
              const fieldValue = ProductDetail?.[field]
              const fieldName = `${key}-${field}`
              updatedEmptyFields[fieldName] = !fieldValue
            })
          }
        })

        return updatedEmptyFields
      })
    } else if (changedValues?.certified_components) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues.certified_components)?.forEach(key => {
          const certifiedComponent = changedValues?.certified_components?.[key]
          if (certifiedComponent) {
            Object?.keys(certifiedComponent)?.forEach(field => {
              const fieldValue = certifiedComponent?.[field]
              const fieldName = `${key}-${field}`
              updatedEmptyFields[fieldName] = !fieldValue
            })
          }
        })

        return updatedEmptyFields
      })
    } else if (changedValues?.certified_raw_material_list) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues.certified_raw_material_list)?.forEach(key => {
          const certifiedRawMaterialList = changedValues?.certified_raw_material_list?.[key]
          if (certifiedRawMaterialList) {
            Object?.keys(certifiedRawMaterialList)?.forEach(field => {
              const fieldValue = certifiedRawMaterialList?.[field]
              const fieldName = `${key}-${field}`
              updatedEmptyFields[fieldName] = !fieldValue
            })
          }
        })

        return updatedEmptyFields
      })
    }
  }, 100)

  const getFieldClassName = (mainName, name, field, index) => {
    // if (field === "product_component_label_grade") {
    //   console.log(field);

    //   console.log(form2?.getFieldValue(mainName)?.[index]);
    // }

    return emptyFields[`${name}-${field}`] ||
      (form2?.getFieldValue(mainName)?.[index]?.[field] === '' &&
        !emptyFields?.[`${name}-${field}`])
      ? 'empty_field'
      : ''
  }

  const getNestedFieldClassName = (
    shipmentIndex,
    nestedIndex,
    parentName,
    childName,
    subChildName
  ) => {
    const nestedArray = form2?.getFieldValue([
      parentName,
      shipmentIndex,
      childName
    ])
    const value =
      nestedArray && nestedArray?.[nestedIndex]
        ? nestedArray?.[nestedIndex]?.[subChildName]
        : ''
    return !value || value?.trim() === '' ? 'empty_field' : ''
  }

  return formNo === '1' ? (
    <>
      {loading && <Spinner message='Loading...' isActive={loading} />}{' '}
      <div className='flex'>
        {' '}
        <div style={{ width: '20%' }}>
          {' '}
          <Slidebar />
        </div>
        <div style={{ width: '80%' }}>
          {/* <AntdForm
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
              <h2 className=' pb-5 section-title'>
                Upload PDF For Transaction Certificate (TC) Form{' '}
              </h2>
              <div className=''>
                <div className='flex items-center md:justify-between flex-wrap'>
                  <AntdForm.Item
                    label='Upload Pdf Here'
                    name='UploadPdf'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    className='pt-5 w-full md:w-[49%] UploadPdf'
                    rules={[
                      { required: true, message: 'Please upload a PDF file!' }
                    ]}
                  >
                    <Upload
                      action='/upload.do'
                      listType='picture-card'
                      beforeUpload={beforeUpload}
                      accept='.pdf'
                      maxCount={1}
                      onChange={info => { }}
                    >
                      <button
                        style={{ border: 0, background: 'none' }}
                        type='button'
                      >
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
          </AntdForm> */}
           <section className='form_1  rounded-xl shadow-xl'
            style={{ maxWidth: 800, margin: '0 auto' }}>
            <h2 className=' pb-5 section-title'>
              Upload PDF For Scope Certificate Form
            </h2>
            <Upload
              listType="picture-card"
              beforeUpload={(file) => false} // Disable auto-upload
              accept=".pdf"
              maxCount={1}
              onChange={handleChange} // Trigger when file changes
            >
              <Button
                icon={<PlusOutlined />}
                type="dashed"
              >
                Upload Pdf
              </Button>
            </Upload>
          </section>
        </div>
      </div>
    </>
  ) : (
    <>
      {loading2 && <Spinner message='Loading...' isActive={loading2} />}{' '}
      <div className='flex'>
        {' '}
        <div style={{ width: '20%' }}>
          {' '}
          <Slidebar />
        </div>
        <div style={{ width: '80%' }}>
          {' '}
          <div className='container mx-auto  '>
            <AntdForm
              form={form2}
              onFinish={handleSubmit2}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout='vertical'
              className='form_1  rounded-xl shadow-xl'
              style={{ maxWidth: 900, margin: '0 auto' }}
              onValuesChange={handleValuesChange}
            >
              <h1 className='text-3xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center'>
                Transaction Certificate (TC) Form
              </h1>
              {/* Header*/}
              <section className='section mt-10'>
                <h2 className='text-2xl pb-3 section-title'>Header</h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Tc Number'
                      name='header_tc_number'
                      placeholder='Enter Tc Number'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Tc Version Number'
                      name='tc_version_number'
                      placeholder='Enter Tc Version Number'
                      component={Input}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Tc Standard'
                      name='header_tc_standard'
                      placeholder='Enter Tc Standard'
                      component={Input}
                    />
                    <CustomFormItem
                      label='File Name'
                      name='file_name'
                      rules={[
                        { required: true, message: 'File Name is required' }
                      ]}
                      placeholder='Enter File Name'
                      component={Input}
                    />
                  </div>
                </div>
              </section>
              {/* Footer*/}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>Footer</h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Tc Place of Issue'
                      name='tc_place_of_issue'
                      placeholder='Enter Tc Place of Issue'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Tc Date Of Issue'
                      name='tc_date_of_issue'
                      placeholder='Enter Tc Date of Issue'
                      component={DatePicker}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Name Of Authorized Signatory'
                      name='name_of_authorized_signatory'
                      placeholder='Enter Name Of Authorized Signatory'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Tc Status'
                      name='tc_status'
                      placeholder='Enter Name Tc Status'
                      component={Input}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Tc Last Updated'
                      name='tc_last_updated'
                      placeholder='Enter Tc Last Updated'
                      component={DatePicker}
                    />
                  </div>
                </div>
              </section>
              {/* certificate info */}
              <section className='section'>
                <h2 className=' pb-3 section-title'>
                  Certificate Body Information:
                </h2>
                <div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Certificate Name'
                      name='cb_name'
                      placeholder='Enter Certification Name'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Town'
                      name='town'
                      placeholder='Enter Town'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Post Code'
                      name='postcode'
                      placeholder='Enter Postcode'
                      component={Input}
                    />
                    <CustomFormItem
                      label='State or Province'
                      name='state_or_province'
                      placeholder='Enter State or Province'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Country or Area'
                      name='country_or_area'
                      placeholder='Enter Country or Area'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Licensing Code of Certification Body'
                      name='licensing_code_of_certification_body'
                      placeholder='Enter Licensing Code of Certification Body'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.List name='cb_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Certificate Address'
                            className='w-full md:w-[49%]'
                          >
                            {fields.map(
                              ({ key, name, ...restField }, index) => (
                                <Space
                                  key={key}
                                  style={{ display: 'flex', marginBottom: 8 }}
                                  align='baseline'
                                >
                                  <AntdForm.Item
                                    {...restField}
                                    name={[name, 'cb_address_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'cb_address',
                                      name,
                                      'cb_address_',
                                      index
                                    )}`}
                                  >
                                    <Input
                                      placeholder={`Enter Certificate Address`}
                                    />
                                  </AntdForm.Item>

                                  {fields.length > 1 && (
                                    <MinusCircleOutlined
                                      onClick={() => remove(name)}
                                    />
                                  )}
                                </Space>
                              )
                            )}
                            <AntdForm.Item>
                              <Button
                                type='dashed'
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add Certificate Address
                              </Button>
                            </AntdForm.Item>
                          </AntdForm.Item>
                        </>
                      )}
                    </AntdForm.List>
                  </div>
                </div>
              </section>
              {/* Seller of Certified Products */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Seller of Certified Products Information:
                </h2>
                <div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Seller Name'
                      name='seller_name'
                      placeholder='Enter Seller Name'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Seller Town'
                      name='seller_town'
                      placeholder='Enter Seller Town'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Seller Postcode'
                      name='seller_postcode'
                      placeholder='Enter Seller Postcode'
                      component={Input}
                    />

                    <CustomFormItem
                      label='Seller State or Province'
                      name='seller_state_or_province'
                      placeholder='Enter Seller State or Province'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Seller Country or Area'
                      name='seller_country_or_area'
                      placeholder='Enter Seller Country or Area'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Seller on Behalf Of'
                      name='seller_on_behalf_of'
                      placeholder='Enter Seller on Behalf Of'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Seller Certified Organization Name'
                      name='seller_certified_organization_name'
                      placeholder='Enter Seller Certified Organization Name'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Sc Number'
                      name='sc_number'
                      placeholder='Sc Number'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Textile Exchange Id'
                      name='textile_exchange_id'
                      placeholder='Enter Textile Exchange Id'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Client Number'
                      name='client_number'
                      placeholder='Client Number'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Seller Licence Number'
                      name='seller_licence_number'
                      placeholder='Enter Seller Licence Number'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Non Certified Trader'
                      name='non_certified_trader'
                      placeholder='Non Certified Trader'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Trader Te Id'
                      name='trader_te_id'
                      placeholder='Enter Trader Te Id'
                      component={Input}
                    />
                    <AntdForm.List name='seller_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Seller Address'
                            required
                            className='w-full md:w-[49%]'
                          >
                            {fields.map(
                              ({ key, name, ...restField }, index) => (
                                <Space
                                  key={key}
                                  style={{ display: 'flex', marginBottom: 8 }}
                                  align='baseline'
                                >
                                  <AntdForm.Item
                                    {...restField}
                                    name={[name, 'seller_address_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'seller_address',
                                      name,
                                      'seller_address_',
                                      index
                                    )}`}
                                  >
                                    <Input
                                      placeholder={`Enter Seller Address`}
                                    />
                                  </AntdForm.Item>

                                  {fields.length > 1 && (
                                    <MinusCircleOutlined
                                      onClick={() => remove(name)}
                                    />
                                  )}
                                </Space>
                              )
                            )}
                            <AntdForm.Item>
                              <Button
                                type='dashed'
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add Seller Address
                              </Button>
                            </AntdForm.Item>
                          </AntdForm.Item>
                        </>
                      )}
                    </AntdForm.List>
                  </div>
                </div>
              </section>
              {/* Buyer of Certified Products */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Buyer of certified product(s) Information:
                </h2>
                <div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Name'
                      name='buyer_name'
                      placeholder='Enter Buyer Name'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Buyer Town'
                      name='buyer_town'
                      placeholder='Enter Buyer Town'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Postcode'
                      name='buyer_postcode'
                      placeholder='Enter Buyer Postcode'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Buyer State or Province'
                      name='buyer_state_or_province'
                      placeholder='Enter Buyer State or Province'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Country or Area'
                      name='buyer_country_or_area'
                      placeholder='Enter Buyer Country or Area'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Buyer on Behalf Of'
                      name='buyer_on_behalf_of'
                      placeholder='Enter Buyer on Behalf Of'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Certified Organization Name'
                      name='buyer_certified_organization_name'
                      placeholder='Enter Buyer Certified Organization Name'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Textile Exchange Id'
                      name='buyer_textile_exchange_id'
                      placeholder='Textile Exchange Id'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Cb Acronym'
                      name='buyer_cb_acronym'
                      placeholder='Enter Buyer Cb Acronym'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Client Number'
                      name='buyer_client_number'
                      placeholder='Client Number'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Licence Number'
                      name='buyer_licence_number'
                      placeholder='Enter Buyer Licence Number'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Trader Te Id'
                      name='buyer_trader_te_id'
                      placeholder='Enter Trader Te Id'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.List name='buyer_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Buyer Address'
                            required
                            className='w-full md:w-[49%]'
                          >
                            {fields.map(
                              ({ key, name, ...restField }, index) => (
                                <Space
                                  key={key}
                                  style={{ display: 'flex', marginBottom: 8 }}
                                  align='baseline'
                                >
                                  <AntdForm.Item
                                    {...restField}
                                    name={[name, 'buyer_address_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'buyer_address',
                                      name,
                                      'buyer_address_',
                                      index
                                    )}`}
                                  >
                                    <Input
                                      placeholder={`Enter Buyer Address`}
                                    />
                                  </AntdForm.Item>

                                  {fields.length > 1 && (
                                    <MinusCircleOutlined
                                      onClick={() => remove(name)}
                                    />
                                  )}
                                </Space>
                              )
                            )}
                            <AntdForm.Item>
                              <Button
                                type='dashed'
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add Buyer Address
                              </Button>
                            </AntdForm.Item>
                          </AntdForm.Item>
                        </>
                      )}
                    </AntdForm.List>
                  </div>
                </div>
              </section>
              {/* 4.5.6. Weights */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'> Weights</h2>
                <div className=''>
                  <div className='flex items-center md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Gross Shipping Weight'
                      name='gross_shipping_weight'
                      placeholder='Enter Gross Shipping Weight'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Net Shipping Weight'
                      name='net_shipping_weight'
                      placeholder='Enter Net Shipping Weight'
                      component={Input}
                    />
                  </div>
                  <AntdForm.List name='certified_weight'>
                    {(fields, { add, remove }) => (
                      <>
                        <AntdForm.Item
                          label='Certified Weight'
                          required
                          className='w-full md:w-[49%]'
                        >
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Space
                              key={key}
                              style={{ display: 'flex', marginBottom: 8 }}
                              align='baseline'
                            >
                              <AntdForm.Item
                                {...restField}
                                name={[name, 'certified_weight_']}
                                style={{ flex: 1 }}
                                className={`${getFieldClassName(
                                  'certified_weight',
                                  name,
                                  'certified_weight_',
                                  index
                                )}`}
                              >
                                <Input placeholder={`Enter Certified Weight`} />
                              </AntdForm.Item>

                              {fields.length > 1 && (
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                />
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
                              Add Certified Weight
                            </Button>
                          </AntdForm.Item>
                        </AntdForm.Item>
                      </>
                    )}
                  </AntdForm.List>
                </div>
              </section>
              {/* Declarations by Certification Body */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  {' '}
                  Declarations by Certification Body
                </h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='An Organic Farmin Standards Which is Closed By'
                      name='an_organic_farmin_standards_which_is_closed_by'
                      placeholder='Enter An Organic Farmin Standards Which is Closed By'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Tc Standard'
                      name='tc_standard'
                      placeholder='Enter Tc Standard'
                      component={Input}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Certification of the organic material used for the products listed complies with USDA NOP rules:'
                      name='certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules'
                      placeholder='Enter Organic Material Certification'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Tc Organic Farm Standard'
                      name='tc_organic_farm_standard'
                      placeholder='Enter Tc Organic Farm Standard'
                      component={Input}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'></div>
                </div>
              </section>
              {/* 8. Certified Input References  */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Certified Input References{' '}
                </h2>
                <div className=''>
                  <div className='flex md:justify-between flex-wrap'>
                    <div className='w-full'>
                      <>
                        <AntdForm.Item name='InputTCs' label='Input TCs'>
                          <TagWithError
                            tags={tags}
                            setTags={setTags}
                            name='InputTCs'
                          />
                        </AntdForm.Item>

                        <AntdForm.Item name='FarmSCs' label='Farm SCs'>
                          <TagWithError
                            tags={tags1}
                            setTags={setTags1}
                            name='FarmSCs'
                          />
                        </AntdForm.Item>

                        <AntdForm.Item name='FarmTCs' label='Farm TCs'>
                          <TagWithError
                            tags={tags2}
                            setTags={setTags2}
                            name='FarmTCs'
                          />
                        </AntdForm.Item>
                      </>
                    </div>
                    <CustomFormItem
                      label='Trader(s) Transaction Certificates numbers of First Raw material:'
                      name='trader_tcs_for_organic_material'
                      placeholder='Enter Trader(s) Transaction Certificates numbers of First Raw material:'
                      component={Input}
                      classList='md:w-full'
                    />
                  </div>
                </div>
              </section>
              {/* 9. Shipments */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'> Shipments </h2>
                <div className='Shipments'>
                  <AntdForm.List name='ShipmentDetails'>
                    {(fields, { add, remove }) => (
                      <>
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
                                  name={[name, 'shipment_no']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'shipment_no',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Shipment No.' />
                                </AntdForm.Item>
                                <AntdForm.Item
                                  {...restField}
                                  label='Shipment Date:'
                                  name={[name, 'shipment_date']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'shipment_date',
                                    index
                                  )}`}
                                >
                                  <DatePicker
                                    className='datePickerIpnut'
                                    format='DD/MM/YYYY'
                                  />
                                </AntdForm.Item>
                              </div>
                              <div className='flex md:justify-between flex-wrap'>
                                <AntdForm.Item
                                  {...restField}
                                  label='Shipment Doc No.'
                                  name={[name, 'shipment_doc_no']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'shipment_doc_no',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Shipment Doc No.' />
                                </AntdForm.Item>
                                <AntdForm.Item
                                  {...restField}
                                  label='Gross Shipping Weight:'
                                  name={[name, 'gross_shipping_weight']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'gross_shipping_weight',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Gross Shipping Weight' />
                                </AntdForm.Item>
                              </div>
                              <div className='flex md:justify-between flex-wrap'>
                                <AntdForm.Item
                                  {...restField}
                                  label='Invoice References:'
                                  name={[name, 'invoice_references']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'invoice_references',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Invoice References' />
                                </AntdForm.Item>
                                <AntdForm.Item
                                  {...restField}
                                  label='Consignee Name:'
                                  name={[name, 'consignee_name']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_name',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Consignee Name' />
                                </AntdForm.Item>
                              </div>
                              <div className='flex md:justify-between flex-wrap'>
                                <AntdForm.Item
                                  {...restField}
                                  label='Consignee Town:'
                                  name={[name, 'consignee_town']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_town',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Consignee Town' />
                                </AntdForm.Item>
                                <AntdForm.Item
                                  {...restField}
                                  label='Consignee Postcode:'
                                  name={[name, 'consignee_postcode']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_postcode',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Consignee Postcode' />
                                </AntdForm.Item>
                              </div>
                              <div className='flex md:justify-between flex-wrap'>
                                <AntdForm.Item
                                  {...restField}
                                  label='Consignee State or Province:'
                                  name={[name, 'consignee_state_or_province']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_state_or_province',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Consignee State or Province' />
                                </AntdForm.Item>
                                <AntdForm.Item
                                  {...restField}
                                  label='Consignee Country or Area'
                                  name={[name, 'consignee_country_or_area']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_country_or_area',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Consignee Country or Area' />
                                </AntdForm.Item>
                              </div>
                              <div className='flex md:justify-between flex-wrap'>
                                <AntdForm.Item
                                  {...restField}
                                  label='Te Id'
                                  name={[name, 'consignee_te_id']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_te_id',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Te Id' />
                                </AntdForm.Item>

                                <div className='w-full md:w-[49%]'>
                                  {/* Nested List for Consignee Address */}
                                  <AntdForm.List
                                    name={[name, 'consignee_address']}
                                    initialValue={[{ consignee_address_: '' }]}
                                  >
                                    {(
                                      subFields,
                                      { add: addSub, remove: removeSub }
                                    ) => (
                                      <>
                                        {subFields.map(
                                          (
                                            {
                                              key: subKey,
                                              name: subName,
                                              ...restSubField
                                            },
                                            ind
                                          ) => (
                                            <Space
                                              key={subKey}
                                              style={{
                                                display: 'flex',
                                                marginBottom: 8
                                              }}
                                              align='baseline'
                                            >
                                              <AntdForm.Item
                                                {...restSubField}
                                                name={[
                                                  subName,
                                                  'consignee_address_'
                                                ]}
                                                label='Consignee Address:'
                                                className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                                  index,
                                                  ind,
                                                  'ShipmentDetails',
                                                  'consignee_address',
                                                  'consignee_address_'
                                                )}`}
                                              >
                                                <Input placeholder='Enter Consignee Address' />
                                              </AntdForm.Item>
                                              {subFields.length > 1 && (
                                                <MinusCircleOutlined
                                                  onClick={() =>
                                                    removeSub(subName)
                                                  }
                                                />
                                              )}
                                            </Space>
                                          )
                                        )}
                                        <AntdForm.Item>
                                          <Button
                                            type='dashed'
                                            onClick={() => addSub()}
                                            block
                                            icon={<PlusOutlined />}
                                          >
                                            Add Consignee Address
                                          </Button>
                                        </AntdForm.Item>
                                      </>
                                    )}
                                  </AntdForm.List>
                                </div>
                              </div>
                            </div>
                            {fields.length > 1 && (
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
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
                            Add Shipment Details
                          </Button>
                        </AntdForm.Item>
                      </>
                    )}
                  </AntdForm.List>
                </div>
              </section>
              {/* 10. Certified Products */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Certified Products
                </h2>
                <AntdForm.List name='ProductDetails'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Product No.:'
                              name={[name, 'product_no']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'product_no',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Product No.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Order No.:'
                              name={[name, 'order_no']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'order_no',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Order No.' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Article No.:'
                              name={[name, 'article_no']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'article_no',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Article No.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Number of Units:'
                              name={[name, 'number_of_units']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'number_of_units',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Number of Units' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Net Shipping Weight'
                              name={[name, 'products_net_shipping_weight']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'products_net_shipping_weight',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Net Shipping Weight' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Supplementary Weight'
                              name={[name, 'supplementary_weight']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'supplementary_weight',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Supplementary Weight' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Production Date:'
                              name={[name, 'production_date']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'production_date',
                                index
                              )}`}
                            >
                              <DatePicker
                                className='datePickerIpnut'
                                format='DD/MM/YYYY'
                              />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Product Category'
                              name={[name, 'product_category']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'product_category',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Product Category' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Product Detail:'
                              name={[name, 'product_detail']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'product_detail',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Product Detail' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Material Composition'
                              name={[name, 'material_composition']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'material_composition',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Material Composition' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Standard Label Grade:'
                              name={[name, 'standard_label_grade']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'standard_label_grade',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Standard Label Grade' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Additional Info'
                              name={[name, 'additional_info']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'additional_info',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Additional Info' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Last Processor'
                              name={[name, 'last_processor']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'last_processor',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Last Processor' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Te Id'
                              name={[name, 'products_te_id']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'products_te_id',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Te Id' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Certified Weight:'
                              name={[name, 'products_certified_weight']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'products_certified_weight',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Certified Weight' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Country'
                              name={[name, 'products_Country']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'products_Country',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Country' />
                            </AntdForm.Item>
                          </div>
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              className='dynamic-delete-button StandardLabelGradeDelete'
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

              {/* 11.  Certified Components*/}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Certified Components
                </h2>
                <div className='certified_components'>
                  <AntdForm.List name='certified_components'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <div
                            key={key}
                            className='pb-5 certified_component_part relative'
                          >
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Product Component No.'
                                name={[name, 'product_component_no']}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_no', index)}`}
                              >
                                <Input placeholder='Enter Product Component No.' />
                              </AntdForm.Item>
                              <AntdForm.Item
                                {...restField}
                                label='Component Detail:'
                                name={[name, 'component_detail']}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'component_detail', index)}`}
                              >
                                <Input placeholder='Enter Component Detail' />
                              </AntdForm.Item>
                            </div>
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Net Shipping Weight'
                                name={[
                                  name,
                                  'product_component_net_shipping_weight'
                                ]}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_net_shipping_weight', index)}`}
                              >
                                <Input placeholder='Enter Net Shipping Weight' />
                              </AntdForm.Item>
                              <AntdForm.Item
                                {...restField}
                                label='Material Composition'
                                name={[
                                  name,
                                  'product_component_material_composition'
                                ]}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_material_composition', index)}`}
                              >
                                <Input placeholder='Enter Material Composition' />
                              </AntdForm.Item>
                            </div>
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Supplementary Weight'
                                name={[
                                  name,
                                  'product_component_supplementary_weight'
                                ]}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_supplementary_weight', index)}`}
                              >
                                <Input placeholder='Enter Supplementary Weight' />
                              </AntdForm.Item>
                              <AntdForm.Item
                                {...restField}
                                label='Certified Weight'
                                name={[
                                  name,
                                  'product_component_certified_weight'
                                ]}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_certified_weight', index)}`}
                              >
                                <Input placeholder='Enter Certified Weight' />
                              </AntdForm.Item>
                            </div>
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Standard Name'
                                name={[name, 'product_component_standard_name']}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_standard_name', index)}`}
                              >
                                <Input placeholder='Enter Standard Name' />
                              </AntdForm.Item>
                              <AntdForm.Item
                                {...restField}
                                label='Standard Label Grade'
                                name={[name, 'product_component_label_grade']}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_label_grade', index)}`}
                              >
                                <Input placeholder='Enter Standard Label Grade' />
                              </AntdForm.Item>
                            </div>
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Additional Info'
                                name={[
                                  name,
                                  'product_component_additional_info'
                                ]}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_additional_info', index)}`}
                              >
                                <Input placeholder='Enter Additional Info' />
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
                            onClick={() =>
                              // add({
                              //   product_component_no: '',
                              //   component_detail: '',
                              //   product_component_net_shipping_weight: '',
                              //   product_component_material_composition: '',
                              //   product_component_supplementary_weight: '',
                              //   product_component_certified_weight: '',
                              //   product_component_standard_name: '',
                              //   product_component_label_grade: '',
                              //   product_component_additional_info: ''
                              // })
                              add()
                            }
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Component
                          </Button>
                        </AntdForm.Item>
                      </>
                    )}
                  </AntdForm.List>
                </div>
              </section>

              {/* 12. Certified Raw Materials And Declared Geographic Origin */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Certified Raw Materials And Declared Geographic Origin{' '}
                </h2>
                <AntdForm.List name='certified_raw_material_list'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div
                          key={key}
                          className={`pb-4 certified_component_part relative raw_material_part `}
                        >
                          {/* ${index === 0 ? "pt-4" : ""} */}
                          <div className='flex flex-wrap md:justify-between items-end'>
                            <AntdForm.Item
                              {...restField}
                              label='Certified Raw Material'
                              name={[name, 'certified_raw_material']}
                              className={`w-full md:w-[49%] ${getFieldClassName('certified_raw_material_list', name, 'certified_raw_material', index)}`}
                            >
                              <Input placeholder='Enter Certified Raw Material' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Certified Weight'
                              name={[name, 'certified_certified_weight']}
                              className={`w-full md:w-[49%] ${getFieldClassName('certified_raw_material_list', name, 'certified_certified_weight', index)}`}
                            >
                              <Input placeholder='Enter Certified Weight' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex flex-wrap md:justify-between items-end'>
                            <AntdForm.Item
                              {...restField}
                              label='State or Province'
                              name={[name, 'certified_state_or_provice']}
                              className={`w-full md:w-[49%] ${getFieldClassName('certified_raw_material_list', name, 'certified_state_or_provice', index)}`}
                            >
                              <Input placeholder='Enter State or Province' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Country or Area'
                              name={[name, 'certified_country_or_area']}
                              className={`w-full md:w-[49%] ${getFieldClassName('certified_raw_material_list', name, 'certified_country_or_area', index)}`}
                            >
                              <Input placeholder='Enter Country or Area' />
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
                          onClick={() =>
                            // add({
                            //   certified_raw_material: '',
                            //   certified_certified_weight: '',
                            //   certified_state_or_provice: '',
                            //   certified_country_or_area: ''
                            // })
                            add()
                          }
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Raw Materials
                        </Button>
                      </AntdForm.Item>
                    </>
                  )}
                </AntdForm.List>
              </section>

              {/* 12. declarations_by_seller_of_certified_products */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  The Certified Products Covered In This Certificate Have Been
                  Outsourced To A Subcontractor{' '}
                </h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='The Certified Products Covered In This Certificate Have Been Outsourced To A Subcontractor'
                      name='the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor'
                      placeholder='Enter The Certified Products Covered In This Certificate Have Been Outsourced To A Subcontractor'
                      component={Input}
                    />
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

export default ImportPdfTCtype1
