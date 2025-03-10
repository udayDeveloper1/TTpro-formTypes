import React, { useEffect, useRef, useState } from 'react'
import { Button, Form as AntdForm, Input, Space, DatePicker } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { createScopeCertificateScType2, form3submit } from '../../api/Form1Api'
import { useNavigate } from 'react-router-dom'
import { Slidebar } from '../../layout/Slidebar'
import Spinner from '../../layout/Spinner'
import { toast } from 'react-toastify'
import { formatDateToDDMMYYYY, links } from '../../utils/utils'

const { TextArea } = Input

const ScopeVerificationForm = () => {
  const [form] = AntdForm.useForm() // Get the form instance
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    form.setFieldsValue({
      file_name: '',
      // ------------------------- extracted_data -------------------------------

      // -----------------------------------   scope_certificate  -----------------------------

      scope_certificate_number: '',
      scope_certificate_version: '',
      certificate_body_name: '',
      certfied_organization_name: '',
      certfied_organization_name_native: "",
      ["textile_exchange_id(te_id)"]: '',
      certified_organization_license_number: '',
      certified_organization_address: [""],
      certified_organization_state_or_province: "",
      certified_organization_country_or_area: "",
      sc_standard_program: "",
      sc_standard_version: "",
      product_category: "",
      process_category: "",
      sc_valid_untill: "",
      certificate_body_licensed_by: "",
      certificate_body_accredited_by: "",
      inspection_body: "",
      auditors: "",
      products_appendix: [
        {
          product_number: "",
          product_category: "",
          product_details: "",
          material_composition: "",
          label_grade: "",
          facility_number: ""
        }
      ],
      brand_names_may_be_certified_under_this_sc: "",
      number_of_farms_certified_under_this_sc: "",
      number_of_farms_areas_certified_under_this_sc: "",
      facility_name: "",
      ["site-te-id_or_number"]: "",
      facility_address: [""],
      facility_town: "",
      facility_postcode: "",
      facility_state_or_province: "",
      facility_country_or_area: "",
      process_categories: [""],
      standards: [""],
      farm_capacity: [""],
      associate_subcontractor_appendix: [{
        associate_subcontractor_name: "",
        ["subcontractor_te-id_or_number"]: "",
        address_details: {
          subcontractor_address: [""],
          subcontractor_town: "",
          subcontractor_postcode: "",
          subcontractor_state_or_province: "",
          subcontractor_country_or_area: ""
        },
        subcontractor_process_categories: [""],
        subcontractor_standards: [""]
      }],
      independently_certified_subcontractor_appendix: [{
        subcontractor_name: "",
        ["apendix-te-id_or_number"]: "",
        certification_body: "",
        expiry_date: "",
        appendix_address: [""],
        appendix_town: "",
        appendix_postcode: "",
        appendix_state_or_province: "",
        appendix_country_or_area: "",
        appendix_process_categories: [""],
        appendix_standards: [""]
      }],
 headername : "",
 headAddress : [{headAddress_: ""}], 
      place_of_issue: "",
      date_of_issue: "",
      last_updated: "",
      extended_untill: "",
      status: "",
      name_of_authorized_signatory: "",
    })
  }, [form])

  // Handle form submission with typed values
  const handleSubmit = async values => {
    setLoading(true)
    const extractValues = (array, key) => array?.map(obj => Object.values(obj)[0]) || [];

    const certified_organization_address = values?.certified_organization_address?.map(obj => Object.values(obj)[0]) || [];
    const facility_address = values?.facility_address?.map(obj => Object.values(obj)[0]) || [];
    const process_categories = values?.process_categories?.map(obj => Object.values(obj)[0]) || [];
    const standards = values?.standards?.map(obj => Object.values(obj)[0]) || [];
    const farm_capacity = values?.farm_capacity?.map(obj => Object.values(obj)[0]) || [];


    const associate_subcontractor_appendix = async (data) => {
      return values?.associate_subcontractor_appendix?.map(item => ({
        subcontractor_name: item?.associate_subcontractor_name,
        ["te-id_or_number"]: item?.["subcontractor_te-id_or_number"],
        address_details: {
          subcontractor_address: extractValues(item.subcontractor_address, "subcontractor_address_"),
          subcontractor_town: item?.subcontractor_town,
          subcontractor_postcode: item?.subcontractor_postcode,
          subcontractor_state_or_province: item?.subcontractor_state_or_province,
          subcontractor_country_or_area: item?.subcontractor_country_or_area
        },
        process_categories: extractValues(item.subcontractor_process_categories, "subcontractor_process_categories_"),
        standards: extractValues(item.subcontractor_standards, "subcontractor_standards_")
      }));
    };

    const independently_certified_subcontractor_appendix = async (data) => {
      return values?.independently_certified_subcontractor_appendix?.map(item => ({
        subcontractor_name: item.subcontractor_name,
        certification_body: item.certification_body,
        expiry_date: formatDateToDDMMYYYY(item.expiry_date),
        ["te-id_or_number"]: item?.["apendix-te-id_or_number"],
        address_details: {
          address: extractValues(item.appendix_address, "appendix_address_"),
          town: item.appendix_town || "",
          postcode: item.appendix_postcode || "",
          state_or_province: item.appendix_state_or_province || "",
          country_or_area: item.appendix_country_or_area || "",
        },
        process_categories: extractValues(item.appendix_process_categories, "appendix_process_categories_"),
        standards: extractValues(item.appendix_standards, "appendix_standards_")
      }));
    };
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
          certfied_organization_name_native: values?.certfied_organization_name_native,
          ["textile_exchange_id(te_id)"]: values?.["textile_exchange_id(te_id)"],
          certified_organization_license_number: values?.certified_organization_license_number,
          certified_organization_address: certified_organization_address,
          certified_organization_state_or_province: values?.certified_organization_state_or_province,
          certified_organization_country_or_area: values?.certified_organization_country_or_area,
          sc_standard_program: values?.sc_standard_program,
          sc_standard_version: values?.sc_standard_version,
          product_category: values?.product_category,
          process_category: values?.process_category,
          sc_valid_untill:formatDateToDDMMYYYY(values?.sc_valid_untill),
          certificate_body_licensed_by: values?.certificate_body_licensed_by,
          certificate_body_accredited_by: values?.certificate_body_accredited_by,
          inspection_body: values?.inspection_body,
          auditors: values?.auditors
        },
        products_appendix: values?.products_appendix,
        info_above_site_index: {
          brand_names_may_be_certified_under_this_sc: values?.brand_names_may_be_certified_under_this_sc,
          number_of_farms_certified_under_this_sc: values?.number_of_farms_certified_under_this_sc,
          number_of_farms_areas_certified_under_this_sc: values?.number_of_farms_areas_certified_under_this_sc,

        },
        site_appendix: {
          facility_name: values?.facility_name,
          ["te-id_or_number"]: values?.["site-te-id_or_number"],
          address_details: {
            facility_address: facility_address,
            facility_town: values?.facility_town,
            facility_postcode: values?.facility_postcode,
            facility_state_or_province: values?.facility_state_or_province,
            facility_country_or_area: values?.facility_country_or_area,
          },
          process_categories: process_categories,
          standards: standards,
          farm_capacity: farm_capacity
        },
        associate_subcontractor_appendix: await associate_subcontractor_appendix(),
        independently_certified_subcontractor_appendix: await independently_certified_subcontractor_appendix(),/// array inside array manage the value 
        footer: {
          place_of_issue: values?.place_of_issue,
          date_of_issue: formatDateToDDMMYYYY(values?.date_of_issue),
          last_updated: formatDateToDDMMYYYY(values?.last_updated),
          extended_untill: formatDateToDDMMYYYY(values?.extended_untill),
          status: values?.status,
          name_of_authorized_signatory: values?.name_of_authorized_signatory || '1234'
        },
        letterhead: {
          name: values?.headername,
          address : extractValues(values.headAddress, "headAddress_")
        }
      },

    }
    
    // try {
    //   let response = await createScopeCertificateScType2(formattedValues);
    //   console.log(response);
    //   if (response?.status_code === 200 || response?.status_code === 201) {
    //     toast.success(response?.message)
    //     navigate(`${links.scopeVerificationList}`)
    //   } else {
    //     toast.error(response?.message)
    //   }
    //   setLoading(false)
    // } catch (error) {
    //   setLoading(false)
    //   toast.error("Something Went Wrong")
    // }
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
          <div className='container mx-auto py-10 px-4 md:px-0'>
            {/* <h2 className='text-3xl md:text-4xl font-medium mb-6 text-center'>
              Scope Certificate Form
            </h2> */}
            <AntdForm
              // form={form}
              // onFinish={handleSubmit}
              // layout='vertical'
              // className='form-container p-6 rounded-lg shadow-md bg-white'
              // style={{ maxWidth: 900, margin: '0 auto' }}
              // initialValues={{ process_categories: [''] }}
              form={form}
              onFinish={handleSubmit}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout='vertical'
              className='form_1  rounded-xl shadow-xl'
              style={{ maxWidth: 900, margin: '0 auto' }}
            >
              <h1 className='text-3xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center '>
                Scope Certificate Form
              </h1>

              {/* Header*/}
              <section className='section mt-10'>
                <h2 className='text-2xl pb-3 section-title'>Header</h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between '>
                    <AntdForm.Item
                      label='Header Name'
                      name='headername'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Header Name' />
                    </AntdForm.Item>
                    <AntdForm.List name='headAddress'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Head Address'
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
                                    name={[name, 'headAddress_']}
                                    style={{ flex: 1 }}
                                  >
                                    <Input
                                      placeholder={`Head Address`}
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
                    <AntdForm.Item
                      label='Sc Place of Issue'
                      name='place_of_issue'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Sc Place of Issue' />
                    </AntdForm.Item>

                    <AntdForm.Item
                      label='Sc Status'
                      name='status'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Name Sc Status' />
                    </AntdForm.Item>

                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <AntdForm.Item
                      label='Sc Date Of Issue'
                      name='date_of_issue'
                      className='w-full md:w-[49%]'
                    >
                      <DatePicker
                        className='datePickerIpnut'
                        format='DD/MM/YYYY'
                      />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Extended untill'
                      name='extended_untill'
                      className='w-full md:w-[49%]'
                    >
                      <DatePicker
                        className='datePickerIpnut'
                        format='DD/MM/YYYY'
                      />
                    </AntdForm.Item>
                    {/* <AntdForm.Item
                      label='Sc Status'
                      name='status'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Name Sc Status' />
                    </AntdForm.Item> */}
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <AntdForm.Item
                      label='Sc Last Updated'
                      name='last_updated'
                      className='w-full md:w-[49%]'
                    >
                      <DatePicker
                        className='datePickerIpnut'
                        format='DD/MM/YYYY'
                      />
                    </AntdForm.Item>

                    <AntdForm.Item
                      label='Name Of Authorized Signatory'
                      name='name_of_authorized_signatory'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Name Of Authorized Signatory' />
                    </AntdForm.Item>
                    
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
                    <AntdForm.Item
                      label='Scop Certificate Number'
                      name='scope_certificate_number'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Scop Certificate Number' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Scop Certificate Version'
                      name='scope_certificate_version'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Scop Certificate Version' />
                    </AntdForm.Item>
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Certificate Body Name'
                      name='certificate_body_name'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Certificate Body Name' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Certfied Organization Name'
                      name='certfied_organization_name'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Certfied Organization Name' />
                    </AntdForm.Item>
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Certfied Organization Name Native'
                      name='certfied_organization_name_native'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Certfied Organization Name Native' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Certified Organization License Number'
                      name='certified_organization_license_number'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Certified Organization License Number' />
                    </AntdForm.Item>
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Certfied Organization State Or Province'
                      name='certified_organization_state_or_province'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Certfied Organization State Or Province' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Certified Organization Country Or Area'
                      name='certified_organization_country_or_area'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Certified Organization License Number' />
                    </AntdForm.Item>
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Sc Standard Program'
                      name='sc_standard_program'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Sc Standard Program' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Sc Standard Version'
                      name='sc_standard_version'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Sc Standard Version' />
                    </AntdForm.Item>
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Product Category'
                      name='product_category'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Product Category' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Process Category'
                      name='process_category'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Process Category' />
                    </AntdForm.Item>
                  </div>


                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Sc Valid Untill'
                      name='sc_valid_untill'
                      className='w-full md:w-[49%]'
                    >
                      <DatePicker
                        className='datePickerIpnut'
                        format='DD/MM/YYYY'
                      />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Certificate Body Licensed By'
                      name='certificate_body_licensed_by'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Certificate Body Licensed By' />
                    </AntdForm.Item>
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Certificate Body Accredited By'
                      name='certificate_body_accredited_by'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Certificate Body Accredited By' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Inspection Body'
                      name='inspection_body'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Inspection Body' />
                    </AntdForm.Item>
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Auditors'
                      name='auditors'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Auditors' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Textile Exchange id'
                      name='textile_exchange_id(te_id)'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Textile Exchange id' />
                    </AntdForm.Item>
                  </div>

                  {/* ------------------------------- address ---------------------------------------- */}

                  <div className='flex md:justify-between flex-wrap'>

                    <AntdForm.List name='certified_organization_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Certificate Address'
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
                                    name={[name, 'certified_organization_']}
                                    style={{ flex: 1 }}
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
                            <AntdForm.Item
                              {...restField}
                              label='Facility Number'
                              name={[name, 'facility_number']}
                              className='w-full md:w-[49%]'
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
                <h2 className='text-2xl pb-3 section-title'>Info Above Site Index</h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between items-end'>
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
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <AntdForm.Item
                      label='Number Of Farms Areas Certified'
                      name='number_of_farms_areas_certified_under_this_sc'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Number Of Farms Areas Certified' />
                    </AntdForm.Item>
                  </div>
                </div>
              </section>

              {/* site appendix */}
              <section className='section'>
                <h2 className=' pb-3 section-title'>
                  Site Appendix:
                </h2>
                <div>
                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Facility Name'
                      name='facility_name'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Facility Name' />
                    </AntdForm.Item>
                    {/* <AntdForm.Item
                      label='Scop Certificate Version'
                      name='scope_certificate_version'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Scop Certificate Version' />
                    </AntdForm.Item> */}
                    <AntdForm.Item
                      label='Facility Town'
                      name='facility_town'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Facility Town' />
                    </AntdForm.Item>
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Facility Postcode'
                      name='facility_postcode'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Facility Postcode' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Facility State Or Province'
                      name='facility_state_or_province'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Facility State Or Province' />
                    </AntdForm.Item>
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.Item
                      label='Facility Country Or Area'
                      name='facility_country_or_area'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Facility Country Or Area' />
                    </AntdForm.Item>
                    <AntdForm.Item
                      label='Site-Te Id Or Number'
                      name='site-te-id_or_number'
                      className='w-full md:w-[49%]'
                    >
                      <Input placeholder='Enter Site-Te Id Or Number' />
                    </AntdForm.Item>
                    {/* ------------------------------- address ---------------------------------------- */}
                  </div>

                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.List name='facility_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Facility Address'
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
                                    name={[name, 'facility_add']}
                                    style={{ flex: 1 }}
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
                                    name={[name, 'process_cat']}
                                    style={{ flex: 1 }}
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
                                    name={[name, 'standards_']}
                                    style={{ flex: 1 }}
                                  >
                                    <Input
                                      placeholder={`Enter Standards`}
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
                                    name={[name, 'farm_capacity_']}
                                    style={{ flex: 1 }}
                                  >
                                    <Input
                                      placeholder={`Farm Capacity`}
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
              {/* <section className='section'>
                <h2 className=' pb-3 section-title'>
                  Associate Subcontractor Appendix:
                </h2>
                <div>
                  <AntdForm.List name='associate_subcontractor_appendix'>
                    {(fields, { add, remove }) => (
                      <>
                        <AntdForm.Item
                          label='Associate Subcontractor Appendix'
                          required
                          className='w-full md:w-[99%]'
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
                                  name={[name, 'associate_subcontractor_']}
                                  style={{ flex: 1 }}
                                >
                                  <Input
                                    placeholder={`Enter Associate Subcontractor Appendix`}
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
                              Add Associate Subcontractor Appendix
                            </Button>
                          </AntdForm.Item>
                        </AntdForm.Item>
                      </>
                    )}
                  </AntdForm.List>
                </div>
              </section> */}

              <section className='section'>
                <h2 className=' pb-3 section-title'>
                  Associate Subcontractor Appendix: :
                </h2>
                <AntdForm.List name='associate_subcontractor_appendix'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className='pb-5 relative'>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Associate Subcontractor Name :'
                              name={[name, 'associate_subcontractor_name']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Associate Subcontractor Name.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Associate-Te Id Or Number :'
                              name={[name, 'subcontractor_te-id_or_number']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Associate-Te Id Or Number ' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Town :'
                              name={[name, 'subcontractor_town']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Subcontractor Town' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Postcode :'
                              name={[name, 'subcontractor_postcode']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Subcontractor Postcode' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor State Or Province :'
                              name={[name, 'subcontractor_state_or_province']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Subcontractor State Or Province' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Country Or Area :'
                              name={[name, 'subcontractor_country_or_area']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Subcontractor Postcode' />
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
                                            label='Subcontractor Address :'
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
                                name={[name, 'subcontractor_process_categories']}
                                initialValue={[{ subcontractor_process_categories_: '' }]}
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
                                              'subcontractor_process_categories_'
                                            ]}
                                            label='Subcontractor Process Categories :'
                                            className='w-full md:w-[49%]'
                                          >
                                            <Input placeholder='Enter Subcontractor Process Categories' />
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
                                initialValue={[{ subcontractor_standards_: '' }]}
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
                                              'subcontractor_standards_'
                                            ]}
                                            label='Subcontractor Standards :'
                                            className='w-full md:w-[49%]'
                                          >
                                            <Input placeholder='Enter Subcontractor Standards' />
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
                      {fields.map(({ key, name, ...restField }) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Subcontractor Name :'
                              name={[name, 'subcontractor_name']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Subcontractor Name.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Apendix-Te Id Or Number :'
                              name={[name, 'apendix-te-id_or_number']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Apendix-Te Id Or Number ' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Certification Body :'
                              name={[name, 'certification_body']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Certification Body' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              label='Expiry Date'
                              name={[name, 'expiry_date']}
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
                              label='Appendix Town :'
                              name={[name, 'appendix_town']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Appendix Town' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              {...restField}
                              label='Appendix Postcode :'
                              name={[name, 'appendix_postcode']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Appendix Postcode' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Appendix State Or Province :'
                              name={[name, 'appendix_state_or_province']}
                              className='w-full md:w-[49%]'
                            >
                              <Input placeholder='Enter Appendix State Or Province' />
                            </AntdForm.Item>

                            <AntdForm.Item
                              {...restField}
                              label='Appendix Country Or Area :'
                              name={[name, 'appendix_country_or_area']}
                              className='w-full md:w-[49%]'
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
                                              'appendix_address_'
                                            ]}
                                            label='Appendix Address :'
                                            className='w-full md:w-[49%]'
                                          >
                                            <Input placeholder='Enter Appendix Address' />
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
                                initialValue={[{ appendix_process_categories_: '' }]}
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
                                              'appendix_process_categories_'
                                            ]}
                                            label='Appendix Process Categories :'
                                            className='w-full md:w-[49%]'
                                          >
                                            <Input placeholder='Enter Appendix Process Categories' />
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
                                              'appendix_standards_'
                                            ]}
                                            label='Appendix Standards :'
                                            className='w-full md:w-[49%]'
                                          >
                                            <Input placeholder='Enter Appendix Standards' />
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
                          Add Product
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

export default ScopeVerificationForm
