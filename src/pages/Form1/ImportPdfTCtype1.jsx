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
// import { form1Set, formFill1 } from '../../api/Form1Api'
// import { cloneDeep, forEach } from 'lodash'
// import TagInput from '../../component/Tags'
// import dayjs from 'dayjs'
// import { Slidebar } from '../../layout/Slidebar'
// import Spinner from '../../layout/Spinner'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'

// const ImportPdfTCtype1 = () => {
//   const [form] = AntdForm.useForm()
//   const [form2] = AntdForm.useForm()
//   const [formNo, setFormNo] = useState('1')
//   const [data, setdata] = useState('1')
//     const [loading, setLoading] = useState(false)
//     const [loading2, setLoading2] = useState(false)
//     const navigate = useNavigate();
//   const handleSubmit = async values => {
//     setLoading(true)
//     try {
//       let fomrData = new FormData()
//       fomrData.append('pdf', values.UploadPdf[0].originFileObj)
//       let response = await formFill1(fomrData)
//       let res = response?.data?.extracted_data

//       if (response?.status_code === 200 || response?.status_code === 201) {
//         setFormNo('2')
//         setdata(res)
//         toast.success("pdf submitted Successfully.")
//         let DeclarationList_ = []
//         res?.declarations_by_certification_body?.contents?.forEach((ele, ind) => {
//           let obj = {
//             DeclarationList_: ele
//           }
//           DeclarationList_.push(obj)
//         })
//         if (DeclarationList_.length === 0) {
//           DeclarationList_ = [{ DeclarationList_: '' }]
//         }
//         let ShipmentDetailss = []
//         res?.shipments?.forEach((ele, ind) => {
//           let obj = {
//             ShipmentNo_: ele?.shipment_no,
//             ShipmentDate_: dayjs(ele.shipment_date, "DD/MM/YYYY"),
//             ShipmentDocNo_: ele.shipment_doc_no,
//             ShipmentsGrossShippingWeight_: ele.gross_shipping_weight,
//             InvoiceReferences_: ele.invoice_references,
//             ConsigneeNameAndAddress_: ele.consignee_name_and_address
//           }
//           ShipmentDetailss.push(obj)
//         })

//         if (ShipmentDetailss.length === 0) {
//           ShipmentDetailss = [
//             {
//               ShipmentNo_: '',
//               ShipmentDate_: '',
//               ShipmentDocNo_: '',
//               ShipmentsGrossShippingWeight_: '',
//               InvoiceReferences_: '',
//               ConsigneeNameAndAddress_: ''
//             }
//           ]
//         }

//         let ProductDetails = []

//         res?.certified_products?.map((ele, ind) => {
//           let obj = {
//             ProductNo: ele.product_no,
//             OrderNo: ele.order_no,
//             ArticleNo: ele.article_no,
//             NumberofUnits: ele.number_of_units,
//             ProductsNetShippingWeight: ele.net_shipping_weight,
//             SupplementaryWeight: ele.supplementary_weight,
//             ProductsCertifiedWeight: ele.certified_weight,
//             ProductionDate: dayjs(ele.production_date, "DD/MM/YYYY"),
//             Productcategory: ele.product_category,
//             ProductDetail: ele.product_detail,
//             MaterialComposition: ele.material_composition,
//             StandardLabelGrade: ele.standard_label_grade,
//             AdditionalInfo: ele.additional_info,
//             LastProcessor: ele.last_processor,
//             licenseNo: ele.license_number,
//             Country: ele.country
//           }
//           ProductDetails.push(obj)
//         })
//         if (ProductDetails.length === 0) {
//           ProductDetails = [
//             {
//               ProductNo: '',
//               OrderNo: '',
//               ArticleNo: '',
//               NumberofUnits: '',
//               ProductsNetShippingWeight: '',
//               SupplementaryWeight: '',
//               ProductsCertifiedWeight: '',
//               ProductionDate: null,
//               Productcategory: '',
//               ProductDetail: '',
//               MaterialComposition: '',
//               StandardLabelGrade: '',
//               AdditionalInfo: '',
//               LastProcessor: '',
//               licenseNo: '',
//               Country: ''
//             }
//           ]
//         }

//         let RawMaterialDetails = []
//         res?.certified_raw_materials_and_declared_geographic_origin?.forEach(
//           (ele, ind) => {
//             let countrys = []
//             ele?.country?.split(',')?.forEach((ele, ind) => {
//               countrys.push({ CountryName: ele })
//             })
//             let obj = {
//               OrganicCotton: ele.material_details,
//               RawMaterialsCertifiedWeight: ele.certified_weight,
//               CountryArea: countrys
//             }
//             RawMaterialDetails.push(obj)
//           }
//         )
//         if (RawMaterialDetails.length === 0) {
//           RawMaterialDetails.push({
//             OrganicCotton: '',
//             RawMaterialsCertifiedWeight: '',
//             CountryArea: [{ CountryName: '' }]
//           })
//         }

//         let inputTcs = []
//         // inputTcs = res?.certified_input_references?.input_tcs.split(',') || []
//         inputTcs = res?.certified_input_references?.input_tcs.split(/[,:;]\s*/).filter(Boolean) || []
//         let farm_tcs = []
//         // farm_tcs = res?.certified_input_references?.farm_tcs?.split(',') || []
//         farm_tcs = res?.certified_input_references?.farm_tcs.split(/[,:;]\s*/).filter(Boolean) || []
//         let farm_scs = []
//         // farm_scs = res?.certified_input_references?.farm_scs?.split(',') || []
//         farm_scs = res?.certified_input_references?.farm_scs.split(/[,:;]\s*/).filter(Boolean) || []

//         setTags(inputTcs)
//         setTags1(farm_scs)
//         setTags2(farm_tcs)

//         form2.setFieldsValue({
//           UploadQrCode: [],
//           UploadLogoImage: [],
//           CertificationDetails: res?.certification_body?.main_value,
//           CertificateLicenseCode:
//           res?.certification_body?.licensing_code_of_certification_body,
//           SellerDetails: res?.seller_of_certified_products?.main_value,
//           SellerSCNumber: res?.seller_of_certified_products?.sc_number,
//           SellerLicenseNumber: res?.seller_of_certified_products?.license_no,
//           BuyerDetails: res?.buyer_of_certified_products?.main_value,
//           BuyerLicenseNo: res?.buyer_of_certified_products?.license_no,
//           GrossShippingWeight: res?.gross_shipping_weight,
//           NetShippingWeight: res?.net_shipping_weight,
//           WeightsCertifiedWeight: res?.certified_weight,
//           DeclarationText: res?.declarations_by_certification_body?.main_value,
//           OrganicMaterialCertificationNOP:
//           res?.declarations_by_certification_body
//               ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules,
//           OrganicMaterialCertificationNPOP:
//           res?.declarations_by_certification_body
//               ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules,
//           DeclarationsText: res?.declarations_by_certification_body?.extra_note,
//           DeclarationList: DeclarationList_,
//           ShipmentDetails: ShipmentDetailss,
//           ProductDetails: ProductDetails,
//           RawMaterialDetails: RawMaterialDetails,
//           InputTCs: inputTcs,
//           FarmSCs: farm_scs,
//           FarmTCs: farm_tcs,
//           TraderTCsforOrganicMaterial:
//           res?.certified_input_references?.trader_tcs_for_organic_material,
//           outsourcedSubcontractor:
//           res?.declarations_by_seller_of_certified_products
//               ?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
//         })
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

//   const [tags, setTags] = useState([])
//   const [tags1, setTags1] = useState([])
//   const [tags2, setTags2] = useState([])

//   // Handle form submission with typed values
//   const handleSubmit2 = async values => {
//     setLoading2(true)
//     let shipmentDetail = values.ShipmentDetails.map((ele, ind) => {
//       let obj = {
//         shipment_no: ele.ShipmentNo_,
//         shipment_date: ele.ShipmentDate_,
//         shipment_doc_no: ele.ShipmentDocNo_,
//         gross_shipping_weight: ele.ShipmentsGrossShippingWeight_,
//         invoice_references: ele.InvoiceReferences_,
//         consignee_name_and_address: ele.ConsigneeNameAndAddress_
//       }
//       return obj
//     })
//     let productDetail = values.ProductDetails.map((ele, ind) => {
//       let obj = {
//         product_no: ele.ProductNo,
//         order_no: ele.OrderNo,
//         article_no: ele.ArticleNo,
//         number_of_units: ele.NumberofUnits,
//         net_shipping_weight: ele.ProductsNetShippingWeight,
//         supplementary_weight: ele.SupplementaryWeight,
//         certified_weight: ele.ProductsCertifiedWeight,
//         production_date: ele.ProductionDate,
//         product_category: ele.Productcategory,
//         product_detail: ele.ProductDetail,
//         material_composition: ele.MaterialComposition,
//         standard_label_grade: ele.StandardLabelGrade,
//         additional_info: ele.AdditionalInfo,
//         last_processor: ele.LastProcessor,
//         license_number: ele.licenseNo,
//         country: ele.Country
//       }
//       return obj
//     })

//     let contents = []
//     values.DeclarationList?.forEach((ele, ind) => {
//       let str = ele.DeclarationList_
//       contents.push(str)
//     })

//     let certified_raw_materials_and_declared_geographic_origin =
//       values.RawMaterialDetails.map((ele, ind) => {
//         let obj = {
//           material_details: ele.OrganicCotton,
//           certified_weight: ele.RawMaterialsCertifiedWeight,
//           country: ele.CountryArea.map(item => item.CountryName).join(', ')
//         }
//         return obj
//       })

//     try {
//       let data = {
//         file_name: 'example_tc_file.pdf',
//         extracted_data: {
//           certification_body: {
//             main_value: values.CertificationDetails,
//             licensing_code_of_certification_body: values.CertificateLicenseCode
//           },
//           seller_of_certified_products: {
//             main_value: values.SellerDetails,
//             sc_number: values.SellerSCNumber,
//             license_no: values.SellerLicenseNumber
//           },
//           buyer_of_certified_products: {
//             main_value: values.BuyerDetails,
//             license_no: values.BuyerLicenseNo
//           },
//           gross_shipping_weight: values.GrossShippingWeight,
//           net_shipping_weight: values.NetShippingWeight,
//           certified_weight: values.WeightsCertifiedWeight,
//           declarations_by_certification_body: {
//             main_value: values.DeclarationText,
//             contents: contents,
//             certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules:
//               values.OrganicMaterialCertificationNOP,
//             certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules:
//               values.OrganicMaterialCertificationNPOP,
//             extra_note: values.DeclarationsText
//           },
//           certified_input_references: {
//             input_tcs: values.InputTCs?.join(","),
//             farm_scs: values.FarmSCs?.join(","),
//             farm_tcs: values.FarmTCs?.join(","),
//             trader_tcs_for_organic_material: values.TraderTCsforOrganicMaterial
//           },
//           shipments: shipmentDetail,
//           certified_products: productDetail,
//           certified_raw_materials_and_declared_geographic_origin:
//             certified_raw_materials_and_declared_geographic_origin,
//           declarations_by_seller_of_certified_products: {
//             the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor:
//               values.outsourcedSubcontractor
//           }
//         }
//       }

//       let res = await form1Set(data)
//   if(res?.status_code === 200 || res?.status_code === 201){
//     navigate("/tcType1List")
//     toast.success("Form submitted Successfully.")
//   }else{
//     toast.error("Something went Wrong.")
//   }
//     } catch (error) {
//       console.log(error)
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

//   return formNo === '1' ? (<>
//         {loading && <Spinner message='Loading...' isActive={loading} />}{' '}
//      <div className='flex'>   <div style={{ width: "20%" }}>   <Slidebar /></div>
//         <div style={{ width: "80%" }}><AntdForm
//       form={form}
//       onFinish={handleSubmit}
//       labelCol={{ span: 8 }}
//       wrapperCol={{ span: 16 }}
//       layout='vertical'
//       className='form_1  rounded-xl shadow-xl'
//       style={{ maxWidth: 800, margin: '0 auto' }}
//       initialValues={{ UploadPdf: [] }}
//     >
//       <section className='section'>
//         <h2 className=' pb-5 section-title'>Upload PDF For Transaction Certificate (TC) Form </h2>
//         <div className=''>
//           <div className='flex items-center md:justify-between flex-wrap'>
//             <AntdForm.Item
//               label='Upload Pdf Here'
//               name='UploadPdf'
//               valuePropName='fileList'
//               getValueFromEvent={normFile}
//               className='pt-5 w-full md:w-[49%] UploadPdf'
//               rules={[{ required: true, message: 'Please upload a PDF file!' }]}
//             >
//               <Upload
//                 action='/upload.do'
//                 listType='picture-card'
//                 beforeUpload={beforeUpload}
//                 accept='.pdf'
//                 maxCount={1}
//                 onChange={info => {}}
//               >
//                 <button style={{ border: 0, background: 'none' }} type='button'>
//                   <PlusOutlined />
//                   <div style={{ marginTop: 8 }}>Upload Pdf</div>
//                 </button>
//               </Upload>
//             </AntdForm.Item>
//           </div>
//         </div>
//       </section>

//       <AntdForm.Item className=' submitButtonGroup'>
//         <Button type='primary' htmlType='submit' className='submit-btn '>
//           Submit
//         </Button>
//       </AntdForm.Item>
//     </AntdForm></div></div>
//     </> ) : (
//       <>
//             {loading2 && <Spinner message='Loading...' isActive={loading2} />}{' '}
//             <div className='flex'>   <div style={{ width: "20%" }}>       <Slidebar /></div>
//          <div style={{ width: "80%" }}> <div className='container mx-auto  '>
//       <AntdForm
//         form={form2}
//         onFinish={handleSubmit2}
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         layout='vertical'
//         className='form_1  rounded-xl shadow-xl'
//         style={{ maxWidth: 900, margin: '0 auto' }}
//       >
//         <h1 className='text-3xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center'>
//         Transaction Certificate (TC) Form Type 1
//         </h1>
//         {/* upload logo and qrcode */}
//         {/* <section className='section'>
//           <h3 className='section-title pb-0 '>Upload Logo And Qr Code: </h3>
//           <div className=''>
//             <div className='flex  md:justify-between flex-wrap'>
//               <AntdForm.Item
//                 label='Upload Qr Code'
//                 name={'UploadQrCode'}
//                 valuePropName='fileList'
//                 getValueFromEvent={normFile}
//                 className='pt-5  w-full md:w-[49%]'
//               >
//                 <Upload
//                   action='/upload.do'
//                   listType='picture-card'
//                   beforeUpload={beforeUpload2}
//                   accept='.png,.jpg,.jpeg'
//                   maxCount={1}
//                 >
//                   <button
//                     style={{ border: 0, background: 'none' }}
//                     type='button'
//                   >
//                     <PlusOutlined />
//                     <div style={{ marginTop: 8 }}>Upload Qr Code</div>
//                   </button>
//                 </Upload>
//               </AntdForm.Item>
//               <AntdForm.Item
//                 label='Upload Logo Image'
//                 name={'UploadLogoImage'}
//                 valuePropName='fileList'
//                 getValueFromEvent={normFile}
//                 className='pt-5 w-full md:w-[49%]'
//               >
//                 <Upload
//                   action='/upload.do'
//                   listType='picture-card'
//                   beforeUpload={beforeUpload2}
//                   accept='.png,.jpg,.jpeg'
//                   maxCount={1}
//                 >
//                   <button
//                     style={{ border: 0, background: 'none' }}
//                     type='button'
//                   >
//                     <PlusOutlined />
//                     <div style={{ marginTop: 8 }}>Upload Logo Image</div>
//                   </button>
//                 </Upload>
//               </AntdForm.Item>
//             </div>
//           </div>
//         </section> */}

//         {/* certificate info */}
//         <section className='section'>
//           <h2 className=' pb-5 section-title'>
//             {' '}
//             Certificate Body Information:{' '}
//           </h2>
//           <div className=''>
//             <div className='flex items-center md:justify-between flex-wrap'>
//               <AntdForm.Item
//                 label='Certification Details'
//                 name='CertificationDetails'
//                 className='w-full md:w-[49%]'
//               >
//                 <Input placeholder='Enter Certification Details' />
//               </AntdForm.Item>
//               <AntdForm.Item
//                 label='License Code'
//                 name='CertificateLicenseCode'
//                 className='w-full md:w-[49%]'
//               >
//                 <Input placeholder='Enter License Code' />
//               </AntdForm.Item>
//             </div>
//           </div>
//         </section>

//         {/* Seller of Certified Products */}
//         <section className='section'>
//           <h2 className='text-2xl pb-5 section-title'>
//             Seller of Certified Products Information:{' '}
//           </h2>
//           <div className=''>
//             <div className='flex items-center md:justify-between flex-wrap'>
//               <AntdForm.Item
//                 label='Seller Details'
//                 name='SellerDetails'
//                 className='w-full md:w-[49%]'
//               >
//                 <Input placeholder='Enter Seller Details' />
//               </AntdForm.Item>
//               <AntdForm.Item
//                 label='SC Number'
//                 name='SellerSCNumber'
//                 className='w-full md:w-[49%]'
//               >
//                 <Input placeholder='Enter SC Number' />
//               </AntdForm.Item>
//             </div>
//             <div className='flex items-center md:justify-between flex-wrap'>
//               <AntdForm.Item
//                 label='License No'
//                 name='SellerLicenseNumber'
//                 className='w-full md:w-[49%]'
//               >
//                 <Input placeholder='Enter Seller License Number' />
//               </AntdForm.Item>
//             </div>
//           </div>
//         </section>

//         {/* Buyer of Certified Products */}
//         <section className='section'>
//           <h2 className='text-2xl pb-5 section-title'>
//             Buyer of certified product(s) Information:
//           </h2>
//           <div className=''>
//             <div className='flex items-center md:justify-between flex-wrap'>
//               <AntdForm.Item
//                 label='Buyer Details'
//                 name='BuyerDetails'
//                 className='w-full md:w-[49%]'
//               >
//                 <Input placeholder='Enter Buyer Details' />
//               </AntdForm.Item>

//               <AntdForm.Item
//                 label='License No.'
//                 name='BuyerLicenseNo'
//                 className='w-full md:w-[49%]'
//               >
//                 <Input placeholder='Enter License No.' />
//               </AntdForm.Item>
//             </div>
//           </div>
//         </section>

//         {/* 4.5.6. Weights */}
//         <section className='section'>
//           <h2 className='text-2xl pb-5 section-title'> Weights</h2>
//           <div className=''>
//             <div className='flex items-center md:justify-between flex-wrap'>
//               <AntdForm.Item
//                 label='Gross Shipping Weight'
//                 name='GrossShippingWeight'
//                 className='w-full md:w-[49%]'
//               >
//                 <Input placeholder='Enter Gross Shipping Weight' />
//               </AntdForm.Item>
//               <AntdForm.Item
//                 label='Net Shipping Weight'
//                 name='NetShippingWeight'
//                 className='w-full md:w-[49%]'
//               >
//                 <Input placeholder='Enter Net Shipping Weight' />
//               </AntdForm.Item>
//             </div>
//             <AntdForm.Item
//               label='Certified Weight'
//               name='WeightsCertifiedWeight'
//             >
//               <Input placeholder='Enter Certified Weight' />
//             </AntdForm.Item>
//           </div>
//         </section>

//         {/* Declarations by Certification Body */}
//         <section className='section'>
//           <h2 className='text-2xl pb-5 section-title'>
//             {' '}
//             Declarations by Certification Body
//           </h2>
//           <div className=''>
//             <div className=''>
//               <AntdForm.Item
//                 label='Declaration Text'
//                 name='DeclarationText'
//                 className=''
//               >
//                 <Input placeholder='Enter DeclarationText' />
//               </AntdForm.Item>
//             </div>
//             <div>
//               <AntdForm.List name='DeclarationList'>
//                 {(fields, { add, remove }) => (
//                   <>
//                     <AntdForm.Item label='Declaration List' required>
//                       {fields.map(({ key, name, ...restField }, index) => (
//                         <Space
//                           key={key}
//                           style={{ display: 'flex', marginBottom: 8 }}
//                           align='baseline'
//                         >
//                           <AntdForm.Item
//                             {...restField}
//                             name={[name, 'DeclarationList_']}
//                             rules={[
//                               {
//                                 required: true,
//                                 message: 'At least 1 Declaration Rule'
//                               }
//                             ]}
//                             style={{ flex: 1 }}
//                           >
//                             <Input
//                               placeholder={`Declaration List`}
//                             />
//                           </AntdForm.Item>

//                           {/* Conditionally render the remove button if more than one item exists */}
//                           {fields.length > 1 && (
//                             <MinusCircleOutlined onClick={() => remove(name)} />
//                           )}
//                         </Space>
//                       ))}

//                       <AntdForm.Item>
//                         <Button
//                           type='dashed'
//                           onClick={() => add()}
//                           block
//                           icon={<PlusOutlined />}
//                         >
//                           Add field
//                         </Button>
//                       </AntdForm.Item>
//                     </AntdForm.Item>
//                   </>
//                 )}
//               </AntdForm.List>
//             </div>
//             <div className='flex flex-wrap md:justify-between'>
//               <div className='w-full'>
//                 <AntdForm.Item
//                   label='Certification of the organic material used for the products listed complies with USDA NOP rules:'
//                   name='OrganicMaterialCertificationNOP'
//                 >
//                   <Input placeholder='Enter Organic Material Certification' />
//                 </AntdForm.Item>
//               </div>
//               <div className='w-full'>
//                 <AntdForm.Item
//                   label='Certification of the organic material used for the products listed complies with APEDA NPOP rules:'
//                   name='OrganicMaterialCertificationNPOP'
//                 >
//                   <Input placeholder='Enter Organic Material Certification' />
//                 </AntdForm.Item>
//               </div>
//               <div className='w-full'>
//                 <AntdForm.Item label='Declaration Text' name='DeclarationsText'>
//                   <Input placeholder='Enter organic material Text' />
//                 </AntdForm.Item>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* 8. Certified Input References  */}
//         <section className='section'>
//           <h2 className='text-2xl pb-5 section-title'>
//             {' '}
//             Certified Input References{' '}
//           </h2>
//           <div className=''>
//             <div className='flex md:justify-between flex-wrap'>
//               <div className='w-full'>
//                 <>
//                   {/* InputTCs */}
//                   <AntdForm.Item name='InputTCs' label='Input TCs'>
//                     <TagInput tags={tags} setTags={setTags} name='InputTCs' />
//                   </AntdForm.Item>

//                   {/* FarmSCs */}
//                   <AntdForm.Item name='FarmSCs' label='Farm SCs'>
//                     <TagInput tags={tags1} setTags={setTags1} name='FarmSCs' />
//                   </AntdForm.Item>

//                   {/* FarmTCs */}
//                   <AntdForm.Item name='FarmTCs' label='Farm TCs'>
//                     <TagInput tags={tags2} setTags={setTags2} name='FarmTCs' />
//                   </AntdForm.Item>
//                 </>
//               </div>
//               <AntdForm.Item
//                 label='Trader(s) Transaction Certificates numbers of First Raw material:'
//                 name='TraderTCsforOrganicMaterial'
//                 className='w-full'
//               >
//                 <Input placeholder='Enter Trader(s) Transaction Certificates numbers of First Raw material:' />
//               </AntdForm.Item>
//             </div>
//           </div>
//         </section>
//         {/* 9. Shipments */}
//         <section className='section'>
//           <h2 className='text-2xl pb-5 section-title'> Shipments </h2>
//           <div className='Shipments'>
//             <AntdForm.List name='ShipmentDetails'>
//               {(fields, { add, remove }) => (
//                 <>
//                   {/* {console.log(index) } */}
//                   <AntdForm.Item required>
//                     {fields.map(({ key, name, ...restField }, index) => (
//                       <Space
//                         key={key}
//                         style={{ display: 'flex', marginBottom: 8 }}
//                         align='baseline'
//                       >
//                         <div className='md:pb-5'>
//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Shipment No.'
//                               name={[name, 'ShipmentNo_']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Shipment No.' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Shipment Date:'
//                               name={[name, 'ShipmentDate_']}
//                               className='w-full md:w-[49%]'
//                               format="DD/MM/YYYY"
//                             >
//                               <DatePicker className='datePickerIpnut' format="DD/MM/YYYY"/>
//                             </AntdForm.Item>
//                           </div>
//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Shipment Doc No.'
//                               name={[name, 'ShipmentDocNo_']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Shipment Doc No.' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Gross Shipping Weight:'
//                               name={[name, 'ShipmentsGrossShippingWeight_']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Gross Shipping Weight' />
//                             </AntdForm.Item>
//                           </div>
//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Invoice References:'
//                               name={[name, 'InvoiceReferences_']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Invoice References' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Consignee Name and Address:'
//                               name={[name, 'ConsigneeNameAndAddress_']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Consignee Name and Address' />
//                             </AntdForm.Item>
//                           </div>
//                         </div>
//                         {fields.length > 1 && (
//                           <MinusCircleOutlined onClick={() => remove(name)} />
//                         )}
//                       </Space>
//                     ))}

//                     <AntdForm.Item>
//                       <Button
//                         type='dashed'
//                         onClick={() => add()}
//                         block
//                         icon={<PlusOutlined />}
//                       >
//                         Add field
//                       </Button>
//                     </AntdForm.Item>
//                   </AntdForm.Item>
//                 </>
//               )}
//             </AntdForm.List>
//           </div>
//         </section>
//         {/* 10. Certified Products */}
//         <section className='section'>
//           <h2 className='text-2xl pb-5 section-title'>Certified Products </h2>
//           <AntdForm.List name='ProductDetails'>
//             {(fields, { add, remove }) => (
//               <>
//                 {fields.map(({ key, name, ...restField }) => (
//                   <div key={key} className='pb-5'>
//                     <div className='flex md:justify-between flex-wrap'>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Product No.:'
//                         name={[name, 'ProductNo']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Product No.' />
//                       </AntdForm.Item>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Order No.:'
//                         name={[name, 'OrderNo']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Order No.' />
//                       </AntdForm.Item>
//                     </div>
//                     <div className='flex md:justify-between flex-wrap'>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Article No.:'
//                         name={[name, 'ArticleNo']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Article No.' />
//                       </AntdForm.Item>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Number of Units:'
//                         name={[name, 'NumberofUnits']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Number of Units' />
//                       </AntdForm.Item>
//                     </div>
//                     <div className='flex md:justify-between flex-wrap'>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Net Shipping Weight'
//                         name={[name, 'ProductsNetShippingWeight']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Net Shipping Weight' />
//                       </AntdForm.Item>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Supplementary Weight'
//                         name={[name, 'SupplementaryWeight']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Supplementary Weight' />
//                       </AntdForm.Item>
//                     </div>
//                     {/* Add more fields similarly */}

//                     <div className='flex md:justify-between flex-wrap'>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Production Date:'
//                         name={[name, 'ProductionDate']}
//                         className='w-full md:w-[49%]'
//                       >
//                         {/* <Input placeholder="Enter Production Date" /> */}
//                         <DatePicker className='datePickerIpnut' format="DD/MM/YYYY"/>
//                       </AntdForm.Item>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Product Category'
//                         name={[name, 'Productcategory']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Product Category' />
//                       </AntdForm.Item>
//                     </div>
//                     <div className='flex md:justify-between flex-wrap'>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Product Detail:'
//                         name={[name, 'ProductDetail']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Product Detail' />
//                       </AntdForm.Item>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Material Composition'
//                         name={[name, 'MaterialComposition']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Material Composition' />
//                       </AntdForm.Item>
//                     </div>
//                     <div className='flex md:justify-between flex-wrap'>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Standard Label Grade:'
//                         name={[name, 'StandardLabelGrade']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Standard Label Grade' />
//                       </AntdForm.Item>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Additional Info'
//                         name={[name, 'AdditionalInfo']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Additional Info' />
//                       </AntdForm.Item>
//                     </div>
//                     <div className='flex md:justify-between flex-wrap'>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Last Processor:'
//                         name={[name, 'LastProcessor']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Last Processor' />
//                       </AntdForm.Item>
//                       <AntdForm.Item
//                         {...restField}
//                         label='License No:'
//                         name={[name, 'licenseNo']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter License No' />
//                       </AntdForm.Item>
//                     </div>
//                     {/* <div className='flex md:justify-between flex-wrap'>

//                     </div> */}
//                     <div className='flex md:justify-between flex-wrap'>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Certified Weight:'
//                         name={[name, 'ProductsCertifiedWeight']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Certified Weight' />
//                       </AntdForm.Item>
//                       <AntdForm.Item
//                         {...restField}
//                         label='Country'
//                         name={[name, 'Country']}
//                         className='w-full md:w-[49%]'
//                       >
//                         <Input placeholder='Enter Country' />
//                       </AntdForm.Item>
//                     </div>
//                     {fields.length > 1 && (
//                       <MinusCircleOutlined
//                         className='dynamic-delete-button'
//                         onClick={() => remove(name)}
//                       />
//                     )}
//                   </div>
//                 ))}
//                 <AntdForm.Item>
//                   <Button
//                     type='dashed'
//                     onClick={() => add()}
//                     block
//                     icon={<PlusOutlined />}
//                   >
//                     Add Product
//                   </Button>
//                 </AntdForm.Item>
//               </>
//             )}
//           </AntdForm.List>
//         </section>

//         {/* 11. Certified Raw Materials and Declared Geographic Origin */}
//         <section className='section'>
//           <h2 className='text-2xl pb-5 section-title'>
//             Certified Raw Materials and Declared Geographic Origin{' '}
//           </h2>
//           <div className=''>
//             <AntdForm.List name='RawMaterialDetails'>
//               {(fields, { add, remove }) => (
//                 <>
//                   {fields.map(({ key, name, ...restField }) => (
//                     <div key={key} className='pb-5 relative'>
//                       <div className='flex md:justify-between flex-wrap'>
//                         <AntdForm.Item
//                           {...restField}
//                           label='Organic Cotton'
//                           name={[name, 'OrganicCotton']}
//                           className='w-full md:w-[49%]'
//                         >
//                           <Input placeholder='Enter Organic Cotton' />
//                         </AntdForm.Item>
//                         <AntdForm.Item
//                           {...restField}
//                           label='Certified Weight:'
//                           name={[name, 'RawMaterialsCertifiedWeight']}
//                           className='w-full md:w-[49%]'
//                         >
//                           <Input placeholder='Enter Certified Weight' />
//                         </AntdForm.Item>
//                       </div>
//                       <AntdForm.List name={[name, 'CountryArea']}>
//                         {(
//                           countryFields,
//                           { add: addCountry, remove: removeCountry }
//                         ) => (
//                           <>
//                             {countryFields.map(
//                               ({
//                                 key: countryKey,
//                                 name: countryName,
//                                 ...countryRestField
//                               }) => (
//                                 <div
//                                   key={countryKey}
//                                   className='flex md:justify-between flex-wrap'
//                                 >
//                                   <AntdForm.Item
//                                     {...countryRestField}
//                                     label='Country Name'
//                                     name={[countryName, 'CountryName']}
//                                     className='w-full md:w-[49%]'
//                                   >
//                                     <Input placeholder='Enter Country Name' />
//                                   </AntdForm.Item>
//                                   {countryFields.length > 1 && (
//                                     <MinusCircleOutlined
//                                       className='dynamic-delete-button'
//                                       onClick={() => removeCountry(countryName)}
//                                     />
//                                   )}
//                                 </div>
//                               )
//                             )}
//                             <AntdForm.Item>
//                               <Button
//                                 type='dashed'
//                                 onClick={() => addCountry()}
//                                 block
//                                 icon={<PlusOutlined />}
//                               >
//                                 Add Country
//                               </Button>
//                             </AntdForm.Item>
//                           </>
//                         )}
//                       </AntdForm.List>
//                       {fields.length > 1 && (
//                         <MinusCircleOutlined
//                           className='dynamic-delete-button OrganicCottonDelete'
//                           onClick={() => remove(name)}
//                         />
//                       )}
//                     </div>
//                   ))}
//                   <AntdForm.Item>
//                     <Button
//                       type='dashed'
//                       onClick={() =>
//                         add({
//                           OrganicCotton: '',
//                           RawMaterialsCertifiedWeight: '',
//                           CountryArea: [{ CountryName: '' }] // Add default country input here
//                         })
//                       }
//                       block
//                       icon={<PlusOutlined />}
//                     >
//                       Add Raw Material
//                     </Button>
//                   </AntdForm.Item>
//                 </>
//               )}
//             </AntdForm.List>
//           </div>
//         </section>

//         {/* 12. Declarations by Seller of Certified Products */}
//         <section className='section'>
//           <h2 className='text-2xl pb-5 section-title'>
//             Declarations by Seller of Certified Products
//           </h2>
//           <div className=''>
//             <div className='flex md:justify-between flex-wrap'>
//               <AntdForm.Item
//                 label='The certified product(s) covered in this certificate have been outsourced to a subcontractor:'
//                 name='outsourcedSubcontractor'
//                 className='w-full'
//               >
//                 <Input placeholder='The certified product(s) covered in this certificate have been outsourced to a subcontractor' />
//               </AntdForm.Item>
//             </div>
//           </div>
//         </section>

//         <AntdForm.Item className=' submitButtonGroup'>
//           <Button type='primary' htmlType='submit' className='submit-btn '>
//             Submit
//           </Button>
//         </AntdForm.Item>
//       </AntdForm>
//     </div></div>
//     </div>
//     </>
//   )
// }

// export default ImportPdfTCtype1

import React, { useEffect, useRef, useState } from 'react'

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
// import {
//   createFormTcType1,
//   exportPdfTcType1,
//   form1Set,
//   formFill1
// } from '../../api/Form1Api'
// import { cloneDeep, forEach } from 'lodash'
// import TagInput from '../../component/Tags'
// import dayjs from 'dayjs'
// import { Slidebar } from '../../layout/Slidebar'
// import Spinner from '../../layout/Spinner'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
// import { formatDateToDDMMYYYY, links } from '../../utils/utils'
// import CustomFormItem from '../../layout/CustomFormItem'

// const ImportPdfTCtype1 = () => {
//   const [form] = AntdForm.useForm()
//   const [form2] = AntdForm.useForm()
//   const [emptyFields, setEmptyFields] = useState({})
//   const [formNo, setFormNo] = useState('1')
//   const [data, setdata] = useState('1')
//   const [loading, setLoading] = useState(false)
//   const [loading2, setLoading2] = useState(false)
//   const navigate = useNavigate()
//   const handleSubmit = async values => {
//     setLoading(true)
//     try {
//       let fomrData = new FormData()
//       fomrData.append('tc-type-1', values.UploadPdf[0].originFileObj)
//       let response = await exportPdfTcType1(fomrData)
//       let res = response?.data?.extracted_data

//       if (response?.status_code === 200 || response?.status_code === 201) {
//         setFormNo('2')
//         setdata(res)
//         toast.success('pdf submitted Successfully.')

//         let inputTcs = []
//         inputTcs =
//           res?.certified_input_references?.input_tcs
//             .split(/[,:;]\s*/)
//             .filter(Boolean) || []
//         let farm_tcs = []
//         farm_tcs =
//           res?.certified_input_references?.farm_tcs
//             .split(/[,:;]\s*/)
//             .filter(Boolean) || []
//         let farm_scs = []
//         farm_scs =
//           res?.certified_input_references?.farm_scs
//             .split(/[,:;]\s*/)
//             .filter(Boolean) || []

//         setTags(inputTcs)
//         setTags1(farm_scs)
//         setTags2(farm_tcs)

//         let cb_address = res?.certification_body?.cb_address?.map(
//           (ele, ind) => {
//             let obj = {
//               cb_address_: ele
//             }
//             return obj
//           }
//         )

//         let seller_address =
//           res?.seller_of_certified_products?.seller_address?.map((ele, ind) => {
//             let obj = {
//               seller_address_: ele
//             }
//             return obj
//           })

//         let buyer_address =
//           res?.buyer_of_certified_products?.buyer_address?.map((ele, ind) => {
//             let obj = {
//               buyer_address_: ele
//             }
//             return obj
//           })

//         let certified_weight = res?.certified_weight?.map((ele, ind) => {
//           let obj = {
//             certified_weight_: ele
//           }
//           return obj
//         })

//         let ShipmentDetails = res?.shipments?.map((ele, ind) => {
//           let consignee_address =
//             ele?.consignee_name_and_address?.consignee_address?.map(
//               (ele, ind) => {
//                 let obj = {
//                   consignee_address_: ele
//                 }
//                 return obj
//               }
//             )

//           let obj = {
//             shipment_no: ele?.shipment_no,
//             shipment_date:
//               res?.shipment_date === ''
//                 ? null
//                 : dayjs(ele?.shipment_date, 'DD/mm/YYYY'),
//             shipment_doc_no: ele?.shipment_doc_no,
//             gross_shipping_weight: ele?.gross_shipping_weight,
//             invoice_references: ele?.invoice_references,
//             consignee_name: ele?.consignee_name_and_address?.consignee_name,
//             consignee_address: consignee_address,
//             consignee_town: ele?.consignee_name_and_address?.consignee_town,
//             consignee_postcode:
//               ele?.consignee_name_and_address?.consignee_postcode,
//             consignee_state_or_province:
//               ele?.consignee_name_and_address?.consignee_state_or_province,
//             consignee_country_or_area:
//               ele?.consignee_name_and_address?.consignee_country_or_area,
//             consignee_te_id: ele?.consignee_name_and_address?.te_id
//           }
//           return obj
//         })

//         let ProductDetails = res?.certified_products?.map((ele, ind) => {
//           let obj = {
//             product_no: ele?.product_no,
//             order_no: ele?.order_no,
//             article_no: ele?.article_no,
//             number_of_units: ele?.number_of_units,
//             products_net_shipping_weight: ele?.net_shipping_weight,
//             supplementary_weight: ele?.supplementary_weight,
//             products_certified_weight: ele?.certified_weight,
//             production_date:
//               res?.production_date === ''
//                 ? null
//                 : dayjs(ele?.production_date, 'DD/MM/YYYY'),
//             product_category: ele?.product_category,
//             product_detail: ele?.product_detail,
//             material_composition: ele?.material_composition,
//             standard_label_grade: ele?.standard_label_grade,
//             additional_info: ele?.additional_info,
//             last_processor: ele?.last_processor,
//             products_te_id: ele?.te_id,
//             products_Country: ele?.country
//           }

//           return obj
//         })

//         let certified_components = res?.certified_components?.map(
//           (ele, ind) => {
//             let obj = {
//               product_component_no: ele?.product_component_no,
//               component_detail: ele?.component_detail,
//               product_component_net_shipping_weight: ele?.net_shipping_weight,
//               product_component_material_composition: ele?.material_composition,
//               product_component_supplementary_weight: ele?.supplementary_weight,
//               product_component_standard_name: ele?.standard?.name,
//               product_component_label_grad: ele?.standard?.label_grade,
//               product_component_certified_weight: ele?.certified_weight,
//               product_component_additional_info: ele?.additional_info
//             }
//             return obj
//           }
//         )
//         if (certified_components?.length === 0) {
//           certified_components.push({
//             product_component_no: '',
//             component_detail: '',
//             product_component_net_shipping_weight: '',
//             product_component_material_composition: '',
//             product_component_supplementary_weight: '',
//             product_component_standard_name: '',
//             product_component_label_grad: '',
//             product_component_certified_weight: '',
//             product_component_additional_info: ''
//           })
//         }

//         let certified_raw_materials_and_declared_geographic_origin =
//           res?.certified_raw_materials_and_declared_geographic_origin?.map(
//             (ele, ind) => {
//               let obj = {
//                 certified_raw_material: ele?.certified_raw_material,
//                 certified_certified_weight: ele?.certified_weight,
//                 certified_state_or_provice: ele?.country_or_area,
//                 certified_country_or_area: ele?.state_or_provice
//               }
//               return obj
//             }
//           )

//         form2.setFieldsValue({
//           file_name: response?.data?.file_name,
//           cb_name: res?.certification_body?.cb_name,
//           cb_address: cb_address,
//           trader_tcs_for_organic_material:
//             res?.certified_input_references?.trader_tcs_for_organic_material,
//           town: res?.certification_body?.town,
//           postcode: res?.certification_body?.postcode,
//           state_or_province: res?.certification_body?.state_or_province,
//           country_or_area: res?.certification_body?.country_or_area,
//           licensing_code_of_certification_body:
//             res?.certification_body?.licensing_code_of_certification_body,
//           seller_name: res?.seller_of_certified_products?.seller_name,
//           seller_town: res?.seller_of_certified_products?.seller_town,
//           seller_postcode: res?.seller_of_certified_products?.seller_postcode,
//           seller_state_or_province:
//             res?.seller_of_certified_products?.seller_state_or_province,
//           seller_country_or_area:
//             res?.seller_of_certified_products?.seller_country_or_area,
//           seller_on_behalf_of:
//             res?.seller_of_certified_products?.seller_on_behalf_of,
//           seller_certified_organization_name:
//             res?.seller_of_certified_products
//               ?.seller_certified_organization_name,
//           sc_number: res?.seller_of_certified_products?.sc_number,
//           textile_exchange_id: res?.seller_of_certified_products?.trader_te_id,
//           client_number: res?.seller_of_certified_products?.client_number,
//           seller_licence_number:
//             res?.seller_of_certified_products?.seller_licence_number,
//           non_certified_trader:
//             res?.seller_of_certified_products?.non_certified_trader,
//           trader_te_id: res?.seller_of_certified_products?.trader_te_id,
//           seller_address: seller_address,
//           buyer_name: res?.buyer_of_certified_products?.buyer_name,
//           buyer_address: buyer_address,
//           buyer_town: res?.buyer_of_certified_products?.buyer_town,
//           buyer_postcode: res?.buyer_of_certified_products?.buyer_postcode,
//           buyer_state_or_province:
//             res?.buyer_of_certified_products?.buyer_state_or_province,
//           buyer_country_or_area:
//             res?.buyer_of_certified_products?.buyer_country_or_area,
//           buyer_on_behalf_of:
//             res?.buyer_of_certified_products?.buyer_on_behalf_of,
//           buyer_certified_organization_name:
//             res?.buyer_of_certified_products?.buyer_certified_organization_name,
//           buyer_textile_exchange_id:
//             res?.buyer_of_certified_products?.textile_exchange_id,
//           buyer_cb_acronym: res?.buyer_of_certified_products?.buyer_cb_acronym,
//           buyer_client_number: res?.buyer_of_certified_products?.client_number,
//           buyer_licence_number:
//             res?.buyer_of_certified_products?.buyer_licence_number,
//           buyer_trader_te_id: res?.buyer_of_certified_products?.trader_te_id,
//           gross_shipping_weight: res?.gross_shipping_weight,
//           net_shipping_weight: res?.net_shipping_weight,
//           certified_weight: certified_weight,
//           an_organic_farmin_standards_which_is_closed_by:
//             res?.declarations_by_certification_body
//               ?.an_organic_farmin_standards_which_is_closed_by,
//           tc_standard: res?.declarations_by_certification_body?.tc_standard,
//           certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules:
//             res?.declarations_by_certification_body
//               ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules,
//           tc_organic_farm_standard:
//             res?.declarations_by_certification_body?.tc_organic_farm_standard,
//           ShipmentDetails: ShipmentDetails,
//           ProductDetails: ProductDetails,
//           certified_components: certified_components,
//           header_tc_number: res?.header?.tc_number,
//           tc_version_number: res?.header?.tc_version_number,
//           header_tc_standard: res?.header?.tc_standard,
//           tc_place_of_issue: res?.footer?.tc_place_of_issue,
//           tc_date_of_issue:
//             res?.footer?.tc_date_of_issue === ''
//               ? null
//               : dayjs(res?.footer?.tc_date_of_issue, 'DD/MM/YYYY'),
//           name_of_authorized_signatory:
//             res?.footer?.name_of_authorized_signatory,
//           tc_status: res?.footer?.tc_status,
//           tc_last_updated:
//             res?.footer?.tc_last_updated === ''
//               ? null
//               : dayjs(res?.footer?.tc_last_updated, 'DD/MM/YYYY'),
//           certified_raw_material_list:
//             certified_raw_materials_and_declared_geographic_origin,
//           the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor:
//             res?.declarations_by_seller_of_certified_products
//               ?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
//         })

//         // const initialValues = {
//         //   file_name: response?.data?.file_name,
//         //   cb_name: res?.certification_body?.cb_name,
//         //   cb_address: cb_address,
//         //   trader_tcs_for_organic_material:
//         //     res?.certified_input_references?.trader_tcs_for_organic_material,
//         //   town: res?.certification_body?.town,
//         //   postcode: res?.certification_body?.postcode,
//         //   state_or_province: res?.certification_body?.state_or_province,
//         //   country_or_area: res?.certification_body?.country_or_area,
//         //   licensing_code_of_certification_body:
//         //     res?.certification_body?.licensing_code_of_certification_body,
//         //   seller_name: res?.seller_of_certified_products?.seller_name,
//         //   seller_town: res?.seller_of_certified_products?.seller_town,
//         //   seller_postcode: res?.seller_of_certified_products?.seller_postcode,
//         //   seller_state_or_province:
//         //     res?.seller_of_certified_products?.seller_state_or_province,
//         //   seller_country_or_area:
//         //     res?.seller_of_certified_products?.seller_country_or_area,
//         //   seller_on_behalf_of:
//         //     res?.seller_of_certified_products?.seller_on_behalf_of,
//         //   seller_certified_organization_name:
//         //     res?.seller_of_certified_products
//         //       ?.seller_certified_organization_name,
//         //   sc_number: res?.seller_of_certified_products?.sc_number,
//         //   textile_exchange_id: res?.seller_of_certified_products?.trader_te_id,
//         //   client_number: res?.seller_of_certified_products?.client_number,
//         //   seller_licence_number:
//         //     res?.seller_of_certified_products?.seller_licence_number,
//         //   non_certified_trader:
//         //     res?.seller_of_certified_products?.non_certified_trader,
//         //   trader_te_id: res?.seller_of_certified_products?.trader_te_id,
//         //   seller_address: seller_address,
//         //   buyer_name: res?.buyer_of_certified_products?.buyer_name,
//         //   buyer_address: buyer_address,
//         //   buyer_town: res?.buyer_of_certified_products?.buyer_town,
//         //   buyer_postcode: res?.buyer_of_certified_products?.buyer_postcode,
//         //   buyer_state_or_province:
//         //     res?.buyer_of_certified_products?.buyer_state_or_province,
//         //   buyer_country_or_area:
//         //     res?.buyer_of_certified_products?.buyer_country_or_area,
//         //   buyer_on_behalf_of:
//         //     res?.buyer_of_certified_products?.buyer_on_behalf_of,
//         //   buyer_certified_organization_name:
//         //     res?.buyer_of_certified_products?.buyer_certified_organization_name,
//         //   buyer_textile_exchange_id:
//         //     res?.buyer_of_certified_products?.textile_exchange_id,
//         //   buyer_cb_acronym: res?.buyer_of_certified_products?.buyer_cb_acronym,
//         //   buyer_client_number: res?.buyer_of_certified_products?.client_number,
//         //   buyer_licence_number:
//         //     res?.buyer_of_certified_products?.buyer_licence_number,
//         //   buyer_trader_te_id: res?.buyer_of_certified_products?.trader_te_id,
//         //   gross_shipping_weight: res?.gross_shipping_weight,
//         //   net_shipping_weight: res?.net_shipping_weight,
//         //   certified_weight: certified_weight,
//         //   an_organic_farmin_standards_which_is_closed_by:
//         //     res?.declarations_by_certification_body
//         //       ?.an_organic_farmin_standards_which_is_closed_by,
//         //   tc_standard: res?.declarations_by_certification_body?.tc_standard,
//         //   certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules:
//         //     res?.declarations_by_certification_body
//         //       ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules,
//         //   tc_organic_farm_standard:
//         //     res?.declarations_by_certification_body?.tc_organic_farm_standard,
//         //   ShipmentDetails: ShipmentDetails,
//         //   ProductDetails: ProductDetails,
//         //   certified_components: certified_components,
//         //   header_tc_number: res?.header?.tc_number,
//         //   tc_version_number: res?.header?.tc_version_number,
//         //   header_tc_standard: res?.header?.tc_standard,
//         //   tc_place_of_issue: res?.footer?.tc_place_of_issue,
//         //   tc_date_of_issue:
//         //     res?.footer?.tc_date_of_issue === ''
//         //       ? null
//         //       : dayjs(res?.footer?.tc_date_of_issue, 'DD/MM/YYYY'),
//         //   name_of_authorized_signatory:
//         //     res?.footer?.name_of_authorized_signatory,
//         //   tc_status: res?.footer?.tc_status,
//         //   tc_last_updated:
//         //     res?.footer?.tc_last_updated === ''
//         //       ? null
//         //       : dayjs(res?.footer?.tc_last_updated, 'DD/MM/YYYY'),
//         //   certified_raw_material_list:
//         //     certified_raw_materials_and_declared_geographic_origin,
//         //   the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor:
//         //     res?.declarations_by_seller_of_certified_products
//         //       ?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
//         // }

//         // form2.setFieldsValue(initialValues)
//       } else {
//         toast.error('Something went Wrong.')
//       }
//     } catch (error) {
//       toast.error('Something went Wrong.')
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

//   const [tags, setTags] = useState([])
//   const [tags1, setTags1] = useState([])
//   const [tags2, setTags2] = useState([])

//   const handleSubmit2 = async values => {
//     setLoading(true)

//     console.log(values)
//     let cb_address = values?.cb_address?.map((ele, ind) => {
//       return ele?.cb_address_
//     })
//     let seller_address = values?.seller_address?.map((ele, ind) => {
//       return ele?.seller_address_
//     })
//     let buyer_address = values?.buyer_address?.map((ele, ind) => {
//       return ele?.buyer_address_
//     })
//     let certified_weight = values?.certified_weight?.map((ele, ind) => {
//       return ele?.certified_weight_
//     })

//     let input_tcs = tags?.join(';')
//     let farm_scs = tags1?.join(';')
//     let farm_tcs = tags2?.join(';')

//     let shipmentList = values?.ShipmentDetails?.map((ele, ind) => {
//       let consignee_address = ele?.consignee_address?.map((ele, ind) => {
//         return ele?.consignee_address_
//       })
//       let obj = {
//         shipment_no: ele?.shipment_no,
//         shipment_date: formatDateToDDMMYYYY(ele?.shipment_date),
//         shipment_doc_no: ele?.shipment_doc_no,
//         gross_shipping_weight: ele?.gross_shipping_weight,
//         invoice_references: ele?.invoice_references,
//         consignee_name_and_address: {
//           consignee_name: ele?.consignee_name,
//           consignee_address: consignee_address,
//           consignee_town: ele?.consignee_town,
//           consignee_postcode: ele?.consignee_postcode,
//           consignee_state_or_province: ele?.consignee_state_or_province,
//           consignee_country_or_area: ele?.consignee_country_or_area,
//           te_id: ele?.consignee_te_id
//         }
//       }
//       return obj
//     })

//     let ProductDetails = values?.ProductDetails?.map((ele, ind) => {
//       console.log(ele)

//       let obj = {
//         product_no: ele?.product_no,
//         order_no: ele?.order_no,
//         article_no: ele?.article_no,
//         number_of_units: ele?.number_of_units,
//         net_shipping_weight: ele?.products_net_shipping_weight,
//         supplementary_weight: ele?.supplementary_weight,
//         certified_weight: ele?.products_certified_weight,
//         production_date: formatDateToDDMMYYYY(ele?.production_date),
//         product_category: ele?.product_category,
//         product_detail: ele?.product_detail,
//         material_composition: ele?.material_composition,
//         standard_label_grade: ele?.standard_label_grade,
//         additional_info: ele?.additional_info,
//         last_processor: ele?.last_processor,
//         te_id: ele?.products_te_id,
//         country: ele?.products_Country
//       }
//       return obj
//     })

//     let certified_components = values?.certified_components?.map((ele, ind) => {
//       let obj = {
//         product_component_no: ele?.product_component_no,
//         component_detail: ele?.component_detail,
//         net_shipping_weight: ele?.product_component_net_shipping_weight,
//         material_composition: ele?.product_component_material_composition,
//         supplementary_weight: ele?.product_component_supplementary_weight,
//         standard: {
//           name: ele?.product_component_standard_name,
//           label_grade: ele?.product_component_label_grade
//         },
//         certified_weight: ele?.product_component_certified_weight,
//         additional_info: ele?.product_component_additional_info
//       }
//       return obj
//     })

//     let certified_raw_materials_and_declared_geographic_origin =
//       values?.certified_raw_material_list?.map((ele, ind) => {
//         let obj = {
//           certified_raw_material: ele?.certified_raw_material,
//           certified_weight: ele?.certified_certified_weight,
//           state_or_provice: ele?.certified_state_or_provice,
//           country_or_area: ele?.certified_country_or_area
//         }
//         return obj
//       })
//     console.log(values)

//     let data = {
//       file_name: values?.file_name,
//       extracted_data: {
//         certification_body: {
//           cb_name: values?.cb_name,
//           cb_address: cb_address,
//           town: values?.town,
//           postcode: values?.postcode,
//           state_or_province: values?.state_or_province,
//           country_or_area: values?.country_or_area,
//           licensing_code_of_certification_body:
//             values?.licensing_code_of_certification_body
//         },
//         seller_of_certified_products: {
//           seller_name: values?.seller_name,
//           seller_address: seller_address,
//           seller_town: values?.seller_town,
//           seller_postcode: values?.seller_postcode,
//           seller_state_or_province: values?.seller_state_or_province,
//           seller_country_or_area: values?.seller_country_or_area,
//           seller_on_behalf_of: values?.seller_on_behalf_of,
//           seller_certified_organization_name:
//             values?.seller_certified_organization_name,
//           sc_number: values?.sc_number,
//           textile_exchange_id: values?.textile_exchange_id,
//           client_number: values?.client_number,
//           seller_licence_number: values?.seller_licence_number,
//           non_certified_trader: values?.non_certified_trader,
//           trader_te_id: values?.trader_te_id
//         },
//         buyer_of_certified_products: {
//           buyer_name: values?.buyer_name,
//           buyer_address: buyer_address,
//           buyer_town: values?.buyer_town,
//           buyer_postcode: values?.buyer_postcode,
//           buyer_state_or_province: values?.buyer_state_or_province,
//           buyer_country_or_area: values?.buyer_country_or_area,
//           buyer_on_behalf_of: values?.buyer_on_behalf_of,
//           buyer_certified_organization_name:
//             values?.buyer_certified_organization_name,
//           textile_exchange_id: values?.buyer_textile_exchange_id,
//           buyer_cb_acronym: values?.buyer_cb_acronym,
//           client_number: values?.buyer_client_number,
//           buyer_licence_number: values?.buyer_licence_number,
//           trader_te_id: values?.buyer_trader_te_id
//         },
//         gross_shipping_weight: values?.gross_shipping_weight,
//         net_shipping_weight: values?.net_shipping_weight,
//         certified_weight: certified_weight,
//         declarations_by_certification_body: {
//           an_organic_farmin_standards_which_is_closed_by:
//             values?.an_organic_farmin_standards_which_is_closed_by,
//           tc_standard: values?.tc_standard,
//           certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules:
//             values?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules,
//           tc_organic_farm_standard: values?.tc_organic_farm_standard
//         },
//         certified_input_references: {
//           input_tcs: input_tcs,
//           farm_scs: farm_scs,
//           farm_tcs: farm_tcs,
//           trader_tcs_for_organic_material:
//             values?.trader_tcs_for_organic_material
//         },
//         shipments: shipmentList,
//         certified_products: ProductDetails,
//         certified_components: certified_components,
//         certified_raw_materials_and_declared_geographic_origin:
//           certified_raw_materials_and_declared_geographic_origin,
//         declarations_by_seller_of_certified_products: {
//           the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor:
//             values?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
//         },
//         header: {
//           tc_number: values?.header_tc_number,
//           tc_version_number: values?.tc_version_number,
//           tc_standard: values?.header_tc_standard
//         },
//         footer: {
//           tc_place_of_issue: values?.tc_place_of_issue,
//           tc_date_of_issue: formatDateToDDMMYYYY(values?.tc_date_of_issue),
//           tc_status: values?.tc_status,
//           tc_last_updated: formatDateToDDMMYYYY(values?.tc_last_updated),
//           name_of_authorized_signatory: values?.name_of_authorized_signatory
//         }
//       }
//     }

//     try {
//       let response = await createFormTcType1(data)
//       console.log(response)
//       if (response?.status_code === 200 || response?.status_code === 201) {
//         toast.success(response?.message)
//         navigate(`${links.tcType1List}`)
//       } else {
//         toast.error(response?.message)
//       }
//     } catch (error) {
//       toast.error('Something Went Wrong')
//     }

//     setLoading(false)
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
//       {loading && <Spinner message='Loading...' isActive={loading} />}{' '}
//       <div className='flex'>
//         {' '}
//         <div style={{ width: '20%' }}>
//           {' '}
//           <Slidebar />
//         </div>
//         <div style={{ width: '80%' }}>
//           <AntdForm
//             form={form}
//             onFinish={handleSubmit}
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 16 }}
//             layout='vertical'
//             className='form_1  rounded-xl shadow-xl'
//             style={{ maxWidth: 800, margin: '0 auto' }}
//             initialValues={{ UploadPdf: [] }}
//           >
//             <section className='section'>
//               <h2 className=' pb-5 section-title'>
//                 Upload PDF For Transaction Certificate (TC) Form{' '}
//               </h2>
//               <div className=''>
//                 <div className='flex items-center md:justify-between flex-wrap'>
//                   <AntdForm.Item
//                     label='Upload Pdf Here'
//                     name='UploadPdf'
//                     valuePropName='fileList'
//                     getValueFromEvent={normFile}
//                     className='pt-5 w-full md:w-[49%] UploadPdf'
//                     rules={[
//                       { required: true, message: 'Please upload a PDF file!' }
//                     ]}
//                   >
//                     <Upload
//                       action='/upload.do'
//                       listType='picture-card'
//                       beforeUpload={beforeUpload}
//                       accept='.pdf'
//                       maxCount={1}
//                       onChange={info => {}}
//                     >
//                       <button
//                         style={{ border: 0, background: 'none' }}
//                         type='button'
//                       >
//                         <PlusOutlined />
//                         <div style={{ marginTop: 8 }}>Upload Pdf</div>
//                       </button>
//                     </Upload>
//                   </AntdForm.Item>
//                 </div>
//               </div>
//             </section>

//             <AntdForm.Item className=' submitButtonGroup'>
//               <Button type='primary' htmlType='submit' className='submit-btn '>
//                 Submit
//               </Button>
//             </AntdForm.Item>
//           </AntdForm>
//         </div>
//       </div>
//     </>
//   ) : (
//     <>
//       {loading2 && <Spinner message='Loading...' isActive={loading2} />}{' '}
//       <div className='flex'>
//         {' '}
//         <div style={{ width: '20%' }}>
//           {' '}
//           <Slidebar />
//         </div>
//         <div style={{ width: '80%' }}>
//           {' '}
//           <div className='container mx-auto  '>
//             <AntdForm
//               form={form2}
//               onFinish={handleSubmit2}
//               labelCol={{ span: 8 }}
//               wrapperCol={{ span: 16 }}
//               layout='vertical'
//               className='form_1  rounded-xl shadow-xl'
//               style={{ maxWidth: 900, margin: '0 auto' }}
//             >
//               <h1 className='text-3xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center'>
//                 Transaction Certificate (TC) Form
//               </h1>
//               {/* Header*/}
//               <section className='section mt-10'>
//                 <h2 className='text-2xl pb-3 section-title'>Header</h2>
//                 <div className=''>
//                   <div className='flex flex-wrap md:justify-between items-end'>
//                     <CustomFormItem
//                       label='Tc Number'
//                       name='header_tc_number'
//                       placeholder='Enter Tc Number'
//                     />
//                     <CustomFormItem
//                       label='Tc Version Number'
//                       name='tc_version_number'
//                       placeholder='Enter Tc Version Number'
//                     />
//                   </div>
//                   <div className='flex flex-wrap md:justify-between items-end'>
//                     <CustomFormItem
//                       label='Tc Standard'
//                       name='header_tc_standard'
//                       placeholder='Enter Tc Standard'
//                     />
//                     {/* <AntdForm.Item
//                       label='File Name'
//                       name='file_name'
//                       className='w-full md:w-[49%]'
//                       rules={[
//                         { required: true, message: 'File Name is required' }
//                       ]}
//                     >
//                       <Input placeholder='Enter File Name' />
//                     </AntdForm.Item> */}
//                     <CustomFormItem
//                       label='File Name'
//                       name='file_name'
//                      placeholder='Enter File Name'
//                     />
//                   </div>
//                 </div>
//               </section>
//               {/* Footer*/}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'>Footer</h2>
//                 <div className=''>
//                   <div className='flex flex-wrap md:justify-between items-end'>
//                     <AntdForm.Item
//                       label='Tc Place of Issue'
//                       name='tc_place_of_issue'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Tc Place of Issue' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Tc Date Of Issue'
//                       name='tc_date_of_issue'
//                       className='w-full md:w-[49%]'
//                     >
//                       <DatePicker
//                         className='datePickerIpnut'
//                         format='DD/MM/YYYY'
//                       />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex flex-wrap md:justify-between items-end'>
//                     <AntdForm.Item
//                       label='Name Of Authorized Signatory'
//                       name='name_of_authorized_signatory'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Name Of Authorized Signatory' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Tc Status'
//                       name='tc_status'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Name Tc Status' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex flex-wrap md:justify-between items-end'>
//                     <AntdForm.Item
//                       label='Tc Last Updated'
//                       name='tc_last_updated'
//                       className='w-full md:w-[49%]'
//                     >
//                       <DatePicker
//                         className='datePickerIpnut'
//                         format='DD/MM/YYYY'
//                       />
//                     </AntdForm.Item>
//                   </div>
//                 </div>
//               </section>
//               {/* certificate info */}
//               <section className='section'>
//                 <h2 className=' pb-3 section-title'>
//                   Certificate Body Information:
//                 </h2>
//                 <div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Certificate Name'
//                       name='cb_name'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Certification Name' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Town'
//                       name='town'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Town' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Post Code'
//                       name='postcode'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Postcode' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='State or Province'
//                       name='state_or_province'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter State or Province' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Country or Area'
//                       name='country_or_area'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Country or Area' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Licensing Code of Certification Body'
//                       name='licensing_code_of_certification_body'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Licensing Code of Certification Body' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.List name='cb_address'>
//                       {(fields, { add, remove }) => (
//                         <>
//                           <AntdForm.Item
//                             label='Certificate Address'
//                             required
//                             className='w-full md:w-[49%]'
//                           >
//                             {fields.map(
//                               ({ key, name, ...restField }, index) => (
//                                 <Space
//                                   key={key}
//                                   style={{ display: 'flex', marginBottom: 8 }}
//                                   align='baseline'
//                                 >
//                                   <AntdForm.Item
//                                     {...restField}
//                                     name={[name, 'cb_address_']}
//                                     style={{ flex: 1 }}
//                                   >
//                                     <Input
//                                       placeholder={`Enter Certificate Address`}
//                                     />
//                                   </AntdForm.Item>

//                                   {fields.length > 1 && (
//                                     <MinusCircleOutlined
//                                       onClick={() => remove(name)}
//                                     />
//                                   )}
//                                 </Space>
//                               )
//                             )}
//                             <AntdForm.Item>
//                               <Button
//                                 type='dashed'
//                                 onClick={() => add()}
//                                 block
//                                 icon={<PlusOutlined />}
//                               >
//                                 Add Certificate Address
//                               </Button>
//                             </AntdForm.Item>
//                           </AntdForm.Item>
//                         </>
//                       )}
//                     </AntdForm.List>
//                   </div>
//                 </div>
//               </section>
//               {/* Seller of Certified Products */}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'>
//                   Seller of Certified Products Information:
//                 </h2>
//                 <div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Seller Name'
//                       name='seller_name'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Seller Name' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Seller Town'
//                       name='seller_town'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Seller Town' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Seller Postcode'
//                       name='seller_postcode'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Seller Postcode' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Seller State or Province'
//                       name='seller_state_or_province'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Seller State or Province' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Seller Country or Area'
//                       name='seller_country_or_area'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Seller Country or Area' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Seller on Behalf Of'
//                       name='seller_on_behalf_of'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Seller on Behalf Of' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Seller Certified Organization Name'
//                       name='seller_certified_organization_name'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Seller Certified Organization Name' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Sc Number'
//                       name='sc_number'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Sc Number' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Textile Exchange Id'
//                       name='textile_exchange_id'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Textile Exchange Id' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Client Number'
//                       name='client_number'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Client Number' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Seller Licence Number'
//                       name='seller_licence_number'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Seller Licence Number' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Non Certified Trader'
//                       name='non_certified_trader'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Non Certified Trader' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Trader Te Id'
//                       name='trader_te_id'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Trader Te Id' />
//                     </AntdForm.Item>
//                     <AntdForm.List name='seller_address'>
//                       {(fields, { add, remove }) => (
//                         <>
//                           <AntdForm.Item
//                             label='Seller Address'
//                             required
//                             className='w-full md:w-[49%]'
//                           >
//                             {fields.map(
//                               ({ key, name, ...restField }, index) => (
//                                 <Space
//                                   key={key}
//                                   style={{ display: 'flex', marginBottom: 8 }}
//                                   align='baseline'
//                                 >
//                                   <AntdForm.Item
//                                     {...restField}
//                                     name={[name, 'seller_address_']}
//                                     style={{ flex: 1 }}
//                                   >
//                                     <Input
//                                       placeholder={`Enter Seller Address`}
//                                     />
//                                   </AntdForm.Item>

//                                   {fields.length > 1 && (
//                                     <MinusCircleOutlined
//                                       onClick={() => remove(name)}
//                                     />
//                                   )}
//                                 </Space>
//                               )
//                             )}
//                             <AntdForm.Item>
//                               <Button
//                                 type='dashed'
//                                 onClick={() => add()}
//                                 block
//                                 icon={<PlusOutlined />}
//                               >
//                                 Add Seller Address
//                               </Button>
//                             </AntdForm.Item>
//                           </AntdForm.Item>
//                         </>
//                       )}
//                     </AntdForm.List>
//                   </div>
//                 </div>
//               </section>
//               {/* Buyer of Certified Products */}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'>
//                   Buyer of certified product(s) Information:
//                 </h2>
//                 <div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Buyer Name'
//                       name='buyer_name'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Buyer Name' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Buyer Town'
//                       name='buyer_town'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Buyer Town' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Buyer Postcode'
//                       name='buyer_postcode'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Buyer Postcode' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Buyer State or Province'
//                       name='buyer_state_or_province'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Buyer State or Province' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Buyer Country or Area'
//                       name='buyer_country_or_area'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Buyer Country or Area' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Buyer on Behalf Of'
//                       name='buyer_on_behalf_of'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Buyer on Behalf Of' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Buyer Certified Organization Name'
//                       name='buyer_certified_organization_name'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Buyer Certified Organization Name' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Textile Exchange Id'
//                       name='buyer_textile_exchange_id'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Textile Exchange Id' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Buyer Cb Acronym'
//                       name='buyer_cb_acronym'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Buyer Cb Acronym' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Client Number'
//                       name='buyer_client_number'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Client Number' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Buyer Licence Number'
//                       name='buyer_licence_number'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Buyer Licence Number' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Trader Te Id'
//                       name='buyer_trader_te_id'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Trader Te Id' />
//                     </AntdForm.Item>
//                   </div>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <AntdForm.List name='buyer_address'>
//                       {(fields, { add, remove }) => (
//                         <>
//                           <AntdForm.Item
//                             label='Buyer Address'
//                             required
//                             className='w-full md:w-[49%]'
//                           >
//                             {fields.map(
//                               ({ key, name, ...restField }, index) => (
//                                 <Space
//                                   key={key}
//                                   style={{ display: 'flex', marginBottom: 8 }}
//                                   align='baseline'
//                                 >
//                                   <AntdForm.Item
//                                     {...restField}
//                                     name={[name, 'buyer_address_']}
//                                     style={{ flex: 1 }}
//                                   >
//                                     <Input
//                                       placeholder={`Enter Buyer Address`}
//                                     />
//                                   </AntdForm.Item>

//                                   {fields.length > 1 && (
//                                     <MinusCircleOutlined
//                                       onClick={() => remove(name)}
//                                     />
//                                   )}
//                                 </Space>
//                               )
//                             )}
//                             <AntdForm.Item>
//                               <Button
//                                 type='dashed'
//                                 onClick={() => add()}
//                                 block
//                                 icon={<PlusOutlined />}
//                               >
//                                 Add Buyer Address
//                               </Button>
//                             </AntdForm.Item>
//                           </AntdForm.Item>
//                         </>
//                       )}
//                     </AntdForm.List>
//                   </div>
//                 </div>
//               </section>
//               {/* 4.5.6. Weights */}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'> Weights</h2>
//                 <div className=''>
//                   <div className='flex items-center md:justify-between flex-wrap'>
//                     <AntdForm.Item
//                       label='Gross Shipping Weight'
//                       name='gross_shipping_weight'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Gross Shipping Weight' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Net Shipping Weight'
//                       name='net_shipping_weight'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Net Shipping Weight' />
//                     </AntdForm.Item>
//                   </div>
//                   <AntdForm.List name='certified_weight'>
//                     {(fields, { add, remove }) => (
//                       <>
//                         <AntdForm.Item
//                           label='Certified Weight'
//                           required
//                           className='w-full md:w-[49%]'
//                         >
//                           {fields.map(({ key, name, ...restField }, index) => (
//                             <Space
//                               key={key}
//                               style={{ display: 'flex', marginBottom: 8 }}
//                               align='baseline'
//                             >
//                               <AntdForm.Item
//                                 {...restField}
//                                 name={[name, 'certified_weight_']}
//                                 style={{ flex: 1 }}
//                               >
//                                 <Input placeholder={`Enter Certified Weight`} />
//                               </AntdForm.Item>

//                               {fields.length > 1 && (
//                                 <MinusCircleOutlined
//                                   onClick={() => remove(name)}
//                                 />
//                               )}
//                             </Space>
//                           ))}
//                           <AntdForm.Item>
//                             <Button
//                               type='dashed'
//                               onClick={() => add()}
//                               block
//                               icon={<PlusOutlined />}
//                             >
//                               Add Certified Weight
//                             </Button>
//                           </AntdForm.Item>
//                         </AntdForm.Item>
//                       </>
//                     )}
//                   </AntdForm.List>
//                 </div>
//               </section>
//               {/* Declarations by Certification Body */}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'>
//                   {' '}
//                   Declarations by Certification Body
//                 </h2>
//                 <div className=''>
//                   <div className='flex flex-wrap md:justify-between items-end'>
//                     <AntdForm.Item
//                       label='An Organic Farmin Standards Which is Closed By'
//                       name='an_organic_farmin_standards_which_is_closed_by'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter An Organic Farmin Standards Which is Closed By' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Tc Standard'
//                       name='tc_standard'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Tc Standard' />
//                     </AntdForm.Item>
//                   </div>

//                   <div className='flex flex-wrap md:justify-between items-end'>
//                     <AntdForm.Item
//                       label='Certification of the organic material used for the products listed complies with USDA NOP rules:'
//                       name='certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Organic Material Certification' />
//                     </AntdForm.Item>
//                     <AntdForm.Item
//                       label='Tc Organic Farm Standard'
//                       name='tc_organic_farm_standard'
//                       className='w-full md:w-[49%]'
//                     >
//                       <Input placeholder='Enter Tc Organic Farm Standard' />
//                     </AntdForm.Item>
//                   </div>

//                   <div className='flex flex-wrap md:justify-between items-end'></div>
//                 </div>
//               </section>
//               {/* 8. Certified Input References  */}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'>
//                   {' '}
//                   Certified Input References{' '}
//                 </h2>
//                 <div className=''>
//                   <div className='flex md:justify-between flex-wrap'>
//                     <div className='w-full'>
//                       <>
//                         <AntdForm.Item name='InputTCs' label='Input TCs'>
//                           <TagInput
//                             tags={tags}
//                             setTags={setTags}
//                             name='InputTCs'
//                           />
//                         </AntdForm.Item>

//                         <AntdForm.Item name='FarmSCs' label='Farm SCs'>
//                           <TagInput
//                             tags={tags1}
//                             setTags={setTags1}
//                             name='FarmSCs'
//                           />
//                         </AntdForm.Item>

//                         <AntdForm.Item name='FarmTCs' label='Farm TCs'>
//                           <TagInput
//                             tags={tags2}
//                             setTags={setTags2}
//                             name='FarmTCs'
//                           />
//                         </AntdForm.Item>
//                       </>
//                     </div>
//                     <AntdForm.Item
//                       label='Trader(s) Transaction Certificates numbers of First Raw material:'
//                       name='trader_tcs_for_organic_material'
//                       className='w-full'
//                     >
//                       <Input placeholder='Enter Trader(s) Transaction Certificates numbers of First Raw material:' />
//                     </AntdForm.Item>
//                   </div>
//                 </div>
//               </section>
//               {/* 9. Shipments */}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'> Shipments </h2>
//                 <div className='Shipments'>
//                   <AntdForm.List name='ShipmentDetails'>
//                     {(fields, { add, remove }) => (
//                       <>
//                         {fields.map(({ key, name, ...restField }) => (
//                           <Space
//                             key={key}
//                             style={{ display: 'flex', marginBottom: 8 }}
//                             align='baseline'
//                           >
//                             <div className='md:pb-5'>
//                               <div className='flex md:justify-between flex-wrap'>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Shipment No.'
//                                   name={[name, 'shipment_no']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <Input placeholder='Enter Shipment No.' />
//                                 </AntdForm.Item>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Shipment Date:'
//                                   name={[name, 'shipment_date']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <DatePicker
//                                     className='datePickerIpnut'
//                                     format='DD/MM/YYYY'
//                                   />
//                                 </AntdForm.Item>
//                               </div>
//                               <div className='flex md:justify-between flex-wrap'>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Shipment Doc No.'
//                                   name={[name, 'shipment_doc_no']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <Input placeholder='Enter Shipment Doc No.' />
//                                 </AntdForm.Item>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Gross Shipping Weight:'
//                                   name={[name, 'gross_shipping_weight']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <Input placeholder='Enter Gross Shipping Weight' />
//                                 </AntdForm.Item>
//                               </div>
//                               <div className='flex md:justify-between flex-wrap'>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Invoice References:'
//                                   name={[name, 'invoice_references']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <Input placeholder='Enter Invoice References' />
//                                 </AntdForm.Item>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Consignee Name:'
//                                   name={[name, 'consignee_name']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <Input placeholder='Enter Consignee Name' />
//                                 </AntdForm.Item>
//                               </div>
//                               <div className='flex md:justify-between flex-wrap'>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Consignee Town:'
//                                   name={[name, 'consignee_town']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <Input placeholder='Enter Consignee Town' />
//                                 </AntdForm.Item>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Consignee Postcode:'
//                                   name={[name, 'consignee_postcode']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <Input placeholder='Enter Consignee Postcode' />
//                                 </AntdForm.Item>
//                               </div>
//                               <div className='flex md:justify-between flex-wrap'>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Consignee State or Province:'
//                                   name={[name, 'consignee_state_or_province']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <Input placeholder='Enter Consignee State or Province' />
//                                 </AntdForm.Item>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Consignee Country or Area'
//                                   name={[name, 'consignee_country_or_area']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <Input placeholder='Consignee Country or Area' />
//                                 </AntdForm.Item>
//                               </div>
//                               <div className='flex md:justify-between flex-wrap'>
//                                 <AntdForm.Item
//                                   {...restField}
//                                   label='Te Id'
//                                   name={[name, 'consignee_te_id']}
//                                   className='w-full md:w-[49%]'
//                                 >
//                                   <Input placeholder='Enter Te Id' />
//                                 </AntdForm.Item>
//                                 <div className='w-full md:w-[49%]'>
//                                   {/* Nested List for Consignee Address */}
//                                   <AntdForm.List
//                                     name={[name, 'consignee_address']}
//                                     initialValue={[{ consignee_address_: '' }]}
//                                   >
//                                     {(
//                                       subFields,
//                                       { add: addSub, remove: removeSub }
//                                     ) => (
//                                       <>
//                                         {subFields.map(
//                                           ({
//                                             key: subKey,
//                                             name: subName,
//                                             ...restSubField
//                                           }) => (
//                                             <Space
//                                               key={subKey}
//                                               style={{
//                                                 display: 'flex',
//                                                 marginBottom: 8
//                                               }}
//                                               align='baseline'
//                                             >
//                                               <AntdForm.Item
//                                                 {...restSubField}
//                                                 name={[
//                                                   subName,
//                                                   'consignee_address_'
//                                                 ]}
//                                                 label='Consignee Address:'
//                                                 className='w-full md:w-[49%]'
//                                               >
//                                                 <Input placeholder='Enter Consignee Address' />
//                                               </AntdForm.Item>
//                                               {subFields.length > 1 && (
//                                                 <MinusCircleOutlined
//                                                   onClick={() =>
//                                                     removeSub(subName)
//                                                   }
//                                                 />
//                                               )}
//                                             </Space>
//                                           )
//                                         )}
//                                         <AntdForm.Item>
//                                           <Button
//                                             type='dashed'
//                                             onClick={() => addSub()}
//                                             block
//                                             icon={<PlusOutlined />}
//                                           >
//                                             Add Consignee Address
//                                           </Button>
//                                         </AntdForm.Item>
//                                       </>
//                                     )}
//                                   </AntdForm.List>
//                                 </div>
//                               </div>
//                             </div>
//                             {fields.length > 1 && (
//                               <MinusCircleOutlined
//                                 onClick={() => remove(name)}
//                               />
//                             )}
//                           </Space>
//                         ))}

//                         <AntdForm.Item>
//                           <Button
//                             type='dashed'
//                             onClick={() => add()}
//                             block
//                             icon={<PlusOutlined />}
//                           >
//                             Add Shipment Details
//                           </Button>
//                         </AntdForm.Item>
//                       </>
//                     )}
//                   </AntdForm.List>
//                 </div>
//               </section>
//               {/* 10. Certified Products */}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'>
//                   Certified Products
//                 </h2>
//                 <AntdForm.List name='ProductDetails'>
//                   {(fields, { add, remove }) => (
//                     <>
//                       {fields.map(({ key, name, ...restField }) => (
//                         <div key={key} className='pb-5 relative'>
//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Product No.:'
//                               name={[name, 'product_no']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Product No.' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Order No.:'
//                               name={[name, 'order_no']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Order No.' />
//                             </AntdForm.Item>
//                           </div>
//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Article No.:'
//                               name={[name, 'article_no']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Article No.' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Number of Units:'
//                               name={[name, 'number_of_units']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Number of Units' />
//                             </AntdForm.Item>
//                           </div>
//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Net Shipping Weight'
//                               name={[name, 'products_net_shipping_weight']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Net Shipping Weight' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Supplementary Weight'
//                               name={[name, 'supplementary_weight']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Supplementary Weight' />
//                             </AntdForm.Item>
//                           </div>

//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Production Date:'
//                               name={[name, 'production_date']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <DatePicker
//                                 className='datePickerIpnut'
//                                 format='DD/MM/YYYY'
//                               />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Product Category'
//                               name={[name, 'product_category']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Product Category' />
//                             </AntdForm.Item>
//                           </div>
//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Product Detail:'
//                               name={[name, 'product_detail']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Product Detail' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Material Composition'
//                               name={[name, 'material_composition']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Material Composition' />
//                             </AntdForm.Item>
//                           </div>
//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Standard Label Grade:'
//                               name={[name, 'standard_label_grade']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Standard Label Grade' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Additional Info'
//                               name={[name, 'additional_info']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Additional Info' />
//                             </AntdForm.Item>
//                           </div>
//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Last Processor'
//                               name={[name, 'last_processor']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Last Processor' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Te Id'
//                               name={[name, 'products_te_id']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Te Id' />
//                             </AntdForm.Item>
//                           </div>
//                           <div className='flex md:justify-between flex-wrap'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Certified Weight:'
//                               name={[name, 'products_certified_weight']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Certified Weight' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Country'
//                               name={[name, 'products_Country']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Country' />
//                             </AntdForm.Item>
//                           </div>
//                           {fields.length > 1 && (
//                             <MinusCircleOutlined
//                               className='dynamic-delete-button StandardLabelGradeDelete'
//                               onClick={() => remove(name)}
//                             />
//                           )}
//                         </div>
//                       ))}
//                       <AntdForm.Item>
//                         <Button
//                           type='dashed'
//                           onClick={() => add()}
//                           block
//                           icon={<PlusOutlined />}
//                         >
//                           Add Product
//                         </Button>
//                       </AntdForm.Item>
//                     </>
//                   )}
//                 </AntdForm.List>
//               </section>

//               {/* 11.  Certified Components*/}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'>
//                   Certified Components
//                 </h2>
//                 <div className='certified_components'>
//                   <AntdForm.List name='certified_components'>
//                     {(fields, { add, remove }) => (
//                       <>
//                         {fields.map(({ key, name, ...restField }) => (
//                           <div
//                             key={key}
//                             className='pb-5 certified_component_part relative'
//                           >
//                             <div className='flex md:justify-between flex-wrap'>
//                               <AntdForm.Item
//                                 {...restField}
//                                 label='Product Component No.'
//                                 name={[name, 'product_component_no']}
//                                 className='w-full md:w-[49%]'
//                               >
//                                 <Input placeholder='Enter Product Component No.' />
//                               </AntdForm.Item>
//                               <AntdForm.Item
//                                 {...restField}
//                                 label='Component Detail:'
//                                 name={[name, 'component_detail']}
//                                 className='w-full md:w-[49%]'
//                               >
//                                 <Input placeholder='Enter Component Detail' />
//                               </AntdForm.Item>
//                             </div>
//                             <div className='flex md:justify-between flex-wrap'>
//                               <AntdForm.Item
//                                 {...restField}
//                                 label='Net Shipping Weight'
//                                 name={[
//                                   name,
//                                   'product_component_net_shipping_weight'
//                                 ]}
//                                 className='w-full md:w-[49%]'
//                               >
//                                 <Input placeholder='Enter Net Shipping Weight' />
//                               </AntdForm.Item>
//                               <AntdForm.Item
//                                 {...restField}
//                                 label='Material Composition'
//                                 name={[
//                                   name,
//                                   'product_component_material_composition'
//                                 ]}
//                                 className='w-full md:w-[49%]'
//                               >
//                                 <Input placeholder='Enter Material Composition' />
//                               </AntdForm.Item>
//                             </div>
//                             <div className='flex md:justify-between flex-wrap'>
//                               <AntdForm.Item
//                                 {...restField}
//                                 label='Supplementary Weight'
//                                 name={[
//                                   name,
//                                   'product_component_supplementary_weight'
//                                 ]}
//                                 className='w-full md:w-[49%]'
//                               >
//                                 <Input placeholder='Enter Supplementary Weight' />
//                               </AntdForm.Item>
//                               <AntdForm.Item
//                                 {...restField}
//                                 label='Certified Weight'
//                                 name={[
//                                   name,
//                                   'product_component_certified_weight'
//                                 ]}
//                                 className='w-full md:w-[49%]'
//                               >
//                                 <Input placeholder='Enter Certified Weight' />
//                               </AntdForm.Item>
//                             </div>
//                             <div className='flex md:justify-between flex-wrap'>
//                               <AntdForm.Item
//                                 {...restField}
//                                 label='Standard Name'
//                                 name={[name, 'product_component_standard_name']}
//                                 className='w-full md:w-[49%]'
//                               >
//                                 <Input placeholder='Enter Standard Name' />
//                               </AntdForm.Item>
//                               <AntdForm.Item
//                                 {...restField}
//                                 label='Standard Label Grade'
//                                 name={[name, 'product_component_label_grade']}
//                                 className='w-full md:w-[49%]'
//                               >
//                                 <Input placeholder='Enter Standard Label Grade' />
//                               </AntdForm.Item>
//                             </div>
//                             <div className='flex md:justify-between flex-wrap'>
//                               <AntdForm.Item
//                                 {...restField}
//                                 label='Additional Info'
//                                 name={[
//                                   name,
//                                   'product_component_additional_info'
//                                 ]}
//                                 className='w-full md:w-[49%]'
//                               >
//                                 <Input placeholder='Enter Additional Info' />
//                               </AntdForm.Item>
//                             </div>

//                             {fields.length > 1 && (
//                               <MinusCircleOutlined
//                                 className='dynamic-delete-button'
//                                 onClick={() => remove(name)}
//                               />
//                             )}
//                           </div>
//                         ))}
//                         <AntdForm.Item>
//                           <Button
//                             type='dashed'
//                             onClick={() =>
//                               add({
//                                 product_component_no: '',
//                                 component_detail: '',
//                                 product_component_net_shipping_weight: '',
//                                 product_component_material_composition: '',
//                                 product_component_supplementary_weight: '',
//                                 product_component_certified_weight: '',
//                                 product_component_standard_name: '',
//                                 product_component_label_grade: '',
//                                 product_component_additional_info: ''
//                               })
//                             }
//                             block
//                             icon={<PlusOutlined />}
//                           >
//                             Add Component
//                           </Button>
//                         </AntdForm.Item>
//                       </>
//                     )}
//                   </AntdForm.List>
//                 </div>
//               </section>

//               {/* 12. Certified Raw Materials And Declared Geographic Origin */}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'>
//                   Certified Raw Materials And Declared Geographic Origin{' '}
//                 </h2>
//                 <AntdForm.List name='certified_raw_material_list'>
//                   {(fields, { add, remove }) => (
//                     <>
//                       {fields.map(({ key, name, ...restField }, index) => (
//                         <div
//                           key={key}
//                           className={`pb-4 certified_component_part relative raw_material_part `}
//                         >
//                           {/* ${index === 0 ? "pt-4" : ""} */}
//                           <div className='flex flex-wrap md:justify-between items-end'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Certified Raw Material'
//                               name={[name, 'certified_raw_material']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Certified Raw Material' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Certified Weight'
//                               name={[name, 'certified_certified_weight']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Certified Weight' />
//                             </AntdForm.Item>
//                           </div>

//                           <div className='flex flex-wrap md:justify-between items-end'>
//                             <AntdForm.Item
//                               {...restField}
//                               label='State or Province'
//                               name={[name, 'certified_state_or_provice']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter State or Province' />
//                             </AntdForm.Item>
//                             <AntdForm.Item
//                               {...restField}
//                               label='Country or Area'
//                               name={[name, 'certified_country_or_area']}
//                               className='w-full md:w-[49%]'
//                             >
//                               <Input placeholder='Enter Country or Area' />
//                             </AntdForm.Item>
//                           </div>

//                           {fields.length > 1 && (
//                             <MinusCircleOutlined
//                               className='dynamic-delete-button'
//                               onClick={() => remove(name)}
//                             />
//                           )}
//                         </div>
//                       ))}
//                       <AntdForm.Item>
//                         <Button
//                           type='dashed'
//                           onClick={() =>
//                             add({
//                               certified_raw_material: '',
//                               certified_certified_weight: '',
//                               certified_state_or_provice: '',
//                               certified_country_or_area: ''
//                             })
//                           }
//                           block
//                           icon={<PlusOutlined />}
//                         >
//                           Add Raw Materials
//                         </Button>
//                       </AntdForm.Item>
//                     </>
//                   )}
//                 </AntdForm.List>
//               </section>

//               {/* 12. declarations_by_seller_of_certified_products */}
//               <section className='section'>
//                 <h2 className='text-2xl pb-3 section-title'>
//                   The Certified Products Covered In This Certificate Have Been
//                   Outsourced To A Subcontractor{' '}
//                 </h2>
//                 <div className=''>
//                   <div className='flex flex-wrap md:justify-between items-end'>
//                     <AntdForm.Item
//                       label='The Certified Products Covered In This Certificate Have Been Outsourced To A Subcontractor'
//                       name='the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor'
//                       className='w-full'
//                     >
//                       <Input placeholder='Enter The Certified Products Covered In This Certificate Have Been Outsourced To A Subcontractor' />
//                     </AntdForm.Item>
//                   </div>
//                 </div>
//               </section>
//               <AntdForm.Item className=' submitButtonGroup'>
//                 <Button
//                   type='primary'
//                   htmlType='submit'
//                   className='submit-btn '
//                 >
//                   Submit
//                 </Button>
//               </AntdForm.Item>
//             </AntdForm>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ImportPdfTCtype1

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
import {
  createFormTcType1,
  exportPdfTcType1,
  form1Set,
  formFill1
} from '../../api/Form1Api'
import { cloneDeep, forEach } from 'lodash'
import TagInput from '../../component/Tags'
import dayjs from 'dayjs'
import { Slidebar } from '../../layout/Slidebar'
import Spinner from '../../layout/Spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { formatDateToDDMMYYYY, links } from '../../utils/utils'
import CustomFormItem from '../../layout/CustomFormItem'
import { debounce } from 'lodash'
import TagWithError from '../../component/TagsWithError'

const ImportPdfTCtype1 = () => {
  const [form] = AntdForm.useForm()
  const [form2] = AntdForm.useForm()
  const [formNo, setFormNo] = useState('1')
  const [data, setdata] = useState('1')
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [emptyFields, setEmptyFields] = useState({})

  const navigate = useNavigate()
  const handleSubmit = async values => {
    setLoading(true)
    try {
      let fomrData = new FormData()
      fomrData.append('tc-type-1', values.UploadPdf[0].originFileObj)
      let response = await exportPdfTcType1(fomrData)
      let res = response?.data?.extracted_data

      if (response?.status_code === 200 || response?.status_code === 201) {
        setFormNo('2')
        setdata(res)
        toast.success('pdf submitted Successfully.')

        let inputTcs = []
        inputTcs =
          res?.certified_input_references?.input_tcs
            .split(/[,:;]\s*/)
            .filter(Boolean) || []
        let farm_tcs = []
        farm_tcs =
          res?.certified_input_references?.farm_tcs
            .split(/[,:;]\s*/)
            .filter(Boolean) || []
        let farm_scs = []
        farm_scs =
          res?.certified_input_references?.farm_scs
            .split(/[,:;]\s*/)
            .filter(Boolean) || []

        setTags(inputTcs)
        setTags1(farm_scs)
        setTags2(farm_tcs)

        let cb_address = res?.certification_body?.cb_address?.map(
          (ele, ind) => {
            let obj = {
              cb_address_: ele
            }
            return obj
          }
        )

        let seller_address =
          res?.seller_of_certified_products?.seller_address?.map((ele, ind) => {
            let obj = {
              seller_address_: ele
            }
            return obj
          })

        let buyer_address =
          res?.buyer_of_certified_products?.buyer_address?.map((ele, ind) => {
            let obj = {
              buyer_address_: ele
            }
            return obj
          })

        let certified_weight = res?.certified_weight?.map((ele, ind) => {
          let obj = {
            certified_weight_: ele
          }
          return obj
        })

        let ShipmentDetails = res?.shipments?.map((ele, ind) => {
          let consignee_address =
            ele?.consignee_name_and_address?.consignee_address?.map(
              (ele, ind) => {
                let obj = {
                  consignee_address_: ele
                }
                return obj
              }
            )

          let obj = {
            shipment_no: ele?.shipment_no,
            shipment_date:
              res?.shipment_date === ''
                ? null
                : dayjs(ele?.shipment_date, 'DD/mm/YYYY'),
            shipment_doc_no: ele?.shipment_doc_no,
            gross_shipping_weight: ele?.gross_shipping_weight,
            invoice_references: ele?.invoice_references,
            consignee_name: ele?.consignee_name_and_address?.consignee_name,
            consignee_address: consignee_address,
            consignee_town: ele?.consignee_name_and_address?.consignee_town,
            consignee_postcode:
              ele?.consignee_name_and_address?.consignee_postcode,
            consignee_state_or_province:
              ele?.consignee_name_and_address?.consignee_state_or_province,
            consignee_country_or_area:
              ele?.consignee_name_and_address?.consignee_country_or_area,
            consignee_te_id: ele?.consignee_name_and_address?.te_id
          }
          return obj
        })

        let ProductDetails = res?.certified_products?.map((ele, ind) => {
          let obj = {
            product_no: ele?.product_no,
            order_no: ele?.order_no,
            article_no: ele?.article_no,
            number_of_units: ele?.number_of_units,
            products_net_shipping_weight: ele?.net_shipping_weight,
            supplementary_weight: ele?.supplementary_weight,
            products_certified_weight: ele?.certified_weight,
            production_date:
              res?.production_date === ''
                ? null
                : dayjs(ele?.production_date, 'DD/MM/YYYY'),
            product_category: ele?.product_category,
            product_detail: ele?.product_detail,
            material_composition: ele?.material_composition,
            standard_label_grade: ele?.standard_label_grade,
            additional_info: ele?.additional_info,
            last_processor: ele?.last_processor,
            products_te_id: ele?.te_id,
            products_Country: ele?.country
          }

          return obj
        })

        let certified_components = res?.certified_components?.map(
          (ele, ind) => {
            let obj = {
              product_component_no: ele?.product_component_no,
              component_detail: ele?.component_detail,
              product_component_net_shipping_weight: ele?.net_shipping_weight,
              product_component_material_composition: ele?.material_composition,
              product_component_supplementary_weight: ele?.supplementary_weight,
              product_component_standard_name: ele?.standard?.name,
              product_component_label_grade: ele?.standard?.label_grade,
              product_component_certified_weight: ele?.certified_weight,
              product_component_additional_info: ele?.additional_info
            }
            return obj
          }
        )
        if (certified_components?.length === 0) {
          certified_components.push({
            product_component_no: '',
            component_detail: '',
            product_component_net_shipping_weight: '',
            product_component_material_composition: '',
            product_component_supplementary_weight: '',
            product_component_standard_name: '',
            product_component_label_grade: '',
            product_component_certified_weight: '',
            product_component_additional_info: ''
          })
        }

        let certified_raw_materials_and_declared_geographic_origin =
          res?.certified_raw_materials_and_declared_geographic_origin?.map(
            (ele, ind) => {
              let obj = {
                certified_raw_material: ele?.certified_raw_material,
                certified_certified_weight: ele?.certified_weight,
                certified_state_or_provice: ele?.country_or_area,
                certified_country_or_area: ele?.state_or_provice
              }
              return obj
            }
          )

        form2.setFieldsValue({
          file_name: response?.data?.file_name,
          cb_name: res?.certification_body?.cb_name,
          cb_address: cb_address,
          trader_tcs_for_organic_material:
            res?.certified_input_references?.trader_tcs_for_organic_material,
          town: res?.certification_body?.town,
          postcode: res?.certification_body?.postcode,
          state_or_province: res?.certification_body?.state_or_province,
          country_or_area: res?.certification_body?.country_or_area,
          licensing_code_of_certification_body:
            res?.certification_body?.licensing_code_of_certification_body,
          seller_name: res?.seller_of_certified_products?.seller_name,
          seller_town: res?.seller_of_certified_products?.seller_town,
          seller_postcode: res?.seller_of_certified_products?.seller_postcode,
          seller_state_or_province:
            res?.seller_of_certified_products?.seller_state_or_province,
          seller_country_or_area:
            res?.seller_of_certified_products?.seller_country_or_area,
          seller_on_behalf_of:
            res?.seller_of_certified_products?.seller_on_behalf_of,
          seller_certified_organization_name:
            res?.seller_of_certified_products
              ?.seller_certified_organization_name,
          sc_number: res?.seller_of_certified_products?.sc_number,
          textile_exchange_id: res?.seller_of_certified_products?.trader_te_id,
          client_number: res?.seller_of_certified_products?.client_number,
          seller_licence_number:
            res?.seller_of_certified_products?.seller_licence_number,
          non_certified_trader:
            res?.seller_of_certified_products?.non_certified_trader,
          trader_te_id: res?.seller_of_certified_products?.trader_te_id,
          seller_address: seller_address,
          buyer_name: res?.buyer_of_certified_products?.buyer_name,
          buyer_address: buyer_address,
          buyer_town: res?.buyer_of_certified_products?.buyer_town,
          buyer_postcode: res?.buyer_of_certified_products?.buyer_postcode,
          buyer_state_or_province:
            res?.buyer_of_certified_products?.buyer_state_or_province,
          buyer_country_or_area:
            res?.buyer_of_certified_products?.buyer_country_or_area,
          buyer_on_behalf_of:
            res?.buyer_of_certified_products?.buyer_on_behalf_of,
          buyer_certified_organization_name:
            res?.buyer_of_certified_products?.buyer_certified_organization_name,
          buyer_textile_exchange_id:
            res?.buyer_of_certified_products?.textile_exchange_id,
          buyer_cb_acronym: res?.buyer_of_certified_products?.buyer_cb_acronym,
          buyer_client_number: res?.buyer_of_certified_products?.client_number,
          buyer_licence_number:
            res?.buyer_of_certified_products?.buyer_licence_number,
          buyer_trader_te_id: res?.buyer_of_certified_products?.trader_te_id,
          gross_shipping_weight: res?.gross_shipping_weight,
          net_shipping_weight: res?.net_shipping_weight,
          certified_weight: certified_weight,
          an_organic_farmin_standards_which_is_closed_by:
            res?.declarations_by_certification_body
              ?.an_organic_farmin_standards_which_is_closed_by,
          tc_standard: res?.declarations_by_certification_body?.tc_standard,
          certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules:
            res?.declarations_by_certification_body
              ?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules,
          tc_organic_farm_standard:
            res?.declarations_by_certification_body?.tc_organic_farm_standard,
          ShipmentDetails: ShipmentDetails,
          ProductDetails: ProductDetails,
          certified_components: certified_components,
          header_tc_number: res?.header?.tc_number,
          tc_version_number: res?.header?.tc_version_number,
          header_tc_standard: res?.header?.tc_standard,
          tc_place_of_issue: res?.footer?.tc_place_of_issue,
          tc_date_of_issue:
            res?.footer?.tc_date_of_issue === ''
              ? null
              : dayjs(res?.footer?.tc_date_of_issue, 'DD/MM/YYYY'),
          name_of_authorized_signatory:
            res?.footer?.name_of_authorized_signatory,
          tc_status: res?.footer?.tc_status,
          tc_last_updated:
            res?.footer?.tc_last_updated === ''
              ? null
              : dayjs(res?.footer?.tc_last_updated, 'DD/MM/YYYY'),
          certified_raw_material_list:
            certified_raw_materials_and_declared_geographic_origin,
          the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor:
            res?.declarations_by_seller_of_certified_products
              ?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
        })
      } else {
        toast.error('Something went Wrong.')
      }
    } catch (error) {
      toast.error('Something went Wrong.')
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

  const [tags, setTags] = useState([])
  const [tags1, setTags1] = useState([])
  const [tags2, setTags2] = useState([])

  const handleSubmit2 = async values => {
    setLoading2(true)

    let cb_address = values?.cb_address?.map((ele, ind) => {
      return ele?.cb_address_
    })

    let seller_address = values?.seller_address?.map((ele, ind) => {
      return ele?.seller_address_
    })

    let buyer_address = values?.buyer_address?.map((ele, ind) => {
      return ele?.buyer_address_
    })

    let certified_weight = values?.certified_weight?.map((ele, ind) => {
      return ele?.certified_weight_
    })

    let input_tcs = tags?.join(';')
    let farm_scs = tags1?.join(';')
    let farm_tcs = tags2?.join(';')

    let shipmentList = values?.ShipmentDetails?.map((ele, ind) => {
      let consignee_address = ele?.consignee_address?.map((ele, ind) => {
        return ele?.consignee_address_
      })
      let obj = {
        shipment_no: ele?.shipment_no,
        shipment_date: formatDateToDDMMYYYY(ele?.shipment_date),
        shipment_doc_no: ele?.shipment_doc_no,
        gross_shipping_weight: ele?.gross_shipping_weight,
        invoice_references: ele?.invoice_references,
        consignee_name_and_address: {
          consignee_name: ele?.consignee_name,
          consignee_address: consignee_address,
          consignee_town: ele?.consignee_town,
          consignee_postcode: ele?.consignee_postcode,
          consignee_state_or_province: ele?.consignee_state_or_province,
          consignee_country_or_area: ele?.consignee_country_or_area,
          te_id: ele?.consignee_te_id
        }
      }
      return obj
    })

    let ProductDetails = values?.ProductDetails?.map((ele, ind) => {
      console.log(ele)

      let obj = {
        product_no: ele?.product_no,
        order_no: ele?.order_no,
        article_no: ele?.article_no,
        number_of_units: ele?.number_of_units,
        net_shipping_weight: ele?.products_net_shipping_weight,
        supplementary_weight: ele?.supplementary_weight,
        certified_weight: ele?.products_certified_weight,
        production_date: formatDateToDDMMYYYY(ele?.production_date),
        product_category: ele?.product_category,
        product_detail: ele?.product_detail,
        material_composition: ele?.material_composition,
        standard_label_grade: ele?.standard_label_grade,
        additional_info: ele?.additional_info,
        last_processor: ele?.last_processor,
        te_id: ele?.products_te_id,
        country: ele?.products_Country
      }
      return obj
    })

    let certified_components = values?.certified_components?.map((ele, ind) => {
      let obj = {
        product_component_no: ele?.product_component_no,
        component_detail: ele?.component_detail,
        net_shipping_weight: ele?.product_component_net_shipping_weight,
        material_composition: ele?.product_component_material_composition,
        supplementary_weight: ele?.product_component_supplementary_weight,
        standard: {
          name: ele?.product_component_standard_name,
          label_grade: ele?.product_component_label_grade
        },
        certified_weight: ele?.product_component_certified_weight,
        additional_info: ele?.product_component_additional_info
      }
      return obj
    })

    let certified_raw_materials_and_declared_geographic_origin =
      values?.certified_raw_material_list?.map((ele, ind) => {
        let obj = {
          certified_raw_material: (ele?.certified_raw_material)?.replace(/\).*$/, ")"),
          certified_weight: ele?.certified_certified_weight,
          state_or_provice: ele?.certified_state_or_provice,
          country_or_area: ele?.certified_country_or_area
        }
        return obj
      })

    let data = {
      file_name: values?.file_name,
      extracted_data: {
        certification_body: {
          cb_name: values?.cb_name,
          cb_address: cb_address,
          town: values?.town,
          postcode: values?.postcode,
          state_or_province: values?.state_or_province,
          country_or_area: values?.country_or_area,
          licensing_code_of_certification_body:
            values?.licensing_code_of_certification_body
        },
        seller_of_certified_products: {
          seller_name: values?.seller_name,
          seller_address: seller_address,
          seller_town: values?.seller_town,
          seller_postcode: values?.seller_postcode,
          seller_state_or_province: values?.seller_state_or_province,
          seller_country_or_area: values?.seller_country_or_area,
          seller_on_behalf_of: values?.seller_on_behalf_of,
          seller_certified_organization_name:
            values?.seller_certified_organization_name,
          sc_number: values?.sc_number,
          textile_exchange_id: values?.textile_exchange_id,
          client_number: values?.client_number,
          seller_licence_number: values?.seller_licence_number,
          non_certified_trader: values?.non_certified_trader,
          trader_te_id: values?.trader_te_id
        },
        buyer_of_certified_products: {
          buyer_name: values?.buyer_name,
          buyer_address: buyer_address,
          buyer_town: values?.buyer_town,
          buyer_postcode: values?.buyer_postcode,
          buyer_state_or_province: values?.buyer_state_or_province,
          buyer_country_or_area: values?.buyer_country_or_area,
          buyer_on_behalf_of: values?.buyer_on_behalf_of,
          buyer_certified_organization_name:
            values?.buyer_certified_organization_name,
          textile_exchange_id: values?.buyer_textile_exchange_id,
          buyer_cb_acronym: values?.buyer_cb_acronym,
          client_number: values?.buyer_client_number,
          buyer_licence_number: values?.buyer_licence_number,
          trader_te_id: values?.buyer_trader_te_id
        },
        gross_shipping_weight: values?.gross_shipping_weight,
        net_shipping_weight: values?.net_shipping_weight,
        certified_weight: certified_weight,
        declarations_by_certification_body: {
          an_organic_farmin_standards_which_is_closed_by:
            values?.an_organic_farmin_standards_which_is_closed_by,
          tc_standard: values?.tc_standard,
          certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules:
            values?.certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules,
          tc_organic_farm_standard: values?.tc_organic_farm_standard
        },
        certified_input_references: {
          input_tcs: input_tcs,
          farm_scs: farm_scs,
          farm_tcs: farm_tcs,
          trader_tcs_for_organic_material:
            values?.trader_tcs_for_organic_material
        },
        shipments: shipmentList,
        certified_products: ProductDetails,
        certified_components: certified_components,
        certified_raw_materials_and_declared_geographic_origin:
          certified_raw_materials_and_declared_geographic_origin,
        declarations_by_seller_of_certified_products: {
          the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor:
            values?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
        },
        header: {
          tc_number: values?.header_tc_number,
          tc_version_number: values?.tc_version_number,
          tc_standard: values?.header_tc_standard
        },
        footer: {
          tc_place_of_issue: values?.tc_place_of_issue,
          tc_date_of_issue: formatDateToDDMMYYYY(values?.tc_date_of_issue),
          tc_status: values?.tc_status,
          tc_last_updated: formatDateToDDMMYYYY(values?.tc_last_updated),
          name_of_authorized_signatory: values?.name_of_authorized_signatory
        }
      }
    }

    try {
      let response = await createFormTcType1(data)
      console.log(response)
      if (response?.status_code === 200 || response?.status_code === 201) {
        toast.success(response?.message)
        navigate(`${links.tcType1List}`)
      } else {
        toast.error(response?.message)
      }
    } catch (error) {
      toast.error('Something Went Wrong')
    }

    setLoading2(false)
  }

  const handleValuesChange = debounce(changedValues => {
    if (changedValues?.ShipmentDetails) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues.ShipmentDetails)?.forEach(key => {
          const shipmentDetail = changedValues?.ShipmentDetails?.[key]
          if (shipmentDetail) {
            Object?.keys(shipmentDetail)?.forEach(field => {
              const fieldValue = shipmentDetail?.[field]
              const fieldName = `${key}-${field}`
              updatedEmptyFields[fieldName] = !fieldValue
            })
          }
        })

        return updatedEmptyFields
      })
    } else if (changedValues?.cb_address) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.cb_address)?.forEach(key => {
        const cbAddressValue = form?.getFieldValue([
          'cb_address',
          key,
          'cb_address_'
        ])
        updatedEmptyFields[key] = !cbAddressValue
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.seller_address) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.seller_address)?.forEach(key => {
        const sellerAddressValue = form?.getFieldValue([
          'seller_address',
          key,
          'seller_address_'
        ])
        updatedEmptyFields[key] = !sellerAddressValue
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.buyer_address) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.buyer_address)?.forEach(key => {
        const buyerAddressValue = form?.getFieldValue([
          'buyer_address',
          key,
          'buyer_address_'
        ])
        updatedEmptyFields[key] = !buyerAddressValue
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.certified_weight) {
      const updatedEmptyFields = { ...emptyFields }
      Object.keys(changedValues.certified_weight)?.forEach(key => {
        const certifiedWeight = form?.getFieldValue([
          'certified_weight',
          key,
          'certified_weight_'
        ])
        updatedEmptyFields[key] = !certifiedWeight
      })
      setEmptyFields(updatedEmptyFields)
    } else if (changedValues?.ProductDetails) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues?.ProductDetails)?.forEach(key => {
          const ProductDetail = changedValues?.ProductDetails?.[key]
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
    } else if (changedValues?.certified_components) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues.certified_components)?.forEach(key => {
          const certifiedComponent = changedValues?.certified_components?.[key]
          if (certifiedComponent) {
            Object?.keys(certifiedComponent)?.forEach(field => {
              const fieldValue = certifiedComponent?.[field]
              const fieldName = `${key}-${field}`
              updatedEmptyFields[fieldName] = !fieldValue
            })
          }
        })

        return updatedEmptyFields
      })
    } else if (changedValues?.certified_raw_material_list) {
      setEmptyFields(prevEmptyFields => {
        const updatedEmptyFields = { ...prevEmptyFields }
        Object.keys(changedValues.certified_raw_material_list)?.forEach(key => {
          const certifiedRawMaterialList = changedValues?.certified_raw_material_list?.[key]
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
    }
  }, 100)

  const getFieldClassName = (mainName, name, field, index) => {
    if (field === "product_component_label_grade") {
      console.log(field);

      console.log(form2?.getFieldValue(mainName)?.[index]);

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

  return formNo === '1' ? (
    <>
      {loading && <Spinner message='Loading...' isActive={loading} />}{' '}
      <div className='flex'>
        {' '}
        <div style={{ width: '20%' }}>
          {' '}
          <Slidebar />
        </div>
        <div style={{ width: '80%' }}>
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
              <h2 className=' pb-5 section-title'>
                Upload PDF For Transaction Certificate (TC) Form{' '}
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
          </AntdForm>
        </div>
      </div>
    </>
  ) : (
    <>
      {loading2 && <Spinner message='Loading...' isActive={loading2} />}{' '}
      <div className='flex'>
        {' '}
        <div style={{ width: '20%' }}>
          {' '}
          <Slidebar />
        </div>
        <div style={{ width: '80%' }}>
          {' '}
          <div className='container mx-auto  '>
            <AntdForm
              form={form2}
              onFinish={handleSubmit2}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout='vertical'
              className='form_1  rounded-xl shadow-xl'
              style={{ maxWidth: 900, margin: '0 auto' }}
              onValuesChange={handleValuesChange}
            >
              <h1 className='text-3xl form_1_title form1_heading md:text-4xl font-medium mb-2 sticky text-center'>
                Transaction Certificate (TC) Form
              </h1>
              {/* Header*/}
              <section className='section mt-10'>
                <h2 className='text-2xl pb-3 section-title'>Header</h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Tc Number'
                      name='header_tc_number'
                      placeholder='Enter Tc Number'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Tc Version Number'
                      name='tc_version_number'
                      placeholder='Enter Tc Version Number'
                      component={Input}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Tc Standard'
                      name='header_tc_standard'
                      placeholder='Enter Tc Standard'
                      component={Input}
                    />
                    <CustomFormItem
                      label='File Name'
                      name='file_name'
                      rules={[
                        { required: true, message: 'File Name is required' }
                      ]}
                      placeholder='Enter File Name'
                      component={Input}
                    />
                  </div>
                </div>
              </section>
              {/* Footer*/}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>Footer</h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Tc Place of Issue'
                      name='tc_place_of_issue'
                      placeholder='Enter Tc Place of Issue'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Tc Date Of Issue'
                      name='tc_date_of_issue'
                      placeholder='Enter Tc Date of Issue'
                      component={DatePicker}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Name Of Authorized Signatory'
                      name='name_of_authorized_signatory'
                      placeholder='Enter Name Of Authorized Signatory'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Tc Status'
                      name='tc_status'
                      placeholder='Enter Name Tc Status'
                      component={Input}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Tc Last Updated'
                      name='tc_last_updated'
                      placeholder='Enter Tc Last Updated'
                      component={DatePicker}
                    />
                  </div>
                </div>
              </section>
              {/* certificate info */}
              <section className='section'>
                <h2 className=' pb-3 section-title'>
                  Certificate Body Information:
                </h2>
                <div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Certificate Name'
                      name='cb_name'
                      placeholder='Enter Certification Name'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Town'
                      name='town'
                      placeholder='Enter Town'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Post Code'
                      name='postcode'
                      placeholder='Enter Postcode'
                      component={Input}
                    />
                    <CustomFormItem
                      label='State or Province'
                      name='state_or_province'
                      placeholder='Enter State or Province'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Country or Area'
                      name='country_or_area'
                      placeholder='Enter Country or Area'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Licensing Code of Certification Body'
                      name='licensing_code_of_certification_body'
                      placeholder='Enter Licensing Code of Certification Body'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.List name='cb_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Certificate Address'
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
                                    name={[name, 'cb_address_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'cb_address',
                                      name,
                                      'cb_address_',
                                      index
                                    )}`}
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
              {/* Seller of Certified Products */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Seller of Certified Products Information:
                </h2>
                <div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Seller Name'
                      name='seller_name'
                      placeholder='Enter Seller Name'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Seller Town'
                      name='seller_town'
                      placeholder='Enter Seller Town'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Seller Postcode'
                      name='seller_postcode'
                      placeholder='Enter Seller Postcode'
                      component={Input}
                    />

                    <CustomFormItem
                      label='Seller State or Province'
                      name='seller_state_or_province'
                      placeholder='Enter Seller State or Province'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Seller Country or Area'
                      name='seller_country_or_area'
                      placeholder='Enter Seller Country or Area'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Seller on Behalf Of'
                      name='seller_on_behalf_of'
                      placeholder='Enter Seller on Behalf Of'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Seller Certified Organization Name'
                      name='seller_certified_organization_name'
                      placeholder='Enter Seller Certified Organization Name'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Sc Number'
                      name='sc_number'
                      placeholder='Sc Number'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Textile Exchange Id'
                      name='textile_exchange_id'
                      placeholder='Enter Textile Exchange Id'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Client Number'
                      name='client_number'
                      placeholder='Client Number'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Seller Licence Number'
                      name='seller_licence_number'
                      placeholder='Enter Seller Licence Number'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Non Certified Trader'
                      name='non_certified_trader'
                      placeholder='Non Certified Trader'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Trader Te Id'
                      name='trader_te_id'
                      placeholder='Enter Trader Te Id'
                      component={Input}
                    />
                    <AntdForm.List name='seller_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Seller Address'
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
                                    name={[name, 'seller_address_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'seller_address',
                                      name,
                                      'seller_address_',
                                      index
                                    )}`}
                                  >
                                    <Input
                                      placeholder={`Enter Seller Address`}
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
                                Add Seller Address
                              </Button>
                            </AntdForm.Item>
                          </AntdForm.Item>
                        </>
                      )}
                    </AntdForm.List>
                  </div>
                </div>
              </section>
              {/* Buyer of Certified Products */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Buyer of certified product(s) Information:
                </h2>
                <div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Name'
                      name='buyer_name'
                      placeholder='Enter Buyer Name'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Buyer Town'
                      name='buyer_town'
                      placeholder='Enter Buyer Town'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Postcode'
                      name='buyer_postcode'
                      placeholder='Enter Buyer Postcode'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Buyer State or Province'
                      name='buyer_state_or_province'
                      placeholder='Enter Buyer State or Province'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Country or Area'
                      name='buyer_country_or_area'
                      placeholder='Enter Buyer Country or Area'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Buyer on Behalf Of'
                      name='buyer_on_behalf_of'
                      placeholder='Enter Buyer on Behalf Of'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Certified Organization Name'
                      name='buyer_certified_organization_name'
                      placeholder='Enter Buyer Certified Organization Name'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Textile Exchange Id'
                      name='buyer_textile_exchange_id'
                      placeholder='Textile Exchange Id'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Cb Acronym'
                      name='buyer_cb_acronym'
                      placeholder='Enter Buyer Cb Acronym'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Client Number'
                      name='buyer_client_number'
                      placeholder='Client Number'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Buyer Licence Number'
                      name='buyer_licence_number'
                      placeholder='Enter Buyer Licence Number'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Trader Te Id'
                      name='buyer_trader_te_id'
                      placeholder='Enter Trader Te Id'
                      component={Input}
                    />
                  </div>
                  <div className='flex md:justify-between flex-wrap'>
                    <AntdForm.List name='buyer_address'>
                      {(fields, { add, remove }) => (
                        <>
                          <AntdForm.Item
                            label='Buyer Address'
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
                                    name={[name, 'buyer_address_']}
                                    style={{ flex: 1 }}
                                    className={`${getFieldClassName(
                                      'buyer_address',
                                      name,
                                      'buyer_address_',
                                      index
                                    )}`}
                                  >
                                    <Input
                                      placeholder={`Enter Buyer Address`}
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
                                Add Buyer Address
                              </Button>
                            </AntdForm.Item>
                          </AntdForm.Item>
                        </>
                      )}
                    </AntdForm.List>
                  </div>
                </div>
              </section>
              {/* 4.5.6. Weights */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'> Weights</h2>
                <div className=''>
                  <div className='flex items-center md:justify-between flex-wrap'>
                    <CustomFormItem
                      label='Gross Shipping Weight'
                      name='gross_shipping_weight'
                      placeholder='Enter Gross Shipping Weight'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Net Shipping Weight'
                      name='net_shipping_weight'
                      placeholder='Enter Net Shipping Weight'
                      component={Input}
                    />
                  </div>
                  <AntdForm.List name='certified_weight'>
                    {(fields, { add, remove }) => (
                      <>
                        <AntdForm.Item
                          label='Certified Weight'
                          required
                          className='w-full md:w-[49%]'
                        >
                          {fields.map(({ key, name, ...restField }, index) => (
                            <Space
                              key={key}
                              style={{ display: 'flex', marginBottom: 8 }}
                              align='baseline'
                            >
                              <AntdForm.Item
                                {...restField}
                                name={[name, 'certified_weight_']}
                                style={{ flex: 1 }}
                                className={`${getFieldClassName(
                                  'certified_weight',
                                  name,
                                  'certified_weight_',
                                  index
                                )}`}
                              >
                                <Input placeholder={`Enter Certified Weight`} />
                              </AntdForm.Item>

                              {fields.length > 1 && (
                                <MinusCircleOutlined
                                  onClick={() => remove(name)}
                                />
                              )}
                            </Space>
                          ))}
                          <AntdForm.Item>
                            <Button
                              type='dashed'
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Certified Weight
                            </Button>
                          </AntdForm.Item>
                        </AntdForm.Item>
                      </>
                    )}
                  </AntdForm.List>
                </div>
              </section>
              {/* Declarations by Certification Body */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  {' '}
                  Declarations by Certification Body
                </h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='An Organic Farmin Standards Which is Closed By'
                      name='an_organic_farmin_standards_which_is_closed_by'
                      placeholder='Enter An Organic Farmin Standards Which is Closed By'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Tc Standard'
                      name='tc_standard'
                      placeholder='Enter Tc Standard'
                      component={Input}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='Certification of the organic material used for the products listed complies with USDA NOP rules:'
                      name='certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules'
                      placeholder='Enter Organic Material Certification'
                      component={Input}
                    />
                    <CustomFormItem
                      label='Tc Organic Farm Standard'
                      name='tc_organic_farm_standard'
                      placeholder='Enter Tc Organic Farm Standard'
                      component={Input}
                    />
                  </div>
                  <div className='flex flex-wrap md:justify-between items-end'></div>
                </div>
              </section>
              {/* 8. Certified Input References  */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Certified Input References{' '}
                </h2>
                <div className=''>
                  <div className='flex md:justify-between flex-wrap'>
                    <div className='w-full'>
                      <>
                        <AntdForm.Item name='InputTCs' label='Input TCs'>
                          <TagWithError
                            tags={tags}
                            setTags={setTags}
                            name='InputTCs'
                          />
                        </AntdForm.Item>

                        <AntdForm.Item name='FarmSCs' label='Farm SCs'>
                          <TagWithError
                            tags={tags1}
                            setTags={setTags1}
                            name='FarmSCs'
                          />
                        </AntdForm.Item>

                        <AntdForm.Item name='FarmTCs' label='Farm TCs'>
                          <TagWithError
                            tags={tags2}
                            setTags={setTags2}
                            name='FarmTCs'
                          />
                        </AntdForm.Item>
                      </>
                    </div>
                    <CustomFormItem
                      label='Trader(s) Transaction Certificates numbers of First Raw material:'
                      name='trader_tcs_for_organic_material'
                      placeholder='Enter Trader(s) Transaction Certificates numbers of First Raw material:'
                      component={Input}
                      classList='md:w-full'
                    />
                  </div>
                </div>
              </section>
              {/* 9. Shipments */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'> Shipments </h2>
                <div className='Shipments'>
                  <AntdForm.List name='ShipmentDetails'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <Space
                            key={key}
                            style={{ display: 'flex', marginBottom: 8 }}
                            align='baseline'
                          >
                            <div className='md:pb-5'>
                              <div className='flex md:justify-between flex-wrap'>
                                <AntdForm.Item
                                  {...restField}
                                  label='Shipment No.'
                                  name={[name, 'shipment_no']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'shipment_no',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Shipment No.' />
                                </AntdForm.Item>
                                <AntdForm.Item
                                  {...restField}
                                  label='Shipment Date:'
                                  name={[name, 'shipment_date']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'shipment_date',
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
                                  label='Shipment Doc No.'
                                  name={[name, 'shipment_doc_no']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'shipment_doc_no',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Shipment Doc No.' />
                                </AntdForm.Item>
                                <AntdForm.Item
                                  {...restField}
                                  label='Gross Shipping Weight:'
                                  name={[name, 'gross_shipping_weight']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'gross_shipping_weight',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Gross Shipping Weight' />
                                </AntdForm.Item>
                              </div>
                              <div className='flex md:justify-between flex-wrap'>
                                <AntdForm.Item
                                  {...restField}
                                  label='Invoice References:'
                                  name={[name, 'invoice_references']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'invoice_references',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Invoice References' />
                                </AntdForm.Item>
                                <AntdForm.Item
                                  {...restField}
                                  label='Consignee Name:'
                                  name={[name, 'consignee_name']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_name',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Consignee Name' />
                                </AntdForm.Item>
                              </div>
                              <div className='flex md:justify-between flex-wrap'>
                                <AntdForm.Item
                                  {...restField}
                                  label='Consignee Town:'
                                  name={[name, 'consignee_town']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_town',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Consignee Town' />
                                </AntdForm.Item>
                                <AntdForm.Item
                                  {...restField}
                                  label='Consignee Postcode:'
                                  name={[name, 'consignee_postcode']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_postcode',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Consignee Postcode' />
                                </AntdForm.Item>
                              </div>
                              <div className='flex md:justify-between flex-wrap'>
                                <AntdForm.Item
                                  {...restField}
                                  label='Consignee State or Province:'
                                  name={[name, 'consignee_state_or_province']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_state_or_province',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Consignee State or Province' />
                                </AntdForm.Item>
                                <AntdForm.Item
                                  {...restField}
                                  label='Consignee Country or Area'
                                  name={[name, 'consignee_country_or_area']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_country_or_area',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Consignee Country or Area' />
                                </AntdForm.Item>
                              </div>
                              <div className='flex md:justify-between flex-wrap'>
                                <AntdForm.Item
                                  {...restField}
                                  label='Te Id'
                                  name={[name, 'consignee_te_id']}
                                  className={`w-full md:w-[49%] ${getFieldClassName(
                                    'ShipmentDetails',
                                    name,
                                    'consignee_te_id',
                                    index
                                  )}`}
                                >
                                  <Input placeholder='Enter Te Id' />
                                </AntdForm.Item>
                                <div className='w-full md:w-[49%]'>
                                  {/* Nested List for Consignee Address */}
                                  <AntdForm.List
                                    name={[name, 'consignee_address']}
                                    initialValue={[{ consignee_address_: '' }]}
                                  >
                                    {(
                                      subFields,
                                      { add: addSub, remove: removeSub }
                                    ) => (
                                      <>
                                        {subFields.map(
                                          (
                                            {
                                              key: subKey,
                                              name: subName,
                                              ...restSubField
                                            },
                                            ind
                                          ) => (
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
                                                  'consignee_address_'
                                                ]}
                                                label='Consignee Address:'
                                                className={`w-full md:w-[49%] ${getNestedFieldClassName(
                                                  index,
                                                  ind,
                                                  'ShipmentDetails',
                                                  'consignee_address',
                                                  'consignee_address_'
                                                )}`}
                                              >
                                                <Input placeholder='Enter Consignee Address' />
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
                                            Add Consignee Address
                                          </Button>
                                        </AntdForm.Item>
                                      </>
                                    )}
                                  </AntdForm.List>
                                </div>
                              </div>
                            </div>
                            {fields.length > 1 && (
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            )}
                          </Space>
                        ))}

                        <AntdForm.Item>
                          <Button
                            type='dashed'
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Shipment Details
                          </Button>
                        </AntdForm.Item>
                      </>
                    )}
                  </AntdForm.List>
                </div>
              </section>
              {/* 10. Certified Products */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Certified Products
                </h2>
                <AntdForm.List name='ProductDetails'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} className='pb-5 relative'>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Product No.:'
                              name={[name, 'product_no']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'product_no',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Product No.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Order No.:'
                              name={[name, 'order_no']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'order_no',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Order No.' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Article No.:'
                              name={[name, 'article_no']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'article_no',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Article No.' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Number of Units:'
                              name={[name, 'number_of_units']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'number_of_units',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Number of Units' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Net Shipping Weight'
                              name={[name, 'products_net_shipping_weight']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'products_net_shipping_weight',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Net Shipping Weight' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Supplementary Weight'
                              name={[name, 'supplementary_weight']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'supplementary_weight',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Supplementary Weight' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Production Date:'
                              name={[name, 'production_date']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'production_date',
                                index
                              )}`}
                            >
                              <DatePicker
                                className='datePickerIpnut'
                                format='DD/MM/YYYY'
                              />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Product Category'
                              name={[name, 'product_category']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'product_category',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Product Category' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Product Detail:'
                              name={[name, 'product_detail']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'product_detail',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Product Detail' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Material Composition'
                              name={[name, 'material_composition']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
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
                              label='Standard Label Grade:'
                              name={[name, 'standard_label_grade']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'standard_label_grade',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Standard Label Grade' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Additional Info'
                              name={[name, 'additional_info']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'additional_info',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Additional Info' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Last Processor'
                              name={[name, 'last_processor']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'last_processor',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Last Processor' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Te Id'
                              name={[name, 'products_te_id']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'products_te_id',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Te Id' />
                            </AntdForm.Item>
                          </div>
                          <div className='flex md:justify-between flex-wrap'>
                            <AntdForm.Item
                              {...restField}
                              label='Certified Weight:'
                              name={[name, 'products_certified_weight']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'products_certified_weight',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Certified Weight' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Country'
                              name={[name, 'products_Country']}
                              className={`w-full md:w-[49%] ${getFieldClassName(
                                'ProductDetails',
                                name,
                                'products_Country',
                                index
                              )}`}
                            >
                              <Input placeholder='Enter Country' />
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

              {/* 11.  Certified Components*/}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Certified Components
                </h2>
                <div className='certified_components'>
                  <AntdForm.List name='certified_components'>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, index) => (
                          <div
                            key={key}
                            className='pb-5 certified_component_part relative'
                          >
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Product Component No.'
                                name={[name, 'product_component_no']}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_no', index)}`}
                              >
                                <Input placeholder='Enter Product Component No.' />
                              </AntdForm.Item>
                              <AntdForm.Item
                                {...restField}
                                label='Component Detail:'
                                name={[name, 'component_detail']}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'component_detail', index)}`}
                              >
                                <Input placeholder='Enter Component Detail' />
                              </AntdForm.Item>
                            </div>
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Net Shipping Weight'
                                name={[
                                  name,
                                  'product_component_net_shipping_weight'
                                ]}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_net_shipping_weight', index)}`}
                              >
                                <Input placeholder='Enter Net Shipping Weight' />
                              </AntdForm.Item>
                              <AntdForm.Item
                                {...restField}
                                label='Material Composition'
                                name={[
                                  name,
                                  'product_component_material_composition'
                                ]}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_material_composition', index)}`}
                              >
                                <Input placeholder='Enter Material Composition' />
                              </AntdForm.Item>
                            </div>
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Supplementary Weight'
                                name={[
                                  name,
                                  'product_component_supplementary_weight'
                                ]}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_supplementary_weight', index)}`}
                              >
                                <Input placeholder='Enter Supplementary Weight' />
                              </AntdForm.Item>
                              <AntdForm.Item
                                {...restField}
                                label='Certified Weight'
                                name={[
                                  name,
                                  'product_component_certified_weight'
                                ]}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_certified_weight', index)}`}
                              >
                                <Input placeholder='Enter Certified Weight' />
                              </AntdForm.Item>
                            </div>
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Standard Name'
                                name={[name, 'product_component_standard_name']}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_standard_name', index)}`}
                              >
                                <Input placeholder='Enter Standard Name' />
                              </AntdForm.Item>
                              <AntdForm.Item
                                {...restField}
                                label='Standard Label Grade'
                                name={[name, 'product_component_label_grade']}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_label_grade', index)}`}
                              >
                                <Input placeholder='Enter Standard Label Grade' />
                              </AntdForm.Item>
                            </div>
                            <div className='flex md:justify-between flex-wrap'>
                              <AntdForm.Item
                                {...restField}
                                label='Additional Info'
                                name={[
                                  name,
                                  'product_component_additional_info'
                                ]}
                                className={`w-full md:w-[49%] ${getFieldClassName('certified_components', name, 'product_component_additional_info', index)}`}
                              >
                                <Input placeholder='Enter Additional Info' />
                              </AntdForm.Item>
                            </div>

                            {fields.length > 1 && (
                              <MinusCircleOutlined
                                className='dynamic-delete-button'
                                onClick={() => remove(name)}
                              />
                            )}
                          </div>
                        ))}
                        <AntdForm.Item>
                          <Button
                            type='dashed'
                            onClick={() =>
                              // add({
                              //   product_component_no: '',
                              //   component_detail: '',
                              //   product_component_net_shipping_weight: '',
                              //   product_component_material_composition: '',
                              //   product_component_supplementary_weight: '',
                              //   product_component_certified_weight: '',
                              //   product_component_standard_name: '',
                              //   product_component_label_grade: '',
                              //   product_component_additional_info: ''
                              // })
                              add()
                            }
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Component
                          </Button>
                        </AntdForm.Item>
                      </>
                    )}
                  </AntdForm.List>
                </div>
              </section>

              {/* 12. Certified Raw Materials And Declared Geographic Origin */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  Certified Raw Materials And Declared Geographic Origin{' '}
                </h2>
                <AntdForm.List name='certified_raw_material_list'>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <div
                          key={key}
                          className={`pb-4 certified_component_part relative raw_material_part `}
                        >
                          {/* ${index === 0 ? "pt-4" : ""} */}
                          <div className='flex flex-wrap md:justify-between items-end'>
                            <AntdForm.Item
                              {...restField}
                              label='Certified Raw Material'
                              name={[name, 'certified_raw_material']}
                              className={`w-full md:w-[49%] ${getFieldClassName('certified_raw_material_list', name, 'certified_raw_material', index)}`}
                            >
                              <Input placeholder='Enter Certified Raw Material' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Certified Weight'
                              name={[name, 'certified_certified_weight']}
                              className={`w-full md:w-[49%] ${getFieldClassName('certified_raw_material_list', name, 'certified_certified_weight', index)}`}
                            >
                              <Input placeholder='Enter Certified Weight' />
                            </AntdForm.Item>
                          </div>

                          <div className='flex flex-wrap md:justify-between items-end'>
                            <AntdForm.Item
                              {...restField}
                              label='State or Province'
                              name={[name, 'certified_state_or_provice']}
                              className={`w-full md:w-[49%] ${getFieldClassName('certified_raw_material_list', name, 'certified_state_or_provice', index)}`}
                            >
                              <Input placeholder='Enter State or Province' />
                            </AntdForm.Item>
                            <AntdForm.Item
                              {...restField}
                              label='Country or Area'
                              name={[name, 'certified_country_or_area']}
                              className={`w-full md:w-[49%] ${getFieldClassName('certified_raw_material_list', name, 'certified_country_or_area', index)}`}
                            >
                              <Input placeholder='Enter Country or Area' />
                            </AntdForm.Item>
                          </div>

                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              className='dynamic-delete-button'
                              onClick={() => remove(name)}
                            />
                          )}
                        </div>
                      ))}
                      <AntdForm.Item>
                        <Button
                          type='dashed'
                          onClick={() =>
                            // add({
                            //   certified_raw_material: '',
                            //   certified_certified_weight: '',
                            //   certified_state_or_provice: '',
                            //   certified_country_or_area: ''
                            // })
                            add()
                          }
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Raw Materials
                        </Button>
                      </AntdForm.Item>
                    </>
                  )}
                </AntdForm.List>
              </section>

              {/* 12. declarations_by_seller_of_certified_products */}
              <section className='section'>
                <h2 className='text-2xl pb-3 section-title'>
                  The Certified Products Covered In This Certificate Have Been
                  Outsourced To A Subcontractor{' '}
                </h2>
                <div className=''>
                  <div className='flex flex-wrap md:justify-between items-end'>
                    <CustomFormItem
                      label='The Certified Products Covered In This Certificate Have Been Outsourced To A Subcontractor'
                      name='the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor'
                      placeholder='Enter The Certified Products Covered In This Certificate Have Been Outsourced To A Subcontractor'
                      component={Input}
                    />
                  </div>
                </div>
              </section>
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

export default ImportPdfTCtype1
