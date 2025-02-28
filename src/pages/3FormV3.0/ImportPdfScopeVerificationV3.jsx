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
import { createForm3ScopeCertificateV3_0, createScopeCertificateScType2, extractPdfSCType2, extractPdfV3_0, form3submit, formFill3 } from '../../api/Form1Api'
import moment from 'moment'
import dayjs from 'dayjs'
import Spinner from '../../layout/Spinner'
import { Slidebar } from '../../layout/Slidebar'
import { toast } from 'react-toastify'
import { debounce, keys } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { formatDateToDDMMYYYY, links } from '../../utils/utils'
import CustomFormItem from '../../layout/CustomFormItem'

const ImportPdfScopeVerificationV3 = () => {
  const [form] = AntdForm.useForm()
  const [form2] = AntdForm.useForm()
  const [formNo, setFormNo] = useState('1')
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [emptyFields, setEmptyFields] = useState({})

  const navigate = useNavigate()

  const [defaultdata, setDefaultData] = useState({
    id: "3d4b7724-2b6c-4d5e-a759-56b8392f317f",
    file_name: "123.pdf",
    extracted_data: {
      scope_certificate: {
        scope_certificate_number: "xxxxxx",
        scope_certificate_version: "GOTS Version X.X",
        certificate_body_name: "Certification_body_name",
        certified_company_name: "Name_of_Certified_Company",
        certified_company_license_number: "License Number xxxxxxx",
        certified_company_address: [
          "Certified Company_address_line1",
          "Certified Company_address_line2",
          "Certified Company_address_line3"
        ],
        certified_company_town: "Town",
        certified_company_postcode: "Postcode",
        certified_company_state_or_province: "State/province",
        certified_company_country_or_area: "Country/area",
        sc_standard_program: "Global Organic Textile Standard (GOTS)",
        sc_standard_version: "X.X",
        product_category: "Product_Category1 (PC0000); Product_Category2 (PC0000); Product_Category3 (PC0000); Product_Category4 (PC0000); Product_Category5 (PC0000)",
        process_category: "Process_Category1* (PR0000); Process_Category2* (PR0000); Process_Category3 (PR0000); Process_Category4 (PR0000); Process_Category5* (PR0000)",
        sc_valid_until: "21-07-2001",
        certificate_body_accredited_by: "Accredited by Name_of_Accreditation_Body, Accreditation Number: xxxxxxx",
        inspection_body: "inspection_body",
        auditors: "auditors"
      },
      products_appendix: [
        {
          product_number: "12345",
          product_category: "Product_Category1 (PC0000)",
          product_details: "Product_detail (PD0000)",
          material_composition: "0% Raw_material1 (RM0000) + 0% Label_grade_name",
          label_grade: "Label_grade_name"
        },
      ],
      facility_appendix: [
        {
          facility_name: "Facility_name1 (main)",
          facility_te_id: "123",
          address_details: {
            facility_address: [
              "Facility_address_line1",
              "Facility_address_line2",
              "Facility_address_line3"
            ],
            facility_town: "Town",
            facility_postcode: "Postcode",
            facility_state_or_province: "State/province",
            facility_country_or_area: "Country/area"
          },
          process_categories: [
            "Process_category1 (PR0000); Process_category2 (PR0000); Process_category3 (PR0000)"
          ]
        },
      ],
      non_certified_subcontractor_appendix: [
        {
          subcontractor_name: "Subcontractor _name",
          subcontractor_facility_name: "(Facility Name)",
          address_details: {
            subcontractor_address: [
              "Facility_address_line1",
              "Facility_address_line2",
              "Facility_address_line3"
            ],
            subcontractor_town: "Town",
            subcontractor_postcode: "Postcode",
            subcontractor_state_or_province: "State/province",
            subcontractor_country_or_area: "Country/area"
          },
          process_categories: [
            "Process_category1 (PR0000); Process_category2 (PR0000); Process_category3 (PR0000)"
          ]
        },

      ],
      independently_certified_subcontractor_appendix: [
        {
          subcontractor_name: "Subcontractor_name",
          subcontractor_facility_name: "(Facility Name)",
          license_number: "Subcontractor_license _number",
          expiry_date: "21-07-2001",
          address_details: {
            address: [
              "Facility_address_line1",
              "Facility_address_line2",
              "Facility_address_line3"
            ],
            town: "Town",
            postcode: "Postcode",
            state_or_province: "State/province",
            country_or_area: "Country/area"
          },
          process_categories: [
            "Process_category1 (PR0000); Process_category2 (PR0000); Process_category3 (PR0000)"
          ]
        },
        {
          subcontractor_name: "Subcontractor_name",
          subcontractor_facility_name: "(Facility_name)",
          license_number: "Subcontractor_license _number",
          expiry_date: "21-07-2001",
          address_details: {
            address: [
              "Facility_address_line1",
              "Facility_address_line2",
              "Facility_address_line3"
            ],
            town: "Town",
            postcode: "Postcode",
            state_or_province: "State/province",
            country_or_area: "Country/area"
          },
          process_categories: [
            "Process_category1 (PR0000); Process_category2 (PR0000); Process_category3 (PR0000)"
          ]
        }
      ],
      footer: {
        place_of_issue: "Place",
        date_of_issue: "21-07-2001",
        last_updated: "21-07-2001",
        extended_until: "21-07-2001",
        status: "status",
        name_of_authorized_signatory: "Name of Authorised Signatory"
      }
    },
    created_at: "2025-02-13T06:59:52.693552Z",
    updated_at: "2025-02-13T06:59:52.694951Z"
  }
  )

  const handleResponse = response => {
    const { extracted_data } = response;

    if (extracted_data) {

      const certified_organization_address = extracted_data?.scope_certificate?.certified_company_address?.map((address) => ({ certified_company_address_: address })) || [""];

      const facility_address = extracted_data?.site_appendix?.address_details?.facility_address?.map((address) => ({ facility_add: address })) || [];
      const process_categories = extracted_data?.site_appendix?.process_categories?.map((category) => ({ process_cat: category })) || [];
      const standards = extracted_data?.site_appendix?.standards?.map((standard) => ({ standards_: standard })) || [];
      const farm_capacity = extracted_data?.site_appendix?.farm_capacity?.map((standard) => ({ farm_capacity_: standard })) || [];

      // console.log('facility_address', facility_address, 'process_categories', process_categories, 'standards ', standards, 'farm_capacity', farm_capacity);

      const non_certified_subcontractor_appendix = () => {
        const result = extracted_data?.non_certified_subcontractor_appendix?.map(item => ({
          subcontractor_name: item?.subcontractor_name || "",
          subcontractor_facility_name: item?.subcontractor_facility_name || "",
          subcontractor_address: item?.address_details?.subcontractor_address?.map(address => ({ subcontractor_address_: address })) || [""],
          subcontractor_town: item?.address_details?.subcontractor_town || "",
          subcontractor_postcode: item?.address_details?.subcontractor_postcode || "",
          subcontractor_state_or_province: item?.address_details?.subcontractor_state_or_province || "",
          subcontractor_country_or_area: item?.address_details?.subcontractor_country_or_area || "",
          process_categories: item?.process_categories?.map(address => ({ process_categories_: address })) || [""],
        }));

        return result?.length > 0 ? result : [{
          subcontractor_name: "",
          subcontractor_facility_name: "",
          subcontractor_address: [""],
          subcontractor_town: "",
          subcontractor_postcode: "",
          subcontractor_state_or_province: "",
          subcontractor_country_or_area: "",
          process_categories: [""]
        }];
      };

      const independently_certified_subcontractor_appendix = () => {
        const result = extracted_data?.independently_certified_subcontractor_appendix?.map(item => ({
          subcontractor_name: item?.subcontractor_name || "",
          license_number: item?.license_number || "",
          subcontractor_facility_name: item?.subcontractor_facility_name || "",
          expiry_date: item?.expiry_date === '' ? null : dayjs(item?.expiry_date, 'DD/MM/YYYY'), // Default to null if no date
          independently_address: item?.address_details?.address?.map(address => ({ independently_address_: address })) || [""], // Default to empty array if no address
          independently_town: item?.address_details?.town || "",
          independently_postcode: item?.address_details?.postcode || "",
          independently_state_or_province: item?.address_details?.state_or_province || "",
          independently_country_or_area: item?.address_details?.country_or_area || "",
          appendix_process_categories: item?.process_categories?.map(category => ({ process_categories_: category })) || [""], // Default to empty array if no process categories
        }));

        return result?.length > 0 ? result : [{
          subcontractor_name: "",
          ["apendix-te-id_or_number"]: "",
          certification_body: "",
          expiry_date: null,
          appendix_address: [""],
          appendix_town: "",
          appendix_postcode: "",
          appendix_state_or_province: "",
          appendix_country_or_area: "",
          appendix_process_categories: [""],
          appendix_standards: [""]
        }];
      };

      const facility_appendix = (data) => {
        return extracted_data?.facility_appendix?.map(item => ({
          facility_name: item?.facility_name,
          facility_te_id: item?.facility_te_id,
          // address_details: {
          facility_address: item?.address_details?.facility_address?.map((address) => ({ facility_address_: address })) || [""],
          facility_town: item?.address_details?.facility_town,
          facility_postcode: item?.address_details?.facility_postcode,
          facility_state_or_province: item?.address_details?.facility_state_or_province,
          facility_country_or_area: item?.address_details?.facility_country_or_area,
          // },
          facility_address: item?.address_details?.facility_address?.map((address) => ({ facility_address_: address })) || [""],

          // process_categories: extractValues(item.process_categories, "process_categories_")
        }));
      };

      form2.setFieldsValue({

        file_name: extracted_data?.scope_certificate?.file_name || extracted_data?.scope_certificate?.certificate_body_name,

        // ------------------------- extracted_data --------------------------------------------

        // -----------------------------------   scope_certificate  -----------------------------

        certified_company_name: extracted_data?.scope_certificate?.scope_certificate_number,
        scope_certificate_number: extracted_data?.scope_certificate?.scope_certificate_number,
        scope_certificate_version: extracted_data?.scope_certificate?.scope_certificate_version,
        certificate_body_name: extracted_data?.scope_certificate?.certificate_body_name,
        certfied_organization_name: extracted_data?.scope_certificate?.certfied_organization_name,
        certified_company_license_number: extracted_data?.scope_certificate?.certified_company_license_number,
        auditors: extracted_data?.scope_certificate?.auditors,
        certified_company_country_or_area: extracted_data?.scope_certificate?.certified_company_country_or_area,
        certified_company_postcode: extracted_data?.scope_certificate?.certified_company_postcode,
        certified_company_state_or_province: extracted_data?.scope_certificate?.certified_company_state_or_province,
        certified_company_town: extracted_data?.scope_certificate?.certified_company_town,
        certified_company_address: certified_organization_address,
        products_appendix: extracted_data?.products_appendix,
        facility_appendix: facility_appendix(),
        non_certified_subcontractor_appendix: non_certified_subcontractor_appendix(),
        independently_certified_subcontractor_appendix: independently_certified_subcontractor_appendix(),
        place_of_issue: extracted_data?.footer?.place_of_issue,
        date_of_issue: extracted_data?.footer?.date_of_issue === '' ? null : dayjs(extracted_data?.footer?.date_of_issue, 'DD/MM/YYYY'),
        last_updated: extracted_data?.footer?.last_updated === '' ? null : dayjs(extracted_data?.footer?.last_updated, 'DD/MM/YYYY'),
        extended_untill: extracted_data?.footer?.extended_until === '' ? null : dayjs(extracted_data?.footer?.extended_until, 'DD/MM/YYYY'),
        status: extracted_data?.footer?.status,
        name_of_authorized_signatory: extracted_data?.footer?.name_of_authorized_signatory,

        // ["textile_exchange_id(te_id)"]: extracted_data?.scope_certificate?.["textile_exchange_id(te_id)"],
        certified_organization_license_number: extracted_data?.scope_certificate?.certified_organization_license_number,
        certified_organization_state_or_province: extracted_data?.scope_certificate?.certified_organization_state_or_province,
        sc_standard_program: extracted_data?.scope_certificate?.sc_standard_program,
        sc_standard_version: extracted_data?.scope_certificate?.sc_standard_version,
        product_category: extracted_data?.scope_certificate?.product_category,
        process_category: extracted_data?.scope_certificate?.process_category,
        // sc_valid_untill: extracted_data?.scope_certificate?.sc_valid_until === '' ? null : dayjs(extracted_data?.scope_certificate?.sc_valid_until, 'DD/MM/YYYY'),
        se_valid_untill: extracted_data?.scope_certificate?.sc_valid_until && dayjs(extracted_data?.scope_certificate?.sc_valid_until, 'DD/MM/YYYY', true).isValid()
          ? dayjs(extracted_data?.scope_certificate?.sc_valid_until, 'DD/MM/YYYY')
          : null,
        certificate_body_licensed_by: extracted_data?.scope_certificate?.certificate_body_licensed_by,
        certificate_body_accredited_by: extracted_data?.scope_certificate?.certificate_body_accredited_by,
        inspection_body: extracted_data?.scope_certificate?.inspection_body,

        brand_names_may_be_certified_under_this_sc: extracted_data?.info_above_site_index?.brand_names_may_be_certified_under_this_sc,
        number_of_farms_certified_under_this_sc: extracted_data?.info_above_site_index?.number_of_farms_certified_under_this_sc,
        number_of_farms_areas_certified_under_this_sc: extracted_data?.info_above_site_index?.number_of_farms_areas_certified_under_this_sc,
        facility_name: extracted_data?.site_appendix?.facility_name,
        // ["site-te-id_or_number"]: extracted_data?.site_appendix?.["te-id_or_number"],
        facility_town: extracted_data?.site_appendix?.address_details?.facility_town,
        facility_postcode: extracted_data?.site_appendix?.address_details?.facility_postcode,
        facility_state_or_province: extracted_data?.site_appendix?.address_details?.facility_state_or_province,
        facility_country_or_area: extracted_data?.site_appendix?.address_details?.facility_country_or_area,
        facility_address: facility_address,
        process_categories: process_categories,
        standards: standards?.length > 0 ? standards : [""],
        farm_capacity: farm_capacity?.length > 0 ? farm_capacity : [""]
      })
    } else {

      toast.success('Extract data not available');
    }
  }

  const handleSubmit = async values => {
    setLoading(true)
    try {
      let fomrData = new FormData()
      fomrData.append('pdf', values.UploadPdf[0].originFileObj)
      let response = await extractPdfV3_0(fomrData)
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
      file_name: '',

      // -----------------------------------   scope_certificate  -----------------------------
      certified_company_name: '',
      certificate_body_name: '',
      scope_certificate_number: '',
      scope_certificate_version: '',
      certified_company_license_number: '',
      sc_standard_program: "",
      sc_standard_version: "",
      product_category: "",
      process_category: "",
      sc_valid_untill: "",
      certificate_body_accredited_by: "",
      inspection_body: "",
      auditors: "",
      certified_company_town: "",
      certified_company_postcode: "",
      certified_company_state_or_province: "",
      certified_company_country_or_area: "",
      certified_company_address: [""],

      // -----------------------------------   products_appendix  -----------------------------

      products_appendix: [
        {
          product_number: "",
          product_category: "",
          product_details: "",
          material_composition: "",
          label_grade: "",
        }
      ],

      // -----------------------------------   facility_appendix  -----------------------------

      facility_appendix: [
        {
          facility_name: "",
          facility_te_id: "",
          facility_town: "",
          facility_postcode: "",
          facility_state_or_province: "",
          facility_country_or_area: "",
          facility_address: [""],
          process_categories: [""],
        }
      ],

      // -----------------------------------   non_certified_subcontractor_appendix  -----------------------------

      non_certified_subcontractor_appendix: [{
        subcontractor_name: "",
        subcontractor_facility_name: "",
        subcontractor_town: "",
        subcontractor_postcode: "",
        subcontractor_state_or_province: "",
        subcontractor_country_or_area: "",
        subcontractor_address: [""],
        process_categories: [""]
      }],

      // -----------------------------------   independently_certified_subcontractor_appendix  -----------------------------

      independently_certified_subcontractor_appendix: [{
        subcontractor_name: "",
        subcontractor_facility_name: "",
        license_number: "",
        expiry_date: "",
        independently_town: "",
        independently_postcode: "",
        independently_state_or_province: "",
        independently_country_or_area: "",
        independently_address: [""],
        independently_process_categories: [""],
      }],

      // -----------------------------------  footer  -----------------------------

      place_of_issue: "",
      date_of_issue: "",
      last_updated: "",
      extended_untill: "",
      status: "",
      name_of_authorized_signatory: "",

    })
  }, [form2])


  const handleSubmitForm2 = async values => {
    setLoading(true)
    const extractValues = (array, key) => array?.map(obj => Object.values(obj)[0]) || [];
    const certified_organization_address = values?.certified_company_address?.map(obj => Object.values(obj)[0]) || [];

     const facility_appendix = (data) => {
          return values?.facility_appendix?.map(item => ({
            facility_name: item?.facility_name,
            facility_te_id: item?.facility_te_id,
            address_details: {
              facility_address: extractValues(item.facility_address, "facility_address_"),
              facility_town: item?.facility_town,
              facility_postcode: item?.facility_postcode,
              facility_state_or_province: item?.facility_state_or_province,
              facility_country_or_area: item?.facility_country_or_area
            },
            process_categories: extractValues(item.process_categories, "process_categories_")
          }));
        };
    
        const non_certified_subcontractor_appendix = (data) => {
          return data?.map(item => ({
            subcontractor_name: item?.subcontractor_name,
            subcontractor_facility_name: item?.subcontractor_facility_name,
            address_details: {
              subcontractor_address: extractValues(item.subcontractor_address, "subcontractor_address_"),
              subcontractor_town: item?.subcontractor_town,
              subcontractor_postcode: item?.subcontractor_postcode,
              subcontractor_state_or_province: item?.subcontractor_state_or_province,
              subcontractor_country_or_area: item?.subcontractor_country_or_area
            },
            process_categories: extractValues(item.process_categories, "process_categories_")
          }));
        };
    
        const independently_certified_subcontractor_appendix = (data) => {
          return values?.independently_certified_subcontractor_appendix?.map(item => ({
            subcontractor_name: item?.subcontractor_name,
            subcontractor_facility_name: item?.subcontractor_facility_name,
            license_number: item?.license_number,
            expiry_date: formatDateToDDMMYYYY(item?.expiry_date),
            address_details: {
              address: extractValues(item.independently_address, "independently_address_"),
              town: item?.independently_town,
              postcode: item?.independently_postcode,
              state_or_province: item?.independently_state_or_province,
              country_or_area: item?.independently_country_or_area
            },
            process_categories: extractValues(item.independently_process_categories, "independently_process_categories_")
          }));
        };
    
        const formattedValues = {
          file_name: values?.file_name || values?.certificate_body_name,
          extracted_data: {
            scope_certificate: {
              scope_certificate_number: values?.scope_certificate_number,
              scope_certificate_version: values?.scope_certificate_version,
              certificate_body_name: values?.certificate_body_name,
              certified_company_name: values?.certified_company_name,
              certified_company_license_number: values?.certified_company_license_number,
              certified_company_address: certified_organization_address,
              certified_company_town: values?.certified_company_town,
              certified_company_postcode: values?.certified_company_postcode,
              certified_company_state_or_province: values?.certified_company_state_or_province,
              certified_company_country_or_area: values?.certified_company_country_or_area,
              sc_standard_program: values?.sc_standard_program,
              sc_standard_version: values?.sc_standard_version,
              sc_valid_until: formatDateToDDMMYYYY(values?.sc_valid_untill),
              product_category: values?.product_category,
              process_category: values?.process_category,
              certificate_body_accredited_by: values?.certificate_body_accredited_by,
              inspection_body: values?.inspection_body,
              auditors: values?.auditors
            },
    
            products_appendix: values?.products_appendix,
            facility_appendix: facility_appendix(),
            non_certified_subcontractor_appendix: non_certified_subcontractor_appendix(values?.non_certified_subcontractor_appendix),
            independently_certified_subcontractor_appendix: independently_certified_subcontractor_appendix(),
    
            footer: {
              place_of_issue: values?.place_of_issue,
              date_of_issue: formatDateToDDMMYYYY(values?.date_of_issue),
              last_updated: formatDateToDDMMYYYY(values?.last_updated),
              extended_until: formatDateToDDMMYYYY(values?.extended_untill),
              status: values?.status,
              name_of_authorized_signatory: values?.name_of_authorized_signatory || '1234'
            }
          }
        };


    try {
      let response = await createForm3ScopeCertificateV3_0(formattedValues);
      if (response?.status_code === 200 || response?.status_code === 201) {
        toast.success(response?.message)
        navigate(`${links.handlingTradingScTypeListV3_0}`)

      } else {
        toast.error(response?.message)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("Something Went Wrong")
    }
  }

  const getFieldClassName = (mainName, name, field, index) => {
    // if (field === "product_component_label_grade") {
    //   console.log(field);

    //   console.log(form2?.getFieldValue(mainName)?.[index]);
    // }

    // console.log('form2?.getFieldValue', form2?.getFieldValue('farm_capacity'));

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
    if (changedValues?.certified_company_address) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.certified_organization_address)?.forEach(key => {
        const cbAddressValue = form?.getFieldValue([
          'certified_company_address',
          key,
          'certified_company_address_'
        ])
        updatedEmptyFields[key] = !cbAddressValue
      })
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
    } else if (changedValues?.facility_appendix) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues.facility_appendix)?.forEach(key => {
          const certifiedComponent = changedValues?.facility_appendix?.[key]
          if (certifiedComponent) {
            Object?.keys(certifiedComponent)?.forEach(field => {
              const fieldValue = certifiedComponent?.[field]
              const fieldName = `${key}-${field}`
              updatedEmptyFields[fieldName] = !fieldValue
            })
          }
        })

        return updatedEmptyFields;
      })
    } else if (changedValues?.non_certified_subcontractor_appendix) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues.non_certified_subcontractor_appendix)?.forEach(key => {
          const certifiedRawMaterialList = changedValues?.non_certified_subcontractor_appendix?.[key]
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
        Object.keys(changedValues?.independently_certified_subcontractor_appendix)?.forEach(key => {
          const ProductDetail = changedValues?.independently_certified_subcontractor_appendix?.[key]
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

  // useEffect(() => {
  //   handleResponse(defaultdata)
  // }, [])

   const handleChange = async (info) => {
  
      setLoading(true)
      try {
        let fomrData = new FormData()
        fomrData.append('pdf', info.fileList[0].originFileObj)
        let response = await extractPdfV3_0(fomrData)
        if (response?.status_code === 200 || response?.status_code === 201) {
          toast.success('Pdf submitted Successfully.')
          handleResponse(response?.data)
          setFormNo('2')
        } else {
          toast.error('Something went Wrong.')
        }
      } catch (error) {
        console.log(error)
        // toast.error('Something went Wrong.')
      }
      setLoading(false)
    };
    

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
                Upload PDF For Scope Certificate Form V3_0
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
        </div>
      </div>
    </>
  ) : (
    <>

      {loading2 && <Spinner message='Loading...' isActive={loading2} />}
      <div className='flex'>
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
                Scope Certificate Form Version (3.0)
              </h1>

              {/* Footer*/}
              <section className='section mt-5'>
                <h2 className='text-2xl pb-3 section-title'>Footer</h2>
                <div className=''>

                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Sc Place of Issue'
                      name='place_of_issue'
                      placeholder='Enter Sc Place of Issue'
                      component={Input}
                      isFocus={false}
                    />
                    <CustomFormItem
                      label='Sc Status'
                      name='status'
                      placeholder='Enter Name Sc Status'
                      component={Input}
                      isFocus={false}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Sc Date Of Issue'
                      name='date_of_issue'
                      // placeholder='Enter Tc Date of Issue'
                      component={DatePicker}
                      isFocus={false}
                    />

                    <CustomFormItem
                      label='Extended untill'
                      name='extended_untill'
                      // placeholder='Enter Tc Date of Issue'
                      component={DatePicker}
                      isFocus={false}
                    />

                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>

                    <CustomFormItem
                      label='Sc Last Updated'
                      name='last_updated'
                      // placeholder='Enter Tc Date of Issue'
                      component={DatePicker}
                      isFocus={false}
                    />

                    <CustomFormItem
                      label='Name Of Authorized Signatory'
                      name='name_of_authorized_signatory'
                      placeholder='Name Of Authorized Signatory'
                      component={Input}
                      isFocus={false}
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

                    <CustomFormItem
                      label='Certified Company Name'
                      name='certified_company_name'
                      placeholder='Certified Company Name'
                      component={Input}
                      isFocus={false}
                    />
                    <CustomFormItem
                      label='Certified Body Name'
                      name='certificate_body_name'
                      placeholder='Certified Body Name'
                      component={Input}
                      isFocus={false}
                    />

                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Scope Certificate Number'
                      name='scope_certificate_number'
                      placeholder='Scope Certificate Number'
                      component={Input}
                      isFocus={false}
                    />

                    <CustomFormItem
                      label='Scope Certificate Version'
                      name='scope_certificate_version'
                      placeholder='Scope Certificate Version'
                      component={Input}
                      isFocus={false}
                    />

                  </div>
                  <div className='flex md:justify-between flex-wrap'>

                    <CustomFormItem
                      label='Certified Company License Number'
                      name='certified_company_license_number'
                      placeholder='Certified Company License Number'
                      component={Input}
                      isFocus={false}
                    />

                    <CustomFormItem
                      label='Auditors'
                      name='auditors'
                      placeholder='Auditors'
                      component={Input}
                      isFocus={false}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Certified Company Country or Area'
                      name='certified_company_country_or_area'
                      placeholder='Certified Company Country or Area'
                      component={Input}
                      isFocus={false}
                    />

                    <CustomFormItem
                      label='Sc Standard Program'
                      name='sc_standard_program'
                      placeholder='Sc Standard Program'
                      component={Input}
                      isFocus={false}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Sc Standard Version'
                      name='sc_standard_version'
                      placeholder='Sc Standard Version'
                      component={Input}
                      isFocus={false}
                    />

                    <CustomFormItem
                      label='Product Category'
                      name='product_category'
                      placeholder='Product Category'
                      component={Input}
                      isFocus={false}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Process Category'
                      name='process_category'
                      placeholder='Process Category'
                      component={Input}
                      isFocus={false}
                    />

                    <CustomFormItem
                      label='Sc Valid Untill'
                      name='sc_valid_untill'
                      // placeholder='Sc Valid Untill'
                      component={DatePicker}
                      isFocus={false}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Certificate Body Accredited By'
                      name='certificate_body_accredited_by'
                      placeholder='Certificate Body Accredited By'
                      component={Input}
                      isFocus={false}
                    />
                    <CustomFormItem
                      label='Inspection Body'
                      name='inspection_body'
                      placeholder='Inspection Body'
                      component={Input}
                      isFocus={false}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Certified Company Postcode'
                      name='certified_company_postcode'
                      placeholder='Certified Company Postcode'
                      component={Input}
                      isFocus={false}
                    />
                    <CustomFormItem
                      label='Certified Company State Or Province'
                      name='certified_company_state_or_province'
                      placeholder='Certified Company State Or Province'
                      component={Input}
                      isFocus={false}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>

                    <CustomFormItem
                      label='Certified Company Town'
                      name='certified_company_town'
                      placeholder='Certified Company Town'
                      component={Input}
                      isFocus={false}
                    />

                    <AntdForm.List name='certified_company_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Certified Company Address'
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
                                    name={[name, 'certified_company_address_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'certified_company_address',
                                      name,
                                      'certified_company_address_',
                                      index
                                    )}`}
                                  >
                                    <Input
                                      placeholder={`Enter Certified Company Address`}
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
                                Add Certified Company Address
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
                            {/* <AntdForm.Item
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
                            </AntdForm.Item> */}
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
                {/* <AntdForm.List name='products_appendix'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Product Number :'
                              name={[name, 'product_number']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Product Number.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Product Category :'
                              name={[name, 'product_category']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Order No.' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Product Details:'
                              name={[name, 'product_details']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Product Details.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Material Composition:'
                              name={[name, 'material_composition']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Material Composition' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Label Grade'
                              name={[name, 'label_grade']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Label Grade' />
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
                </AntdForm.List> */}
              </section>

              {/* facility appendix */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Facility Appendix
                </h2>
                <AntdForm.List name='facility_appendix'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Name :'
                              name={[name, 'facility_name']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'facility_appendix',
                                name,
                                'facility_name',
                                index
                              )}`}
                            >
                              <Input placeholder='Facility Name.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Te ID :'
                              name={[name, 'facility_te_id']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'facility_appendix',
                                name,
                                'facility_te_id',
                                index
                              )}`}
                            >
                              <Input placeholder='Facility Te ID .' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Town:'
                              name={[name, 'facility_town']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'facility_appendix',
                                name,
                                'facility_town',
                                index
                              )}`}
                            >
                              <Input placeholder='Facility Town.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Postcode:'
                              name={[name, 'facility_postcode']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'facility_appendix',
                                name,
                                'facility_postcode',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Facility Postcode' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Facility State Or Province'
                              name={[name, 'facility_state_or_province']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'facility_appendix',
                                name,
                                'facility_state_or_province',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Facility State Or Province' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Country Or Area'
                              name={[name, 'facility_country_or_area']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'facility_appendix',
                                name,
                                'facility_country_or_area',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Facility Country Or Area' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
                              <AntdForm.List
                                name={[name, 'facility_address']}
                                initialValue={[{ facility_address_: '' }]}
                              >
                                {(
                                  subFields,
                                  { add: addSub, remove: removeSub }
                                ) => (
                                  <>
                                    {subFields.map(
                                      ({
                                        key: subKey,
                                        name: subName,
                                        ...restSubField
                                      }, ind) => (
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
                                              'facility_address_'
                                            ]}
                                            label='Facility Address:'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'facility_appendix',
                                              'facility_address',
                                              'facility_address_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Facility Address' />
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
                                        Add Facility Address
                                      </Button>
                                    </AntdForm.Item>
                                  </>
                                )}
                              </AntdForm.List>
                            </div>
                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
                              <AntdForm.List
                                name={[name, 'process_categories']}
                                initialValue={[{ process_categories_: '' }]}
                              >
                                {(
                                  subFields,
                                  { add: addSub, remove: removeSub }
                                ) => (
                                  <>
                                    {subFields.map(
                                      ({
                                        key: subKey,
                                        name: subName,
                                        ...restSubField
                                      }, ind) => (
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
                                              'process_categories_'
                                            ]}
                                            label='Process Categories:'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'facility_appendix',
                                              'process_categories',
                                              'process_categories_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Process Categories' />
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
                                        Add Process Categories
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
                          Add Facility Appendix
                        </Button>
                      </AntdForm.Item>
                    </>
                  )}
                </AntdForm.List>
              </section>

              {/* Non Certified Subcontractor Appendix */}

              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Non Certified Subcontractor Appendix
                </h2>
                <AntdForm.List name='non_certified_subcontractor_appendix'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Name :'
                              name={[name, 'subcontractor_name']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'non_certified_subcontractor_appendix',
                                name,
                                'subcontractor_name',
                                index
                              )}`}
                            >
                              <Input placeholder='Subcontractor Name.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Facility Name :'
                              name={[name, 'subcontractor_facility_name']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'non_certified_subcontractor_appendix',
                                name,
                                'subcontractor_facility_name',
                                index
                              )}`}
                            >
                              <Input placeholder='Subcontractor Facility Name .' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Town:'
                              name={[name, 'subcontractor_town']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'non_certified_subcontractor_appendix',
                                name,
                                'subcontractor_town',
                                index
                              )}`}
                            >
                              <Input placeholder='Subcontractor Town.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Postcode:'
                              name={[name, 'subcontractor_postcode']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'non_certified_subcontractor_appendix',
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
                              label='Subcontractor State Or Province'
                              name={[name, 'subcontractor_state_or_province']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'non_certified_subcontractor_appendix',
                                name,
                                'subcontractor_state_or_province',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Subcontractor State Or Province' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Country Or Area'
                              name={[name, 'subcontractor_country_or_area']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'non_certified_subcontractor_appendix',
                                name,
                                'subcontractor_country_or_area',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Subcontractor Country Or Area' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
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
                                      ({
                                        key: subKey,
                                        name: subName,
                                        ...restSubField
                                      }, ind) => (
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
                                            label='Subcontractor Address:'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'non_certified_subcontractor_appendix',
                                              'subcontractor_address',
                                              'subcontractor_address_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Subcontractor Address' />
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
                                        Add Subcontractor Address
                                      </Button>
                                    </AntdForm.Item>
                                  </>
                                )}
                              </AntdForm.List>
                            </div>
                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
                              <AntdForm.List
                                name={[name, 'process_categories']}
                                initialValue={[{ process_categories_: '' }]}
                              >
                                {(
                                  subFields,
                                  { add: addSub, remove: removeSub }
                                ) => (
                                  <>
                                    {subFields.map(
                                      ({
                                        key: subKey,
                                        name: subName,
                                        ...restSubField
                                      }, ind) => (
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
                                              'process_categories_'
                                            ]}
                                            label='Process Categories:'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'non_certified_subcontractor_appendix',
                                              'process_categories',
                                              'process_categories_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Process Categories' />
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
                                        Add Process Categories
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
                          Add Non Certified Subcontractor Appendix
                        </Button>
                      </AntdForm.Item>
                    </>
                  )}
                </AntdForm.List>
              </section>

              {/* Independently Certified Subcontractor Appendix */}

              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Independently Certified Subcontractor Appendix
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
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'subcontractor_name',
                                index
                              )}`}
                            >
                              <Input placeholder='Subcontractor Name.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Facility Name :'
                              name={[name, 'subcontractor_facility_name']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'subcontractor_facility_name',
                                index
                              )}`}
                            >
                              <Input placeholder='Subcontractor Facility Name .' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='License Number :'
                              name={[name, 'license_number']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'license_number',
                                index
                              )}`}
                            >
                              <Input placeholder='License Number.' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              {...restField}
                              label='Expiry Date :'
                              name='expiry_date'
                              // className='w-full md:w-[49%]'
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
                              label='Independently Town:'
                              name={[name, 'independently_town']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'independently_town',
                                index
                              )}`}
                            >
                              <Input placeholder='Independently Town.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Independently Postcode:'
                              name={[name, 'independently_postcode']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'independently_postcode',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Independently Postcode' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Independently State Or Province'
                              name={[name, 'independently_state_or_province']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'independently_state_or_province',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Independently State Or Province' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Independently Country Or Area'
                              name={[name, 'independently_country_or_area']}
                              // className='w-full md:w-[49%]'
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'independently_certified_subcontractor_appendix',
                                name,
                                'independently_country_or_area',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Independently Country Or Area' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
                              <AntdForm.List
                                name={[name, 'independently_address']}
                                initialValue={[{ independently_address_: '' }]}
                              >
                                {(
                                  subFields,
                                  { add: addSub, remove: removeSub }
                                ) => (
                                  <>
                                    {subFields.map(
                                      ({
                                        key: subKey,
                                        name: subName,
                                        ...restSubField
                                      }, ind) => (
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
                                              'independently_address_'
                                            ]}
                                            label='Independently Address:'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'independently_certified_subcontractor_appendix',
                                              'independently_address',
                                              'independently_address_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Independently Address' />
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
                                        Add Independently Address
                                      </Button>
                                    </AntdForm.Item>
                                  </>
                                )}
                              </AntdForm.List>
                            </div>
                            <div className='w-full md:w-[49%]'>
                              {/* Nested List for Consignee Address */}
                              <AntdForm.List
                                name={[name, 'independently_process_categories']}
                                initialValue={[{ independently_process_categories_: '' }]}
                              >
                                {(
                                  subFields,
                                  { add: addSub, remove: removeSub }
                                ) => (
                                  <>
                                    {subFields.map(
                                      ({
                                        key: subKey,
                                        name: subName,
                                        ...restSubField
                                      }, ind) => (
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
                                              'independently_process_categories_'
                                            ]}
                                            label='Independently Process Categories:'
                                            // className='w-full md:w-[49%]'
                                            className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                              index,
                                              ind,
                                              'independently_certified_subcontractor_appendix',
                                              'independently_process_categories',
                                              'independently_process_categories_'
                                            )}`}
                                          >
                                            <Input placeholder='Enter Independently Process Categories' />
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
                                        Add Independently Process Categories
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

export default ImportPdfScopeVerificationV3
