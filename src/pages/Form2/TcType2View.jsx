import React, { useEffect, useState, useRef } from 'react'
import { form1List, form2List } from '../../api/Form1Api'
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

const TcType2View = () => {
  const [data, setData] = useState([])
  const refs = useRef({})
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params

  const getList = async () => {
    try {
      // Fetch data
      const response = await form2List(id)
      if (response?.status_code === 200 || response?.status_code === 201) {
        let res = [response?.data]
        setData(res)
      }else{
              toast.error('Internal server error. Please try again later.')
      }


      // Log the final transformed response
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const handlePdfDownload = async id => {
    const element = refs.current[id]?.current

    if (!element) {
      console.error('Element not found for ID:', id)
      return
    }

    // Temporarily hide button section
    const buttonSection = element.querySelector('.button_section')
    if (buttonSection) buttonSection.style.display = 'none'

    // Render the element to a canvas
    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    // Initialize jsPDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth() // A4 width: 210mm
    const pageHeight = pdf.internal.pageSize.getHeight() // A4 height: 297mm

    // Calculate canvas dimensions and scaling
    const imgWidth = canvas.width / 2 // Scale factor matches html2canvas scale
    const imgHeight = canvas.height / 2
    const scaleFactor = pageWidth / imgWidth
    const scaledHeight = imgHeight * scaleFactor
    const contentHeight = scaledHeight // Total height of the content
    let yOffset = 0

    // Add content to the PDF, page by page
    while (yOffset < imgHeight) {
      const pageCanvas = document.createElement('canvas')
      pageCanvas.width = canvas.width
      pageCanvas.height = Math.min(
        canvas.height - yOffset,
        (pageHeight / scaleFactor) * 2
      ) // Divide height for 2x scale

      const context = pageCanvas.getContext('2d')
      context.drawImage(
        canvas,
        0,
        yOffset * 2, // Offset for original canvas
        canvas.width,
        pageCanvas.height,
        0,
        0,
        pageCanvas.width,
        pageCanvas.height
      )

      const pageData = pageCanvas.toDataURL('image/png')
      if (yOffset > 0) pdf.addPage()
      pdf.addImage(pageData, 'PNG', 0, 0, pageWidth, pageHeight)

      yOffset += pageHeight / scaleFactor // Move to the next portion
    }

    // Generate the PDF Blob
    const pdfBlob = pdf.output('blob')
    const blobUrl = URL.createObjectURL(pdfBlob)

    // Navigate to PDF review page
    navigate('/PdfReview', { state: { pdfUrl: blobUrl } })

    // Restore button section visibility
    if (buttonSection) buttonSection.style.display = 'block'
  }

  return (
 <>  <div className='flex'>   <div style={{ width: "20%" }}>  <Slidebar /></div>      <div style={{ width: "80%" }}>   <div className='container formList-cont border rounded-xl mx-auto  my-10 '>
      <div className='card card_list'>
        {data?.map((ele, ind) => {
          const recordId = ele.id || ind
          refs.current[recordId] = refs.current[recordId] || React.createRef()
          console.log(ele)

          return (
            <div
              key={ind}
              ref={refs.current[recordId]}
              className='card_item flex flex-col gap-3 rounded-xl p-5'
            >
              <div className='w-full flex justify-between button_section pb-10'>
                <button
                  className='btn flex items-center text-white py-2 px-4 rounded-lg font-semibold   transition-all download_pdf_btn'
                  onClick={e => handlePdfDownload(recordId)}
                >
                  Download
                  <FaFilePdf className='ms-2' />
                </button>
              </div>

              <hr className='py-5' />

              <div className='w-full section1 flex flex-wrap justify-between '>
                <h3 className='text-2xl w-full  CertifiedInput p-3'>
                  {ele.file_name}
                </h3>
                <div className='w-full flex p-2 justify-between'>
                  <div className='w-full flex flex-col md:w-[49%] justify-center '>
                    <div className='flex flex-wrap '>
                      <div className='w-full flex flex-col'>
                        <div className='flex '>
                          <h4 className='text-xl keyName pe-4 w-[30%] font-bold'>
                            File Name{' '}
                          </h4>
                          <p className='text-xl keyValue w-[70%]'>
                            {ele.file_name}
                          </p>
                        </div>
                        <div className='flex'>
                          <h4 className='text-xl keyName pe-4  w-[30%] font-bold'>
                            id:{' '}
                          </h4>
                          <p className='text-xl keyValue  w-[70%]'>{ele.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='w-full md:w-[49%] flex justify-center  flex-col'>
                    <div className='flex flex-wrap '>
                      <div className='w-full'>
                        <div className='flex'>
                          <h4 className='text-xl keyName pe-4 w-[30%] font-bold'>
                            created At:
                          </h4>
                          <p className='text-xl keyValue w-[70%]'>
                            {moment(ele.created_at).format(
                              'DD-MM-YYYY hh:mm A'
                            )}
                          </p>
                        </div>
                        <div className='flex'>
                          <h4 className='text-xl pe-4 w-[30%] font-bold'>
                            updated_at:{' '}
                          </h4>
                          <p className='text-xl w-[70%]'>
                            {moment(ele.updated_at).format(
                              'DD-MM-YYYY hh:mm A'
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full flex justify-between flex-wrap'>
                <div className='w-full md:w-[49%]'>
                  <div className='flex section1 flex-wrap pb-5'>
                    <h3 className='text-2xl w-full  CertifiedInput p-3'>
                      Additional declaration by the certification body:
                    </h3>
                    <div className='p-2'>
                      <div className='flex'>
                        <h4 className='font-bold text-xl pe-4'>Issue date: </h4>
                        <p className='text-xl'>
                          {
                            ele.extracted_data
                              .additional_declaration_by_the_certification_body
                              .issue_date
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='font-bold text-xl pe-4'>
                          this is to cerify that:{' '}
                        </h4>
                        <ul className='text-xl'>
                          {ele.extracted_data.additional_declaration_by_the_certification_body.this_is_to_cerify_that?.map(
                            (elem, index) => {
                              return <li key={index}> {elem}</li>
                            }
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full md:w-[49%]'>
                  <div className='flex section1  flex-wrap pb-5'>
                    <h3 className='text-2xl w-full  CertifiedInput p-3'>
                      Certification Body:
                    </h3>
                    <div className='p-2'>
                      <div className='flex  '>
                        <h4 className='font-bold text-xl pe-4'>
                          Certification Name:{' '}
                        </h4>
                        <p className='text-xl'>
                          {ele.extracted_data.certification_body.name}
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='font-bold text-xl pe-4'>
                          Certification address:{' '}
                        </h4>
                        <p className='text-xl'>
                          {ele.extracted_data.certification_body.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-wrap'>
                <div className='w-full flex justify-between'>
                  <div className='flex flex-wrap pb-5 w-[49%]'>
                    <h3 className='text-2xl w-full  CertifiedInput p-3'>
                      Buyer:
                    </h3>
                    <div className='flex section1 flex-row justify-between p-3  w-full flex-wrap'>
                      <div className='flex w-full'>
                        <h4 className='text-xl keyName pe-4 font-bold'>
                          PAN:{' '}
                        </h4>
                        <p className='text-xl keyValue '>
                          {ele?.extracted_data?.buyer?.PAN}
                        </p>
                      </div>
                      <div className='flex w-full'>
                        <h4 className='text-xl keyName pe-4 font-bold'>
                          Address:{' '}
                        </h4>
                        <p className='text-xl keyValue  w-[70%]'>
                          {ele?.extracted_data?.buyer?.address}
                        </p>
                      </div>
                      <div className='flex  w-full'>
                        <h4 className='font-bold text-xl pe-4'>Name: </h4>
                        <p className='text-xl'>
                          {ele.extracted_data.buyer.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-wrap pb-5 w-[49%]'>
                    <h3 className='text-2xl w-full  CertifiedInput p-3'>
                      Seller:
                    </h3>
                    <div className='flex section1 flex-row justify-between p-3  w-full  flex-wrap'>
                      <div className='flex w-full'>
                        <h4 className='text-xl keyName pe-4 font-bold'>PAN:</h4>
                        <p className='text-xl keyValue '>
                          {ele?.extracted_data?.buyer?.PAN}
                        </p>
                      </div>
                      <div className='flex w-full'>
                        <h4 className='text-xl keyName pe-4 font-bold'>
                          Address:
                        </h4>
                        <p className='text-xl keyValue  w-[70%]'>
                          {ele?.extracted_data?.buyer?.address}
                        </p>
                      </div>
                      <div className='flex  w-full'>
                        <h4 className='font-bold text-xl pe-4'>Name: </h4>
                        <p className='text-xl'>
                          {ele.extracted_data.buyer.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full flex flex-wrap'>
                <div className='w-full flex justify-between'>
                  <div className='flex flex-wrap pb-5 w-[49%]'>
                    <h3 className='text-2xl w-full  CertifiedInput p-3'>
                      Name and Signature of the Authorised Person:
                    </h3>
                    <div className='flex section1 flex-row justify-between p-3  w-full flex-wrap'>
                      <div className='flex w-full'>
                        <h4 className='text-xl keyName pe-4 font-bold'>
                          Name:{' '}
                        </h4>
                        <p className='text-xl keyValue '>
                          {
                            ele?.extracted_data
                              ?.name_and_signature_of_the_authorised_person
                              ?.name
                          }
                        </p>
                      </div>
                      <div className='flex w-full'>
                        <h4 className='text-xl keyName pe-4 font-bold'>
                          Position:{' '}
                        </h4>
                        <p className='text-xl keyValue  w-[70%]'>
                          {
                            ele?.extracted_data
                              ?.name_and_signature_of_the_authorised_person
                              ?.position
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-wrap pb-5 w-[49%]'>
                    <h3 className='text-2xl w-full  CertifiedInput p-3'>
                      Places:
                    </h3>
                    <div className='flex section1 flex-row justify-between p-3  w-full  flex-wrap'>
                      <div className='flex w-full'>
                        <h4 className='text-xl keyName pe-4 font-bold'>
                          Place of Destination:
                        </h4>
                        <p className='text-xl keyValue '>
                          {ele?.extracted_data?.place_of_destination}
                        </p>
                      </div>
                      <div className='flex w-full'>
                        <h4 className='text-xl keyName pe-4 font-bold'>
                          Place of Dispatch:
                        </h4>
                        <p className='text-xl keyValue  w-[70%]'>
                          {ele?.extracted_data?.place_of_dispatch}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full certifiedProduct  flex flex-wrap'>
                <h3 className='text-2xl certifiedProductHeading p-3 w-full'>
                  Certified Products:
                </h3>
                <div className='flex w-full flex-wrap'>
                  <div className='pb-5 w-full'>
                    <div className='p-3 overflow-x-auto'>
                      <table className='w-full border border-gray-300 text-left'>
                        <thead className='bg-gray-100 border-b border-gray-300'>
                          <th className='text-xl'>NPOP Organic Compliance C1/C2/C3/organic</th>
                          <th className='text-xl'>Hs Code</th>
                          <th className='text-xl'>Lot No</th>
                          <th className='text-xl'>Packing Details</th>
                          <th className='text-xl'>Product Name</th>
                          <th className='text-xl'>Quantity in MT</th>
                          <th className='text-xl'>Trade Name</th>
                        </thead>
                        <tbody>
                          {ele.extracted_data.product_details.map(
                            (elem, indd) => {
                              return (
                                <tr
                                  className='bg-gray-100 border-b border-gray-300'
                                  key={indd}
                                >
                                  <td className='p-1 font-medium py-3'>
                                    {
                                      elem?.[
                                        'NPOP_organic_compliance_C1/C2/C3/organic'
                                      ]
                                    }
                                  </td>
                                  <td className='p-1 font-medium py-3'>
                                    {elem.hs_code}
                                  </td>
                                  <td className='p-1 font-medium py-3'>
                                    {elem.lot_no}
                                  </td>
                                  <td className='p-1 font-medium py-3'>
                                    {elem.packing_details?.map(
                                      (element, indd) => {
                                        return (
                                          <>
                                            <p className='ind'>{element}</p>
                                          </>
                                        )
                                      }
                                    )}
                                  </td>
                                  <td className='p-1 font-medium py-3'>
                                    {elem.product_name}
                                  </td>
                                  <td className='p-1 font-medium py-3'>
                                    {elem.quantity_in_MT}
                                  </td>
                                  <td className='p-1 font-medium py-3'>
                                    {elem.trade_name?.map((element, indd) => {
                                      return (
                                        <>
                                          <p className='ind'>{element}</p>
                                        </>
                                      )
                                    })}
                                  </td>
                                </tr>
                              )
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full section1 flex flex-wrap justify-between '>
                <h3 className='text-2xl w-full  CertifiedInput p-3'>
                  Transaction Details
                </h3>
                <div className='w-full p-2'>
                  <div className='flex flex-wrap '>
                    <div className='w-full flex flex-col'>
                      <div className='flex '>
                        <h4 className='text-xl keyName pe-4 w-[30%] font-bold'>
                          Transaction Certificate Number
                        </h4>
                        <p className='text-xl keyValue w-[70%]'>
                          {ele?.extracted_data?.transaction_certificate_number}
                        </p>
                      </div>
                    </div>
                  </div>
                  <h4>Invoice Details</h4>
                  <table className='w-full border border-gray-300 text-left'>
                    <thead className='bg-gray-100 border-b border-gray-300'>
                      <th>Invoice Details</th>
                      <th>Order or Contact Number</th>
                      <th>Transport Details</th>
                    </thead>
                    <tbody>
                      <tr className='bg-gray-100 border-b border-gray-300'>
                        <td className='p-1 font-medium py-3'>
                          <table className='border'>
                            <thead>
                              <tr>
                                <th className='border'>Invoice Date</th>
                                <th className='border'>Invoice Number</th>
                                <th className='border'>S No.</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ele?.extracted_data?.transaction_details?.invoice_details?.map(
                                (elem, indd) => {
                                  return (
                                    <tr key={indd}>
                                      <td className='border'>
                                        {elem?.invoice_date}
                                      </td>
                                      <td className='border'>
                                        {elem?.invoice_number}
                                      </td>
                                      <td className='border'>{elem?.s_no}</td>
                                    </tr>
                                  )
                                }
                              )}
                            </tbody>
                          </table>
                        </td>
                        <td className='p-1 font-medium py-3'>
                          {
                            ele?.extracted_data?.transaction_details
                              ?.order_or_contact_number
                          }
                        </td>
                        <td className='p-1 font-medium py-3'>
                          <table className='border'>
                            <thead>
                              <tr>
                                <th className='border'>Date of Transport</th>
                                <th className='border'>Mode of Transport</th>
                                <th className='border'>
                                  Transport Document Numbers
                                </th>
                                <th className='border'>
                                  Vehicle Number or bull cart or air or others
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {ele?.extracted_data?.transaction_details?.transport_details?.map(
                                (elem, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className='border'>
                                        {elem?.date_of_transport}
                                      </td>
                                      <td className='border'>
                                        {elem?.mode_of_transport}
                                      </td>
                                      <td className='border'>
                                        {elem?.transport_document_numbers}
                                      </td>
                                      <td className='border'>
                                        <ul>
                                          {elem?.vehicle_number_or_bull_cart_or_air_or_others?.map(
                                            (element, index) => {
                                              return (
                                                <li key={index}>{element}</li>
                                              )
                                            }
                                          )}
                                        </ul>
                                      </td>
                                    </tr>
                                  )
                                }
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className='w-full certifiedProduct  flex flex-wrap'>
                <h3 className='text-2xl certifiedProductHeading p-3 w-full'>
                  Seller of Individual/ICS
                </h3>
                <div className='flex w-full flex-wrap'>
                  <div className='pb-5 w-full'>
                    <div className='p-3 overflow-x-auto'>
                      <table className='w-full border border-gray-300 text-left'>
                        <thead className='bg-gray-100 border-b border-gray-300'>
                          <th>PAN</th>
                          <th>Address</th>
                          <th>Name</th>
                        </thead>
                        <tbody>
                          <td>
                          {console.log(ele?.extracted_data)}
                          
                            {ele?.extracted_data?.["seller_of_individual/ICS"]?.PAN}
                          </td>
                          <td>
                            {ele?.extracted_data?.["seller_of_individual/ICS"]?.address}
                          </td>
                          <td>
                            {ele?.extracted_data?.["seller_of_individual/ICS"]?.name}
                          </td>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/*       {ele?.extracted_data
                ?.certified_raw_materials_and_declared_geographic_origin && (
                <>
                  {' '}
                  <hr />
                  <h3 className='text-2xl w-full  CertifiedInput p-3'>
                    Certified Raw Materials and Declared Geographic Origin:
                  </h3>
                  <div className='overflow-x-auto table_2 pt-3'>
                    <table className='w-full text-sm text-left text-gray-500'>
                      <thead className='text-xs text-gray-700 uppercase '>
                        <tr>
                          <th
                            scope='col'
                            className='px-6  text-md md:text-lg py-3'
                          >
                            {' '}
                            certified_weight{' '}
                          </th>
                          <th
                            scope='col'
                            className='px-6  text-md md:text-lg py-3'
                          >
                            {' '}
                            country{' '}
                          </th>
                          <th
                            scope='col'
                            className='px-6  text-md md:text-lg py-3'
                          >
                            {' '}
                            material details{' '}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ele?.extracted_data?.certified_raw_materials_and_declared_geographic_origin?.map(
                          (elem, index) => {
                            return (
                              <tr className='bg-white border-b' key={index}>
                                <td className='px-6 py-4 text-md md:text-lg'>
                                  {elem.certified_weight}
                                </td>
                                <td className='px-6 py-4 text-md md:text-lg'>
                                  {elem.country}
                                </td>
                                <td className='px-6 py-4 text-md md:text-lg'>
                                  {elem.material_details}
                                </td>
                              </tr>
                            )
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <div className='w-full flex flex-wrap'>
                <div className='w-full '>
                  <div className='flex flex-wrap pb-5'>
                    <h3 className='text-2xl w-full  CertifiedInput p-3'>
                      Declarations by Certification Body:
                    </h3>
                    <div className='flex section1 flex-col flex-row justify-between p-3  w-full'>
                      <div className='flex'>
                        <h4 className='font-bold text-xl pe-4'>
                          Certification Of The Organic Material Used For The
                          Products Listed Complies With Apeda Np Op Rules:{' '}
                        </h4>
                        <p className=' text-xl pe-4'>
                          {capitalizeFirstLetter(
                            ele.extracted_data
                              .declarations_by_certification_body
                              .certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules
                          )}
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='font-bold text-xl pe-4'>
                          Certification Of The Organic Material Used For The
                          Products Listed Complies With Usda Nop Rules:
                        </h4>
                        <p className=' text-xl pe-4'>
                          {' '}
                          {capitalizeFirstLetter(
                            ele.extracted_data
                              .declarations_by_certification_body
                              .certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules
                          )}
                        </p>
                      </div>

                      <div className='flex'>
                        <h4 className='font-bold text-xl pe-4'>
                          Main Value:
                        </h4>
                        <p className='text-xl'>
                          {
                        ele.extracted_data
                        .declarations_by_certification_body.main_value
                          }
                          </p>
                      </div>
                      <div className='w-full flex items-center'>
                        <h3 className='text-xl font-bold pe-4'>Extra Note:</h3>
                        <p className='text-xl'>
                          {
                            ele?.extracted_data
                              ?.declarations_by_certification_body?.extra_note
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='font-bold text-xl pe-4'>Contents:</h4>
                        <ul>
                          {ele.extracted_data.declarations_by_certification_body.contents?.map(
                            (ele, ind) => {
                              return <li key={ind} className='text-xl'>{ele}</li>
                            }
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full flex flex-wrap'>
                <div className='w-full '>
                  <div className='flex flex-wrap pb-5'>
                    <h3 className='text-2xl w-full  CertifiedInput p-3'>
                      Declarations By Seller of Certified Products:
                    </h3>
                    <div className='flex section1 flex-row justify-between p-3  w-full'>
                      <div className='flex'>
                        <h4 className='font-bold text-xl pe-4'>
                          Certification Of The Organic Material Used For The
                          Products Listed Complies With Usda Nop Rules:
                        
                        </h4>
                        <p className='text-xl'>
                        {capitalizeFirstLetter(
                            ele?.extracted_data
                              ?.declarations_by_seller_of_certified_products
                              ?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {ele?.extracted_data?.seller_of_certified_products && (
                <>
                  {' '}
                  <hr />
                  <div className='overflow-x-auto table_2 pt-3'>
                    <h3 className='text-2xl w-full  CertifiedInput p-3'>
                      seller of certified products:
                    </h3>
                    <table className='w-full text-sm text-left text-gray-500'>
                      <thead className='text-xs text-gray-700 uppercase '>
                        <tr>
                          <th
                            scope='col'
                            className='px-6  text-md md:text-lg py-3'
                          >
                            {' '}
                            License No{' '}
                          </th>
                          <th
                            scope='col'
                            className='px-6  text-md md:text-lg py-3'
                          >
                            {' '}
                            Main Value{' '}
                          </th>
                          <th
                            scope='col'
                            className='px-6  text-md md:text-lg py-3'
                          >
                            {' '}
                            Sc Number{' '}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='bg-white border-b'>
                          <td className='px-6 py-4 text-md md:text-lg'>
                            {
                              ele?.extracted_data?.seller_of_certified_products
                                ?.license_no
                            }
                          </td>
                          <td className='px-6 py-4 text-md md:text-lg'>
                            {
                              ele?.extracted_data?.seller_of_certified_products
                                ?.main_value
                            }
                          </td>
                          <td className='px-6 py-4 text-md md:text-lg'>
                            {
                              ele?.extracted_data?.seller_of_certified_products
                                ?.sc_number
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {ele?.extracted_data
                ?.certified_raw_materials_and_declared_geographic_origin && (
                <>
                  {' '}
                  <hr />
                  <h3 className='text-2xl w-full  CertifiedInput p-3'>
                    Shipments:
                  </h3>
                  <div className='overflow-x-auto table_2 pt-3'>
                    <table className='w-full text-sm text-left text-gray-500'>
                      <thead className='text-xs text-gray-700 uppercase '>
                        <tr>
                          <th scope='col' className='px-6  text-md md:text-lg'>
                            {' '}
                            Consignee Name and Address
                          </th>
                          <th scope='col' className='px-6  text-md md:text-lg'>
                            {' '}
                            Gross Shipping Weight
                          </th>
                          <th scope='col' className='px-6  text-md md:text-lg'>
                            {' '}
                            Invoice References
                          </th>
                          <th scope='col' className='px-6  text-md md:text-lg'>
                            {' '}
                            Shipment Date
                          </th>
                          <th scope='col' className='px-6  text-md md:text-lg'>
                            {' '}
                            Shipment Doc No
                          </th>
                          <th scope='col' className='px-6  text-md md:text-lg'>
                            {' '}
                            Shipment No
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ele?.extracted_data?.shipments?.map((elem, index) => {
                          return (
                            <tr className='bg-white border-b' key={index}>
                              <td className='px-6 py-4 text-md md:text-lg'>
                                {elem.consignee_name_and_address}
                              </td>
                              <td className='px-6 py-4 text-md md:text-lg'>
                                {elem.gross_shipping_weight}
                              </td>
                              <td className='px-6 py-4 text-md md:text-lg'>
                                {elem.invoice_references}
                              </td>
                              <td className='px-6 py-4 text-md md:text-lg'>
                                {elem.shipment_date}
                              </td>
                              <td className='px-6 py-4 text-md md:text-lg'>
                                {elem.shipment_doc_no}
                              </td>
                              <td className='px-6 py-4 text-md md:text-lg'>
                                {elem.shipment_no}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )} */}
            </div>
          )
        })}
      </div>
    </div></div></div></>
  )
}

export default TcType2View
