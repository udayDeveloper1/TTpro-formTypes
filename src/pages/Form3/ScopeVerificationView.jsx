
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
  const { id } = params;

  const [updatedState, setUpdatedState] = useState({
    scope_certificate: data.scope_certificate || "",
    associate_subcontractor_appendix: data.associate_subcontractor_appendix || "",
    footer: data.footer || "",
    independently_certified_subcontractor_appendix: data.independently_certified_subcontractor_appendix || "",
    info_above_site_index: data.info_above_site_index || "",
    products_appendix: data.products_appendix || "",
    site_appendix: data.site_appendix || "",
  });

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
        console.log('scopverificationView', res);

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
      scope_certificate: data.scope_certificate || "",
      associate_subcontractor_appendix: data.associate_subcontractor_appendix || "",
      footer: data.footer || "",
      independently_certified_subcontractor_appendix: data.independently_certified_subcontractor_appendix || "",
      info_above_site_index: data.info_above_site_index || "",
      products_appendix: data.products_appendix || "",
      site_appendix: data.site_appendix || "",
    });
  }, [data]);

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
  console.log('found api thrugh updatedState', updatedState?.independently_certified_subcontractor_appendix);

  const DynamicTable = ({ data }) => {
    if (!data || data.length === 0) return <p>No data available</p>;
    // Extract headers dynamically from object keys
    const headers = Object.keys(data[0]);
    return (
      <div className='mb-3'>
        <thead>
          <tr className="page_break">
            {headers.map((header, index) => (
              <th key={index} className="border font-semibold p-1">
                {header.replace(/_/g, " ").toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border border-gray-300 page_break">
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="border-gray-100 border p-2 " colSpan={1}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </div>
    );
  };

  const SiteAppendixTable = ({ data }) => {
    return (
      <div className='mb-2 mt-2'>
        <thead>
          <tr className="">
            <th className="border p-2">Facility Name (TE-ID)</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Process Categories</th>
            <th className="border p-2">Standards</th>
            <th className="border p-2">Farm Capacity</th>
          </tr>
        </thead>
        <tbody>
          <tr className='page_break'>
            <td className="border p-2" >
              {data?.facility_name} ({data?.["te-id_or_number"]})
            </td>
            <td className="border p-2">
              {data?.address_details?.facility_address?.map((addr, idx) => (
                <p key={idx}>{addr}</p>
              ))}
              <p>{data?.address_details?.facility_town}, {data?.address_details?.facility_postcode}</p>
              <p>
                {data?.address_details?.facility_state_or_province}
                {data?.address_details?.facility_country_or_area && ", "}
                {data?.address_details?.facility_country_or_area}
              </p>
            </td>
            <td className="border p-2 ">
              {data?.process_categories?.map((cat, idx) => (
                <p key={idx}>{cat}</p>
              ))}
            </td>
            <td className="border p-2">
              {data?.standards?.map((std, idx) => (
                <p key={idx}>{std}</p>
              ))}
            </td>
            <td className="border p-2" >
              {data?.farm_capacity?.map((cap, idx) => (
                <p key={idx}>{cap}</p>
              ))}
            </td>
          </tr>
        </tbody>
      </div>
    );
  };

  const SubcontractorTable = ({ data }) => {
    return (
      <div className="mb-2">
        <thead>
          <tr className="">
            <th className="border p-2" colSpan={3}>Subcontractor Name (TE-ID)</th>
            <th className="border p-2" colSpan={3}>Address</th>
            <th className="border p-2" colSpan={3}>Process Categories</th>
            <th className="border p-2" colSpan={3}>Standards</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data?.map((subcontractor, index) => (
            <tr key={index}>
              <td className="border p-2" colSpan={3}>
                {subcontractor?.subcontractor_name} ({subcontractor?.["te-id_or_number"]})
              </td>
              <td className="border p-2" colSpan={3}>
                {subcontractor?.address_details?.subcontractor_address?.map((addr, idx) => (
                  <p key={idx}>{addr}</p>
                ))}
                <p>{subcontractor?.address_details?.subcontractor_town}, {subcontractor?.address_details?.subcontractor_postcode}</p>
                <p>
                  {subcontractor?.address_details?.subcontractor_state_or_province}
                  {subcontractor?.address_details?.subcontractor_country_or_area && ", "}
                  {subcontractor?.address_details?.subcontractor_country_or_area}
                </p>
              </td>
              <td className="border p-2" colSpan={3}>
                {subcontractor?.process_categories.length && subcontractor?.process_categories?.map((cat, idx) => (
                  <p key={idx}>{cat}</p>
                ))}
              </td>
              <td className="border p-2" colSpan={3}>
                {subcontractor?.standards?.length > 0 && subcontractor?.standards?.map((std, idx) => (
                  <p key={idx}>{std}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </div>
    );
  };

  const SubcontractorAppendix = ({ data }) => {
    return (
      <div className="mb-2 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="">
              <th className="border p-2" colSpan={2}>Subcontractor Name (TE-ID)</th>
              <th className="border p-2">Certification Body</th>
              <th className="border p-2">Expiry Date</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Process Categories</th>
              <th className="border p-2">Standards</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data?.map((subcontractor, index) => (
                <tr key={index} className="border">
                  <td className="border p-2" colSpan={2}>
                    {subcontractor?.subcontractor_name} ({subcontractor?.["te-id_or_number"]})
                  </td>
                  <td className="border p-2">{subcontractor?.certification_body}</td>
                  <td className="border p-2">{subcontractor?.expiry_date}</td>
                  <td className="border p-2">
                    {subcontractor?.address_details?.address?.map((addr, idx) => (
                      <p key={idx}>{addr}</p>
                    ))}
                    <p>{subcontractor?.address_details?.town}, {subcontractor?.address_details?.postcode}</p>
                    <p>
                      {subcontractor?.address_details?.state_or_province}
                      {subcontractor?.address_details?.country_or_area && ", "}
                      {subcontractor?.address_details?.country_or_area}
                    </p>
                  </td>
                  <td className="border p-2">
                    {subcontractor?.process_categories?.map((cat, idx) => (
                      <p key={idx}>{cat}</p>
                    ))}
                  </td>
                  <td className="border p-2">
                    {subcontractor?.standards?.map((std, idx) => (
                      <p key={idx}>{std}</p>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan={7}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

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

            <div className='pdfTable_div '>
              {/* <div class="certificate-container"> */}
              <table className='w-full'>
                {/* <div class="certificate-content"> */}
                <tbody className=''>
                  {/* <tr>
                    <td>
                      <p className='ps-3 pt-1 '>
                        CB’s letterhead containing name and address
                      </p>
                    </td>
                  </tr> */}

                  <tr className='page_break'>
                    <td className='w-full' colSpan={4}>
                      <div className='relative mb-4'>
                        <img
                          src={ttproLogo}
                          alt='logo'
                          className='pdf_main_logo absolute left-0'
                        />
                        <img
                          src={qrCode}
                          alt='qr-code'
                          className='pdf_main_logo absolute right-0'
                        />
                        <h1 className='font-semibold text-2xl text-center'>
                          Scope Certificate (SC)
                        </h1>
                        <p className='text-md pt_top text-center'>
                          Scope Certificate Number{' '}
                          <span className='font-semibold'>{updatedState?.scope_certificate?.scope_certificate_number}</span>
                        </p>
                        <p className='text-md pt_top text-center'>
                          Scope Certificate Version Number scVersionNo <span className='font-semibold'> {updatedState?.scope_certificate?.scope_certificate_version}</span>
                        </p>
                        {/* <h2 className='font-semibold text-md pt-2 text-center'>
                          {updatedState?.scope_certificate?.scope_certificate_version}
                        </h2> */}
                      </div>
                    </td>
                  </tr>

                  <tr className='page_break'>
                    <td className='w-full' colSpan={4}>
                      <div className='relative mb-4'>

                        <p className='text-md pt_top text-center'>
                          <span className='font-semibold'> {updatedState?.scope_certificate?.certificate_body_name}</span>
                        </p>
                        <p className='text-md pt_top text-center'>
                          certifies that
                        </p>

                        <h1 className='font-semibold text-2xl text-center mt-3'>
                          {updatedState?.scope_certificate?.certfied_organization_name}
                        </h1>
                        {
                          updatedState?.scope_certificate?.certfied_organization_name_native && <h1 className='font-semibold  text-center text-2xl'>
                            {updatedState?.scope_certificate?.certfied_organization_name_native}
                          </h1>
                        }
                        <p className='text-md pt_top text-center'>
                          Textile Exchange-ID (TE-ID): <span className='font-semibold'> {updatedState?.scope_certificate?.["textile_exchange_id(te_id)"] || '-'}</span>
                        </p>
                        <p className='text-md pt_top text-center'>
                          {updatedState?.scope_certificate?.certificate_body_name} Client Number : <span className='font-semibold'> {updatedState?.scope_certificate?.certified_organization_license_number || '-'}</span>
                        </p>
                      </div>
                    </td>
                  </tr>

                  <tr className='page_break'>
                    <td className='w-full' colSpan={4}>
                      <div className='relative mb-4'>

                        <p className='text-md pt_top text-center'>
                          {updatedState?.scope_certificate?.certified_organization_address?.map((address, index) => (
                            <div key={index}>
                              <span className='font-semibold'>{address}</span> <br />
                            </div>
                          ))}
                          {/* <span className='font-semibold'>certifiedOrganizationAddress2</span> <br />
                          <span className='font-semibold'>certifiedOrganizationAddress3</span> <br /> */}
                        </p>
                        <p className='text-md pt_top text-center'>
                          <span className=''>{updatedState?.scope_certificate?.certificate_body_name} certifiedOrganizationTown</span> , <span className=''>certifiedOrganizationPostcode</span>
                        </p>
                        <p className='text-md pt_top text-center'>
                          <span className=''>certifiedOrganizationStateOrProvince</span> , <span className=''>{updatedState?.scope_certificate?.certified_organization_country_or_area}</span>
                        </p>
                        <p className='text-md pt_top text-center'>
                          has been audited and found to be in conformity with the
                        </p>
                      </div>
                    </td>
                  </tr>


                  <tr className='page_break'>
                    <td className='w-full' colSpan={4}>
                      <div className='relative mb-4'>

                        {/* <h3 className='text-md pt_top text-center '>
                          <span className='font-semibold'>{updatedState?.scope_certificate?.sc_standard_program || '-'}</span> covering
                        </h3> */}

                        {/* <p className='text-md pt_top text-center'> */}
                        <h1 className='font-semibold text-2xl text-center'>
                          {updatedState?.scope_certificate?.sc_standard_program || '-'} (Version {updatedState?.scope_certificate?.scope_certificate_version})
                        </h1>
                        {/* </p> */}
                      </div>
                    </td>
                  </tr>

                  <tr className='page_break'>
                    <td className='w-full' colSpan={4}>
                      <div className='relative mb-4'>
                        <p className='text-md pt_top text-center'>
                          Product categories mentioned below (and further specified in the product appendix) conform with the standard(s):
                        </p>
                        <h3 className='text-md pt_top text-center '>
                          <span className='font-semibold'>{updatedState?.scope_certificate?.product_category || '-'}</span>
                        </h3>
                      </div>
                    </td>
                  </tr>

                  <tr className='page_break'>
                    <td className='w-full' colSpan={4}>
                      <div className='relative mb-4'>
                        <p className='text-md pt_top text-center'>
                          Process categories carried out under responsibility of the above mentioned organization for the certified products cover:
                        </p>
                        <h3 className='text-md pt_top text-center '>
                          <span className='font-semibold'>{updatedState?.scope_certificate?.process_category || '-'}</span>
                        </h3>
                        <p className='text-md pt_top text-center'> <span>*The processes marked with an asterisk may be carried out by subcontractors.</span></p>
                      </div>
                    </td>
                  </tr>

                  <tr className='page_break'>
                    <td className='w-full align-baseline' colSpan={4}>
                      <div className='relative mb-4'>
                        <p className='text-md pt_top text-start'>
                          This certificate is valid until :  <span className='font-semibold'>{updatedState?.scope_certificate?.sc_valid_untill || '-'}</span>
                        </p>
                        <p className='text-md pt_top text-start'>
                          Audit criteria:  <span className='font-semibold'>{updatedState?.scope_certificate?.sc_standard_program || '-'} , {updatedState?.scope_certificate?.sc_standard_version || '-'}</span>
                        </p>
                      </div>
                    </td>
                  </tr>

                  {/* ------------------------------------ Hemang code -------------------------------------- */}


                  {/* ------------------------------------------------------------- Products Appendix ---------------------------------------------------- */}

                  <tr className='page_break'>
                    <td className='w-full align-baseline' colSpan={4}>
                      <div className='relative mb-4 mt-3'>
                        <p className='text-md pt_top text-start'>
                          Under the scope of this certificate, the following products are covered.
                        </p>
                      </div>
                    </td>
                  </tr>

                  <tr className='page_break'>
                    <td className='' colSpan={4}>
                      <h1 className="text-xl font-semibold mb-2 mt-2">Products Appendix </h1>
                    </td>
                  </tr>

                  <DynamicTable data={updatedState?.products_appendix} />

                  <tr className='page_break'>
                    <td className='' colSpan={4}>
                      <p className='pt_top p-2'>Note : *Quantification (percentages) of material composition is optional. [ ] Square brackets refer to certified components of a product</p>
                    </td>
                  </tr>


                  {/* ------------------------------------------------------------- Site Appendix ---------------------------------------------------- */}

                  <tr className='page_break'>
                    <td className='w-full align-baseline' colSpan={4}>
                      <div className='relative mt-3'>
                        <p className='text-md pt_top text-start'>
                          Under the scope of this certificate, the following facilities have been audited and found to be in conformity.
                        </p>
                      </div>
                    </td>
                  </tr>

                  <tr className='page_break'>
                    <td className='' colSpan={4}>
                      <h1 className="text-xl font-semibold mb-2 mt-2">Site Appendix</h1>
                    </td>
                  </tr>

                  <SiteAppendixTable data={updatedState?.site_appendix} />

                  {/* ------------------------------------------------------------- Site Appendix ---------------------------------------------------- */}

                  <tr className='page_break'>
                    <td className='' colSpan={4}>
                      <h1 className="text-xl font-semibold mb-2 mt-4 mb-3">Associated Subcontractor Appendix</h1>
                    </td>
                  </tr>

                  <SubcontractorTable data={updatedState?.associate_subcontractor_appendix.length > 0 && updatedState?.associate_subcontractor_appendix} />
             
                  {/* ------------------------------------------------------------- Site Appendix ---------------------------------------------------- */}

                  <tr className='page_break'>
                    <td className='' colSpan={4}>
                      <h1 className="text-xl font-semibold  mb-3">Independently Certified Subcontractor Appendix </h1>
                    </td>
                  </tr>

                  <SubcontractorAppendix data={updatedState?.independently_certified_subcontractor_appendix.length > 0 && updatedState?.independently_certified_subcontractor_appendix} />
                    
                </tbody>

                {/* ------------------------------ Updated footer ---------------------------------------- */}

                {/* <tfoot className='w-full '>
                  <tr className='w-full '>
                    <td className='w-full' colSpan={4}>
                      <div className='container p-2'>
                        <p className='ps-3 pt-2'>
                          Place and Date of Issue (YYYY-MM-DD)
                        </p>
                        <p className='ps-3 '>
                          {data?.extracted_data?.footer?.tc_place_of_issue}{' '}
                          {data?.extracted_data?.footer?.tc_date_of_issue?.includes(
                            'NaN'
                          )
                            ? ''
                            : data?.extracted_data?.footer?.tc_date_of_issue}
                        </p>
                        <p className='ps-3 '>
                          Status: {data?.extracted_data?.footer?.tc_status}
                        </p>
                        <p className='ps-3 '>
                          Last Updated:{' '}
                          {data?.extracted_data?.footer?.tc_last_updated?.includes(
                            'NaN'
                          )
                            ? ''
                            : data?.extracted_data?.footer?.tc_last_updated}
                        </p>
                        <p className='ps-3 pb-2'>
                          {
                            data?.extracted_data?.footer
                              ?.name_of_authorized_signatory
                          }
                        </p>
                      </div>
                    </td>
                  </tr>
                </tfoot> */}

                <tfoot className='w-full '>
                  <tr className='w-full'>
                    <td className='w-full' colSpan={4}>
                      <div className='container flex justify-between items-center mb-2 mt-4'>
                        <div>
                          <p className='text-md pt_top text-start'>
                            Place and Date of Issue  <span className='font-semibold'> ( {updatedState?.footer?.date_of_issue || '-'} )</span>
                          </p>
                          <p className='text-md pt_top text-start'>
                            scPlaceOfIssue : <span className='font-semibold'>{updatedState?.footer?.place_of_issue || '-'}</span>
                          </p>
                          <p className='text-md pt_top text-start'>
                            scDateOfIssue : <span className='font-semibold'>{updatedState?.footer?.date_of_issue || '-'}</span>
                          </p>
                          <p className='text-md pt_top text-start'>
                            Last Updated :  <span className='font-semibold'>{updatedState?.footer?.last_updated || '-'}</span>
                          </p>
                          <p className='text-md pt_top text-start'>
                            Extended Until : <span className='font-semibold'>{updatedState?.footer?.extended_untill || '-'}</span>
                          </p>
                          <p className='text-md pt_top text-start'>
                            Status : <span className='font-semibold'> {updatedState?.footer?.status || '-'}</span>
                          </p>
                          <p className='text-md pt_top text-start'>
                            <h1 className='text-l text-start '>
                              Signature of Authorized Person :
                            </h1>
                            <h1 className='text-l text-start mt-2'>
                              <span className='font-semibold'>{updatedState?.footer?.name_of_authorized_signatory || '-'}</span>
                            </h1>
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {/* <tr className='w-full '>
                    <td className='w-full' colSpan={4}>
                      <div className='container p-2'>
                        <p className='ps-3 pt-2'>
                          The electronically issued document is the valid original version :  <span className='font-semibold'>{updatedState?.scope_certificate?.scope_certificate_version || '-'} </span>
                        </p>
                        <p className='ps-3 pt-2'>
                          TE-ID :  <span className='font-semibold'>{updatedState?.scope_certificate?.["textile_exchange_id(te_id)"] || '-'} </span>
                        </p>
                      </div>
                    </td>
                  </tr> */}
                </tfoot>
                {/* </div> */}

              </table>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScopeVerificationView
