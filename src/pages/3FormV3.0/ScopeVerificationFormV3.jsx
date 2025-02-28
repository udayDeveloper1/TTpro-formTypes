import React, { useEffect, useRef, useState } from 'react'
import { Button, Form as AntdForm, Input, Space, DatePicker } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { createForm3ScopeCertificateV3_0, createScopeCertificateScType2, form3submit } from '../../api/Form1Api'
import { useNavigate } from 'react-router-dom'
import { Slidebar } from '../../layout/Slidebar'
import Spinner from '../../layout/Spinner'
import { toast } from 'react-toastify'
import { formatDateToDDMMYYYY, links } from '../../utils/utils'
import CustomFormItem from '../../layout/CustomFormItem'

const { TextArea } = Input

const ScopeVerificationFormV3 = () => {
  const [form] = AntdForm.useForm() // Get the form instance
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    form.setFieldsValue({
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
  }, [form])

  // Handle form submission with typed values
  // const handleSubmit = async values => {

  //   setLoading(true);
  //   console.log('values form', values);
  //   const extractValues = (array, key) => array?.map(obj => Object.values(obj)[0]) || [];
  //   const certified_organization_address = values?.certified_company_address?.map(obj => Object.values(obj)[0]) || [];
  //   // const facility_address = values?.facility_address?.map(obj => Object.values(obj)[0]) || [];
  //   // const process_categories = values?.process_categories?.map(obj => Object.values(obj)[0]) || [];
  //   // const standards = values?.standards?.map(obj => Object.values(obj)[0]) || [];
  //   // const farm_capacity = values?.farm_capacity?.map(obj => Object.values(obj)[0]) || [];

  //   const facility_appendix = async (data) => {
  //     return values?.facility_appendix?.map(item => ({
  //       facility_name: item?.facility_name,
  //       facility_te_id: item?.facility_te_id,
  //       address_details: {
  //         facility_address: extractValues(item.facility_address, "facility_address_"),
  //         facility_town: item?.facility_town,
  //         facility_postcode: item?.facility_postcode,
  //         facility_state_or_province: item?.facility_state_or_province,
  //         facility_country_or_area: item?.facility_country_or_area
  //       },
  //       process_categories: extractValues(item.process_categories, "process_categories_")
  //     }));
  //   };

  //   const non_certified_subcontractor_appendix = async (data) => {
  //     return values?.non_certified_subcontractor_appendix?.map(item => ({
  //       subcontractor_name: item?.associate_subcontractor_name,
  //       subcontractor_facility_name: item?.subcontractor_facility_name,
  //       address_details: {
  //         subcontractor_address: extractValues(item.subcontractor_address, "subcontractor_address_"),
  //         subcontractor_town: item?.subcontractor_town,
  //         subcontractor_postcode: item?.subcontractor_postcode,
  //         subcontractor_state_or_province: item?.subcontractor_state_or_province,
  //         subcontractor_country_or_area: item?.subcontractor_country_or_area
  //       },
  //       process_categories: extractValues(item.process_categories, "process_categories_")
  //     }));
  //   };

  //   const independently_certified_subcontractor_appendix = async (data) => {
  //     return values?.independently_certified_subcontractor_appendix?.map(item => ({
  //       subcontractor_name: item?.subcontractor_name,
  //       subcontractor_facility_name: item?.subcontractor_facility_name,
  //       license_number : item?.license_number,
  //       expiry_date : formatDateToDDMMYYYY(item?.expiry_date),
  //       address_details: {
  //         address: extractValues(item.independently_address, "independently_address_"),
  //         town: item?.independently_town,
  //         postcode: item?.independently_postcode,
  //         state_or_province: item?.independently_state_or_province,
  //         country_or_area: item?.independently_country_or_area
  //       },
  //       process_categories: extractValues(item.independently_process_categories, "independently_process_categories_")
  //     }));
  //   };

  //   const formattedValues = {
  //     file_name: values?.file_name || values?.certificate_body_name,
  //     // ------------------------- extracted_data -------------------------------

  //     // -----------------------------------   scope_certificate  -----------------------------
  //     extracted_data: {
  //       scope_certificate: {
  //         scope_certificate_number: values?.certified_company_name,
  //         scope_certificate_version: values?.scope_certificate_version,
  //         certificate_body_name: values?.certificate_body_name,
  //         certified_company_name: values?.certified_company_name,
  //         certified_company_license_number: values?.certified_company_license_number,
  //         certified_company_address: certified_organization_address,
  //         certified_company_town: values?.certified_company_town,
  //         certified_company_postcode: values?.certified_company_postcode,
  //         certified_company_state_or_province: values?.certified_company_state_or_province,
  //         certified_company_country_or_area: values?.certified_company_country_or_area,
  //         sc_standard_program: values?.sc_standard_program,
  //         sc_standard_version: values?.sc_standard_version,
  //         sc_valid_until: formatDateToDDMMYYYY(values?.sc_valid_untill),
  //         product_category: values?.product_category,
  //         process_category: values?.process_category,
  //         certificate_body_accredited_by: values?.certificate_body_accredited_by,
  //         inspection_body : values?.inspection_body,
  //         auditors: values?.auditors
  //       },
  //       products_appendix: values?.products_appendix,
  //       facility_appendix : await facility_appendix() ,
  //       // [{
  //       //   facility_name : values?.facility_name,
  //       //   facility_te_id : values?.facility_te_id,
  //       //   address_details : {
  //       //     facility_address : facility_address,
  //       //     facility_town: values?.facility_town,
  //       //     facility_postcode : values?.facility_postcode,
  //       //     facility_state_or_province : values?.facility_state_or_province,
  //       //     facility_country_or_area : values?.facility_country_or_area
  //       //   },
  //       //   process_categories : process_categories
  //       // }],
  //       non_certified_subcontractor_appendix : await non_certified_subcontractor_appendix(),
  //       independently_certified_subcontractor_appendix: independently_certified_subcontractor_appendix(),/// array inside array manage the value 
  //       // associate_subcontractor_appendix: await associate_subcontractor_appendix(),

  //       footer: {
  //         place_of_issue: values?.place_of_issue,
  //         date_of_issue: formatDateToDDMMYYYY(values?.date_of_issue),
  //         last_updated: formatDateToDDMMYYYY(values?.last_updated),
  //         extended_until: formatDateToDDMMYYYY(values?.extended_untill),
  //         status: values?.status,
  //         name_of_authorized_signatory: values?.name_of_authorized_signatory || '1234'
  //       }
  //     },
  //   }
  //   console.log('formattedValues', formattedValues);
  //   try {
  //     let response = await createForm3ScopeCertificateV3_0(formattedValues);
  //     console.log(response);
  //     if (response?.status_code === 200 || response?.status_code === 201) {
  //       toast.success(response?.message)
  //       navigate(`${links.handlingTradingScTypeListV3_0}`)
  //     } else {
  //       toast.error(response?.message)
  //     }
  //     setLoading(false)
  //   } catch (error) {
  //     setLoading(false)
  //     toast.error("Something Went Wrong")
  //   }
  // }

  const handleSubmit = async values => {
    setLoading(true);

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
        toast.success(response?.message);
        navigate(`${links.handlingTradingScTypeListV3_0}`);
      } else {
        toast.error(response?.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something Went Wrong");
    }
  };
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
          <div className='container mx-auto py-10 px-4 md:px-0'>

            <AntdForm
              form={form}
              onFinish={handleSubmit}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout='vertical'
              className='form_1  rounded-xl shadow-xl'
              style={{ maxWidth: 900, margin: '0 auto' }}
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
                      isFocus={true}
                    />
                    <CustomFormItem
                      label='Sc Status'
                      name='status'
                      placeholder='Enter Name Sc Status'
                      component={Input}
                      isFocus={true}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Sc Date Of Issue'
                      name='date_of_issue'
                      // placeholder='Enter Tc Date of Issue'
                      component={DatePicker}
                      isFocus={true}
                    />

                    <CustomFormItem
                      label='Extended untill'
                      name='extended_untill'
                      // placeholder='Enter Tc Date of Issue'
                      component={DatePicker}
                      isFocus={true}
                    />

                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>

                    <CustomFormItem
                      label='Sc Last Updated'
                      name='last_updated'
                      // placeholder='Enter Tc Date of Issue'
                      component={DatePicker}
                      isFocus={true}
                    />

                    <CustomFormItem
                      label='Name Of Authorized Signatory'
                      name='name_of_authorized_signatory'
                      placeholder='Name Of Authorized Signatory'
                      component={Input}
                      isFocus={true}
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
                      isFocus={true}
                    />
                    <CustomFormItem
                      label='Certified Body Name'
                      name='certificate_body_name'
                      placeholder='Certified Body Name'
                      component={Input}
                      isFocus={true}
                    />

                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Scope Certificate Number'
                      name='scope_certificate_number'
                      placeholder='Scope Certificate Number'
                      component={Input}
                      isFocus={true}
                    />

                    <CustomFormItem
                      label='Scope Certificate Version'
                      name='scope_certificate_version'
                      placeholder='Scope Certificate Version'
                      component={Input}
                      isFocus={true}
                    />

                  </div>
                  <div className='flex md:justify-between flex-wrap'>

                    <CustomFormItem
                      label='Certified Company License Number'
                      name='certified_company_license_number'
                      placeholder='Certified Company License Number'
                      component={Input}
                      isFocus={true}
                    />

                    <CustomFormItem
                      label='Auditors'
                      name='auditors'
                      placeholder='Auditors'
                      component={Input}
                      isFocus={true}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Certified Company Country or Area'
                      name='certified_company_country_or_area'
                      placeholder='Certified Company Country or Area'
                      component={Input}
                      isFocus={true}
                    />

                    <CustomFormItem
                      label='Sc Standard Program'
                      name='sc_standard_program'
                      placeholder='Sc Standard Program'
                      component={Input}
                      isFocus={true}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Sc Standard Version'
                      name='sc_standard_version'
                      placeholder='Sc Standard Version'
                      component={Input}
                      isFocus={true}
                    />

                    <CustomFormItem
                      label='Product Category'
                      name='product_category'
                      placeholder='Product Category'
                      component={Input}
                      isFocus={true}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Process Category'
                      name='process_category'
                      placeholder='Process Category'
                      component={Input}
                      isFocus={true}
                    />

                    <CustomFormItem
                      label='Sc Valid Untill'
                      name='sc_valid_untill'
                      // placeholder='Sc Valid Untill'
                      component={DatePicker}
                      isFocus={true}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Certificate Body Accredited By'
                      name='certificate_body_accredited_by'
                      placeholder='Certificate Body Accredited By'
                      component={Input}
                      isFocus={true}
                    />
                    <CustomFormItem
                      label='Inspection Body'
                      name='inspection_body'
                      placeholder='Inspection Body'
                      component={Input}
                      isFocus={true}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Certified Company Postcode'
                      name='certified_company_postcode'
                      placeholder='Certified Company Postcode'
                      component={Input}
                      isFocus={true}
                    />
                    <CustomFormItem
                      label='Certified Company State Or Province'
                      name='certified_company_state_or_province'
                      placeholder='Certified Company State Or Province'
                      component={Input}
                      isFocus={true}
                    />
                  </div>

                  <div className='flex md:justify-between flex-wrap'>

                    <CustomFormItem
                      label='Certified Company Town'
                      name='certified_company_town'
                      placeholder='Certified Company Town'
                      component={Input}
                      isFocus={true}
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
                </AntdForm.List>
              </section>

              {/* facility appendix */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Facility Appendix
                </h2>
                <AntdForm.List name='facility_appendix'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Name :'
                              name={[name, 'facility_name']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Facility Name.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Te ID :'
                              name={[name, 'facility_te_id']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Facility Te ID .' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Town:'
                              name={[name, 'facility_town']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Facility Town.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Postcode:'
                              name={[name, 'facility_postcode']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Facility Postcode' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Facility State Or Province'
                              name={[name, 'facility_state_or_province']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Facility State Or Province' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Facility Country Or Area'
                              name={[name, 'facility_country_or_area']}
                              className='w-full md:w-[49%]'
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
                                      }) => (
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
                                            className='w-full md:w-[49%]'
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
                                      }) => (
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
                                            className='w-full md:w-[49%]'
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
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Name :'
                              name={[name, 'subcontractor_name']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Subcontractor Name.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Facility Name :'
                              name={[name, 'subcontractor_facility_name']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Subcontractor Facility Name .' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Town:'
                              name={[name, 'subcontractor_town']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Subcontractor Town.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Postcode:'
                              name={[name, 'subcontractor_postcode']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Subcontractor Postcode' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor State Or Province'
                              name={[name, 'subcontractor_state_or_province']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Subcontractor State Or Province' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Country Or Area'
                              name={[name, 'subcontractor_country_or_area']}
                              className='w-full md:w-[49%]'
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
                                      }) => (
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
                                            className='w-full md:w-[49%]'
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
                                      }) => (
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
                                            className='w-full md:w-[49%]'
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
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Name :'
                              name={[name, 'subcontractor_name']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Subcontractor Name.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Facility Name :'
                              name={[name, 'subcontractor_facility_name']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Subcontractor Facility Name .' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='License Number :'
                              name={[name, 'license_number']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='License Number.' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              {...restField}
                              label='Expiry Date :'
                              name='expiry_date'
                              className='w-full md:w-[49%]'
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
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Independently Town.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Independently Postcode:'
                              name={[name, 'independently_postcode']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Independently Postcode' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Independently State Or Province'
                              name={[name, 'independently_state_or_province']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Independently State Or Province' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Independently Country Or Area'
                              name={[name, 'independently_country_or_area']}
                              className='w-full md:w-[49%]'
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
                                      }) => (
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
                                            className='w-full md:w-[49%]'
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
                                      }) => (
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
                                            className='w-full md:w-[49%]'
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

export default ScopeVerificationFormV3
