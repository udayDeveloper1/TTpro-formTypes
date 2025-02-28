// import React, { useEffect, useState, useRef } from 'react'
// import { form1List } from '../../api/Form1Api'
// import { FaFilePdf } from 'react-icons/fa6'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
// import { useNavigate, useParams } from 'react-router-dom'
// import { capitalizeFirstLetter } from '../../utils/utils'
// import '../../assets/css/tc_type2.css'
// import { cloneDeep } from 'lodash'
// import moment from 'moment'
// import { Slidebar } from '../../layout/Slidebar'
// import { toast } from 'react-toastify'

// const TcType1View
//  = () => {
//   const [data, setData] = useState([])
//   const refs = useRef({})
//   const navigate = useNavigate()
//   const params = useParams()
//   const { id } = params

//   const getList = async () => {
//     try {
//       // Fetch data
//       const response = await form1List(id)
//       console.log(response)
//           if (response?.status_code === 200 || response?.status_code === 201) {
//             let res = [response?.data]
//             let datas = res.map((ele, ind) => {
//               let input_tcs = String(
//                 ele.extracted_data.certified_input_references.input_tcs
//               )
//                 .replace(/[:;]/g, ',')
//                 .split(',')

//               let farm_tcs = String(
//                 ele.extracted_data.certified_input_references.farm_tcs
//               )
//                 .replace(/[:;]/g, ',')
//                 .split(',')

//               let farm_scs = String(
//                 ele.extracted_data.certified_input_references.farm_scs
//               )
//                 .replace(/[:;]/g, ',')
//                 .split(',')

//               // Create a deep copy of the element and update the certified_input_references
//               let obj = cloneDeep(ele)
//               obj.extracted_data.certified_input_references = {
//                 input_tcs,
//                 farm_tcs,
//                 farm_scs,
//                 trader_tcs_for_organic_material:
//                   ele?.extracted_data?.certified_input_references
//                     ?.trader_tcs_for_organic_material
//               }

//               return obj
//             })
//             setData(datas)
//     } else {
//       toast.error('Internal server error. Please try again later.')
//     }

//     } catch (error) {
//       console.error('Error fetching data:', error)
//     }
//   }

//   useEffect(() => {
//     getList()
//   }, [])

//   const handlePdfDownload = async id => {
//     const element = refs.current[id]?.current

//     if (!element) {
//       console.error('Element not found for ID:', id)
//       return
//     }

//     // Temporarily hide button section
//     const buttonSection = element.querySelector('.button_section')
//     if (buttonSection) buttonSection.style.display = 'none'

//     // Render the element to a canvas
//     const canvas = await html2canvas(element, { scale: 2 })
//     const imgData = canvas.toDataURL('image/png')

//     // Initialize jsPDF
//     const pdf = new jsPDF('p', 'mm', 'a4')
//     const pageWidth = pdf.internal.pageSize.getWidth() // A4 width: 210mm
//     const pageHeight = pdf.internal.pageSize.getHeight() // A4 height: 297mm

//     // Calculate canvas dimensions and scaling
//     const imgWidth = canvas.width / 2 // Scale factor matches html2canvas scale
//     const imgHeight = canvas.height / 2
//     const scaleFactor = pageWidth / imgWidth
//     const scaledHeight = imgHeight * scaleFactor
//     const contentHeight = scaledHeight // Total height of the content
//     let yOffset = 0

//     // Add content to the PDF, page by page
//     while (yOffset < imgHeight) {
//       const pageCanvas = document.createElement('canvas')
//       pageCanvas.width = canvas.width
//       pageCanvas.height = Math.min(
//         canvas.height - yOffset,
//         (pageHeight / scaleFactor) * 2
//       ) // Divide height for 2x scale

//       const context = pageCanvas.getContext('2d')
//       context.drawImage(
//         canvas,
//         0,
//         yOffset * 2, // Offset for original canvas
//         canvas.width,
//         pageCanvas.height,
//         0,
//         0,
//         pageCanvas.width,
//         pageCanvas.height
//       )

//       const pageData = pageCanvas.toDataURL('image/png')
//       if (yOffset > 0) pdf.addPage()
//       pdf.addImage(pageData, 'PNG', 0, 0, pageWidth, pageHeight)

//       yOffset += pageHeight / scaleFactor // Move to the next portion
//     }

//     // Generate the PDF Blob
//     const pdfBlob = pdf.output('blob')
//     const blobUrl = URL.createObjectURL(pdfBlob)

//     // Navigate to PDF review page
//     navigate('/PdfReview', { state: { pdfUrl: blobUrl } })

//     // Restore button section visibility
//     if (buttonSection) buttonSection.style.display = 'block'
//   }

//   return (
//   <>
//    <div className='flex'>   <div style={{ width: "20%" }}>  <Slidebar /></div>      <div style={{ width: "80%" }}>  <div className='container formList-cont border rounded-xl mx-auto  my-10 '>
//       <div className='card card_list'>
//         {data?.map((ele, ind) => {
//           const recordId = ele.id || ind
//           refs.current[recordId] = refs.current[recordId] || React.createRef()
//           return (
//             <div
//               key={ind}
//               ref={refs.current[recordId]}
//               className='card_item flex flex-col gap-3 rounded-xl p-5'
//             >
//               <div className='w-full flex justify-between button_section pb-10'>
//                 <button
//                   className='btn flex items-center text-white py-2 px-4 rounded-lg font-semibold   transition-all download_pdf_btn'
//                   onClick={e => handlePdfDownload(recordId)}
//                 >
//                   Download
//                   <FaFilePdf className='ms-2' />
//                 </button>
//               </div>

//               <hr className='py-3' />

//               <div className='w-full section1 flex flex-wrap justify-between '>
//                 <h5 className='text-2xl w-full  CertifiedInput p-3'>
//                   {ele?.file_name}
//                 </h5>
//                 <div className='w-full flex p-2 justify-between'>
//                   <div className='w-full flex flex-col md:w-[49%] justify-center '>
//                     <div className='flex flex-wrap '>
//                       <div className='w-full flex flex-col'>
//                         <div className='flex flex'>
//                           <h4 className='text-xl keyName pe-4 w-[30%] font-bold'>
//                             File Name{' '}
//                           </h4>
//                           <p className='text-xl keyValue w-[70%]'>
//                             {ele.file_name}
//                           </p>
//                         </div>
//                         <div className='flex'>
//                           <h4 className='text-xl keyName pe-4  w-[30%] font-bold'>
//                             id:{' '}
//                           </h4>
//                           <p className='text-xl keyValue  w-[70%]'>{ele?.id}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className='w-full md:w-[49%] flex justify-center  flex-col'>
//                     <div className='flex flex-wrap '>
//                       <div className='w-full'>
//                         <div className='flex'>
//                           <h4 className='text-xl keyName pe-4 w-[30%] font-bold'>
//                             created At:
//                           </h4>
//                           <p className='text-xl keyValue w-[70%]'>
//                             {moment(ele?.created_at).format(
//                               'DD-MM-YYYY hh:mm A'
//                             )}
//                           </p>
//                         </div>
//                         <div className='flex'>
//                           <h4 className='text-xl pe-4 w-[30%] font-bold'>
//                             updated_at:{' '}
//                           </h4>
//                           <p className='text-xl w-[70%]'>
//                             {moment(ele?.updated_at).format(
//                               'DD-MM-YYYY hh:mm A'
//                             )}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className='w-full flex justify-between flex-wrap'>
//                 <div className='w-full md:w-[49%]'>
//                   <div className='flex section1 flex-wrap pb-5'>
//                     <h5 className='text-2xl w-full  CertifiedInput p-3'>
//                       Buyer of Certified Products:
//                     </h5>
//                     <div className='p-2'>
//                       <div className='flex'>
//                         <h4 className='font-bold text-xl pe-4'>License No: </h4>
//                         <p className='text-xl'>
//                           {
//                             ele?.extracted_data.buyer_of_certified_products?.license_no
//                           }
//                         </p>
//                       </div>
//                       <div className='flex'>
//                         <h4 className='font-bold text-xl pe-4'>Main Value: </h4>
//                         <p className='text-xl'>
//                           {
//                             ele?.extracted_data.buyer_of_certified_products?.license_no
//                           }
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='w-full md:w-[49%]'>
//                   <div className='flex section1  flex-wrap pb-5'>
//                     <h5 className='text-2xl w-full  CertifiedInput p-3'>
//                       Certification Body:
//                     </h5>
//                     <div className='p-2'>
//                       <div className='flex  '>
//                         <h4 className='font-bold text-xl pe-4'>
//                           Certification Body:{' '}
//                         </h4>
//                         <p className='text-xl'>
//                           {
//                             ele?.extracted_data?.certification_body?.licensing_code_of_certification_body
//                           }
//                         </p>
//                       </div>
//                       <div className='flex'>
//                         <h4 className='font-bold text-xl pe-4'>Main Value: </h4>
//                         <p className='text-xl'>
//                           {ele?.extracted_data.certification_body?.main_value}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className='w-full flex flex-wrap'>
//                 <div className='w-full '>
//                   <div className='flex flex-wrap pb-5'>
//                     <h5 className='text-2xl w-full  CertifiedInput p-3'>
//                       Certified Input References:
//                     </h5>
//                     <div className='flex section1 flex-row justify-between p-3  w-full'>
//                       <div className='flex flex-col w-[25%]'>
//                         <h4 className='font-bold text-xl pe-4'>Farm Scs</h4>
//                         <div className='text-xl'>
//                           {ele?.extracted_data?.certified_input_references?.farm_scs?.map(
//                             (ele, ind) => {
//                               return <p>{ele}</p>
//                             }
//                           )}
//                         </div>
//                       </div>
//                       <div className='flex flex-col w-[25%]'>
//                         <h4 className='font-bold text-xl pe-4'>Farm Tcs </h4>
//                         <p className='text-xl'>
//                           {
//                             ele?.extracted_data?.certified_input_references?.farm_tcs
//                           }
//                         </p>
//                       </div>
//                       <div className='flex flex-col w-[25%]'>
//                         <h4 className='font-bold text-xl pe-4'>Input Tcs </h4>
//                         <p className='text-xl'>
//                           {
//                             ele?.extracted_data?.certified_input_references?.input_tcs
//                           }
//                         </p>
//                       </div>
//                       <div className='flex flex-col w-[25%]'>
//                         <h4 className='font-bold text-xl pe-4'>
//                           Trader Tcs for Organic Material
//                         </h4>
//                         <p className='text-xl'>
//                           {
//                             ele?.extracted_data?.certified_input_references?.trader_tcs_for_organic_material
//                           }
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className='w-full certifiedProduct  flex flex-wrap'>
//                 <h5 className='text-2xl certifiedProductHeading p-3 w-full'>
//                   Certified Products:
//                 </h5>
//                 <div className='flex w-full flex-wrap'>
//                   {ele.extracted_data.certified_products.map((elem, indd) => {
//                     return (
//                       <div className='pb-5 w-full' key={indd}>
//                         <h5 className='text-xl pe-2 p-2 pb-0 font-semibold'>
//                           Product {indd + 1}:
//                         </h5>
//                         <div className='p-3 overflow-x-auto'>
//                           <table className='w-full border border-gray-300 text-left'>
//                             <thead className='bg-gray-100 border-b border-gray-300'>
//                               <th className=' py-2' colSpan={2}>
//                                 {' '}
//                                 Product {indd + 1}:
//                               </th>
//                             </thead>
//                             <tbody>
//                               {Object.keys(elem)?.map((element, index) => {
//                                 return (
//                                   <>
//                                     <tr className='bg-gray-100 border-b border-gray-300  '>
//                                       <td className='p-1 font-medium py-3'>
//                                         {element}
//                                       </td>
//                                       <td className='p-1'>{elem[element]}</td>
//                                     </tr>
//                                   </>
//                                 )
//                               })}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>

//               {ele?.extracted_data
//                 ?.certified_raw_materials_and_declared_geographic_origin && (
//                 <>
//                   {' '}
//                   <hr />
//                   <h5 className='text-2xl w-full  CertifiedInput p-3'>
//                     Certified Raw Materials and Declared Geographic Origin:
//                   </h5>
//                   <div className='overflow-x-auto table_2 pt-3'>
//                     <table className='w-full text-sm text-left text-gray-500'>
//                       <thead className='text-xs text-gray-700 uppercase '>
//                         <tr>
//                           <th
//                             scope='col'
//                             className='px-6  text-md md:text-lg py-3'
//                           >
//                             {' '}
//                             certified_weight{' '}
//                           </th>
//                           <th
//                             scope='col'
//                             className='px-6  text-md md:text-lg py-3'
//                           >
//                             {' '}
//                             country{' '}
//                           </th>
//                           <th
//                             scope='col'
//                             className='px-6  text-md md:text-lg py-3'
//                           >
//                             {' '}
//                             material details{' '}
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {ele?.extracted_data?.certified_raw_materials_and_declared_geographic_origin?.map(
//                           (elem, index) => {
//                             return (
//                               <tr className='bg-white border-b' key={index}>
//                                 <td className='px-6 py-4 text-md md:text-lg'>
//                                   {elem.certified_weight}
//                                 </td>
//                                 <td className='px-6 py-4 text-md md:text-lg'>
//                                   {elem.country}
//                                 </td>
//                                 <td className='px-6 py-4 text-md md:text-lg'>
//                                   {elem.material_details}
//                                 </td>
//                               </tr>
//                             )
//                           }
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </>
//               )}

//               <div className='w-full flex flex-wrap'>
//                 <div className='w-full '>
//                   <div className='flex flex-wrap pb-5'>
//                     <h5 className='text-2xl w-full  CertifiedInput p-3'>
//                       Declarations by Certification Body:
//                     </h5>
//                     <div className='section1  justify-between p-3  w-full'>
//                     <div className='flex py-5 border-b'>
//                         <h4 className='font-bold text-lg pe-4'>
//                           Certification Of The Organic Material Used For The
//                           Products Listed Complies With Apeda Np Op Rules:{' '}
//                         </h4>
//                         <p className=' text-lg pe-4'>
//                           {capitalizeFirstLetter(
//                             ele?.extracted_data
//                             ?.declarations_by_certification_body
//                             ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules
//                           )}
//                         </p>
//                       </div>
//                       <div className='flex py-5 border-b'>
//                         <h4 className='font-bold text-lg pe-4'>
//                           Certification Of The Organic Material Used For The
//                           Products Listed Complies With Usda Nop Rules:
//                         </h4>
//                         <p className=' text-lg pe-4'>
//                           {capitalizeFirstLetter(
//                             ele?.extracted_data
//                             ?.declarations_by_certification_body
//                             ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules
//                           )}
//                         </p>
//                       </div>

//                      <div className='flex py-5 border-b'>
//                         <h4 className='font-bold text-lg pe-4'>
//                           Main Value:
//                         </h4>
//                         <p className='text-lg'>
//                           {
//                         ele?.extracted_data
//                         ?.declarations_by_certification_body.main_value
//                           }
//                           </p>
//                       </div>
//                         <div className='w-full flex items-center py-5 border-b'>
//                         <h5 className='text-lg font-bold pe-4'>Extra Note:</h5>
//                         <p className='text-lg'>
//                           {
//                             ele?.extracted_data?.declarations_by_certification_body?.extra_note?.translated || ele?.extracted_data?.declarations_by_certification_body?.extra_note
//                           }
//                         </p>
//                       </div>
//                       <div className='flex py-5 border-b'>
//                         <h4 className='font-bold text-lg pe-4'>Contents:</h4>
//                         <ul>
//                           {ele?.extracted_data?.declarations_by_certification_body.contents?.map(
//                             (ele, ind) => {
//                               return <li key={ind} className='text-lg'>{ele}</li>
//                             }
//                           )}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className='w-full flex flex-wrap'>
//                 <div className='w-full '>
//                   <div className='flex flex-wrap pb-5'>
//                     <h5 className='text-2xl w-full  CertifiedInput p-3'>
//                       Declarations By Seller of Certified Products:
//                     </h5>
//                     <div className='flex section1 flex-row justify-between p-3  w-full'>
//                       <div className='flex'>
//                         <h4 className='font-bold text-xl pe-4'>
//                           Certification Of The Organic Material Used For The
//                           Products Listed Complies With Usda Nop Rules:

//                         </h4>
//                         <p className='text-xl'>
//                         {capitalizeFirstLetter(
//                             ele?.extracted_data
//                               ?.declarations_by_seller_of_certified_products
//                               ?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {ele?.extracted_data?.seller_of_certified_products && (
//                 <>
//                   {' '}
//                   <hr />
//                   <div className='overflow-x-auto table_2 pt-3'>
//                     <h5 className='text-2xl w-full  CertifiedInput p-3'>
//                       seller of certified products:
//                     </h5>
//                     <table className='w-full text-sm text-left text-gray-500'>
//                       <thead className='text-xs text-gray-700 uppercase '>
//                         <tr>
//                           <th
//                             scope='col'
//                             className='px-6  text-md md:text-lg py-3'
//                           >
//                             {' '}
//                             License No{' '}
//                           </th>
//                           <th
//                             scope='col'
//                             className='px-6  text-md md:text-lg py-3'
//                           >
//                             {' '}
//                             Main Value{' '}
//                           </th>
//                           <th
//                             scope='col'
//                             className='px-6  text-md md:text-lg py-3'
//                           >
//                             {' '}
//                             Sc Number{' '}
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr className='bg-white border-b'>
//                           <td className='px-6 py-4 text-md md:text-lg'>
//                             {
//                               ele?.extracted_data?.seller_of_certified_products
//                                 ?.license_no
//                             }
//                           </td>
//                           <td className='px-6 py-4 text-md md:text-lg'>
//                             {
//                               ele?.extracted_data?.seller_of_certified_products
//                                 ?.main_value
//                             }
//                           </td>
//                           <td className='px-6 py-4 text-md md:text-lg'>
//                             {
//                               ele?.extracted_data?.seller_of_certified_products
//                                 ?.sc_number
//                             }
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </>
//               )}

//               {ele?.extracted_data
//                 ?.certified_raw_materials_and_declared_geographic_origin && (
//                 <>
//                   {' '}
//                   <hr />
//                   <h5 className='text-2xl w-full  CertifiedInput p-3'>
//                     Shipments:
//                   </h5>
//                   <div className='overflow-x-auto table_2 pt-3'>
//                     <table className='w-full text-sm text-left text-gray-500'>
//                       <thead className='text-xs text-gray-700 uppercase '>
//                         <tr>
//                           <th scope='col' className='px-6  text-md md:text-lg'>
//                             {' '}
//                             Consignee Name and Address
//                           </th>
//                           <th scope='col' className='px-6  text-md md:text-lg'>
//                             {' '}
//                             Gross Shipping Weight
//                           </th>
//                           <th scope='col' className='px-6  text-md md:text-lg'>
//                             {' '}
//                             Invoice References
//                           </th>
//                           <th scope='col' className='px-6  text-md md:text-lg'>
//                             {' '}
//                             Shipment Date
//                           </th>
//                           <th scope='col' className='px-6  text-md md:text-lg'>
//                             {' '}
//                             Shipment Doc No
//                           </th>
//                           <th scope='col' className='px-6  text-md md:text-lg'>
//                             {' '}
//                             Shipment No
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {ele?.extracted_data?.shipments?.map((elem, index) => {
//                           return (
//                             <tr className='bg-white border-b' key={index}>
//                               <td className='px-6 py-4 text-md md:text-lg'>
//                                 {elem?.consignee_name_and_address}
//                               </td>
//                               <td className='px-6 py-4 text-md md:text-lg'>
//                                 {elem?.gross_shipping_weight}
//                               </td>
//                               <td className='px-6 py-4 text-md md:text-lg'>
//                                 {elem?.invoice_references}
//                               </td>
//                               <td className='px-6 py-4 text-md md:text-lg'>
//                                 {elem?.shipment_date}
//                               </td>
//                               <td className='px-6 py-4 text-md md:text-lg'>
//                                 {elem?.shipment_doc_no}
//                               </td>
//                               <td className='px-6 py-4 text-md md:text-lg'>
//                                 {elem?.shipment_no}
//                               </td>
//                             </tr>
//                           )
//                         })}
//                       </tbody>
//                     </table>
//                   </div>
//                 </>
//               )}
//             </div>
//           )
//         })}
//       </div>
//       </div>
//     </div>
//       </div>

//     </>
//   )
// }

// export default TcType1View

import React, { useEffect, useState, useRef } from 'react'
import { form1List } from '../../api/Form1Api'
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
const TcType1View = () => {
  const [data, setData] = useState({})
  const refs = useRef({})
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params
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
      const response = await form1List(id)
      if (response?.status_code === 200 || response?.status_code === 201) {
        let res = response?.data

        let input_tcs = String(
          res?.extracted_data.certified_input_references.input_tcs
        )
          .replace(/[:;]/g, ',')
          .split(',')

        let farm_tcs = String(
          res?.extracted_data.certified_input_references.farm_tcs
        )
          .replace(/[:;]/g, ',')
          .split(',')

        let farm_scs = String(
          res?.extracted_data.certified_input_references.farm_scs
        )
          .replace(/[:;]/g, ',')
          .split(',')

        let shows = cloneDeep(show)
        res?.extracted_data?.buyer_of_certified_products?.buyer_address?.forEach(
          ele => {
            if (
              res?.extracted_data?.buyer_of_certified_products?.buyer_town?.includes(
                ele
              )
            ) {
              shows.buyer.buyer_town = true
            }
            if (
              res?.extracted_data?.buyer_of_certified_products?.buyer_postcode?.includes(
                ele
              )
            ) {
              shows.buyer.buyer_postcode = true
            }
            if (
              res?.extracted_data?.buyer_of_certified_products?.buyer_state_or_province?.includes(
                ele
              )
            ) {
              shows.buyer.buyer_state_or_province = true
            }
            if (
              res?.extracted_data?.buyer_of_certified_products?.buyer_country_or_area?.includes(
                ele
              )
            ) {
              shows.buyer.buyer_country_or_area = true
            }
          }
        )

        res?.extracted_data?.seller_of_certified_products?.seller_address?.forEach(
          ele => {
            if (
              res?.extracted_data?.seller_of_certified_products?.seller_town?.includes(
                ele
              )
            ) {
              shows.seller.seller_town = true
            }
            if (
              res?.extracted_data?.seller_of_certified_products?.seller_postcode?.includes(
                ele
              )
            ) {
              shows.seller.seller_postcode = true
            }
            if (
              res?.extracted_data?.seller_of_certified_products?.seller_state_or_province?.includes(
                ele
              )
            ) {
              shows.seller.seller_state_or_province = true
            }
            if (
              res?.extracted_data?.seller_of_certified_products?.seller_country_or_area?.includes(
                ele
              )
            ) {
              shows.seller.seller_country_or_area = true
            }
          }
        )

        res?.extracted_data?.certification_body?.cb_address?.forEach(ele => {
          if (res?.extracted_data?.certification_body?.town?.includes(ele)) {
            shows.certificateBody.town = true
          }
          if (
            res?.extracted_data?.certification_body?.postcode?.includes(ele)
          ) {
            shows.certificateBody.postcode = true
          }
          if (
            res?.extracted_data?.certification_body?.state_or_province?.includes(
              ele
            )
          ) {
            shows.certificateBody.state_provice = true
          }
          if (
            res?.extracted_data?.certification_body?.country_or_area?.includes(
              ele
            )
          ) {
            shows.certificateBody.Country_area = true
          }
        })

        setShow(shows)

        let obj = cloneDeep(res)
        obj.extracted_data.certified_input_references = {
          input_tcs,
          farm_tcs,
          farm_scs,
          trader_tcs_for_organic_material:
            res?.extracted_data?.certified_input_references
              ?.trader_tcs_for_organic_material
        }

        setData(obj)
      } else {
        toast.error('Internal server error. Please try again later.')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
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

  const handlePrint = e => {
    e.preventDefault()
    window.print()
  }

  return (
    <>
      <div className='container flex items-end'></div>
      <div className='flex'>
        <div style={{ width: '20%' }} className='sidebar_pdf'>
          <Slidebar />
        </div>
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
              <table className='w-full'>
                <tbody className=''>
                  <tr className='page_break'>
                    <td className='w-full' colSpan={4}>
                      <div className='relative mb-4'>
                        <img
                          src={ttproLogo}
                          alt='logo'
                          className='pdf_main_logo absolute left-0'
                          height={100}
                          width={100}
                        />
                        <img
                          src={qrCode}
                          alt='qr-code'
                          className='pdf_main_logo absolute right-0'
                          height={80}
                          width={80}
                        />
                        <h1 className='font-semibold text-2xl text-center'>
                          Transaction Certificate (TC)
                        </h1>
                        <p className='text-md pt_top text-center'>
                          Transaction Certificate Number{' '}
                          {data?.extracted_data?.header?.tc_number}
                        </p>
                        <p className='text-md pt_top text-center'>
                          for products certified to{' '}
                        </p>
                        <h2 className='font-semibold text-md pt-2 text-center'>
                          {data?.extracted_data?.header?.tc_standard}
                        </h2>
                      </div>
                    </td>
                  </tr>
                  <tr className='page_break'>
                    {/* 1. Certification Body
              2. Seller of Certified Products */}
                    <td
                      className='w-[50%] border p-2 align-baseline'
                      colSpan={2}
                    >
                      <h5 className='font-semibold'>1. Certification Body </h5>
                      <p className='ps-3 pt-1'>
                        {data?.extracted_data?.certification_body?.cb_name}
                      </p>
                      <ul className='list-none'>
                        {data?.extracted_data?.certification_body?.cb_address?.map(
                          (ele, ind) => {
                            return (
                              <li className='ps-3 pt-1' key={ind}>
                                {ele}
                              </li>
                            )
                          }
                        )}
                      </ul>
                      {show?.certificateBody?.town ||
                        (show?.certificateBody?.postcode && (
                          <p className='ps-3 pt-1'>
                            {show?.certificateBody?.town &&
                              data?.extracted_data?.certification_body?.town}
                            {show?.certificateBody?.postcode &&
                              data?.extracted_data?.certification_body
                                ?.postcode}
                          </p>
                        ))}
                      {show?.certificateBody?.state_provice ||
                        (show?.certificateBody?.Country_area && (
                          <p className='ps-3 pt-1'>
                            {show?.certificateBody?.state_provice &&
                              data?.extracted_data?.certification_body
                                ?.state_or_province}{' '}
                            {show?.certificateBody?.Country_area &&
                              data?.extracted_data?.certification_body
                                ?.country_or_area}
                          </p>
                        ))}
                      <p className='ps-3 pt-1'>
                        {' '}
                        Licensing Code of Certification Body:{' '}
                        {
                          data?.extracted_data?.certification_body
                            ?.licensing_code_of_certification_body
                        }
                      </p>
                    </td>
                    <td
                      className='w-[50%] border p-2 align-baseline '
                      colSpan={2}
                    >
                      <h5 className='font-semibold'>
                        2. Seller of Certified Products{' '}
                      </h5>
                      <p className='ps-3 pt-1'>
                        {
                          data?.extracted_data?.seller_of_certified_products
                            ?.seller_name
                        }
                      </p>
                      <ul className='list-none'>
                        {data?.extracted_data?.seller_of_certified_products?.seller_address?.map(
                          (ele, ind) => {
                            return (
                              <li className='ps-3 pt-1' key={ind}>
                                {ele}
                              </li>
                            )
                          }
                        )}
                      </ul>
                      {show?.seller?.seller_town ||
                        (show?.seller?.seller_postcode && (
                          <p className='ps-3 pt-1'>
                            {show?.seller?.seller_town &&
                              data?.extracted_data?.seller_of_certified_products
                                ?.seller_town}{' '}
                            {show?.seller?.seller_postcode &&
                              data?.extracted_data?.seller_of_certified_products
                                ?.seller_postcode}
                          </p>
                        ))}
                      {show?.seller?.seller_state_or_province ||
                        (show?.seller?.seller_of_certified_products && (
                          <p className='ps-3 pt-1'>
                            {show?.seller?.seller_state_or_province &&
                              data?.extracted_data?.seller_of_certified_products
                                ?.seller_state_or_province}{' '}
                            {show?.seller?.seller_of_certified_products &&
                              data?.extracted_data?.seller_of_certified_products
                                ?.seller_country_or_area}
                          </p>
                        ))}
                      <h5 className='ps-3 pt-1 font-semibold'>
                        Selling on behalf of:{' '}
                      </h5>
                      <p className='ps-3 pt-1'>
                        {
                          data?.extracted_data?.seller_of_certified_products
                            ?.seller_certified_organization_name
                        }
                      </p>
                      <p className='ps-3 pt-1'>
                        SC Number:
                        {
                          data?.extracted_data?.seller_of_certified_products
                            ?.sc_number
                        }
                      </p>
                      <p className='ps-3 pt-1'>
                        Textile Exchange-ID (TE-ID):{' '}
                        {
                          data?.extracted_data?.seller_of_certified_products
                            ?.textile_exchange_id
                        }{' '}
                      </p>
                      <p className='ps-3 pt-1'>
                        CB_acronym Client No:{' '}
                        {data?.extracted_data?.seller_of_certified_products?.client_number?.slice(
                          0,
                          3
                        )}{' '}
                      </p>
                      <p className='ps-3 pt-1'>
                        Non-certified Trader:{' '}
                        {
                          data?.extracted_data?.seller_of_certified_products
                            ?.non_certified_trader
                        }{' '}
                      </p>
                      <p className='ps-3 pt-1'>
                        Trader TE-ID:{' '}
                        {
                          data?.extracted_data?.seller_of_certified_products
                            ?.trader_te_id
                        }{' '}
                      </p>
                      <p className='ps-3 pt-1'>
                        {' '}
                        SC Number:{' '}
                        {
                          data?.extracted_data?.seller_of_certified_products
                            ?.sc_number
                        }{' '}
                      </p>
                      <p className='ps-3 pt-1'>
                        {' '}
                        License No:{' '}
                        {
                          data?.extracted_data?.seller_of_certified_products
                            ?.seller_licence_number
                        }
                      </p>
                    </td>
                  </tr>
                  {/* 3. Buyer of Certified Products
              4. Gross Shipping Weight */}
                  <tr className='page_break'>
                    <td
                      className='w-[50%] border p-2 align-baseline '
                      colSpan={2}
                    >
                      <h5 className='font-semibold'>
                        3. Buyer of Certified Products
                      </h5>
                      <p className='ps-3 pt-1'>
                        {
                          data?.extracted_data?.buyer_of_certified_products
                            ?.buyer_name
                        }
                      </p>
                      <ul className='list-none'>
                        {data?.extracted_data?.buyer_of_certified_products?.buyer_address?.map(
                          (ele, ind) => {
                            return (
                              <li className='ps-3 pt-1' key={ind}>
                                {ele}
                              </li>
                            )
                          }
                        )}
                      </ul>
                      {show?.buyer?.buyer_town ||
                        (show?.buyer?.buyer_postcode && (
                          <p className='ps-3 pt-1'>
                            {show?.buyer?.buyer_town &&
                              data?.extracted_data?.buyer_of_certified_products
                                ?.buyer_town}{' '}
                            {show?.buyer?.buyer_postcode &&
                              data?.extracted_data?.buyer_of_certified_products
                                ?.buyer_postcode}
                          </p>
                        ))}
                      {show?.buyer?.buyer_state_or_province ||
                        (show?.buyer?.buyer_country_or_area && (
                          <p className='ps-3 pt-1'>
                            {show?.buyer?.buyer_state_or_province &&
                              data?.extracted_data?.buyer_of_certified_products
                                ?.buyer_state_or_province}{' '}
                            {show?.buyer?.buyer_country_or_area &&
                              data?.extracted_data?.buyer_of_certified_products
                                ?.buyer_country_or_area}
                          </p>
                        ))}
                      <h5 className='ps-3 pt-1 text-lg'>
                        Buying on behalf of:
                      </h5>
                      <p className='ps-3 pt-1'>
                        {' '}
                        {
                          data?.extracted_data?.buyer_of_certified_products
                            ?.buyer_certified_organization_name
                        }{' '}
                      </p>
                      <p className='ps-3 pt-1'>
                        TE-ID:{' '}
                        {
                          data?.extracted_data?.buyer_of_certified_products
                            ?.trader_te_id
                        }{' '}
                      </p>
                      <p className='ps-3 pt-1'>
                        Buyer's_CB_acronym Client No:{' '}
                        {data?.extracted_data?.buyer_of_certified_products?.client_number?.slice(
                          0,
                          3
                        )}{' '}
                      </p>
                      <p className='ps-3 pt-1'>
                        License No:{' '}
                        {
                          data?.extracted_data?.buyer_of_certified_products
                            ?.buyer_licence_number
                        }
                      </p>
                    </td>
                    <td className='w-[50%] border align-baseline ' colSpan={2}>
                      <div className=' p-2'>
                        <h5 className='font-semibold'>
                          4. Gross Shipping Weight
                        </h5>
                        <p className='ps-3 pt-1'>
                          {data?.extracted_data?.gross_shipping_weight}
                        </p>
                      </div>
                      <div className='border-t p-2'>
                        <h5 className='font-semibold'>
                          5. Net Shipping Weight
                        </h5>
                        <p className='ps-3 pt-1'>
                          {data?.extracted_data?.net_shipping_weight}
                        </p>
                      </div>
                      <div className='border-t p-2'>
                        <h5 className='font-semibold'>6. Certified Weight</h5>
                        <ul className='list-none ps-0'>
                          {data?.extracted_data?.certified_weight?.map(
                            (ele, ind) => {
                              return (
                                <li key={ind} className='ps-3 pt-1'>
                                  {ele}
                                </li>
                              )
                            }
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                  {/* 7. Declarations by Certification Body */}
                  <tr className='page_break'>
                    <td className=' border p-2 align-baseline' colSpan={4}>
                      <h5 className='font-semibold'>
                        7. Declarations by Certification Body
                      </h5>
                      <p className='ps-3 pt-1'>
                        This is to certify that, based on the relevant
                        documentation provided by the seller named in Box 2
                        "Seller of Certified Products":
                      </p>
                      <ol className='list-[lower-roman] list-inside'>
                        {declarationsByCertificateBody?.map((ele, ind) => {
                          return (
                            <li key={ind} className='ps-3 pt-1'>
                              {ele}
                            </li>
                          )
                        })}
                      </ol>
                    </td>
                  </tr>
                  {/* Certification of the organic material used for the
                          products listed complies with USDA NOP rules */}
                  <tr className='page_break'>
                    <td className=' border p-2 align-baseline' colSpan={4}>
                      <div className='flex label_margin pb-1 items-end'>
                        <h5 className='font-semibold ps-3'>
                          Certification of the organic material used for the
                          products listed complies with USDA NOP rules
                        </h5>
                        <div className='flex'>
                          <Checkbox
                            checked={
                              data?.extracted_data
                                ?.declarations_by_certification_body
                                ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules ===
                                'true'
                                ? true
                                : false
                            }
                            icon={
                              data?.extracted_data
                                ?.declarations_by_certification_body
                                ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules ===
                                'true' ? (
                                <Check size={18} className='text-green-600' />
                              ) : (
                                <XCircle size={18} className='text-gray-400' />
                              )
                            }
                            borderColor='#333'
                            borderWidth={2}
                            borderRadius={5}
                            size={20}
                            label='Yes'
                            labelStyle={{ marginLeft: 8, fontSize: '16px' }}
                            className='mb-0'
                            disabled
                          />
                          <Checkbox
                            checked={
                              data?.extracted_data
                                ?.declarations_by_certification_body
                                ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules ===
                                'false'
                                ? true
                                : false
                            }
                            icon={
                              data?.extracted_data
                                ?.declarations_by_certification_body
                                ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules ===
                                'false' ? (
                                <Check size={18} className='text-green-600' />
                              ) : (
                                <XCircle size={18} className='text-gray-400' />
                              )
                            }
                            borderColor='#333'
                            borderWidth={2}
                            borderRadius={5}
                            size={20}
                            label='No'
                            labelStyle={{ marginLeft: 10, fontSize: '16px' }}
                            className='mb-0'
                            disabled
                          />
                        </div>
                      </div>
                      <div className='flex label_margin items-end'>
                        <h5 className='font-semibold ps-3'>
                          Certification of the organic material used for the
                          products listed complies with APEDA NPOP rules :
                        </h5>
                        <p className='flex ps-2 font-semibold text-md'>
                          [{'Yes'}]
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr className='page_break'>
                    <td className=' border p-2 align-baseline' colSpan={4}>
                      <div className='flex label_margin pb-1 items-end'>
                        <p className='ps-3 pt-1'>
                          This transaction certificate does not entitle the Box
                          3 “Buyer of the Certified Product” to use the
                          tcStandard logo or make reference to the tcStandard.
                          The rules for the labeling of tcStandard certified
                          products are outlined in the Textile Exchange TE-301
                          Standards Claims Policy, (available on{' '}
                          <a
                            href='https://textileexchange.org/'
                            target='_blank'
                          >
                            {' '}
                            www.TextileExchange.org{' '}
                          </a>
                          ). To authenticate this certificate, please visit
                          <a
                            href='https://textileexchange.org/certificate-authentication/'
                            target='_blank'
                          >
                            {' '}
                            www.TextileExchange.org/Certificates
                          </a>
                          .
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr className='page_break'>
                    <td className=' border p-2 align-baseline' colSpan={4}>
                      <h5 className='font-semibold ps-3 border-b border_light pb-2'>
                        8. Certified Input References{' '}
                      </h5>
                      <div className='flex border-b border_light pb-2'>
                        <p className='ps-3 pt-2 min-w-max'>Input TCs:</p>
                        <div className='ps-3 flex flex-wrap'>
                          {data?.extracted_data?.certified_input_references?.input_tcs?.map(
                            (ele, ind) => {
                              return (
                                <p key={ind} className='ps-3 pt-2'>
                                  {ele}
                                </p>
                              )
                            }
                          )}
                        </div>
                      </div>
                      <div className='flex border-b border_light pb-2'>
                        <p className='ps-3 pt-2 min-w-max'>Farm SCs:</p>
                        <div className='ps-3 flex flex-wrap'>
                          {data?.extracted_data?.certified_input_references?.farm_scs?.map(
                            (ele, ind) => {
                              return (
                                <p key={ind} className='ps-3 pt-2'>
                                  {ele}
                                </p>
                              )
                            }
                          )}
                        </div>
                      </div>
                      <div className='flex border-b border_light pb-2'>
                        <p className='ps-3 pt-2 min-w-max'>Farm TCs:</p>
                        <div className='ps-3 flex flex-wrap'>
                          {data?.extracted_data?.certified_input_references?.farm_tcs?.map(
                            (ele, ind) => {
                              return (
                                <p key={ind} className='ps-3 pt-2'>
                                  {ele}
                                </p>
                              )
                            }
                          )}
                        </div>
                      </div>
                      <div className='flex '>
                        <p className='ps-3 pt-2'>
                          Trader TCs for Organic Material:
                        </p>
                        <div className='ps-3 flex flex-wrap'>
                          <p className='ps-3 pt-2'>
                            {
                              data?.extracted_data?.certified_input_references
                                ?.trader_tcs_for_organic_material
                            }
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className='page_break'>
                    <td className=' border p-2 align-baseline' colSpan={4}>
                      <h5 className='font-semibold ps-3'>9. Shipments</h5>
                    </td>
                  </tr>
                  {data?.extracted_data?.shipments?.map((ele, ind) => {
                    return (
                      <tr className='page_break' key={ind}>
                        <td className=' p-2 align-baseline  border' colSpan={4}>
                          <div className='flex w-full px-3'>
                            <div className='w-[50%]'>
                              <div className='flex'>
                                <div className='w-[50%] pe-2'><p className='min_height_table'> Shipment No.: </p> </div>
                                <div className='w-[50%] ps-2'><p className='min_height_table'> {ele?.shipment_no} </p> </div>
                              </div>
                              <div className='flex'>
                                <div className='w-[50%] pe-2'><p className='min_height_table'> Shipment Date: </p> </div>
                                <div className='w-[50%] ps-2'><p className='min_height_table'> {ele?.shipment_date?.includes('NaN') ? '' : ele?.shipment_date} </p> </div>
                              </div>
                              <div className='flex'>
                                <div className='w-[50%] pe-2'><p className='min_height_table'> Shipment Doc No. </p> </div>
                                <div className='w-[50%] ps-2'><p className='min_height_table'> {ele?.shipment_doc_no} </p> </div>
                              </div>
                              <div className='flex'>
                                <div className='w-[50%] pe-2'><p className='min_height_table'> Gross Shipping Weight: </p> </div>
                                <div className='w-[50%] ps-2'><p className='min_height_table'> {ele?.gross_shipping_weight} </p> </div>
                              </div>
                              <div className='flex'>
                                <div className='w-[50%] pe-2'><p className='min_height_table'> Invoice References: </p> </div>
                                <div className='w-[50%] ps-2'><p className='min_height_table'> {ele?.invoice_references} </p> </div>
                              </div>
                            </div>
                            <div className='w-[50%]'>
                              <p>Consignee Name and Address:</p>
                              <p>
                                {
                                  ele?.consignee_name_and_address
                                    ?.consignee_name
                                }
                              </p>
                              {ele?.consignee_name_and_address?.consignee_address?.map(
                                (ele, ind) => {
                                  return (
                                    <p className='' key={ind}>
                                      {ele}
                                    </p>
                                  )
                                }
                              )}
                              <p>
                                {ele?.consignee_name_and_address?.consignee_town} {ele?.consignee_name_and_address?.consignee_postcode}
                              </p>
                              <p>
                                {ele?.consignee_name_and_address?.consignee_state_or_province}{ele?.consignee_name_and_address?.consignee_country_or_area !== "" ? "," : ""} {ele?.consignee_name_and_address?.consignee_country_or_area}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  
                  <tr className='page_break'>
                    <td className=' border p-2 align-baseline' colSpan={4}>
                      <h5 className='font-semibold ps-3'>
                        10. Certified Products
                      </h5>
                    </td>
                  </tr>
                  {data?.extracted_data?.certified_products?.length > 0 && data?.extracted_data?.certified_products?.map((ele, ind) => {
                    return (
                      <tr className='page_break' key={ind}>
                        <td className=' p-2 align-baseline  border' colSpan={4}>
                          <div className='flex w-full px-3'>
                            <div className="w-[50%]">
                              <div className="flex">
                                <div className="w-[50%] pe-2"><p className='min_height_table'> Product No.:</p></div>
                                <div className="w-[50%] ps-2"><p className='min_height_table'> {ele?.product_no} </p> </div>
                              </div>
                              <div className="flex">
                                <div className="w-[50%] pe-2"><p className='min_height_table'> Order No.:</p>    </div>
                                <div className="w-[50%] ps-2"><p className='min_height_table'> {ele?.order_no} </p>       </div>
                              </div>
                              <div className="flex">
                                <div className="w-[50%] pe-2"><p className='min_height_table'> Article No.:</p>    </div>
                                <div className="w-[50%] ps-2"><p className='min_height_table'> {ele?.article_no} </p>      </div>
                              </div>
                              <div className="flex">
                                <div className="w-[50%] pe-2"><p className='min_height_table'> Number of Units: </p>   </div>
                                <div className="w-[50%] ps-2"><p className='min_height_table'> {ele?.number_of_units} </p>    </div>
                              </div>
                              <div className="flex">
                                <div className="w-[50%] pe-2"><p className='min_height_table'> Net Shipping Weight </p>   </div>
                                <div className="w-[50%] ps-2"><p className='min_height_table'> {ele?.net_shipping_weight} </p>   </div>
                              </div>
                              <div className="flex">
                                <div className="w-[50%] pe-2"><p className='min_height_table'> Supplementary Weight </p>   </div>
                                <div className="w-[50%] ps-2"><p className='min_height_table'> {ele?.supplementary_weight} </p>   </div>
                              </div>
                              <div className="flex">
                                <div className="w-[50%] pe-2"><p className='min_height_table'> Certified Weight: </p>  </div>
                                <div className="w-[50%] ps-2"><p className='min_height_table'> {ele?.certified_weight} </p>   </div>
                              </div>
                              <div className="flex">
                                <div className="w-[50%] pe-2"><p className='min_height_table'> Production Date: </p> </div>
                                <div className="w-[50%] ps-2"><p className='min_height_table'> {ele?.production_date?.includes('NaN') ? '' : ele?.production_date} </p>  </div>
                              </div>
                            </div>
                            <div className='w-[50%]'>
                              <div className='flex'>
                                <div className='w-[43%] pe-2'> Product Category:{' '} </div>
                                <div className='w-[57%] ps-2'> {ele?.product_category} </div>
                              </div>
                              <div className='flex'>
                                <div className='w-[43%] pe-2'>Product Detail: </div>
                                <div className='w-[57%] ps-2'> {ele?.product_detail} </div>
                              </div>
                              <div className='flex'>
                                <div className='w-[43%] pe-2'> Material Composition:{' '} </div>
                                <div className='w-[57%] ps-2'> {ele?.material_composition} </div>
                              </div>
                              <div className='flex'>
                                <div className='w-[43%] pe-2'> Standard (Label Grade):{' '} </div>
                                <div className='w-[57%] ps-2'> {ele?.standard_label_grade} </div>
                              </div>
                              <div className='flex'>
                                <div className='w-[43%] pe-2'> Additional Info: </div>
                                <div className='w-[57%] ps-2'> {ele?.additional_info} </div>
                              </div>
                              <div className='flex'>
                                <div className='w-[43%] pe-2'> Last Processor: </div>
                                <div className='w-[57%] ps-2'> {ele?.last_processor} </div>
                              </div>
                              <div className='flex'>
                                <div className='w-[43%] pe-2'> - TE-ID: </div>
                                <div className='w-[57%] ps-2'> {ele?.te_id}</div>
                              </div>
                              <div className='flex'>
                                <div className='w-[43%] pe-2'> - Country: </div>
                                <div className='w-[57%] ps-2'> {ele?.country}</div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot className='w-full '>
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
                          Name Of Authorized Signatory:{' '}
                          {
                            data?.extracted_data?.footer
                              ?.name_of_authorized_signatory
                          }
                        </p>
                        {/* <div className="ps-3 pb-2 text-start flex items-center">
                          <h1 className="text-l text-start">
                            Signature of Authorized Person :
                          </h1>
                          <h1 className="text-l text-start ms-1">
                            <span className="font-semibold">
                              {data?.extracted_data?.footer?.name_of_authorized_signatory || '-'}
                            </span>
                          </h1>
                        </div> */}

                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TcType1View
