import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { FaFilePdf } from 'react-icons/fa6'
import { PdfListing3 } from '../../store/thunk/userThunk'
import { useDispatch, useSelector } from 'react-redux'
import { Slidebar } from '../../layout/Slidebar'
import { toast } from 'react-toastify'

const ScopeVerificationView = () => {
  const refs = useRef()
  const location = useLocation()
  const [data, setData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params
  // const { pdfListingData3 } = useSelector(state => state.userReducer)
  const pdfListingData3 = useSelector(state => {
    return state.userReducer?.pdfListingData3 // Adjust based on your state shape
  })
  const getData = async id => {
    try {
      const response = await dispatch(PdfListing3(id))
      
      if (response?.payload?.status_code === 200 || response?.payload?.status_code === 201) {
        setData(response.payload?.data)
      }else{
         toast.error('Internal server error. Please try again later.')
      }
  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData(id)
  }, [])

  const handlePdfDownload = async id => {
    const element = refs?.current

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
  const recordId = data?.id
  return (
  <> <div className='flex'>   <div style={{ width: "20%" }}>  <Slidebar /></div>      <div style={{ width: "80%" }}> <div className='container formList-cont border rounded-xl mx-auto  my-10 '>
      <div className='card card_list'>
        {data ? (
          <div
            ref={refs}
            className='card_item flex flex-col gap-3 rounded-xl p-5'
          >
            <div className='w-full flex justify-between button_section pb-10'>
              <button
                className='btn flex items-center text-white py-2 px-4 rounded-lg font-semibold   transition-all download_pdf_btn button_section'
                onClick={e => handlePdfDownload(recordId)}
              >
                Download
                <FaFilePdf className='ms-2' />
              </button>
            </div>
            <hr className='py-5' />
            <div className='w-full section1 flex flex-wrap justify-between'>
              <h3 className='text-2xl w-full  CertifiedInput p-3'>
                {data?.file_name}
              </h3>
              <div className='w-full flex p-2 justify-between'>
                <div className='w-full flex flex-col md:w-[49%] justify-center'>
                  <div className='flex flex-wrap '>
                    <div className='w-full flex flex-col'>
                      <div className='flex flex'>
                        <h4 className='text-xl keyName pe-4 w-[30%]'>
                          {' '}
                          File Name{' '}
                        </h4>
                        <p className='text-xl keyValue w-[70%]'>
                          {data?.file_name}
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl keyName pe-4  w-[30%]'>id: </h4>
                        <p className='text-xl keyValue  w-[70%]'>{data?.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-full md:w-[49%] flex justify-center  flex-col'>
                  <div className='flex flex-wrap '>
                    <div className='w-full'>
                      <div className='flex'>
                        <h4 className='text-xl keyName pe-4 w-[30%]'>
                          created_at:{' '}
                        </h4>
                        <p className='text-xl keyValue w-[70%]'>
                          {data.created_at}
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl pe-4 w-[30%]'>updated_at: </h4>
                        <p className='text-xl w-[70%]'>{data.updated_at}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full section1 flex flex-wrap justify-between'>
              <h3 className='text-2xl w-full  CertifiedInput p-3'>
                Scope Certificate
              </h3>
              <div className='w-full flex p-2 justify-between'>
                <div className='w-full flex flex-col md:w-[49%] justify-center'>
                  <div className='flex flex-wrap '>
                    <div className='w-full flex flex-col'>
                      <div className='flex flex'>
                        <h4 className='text-xl keyName pe-4 w-[30%]'>
                          {' '}
                          Certificate Number{' '}
                        </h4>
                        <p className='text-xl keyValue w-[70%]'>
                          {
                            data?.extracted_data?.['scope_certificate']
                              ?.certificate_number
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl keyName pe-4  w-[30%]'>
                          Version:{' '}
                        </h4>
                        <p className='text-xl keyValue  w-[70%]'>
                          {data?.extracted_data?.['scope_certificate']?.version}
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl keyName pe-4  w-[30%]'>
                          Date of Issue:{' '}
                        </h4>
                        <p className='text-xl keyValue  w-[70%]'>
                          {
                            data?.extracted_data?.['scope_certificate']
                              ?.date_of_issue
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl keyName pe-4  w-[30%]'>
                          Notes:{' '}
                        </h4>
                        <p className='text-xl keyValue  w-[70%]'>
                          {
                            data?.extracted_data?.['scope_certificate']
                              ?.additional_notes
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-full md:w-[49%] flex justify-center  flex-col'>
                  <div className='flex flex-wrap '>
                    <div className='w-full'>
                      <div className='flex'>
                        <h4 className='text-xl keyName pe-4 w-[30%]'>
                          Holder:{' '}
                        </h4>
                        <p className='text-xl keyValue w-[70%]'>
                          {data?.extracted_data?.['scope_certificate']?.holder}
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl pe-4 w-[30%]'>
                          Certification Body:{' '}
                        </h4>
                        <p className='text-xl w-[70%]'>
                          {
                            data?.extracted_data?.['scope_certificate']
                              ?.certification_body
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl keyName pe-4  w-[30%]'>CEO: </h4>
                        <p className='text-xl keyValue  w-[70%]'>
                          {
                            data?.extracted_data?.['scope_certificate']
                              ?.ceo_name
                          }
                        </p>
                      </div>
                      <div className='flex'>
                        <h4 className='text-xl keyName pe-4  w-[30%]'>
                          Address:{' '}
                        </h4>
                        <p className='text-xl keyValue  w-[70%]'>
                          {data?.extracted_data?.['scope_certificate']?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full section1 flex flex-wrap'>
              <div className='w-full '>
                <div className='flex flex-wrap'>
                  <h3 className='text-2xl w-full  CertifiedInput p-3'>
                    Products Appendix
                  </h3>
                  <div className='flex w-full flex-wrap'>
                    {data?.extracted_data?.['products_appendix']?.map(
                      (product, idx) => {
                        return (
                          <div className='w-full' key={idx}>
                            <h3 className='text-xl pe-2 p-2 pb-0 font-semibold'>
                              Product {idx + 1}:
                            </h3>
                            <div className='p-3 overflow-x-auto'>
                              <table className='w-full border border-gray-300 text-left'>
                                <tbody>
                                  {Object.keys(product)?.map(
                                    (element, index) => {
                                      return (
                                        <tr className='bg-gray-100 border-b border-gray-300  '>
                                          <td className='p-1 font-medium py-3'>
                                            {element}
                                          </td>
                                          <td className='p-1'>
                                            {product?.[element]}
                                          </td>
                                        </tr>
                                      )
                                    }
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full section1 pb-4'>
              <h3 className='text-2xl w-full  CertifiedInput p-3'>
                Site Appendix
              </h3>
              <div className='flex flex-wrap p-2'>
                <div className='w-full flex flex-col'>
                  <div className='flex flex'>
                    <h4 className='keyName pe-4 w-[30%]'> Facility Name </h4>
                    <p className='keyValue w-[70%]'>
                      {data?.extracted_data?.['site_appendix']?.facility_name}
                    </p>
                  </div>
                  <div className='flex'>
                    <h4 className='keyName pe-4  w-[30%]'>Address: </h4>
                    <p className='keyValue  w-[70%]'>
                      {data?.extracted_data?.['site_appendix']?.address}
                    </p>
                  </div>
                  <div className='flex'>
                    <h4 className='keyName pe-4  w-[30%]'>
                      Process Categories:{' '}
                    </h4>
                    <p className='keyValue  w-[70%]'>
                      {data?.extracted_data?.[
                        'site_appendix'
                      ]?.process_categories?.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full section1 flex flex-wrap'>
              <div className='w-full '>
                <div className='flex flex-wrap'>
                  <h3 className='text-2xl w-full  CertifiedInput p-3'>
                    Subcontractors
                  </h3>
                  <div className='flex w-full flex-wrap'>
                    {data?.extracted_data?.[
                      'independently_certified_subcontractor_appendix'
                    ]?.map((subcontractor, idx) => {
                      return (
                        <div className='w-full' key={idx}>
                          <h3 className='text-xl pe-2 p-2 pb-0 font-semibold'>
                            Subcontractor {idx + 1}:
                          </h3>
                          <div className='p-3 overflow-x-auto'>
                            <table className='w-full border border-gray-300 text-left'>
                              <tbody>
                                {Object.keys(subcontractor)?.map(
                                  (element, index) => {
                                    return (
                                      <tr className='bg-gray-100 border-b border-gray-300  '>
                                        <td className='p-1 font-medium py-3'>
                                          {element}
                                        </td>
                                        <td className='p-1'>
                                          {Array.isArray(
                                            subcontractor?.[element]
                                          )
                                            ? subcontractor?.[element]?.join(
                                                ', '
                                              )
                                            : subcontractor?.[element]}
                                        </td>
                                      </tr>
                                    )
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div></div></div></>
  )
}

export default ScopeVerificationView
