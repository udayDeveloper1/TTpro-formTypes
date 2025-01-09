// import React, { useEffect, useState } from 'react'
// import { form1List } from '../api/Form1Api'
// import { FaFilePdf } from 'react-icons/fa6'
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const Form1List = () => {
//   const [data, setData] = useState()
//   const divRef = useRef();
//   const getList = async () => {
//     try {
//       let response = await form1List()
//       setData(response)
//     } catch (error) {}
//   }
//   useEffect(() => {
//     getList()
//   }, [])

//   const handlePdfDownload = (e) => {
//     e.preventDefault();
//     // const element = divRef.current;

//     // if (!element) return;
//     // const canvas = await html2canvas(element, { scale: 2 });
//     // const imgData = canvas.toDataURL('image/png');
//     // const pdf = new jsPDF();
//     // const pageWidth = pdf.internal.pageSize.getWidth();
//     // const pageHeight = pdf.internal.pageSize.getHeight();
//     // const imgWidth = canvas.width / 2;
//     // const imgHeight = canvas.height / 2;
//     // const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
//     // const width = imgWidth * ratio;
//     // const height = imgHeight * ratio;
//     // pdf.addImage(imgData, 'PNG', 0, 0, width, height);
//     // pdf.save('div-content.pdf');
//   }

//   return (
//     <div className='container border rounded-xl mx-auto p-10 my-10'>
//       <div className='card p-10 card_list'>
//         {data?.map((ele, ind) => {
//           return (
//             <div key={ind} className='card_item rounded-xl p-5 mb-10'>
//               <div className='w-full flex justify-between'>
//                 <p className='pb-5'>File Name: {ele.file_name}</p>
//                 <button className='btn flex items-center bg-cyan-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-white hover:text-cyan-400 border border-cyan-400 transition-all' onClick={e=>handlePdfDownload(e)}>
//                   Download
//                   <FaFilePdf className='ms-2' />
//                   {/* Pdf */}
//                 </button>
//               </div>
//               <div className='w-full flex flex-wrap'>
//                 <div className='w-full md:w-[49%]'>
//                   <div className='flex flex-wrap pb-5'>
//                     <h3 className='text-2xl w-full'>
//                       Buyer of Certified Products:
//                     </h3>
//                     <div>
//                       <div className='flex'>
//                         <h4 className='text-xl pe-4'>License No: </h4>
//                         <p className='text-xl'>
//                           {
//                             ele.extracted_data.buyer_of_certified_products
//                               .license_no
//                           }
//                         </p>
//                       </div>
//                       <div className='flex'>
//                         <h4 className='text-xl pe-4'>Main Value: </h4>
//                         <p className='text-xl'>
//                           {
//                             ele.extracted_data.buyer_of_certified_products
//                               .license_no
//                           }
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='w-full md:w-[49%]'>
//                   <div className='flex flex-wrap pb-5'>
//                     <h3 className='text-2xl w-full'>Certification Body:</h3>
//                     <div>
//                       <div className='flex'>
//                         <h4 className='text-xl pe-4'>Certification Body: </h4>
//                         <p className='text-xl'>
//                           {
//                             ele.extracted_data.certification_body
//                               .licensing_code_of_certification_body
//                           }
//                         </p>
//                       </div>
//                       <div className='flex'>
//                         <h4 className='text-xl pe-4'>Main Value: </h4>
//                         <p className='text-xl'>
//                           {
//                             ele.extracted_data.buyer_of_certified_products
//                               .main_value
//                           }
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className='w-full flex flex-wrap'>
//                 <div className='w-full md:w-[49%]'>
//                   <div className='flex flex-wrap pb-5'>
//                     <h3 className='text-2xl w-full'>
//                       Certified Input References:
//                     </h3>
//                     <div>
//                       <div className='flex'>
//                         <h4 className='text-xl pe-4'>Farm Scs: </h4>
//                         <p className='text-xl'>
//                           {
//                             ele.extracted_data.certified_input_references
//                               .farm_scs
//                           }
//                         </p>
//                       </div>
//                       <div className='flex'>
//                         <h4 className='text-xl pe-4'>Farm Tcs: </h4>
//                         <p className='text-xl'>
//                           {
//                             ele.extracted_data.certified_input_references
//                               .farm_tcs
//                           }
//                         </p>
//                       </div>
//                       <div className='flex'>
//                         <h4 className='text-xl pe-4'>Input Tcs: </h4>
//                         <p className='text-xl'>
//                           {
//                             ele.extracted_data.certified_input_references
//                               .input_tcs
//                           }
//                         </p>
//                       </div>
//                       <div className='flex'>
//                         <h4 className='text-xl pe-4'>
//                           Trader Tcs for Organic Material:{' '}
//                         </h4>
//                         <p className='text-xl'>
//                           {
//                             ele.extracted_data.certified_input_references
//                               .trader_tcs_for_organic_materia
//                           }
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className='w-full flex flex-wrap'>
//                 <h3 className='text-2xl w-full'>Certified Products:</h3>
//                 <div className='flex flex-wrap'>
//                   {ele.extracted_data.certified_products.map((elem, indd) => {
//                     return (
//                       <div className='pb-5' key={indd}>
//                         <h3 className='text-xl pe-2 font-semibold'>
//                           Product {indd + 1}:
//                         </h3>
//                         {Object.keys(elem)?.map((element, index) => {
//                           return (
//                             <div className='flex' key={index}>
//                               <h4 className='text-xl pe-4'>{element}: </h4>
//                               <p className='text-xl'>{elem[element]}</p>
//                             </div>
//                           )
//                         })}
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>

//               <div className='w-full flex flex-wrap'>
//                 <h3 className='text-2xl w-full'>
//                   Certified Raw Materials and Declared Geographic Origin:
//                 </h3>
//                 <div className='flex flex-wrap'>
//                   <div>
//                     {ele?.extracted_data?.certified_raw_materials_and_declared_geographic_origin?.map(
//                       (elem, index) => {
//                         return (
//                           <div className=''>
//                             <div className='flex'>
//                               <h4 className='text-xl'>Certified Weight:</h4>
//                               <p>{elem.certified_weight}</p>
//                             </div>
//                             <div className='flex'>
//                               <h4 className='text-xl'>Country:</h4>
//                               <p>{elem.country}</p>
//                             </div>
//                             <div className='flex'>
//                               <h4 className='text-xl'>Material Details:</h4>
//                               <p>{elem.material_details}</p>
//                             </div>
//                           </div>
//                         )
//                       }
//                     )}
//                     <div className='flex'>
//                       <h4 className='text-xl'>Certified Weight:</h4>
//                       <p>{ele.extracted_data.certified_weight}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className='w-full flex flex-wrap'>
//                 <h3 className='text-2xl w-full'>
//                   Declarations by Certification Body:
//                 </h3>
//                 <div className='flex flex-wrap'>
//                   <div className='pb-5'>
//                     <div className='flex'>
//                       <h4 className='text-xl pe-2 font-semibold'>
//                         Certification Of The Organic Material Used For The
//                         Products Listed Complies With Apeda Np Op Rules:
//                       </h4>
//                       <p className='text-xl'>
//                         {ele.extracted_data.declarations_by_certification_body.certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules
//                           .toString()
//                           .charAt(0)
//                           .toUpperCase() +
//                           String(
//                             ele.extracted_data
//                               .declarations_by_certification_body
//                               .certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules
//                           ).slice(1)}
//                       </p>
//                     </div>
//                     <div className='flex'>
//                       <h4 className='text-xl pe-2 font-semibold'>
//                         Certification Of The Organic Material Used For The
//                         Products Listed Complies With Usda Nop Rules:
//                       </h4>
//                       <p className='text-xl'>
//                         {ele.extracted_data.declarations_by_certification_body.certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules
//                           .toString()
//                           .charAt(0)
//                           .toUpperCase() +
//                           String(
//                             ele.extracted_data
//                               .declarations_by_certification_body
//                               .certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules
//                           ).slice(1)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className='w-full flex flex-wrap'>
//                 <h3 className='text-2xl w-full'>contents:</h3>

//                 <ul>
//                   {ele?.extracted_data?.declarations_by_certification_body?.contents?.map(
//                     (elem, index) => {
//                       return (
//                         <li key={index}>
//                           {elem?.DeclarationList_}
//                           {console.log(elem)}
//                         </li>
//                       )
//                     }
//                   )}
//                 </ul>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default Form1List

import React, { useEffect, useState, useRef } from 'react'
import { form1List } from '../api/Form1Api'
import { FaFilePdf } from 'react-icons/fa6'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useNavigate } from 'react-router-dom'
import { capitalizeFirstLetter } from '../utils/utils'

const Form1List = () => {
  const [data, setData] = useState([])
  const refs = useRef({})
  const navigate = useNavigate()

  const getList = async () => {
    try {
      const response = await form1List()
      setData(response)
    } catch (error) {
      console.error(error)
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
    element.querySelector('.button_section').style.display = 'none'
    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width / 2
    const imgHeight = canvas.height / 2
    const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight)
    const width = imgWidth * ratio
    const height = imgHeight * ratio
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    const pdfBlob = pdf.output('blob')
    const blobUrl = URL.createObjectURL(pdfBlob)
    navigate('/PdfReview', { state: { pdfUrl: blobUrl } })
  }

  return (
    <div className='container border rounded-xl mx-auto p-10 my-10'>
      <div className='card p-10 card_list'>
        {data.map((ele, ind) => {
          const recordId = ele.id || ind
          refs.current[recordId] = refs.current[recordId] || React.createRef()
          return (
            <div
              key={ind}
              ref={refs.current[recordId]}
              className='card_item rounded-xl p-5 mb-10'
            >
              {console.log(ele)}
              <div className='w-full flex justify-between button_section'>
                <p className='pb-5'>File Name: {ele.file_name}</p>
                <button
                  className='btn flex items-center bg-cyan-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-white hover:text-cyan-400 border border-cyan-400 transition-all'
                  onClick={e => handlePdfDownload(recordId)}
                >
                  Download
                  <FaFilePdf className='ms-2' />
                  {/* Pdf */}
                </button>
              </div>
              <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-[49%]'>
                  <div className='flex flex-wrap pb-5'>
                    <h3 className='text-2xl w-full'>
                      Buyer of Certified Products:
                    </h3>
                    <div>
                      <div className='flex'>
                        <h4 className='text-xl pe-4'>License No: </h4>
                        <p className='text-xl'>
                          {
                            ele.extracted_data.buyer_of_certified_products
                              .license_no
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl pe-4'>Main Value: </h4>
                        <p className='text-xl'>
                          {
                            ele.extracted_data.buyer_of_certified_products
                              .license_no
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='w-full md:w-[49%]'>
                  <div className='flex flex-wrap pb-5'>
                    <h3 className='text-2xl w-full'>Certification Body:</h3>
                    <div>
                      <div className='flex'>
                        <h4 className='text-xl pe-4'>Certification Body: </h4>
                        <p className='text-xl'>
                          {
                            ele.extracted_data.certification_body
                              .licensing_code_of_certification_body
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl pe-4'>Main Value: </h4>
                        <p className='text-xl'>
                          {
                            ele.extracted_data.buyer_of_certified_products
                              .main_value
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-[49%]'>
                  <div className='flex flex-wrap pb-5'>
                    <h3 className='text-2xl w-full'>
                      Certified Input References:
                    </h3>
                    <div>
                      <div className='flex'>
                        <h4 className='text-xl pe-4'>Farm Scs: </h4>
                        <p className='text-xl'>
                          {
                            ele.extracted_data.certified_input_references
                              .farm_scs
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl pe-4'>Farm Tcs: </h4>
                        <p className='text-xl'>
                          {
                            ele.extracted_data.certified_input_references
                              .farm_tcs
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl pe-4'>Input Tcs: </h4>
                        <p className='text-xl'>
                          {
                            ele.extracted_data.certified_input_references
                              .input_tcs
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl pe-4'>
                          Trader Tcs for Organic Material:{' '}
                        </h4>
                        <p className='text-xl'>
                          {
                            ele.extracted_data.certified_input_references
                              .trader_tcs_for_organic_materia
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-wrap'>
                <h3 className='text-2xl w-full'>Certified Products:</h3>
                <div className='flex flex-wrap'>
                  {ele.extracted_data.certified_products.map((elem, indd) => {
                    return (
                      <div className='pb-5' key={indd}>
                        <h3 className='text-xl pe-2 font-semibold'>
                          Product {indd + 1}:
                        </h3>
                        {Object.keys(elem)?.map((element, index) => {
                          return (
                            <div className='flex' key={index}>
                              <h4 className='text-xl pe-4'>{element}: </h4>
                              <p className='text-xl'>{elem[element]}</p>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className='w-full flex flex-wrap'>
                <h3 className='text-2xl w-full'>
                  Certified Raw Materials and Declared Geographic Origin:
                </h3>
                <div className='flex flex-wrap'>
                  <div>
                    {ele?.extracted_data?.certified_raw_materials_and_declared_geographic_origin?.map(
                      (elem, index) => {
                        return (
                          <div className='' key={index}>
                            <div className='flex'>
                              <h4 className='text-xl'>Certified Weight:</h4>
                              <p>{elem.certified_weight}</p>
                            </div>
                            <div className='flex'>
                              <h4 className='text-xl'>Country:</h4>
                              <p>{elem.country}</p>
                            </div>
                            <div className='flex'>
                              <h4 className='text-xl'>Material Details:</h4>
                              <p>{elem.material_details}</p>
                            </div>
                          </div>
                        )
                      }
                    )}
                    <div className='flex'>
                      <h4 className='text-xl'>Certified Weight:</h4>
                      <p>{ele.extracted_data.certified_weight}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full flex flex-wrap'>
                <h3 className='text-2xl w-full'>
                  Declarations by Certification Body:
                </h3>
                <div className='flex flex-wrap'>
                  <div className='pb-5'>
                    <div className='flex'>
                      <h4 className='text-xl pe-2 font-semibold'>
                        Certification Of The Organic Material Used For The
                        Products Listed Complies With Apeda Np Op Rules:
                      </h4>
                      <p className='text-xl'>
                        {capitalizeFirstLetter(
                          ele.extracted_data.declarations_by_certification_body
                            .certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules
                        )}
                      </p>
                    </div>
                    <div className='flex'>
                      <h4 className='text-xl pe-2 font-semibold'>
                        Certification Of The Organic Material Used For The
                        Products Listed Complies With Usda Nop Rules:
                      </h4>
                      <p className='text-xl'>
                        {capitalizeFirstLetter(
                          ele.extracted_data.declarations_by_certification_body
                            .certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full flex flex-wrap'>
                <h3 className='text-2xl w-full'>contents:</h3>
                <ul>
                  {ele?.extracted_data?.declarations_by_certification_body?.contents?.map(
                    (elem, index) => {
                      return <li key={index}>{elem?.DeclarationList_}</li>
                    }
                  )}
                </ul>
              </div>

              <div className='w-full flex items-center'>
                <h3 className='text-xl '>Extra Note:</h3>
                <p className='text-xl'>
                  {
                    ele?.extracted_data?.declarations_by_certification_body
                      ?.extra_note
                  }
                </p>
              </div>

              <div className='w-full flex items-center'>
                <h3 className='text-xl '>Main Value:</h3>
                <p className='text-xl'>
                  {
                    ele?.extracted_data?.declarations_by_certification_body
                      ?.main_value
                  }
                </p>
              </div>

              <div className='w-full flex flex-wrap'>
                <h3 className='text-2xl w-full'>
                  Declarations By Seller of Certified Products:
                </h3>
                <div className='w-full flex items-center'>
                  <h3 className='text-xl '>
                    The Certified Products covered in this Certificate have been
                    outsourced to a Subcontractor:
                  </h3>
                  <p className='text-xl'>
                    {capitalizeFirstLetter(
                      ele?.extracted_data
                        ?.declarations_by_seller_of_certified_products
                        ?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
                    )}
                  </p>
                </div>
                <div className='w-full flex items-center'>
                  <h3 className='text-xl '>Gross Shipping Weight:</h3>
                  <p className='text-xl'>
                    {ele?.extracted_data?.gross_shipping_weight}
                  </p>
                </div>
                <div className='w-full flex items-center'>
                  <h3 className='text-xl '>Net Shipping Weight:</h3>
                  <p className='text-xl'>
                    {ele?.extracted_data?.net_shipping_weight}
                  </p>
                </div>
              </div>

              <div className='w-full flex flex-wrap flex-col'>
                <h3 className='text-2xl w-full'>
                  Seller of Certified Products:
                </h3>
                <div className='flex'>
                  <h3 className='text-xl '>License No:</h3>
                  <p className='text-xl'>
                    {
                      ele?.extracted_data?.seller_of_certified_products
                        ?.license_no
                    }
                  </p>
                </div>
                <div className='flex'>
                  <h3 className='text-xl '>Main Value:</h3>
                  <p className='text-xl'>
                    {
                      ele?.extracted_data?.seller_of_certified_products
                        ?.main_value
                    }
                  </p>
                </div>
                <div className='flex'>
                  <h3 className='text-xl '>Sc Number:</h3>
                  <p className='text-xl'>
                    {
                      ele?.extracted_data?.seller_of_certified_products
                        ?.sc_number
                    }
                  </p>
                </div>
              </div>

              <div className='w-full flex flex-wrap flex-col'>
                <h3 className='text-2xl w-full'>Shipments:</h3>
                <div className='flex flex-wrap'>
                  {ele?.extracted_data?.shipments?.map((elem, index) => {
                    return (
                      <div key={index}>
                        <div className='flex'>
                          <h3 className='text-xl '>
                            Consignee Name and Address:
                          </h3>
                          <p className='text-xl'>
                            {elem?.consignee_name_and_address}
                          </p>
                        </div>
                        <div className='flex'>
                          <h3 className='text-xl '>Gross Shipping Weight:</h3>
                          <p className='text-xl'>
                            {elem?.gross_shipping_weight}
                          </p>
                        </div>
                        <div className='flex'>
                          <h3 className='text-xl '>Invoice References:</h3>
                          <p className='text-xl'>{elem?.invoice_references}</p>
                        </div>
                        <div className='flex'>
                          <h3 className='text-xl '>Shipment Date:</h3>
                          <p className='text-xl'>{elem?.shipment_date}</p>
                        </div>
                        <div className='flex'>
                          <h3 className='text-xl '>Shipment Doc No:</h3>
                          <p className='text-xl'>{elem?.shipment_doc_no}</p>
                        </div>
                        <div className='flex'>
                          <h3 className='text-xl '>Shipment No:</h3>
                          <p className='text-xl'>{elem?.shipment_no}</p>
                        </div>
                      </div>
                    )
                  })}
                  {ele?.extracted_data?.shipments?.map((elem, index) => {
                    return (
                      <div key={index}>
                        <div className='flex'>
                          <h3 className='text-xl'>
                            Consignee Name and Address:
                          </h3>
                          <p className='text-xl'>
                            {elem?.consignee_name_and_address}
                          </p>
                        </div>
                        <div className='flex'>
                          <h3 className='text-xl '>Gross Shipping Weight:</h3>
                          <p className='text-xl'>
                            {elem?.gross_shipping_weight}
                          </p>
                        </div>
                        <div className='flex'>
                          <h3 className='text-xl '>Invoice References:</h3>
                          <p className='text-xl'>{elem?.invoice_references}</p>
                        </div>
                        <div className='flex'>
                          <h3 className='text-xl '>Shipment Date:</h3>
                          <p className='text-xl'>{elem?.shipment_date}</p>
                        </div>
                        <div className='flex'>
                          <h3 className='text-xl '>Shipment Doc No:</h3>
                          <p className='text-xl'>{elem?.shipment_doc_no}</p>
                        </div>
                        <div className='flex'>
                          <h3 className='text-xl '>Shipment No:</h3>
                          <p className='text-xl'>{elem?.shipment_no}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Form1List
