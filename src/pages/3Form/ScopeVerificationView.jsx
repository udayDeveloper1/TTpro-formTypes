import React, { useEffect, useState, useRef } from 'react'
import { form1List, scopCertificationView } from '../../api/Form1Api'
import { FaFilePdf } from 'react-icons/fa6'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useNavigate, useParams } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../utils/utils'
import '../../assets/css/tc_type2.css'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { Slidebar } from '../../layout/Slidebar'
import { toast } from 'react-toastify'
import ttproLogo from '../../assets/logo.webp'
import qrCode from '../../assets/images/qrCode.svg'
import Checkbox from 'react-custom-checkbox'
import { Check, CheckCircle, XCircle } from 'lucide-react'

const ScopeVerificationView = () => {
  const [data, setData] = useState({})
  const refs = useRef({})
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params

  const [updatedState, setUpdatedState] = useState({
    scope_certificate: data.scope_certificate || '',
    associate_subcontractor_appendix:
      data.associate_subcontractor_appendix || '',
    footer: data.footer || '',
    independently_certified_subcontractor_appendix:
      data.independently_certified_subcontractor_appendix || '',
    info_above_site_index: data.info_above_site_index || '',
    products_appendix: data.products_appendix || '',
    site_appendix: data.site_appendix || ''
  })

  // const {scope_certificate ,associate_subcontractor_appendix , footer , independently_certified_subcontractor_appendix , info_above_site_index , products_appendix ,  site_appendix} = data;

  const [show, setShow] = useState({
    certificateBody: {
      town: false,
      postcode: false,
      state_provice: false,
      Country_area: false
    },
    seller: {
      seller_town: false,
      seller_postcode: false,
      seller_state_or_province: false,
      seller_country_or_area: false
    },
    buyer: {
      buyer_town: false,
      buyer_postcode: false,
      buyer_state_or_province: false,
      buyer_country_or_area: false
    }
  })

  const declarationsByCertificateBody = [
    `the raw material(s) for the products as further detailed/referred to in Box 10 "Certified Products", Box 11 "Certified Raw Ma terials
and Declared Country/area of Origin" and quantified in Box 4 "Gross Shipping Weight", Box 5 "Net Shipping Weight" and Box 6
"Certified Weight" has/have been produced in accordance with (an) organic farming standard(s) which is/are recognized by the
GOTS, and`,
    `the products in Box 10 "Certified Products" have been processed in accordance with the GOTS. Conformity with the standard is
audited and monitored systematically under responsibility of the certification body named in Box 1.`
  ]

  const getList = async () => {
    try {
      const response = await scopCertificationView(id)

      if (response?.status_code === 200 || response?.status_code === 201) {
        let res = response?.data
        console.log('scopverificationView', res)

        // let input_tcs = String(
        //   res?.extracted_data.certified_input_references.input_tcs
        // )
        //   .replace(/[:;]/g, ',')
        //   .split(',')

        // let farm_tcs = String(
        //   res?.extracted_data.certified_input_references.farm_tcs
        // )
        //   .replace(/[:;]/g, ',')
        //   .split(',')

        // let farm_scs = String(
        //   res?.extracted_data.certified_input_references.farm_scs
        // )
        //   .replace(/[:;]/g, ',')
        //   .split(',')

        // let shows = cloneDeep(show)

        // res?.extracted_data?.buyer_of_certified_products?.buyer_address?.forEach(
        //   ele => {
        //     if (
        //       res?.extracted_data?.buyer_of_certified_products?.buyer_town?.includes(
        //         ele
        //       )
        //     ) {
        //       shows.buyer.buyer_town = true
        //     }
        //     if (
        //       res?.extracted_data?.buyer_of_certified_products?.buyer_postcode?.includes(
        //         ele
        //       )
        //     ) {
        //       shows.buyer.buyer_postcode = true
        //     }
        //     if (
        //       res?.extracted_data?.buyer_of_certified_products?.buyer_state_or_province?.includes(
        //         ele
        //       )
        //     ) {
        //       shows.buyer.buyer_state_or_province = true
        //     }
        //     if (
        //       res?.extracted_data?.buyer_of_certified_products?.buyer_country_or_area?.includes(
        //         ele
        //       )
        //     ) {
        //       shows.buyer.buyer_country_or_area = true
        //     }
        //   }
        // )

        // res?.extracted_data?.seller_of_certified_products?.seller_address?.forEach(
        //   ele => {
        //     if (
        //       res?.extracted_data?.seller_of_certified_products?.seller_town?.includes(
        //         ele
        //       )
        //     ) {
        //       shows.seller.seller_town = true
        //     }
        //     if (
        //       res?.extracted_data?.seller_of_certified_products?.seller_postcode?.includes(
        //         ele
        //       )
        //     ) {
        //       shows.seller.seller_postcode = true
        //     }
        //     if (
        //       res?.extracted_data?.seller_of_certified_products?.seller_state_or_province?.includes(
        //         ele
        //       )
        //     ) {
        //       shows.seller.seller_state_or_province = true
        //     }
        //     if (
        //       res?.extracted_data?.seller_of_certified_products?.seller_country_or_area?.includes(
        //         ele
        //       )
        //     ) {
        //       shows.seller.seller_country_or_area = true
        //     }
        //   }
        // )

        // res?.extracted_data?.certification_body?.cb_address?.forEach(ele => {
        //   if (res?.extracted_data?.certification_body?.town?.includes(ele)) {
        //     shows.certificateBody.town = true
        //   }
        //   if (
        //     res?.extracted_data?.certification_body?.postcode?.includes(ele)
        //   ) {
        //     shows.certificateBody.postcode = true
        //   }
        //   if (
        //     res?.extracted_data?.certification_body?.state_or_province?.includes(
        //       ele
        //     )
        //   ) {
        //     shows.certificateBody.state_provice = true
        //   }
        //   if (
        //     res?.extracted_data?.certification_body?.country_or_area?.includes(
        //       ele
        //     )
        //   ) {
        //     shows.certificateBody.Country_area = true
        //   }
        // })

        // setShow(shows)

        // let obj = cloneDeep(res)
        // obj.extracted_data.certified_input_references = {
        //   input_tcs,
        //   farm_tcs,
        //   farm_scs,
        //   trader_tcs_for_organic_material:
        //     res?.extracted_data?.certified_input_references
        //       ?.trader_tcs_for_organic_material
        // }
        setData(res?.extracted_data)
      } else {
        toast.error('Internal server error. Please try again later.')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    setUpdatedState({
      scope_certificate: data.scope_certificate || '',
      associate_subcontractor_appendix:
        data.associate_subcontractor_appendix || '',
      footer: data.footer || '',
      independently_certified_subcontractor_appendix:
        data.independently_certified_subcontractor_appendix || '',
      info_above_site_index: data.info_above_site_index || '',
      products_appendix: data.products_appendix || '',
      site_appendix: data.site_appendix || ''
    })
  }, [data])

  // ---------------------------------------- Print Section ------------------------------------------------

  const handlePrint = e => {
    e.preventDefault()
    window.print()
  }

  useEffect(() => {
    getList()
    const handleBeforePrint = () => {
      document.querySelectorAll('a').forEach(link => {
        link.setAttribute('target', '_blank') // Ensure links open in a new tab
      })
    }
    window.addEventListener('beforeprint', handleBeforePrint)
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint)
    }
  }, [])

  const DynamicTable = ({ data }) => {
    if (!data || data.length === 0) return <p>No data available</p>
    // Extract headers dynamically from object keys
    const headers = Object.keys(data[0])
    return (
      <table className='mb-3 w-full'>
        <thead className='w-full'>
          <tr className='page_break'>
            {headers.map((header, index) => (
              <th key={index} className='border font-semibold p-1'>
                {header.replace(/_/g, ' ').toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='w-full'>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className='border border-gray-300 page_break'>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className='border-gray-100 border p-2 '>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const SiteAppendixTable = ({ data }) => {
    return (
      <table className='mb-2 mt-2 w-full'>
        <thead>
          <tr className=''>
            <th className='border p-2'>Facility Name (TE-ID)</th>
            <th className='border p-2'>Address</th>
            <th className='border p-2'>Process Categories</th>
            <th className='border p-2'>Standards</th>
            <th className='border p-2'>Farm Capacity</th>
          </tr>
        </thead>
        <tbody>
          <tr className='page_break'>
            <td className='border p-2'>
              {data?.facility_name} ({data?.['te-id_or_number']})
            </td>
            <td className='border p-2'>
              {data?.address_details?.facility_address?.map((addr, idx) => (
                <p key={idx}>{addr}</p>
              ))}
              <p>
                {data?.address_details?.facility_town},{' '}
                {data?.address_details?.facility_postcode}
              </p>
              <p>
                {data?.address_details?.facility_state_or_province}
                {data?.address_details?.facility_country_or_area && ', '}
                {data?.address_details?.facility_country_or_area}
              </p>
            </td>
            <td className='border p-2 '>
              {data?.process_categories?.map((cat, idx) => (
                <p key={idx}>{cat}</p>
              ))}
            </td>
            <td className='border p-2'>
              {data?.standards?.map((std, idx) => (
                <p key={idx}>{std}</p>
              ))}
            </td>
            <td className='border p-2'>
              {data?.farm_capacity?.map((cap, idx) => (
                <p key={idx}>{cap}</p>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  const SubcontractorTable = ({ data }) => {
    return (
      <table className='mb-2 w-full'>
        <thead>
          <tr className='page_break'>
            <th className='border p-2'>Subcontractor Name (TE-ID)</th>
            <th className='border p-2'>Address</th>
            <th className='border p-2'>Process Categories</th>
            <th className='border p-2'>Standards</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data?.map((subcontractor, index) => (
              <tr key={index} className='page_break'>
                <td className='border p-2'>
                  {subcontractor?.subcontractor_name} (
                  {subcontractor?.['te-id_or_number']})
                </td>
                <td className='border p-2'>
                  {subcontractor?.address_details?.subcontractor_address?.map(
                    (addr, idx) => (
                      <p key={idx}>{addr}</p>
                    )
                  )}
                  <p>
                    {subcontractor?.address_details?.subcontractor_town},{' '}
                    {subcontractor?.address_details?.subcontractor_postcode}
                  </p>
                  <p>
                    {
                      subcontractor?.address_details
                        ?.subcontractor_state_or_province
                    }
                    {subcontractor?.address_details
                      ?.subcontractor_country_or_area && ', '}
                    {
                      subcontractor?.address_details
                        ?.subcontractor_country_or_area
                    }
                  </p>
                </td>
                <td className='border p-2'>
                  {subcontractor?.process_categories.length &&
                    subcontractor?.process_categories?.map((cat, idx) => (
                      <p key={idx}>{cat}</p>
                    ))}
                </td>
                <td className='border p-2'>
                  {subcontractor?.standards?.length > 0 &&
                    subcontractor?.standards?.map((std, idx) => (
                      <p key={idx}>{std}</p>
                    ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )
  }

  const SubcontractorAppendix = ({ data }) => {
    return (
      <div className='mb-2 overflow-x-auto'>
        <table className='min-w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='page_break'>
              <th className='border p-2'>Subcontractor Name (TE-ID)</th>
              <th className='border p-2'>Certification Body</th>
              <th className='border p-2'>Expiry Date</th>
              <th className='border p-2'>Address</th>
              <th className='border p-2'>Process Categories</th>
              <th className='border p-2'>Standards</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((subcontractor, index) => (
                <tr key={index} className='border page_break'>
                  <td className='border p-2'>
                    {subcontractor?.subcontractor_name} (
                    {subcontractor?.['te-id_or_number']})
                  </td>
                  <td className='border p-2'>
                    {subcontractor?.certification_body}
                  </td>
                  <td className='border p-2'>{subcontractor?.expiry_date}</td>
                  <td className='border p-2'>
                    {subcontractor?.address_details?.address?.map(
                      (addr, idx) => (
                        <p key={idx}>{addr}</p>
                      )
                    )}
                    <p>
                      {subcontractor?.address_details?.town},{' '}
                      {subcontractor?.address_details?.postcode}
                    </p>
                    <p>
                      {subcontractor?.address_details?.state_or_province}
                      {subcontractor?.address_details?.country_or_area && ', '}
                      {subcontractor?.address_details?.country_or_area}
                    </p>
                  </td>
                  <td className='border p-2'>
                    {subcontractor?.process_categories?.map((cat, idx) => (
                      <p key={idx}>{cat}</p>
                    ))}
                  </td>
                  <td className='border p-2'>
                    {subcontractor?.standards?.map((std, idx) => (
                      <p key={idx}>{std}</p>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='border p-2 text-center' colSpan={6}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <div className='container flex items-end'></div>
      <div className='flex'>
        <div style={{ width: '20%' }} className='sidebar_pdf'>
          <Slidebar />
        </div>
        {console.log(data)}
        <div style={{ width: '80%' }} className='pdfDivMain relative'>
          <div className='container rounded-xl mx-auto pe-10 my-10 '>

            <button
              type='primary'
              onClick={handlePrint}
              className='submit-btn text-white w-max pdfViewBtn block ms-auto mb-10'
            >
              Download
            </button>

            <div className='pdfTable_div'>
              <table className='w-full pb-20'>
                <tbody className=''>
                  <table className='w-full border border-blue-500 scope_verification_border'>
                    <tbody className='w-full'>
                      <tr>
                        <td className='p-1'>
                          <table className='scope_verification_border_2 w-full'>
                            <tbody className='w-full'>
                              <tr>
                                <td>
                                  <table className='w-full scope_table '>
                                    <tbody className='w-full '>
                                      <tr className='page_break'>
                                        <td
                                          className='w-full px-10 pt-2'
                                          colSpan={4}
                                        >
                                          <div className='relative mb-2'>
                                            <img
                                              src={ttproLogo}
                                              alt='logo'
                                              className='scope_veriofication_logo absolute left-0'
                                              height={100}
                                              width={100}
                                            />
                                            <img
                                              src={qrCode}
                                              alt='qr-code'
                                              className='pdf_main_logo absolute right-0 pdf_main_logo__scope'
                                              height={80}
                                              width={80}
                                            />
                                            <p className='text-md pt_top text-center pb-1 pt-3'>
                                              {data?.letterhead?.name}
                                            </p>
                                            {data?.letterhead?.address?.map(
                                              (ele, ind) => {
                                                return (
                                                  <p
                                                    className={`text-md pt_top text-center max_width_scope ${ind ===
                                                        data?.letterhead?.address
                                                          ?.length -
                                                        1
                                                        ? 'pb-4 mb-1'
                                                        : ''
                                                      }`}
                                                  >
                                                    {ele}
                                                  </p>
                                                )
                                              }
                                            )}
                                            <h3 className='font-semibold text-2xl text-center uppercase pb-4'>
                                              Scope Certificate (SC)
                                            </h3>
                                            <p className='text-lg pt_top text-center font-semibold'>
                                              Scope Certificate Number{' '}
                                              <span className=''>
                                                {
                                                  updatedState
                                                    ?.scope_certificate
                                                    ?.scope_certificate_number
                                                }
                                              </span>
                                            </p>
                                            <p className='text-md pt_top text-center'>
                                              Scope Certificate Version Number
                                              scVersionNo{' '}
                                              <span className='font-semibold'>
                                                {' '}
                                                {
                                                  updatedState
                                                    ?.scope_certificate
                                                    ?.scope_certificate_version
                                                }
                                              </span>
                                            </p>
                                          </div>
                                        </td>
                                      </tr>

                                      <tr className='page_break'>
                                        <td className='w-full' colSpan={4}>
                                          <div className='relative mb-2'>
                                            <p className='text-md pt_top text-center pt-4'>
                                              <span className=''>
                                                {' '}
                                                {
                                                  updatedState
                                                    ?.scope_certificate
                                                    ?.certificate_body_name
                                                }
                                              </span>
                                            </p>
                                            <p className='text-md pt_top text-center'>
                                              certifies that
                                            </p>

                                            <h3 className='font-semibold text-2xl text-center pt-4'>
                                              {
                                                updatedState?.scope_certificate
                                                  ?.certfied_organization_name
                                              }
                                            </h3>
                                            {data?.scope_certificate
                                              ?.certified_organization_license_number && (
                                                <h3 className='font-semibold text-center text-lg my-2'>
                                                  LICENSE NUMBER{' '}
                                                  {
                                                    data?.scope_certificate
                                                      ?.certified_organization_license_number
                                                  }
                                                </h3>
                                              )}
                                            <p className='text-md pt_top text-center pt-4'>
                                              Textile Exchange-ID (TE-ID):{' '}
                                              <span className='font-semibold'>
                                                {' '}
                                                {updatedState
                                                  ?.scope_certificate?.[
                                                  'textile_exchange_id(te_id)'
                                                ] || '-'}
                                              </span>
                                            </p>
                                            <p className='text-md pt_top text-center pb-4'>
                                              {
                                                updatedState?.scope_certificate
                                                  ?.certificate_body_name
                                              }{' '}
                                              Client Number :{' '}
                                              <span className='font-semibold'>
                                                {' '}
                                                {updatedState?.scope_certificate
                                                  ?.certified_organization_license_number ||
                                                  '-'}
                                              </span>
                                            </p>
                                          </div>
                                        </td>
                                      </tr>

                                      <tr className='page_break'>
                                        <td className='w-full' colSpan={4}>
                                          <div className='relative mb-4'>
                                            <p className='text-md pt_top text-center'>
                                              {updatedState?.scope_certificate?.certified_organization_address?.length > 0 && updatedState?.scope_certificate?.certified_organization_address?.map(
                                                (address, index) => (
                                                  <div key={index}>
                                                    <span className=''>
                                                      {address}
                                                    </span>{' '}
                                                    <br />
                                                  </div>
                                                )
                                              )}
                                            </p>
                                            <p className='text-md pt_top text-center'>
                                              has been audited and found to be
                                              in conformity with the
                                            </p>
                                          </div>
                                        </td>
                                      </tr>

                                      <tr className='page_break '>
                                        <td className='w-full' colSpan={4}>
                                          <div className='relative mb-4'>
                                            {/* <h5 className='text-md pt_top text-center '>
                          <span className='font-semibold'>{updatedState?.scope_certificate?.sc_standard_program || '-'}</span> covering
                        </h5> */}

                                            {/* <p className='text-md pt_top text-center'> */}
                                            <h3 className='text-xl text-center '>
                                              {updatedState?.scope_certificate
                                                ?.sc_standard_program ||
                                                '-'}{' '}
                                              (Version{' '}
                                              {
                                                updatedState?.scope_certificate
                                                  ?.scope_certificate_version
                                              }
                                              )
                                            </h3>
                                            {/* </p> */}
                                          </div>
                                        </td>
                                      </tr>

                                      <tr className='page_break'>
                                        <td className='w-full px-3' colSpan={4}>
                                          <div className='relative mb-4'>
                                            <p className='text-md pt_top '>
                                              Products categories mentioned
                                              below (and further specified in
                                              the product appendix) conform with
                                              the standard(s):
                                            </p>
                                            <h5 className='text-md pt_top '>
                                              <span className='font-semibold'>
                                                {updatedState?.scope_certificate
                                                  ?.product_category || '-'}
                                              </span>
                                            </h5>
                                          </div>
                                        </td>
                                      </tr>

                                      <tr className='page_break'>
                                        <td
                                          className='w-full  px-3'
                                          colSpan={4}
                                        >
                                          <div className='relative mb-4'>
                                            <p className='text-md pt_top'>
                                              Process categories carried out
                                              under responsibility of the above
                                              mentioned organization for the
                                              certified products cover:
                                            </p>
                                            <h5 className='text-md pt_top '>
                                              <span className='font-semibold'>
                                                {updatedState?.scope_certificate
                                                  ?.process_category || '-'}
                                              </span>
                                            </h5>
                                            <p className='text-md pt_top'>
                                              {' '}
                                              <span>
                                                *The processes marked with an
                                                asterisk may be carried out by
                                                subcontractors.
                                              </span>
                                            </p>
                                          </div>
                                        </td>
                                      </tr>

                                      <tr className='page_break'>
                                        <td
                                          className='w-full align-baseline  px-3'
                                          colSpan={4}
                                        >
                                          <div className='relative mb-4 mt-1'>
                                            <p className='text-md pt_top text-start'>
                                              This certificate is valid until :{' '}
                                              <span className='font-semibold'>
                                                {updatedState?.scope_certificate
                                                  ?.sc_valid_untill || '-'}
                                              </span>
                                            </p>
                                            <p className='text-md pt_top text-start'>
                                              Audit criteria:{' '}
                                              <span className='font-semibold'>
                                                {updatedState?.scope_certificate
                                                  ?.sc_standard_program ||
                                                  '-'}{' '}
                                                ,{' '}
                                                {updatedState?.scope_certificate
                                                  ?.sc_standard_version || '-'}
                                              </span>
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                    <tfoot className='w-full scope_tfoot_border'>
                                      <tr className='flex page_break'>
                                        <td colSpan={4} className='pt-2 px-3'>
                                          <div className="flex w-full justify-between">
                                            <div className="w-[50%]">  <p className='font-semibold '>
                                              Place and Date of Issue (YYYY-MM-DD)
                                            </p>
                                              <p className='pe-5'>
                                                {data?.footer?.place_of_issue},{' '}
                                                {data?.footer?.date_of_issue}
                                              </p>
                                              <p className='pt-2 pe-5'>
                                                Last Updated: {data?.footer?.last_updated}
                                              </p>
                                              <p className='pt-2 pe-5'>
                                                Extended Until: {data?.footer?.extended_untill}
                                              </p>
                                              <p className='pt-2 pe-5'> Status: {data?.footer?.status}</p>
                                              <p className='pt-2 pe-5'>  {data?.footer?.name_of_authorized_signatory}</p>

                                            </div>
                                            <div className="w-[25%]">  <p className='font-semibold '>
                                              {' '}
                                              Certification Body
                                            </p>
                                              <p className='pt-2 '>
                                                {
                                                  data?.scope_certificate
                                                    ?.certificate_body_name
                                                }
                                              </p></div>
                                            <div className="w-[25%]">  <p className='font-semibold ps-5'>Standard</p></div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr className='page_break'>
                                        <td colSpan={4} className='pt-2 px-3'>
                                          <p className='page_break'>
                                            Certification Body Licensed by:{' '}
                                            {
                                              data?.scope_certificate
                                                ?.certificate_body_licensed_by
                                            }
                                          </p>
                                          <p className='pt-2 page_break'>
                                            Certification Body Accredited by:{' '}
                                            {
                                              data?.scope_certificate
                                                ?.certificate_body_accredited_by
                                            }
                                          </p>
                                          <p className='pt-2 page_break'>
                                            Inspection Body:{' '}
                                            {data?.scope_certificate?.inspection_body}
                                          </p>
                                          <p className='pt-2 page_break'>
                                            This scope certificate provides no proof that
                                            any goods delivered by its holder are Organic
                                            Content Standard (OCS) certified. Proof of
                                            Organic Content Standard (OCS) certification
                                            of goods delivered is provided by a valid
                                            transaction certificate (TC) or equivalent
                                            covering them. The issuing body may withdraw
                                            this certificate before it expires if the
                                            declared conformity is no longer guaranteed.
                                            To authenticate this certificate, please visit
                                            www.TextileExchange.org/Certificates
                                          </p>
                                          <div className='flex pb-1'>
                                            <div className='text-end'>
                                              <p className='text-md'>
                                                This electronically issued document is the
                                                valid original version.
                                              </p>
                                              <p className='text-md'>
                                                Scan QR Code to verify certificate.
                                                Authentic QR codes will link to URLs
                                                beginning with https://os.idfl.com
                                                otherwise contact IDFL.
                                              </p>
                                            </div>
                                            <div>
                                              <img
                                                src={qrCode}
                                                alt='qr-code'
                                                className='footerScopeCertificateLogo'
                                                height={80}
                                                width={80}
                                              />
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className='w-full page_break_above'>
                    <thead>
                      <tr className='page_break'>
                        <td className='w-full px-10 pt-2' colSpan={4}>
                          <div className='relative mb-2'>
                            <p className='text-md pt_top text-center pb-1 pt-3'>
                              {data?.letterhead?.name}
                            </p>
                            {data?.letterhead?.address?.map((ele, ind) => {
                              return (
                                <p
                                  className={`text-md pt_top text-center max_width_scope ${ind ===
                                      data?.letterhead?.address?.length - 1
                                      ? 'pb-4 mb-1'
                                      : ''
                                    }`}
                                >
                                  {ele}
                                </p>
                              )
                            })}
                          </div>
                        </td>
                      </tr>
                    </thead>
                    <tbody className='w-full'>
                      <tr className='page_break page_break_force'>
                        <td className='w-full align-baseline' colSpan={4}>
                          <div className='relative mb-2'>
                            <p className='text-md pt_top text-start'>
                              Under the scope of this certificate, the following
                              products are covered.
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr className='page_break'>
                        <td className='' colSpan={6}>
                          <h3 className='text-xl font-semibold mb-2 mt-2'>
                            Products Appendix{' '}
                          </h3>
                        </td>
                      </tr>

                      <DynamicTable data={updatedState?.products_appendix} />

                      <tr className='page_break'>
                        <td className='' colSpan={6}>
                          <p className='pt_top p-2'>
                            Note : *Quantification (percentages) of material
                            composition is optional. [ ] Square brackets refer
                            to certified components of a product
                          </p>
                        </td>
                      </tr>

                      <tr className='page_break'>
                        <td className='w-full align-baseline' colSpan={4}>
                          <div className='relative mt-3'>
                            <p className='text-md pt_top text-start'>
                              Under the scope of this certificate, the following
                              facilities have been audited and found to be in
                              conformity.
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr className='page_break'>
                        <td className='' colSpan={4}>
                          <h3 className='text-xl font-semibold mb-2 mt-2'>
                            Site Appendix
                          </h3>
                        </td>
                      </tr>

                      <SiteAppendixTable data={updatedState?.site_appendix} />

                      {updatedState?.associate_subcontractor_appendix.length > 0 && (<><tr className='page_break'>
                          <td className='' colSpan={4}>
                            <h3 className='text-xl font-semibold mb-2 mt-4 mb-3'>
                              Associated Subcontractor Appendix
                            </h3>
                          </td>
                        </tr>

                          <SubcontractorTable
                            data={
                              updatedState?.associate_subcontractor_appendix
                                .length > 0 &&
                              updatedState?.associate_subcontractor_appendix
                            }
                          />
                        </>)}

                      <tr className='page_break'>
                        <td className='' colSpan={4}>
                          <h3 className='text-xl font-semibold  mb-3'>
                            Independently Certified Subcontractor Appendix{' '}
                          </h3>
                        </td>
                      </tr>

                      <SubcontractorAppendix
                        data={
                          updatedState
                            ?.independently_certified_subcontractor_appendix
                            .length > 0 &&
                          updatedState?.independently_certified_subcontractor_appendix
                        }
                      />
                    </tbody>
                    <tfoot className='w-full scope_tfoot_border'>
                      <tr className='flex page_break'>
                        <td colSpan={4} className='pt-2 px-3'>
                          <div className="flex w-full justify-between">
                            <div className="w-[50%]">  <p className='font-semibold '>
                              Place and Date of Issue (YYYY-MM-DD)
                            </p>
                              <p className='pe-5'>
                                {data?.footer?.place_of_issue},{' '}
                                {data?.footer?.date_of_issue}
                              </p>
                              <p className='pe-5'>
                                Last Updated: {data?.footer?.last_updated}
                              </p>
                              <p className='pe-5'> Extended Until: {data?.footer?.extended_untill}</p>
                              <p className='pe-5'> Status: {data?.footer?.status}</p>
                              <p className='pe-5'> {data?.footer?.name_of_authorized_signatory}</p>

                            </div>
                            <div className="w-[25%]">  <p className='font-semibold '>
                              {' '}
                              Certification Body
                            </p>
                              <p className=''>
                                {
                                  data?.scope_certificate
                                    ?.certificate_body_name
                                }
                              </p></div>
                            <div className="w-[25%]">  <p className='font-semibold ps-5'>Standard</p></div>
                          </div>
                          <p className='page_break'>
                            This certificate provides no proof that any goods delivered by its holder are certified to the listed standard. Proof of certification of goods delivered is provided by a valid Transaction
                            Certificate (TC) covering them.
                          </p>
                          <div className='flex pb-1 justify-end'>
                            <div className='text-end'>
                              <p className='text-md'>
                                This electronically issued document is the valid original version.
                              </p>
                              <p className='text-md'>
                                TE-ID {data?.["scope_certificate"]?.["textile_exchange_id(te_id)"]}
                              </p>
                            </div>
                            <div>
                              <img
                                src={qrCode}
                                alt='qr-code'
                                className='footerScopeCertificateLogo'
                                width={80}
                                height={80}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </tbody>

                {/* ------------------------------ Updated footer ---------------------------------------- */}

                {/* </div> */}
              </table>
              {/* </div> */}


            </div>

            {/* <div className='w-full scope_tfoot_border footerTfoot'>
                <div className='flex w-full justify-between'>
                  <div className='w-[50%]'>
                    {' '}
                    <p className='font-semibold '>
                      Place and Date of Issue (YYYY-MM-DD)
                    </p>
                    <p className='pe-5'>
                      {data?.footer?.place_of_issue},{' '}
                      {data?.footer?.date_of_issue}
                    </p>
                    <p className='pe-5'>
                      Last Updated: {data?.footer?.last_updated}
                    </p>
                  </div>
                  <div className='w-[25%]'>
                    {' '}
                    <p className='font-semibold '> Certification Body</p>
                    <p className=''>
                      {data?.scope_certificate?.certificate_body_name}
                    </p>
                  </div>
                  <div className='w-[25%]'>
                    {' '}
                    <p className='font-semibold ps-5'>Standard</p>
                  </div>
                </div>
                <p className='page_break'>
                  Certification Body Licensed by:{' '}
                  {data?.scope_certificate?.certificate_body_licensed_by}
                </p>
                <p className='page_break'>
                  Certification Body Accredited by:{' '}
                  {data?.scope_certificate?.certificate_body_accredited_by}
                </p>
                <p className='page_break'>
                  Inspection Body: {data?.scope_certificate?.inspection_body}
                </p>
                <p className='page_break'>
                  This scope certificate provides no proof that any goods
                  delivered by its holder are Organic Content Standard (OCS)
                  certified. Proof of Organic Content Standard (OCS)
                  certification of goods delivered is provided by a valid
                  transaction certificate (TC) or equivalent covering them. The
                  issuing body may withdraw this certificate before it expires
                  if the declared conformity is no longer guaranteed. To
                  authenticate this certificate, please visit
                  www.TextileExchange.org/Certificates
                </p>
                <div className='flex pb-1'>
                  <div className='text-end'>
                    <p className='text-md'>
                      This electronically issued document is the valid original
                      version.
                    </p>
                    <p className='text-md'>
                      Scan QR Code to verify certificate. Authentic QR codes
                      will link to URLs beginning with https://os.idfl.com
                      otherwise contact IDFL.
                    </p>
                  </div>
                  <div>
                    <img
                      src={qrCode}
                      alt='qr-code'
                      className='footerScopeCertificateLogo'
                      width={80}
                      height={80}
                    />
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ScopeVerificationView
