// import React, { useEffect, useRef, useState } from 'react'
// import {
//   Button,
//   Cascader,
//   ColorPicker,
//   DatePicker,
//   Form as AntdForm,
//   Input,
//   InputNumber,
//   Radio,
//   Rate,
//   Select,
//   Slider,
//   Switch,
//   TreeSelect,
//   Upload,
//   message,
//   Space,
//   theme,
//   Tag,
//   InputRef
// } from 'antd'

// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
// import moment from 'moment' // Import moment.js
// // import { form1Set, form2submit, formFill1, formFill2 } from '../api/Form1Api'
// import { form1Set, form2submit, formFill1, formFill2Try } from '../../api/Form1Api'
// import { cloneDeep, forEach } from 'lodash'
// import TagInput from '../../component/Tags'
// import dayjs from 'dayjs'
// import { toast } from 'react-toastify'
// import Spinner from '../../layout/Spinner'
// import { useNavigate } from 'react-router-dom'
// import { Slidebar } from '../../layout/Slidebar'

// const ImportPdfTCtype2 = () => {
//   const [form] = AntdForm.useForm()
//   const [form2] = AntdForm.useForm()
//   const [formNo, setFormNo] = useState('1')
//   const [data, setdata] = useState([])
//   const navigate = useNavigate()
//   const [tags, setTags] = useState([])
//   const [tags2, setTags2] = useState([])
//   const [tagsArray, setTagsArray] = useState([[]])
//   const [tags2Array, setTags2Array] = useState([[]])
//   const [loading, setLoading] = useState(false)
//   const [loading2, setLoading2] = useState(false)

//   const handleSubmit = async values => {
//     try {
//       setLoading(true)
//       let fomrData = new FormData()
//       fomrData.append('pdf', values.UploadPdf[0].originFileObj)
//       let datas = await formFill2Try(fomrData)
//       let data = datas?.data
//       if (datas?.status_code === 200 || datas?.status_code === 201) {
//         setFormNo('2')
//         const transportDetails =
//           data?.extracted_data?.transaction_details?.transport_details?.map(
//             transport => {
//               const modeOfTransport = transport?.mode_of_transport || '' // Default to an empty string
//               const transportDocument =
//               transport?.transport_document_numbers?.split(/[,:;|]+/).filter(Boolean) || [];
//               const dateOfTransport = transport?.date_of_transport
//                 ? dayjs(transport?.date_of_transport, 'DD/MM/YYYY')
//                 : null
//               const vehicleNo =
//               transport?.vehicle_number_or_bull_cart_or_air_or_others?.split(/[,:;|]+/).filter(Boolean) || [];
//               return {
//                 ModeOfTransport: modeOfTransport,
//                 TransportDocument: transportDocument,
//                 DateOfTransport: dateOfTransport,
//                 vehicleNo: vehicleNo
//               }
//             }
//           ) || []

//           console.log(transportDetails);
          

//         // const additionalTransportDetails =
//         // data?.extracted_data?.transaction_details?.transport_details?.map((tag, index) => {
//         //     return {
//         //       ModeOfTransport: '',
//         //       TransportDocument: tag,
//         //       DateOfTransport: dayjs(tag?.DateOfTransport, 'DD/MM/YYYY')?.["$d"] !== "Invalid Date" ? dayjs(tag?.DateOfTransport, "DD/MM/YYYY") : null,
//         //       vehicleNo: tags2 && tags2?.[index] ? tags2?.[index]?.split(",") : []
//         //     }
//         //   }) || []

//         // const allTransportDetails = transportDetails?.concat(
//         //   additionalTransportDetails
//         // )


//         if (transportDetails.length === 0) {
//           transportDetails.push({
//             ModeOfTransport: '',
//             TransportDocument: [],
//             DateOfTransport: null,
//             vehicleNo: []
//           })
//         }
        
  
        
//         form2.setFieldsValue({
//           UploadQrCode: [],
//           UploadLogoImage: [],
//           UploadBarcode: [],
//           CertificateName: data?.extracted_data?.certification_body?.name || '',
//           CertificationAddress:
//             data?.extracted_data?.certification_body?.address || '',
//           TransactionCertificateNo:
//             data?.extracted_data?.transaction_certificate_number || '',
//           SellerName:
//             data?.extracted_data?.['seller_of_individual/ics']?.name || '',
//           SellerAddress:
//             data?.extracted_data?.['seller_of_individual/ics']?.address || '',
//           SellerPAN:
//             data?.extracted_data?.['seller_of_individual/ics']?.pan || '',
//           BuyerName: data?.extracted_data?.buyer?.name || '',
//           BuyerAddress: data?.extracted_data?.buyer?.address || '',
//           BuyerPAN: data?.extracted_data?.buyer?.pan || '',
//           PlaceOfDispatch: data?.extracted_data?.place_of_dispatch || '',
//           PlaceOfDestination: data?.extracted_data?.place_of_destination || '',
//           additionalDeclaration:
//             data?.extracted_data?.additional_declaration_by_the_certification_body?.this_is_to_cerify_that?.map(
//               item => ({
//                 additionalDeclarationItem: item
//               })
//             ) || [],
//           RawMaterialDetails:
//             data?.extracted_data?.product_details?.map(product => ({
//               Product: product.product_name,
//               HSCode: product.hs_code,
//               NPOPOrganicCompliance:
//                 product?.['npop_organic_compliance_c1/c2/c3/organic'],
//               LotNoQuantity: product.quantity_in_mt,
//               LotNo: product.lot_no,
//               TradeName: product.trade_name?.map(tradeName => ({
//                 TradeName: tradeName
//               })) || [{ TradeName: '' }],
//               packingDetails:
//                 product.packing_details?.map(packingDetail => ({
//                   packingDetail
//                 })) || []
//             })) || [],
//           InvoiceList:
//             data?.extracted_data?.transaction_details?.invoice_details?.map(
//               invoice => {
//                 return {
//                   SNo: invoice.s_no,
//                   InvoiceNo: invoice.invoice_number,
//                   InvoiceDate: dayjs(invoice?.invoice_date, 'DD/MM/YYYY')?.["$d"] !== "Invalid Date" ? dayjs(invoice?.invoice_date, 'DD/MM/YYYY') : null
//                 }
//               }
//             ) || [],
//           OrderContactNo:
//             data?.extracted_data?.transaction_details
//               ?.order_or_contact_number || '',
//           AuthorisedName:
//             data?.extracted_data?.name_and_signature_of_the_authorised_person
//               ?.name || '',
//           AuthorisedPosition:
//             data?.extracted_data?.name_and_signature_of_the_authorised_person
//               ?.position || '',
//           IssuedDate: dayjs(
//             data?.extracted_data
//               ?.additional_declaration_by_the_certification_body?.issue_date,
//             'DD/MM/YYYY'
//           )
//         })

//         // Log or debug the updated TransportDetails
//         // setTagsArray(
//         //   transportDetails.map(detail => detail.TransportDocument || [])
//         // )
//         // setTags2Array(transportDetails.map(detail => detail.vehicleNo || []))

//         toast.success("Pdf submitted Successfully.")
//       }else{
//         toast.error("Something went Wrong.")
//       }
//     } catch (error) {
//       toast.error("Something went Wrong.")
//       console.log(error)
//     }
//     setLoading(false)
//   }

//   const normFile = e => {
//     if (Array.isArray(e)) {
//       return e
//     }
//     return e?.fileList
//   }

//   const beforeUpload = file => {
//     const isPdf = file.type === 'application/pdf'
//     if (!isPdf) {
//       message.error('You can only upload PDF files!')
//       return
//     }

//     return isPdf || Upload.LIST_IGNORE
//   }

//   const handleSubmit2 = async values => {
//     setLoading2(true)
//     try {

//       // Prepare Product Details
//       const productDetails =
//         values?.RawMaterialDetails?.map(ele => ({
//           hs_code: ele.HSCode || 'Default HS Code',
//           quantity_in_MT: ele.LotNoQuantity || '0',
//           'NPOP_organic_compliance_C1/C2/C3/organic':
//             ele.NPOPOrganicCompliance || '',
//           lot_no: ele.LotNo,
//           product_name: ele.Product || 'Default Product Name',
//           trade_name: ele.TradeName?.map(item => item.TradeName) || [],
//           packing_details:
//             ele.packingDetails?.map(item => item.packingDetail) || []
//         })) || []

//       // Prepare Invoice Details
//       const invoiceDetails =
//         values?.InvoiceList?.map(ele => ({
//           s_no: ele.SNo,
//           invoice_number: ele.InvoiceNo,
//           invoice_date: ele.InvoiceDate
//         })) || []

//       // Prepare Transport Details
//       const transportDetails =
//         values?.TransportDetails?.map((ele, ind) => ({
//           mode_of_transport: ele.ModeOfTransport || '',
//           transport_document_numbers: tagsArray[ind]?.join(',') || '',
//           vehicle_number_or_bull_cart_or_air_or_others: tags2Array[ind] || [],
//           date_of_transport: ele.DateOfTransport || null
//         })) || []

//       // Prepare Additional Declaration
//       const thisIsToCertifyThat =
//         values?.additionalDeclaration?.map(
//           ele => ele.additionalDeclarationItem
//         ) || []

//       // Prepare Data Object
//       const data = {
//         file_name: 'abc',

//         extracted_data: {
//           file_title: 'abc',
//           qr_info: '{253} SS08008456039022024002111',
//           certification_body: {
//             name: values.CertificateName || '',
//             address: values.CertificationAddress || ''
//           },
//           transaction_certificate_number: values.TransactionCertificateNo || '',
//           'seller_of_individual/ICS': {
//             name: values.SellerName || '',
//             address: values.SellerAddress || '',
//             PAN: values.SellerPAN || ''
//           },
//           buyer: {
//             name: values.BuyerName || '',
//             address: values.BuyerAddress || '',
//             PAN: values.BuyerPAN || ''
//           },
//           place_of_dispatch: values.PlaceOfDispatch || '',
//           place_of_destination: values.PlaceOfDestination || '',
//           product_details: productDetails,
//           transaction_details: {
//             order_or_contact_number: values.OrderContactNo || '',
//             invoice_details: invoiceDetails,
//             transport_details: transportDetails
//           },
//           additional_declaration_by_the_certification_body: {
//             this_is_to_cerify_that: thisIsToCertifyThat,
//             issue_date: values.IssuedDate || null
//           },
//           name_and_signature_of_the_authorised_person: {
//             name: values.AuthorisedName || '',
//             position: values.AuthorisedPosition || ''
//           }
//         }
//       }

//       // Submit Data
//       const response = await form2submit(data)
//       if (response?.status_code === 200 || response?.status_code === 201) {
//         navigate('/tcType2List')
//         toast.success("Form submitted Successfully.")
//       }else{
//         toast.error("Something went Wrong.")
//       }
//     } catch (error) {
//       console.error('Error during form submission:', error)
//       toast.error("Something went Wrong.")
//     }
//     setLoading2(false)
//   }

//   const beforeUpload2 = file => {
//     const isValidType = file.type === 'image/png' || file.type === 'image/jpeg'
//     if (!isValidType) {
//       message.error('You can only upload PNG or JPG files!')
//     }
//     return isValidType
//   }

//   return formNo === '1' ? (
//     <>
//       {loading && <Spinner message='Loading...' isActive={loading} />}
//   <div className='flex'>   <div style={{ width: "20%" }}>  <Slidebar /></div>      <div style={{ width: "80%" }}> 
//       <AntdForm
//         form={form}
//         onFinish={handleSubmit}
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         layout='vertical'
//         className='form_1  rounded-xl shadow-xl'
//         style={{ maxWidth: 800, margin: '0 auto' }}
//         initialValues={{ UploadPdf: [] }}
//       >
//         <section className='section'>
//           <h2 className=' pb-5 section-title'>Upload PDF For Transaction Certificate (TC) Form Type 2 Form </h2>
//           <div className=''>
//             <div className='flex items-center md:justify-between flex-wrap'>
//               <AntdForm.Item
//                 label='Upload Pdf Here'
//                 name='UploadPdf'
//                 valuePropName='fileList'
//                 getValueFromEvent={normFile}
//                 className='pt-5 w-full md:w-[49%] UploadPdf'
//                 rules={[
//                   { required: true, message: 'Please upload a PDF file!' }
//                 ]}
//               >
//                 <Upload
//                   action='/upload.do'
//                   listType='picture-card'
//                   beforeUpload={beforeUpload}
//                   accept='.pdf'
//                   maxCount={1}
//                   onChange={info => {}}
//                 >
//                   <button
//                     style={{ border: 0, background: 'none' }}
//                     type='button'
//                   >
//                     <PlusOutlined />
//                     <div style={{ marginTop: 8 }}>Upload Pdf</div>
//                   </button>
//                 </Upload>
//               </AntdForm.Item>
//             </div>
//           </div>
//         </section>

//         <AntdForm.Item className='submitButtonGroup'>
//           <Button type='primary' htmlType='submit' className='submit-btn '>
//             Submit
//           </Button>
//         </AntdForm.Item>
//       </AntdForm>
//       </div>
//       </div>
//     </>
//   ) : (
//     <>
//       {loading2 && <Spinner message='Loading...' isActive={loading2} />}{' '}
//       <div className='flex'>   <div style={{ width: "20%" }}>  <Slidebar /></div>      <div style={{ width: "80%" }}> 
//       <div className='container mx-auto  '>
//         <AntdForm
//           form={form2}
//           onFinish={handleSubmit2}
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           layout='vertical'
//           className='form_1  rounded-xl shadow-xl'
//           style={{ maxWidth: 900, margin: '0 auto' }}
//         >
//           <h1 className='text-2xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center'>
//             Transaction Certificate (TC) Form Type 2
//           </h1>
//           {/* upload logo and qrcode */}
//           {/* <section className='section'>
//             <h3 className='section-title pb-0 '>Upload Logo And Qr Code: </h3>
//             <div className=''>
//               <div className='flex  md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='Upload Qr Code'
//                   name={'UploadQrCode'}
//                   valuePropName='fileList'
//                   getValueFromEvent={normFile}
//                   className='pt-5  w-full md:w-[49%]'
//                 >
//                   <Upload
//                     action='/upload.do'
//                     listType='picture-card'
//                     beforeUpload={beforeUpload2}
//                     accept='.png,.jpg,.jpeg'
//                     maxCount={1}
//                   >
//                     <button
//                       style={{ border: 0, background: 'none' }}
//                       type='button'
//                     >
//                       <PlusOutlined />
//                       <div style={{ marginTop: 8 }}>Upload Qr Code</div>
//                     </button>
//                   </Upload>
//                 </AntdForm.Item>
//                 <AntdForm.Item
//                   label='Upload Logo Image'
//                   name={'UploadLogoImage'}
//                   valuePropName='fileList'
//                   getValueFromEvent={normFile}
//                   className='pt-5 w-full md:w-[49%]'
//                 >
//                   <Upload
//                     action='/upload.do'
//                     listType='picture-card'
//                     beforeUpload={beforeUpload2}
//                     accept='.png,.jpg,.jpeg'
//                     maxCount={1}
//                   >
//                     <button
//                       style={{ border: 0, background: 'none' }}
//                       type='button'
//                     >
//                       <PlusOutlined />
//                       <div style={{ marginTop: 8 }}>Upload Logo Image</div>
//                     </button>
//                   </Upload>
//                 </AntdForm.Item>
//                 <AntdForm.Item
//                   label='Upload Barcode Image'
//                   name={'UploadBarcode'}
//                   valuePropName='fileList'
//                   getValueFromEvent={normFile}
//                   className='pt-5 w-full md:w-[49%]'
//                 >
//                   <Upload
//                     action='/upload.do'
//                     listType='picture-card'
//                     beforeUpload={beforeUpload2}
//                     accept='.png,.jpg,.jpeg'
//                     maxCount={1}
//                   >
//                     <button
//                       style={{ border: 0, background: 'none' }}
//                       type='button'
//                     >
//                       <PlusOutlined />
//                       <div style={{ marginTop: 8 }}>Upload Barcode Image</div>
//                     </button>
//                   </Upload>
//                 </AntdForm.Item>
//                 <AntdForm.Item
//                   label='Upload Certificates'
//                   name={'UploadCertificate'}
//                   valuePropName='fileList'
//                   getValueFromEvent={normFile}
//                   className='pt-5 w-full md:w-[49%]'
//                 >
//                   <Upload
//                     action='/upload.do'
//                     listType='picture-card'
//                     beforeUpload={beforeUpload2}
//                     accept='.png,.jpg,.jpeg'
//                   >
//                     <button
//                       style={{ border: 0, background: 'none' }}
//                       type='button'
//                     >
//                       <PlusOutlined />
//                       <div style={{ marginTop: 8 }}>Upload Certificates</div>
//                     </button>
//                   </Upload>
//                 </AntdForm.Item>
//               </div>
//             </div>
//           </section> */}

//           {/* certificate info */}
//           <section className='section'>
//             <h2 className=' pb-5 section-title'>
//               Certificate Body Information:
//             </h2>
//             <div className=''>
//               <div className='flex items-center md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='Certificate Name'
//                   name='CertificateName'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Certificate Name' />
//                 </AntdForm.Item>
//                 <AntdForm.Item
//                   label='Certification Address'
//                   name='CertificationAddress'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Certification Address' />
//                 </AntdForm.Item>
//               </div>
//             </div>
//           </section>

//           {/* Transaction info */}
//           <section className='section'>
//             <h2 className=' pb-5 section-title'>Transaction Certificate No:</h2>
//             <div className=''>
//               <div className='flex items-center md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='Transaction Certificate No'
//                   name='TransactionCertificateNo'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Transaction Certificate No' />
//                 </AntdForm.Item>
//               </div>
//             </div>
//           </section>

//           {/* Seller of Certified Products */}
//           <section className='section'>
//             <h2 className='text-2xl pb-5 section-title'>
//               Seller of (Name and Address of Individual/ICS)
//             </h2>
//             <div className=''>
//               <div className='flex items-center md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='Seller Name'
//                   name='SellerName'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Seller Name' />
//                 </AntdForm.Item>
//                 <AntdForm.Item
//                   label='Seller Address'
//                   name='SellerAddress'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Seller Address' />
//                 </AntdForm.Item>
//               </div>
//               <div className='flex items-center md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='PAN Number'
//                   name='SellerPAN'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter PAN Number' />
//                 </AntdForm.Item>
//               </div>
//             </div>
//           </section>

//           {/* Buyer of Certified Products */}
//           <section className='section'>
//             <h2 className='text-2xl pb-5 section-title'>
//               Buyer of (Name and Address)
//             </h2>
//             <div className=''>
//               <div className='flex items-center md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='Buyer Name'
//                   name='BuyerName'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Buyer Name' />
//                 </AntdForm.Item>
//                 <AntdForm.Item
//                   label='Buyer Address'
//                   name='BuyerAddress'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Buyer Address' />
//                 </AntdForm.Item>
//               </div>
//               <div className='flex items-center md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='PAN Number'
//                   name='BuyerPAN'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter PAN Number' />
//                 </AntdForm.Item>
//               </div>
//             </div>
//           </section>

//           {/* Place Of Dispatch */}
//           <section className='section'>
//             <h2 className='text-2xl pb-5 section-title'> Place Of Dispatch</h2>
//             <div className=''>
//               <div className='flex items-center md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='Place Of Dispatch'
//                   name='PlaceOfDispatch'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Place Of Dispatch' />
//                 </AntdForm.Item>
//               </div>
//             </div>
//           </section>

//           {/* Place Of Destination */}
//           <section className='section'>
//             <h2 className='text-2xl pb-5 section-title'>
//               {' '}
//               Place Of Destination
//             </h2>
//             <div className=''>
//               <div className='flex items-center md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='Place Of Destination'
//                   name='PlaceOfDestination'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Place Of Destination' />
//                 </AntdForm.Item>
//               </div>
//             </div>
//           </section>

//           {/* NPOP Organic Compliance */}
//           <section className='section'>
//             <h2 className='text-2xl pb-5 section-title'>
//               NPOP Organic Compliance
//             </h2>
//             <div className=''>
//               <AntdForm.List name='RawMaterialDetails'>
//                 {(fields, { add, remove }) => (
//                   <>
//                     {fields.map(({ key, name, ...restField }) => (
//                       <div key={key} className='pb-5'>
//                         <div className='flex md:justify-between flex-wrap'>
//                           <AntdForm.Item
//                             {...restField}
//                             label='Product'
//                             name={[name, 'Product']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <Input placeholder='Enter Product Name' />
//                           </AntdForm.Item>
//                           <AntdForm.Item
//                             {...restField}
//                             label='HS Code'
//                             name={[name, 'HSCode']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <Input placeholder='Enter HS Code' />
//                           </AntdForm.Item>
//                         </div>
//                         <div className='flex md:justify-between flex-wrap'>
//                           <AntdForm.Item
//                             {...restField}
//                             label='NPOP Organic Compliance'
//                             name={[name, 'NPOPOrganicCompliance']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <Input placeholder='Enter NPOP Organic Compliance' />
//                           </AntdForm.Item>
//                           <AntdForm.Item
//                             {...restField}
//                             label='Lot No & Quantity(in MT)'
//                             name={[name, 'LotNoQuantity']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <Input placeholder='Enter Lot No & Quantity(in MT)' />
//                           </AntdForm.Item>
//                         </div>
//                         <div className='flex md:justify-between flex-wrap'>
//                           <AntdForm.Item
//                             {...restField}
//                             label='Lot No'
//                             name={[name, 'LotNo']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <Input placeholder='Enter Lot No' />
//                           </AntdForm.Item>
//                         </div>
//                         <div className='flex md:justify-between flex-wrap'>
//                           <div className='w-full md:w-[49%]'>
//                             <AntdForm.List
//                               name={[name, 'TradeName']}
//                               initialValue={['']}
//                             >
//                               {(
//                                 tradeNameFields,
//                                 { add: addTradeName, remove: removeTradeName }
//                               ) => (
//                                 <>
//                                   {tradeNameFields.map(
//                                     ({
//                                       key: tradeNameKey,
//                                       name: tradeNameName,
//                                       ...tradeNameRestField
//                                     }) => (
//                                       <div
//                                         key={tradeNameKey}
//                                         className='flex md:justify-between flex-wrap relative'
//                                       >
//                                         <AntdForm.Item
//                                           {...tradeNameRestField}
//                                           label='Trade Name'
//                                           name={[tradeNameName, 'TradeName']}
//                                           className='w-full'
//                                         >
//                                           <Input placeholder='Enter Trade Name' />
//                                         </AntdForm.Item>
//                                         {tradeNameFields.length > 1 && (
//                                           <MinusCircleOutlined
//                                             className='dynamic-delete-button tradeNameDelete'
//                                             onClick={() =>
//                                               removeTradeName(tradeNameName)
//                                             }
//                                           />
//                                         )}
//                                       </div>
//                                     )
//                                   )}
//                                   <AntdForm.Item>
//                                     <Button
//                                       type='dashed'
//                                       onClick={() => addTradeName('')}
//                                       block
//                                       icon={<PlusOutlined />}
//                                     >
//                                       Add Trade Name
//                                     </Button>
//                                   </AntdForm.Item>
//                                 </>
//                               )}
//                             </AntdForm.List>
//                           </div>
//                           <div className='w-full md:w-[49%] packingDetail relative'>
//                             <AntdForm.List
//                               {...restField}
//                               name={[name, 'packingDetails']}
//                             >
//                               {(
//                                 packingDetailField,
//                                 {
//                                   add: addPackingDetail,
//                                   remove: removePackingDetail
//                                 }
//                               ) => (
//                                 <>
//                                   {packingDetailField.map(
//                                     ({
//                                       key: packingKey,
//                                       name: packingDetailName,
//                                       ...packingRestField
//                                     }) => (
//                                       <div
//                                         key={packingKey}
//                                         className='flex md:justify-between flex-wrap'
//                                       >
//                                         <AntdForm.Item
//                                           {...packingRestField}
//                                           label='Packing Detail'
//                                           name={[
//                                             packingDetailName,
//                                             'packingDetail'
//                                           ]}
//                                           className='w-full'
//                                         >
//                                           <Input placeholder='Enter Packing Detail' />
//                                         </AntdForm.Item>
//                                         {packingDetailField.length > 1 && (
//                                           <MinusCircleOutlined
//                                             className='dynamic-delete-button'
//                                             onClick={() =>
//                                               removePackingDetail(
//                                                 packingDetailName
//                                               )
//                                             }
//                                           />
//                                         )}
//                                       </div>
//                                     )
//                                   )}
//                                   <AntdForm.Item>
//                                     <Button
//                                       type='dashed'
//                                       onClick={() =>
//                                         addPackingDetail([{ packingDetail: '' }])
//                                       }
//                                       block
//                                       icon={<PlusOutlined />}
//                                     >
//                                       Add Packing Detail
//                                     </Button>
//                                   </AntdForm.Item>
//                                 </>
//                               )}
//                             </AntdForm.List>
//                             {fields.length > 1 && (
//                               <MinusCircleOutlined
//                                 className='dynamic-delete-button '
//                                 onClick={() => remove(name)}
//                               />
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     <AntdForm.Item>
//                       <Button
//                         type='dashed'
//                         onClick={() =>
//                           add({
//                             Product: '',
//                             HSCode: '',
//                             NPOPOrganicCompliance: '',
//                             LotNoQuantity: '',
//                             LotNo: '',
//                             TradeName: '',
//                             packingDetails: [{ packingDetail: '' }]
//                           })
//                         }
//                         block
//                         icon={<PlusOutlined />}
//                       >
//                         Add Raw Material
//                       </Button>
//                     </AntdForm.Item>
//                   </>
//                 )}
//               </AntdForm.List>
//             </div>
//           </section>

//           {/* Transaction Details */}
//           <section className='section'>
//             <h2 className='text-2xl pb-5 section-title'>Transaction Details</h2>
//             <div className='flex items-center md:justify-between flex-wrap'>
//               <AntdForm.Item
//                 label='Order/Contact No.'
//                 name='OrderContactNo'
//                 className='w-full md:w-[49%]'
//               >
//                 <Input placeholder='Enter Order/Contact No.' />
//               </AntdForm.Item>
//             </div>
//             <div className='flex items-center md:justify-between flex-wrap'>
//               <div className='ant-col ant-col-8 ant-form-item-label css-dev-only-do-not-override-7ny38l'>
//                 <label
//                   htmlFor='InvoiceNoDate'
//                   className=''
//                   title='Invoice No. & Date'
//                 >
//                   Invoice No. & Date
//                 </label>
//               </div>
//               <AntdForm.List name='InvoiceList'>
//                 {(fields, { add, remove }) => (
//                   <>
//                     {fields.map(({ key, name, ...restField }) => (
//                       <div key={key} className='pb-5 w-full relative'>
//                         {fields.length > 1 && (
//                           <MinusCircleOutlined
//                             className='dynamic-delete-button remove_invoiceList absolute right-0 top-0'
//                             onClick={() => remove(name)}
//                           />
//                         )}
//                         <div className='flex md:justify-between flex-wrap'>
//                           <AntdForm.Item
//                             {...restField}
//                             label='Serial No.'
//                             name={[name, 'SNo']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <Input placeholder='Enter Serial No.' />
//                           </AntdForm.Item>
//                           <AntdForm.Item
//                             {...restField}
//                             label='Invoice No.'
//                             name={[name, 'InvoiceNo']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <Input placeholder='Enter Invoice No.' />
//                           </AntdForm.Item>
//                         </div>
//                         <div className='flex md:justify-between flex-wrap'>
//                           <AntdForm.Item
//                             {...restField}
//                             label='Invoice Date'
//                             name={[name, 'InvoiceDate']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <DatePicker
//                               className='datePickerIpnut'
//                               format='DD/MM/YYYY'
//                             />
//                           </AntdForm.Item>
//                         </div>
//                       </div>
//                     ))}
//                     <AntdForm.Item>
//                       <Button
//                         type='dashed'
//                         onClick={() =>
//                           add({
//                             SNo: '',
//                             InvoiceNo: '',
//                             InvoiceDate: moment(new Date())
//                           })
//                         }
//                         block
//                         icon={<PlusOutlined />}
//                       >
//                         Add Invoice Details
//                       </Button>
//                     </AntdForm.Item>
//                   </>
//                 )}
//               </AntdForm.List>

//               <AntdForm.List name='TransportDetails'>
//                 {(fields, { add, remove }) => (
//                   <>
//                     {fields.map(({ key, name, ...restField }, index) => (
//                       <div key={key} className='pb-5 w-full relative'>
//                         {fields.length > 1 && (
//                           <MinusCircleOutlined
//                             className='dynamic-delete-button remove_invoiceList absolute right-0 top-0'
//                             onClick={() => {
//                               remove(name)
//                               // Update tagsArray and tags2Array on removal
//                               setTagsArray(prev =>
//                                 prev.filter((_, i) => i !== index)
//                               )
//                               setTags2Array(prev =>
//                                 prev.filter((_, i) => i !== index)
//                               )
//                             }}
//                           />
//                         )}
//                         <div className='flex md:justify-between flex-wrap'>
//                           <AntdForm.Item
//                             {...restField}
//                             label='Mode of Transport'
//                             name={[name, 'ModeOfTransport']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <Input placeholder='Enter Mode of Transport' />
//                           </AntdForm.Item>
//                           <AntdForm.Item
//                             {...restField}
//                             name={[name, 'TransportDocument']}
//                             label='Transport Document No.'
//                             className='w-full md:w-[49%]'
//                           >
//                             <TagInput
//                               tags={tagsArray[index] || []}
//                               setTags={newTags =>
//                                 setTagsArray(prev => {
//                                   const updated = [...prev]
//                                   updated[index] = newTags
//                                   return updated
//                                 })
//                               }
//                               name='TransportDocument'
//                             />
//                           </AntdForm.Item>
//                         </div>
//                         <div className='flex md:justify-between flex-wrap'>
//                           <AntdForm.Item
//                             {...restField}
//                             label='Date of Transport'
//                             name={[name, 'DateOfTransport']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <DatePicker
//                               className='datePickerIpnut'
//                               format='DD/MM/YYYY'
//                             />
//                           </AntdForm.Item>
//                           <AntdForm.Item
//                             {...restField}
//                             name={[name, 'vehicleNo']}
//                             label='Vehicle No.'
//                             className='w-full md:w-[49%]'
//                           >
//                             <TagInput
//                               tags={tags2Array[index] || []}
//                               setTags={newTags =>
//                                 setTags2Array(prev => {
//                                   const updated = [...prev]
//                                   updated[index] = newTags
//                                   return updated
//                                 })
//                               }
//                               name='vehicleNo'
//                             />
//                           </AntdForm.Item>
//                         </div>
//                       </div>
//                     ))}
//                     <AntdForm.Item>
//                       <Button
//                         type='dashed'
//                         onClick={() => {
//                           add({
//                             ModeOfTransport: '',
//                             TransportDocument: [],
//                             DateOfTransport: null,
//                             vehicleNo: []
//                           })
//                           setTagsArray(prev => [...prev, []])
//                           setTags2Array(prev => [...prev, []])
//                         }}
//                         block
//                         icon={<PlusOutlined />}
//                       >
//                         Add Transport Details
//                       </Button>
//                     </AntdForm.Item>
//                   </>
//                 )}
//               </AntdForm.List>
//             </div>
//           </section>

//           {/* Additional Declaration by the Certification Body */}
//           <section className='section'>
//             <h2 className='text-2xl pb-5 section-title'>
//               {' '}
//               Additional Declaration by the Certification Body
//             </h2>
//             <div className=''>
//               <AntdForm.List name='additionalDeclaration'>
//                 {(fields, { add, remove }) => (
//                   <>
//                     {fields.map(({ key, name, ...restField }) => (
//                       <div key={key} className='pb-5 w-full relative'>
//                         {/* Remove Icon */}
//                         {fields.length > 1 && (
//                           <MinusCircleOutlined
//                             className='dynamic-delete-button absolute right-0 top-0'
//                             onClick={() => remove(name)} // Removes the current declaration
//                           />
//                         )}
//                         <div className='flex md:justify-between flex-wrap'>
//                           <AntdForm.Item
//                             {...restField}
//                             label='Additional Declaration Item'
//                             name={[name, 'additionalDeclarationItem']}
//                             className='w-full md:w-[49%]'
//                           >
//                             <Input placeholder='Enter additional Declaration Item' />
//                           </AntdForm.Item>
//                         </div>
//                       </div>
//                     ))}
//                     <AntdForm.Item>
//                       <Button
//                         type='dashed'
//                         onClick={() =>
//                           add({
//                             additionalDeclarationItem: '' // Default value for new items
//                           })
//                         }
//                         block
//                         icon={<PlusOutlined />}
//                       >
//                         Add Declaration Item
//                       </Button>
//                     </AntdForm.Item>
//                   </>
//                 )}
//               </AntdForm.List>
//             </div>
//           </section>

//           {/* Issued Date */}
//           <section className='section'>
//             <h2 className='text-2xl pb-5 section-title'>Issued Date</h2>
//             <div className=''>
//               <div className='flex items-center md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='Issued Date'
//                   name='IssuedDate'
//                   className='w-full md:w-[49%] '
//                 >
//                   {/* <DatePicker className='datePickerIpnut' />
//                    */}
//                   <DatePicker
//                     className=' datePickerIpnut'
//                     format='DD/MM/YYYY'
//                     //  defaultValue={defaultDate}
//                     // defaultValue={dayjs('01/01/2015', 'DD/MM/YYYY')}
//                   />
//                 </AntdForm.Item>
//               </div>
//             </div>
//           </section>

//           {/* Name and Signature of the Authorised Person */}
//           <section className='section'>
//             <h2 className='text-2xl pb-5 section-title'>Authorised Info</h2>
//             <div className=''>
//               <div className='flex items-center md:justify-between flex-wrap'>
//                 <AntdForm.Item
//                   label='Authorised Name'
//                   name='AuthorisedName'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Authorised Name' />
//                 </AntdForm.Item>
//                 <AntdForm.Item
//                   label='Authorised Position'
//                   name='AuthorisedPosition'
//                   className='w-full md:w-[49%]'
//                 >
//                   <Input placeholder='Enter Authorised Position' />
//                 </AntdForm.Item>
//               </div>
//             </div>
//           </section>

//           <AntdForm.Item className=' submitButtonGroup'>
//             <Button type='primary' htmlType='submit' className='submit-btn '>
//               Submit
//             </Button>
//           </AntdForm.Item>
//         </AntdForm>
//       </div>
//       </div>
//       </div>
//     </>
//   )
// }

// export default ImportPdfTCtype2
import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Cascader,
  ColorPicker,
  DatePicker,
  Form as AntdForm,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  message,
  Space,
  theme,
  Tag,
  InputRef
} from 'antd'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment' // Import moment.js
// import { form1Set, form2submit, formFill1, formFill2 } from '../api/Form1Api'
import { form1Set, form2submit, formFill1, formFill2Try } from '../../api/Form1Api'
import { cloneDeep, forEach } from 'lodash'
import TagInput from '../../component/Tags'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import Spinner from '../../layout/Spinner'
import { useNavigate } from 'react-router-dom'
import { Slidebar } from '../../layout/Slidebar'

const ImportPdfTCtype2 = () => {
  const [form] = AntdForm.useForm()
  const [form2] = AntdForm.useForm()
  const [formNo, setFormNo] = useState('1')
  const [data, setdata] = useState([])
  const navigate = useNavigate()
  const [tags, setTags] = useState([])
  const [tags2, setTags2] = useState([])
  const [tagsArray, setTagsArray] = useState([[]])
  const [tags2Array, setTags2Array] = useState([[]])
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)

  const handleSubmit = async values => {
    try {
      setLoading(true)
      let fomrData = new FormData()
      fomrData.append('pdf', values.UploadPdf[0].originFileObj)
      let datas = await formFill2Try(fomrData)
      let data = datas?.data
      
      if (datas?.status_code === 200 || datas?.status_code === 201) {
        setFormNo('2')
        const transportDetails =
          data?.extracted_data?.transaction_details?.transport_details?.map(
            transport => {
              const modeOfTransport = transport?.mode_of_transport || '' // Default to an empty string
              const transportDocument =
                transport?.transport_document_numbers?.split(',') || [] 
              const dateOfTransport = transport?.date_of_transport
                ? dayjs(transport?.date_of_transport, 'DD/MM/YYYY')
                : null

              const vehicleNo =
                transport?.vehicle_number_or_bull_cart_or_air_or_others || [] // Fallback to empty array if no value
              setLoading(false)

              return {
                ModeOfTransport: modeOfTransport,
                TransportDocument: transportDocument,
                DateOfTransport: dateOfTransport,
                vehicleNo: vehicleNo
              }
            }
          ) || []

        const additionalTransportDetails =
          tags?.map((tag, index) => {
            return {
              ModeOfTransport: '',
              TransportDocument: tag,
              DateOfTransport: null,
              vehicleNo: tags2 && tags2[index] ? tags2[index] : []
            }
          }) || []

        const allTransportDetails = transportDetails?.concat(
          additionalTransportDetails
        )

        if (allTransportDetails.length === 0) {
          allTransportDetails.push({
            ModeOfTransport: '',
            TransportDocument: [],
            DateOfTransport: null,
            vehicleNo: []
          })
        }

        // const issuedDate =
        //   data?.extracted_data?.additional_declaration_by_the_certification_body
        //     ?.issue_date
     
        
        form2.setFieldsValue({
          UploadQrCode: [],
          UploadLogoImage: [],
          UploadBarcode: [],
          CertificateName: data?.extracted_data?.certification_body?.name || '',
          CertificationAddress:
            data?.extracted_data?.certification_body?.address || '',
          TransactionCertificateNo:
            data?.extracted_data?.transaction_certificate_number || '',
          SellerName:
            data?.extracted_data?.['seller_of_individual/ics']?.name || '',
          SellerAddress:
            data?.extracted_data?.['seller_of_individual/ics']?.address || '',
          SellerPAN:
            data?.extracted_data?.['seller_of_individual/ics']?.pan || '',
          BuyerName: data?.extracted_data?.buyer?.name || '',
          BuyerAddress: data?.extracted_data?.buyer?.address || '',
          BuyerPAN: data?.extracted_data?.buyer?.pan || '',
          PlaceOfDispatch: data?.extracted_data?.place_of_dispatch || '',
          PlaceOfDestination: data?.extracted_data?.place_of_destination || '',
          additionalDeclaration:
            data?.extracted_data?.additional_declaration_by_the_certification_body?.this_is_to_cerify_that?.map(
              item => ({
                additionalDeclarationItem: item
              })
            ) || [],
          RawMaterialDetails:
            data?.extracted_data?.product_details?.map(product => ({
              Product: product.product_name,
              HSCode: product.hs_code,
              NPOPOrganicCompliance:
                product?.['npop_organic_compliance_c1/c2/c3/organic'],
              LotNoQuantity: product.quantity_in_mt,
              LotNo: product.lot_no,
              TradeName: product.trade_name?.map(tradeName => ({
                TradeName: tradeName
              })) || [{ TradeName: '' }],
              packingDetails:
                product.packing_details?.map(packingDetail => ({
                  packingDetail
                })) || []
            })) || [],
          InvoiceList:
            data?.extracted_data?.transaction_details?.invoice_details?.map(
              invoice => {
                return {
                  SNo: invoice.s_no,
                  InvoiceNo: invoice.invoice_number,
                  InvoiceDate: dayjs(invoice?.invoice_date, 'DD/MM/YYYY')
                }
              }
            ) || [],
          OrderContactNo:
            data?.extracted_data?.transaction_details
              ?.order_or_contact_number || '',
          TransportDetails: allTransportDetails,
          AuthorisedName:
            data?.extracted_data?.name_and_signature_of_the_authorised_person
              ?.name || '',
          AuthorisedPosition:
            data?.extracted_data?.name_and_signature_of_the_authorised_person
              ?.position || '',
          IssuedDate: dayjs(
            data?.extracted_data
              ?.additional_declaration_by_the_certification_body?.issue_date,
            'DD/MM/YYYY'
          )
        })
          
        // Log or debug the updated TransportDetails
        
        setTagsArray(
          allTransportDetails.map(detail => detail.TransportDocument || [])
          // allTransportDetails.map(detail =>[])
        )
        setTags2Array(allTransportDetails.map(detail => detail?.vehicleNo?.split(/[,:;|]+/).filter(Boolean)  || []))
        // setTags2Array(allTransportDetails.map(detail => []))

        toast.success("Pdf submitted Successfully.")
      }else{
        toast.error("Something went Wrong.")
      }
    } catch (error) {
      toast.error("Something went Wrong.")
      console.log(error)
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

  const handleSubmit2 = async values => {
    setLoading2(true)
    try {

      // Prepare Product Details
      const productDetails =
        values?.RawMaterialDetails?.map(ele => ({
          hs_code: ele.HSCode || 'Default HS Code',
          quantity_in_MT: ele.LotNoQuantity || '0',
          'NPOP_organic_compliance_C1/C2/C3/organic':
            ele.NPOPOrganicCompliance || '',
          lot_no: ele.LotNo,
          product_name: ele.Product || 'Default Product Name',
          trade_name: ele.TradeName?.map(item => item.TradeName) || [],
          packing_details:
            ele.packingDetails?.map(item => item.packingDetail) || []
        })) || []

      // Prepare Invoice Details
      const invoiceDetails =
        values?.InvoiceList?.map(ele => ({
          s_no: ele.SNo,
          invoice_number: ele.InvoiceNo,
          invoice_date: ele.InvoiceDate
        })) || []

      // Prepare Transport Details
      const transportDetails =
        values?.TransportDetails?.map((ele, ind) => ({
          mode_of_transport: ele.ModeOfTransport || '',
          transport_document_numbers: tagsArray[ind]?.join(',') || '',
          vehicle_number_or_bull_cart_or_air_or_others: tags2Array[ind] || [],
          date_of_transport: ele.DateOfTransport || null
        })) || []

      // Prepare Additional Declaration
      const thisIsToCertifyThat =
        values?.additionalDeclaration?.map(
          ele => ele.additionalDeclarationItem
        ) || []

      // Prepare Data Object
      const data = {
        file_name: 'abc',

        extracted_data: {
          file_title: 'abc',
          qr_info: '{253} SS08008456039022024002111',
          certification_body: {
            name: values.CertificateName || '',
            address: values.CertificationAddress || ''
          },
          transaction_certificate_number: values.TransactionCertificateNo || '',
          'seller_of_individual/ICS': {
            name: values.SellerName || '',
            address: values.SellerAddress || '',
            PAN: values.SellerPAN || ''
          },
          buyer: {
            name: values.BuyerName || '',
            address: values.BuyerAddress || '',
            PAN: values.BuyerPAN || ''
          },
          place_of_dispatch: values.PlaceOfDispatch || '',
          place_of_destination: values.PlaceOfDestination || '',
          product_details: productDetails,
          transaction_details: {
            order_or_contact_number: values.OrderContactNo || '',
            invoice_details: invoiceDetails,
            transport_details: transportDetails
          },
          additional_declaration_by_the_certification_body: {
            this_is_to_cerify_that: thisIsToCertifyThat,
            issue_date: values.IssuedDate || null
          },
          name_and_signature_of_the_authorised_person: {
            name: values.AuthorisedName || '',
            position: values.AuthorisedPosition || ''
          }
        }
      }

      // Submit Data
      const response = await form2submit(data)
      if (response?.status_code === 200 || response?.status_code === 201) {
        navigate('/tcType2List')
        toast.success("Form submitted Successfully.")
      }else{
        toast.error("Something went Wrong.")
      }
    } catch (error) {
      console.error('Error during form submission:', error)
      toast.error("Something went Wrong.")
    }
    setLoading2(false)
  }

  const beforeUpload2 = file => {
    const isValidType = file.type === 'image/png' || file.type === 'image/jpeg'
    if (!isValidType) {
      message.error('You can only upload PNG or JPG files!')
    }
    return isValidType
  }

  return formNo === '1' ? (
    <>
      {loading && <Spinner message='Loading...' isActive={loading} />}
  <div className='flex'>   <div style={{ width: "20%" }}>  <Slidebar /></div>      <div style={{ width: "80%" }}> 
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
          <h2 className=' pb-5 section-title'>Upload PDF For Transaction Certificate (TC) Form Type 2 Form </h2>
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
                  onChange={info => {}}
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

        <AntdForm.Item className='submitButtonGroup'>
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
      {loading2 && <Spinner message='Loading...' isActive={loading2} />}{' '}
      <div className='flex'>   <div style={{ width: "20%" }}>  <Slidebar /></div>      <div style={{ width: "80%" }}> 
      <div className='container mx-auto  '>
        <AntdForm
          form={form2}
          onFinish={handleSubmit2}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout='vertical'
          className='form_1  rounded-xl shadow-xl'
          style={{ maxWidth: 900, margin: '0 auto' }}
        >
          <h1 className='text-2xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center'>
            Transaction Certificate (TC) Form Type 2
          </h1>
          {/* upload logo and qrcode */}
          {/* <section className='section'>
            <h3 className='section-title pb-0 '>Upload Logo And Qr Code: </h3>
            <div className=''>
              <div className='flex  md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='Upload Qr Code'
                  name={'UploadQrCode'}
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                  className='pt-5  w-full md:w-[49%]'
                >
                  <Upload
                    action='/upload.do'
                    listType='picture-card'
                    beforeUpload={beforeUpload2}
                    accept='.png,.jpg,.jpeg'
                    maxCount={1}
                  >
                    <button
                      style={{ border: 0, background: 'none' }}
                      type='button'
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload Qr Code</div>
                    </button>
                  </Upload>
                </AntdForm.Item>
                <AntdForm.Item
                  label='Upload Logo Image'
                  name={'UploadLogoImage'}
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                  className='pt-5 w-full md:w-[49%]'
                >
                  <Upload
                    action='/upload.do'
                    listType='picture-card'
                    beforeUpload={beforeUpload2}
                    accept='.png,.jpg,.jpeg'
                    maxCount={1}
                  >
                    <button
                      style={{ border: 0, background: 'none' }}
                      type='button'
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload Logo Image</div>
                    </button>
                  </Upload>
                </AntdForm.Item>
                <AntdForm.Item
                  label='Upload Barcode Image'
                  name={'UploadBarcode'}
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                  className='pt-5 w-full md:w-[49%]'
                >
                  <Upload
                    action='/upload.do'
                    listType='picture-card'
                    beforeUpload={beforeUpload2}
                    accept='.png,.jpg,.jpeg'
                    maxCount={1}
                  >
                    <button
                      style={{ border: 0, background: 'none' }}
                      type='button'
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload Barcode Image</div>
                    </button>
                  </Upload>
                </AntdForm.Item>
                <AntdForm.Item
                  label='Upload Certificates'
                  name={'UploadCertificate'}
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                  className='pt-5 w-full md:w-[49%]'
                >
                  <Upload
                    action='/upload.do'
                    listType='picture-card'
                    beforeUpload={beforeUpload2}
                    accept='.png,.jpg,.jpeg'
                  >
                    <button
                      style={{ border: 0, background: 'none' }}
                      type='button'
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload Certificates</div>
                    </button>
                  </Upload>
                </AntdForm.Item>
              </div>
            </div>
          </section> */}

          {/* certificate info */}
          <section className='section'>
            <h2 className=' pb-5 section-title'>
              Certificate Body Information:
            </h2>
            <div className=''>
              <div className='flex items-center md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='Certificate Name'
                  name='CertificateName'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Certificate Name' />
                </AntdForm.Item>
                <AntdForm.Item
                  label='Certification Address'
                  name='CertificationAddress'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Certification Address' />
                </AntdForm.Item>
              </div>
            </div>
          </section>

          {/* Transaction info */}
          <section className='section'>
            <h2 className=' pb-5 section-title'>Transaction Certificate No:</h2>
            <div className=''>
              <div className='flex items-center md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='Transaction Certificate No'
                  name='TransactionCertificateNo'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Transaction Certificate No' />
                </AntdForm.Item>
              </div>
            </div>
          </section>

          {/* Seller of Certified Products */}
          <section className='section'>
            <h2 className='text-2xl pb-5 section-title'>
              Seller of (Name and Address of Individual/ICS)
            </h2>
            <div className=''>
              <div className='flex items-center md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='Seller Name'
                  name='SellerName'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Seller Name' />
                </AntdForm.Item>
                <AntdForm.Item
                  label='Seller Address'
                  name='SellerAddress'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Seller Address' />
                </AntdForm.Item>
              </div>
              <div className='flex items-center md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='PAN Number'
                  name='SellerPAN'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter PAN Number' />
                </AntdForm.Item>
              </div>
            </div>
          </section>

          {/* Buyer of Certified Products */}
          <section className='section'>
            <h2 className='text-2xl pb-5 section-title'>
              Buyer of (Name and Address)
            </h2>
            <div className=''>
              <div className='flex items-center md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='Buyer Name'
                  name='BuyerName'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Buyer Name' />
                </AntdForm.Item>
                <AntdForm.Item
                  label='Buyer Address'
                  name='BuyerAddress'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Buyer Address' />
                </AntdForm.Item>
              </div>
              <div className='flex items-center md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='PAN Number'
                  name='BuyerPAN'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter PAN Number' />
                </AntdForm.Item>
              </div>
            </div>
          </section>

          {/* Place Of Dispatch */}
          <section className='section'>
            <h2 className='text-2xl pb-5 section-title'> Place Of Dispatch</h2>
            <div className=''>
              <div className='flex items-center md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='Place Of Dispatch'
                  name='PlaceOfDispatch'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Place Of Dispatch' />
                </AntdForm.Item>
              </div>
            </div>
          </section>

          {/* Place Of Destination */}
          <section className='section'>
            <h2 className='text-2xl pb-5 section-title'>
              {' '}
              Place Of Destination
            </h2>
            <div className=''>
              <div className='flex items-center md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='Place Of Destination'
                  name='PlaceOfDestination'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Place Of Destination' />
                </AntdForm.Item>
              </div>
            </div>
          </section>

          {/* NPOP Organic Compliance */}
          <section className='section'>
            <h2 className='text-2xl pb-5 section-title'>
              NPOP Organic Compliance
            </h2>
            <div className=''>
              <AntdForm.List name='RawMaterialDetails'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className='pb-5'>
                        <div className='flex md:justify-between flex-wrap'>
                          <AntdForm.Item
                            {...restField}
                            label='Product'
                            name={[name, 'Product']}
                            className='w-full md:w-[49%]'
                          >
                            <Input placeholder='Enter Product Name' />
                          </AntdForm.Item>
                          <AntdForm.Item
                            {...restField}
                            label='HS Code'
                            name={[name, 'HSCode']}
                            className='w-full md:w-[49%]'
                          >
                            <Input placeholder='Enter HS Code' />
                          </AntdForm.Item>
                        </div>
                        <div className='flex md:justify-between flex-wrap'>
                          <AntdForm.Item
                            {...restField}
                            label='NPOP Organic Compliance'
                            name={[name, 'NPOPOrganicCompliance']}
                            className='w-full md:w-[49%]'
                          >
                            <Input placeholder='Enter NPOP Organic Compliance' />
                          </AntdForm.Item>
                          <AntdForm.Item
                            {...restField}
                            label='Lot No & Quantity(in MT)'
                            name={[name, 'LotNoQuantity']}
                            className='w-full md:w-[49%]'
                          >
                            <Input placeholder='Enter Lot No & Quantity(in MT)' />
                          </AntdForm.Item>
                        </div>
                        <div className='flex md:justify-between flex-wrap'>
                          <AntdForm.Item
                            {...restField}
                            label='Lot No'
                            name={[name, 'LotNo']}
                            className='w-full md:w-[49%]'
                          >
                            <Input placeholder='Enter Lot No' />
                          </AntdForm.Item>
                        </div>
                        <div className='flex md:justify-between flex-wrap'>
                          <div className='w-full md:w-[49%]'>
                            <AntdForm.List
                              name={[name, 'TradeName']}
                              initialValue={['']}
                            >
                              {(
                                tradeNameFields,
                                { add: addTradeName, remove: removeTradeName }
                              ) => (
                                <>
                                  {tradeNameFields.map(
                                    ({
                                      key: tradeNameKey,
                                      name: tradeNameName,
                                      ...tradeNameRestField
                                    }) => (
                                      <div
                                        key={tradeNameKey}
                                        className='flex md:justify-between flex-wrap relative'
                                      >
                                        <AntdForm.Item
                                          {...tradeNameRestField}
                                          label='Trade Name'
                                          name={[tradeNameName, 'TradeName']}
                                          className='w-full'
                                        >
                                          <Input placeholder='Enter Trade Name' />
                                        </AntdForm.Item>
                                        {tradeNameFields.length > 1 && (
                                          <MinusCircleOutlined
                                            className='dynamic-delete-button tradeNameDelete'
                                            onClick={() =>
                                              removeTradeName(tradeNameName)
                                            }
                                          />
                                        )}
                                      </div>
                                    )
                                  )}
                                  <AntdForm.Item>
                                    <Button
                                      type='dashed'
                                      onClick={() => addTradeName('')}
                                      block
                                      icon={<PlusOutlined />}
                                    >
                                      Add Trade Name
                                    </Button>
                                  </AntdForm.Item>
                                </>
                              )}
                            </AntdForm.List>
                          </div>
                          <div className='w-full md:w-[49%] packingDetail relative'>
                            <AntdForm.List
                              {...restField}
                              name={[name, 'packingDetails']}
                            >
                              {(
                                packingDetailField,
                                {
                                  add: addPackingDetail,
                                  remove: removePackingDetail
                                }
                              ) => (
                                <>
                                  {packingDetailField.map(
                                    ({
                                      key: packingKey,
                                      name: packingDetailName,
                                      ...packingRestField
                                    }) => (
                                      <div
                                        key={packingKey}
                                        className='flex md:justify-between flex-wrap'
                                      >
                                        <AntdForm.Item
                                          {...packingRestField}
                                          label='Packing Detail'
                                          name={[
                                            packingDetailName,
                                            'packingDetail'
                                          ]}
                                          className='w-full'
                                        >
                                          <Input placeholder='Enter Packing Detail' />
                                        </AntdForm.Item>
                                        {packingDetailField.length > 1 && (
                                          <MinusCircleOutlined
                                            className='dynamic-delete-button'
                                            onClick={() =>
                                              removePackingDetail(
                                                packingDetailName
                                              )
                                            }
                                          />
                                        )}
                                      </div>
                                    )
                                  )}
                                  <AntdForm.Item>
                                    <Button
                                      type='dashed'
                                      onClick={() =>
                                        addPackingDetail([{ packingDetail: '' }])
                                      }
                                      block
                                      icon={<PlusOutlined />}
                                    >
                                      Add Packing Detail
                                    </Button>
                                  </AntdForm.Item>
                                </>
                              )}
                            </AntdForm.List>
                            {fields.length > 1 && (
                              <MinusCircleOutlined
                                className='dynamic-delete-button '
                                onClick={() => remove(name)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <AntdForm.Item>
                      <Button
                        type='dashed'
                        onClick={() =>
                          add({
                            Product: '',
                            HSCode: '',
                            NPOPOrganicCompliance: '',
                            LotNoQuantity: '',
                            LotNo: '',
                            TradeName: '',
                            packingDetails: [{ packingDetail: '' }]
                          })
                        }
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Raw Material
                      </Button>
                    </AntdForm.Item>
                  </>
                )}
              </AntdForm.List>
            </div>
          </section>

          {/* Transaction Details */}
          <section className='section'>
            <h2 className='text-2xl pb-5 section-title'>Transaction Details</h2>
            <div className='flex items-center md:justify-between flex-wrap'>
              <AntdForm.Item
                label='Order/Contact No.'
                name='OrderContactNo'
                className='w-full md:w-[49%]'
              >
                <Input placeholder='Enter Order/Contact No.' />
              </AntdForm.Item>
            </div>
            <div className='flex items-center md:justify-between flex-wrap'>
              <div className='ant-col ant-col-8 ant-form-item-label css-dev-only-do-not-override-7ny38l'>
                <label
                  htmlFor='InvoiceNoDate'
                  className=''
                  title='Invoice No. & Date'
                >
                  Invoice No. & Date
                </label>
              </div>
              <AntdForm.List name='InvoiceList'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className='pb-5 w-full relative'>
                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            className='dynamic-delete-button remove_invoiceList absolute right-0 top-0'
                            onClick={() => remove(name)}
                          />
                        )}
                        <div className='flex md:justify-between flex-wrap'>
                          <AntdForm.Item
                            {...restField}
                            label='Serial No.'
                            name={[name, 'SNo']}
                            className='w-full md:w-[49%]'
                          >
                            <Input placeholder='Enter Serial No.' />
                          </AntdForm.Item>
                          <AntdForm.Item
                            {...restField}
                            label='Invoice No.'
                            name={[name, 'InvoiceNo']}
                            className='w-full md:w-[49%]'
                          >
                            <Input placeholder='Enter Invoice No.' />
                          </AntdForm.Item>
                        </div>
                        <div className='flex md:justify-between flex-wrap'>
                          <AntdForm.Item
                            {...restField}
                            label='Invoice Date'
                            name={[name, 'InvoiceDate']}
                            className='w-full md:w-[49%]'
                          >
                            <DatePicker
                              className='datePickerIpnut'
                              format='DD/MM/YYYY'
                            />
                          </AntdForm.Item>
                        </div>
                      </div>
                    ))}
                    <AntdForm.Item>
                      <Button
                        type='dashed'
                        onClick={() =>
                          add({
                            SNo: '',
                            InvoiceNo: '',
                            InvoiceDate: moment(new Date())
                          })
                        }
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Invoice Details
                      </Button>
                    </AntdForm.Item>
                  </>
                )}
              </AntdForm.List>

              <AntdForm.List name='TransportDetails'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <div key={key} className='pb-5 w-full relative'>
                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            className='dynamic-delete-button remove_invoiceList absolute right-0 top-0'
                            onClick={() => {
                              remove(name)
                              // Update tagsArray and tags2Array on removal
                              setTagsArray(prev =>
                                prev.filter((_, i) => i !== index)
                              )
                              setTags2Array(prev =>
                                prev.filter((_, i) => i !== index)
                              )
                            }}
                          />
                        )}
                        <div className='flex md:justify-between flex-wrap'>
                          <AntdForm.Item
                            {...restField}
                            label='Mode of Transport'
                            name={[name, 'ModeOfTransport']}
                            className='w-full md:w-[49%]'
                          >
                            <Input placeholder='Enter Mode of Transport' />
                          </AntdForm.Item>
                          <AntdForm.Item
                            {...restField}
                            name={[name, 'TransportDocument']}
                            label='Transport Document No.'
                            className='w-full md:w-[49%]'
                          >
                            <TagInput
                              tags={tagsArray[index] || []}
                              setTags={newTags =>
                                setTagsArray(prev => {
                                  const updated = [...prev]
                                  updated[index] = newTags
                                  return updated
                                })
                              }
                              name='TransportDocument'
                            />
                          </AntdForm.Item>
                        </div>
                        <div className='flex md:justify-between flex-wrap'>
                          <AntdForm.Item
                            {...restField}
                            label='Date of Transport'
                            name={[name, 'DateOfTransport']}
                            className='w-full md:w-[49%]'
                          >
                            <DatePicker
                              className='datePickerIpnut'
                              format='DD/MM/YYYY'
                            />
                          </AntdForm.Item>
                          <AntdForm.Item
                            {...restField}
                            name={[name, 'vehicleNo']}
                            label='Vehicle No.'
                            className='w-full md:w-[49%]'
                          >
                            <TagInput
                              tags={tags2Array[index] || []}
                              setTags={newTags =>
                                setTags2Array(prev => {
                                  const updated = [...prev]
                                  updated[index] = newTags
                                  return updated
                                })
                              }
                              name='vehicleNo'
                            />
                          </AntdForm.Item>
                        </div>
                      </div>
                    ))}
                    <AntdForm.Item>
                      <Button
                        type='dashed'
                        onClick={() => {
                          add({
                            ModeOfTransport: '',
                            TransportDocument: [],
                            DateOfTransport: null,
                            vehicleNo: []
                          })
                          setTagsArray(prev => [...prev, []])
                          setTags2Array(prev => [...prev, []])
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Transport Details
                      </Button>
                    </AntdForm.Item>
                  </>
                )}
              </AntdForm.List>
            </div>
          </section>

          {/* Additional Declaration by the Certification Body */}
          <section className='section'>
            <h2 className='text-2xl pb-5 section-title'>
              {' '}
              Additional Declaration by the Certification Body
            </h2>
            <div className=''>
              <AntdForm.List name='additionalDeclaration'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} className='pb-5 w-full relative'>
                        {/* Remove Icon */}
                        {fields.length > 1 && (
                          <MinusCircleOutlined
                            className='dynamic-delete-button absolute right-0 top-0'
                            onClick={() => remove(name)} // Removes the current declaration
                          />
                        )}
                        <div className='flex md:justify-between flex-wrap'>
                          <AntdForm.Item
                            {...restField}
                            label='Additional Declaration Item'
                            name={[name, 'additionalDeclarationItem']}
                            className='w-full md:w-[49%]'
                          >
                            <Input placeholder='Enter additional Declaration Item' />
                          </AntdForm.Item>
                        </div>
                      </div>
                    ))}
                    <AntdForm.Item>
                      <Button
                        type='dashed'
                        onClick={() =>
                          add({
                            additionalDeclarationItem: '' // Default value for new items
                          })
                        }
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Declaration Item
                      </Button>
                    </AntdForm.Item>
                  </>
                )}
              </AntdForm.List>
            </div>
          </section>

          {/* Issued Date */}
          <section className='section'>
            <h2 className='text-2xl pb-5 section-title'>Issued Date</h2>
            <div className=''>
              <div className='flex items-center md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='Issued Date'
                  name='IssuedDate'
                  className='w-full md:w-[49%] '
                >
                  {/* <DatePicker className='datePickerIpnut' />
                   */}
                  <DatePicker
                    className=' datePickerIpnut'
                    format='DD/MM/YYYY'
                    //  defaultValue={defaultDate}
                    // defaultValue={dayjs('01/01/2015', 'DD/MM/YYYY')}
                  />
                </AntdForm.Item>
              </div>
            </div>
          </section>

          {/* Name and Signature of the Authorised Person */}
          <section className='section'>
            <h2 className='text-2xl pb-5 section-title'>Authorised Info</h2>
            <div className=''>
              <div className='flex items-center md:justify-between flex-wrap'>
                <AntdForm.Item
                  label='Authorised Name'
                  name='AuthorisedName'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Authorised Name' />
                </AntdForm.Item>
                <AntdForm.Item
                  label='Authorised Position'
                  name='AuthorisedPosition'
                  className='w-full md:w-[49%]'
                >
                  <Input placeholder='Enter Authorised Position' />
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
      </div>
    </>
  )
}

export default ImportPdfTCtype2