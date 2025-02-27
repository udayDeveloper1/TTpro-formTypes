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
  createScopeCertificateScType2,
  extractPdfSCType2,
  form3submit,
  formFill3
} from '../../api/Form1Api'
import moment from 'moment'
import dayjs from 'dayjs'
import Spinner from '../../layout/Spinner'
import { Slidebar } from '../../layout/Slidebar'
import { toast } from 'react-toastify'
import { debounce, keys } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { formatDateToDDMMYYYY, links } from '../../utils/utils'
import CustomFormItem from '../../layout/CustomFormItem'

const ImportPdfScopeVerification = () => {
  const [form] = AntdForm.useForm()
  const [form2] = AntdForm.useForm()
  const [formNo, setFormNo] = useState('1')
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [emptyFields, setEmptyFields] = useState({})

  const navigate = useNavigate()

  const handleResponse = response => {
    const { extracted_data } = response
    console.log('response', response)

    if (extracted_data) {
      const certified_organization_address =
        extracted_data?.scope_certificate?.certified_organization_address?.map(
          address => ({ certified_organization_: address })
        ) || ['']

      const facility_address =
        extracted_data?.site_appendix?.address_details?.facility_address?.map(
          address => ({ facility_add: address })
        ) || [{ facility_add: "" }]
      const process_categories =
        extracted_data?.site_appendix?.process_categories?.map(category => ({
          process_cat: category
        })) || [{ process_cat: "" }]
      const standards =
        extracted_data?.site_appendix?.standards?.map(standard => ({
          standards_: standard
        })) || [{ standards_: "" }]
      console.log(standards);

      const farm_capacity =
        extracted_data?.site_appendix?.farm_capacity?.map(standard => ({
          farm_capacity_: standard
        })) || [{ farm_capacity_: "" }]
      console.log(farm_capacity);

      // console.log('facility_address', facility_address, 'process_categories', process_categories, 'standards ', standards, 'farm_capacity', farm_capacity);

      const associate_subcontractor_appendix = () => {
        const result = extracted_data?.associate_subcontractor_appendix?.map(
          item => ({
            associate_subcontractor_name: item?.subcontractor_name,
            ['subcontractor_te-id_or_number']: item?.['te-id_or_number'],
            // address_details: {
            subcontractor_address:
              item?.address_details?.subcontractor_address?.map(address => ({
                subcontractor_address_: address
              })) || [''],
            subcontractor_town: item?.address_details?.subcontractor_town || '',
            subcontractor_postcode:
              item?.address_details?.subcontractor_postcode || '',
            subcontractor_state_or_province:
              item?.address_details?.subcontractor_state_or_province || '',
            subcontractor_country_or_area:
              item?.address_details?.subcontractor_country_or_area || '',
            // },
            subcontractor_process_categories: item?.process_categories?.map(
              address => ({ subcontractor_process_categories_: address })
            ) || [''], // extractValues(item.subcontractor_process_categories, "subcontractor_process_categories_"),
            subcontractor_standards: item?.standards?.map(address => ({
              subcontractor_standards_: address
            })) || [''] // extractValues(item.subcontractor_standards, "subcontractor_standards_")
          })
        )

        return result?.length > 0
          ? result
          : [
            {
              associate_subcontractor_name: '',
              ['subcontractor_te-id_or_number']: '',
              // address_details: {
              subcontractor_address: [''],
              subcontractor_town: '',
              subcontractor_postcode: '',
              subcontractor_state_or_province: '',
              subcontractor_country_or_area: '',
              // },
              subcontractor_process_categories: [''],
              subcontractor_standards: ['']
            }
          ]
      }

      const independently_certified_subcontractor_appendix = () => {
        const result =
          extracted_data?.independently_certified_subcontractor_appendix?.map(
            item => ({
              subcontractor_name: item.subcontractor_name,
              certification_body: item.certification_body,
              expiry_date:
                item.expiry_date === ''
                  ? null
                  : dayjs(item.expiry_date, 'DD/MM/YYYY'), // formatDateToDDMMYYYY(item.expiry_date),
              ['apendix-te-id_or_number']: item?.['te-id_or_number'],
              // address_details: {
              appendix_address: item?.address_details?.address?.map(
                address => ({ appendix_address_: address })
              ) || [''], // extractValues(item.appendix_address, "appendix_address_"),
              appendix_town: item?.address_details?.town || '',
              appendix_postcode: item?.address_details?.postcode || '',
              appendix_state_or_province:
                item?.address_details?.state_or_province || '',
              appendix_country_or_area:
                item?.address_details?.country_or_area || '',
              // },
              appendix_process_categories: item?.process_categories?.map(
                category => ({ appendix_process_categories_: category })
              ) || [''], // extractValues(item.appendix_process_categories, "appendix_process_categories_"),
              appendix_standards: item?.process_categories?.map(category => ({
                appendix_standards_: category
              })) || [''] //extractValues(item.appendix_standards, "appendix_standards_")
            })
          )
        return result?.length > 0
          ? result
          : [
            {
              subcontractor_name: '',
              ['apendix-te-id_or_number']: '',
              certification_body: '',
              expiry_date: '',
              appendix_address: [''],
              appendix_town: '',
              appendix_postcode: '',
              appendix_state_or_province: '',
              appendix_country_or_area: '',
              appendix_process_categories: [''],
              appendix_standards: ['']
            }
          ]
      }

      form2.setFieldsValue({
        file_name:
          extracted_data?.scope_certificate?.file_name ||
          extracted_data?.scope_certificate?.certificate_body_name,
        headername: extracted_data?.letterhead?.name,
        headAddress: extracted_data?.letterhead?.address?.map(address => ({
          headAddress_: address
        })) || [{ headAddress_: '' }],
        // ------------------------- extracted_data -------------------------------

        // -----------------------------------   scope_certificate  -----------------------------
        scope_certificate_number:
          extracted_data?.scope_certificate?.scope_certificate_number,
        scope_certificate_version:
          extracted_data?.scope_certificate?.scope_certificate_version,
        certificate_body_name:
          extracted_data?.scope_certificate?.certificate_body_name,
        certfied_organization_name:
          extracted_data?.scope_certificate?.certfied_organization_name,
        certfied_organization_name_native:
          extracted_data?.scope_certificate?.certfied_organization_name_native,
        ['textile_exchange_id(te_id)']:
          extracted_data?.scope_certificate?.['textile_exchange_id(te_id)'],
        certified_organization_license_number:
          extracted_data?.scope_certificate
            ?.certified_organization_license_number,
        certified_organization_address: certified_organization_address,
        certified_organization_state_or_province:
          extracted_data?.scope_certificate
            ?.certified_organization_state_or_province,
        certified_organization_country_or_area:
          extracted_data?.scope_certificate
            ?.certified_organization_country_or_area,
        sc_standard_program:
          extracted_data?.scope_certificate?.sc_standard_program,
        sc_standard_version:
          extracted_data?.scope_certificate?.sc_standard_version,
        product_category: extracted_data?.scope_certificate?.product_category,
        process_category: extracted_data?.scope_certificate?.process_category,
        sc_valid_untill:
          extracted_data?.scope_certificate?.sc_valid_untill === ''
            ? null
            : dayjs(
              extracted_data?.scope_certificate?.sc_valid_untill,
              'DD/MM/YYYY'
            ),
        certificate_body_licensed_by:
          extracted_data?.scope_certificate?.certificate_body_licensed_by,
        certificate_body_accredited_by:
          extracted_data?.scope_certificate?.certificate_body_accredited_by,
        inspection_body: extracted_data?.scope_certificate?.inspection_body,
        auditors: extracted_data?.scope_certificate?.auditors,
        products_appendix: extracted_data?.products_appendix,

        brand_names_may_be_certified_under_this_sc:
          extracted_data?.info_above_site_index
            ?.brand_names_may_be_certified_under_this_sc,
        number_of_farms_certified_under_this_sc:
          extracted_data?.info_above_site_index
            ?.number_of_farms_certified_under_this_sc,
        number_of_farms_areas_certified_under_this_sc:
          extracted_data?.info_above_site_index
            ?.number_of_farms_areas_certified_under_this_sc,
        facility_name: extracted_data?.site_appendix?.facility_name,
        ['site-te-id_or_number']:
          extracted_data?.site_appendix?.['te-id_or_number'],
        facility_town:
          extracted_data?.site_appendix?.address_details?.facility_town,
        facility_postcode:
          extracted_data?.site_appendix?.address_details?.facility_postcode,
        facility_state_or_province:
          extracted_data?.site_appendix?.address_details
            ?.facility_state_or_province,
        facility_country_or_area:
          extracted_data?.site_appendix?.address_details
            ?.facility_country_or_area,
        facility_address: facility_address,
        process_categories: process_categories,
        standards: standards?.length > 0 ? standards : [],
        farm_capacity: farm_capacity?.length > 0 ? farm_capacity : [],
        associate_subcontractor_appendix: associate_subcontractor_appendix(),
        independently_certified_subcontractor_appendix:
          independently_certified_subcontractor_appendix(),
        place_of_issue: extracted_data?.footer?.place_of_issue,
        date_of_issue:
          extracted_data?.footer?.date_of_issue === ''
            ? null
            : dayjs(extracted_data?.footer?.date_of_issue, 'DD/MM/YYYY'),
        last_updated:
          extracted_data?.footer?.last_updated === ''
            ? null
            : dayjs(extracted_data?.footer?.last_updated, 'DD/MM/YYYY'),
        extended_untill:
          extracted_data?.footer?.extended_untill === ''
            ? null
            : dayjs(extracted_data?.footer?.extended_untill, 'DD/MM/YYYY'),
        status: extracted_data?.footer?.status,
        name_of_authorized_signatory:
          extracted_data?.footer?.name_of_authorized_signatory
      })
    } else {
      toast.success('Ectract data not available')
    }
  }

  const handleSubmit = async values => {
    setLoading(true)
    try {
      let fomrData = new FormData()
      fomrData.append('sc-type-1', values.UploadPdf[0].originFileObj)
      let response = await extractPdfSCType2(fomrData)
      if (response?.status_code === 200 || response?.status_code === 201) {
        toast.success('Pdf submitted Successfully.')
        handleResponse(response?.data)
        setFormNo('2')
      } else {
        toast.error('Something went Wrong.')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went Wrong.')
    }
    setLoading(false)
  }

  // const value = form.getFieldValue('sc-type-1')
  // console.log('get value', value);
  
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

    console.log('isPdf' , isPdf);
    
    return isPdf || Upload.LIST_IGNORE
  }

  useEffect(() => {
    form2.setFieldsValue({
      file_name: '',
      // ------------------------- extracted_data -------------------------------

      // -----------------------------------   scope_certificate  -----------------------------
      scope_certificate_number: '',
      headername: '',
      headAddress: [{ headAddress_: '' }],
      scope_certificate_version: '',
      certificate_body_name: '',
      certfied_organization_name: '',
      certfied_organization_name_native: '',
      ['textile_exchange_id(te_id)']: '',
      certified_organization_license_number: '',
      certified_organization_address: [''],
      certified_organization_state_or_province: '',
      certified_organization_country_or_area: '',
      sc_standard_program: '',
      sc_standard_version: '',
      product_category: '',
      process_category: '',
      sc_valid_untill: '',
      certificate_body_licensed_by: '',
      certificate_body_accredited_by: '',
      inspection_body: '',
      auditors: '',
      products_appendix: [
        {
          product_number: '',
          product_category: '',
          product_details: '',
          material_composition: '',
          label_grade: '',
          facility_number: ''
        }
      ],
      brand_names_may_be_certified_under_this_sc: '',
      number_of_farms_certified_under_this_sc: '',
      number_of_farms_areas_certified_under_this_sc: '',
      facility_name: '',
      ['site-te-id_or_number']: '',
      facility_address: [''],
      facility_town: '',
      facility_postcode: '',
      facility_state_or_province: '',
      facility_country_or_area: '',
      process_categories: [''],
      standards: [''],
      farm_capacity: [''],
      associate_subcontractor_appendix: [
        {
          associate_subcontractor_name: '',
          ['subcontractor_te-id_or_number']: '',
          address_details: {
            subcontractor_address: [''],
            subcontractor_town: '',
            subcontractor_postcode: '',
            subcontractor_state_or_province: '',
            subcontractor_country_or_area: ''
          },
          subcontractor_process_categories: [''],
          subcontractor_standards: ['']
        }
      ],
      independently_certified_subcontractor_appendix: [
        {
          subcontractor_name: '',
          ['apendix-te-id_or_number']: '',
          certification_body: '',
          expiry_date: '',
          appendix_address: [''],
          appendix_town: '',
          appendix_postcode: '',
          appendix_state_or_province: '',
          appendix_country_or_area: '',
          appendix_process_categories: [''],
          appendix_standards: ['']
        }
      ],
      place_of_issue: '',
      date_of_issue: '',
      last_updated: '',
      extended_untill: '',
      status: '',
      name_of_authorized_signatory: ''
    })
  }, [form2])

  // Handle form submission with typed values
  const handleSubmitForm2 = async values => {
    setLoading(true)
    const extractValues = (array, key) =>
      array?.map(obj => Object.values(obj)[0]) || ['']

    const certified_organization_address =
      values?.certified_organization_address?.map(
        obj => Object.values(obj)[0]
      ) || ['']
    const facility_address = values?.facility_address?.map(
      obj => Object.values(obj)[0]
    ) || ['']
    const process_categories = values?.process_categories?.map(
      obj => Object.values(obj)[0]
    ) || ['']
    const standards = values?.standards?.map(obj => Object.values(obj)[0]) || [
      ''
    ]
    const farm_capacity = values?.farm_capacity?.map(
      obj => Object.values(obj)[0]
    ) || ['']

    const associate_subcontractor_appendix = async data => {
      return values?.associate_subcontractor_appendix?.map(item => ({
        subcontractor_name: item?.associate_subcontractor_name,
        ['te-id_or_number']: item?.['subcontractor_te-id_or_number'],
        address_details: {
          subcontractor_address: extractValues(
            item.subcontractor_address,
            'subcontractor_address_'
          ),
          subcontractor_town: item?.subcontractor_town,
          subcontractor_postcode: item?.subcontractor_postcode,
          subcontractor_state_or_province:
            item?.subcontractor_state_or_province,
          subcontractor_country_or_area: item?.subcontractor_country_or_area
        },
        process_categories: extractValues(
          item.subcontractor_process_categories,
          'subcontractor_process_categories_'
        ),
        standards: extractValues(
          item.subcontractor_standards,
          'subcontractor_standards_'
        )
      }))
    }

    const independently_certified_subcontractor_appendix = async data => {
      return values?.independently_certified_subcontractor_appendix?.map(
        item => ({
          subcontractor_name: item.subcontractor_name,
          certification_body: item.certification_body,
          expiry_date: formatDateToDDMMYYYY(item.expiry_date),
          ['te-id_or_number']: item?.['apendix-te-id_or_number'],
          address_details: {
            address: extractValues(item.appendix_address, 'appendix_address_'),
            town: item.appendix_town || '',
            postcode: item.appendix_postcode || '',
            state_or_province: item.appendix_state_or_province || '',
            country_or_area: item.appendix_country_or_area || ''
          },
          process_categories: extractValues(
            item.appendix_process_categories,
            'appendix_process_categories_'
          ),
          standards: extractValues(
            item.appendix_standards,
            'appendix_standards_'
          )
        })
      )
    }

    const formattedValues = {
      file_name: values?.file_name || values?.certificate_body_name,
      // ------------------------- extracted_data -------------------------------

      // -----------------------------------   scope_certificate  -----------------------------
      extracted_data: {
        scope_certificate: {
          scope_certificate_number: values?.scope_certificate_number,
          scope_certificate_version: values?.scope_certificate_version,
          certificate_body_name: values?.certificate_body_name,
          certfied_organization_name: values?.certfied_organization_name,
          certfied_organization_name_native:
            values?.certfied_organization_name_native,
          ['textile_exchange_id(te_id)']:
            values?.['textile_exchange_id(te_id)'],
          certified_organization_license_number:
            values?.certified_organization_license_number,
          certified_organization_address: certified_organization_address,
          certified_organization_state_or_province:
            values?.certified_organization_state_or_province,
          certified_organization_country_or_area:
            values?.certified_organization_country_or_area,
          sc_standard_program: values?.sc_standard_program,
          sc_standard_version: values?.sc_standard_version,
          product_category: values?.product_category,
          process_category: values?.process_category,
          sc_valid_untill: formatDateToDDMMYYYY(values?.sc_valid_untill),
          certificate_body_licensed_by: values?.certificate_body_licensed_by,
          certificate_body_accredited_by:
            values?.certificate_body_accredited_by,
          inspection_body: values?.inspection_body,
          auditors: values?.auditors
        },
        products_appendix: values?.products_appendix,
        info_above_site_index: {
          brand_names_may_be_certified_under_this_sc:
            values?.brand_names_may_be_certified_under_this_sc,
          number_of_farms_certified_under_this_sc:
            values?.number_of_farms_certified_under_this_sc,
          number_of_farms_areas_certified_under_this_sc:
            values?.number_of_farms_areas_certified_under_this_sc
        },
        letterhead: {
          name: values?.headername,
          address: extractValues(values.headAddress, 'headAddress_')
        },
        site_appendix: {
          facility_name: values?.facility_name,
          ['te-id_or_number']: values?.['site-te-id_or_number'] || '1234',
          address_details: {
            facility_address: facility_address,
            facility_town: values?.facility_town,
            facility_postcode: values?.facility_postcode,
            facility_state_or_province: values?.facility_state_or_province,
            facility_country_or_area: values?.facility_country_or_area
          },
          process_categories: process_categories,
          standards: standards,
          farm_capacity: farm_capacity
        },
        associate_subcontractor_appendix:
          await associate_subcontractor_appendix(),
        independently_certified_subcontractor_appendix:
          await independently_certified_subcontractor_appendix(), /// array inside array manage the value
        footer: {
          place_of_issue: values?.place_of_issue,
          date_of_issue: formatDateToDDMMYYYY(values?.date_of_issue),
          last_updated: formatDateToDDMMYYYY(values?.last_updated),
          extended_untill: formatDateToDDMMYYYY(values?.extended_untill),
          status: values?.status,
          name_of_authorized_signatory:
            values?.name_of_authorized_signatory || '1234'
        }
      }
    }
    try {
      let response = await createScopeCertificateScType2(formattedValues)
      if (response?.status_code === 200 || response?.status_code === 201) {
        toast.success(response?.message)
        navigate(`${links.scopeVerificationList}`)
      } else {
        toast.error(response?.message)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Something Went Wrong')
    }
  }

  const getFieldClassName = (mainName, name, field, index) => {
    // if (field === 'product_component_label_grade') {
    //   console.log(form2?.getFieldValue(mainName)?.[index])
    // }
    if (form2?.getFieldValue('farm_capacity') === '') {
      return 'empty_field'
    }

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
    } else if (changedValues?.headAddress) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.headAddress)?.forEach(key => {
        const headAddressValue = form?.getFieldValue([
          'headAddress',
          key,
          'headAddress_'
        ])
        updatedEmptyFields[key] = !headAddressValue
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.certified_organization_address) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.certified_organization_address)?.forEach(
        key => {
          const cbAddressValue = form?.getFieldValue([
            'certified_organization_address',
            key,
            'certified_organization_'
          ])
          updatedEmptyFields[key] = !cbAddressValue
        }
      )
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.facility_address) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.facility_address)?.forEach(key => {
        const sellerAddressValue = form?.getFieldValue([
          'facility_address',
          key,
          'facility_add'
        ])
        updatedEmptyFields[key] = !sellerAddressValue
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.process_categories) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.process_categories)?.forEach(key => {
        const buyerAddressValue = form?.getFieldValue([
          'process_categories',
          key,
          'process_cat'
        ])
        updatedEmptyFields[key] = !buyerAddressValue
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.standards) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.standards)?.forEach(key => {
        const certifiedWeight = form?.getFieldValue([
          'standards',
          key,
          'standards_'
        ])
        updatedEmptyFields[key] = !certifiedWeight
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.farm_capacity) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.farm_capacity)?.forEach(key => {
        const certifiedWeight = form?.getFieldValue([
          'farm_capacity',
          key,
          'farm_capacity_'
        ])
        updatedEmptyFields[key] = !certifiedWeight
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.products_appendix) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues?.products_appendix)?.forEach(key => {
          const ProductDetail = changedValues?.products_appendix?.[key]
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
    } else if (changedValues?.associate_subcontractor_appendix) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues.associate_subcontractor_appendix)?.forEach(
          key => {
            const certifiedComponent =
              changedValues?.associate_subcontractor_appendix?.[key]
            if (certifiedComponent) {
              Object?.keys(certifiedComponent)?.forEach(field => {
                const fieldValue = certifiedComponent?.[field]
                const fieldName = `${key}-${field}`
                updatedEmptyFields[fieldName] = !fieldValue
              })
            }
          }
        )

        return updatedEmptyFields
      })
    } else if (changedValues?.certified_raw_material_list) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues.certified_raw_material_list)?.forEach(key => {
          const certifiedRawMaterialList =
            changedValues?.certified_raw_material_list?.[key]
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
    } else if (changedValues?.independently_certified_subcontractor_appendix) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(
          changedValues?.independently_certified_subcontractor_appendix
        )?.forEach(key => {
          const ProductDetail =
            changedValues?.independently_certified_subcontractor_appendix?.[key]
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
    }
  }, 100)

  useEffect(() => {
    // handleValuesChange()
  }, [form2])

  const values = form2.getFieldsValue('standerd');
  console.log('form value', values);


  return formNo === '1' ? (
    <>
      {' '}
      {loading && <Spinner message='Loading...' isActive={loading} />}
      <div className='flex'>
        {' '}
        <div style={{ width: '20%' }}>
          {' '}
          <Slidebar />
        </div>
        <div style={{ width: '80%' }}>
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
              <h2 className=' pb-5 section-title'>
                Upload PDF For Scope Certificate Form
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
          </AntdForm>
        </div>
      </div>
    </>
  ) : (
    <>
      {' '}
      {loading2 && <Spinner message='Loading...' isActive={loading2} />}
      <div className='flex'>
        {' '}
        <div style={{ width: '20%' }}>
          {' '}
          <Slidebar />
        </div>{' '}
        <div style={{ width: '80%' }}>
          <div className='container mx-auto py-10 px-4 md:px-0'>
            {/* <h2 className='text-3xl md:text-4xl font-medium mb-6 text-center'>
                Scope Certificate Form
              </h2> */}

            <AntdForm
              form={form2}
              onFinish={handleSubmitForm2}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout='vertical'
              className='form_1  rounded-xl shadow-xl'
              style={{ maxWidth: 900, margin: '0 auto' }}
              onValuesChange={handleValuesChange}
            >
              <h1 className='text-3xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center '>
                Scope Certificate Form
              </h1>

              {/* Header*/}
              <section className='section mt-10'>
                <h2 className='text-2xl pb-3 section-title'>Header</h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between '>
                    {/* <AntdForm.Item
                      label='Header Name'
                      name='headername'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Header Name' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Header Name'
                      name='headername'
                      placeholder='Enter Header Name'
                      component={Input}
                    />
                    <AntdForm.List name='headAddress'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Head Address'
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
                                    name={[name, 'headAddress_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'headAddress',
                                      name,
                                      'headAddress_',
                                      index
                                    )}
                                    `}
                                  >
                                    <Input placeholder={`Enter Head Address`} />
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
                                Add Head Address
                              </Button>
                            </AntdForm.Item>
                          </AntdForm.Item>
                        </>
                      )}
                    </AntdForm.List>
                  </div>
                </div>
              </section>

              {/* Footer*/}
              <section className='section mt-5'>
                <h2 className='text-2xl pb-3 section-title'>Footer</h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    {/* <AntdForm.Item
                      label='Sc Place of Issue'
                      name='place_of_issue'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Sc Place of Issue' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Sc Place of Issue'
                      name='place_of_issue'
                      placeholder='Enter Sc Place of Issue'
                      component={Input}
                    />

                    {/* <AntdForm.Item
                      label='Sc Status'
                      name='status'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Name Sc Status' />
                    </AntdForm.Item> */}

                    <CustomFormItem
                      label='Sc Status'
                      name='status'
                      placeholder='Enter Name Sc Status'
                      component={Input}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    {/* <AntdForm.Item
                      label='Sc Date Of Issue'
                      name='date_of_issue'
                      className='w-full md:w-[49%]'
                    >
                      <DatePicker
                        className='datePickerIpnut'
                        format='DD/MM/YYYY'
                      />
                    </AntdForm.Item> */}

                    <CustomFormItem
                      label='Sc Date Of Issue'
                      name='date_of_issue'
                      placeholder='Enter Sc Date of Issue'
                      component={DatePicker}
                    />

                    {/* <AntdForm.Item
                      label='Extended untill'
                      name='extended_untill'
                      className='w-full md:w-[49%]'
                    >
                      <DatePicker
                        className='datePickerIpnut'
                        format='DD/MM/YYYY'
                      />
                    </AntdForm.Item> */}

                    <CustomFormItem
                      label='Extended untill'
                      name='extended_untill'
                      placeholder='Enter Extended untill'
                      component={DatePicker}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    {/* <AntdForm.Item
                      label='Sc Last Updated'
                      name='last_updated'
                      className='w-full md:w-[49%]'
                    >
                      <DatePicker
                        className='datePickerIpnut'
                        format='DD/MM/YYYY'
                      />
                    </AntdForm.Item> */}

                    <CustomFormItem
                      label='Sc Last Updated'
                      name='last_updated'
                      placeholder='Enter Last Updated'
                      component={DatePicker}
                    />

                    {/* <AntdForm.Item
                      label='Name Of Authorized Signatory'
                      name='name_of_authorized_signatory'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Name Of Authorized Signatory' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Name Of Authorized Signatory'
                      name='name_of_authorized_signatory'
                      placeholder='Name Of Authorized Signatory'
                      component={Input}
                    />
                  </div>
                </div>
              </section>

              {/* certificate info */}
              <section className='section'>
                <h2 className=' pb-3 section-title'>
                  Scope Certificate Information:
                </h2>
                <div>
                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Scop Certificate Number'
                      name='scope_certificate_number'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Scop Certificate Number' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Scop Certificate Number'
                      name='scope_certificate_number'
                      placeholder='Scop Certificate Number'
                      component={Input}
                    />
                    {/* <AntdForm.Item
                      label='Scop Certificate Version'
                      name='scope_certificate_version'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Scop Certificate Version' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Scop Certificate Version'
                      name='scope_certificate_version'
                      placeholder='Scop Certificate Version'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Certificate Body Name'
                      name='certificate_body_name'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Certificate Body Name' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Certificate Body Name'
                      name='certificate_body_name'
                      placeholder='Certificate Body Name'
                      component={Input}
                    />

                    {/* <AntdForm.Item
                      label='Certfied Organization Name'
                      name='certfied_organization_name'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Certfied Organization Name' />
                    </AntdForm.Item> */}

                    <CustomFormItem
                      label='Certfied Organization Name'
                      name='certfied_organization_name'
                      placeholder='Certfied Organization Name'
                      component={Input}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Certfied Organization Name Native'
                      name='certfied_organization_name_native'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Certfied Organization Name Native' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Certfied Organization Name Native'
                      name='certfied_organization_name_native'
                      placeholder='Enter Certfied Organization Name Native'
                      component={Input}
                    />
                    {/* <AntdForm.Item
                      label='Certified Organization License Number'
                      name='certified_organization_license_number'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Certified Organization License Number' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Certified Organization License Number'
                      name='certified_organization_license_number'
                      placeholder='Enter Certfied Organization Name Native'
                      component={Input}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Certfied Organization State Or Province'
                      name='certified_organization_state_or_province'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Certfied Organization State Or Province' />
                    </AntdForm.Item> */}

                    <CustomFormItem
                      label='Certfied Organization State Or Province'
                      name='certified_organization_state_or_province'
                      placeholder='Certfied Organization State Or Province'
                      component={Input}
                    />
                    {/* <AntdForm.Item
                      label='Certified Organization Country Or Area'
                      name='certified_organization_country_or_area'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Certified Organization License Number' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Certified Organization Country Or Area'
                      name='certified_organization_country_or_area'
                      placeholder='Enter Certified Organization License Number'
                      component={Input}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Sc Standard Program'
                      name='sc_standard_program'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Sc Standard Program' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Sc Standard Program'
                      name='sc_standard_program'
                      placeholder='Enter Sc Standard Program'
                      component={Input}
                    />
                    {/* <AntdForm.Item
                      label='Sc Standard Version'
                      name='sc_standard_version'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Sc Standard Version' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Sc Standard Version'
                      name='sc_standard_version'
                      placeholder='Enter Sc Standard Version'
                      component={Input}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Product Category'
                      name='product_category'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Product Category' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Product Category'
                      name='product_category'
                      placeholder='Enter Product Category'
                      component={Input}
                    />
                    {/* <AntdForm.Item
                      label='Process Category'
                      name='process_category'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Process Category' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Process Category'
                      name='process_category'
                      placeholder='Enter Process Category'
                      component={Input}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Sc Valid Untill'
                      name='sc_valid_untill'
                      className='w-full md:w-[49%]'
                    >
                      <DatePicker
                        className='datePickerIpnut'
                        format='DD/MM/YYYY'
                      />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Sc Valid Untill'
                      name='sc_valid_untill'
                      placeholder='Enter Valid Untill'
                      component={DatePicker}
                    />
                    {/* <AntdForm.Item
                      label='Certificate Body Licensed By'
                      name='certificate_body_licensed_by'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Certificate Body Licensed By' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Certificate Body Licensed By'
                      name='certificate_body_licensed_by'
                      placeholder='Enter Certificate Body Licensed By'
                      component={Input}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Certificate Body Accredited By'
                      name='certificate_body_accredited_by'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Certificate Body Accredited By' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Certificate Body Accredited By'
                      name='certificate_body_accredited_by'
                      placeholder='Enter Certificate Body Accredited By'
                      component={Input}
                    />
                    {/* <AntdForm.Item
                      label='Inspection Body'
                      name='inspection_body'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Inspection Body' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Inspection Body'
                      name='inspection_body'
                      placeholder='Enter Inspection Body'
                      component={Input}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Auditors'
                      name='auditors'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Auditors' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Auditors'
                      name='auditors'
                      placeholder='Enter Auditors'
                      component={Input}
                    />
                    {/* <AntdForm.Item
                      label='Textile Exchange id'
                      name='textile_exchange_id(te_id)'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Textile Exchange id' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Textile Exchange id'
                      name='textile_exchange_id(te_id)'
                      placeholder='Enter Textile Exchange id'
                      component={Input}
                    />
                  </div>

                  {/* ------------------------------- address ---------------------------------------- */}

                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.List name='certified_organization_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Certificate Address'
                            // required
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
                                    name={[name, 'certified_organization_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'certified_organization_address',
                                      name,
                                      'certified_organization_',
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

              {/* products appendix */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Products Appendix
                </h2>
                <AntdForm.List name='products_appendix'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Product Number :'
                              name={[name, 'product_number']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'products_appendix',
                                name,
                                'product_number',
                                index
                              )}`}
                            >
                              <Input placeholder='Product Number.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Product Category :'
                              name={[name, 'product_category']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'products_appendix',
                                name,
                                'product_category',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Order No.' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Product Details:'
                              name={[name, 'product_details']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'products_appendix',
                                name,
                                'product_details',
                                index
                              )}`}
                            >
                              <Input placeholder='Product Details.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Material Composition:'
                              name={[name, 'material_composition']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'products_appendix',
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
                              label='Label Grade'
                              name={[name, 'label_grade']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'products_appendix',
                                name,
                                'label_grade',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Label Grade' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Number'
                              name={[name, 'facility_number']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'products_appendix',
                                name,
                                'facility_number',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Facility Number' />
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

              {/* info_above_site_index */}
              <section className='section mt-5'>
                <h2 className='text-2xl pb-3 section-title'>
                  Info Above Site Index
                </h2>
                <div className=''>
                  {/* Old Ant Design Form Implementation */}
                  {/* 
<AntdForm.Item
  label='Brand Names May Be Certified'
  name='brand_names_may_be_certified_under_this_sc'
  className='w-full md:w-[49%]'
>
  <Input placeholder='Enter Brand Names May Be Certified' />
</AntdForm.Item>

<AntdForm.Item
  label='Number Of Farms Certified'
  name='number_of_farms_certified_under_this_sc'
  className='w-full md:w-[49%]'
>
  <Input placeholder='Enter Number Of Farms Certified' />
</AntdForm.Item>

<AntdForm.Item
  label='Number Of Farms Areas Certified'
  name='number_of_farms_areas_certified_under_this_sc'
  className='w-full md:w-[49%]'
>
  <Input placeholder='Enter Number Of Farms Areas Certified' />
</AntdForm.Item>
*/}

                  {/* New Custom Form Implementation */}
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Brand Names May Be Certified'
                      name='brand_names_may_be_certified_under_this_sc'
                      placeholder='Enter Brand Names May Be Certified'
                      component={Input}
                      className='w-full md:w-[49%]'
                    />

                    <CustomFormItem
                      label='Number Of Farms Certified'
                      name='number_of_farms_certified_under_this_sc'
                      placeholder='Enter Number Of Farms Certified'
                      component={Input}
                    // className="w-full md:w-[49%]"
                    />
                  </div>

                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Number Of Farms Areas Certified'
                      name='number_of_farms_areas_certified_under_this_sc'
                      placeholder='Enter Number Of Farms Areas Certified'
                      component={Input}
                    // className="w-full md:w-[49%]"
                    />
                  </div>
                </div>
              </section>

              {/* site appendix */}
              <section className='section'>
                <h2 className=' pb-3 section-title'>Site Appendix:</h2>
                <div>
                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Facility Name'
                      name='facility_name'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Facility Name' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Facility Name'
                      name='facility_name'
                      placeholder='Enter Facility Name'
                      component={Input}
                    // className="w-full md:w-[49%]"
                    />
                    {/* <AntdForm.Item
                            label='Scop Certificate Version'
                            name='scope_certificate_version'
                            className='w-full md:w-[49%]'
                          >
                            <Input placeholder='Scop Certificate Version' />
                          </AntdForm.Item> */}
                    {/* <AntdForm.Item
                      label='Facility Town'
                      name='facility_town'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Facility Town' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Facility Town'
                      name='facility_town'
                      placeholder='Enter Facility Town'
                      component={Input}
                    // className="w-full md:w-[49%]"
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Facility Postcode'
                      name='facility_postcode'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Facility Postcode' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Facility Postcode'
                      name='facility_postcode'
                      placeholder='Enter Facility Postcode'
                      component={Input}
                    // className="w-full md:w-[49%]"
                    />
                    {/* <AntdForm.Item
                      label='Facility State Or Province'
                      name='facility_state_or_province'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Facility State Or Province' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Facility State Or Province'
                      name='facility_state_or_province'
                      placeholder='Enter Facility State Or Province'
                      component={Input}
                    // className="w-full md:w-[49%]"
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    {/* <AntdForm.Item
                      label='Facility Country Or Area'
                      name='facility_country_or_area'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Facility Country Or Area' />
                    </AntdForm.Item> */}
                    <CustomFormItem
                      label='Facility Country Or Area'
                      name='facility_country_or_area'
                      placeholder='Enter Facility Country Or Area'
                      component={Input}
                    // className="w-full md:w-[49%]"
                    />
                    {/* <AntdForm.Item
                      label='Site-Te Id Or Number'
                      name='site-te-id_or_number'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Site-Te Id Or Number' />
                    </AntdForm.Item> */}
                    {/* <CustomFormItem
                      label='Facility Country Or Area'
                      name='facility_country_or_area'
                      placeholder='Enter Site-Te Id Or Number'
                      component={Input}
                    // className="w-full md:w-[49%]"
                    /> */}
                    {/* ------------------------------- address ---------------------------------------- */}
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.List name='facility_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Facility Address'
                            // required
                            className='w-full md:w-[49%]'
                            initialValue={[{ facility_add: ' ' }]}
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
                                    name={[name, 'facility_add']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'facility_address',
                                      name,
                                      'facility_add',
                                      index
                                    )}`}
                                  >
                                    <Input
                                      placeholder={`Enter Facility Address`}
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
                                Add Facility Address
                              </Button>
                            </AntdForm.Item>
                          </AntdForm.Item>
                        </>
                      )}
                    </AntdForm.List>

                    <AntdForm.List name='process_categories'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Process Categories'
                            // required
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
                                    name={[name, 'process_cat']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'process_categories',
                                      name,
                                      'process_cat',
                                      index
                                    )}`}
                                  // initialValue={[{ process_cat: ' ' }]}
                                  >
                                    <Input
                                      placeholder={`Enter Process Categories`}
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
                                Add Process Categories
                              </Button>
                            </AntdForm.Item>
                          </AntdForm.Item>
                        </>
                      )}
                    </AntdForm.List>
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.List name='standards'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Standards'
                            // required
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
                                    name={[name, 'standards_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'standards',
                                      name,
                                      'standards_',
                                      index
                                    )}`}
                                  >
                                    <Input placeholder={`Enter Standards`} />
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
                                Add Standards
                              </Button>
                            </AntdForm.Item>
                          </AntdForm.Item>
                        </>
                      )}
                    </AntdForm.List>

                    <AntdForm.List name='farm_capacity'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Farm Capacity'
                            // required
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
                                    name={[name, 'farm_capacity_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'farm_capacity',
                                      name,
                                      'farm_capacity_',
                                      index
                                    )}`}
                                  >
                                    <Input placeholder={`Farm Capacity`} />
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
                                Add Farm Capacity
                              </Button>
                            </AntdForm.Item>
                          </AntdForm.Item>
                        </>
                      )}
                    </AntdForm.List>
                  </div>
                </div>
              </section>

              {/* associate_subcontractor_appendix */}

              <section className='section'>
                <h2 className=' pb-3 section-title'>
                  Associate Subcontractor Appendix:
                </h2>
                <AntdForm.List name='associate_subcontractor_appendix'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Associate Subcontractor Name :'
                              name={[name, 'associate_subcontractor_name']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'associate_subcontractor_appendix',
                                name,
                                'associate_subcontractor_name',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Associate Subcontractor Name.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Associate-Te Id Or Number :'
                              name={[name, 'subcontractor_te-id_or_number']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'associate_subcontractor_appendix',
                                name,
                                'subcontractor_te-id_or_number',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Associate-Te Id Or Number ' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Town :'
                              name={[name, 'subcontractor_town']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'associate_subcontractor_appendix',
                                name,
                                'subcontractor_town',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Subcontractor Town' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Postcode :'
                              name={[name, 'subcontractor_postcode']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'associate_subcontractor_appendix',
                                name,
                                'subcontractor_postcode',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Subcontractor Postcode' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor State Or Province :'
                              name={[name, 'subcontractor_state_or_province']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'associate_subcontractor_appendix',
                                name,
                                'subcontractor_state_or_province',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Subcontractor State Or Province' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Country Or Area :'
                              name={[name, 'subcontractor_country_or_area']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'associate_subcontractor_appendix',
                                name,
                                'subcontractor_country_or_area',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Subcontractor Postcode' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
                              {/* <AntdForm.List
                                name={[name, 'subcontractor_address']}
                                initialValue={[{ subcontractor_address_: '' }]}
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
                                              'subcontractor_address_'
                                            ]}
                                            label='Subcontractor Address :'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'independently_certified_subcontractor_appendix',
                                              'subcontractor_address',
                                              'subcontractor_address_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Subcontractor Address' />
                                          </AntdForm.Item>
                                          {subFields.length > 1 && (
                                            <MinusCircleOutlined
                                              onClick={() => removeSub(subName)}
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
                                        Add Subcontractor Address
                                      </Button>
                                    </AntdForm.Item>
                                  </>
                                )}
                              </AntdForm.List> */}

                              <AntdForm.List
                                name={[name, 'subcontractor_address']}
                                initialValue={[{ subcontractor_address_: '' }]}
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
                                              'subcontractor_address_'
                                            ]}
                                            label='Subcontractor Address :'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'associate_subcontractor_appendix',
                                              'subcontractor_address',
                                              'subcontractor_address_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Subcontractor Address' />
                                          </AntdForm.Item>
                                          {subFields.length > 1 && (
                                            <MinusCircleOutlined
                                              onClick={() => removeSub(subName)}
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
                                        Add Subcontractor Address
                                      </Button>
                                    </AntdForm.Item>
                                  </>
                                )}
                              </AntdForm.List>
                            </div>

                            <div className='w-full md:w-[49%]'>


                              <AntdForm.List
                                name={[name, 'subcontractor_process_categories']}
                                initialValue={[
                                  { subcontractor_process_categories_: '' }
                                ]}
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
                                              'subcontractor_process_categories_'
                                            ]}
                                            label='subcontractor Process Categories :'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'associate_subcontractor_appendix',
                                              'subcontractor_process_categories',
                                              'subcontractor_process_categories_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter subcontractor Process Categories' />
                                          </AntdForm.Item>
                                          {subFields.length > 1 && (
                                            <MinusCircleOutlined
                                              onClick={() => removeSub(subName)}
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
                                        Add Subcontractor Process Categories
                                      </Button>
                                    </AntdForm.Item>
                                  </>
                                )}
                              </AntdForm.List>
                            </div>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
                              <AntdForm.List
                                name={[name, 'subcontractor_standards']}
                                initialValue={[
                                  { subcontractor_standards_: '' }
                                ]}
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
                                              'subcontractor_standards_'
                                            ]}
                                            label='Subcontractor Standards :'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'associate_subcontractor_appendix',
                                              'subcontractor_standards',
                                              'subcontractor_standards_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Subcontractor Standards' />
                                          </AntdForm.Item>
                                          {subFields.length > 1 && (
                                            <MinusCircleOutlined
                                              onClick={() => removeSub(subName)}
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
                                        Add Subcontractor Standards
                                      </Button>
                                    </AntdForm.Item>
                                  </>
                                )}
                              </AntdForm.List>
                            </div>
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
                          Add Associate Subcontractor Appendix
                        </Button>
                      </AntdForm.Item>
                    </>
                  )}
                </AntdForm.List>
              </section>

              {/* Independently Certified Subcontractor Appendix */}
              <section className='section'>
                <h2 className=' pb-3 section-title'>
                  Independently Certified Subcontractor Appendix :
                </h2>
                <AntdForm.List name='independently_certified_subcontractor_appendix'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Name :'
                              name={[name, 'subcontractor_name']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'subcontractor_name',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Subcontractor Name.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Apendix-Te Id Or Number :'
                              name={[name, 'apendix-te-id_or_number']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'apendix-te-id_or_number',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Apendix-Te Id Or Number ' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Certification Body :'
                              name={[name, 'certification_body']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'certification_body',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Certification Body' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              label='Expiry Date'
                              name={[name, 'expiry_date']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'expiry_date',
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
                              label='Appendix Town :'
                              name={[name, 'appendix_town']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'appendix_town',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Appendix Town' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              {...restField}
                              label='Appendix Postcode :'
                              name={[name, 'appendix_postcode']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'appendix_postcode',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Appendix Postcode' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Appendix State Or Province :'
                              name={[name, 'appendix_state_or_province']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'appendix_state_or_province',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Appendix State Or Province' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              {...restField}
                              label='Appendix Country Or Area :'
                              name={[name, 'appendix_country_or_area']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'appendix_country_or_area',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Appendix Postcode' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
                              <AntdForm.List
                                name={[name, 'appendix_address']}
                                initialValue={[{ appendix_address_: '' }]}
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
                                              'appendix_address_'
                                            ]}
                                            label='Appendix Address :'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'independently_certified_subcontractor_appendix',
                                              'appendix_address',
                                              'appendix_address_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Appendix Address' />
                                          </AntdForm.Item>
                                          {subFields.length > 1 && (
                                            <MinusCircleOutlined
                                              onClick={() => removeSub(subName)}
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
                                        Add Appendix Address
                                      </Button>
                                    </AntdForm.Item>
                                  </>
                                )}
                              </AntdForm.List>
                            </div>

                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
                              <AntdForm.List
                                name={[name, 'appendix_process_categories']}
                                initialValue={[
                                  { appendix_process_categories_: '' }
                                ]}
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
                                              'appendix_process_categories_'
                                            ]}
                                            label='Appendix Process Categories :'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'independently_certified_subcontractor_appendix',
                                              'appendix_process_categories',
                                              'appendix_process_categories_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Appendix Process Categories' />
                                          </AntdForm.Item>
                                          {subFields.length > 1 && (
                                            <MinusCircleOutlined
                                              onClick={() => removeSub(subName)}
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
                                        Add Appendix Process Categories
                                      </Button>
                                    </AntdForm.Item>
                                  </>
                                )}
                              </AntdForm.List>
                            </div>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
                              <AntdForm.List
                                name={[name, 'appendix_standards']}
                                initialValue={[{ appendix_standards_: '' }]}
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
                                              'appendix_standards_'
                                            ]}
                                            label='Appendix Standards :'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'independently_certified_subcontractor_appendix',
                                              'appendix_standards',
                                              'appendix_standards_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Appendix Standards' />
                                          </AntdForm.Item>
                                          {subFields.length > 1 && (
                                            <MinusCircleOutlined
                                              onClick={() => removeSub(subName)}
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
                                        Add Appendix Standards
                                      </Button>
                                    </AntdForm.Item>
                                  </>
                                )}
                              </AntdForm.List>
                            </div>
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
                          Add Independently Certified Subcontractor Appendix
                        </Button>
                      </AntdForm.Item>
                    </>
                  )}
                </AntdForm.List>
              </section>

              {/* ----------------------------------------------- below old code --------------------------------------- */}

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

export default ImportPdfScopeVerification
