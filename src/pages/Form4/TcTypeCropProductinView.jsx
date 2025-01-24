// import React, { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import { FaFilePdf } from "react-icons/fa6";
// import { PdfListing3, PdfListing4 } from "../../store/thunk/userThunk";
// import { useDispatch, useSelector } from "react-redux";
// import { Slidebar } from "../../layout/Slidebar";
// import { toast } from "react-toastify";

// const TcTypeCropProductinView = () => {
//   const refs = useRef();
//   const location = useLocation();
//   const [data, setData] = useState({});
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const params = useParams();
//   const { id } = params;
//   const pdfListingData4 = useSelector((state) => {
//     return state.userReducer?.pdfListingData4;
//   });
//     const [loading, setLoading] = useState(false);
  

//   const getData = async (id) => {
//     try {
//       const response = await dispatch(PdfListing4(id));
//       setData(response?.payload?.data);
//       // if (response?.status_code === 201 || response?.status_code === 200) {
//       //   // toast.success(response?.payload?.message);
//       //   setData(response?.payload?.data);
//       //   // setPdfListData(response?.data)
//       //   navigate("/tCTypeCropProductionList");
//       //   setLoading(false);
//       // } else {
//       //   setLoading(false);
//       //   // toast.error(response?.payload?.message);
//       // }
//       // setData(response.payload);
//       console?.log('response.payload',response.payload)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getData(id);
//   }, []);

//   const handlePdfDownload = async (id) => {
//     const element = refs?.current;

//     if (!element) {
//       console.error("Element not found for ID:", id);
//       return;
//     }

//     // Temporarily hide button section
//     const buttonSection = element.querySelector(".button_section");
//     if (buttonSection) buttonSection.style.display = "none";

//     // Render the element to a canvas
//     const canvas = await html2canvas(element, { scale: 2 });

//     // Initialize jsPDF
//     const pdf = new jsPDF("p", "mm", "a4");
//     const pageWidth = pdf.internal.pageSize.getWidth(); // A4 width: 210mm
//     const pageHeight = pdf.internal.pageSize.getHeight(); // A4 height: 297mm

//     // Calculate canvas dimensions and scaling
//     const imgWidth = canvas.width / 2; // Scale factor matches html2canvas scale
//     const imgHeight = canvas.height / 2;
//     const scaleFactor = pageWidth / imgWidth;
//     const scaledHeight = imgHeight * scaleFactor;
//     const contentHeight = scaledHeight; // Total height of the content
//     let yOffset = 0;

//     // Add content to the PDF, page by page
//     while (yOffset < imgHeight) {
//       const pageCanvas = document.createElement("canvas");
//       pageCanvas.width = canvas.width;
//       pageCanvas.height = Math.min(
//         canvas.height - yOffset,
//         (pageHeight / scaleFactor) * 2
//       ); // Divide height for 2x scale

//       const context = pageCanvas.getContext("2d");
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
//       );

//       const pageData = pageCanvas.toDataURL("image/png");
//       if (yOffset > 0) pdf.addPage();
//       pdf.addImage(pageData, "PNG", 0, 0, pageWidth, pageHeight);

//       yOffset += pageHeight / scaleFactor; // Move to the next portion
//     }

//     // Generate the PDF Blob
//     const pdfBlob = pdf.output("blob");
//     const blobUrl = URL.createObjectURL(pdfBlob);

//     // Navigate to PDF review page
//     navigate("/PdfReview", { state: { pdfUrl: blobUrl } });

//     // Restore button section visibility
//     if (buttonSection) buttonSection.style.display = "block";
//   };
//   const recordId = data?.id;
//   return (
//     <>
//       {" "}
//       <div className="flex">
//         <div style={{ width: "20%" }}>
//           {" "}
//           <Slidebar />
//         </div>{" "}
//         <div style={{ width: "80%" }}>
//           {" "}
//           <div className="container formList-cont border rounded-xl mx-auto  my-10 ">
//             <div className="card card_list">
//               {data ? (
//                 <div
//                   ref={refs}
//                   className="card_item flex flex-col gap-3 rounded-xl p-5"
//                 >
//                   <div className="w-full flex justify-between button_section pb-10">
//                     <button
//                       className="btn flex items-center text-white py-2 px-4 rounded-lg font-semibold   transition-all download_pdf_btn button_section"
//                       onClick={(e) => handlePdfDownload(recordId)}
//                     >
//                       Download
//                       <FaFilePdf className="ms-2" />
//                     </button>
//                   </div>
//                   {console.log(data)}

//                   <div className="w-full section1 flex flex-wrap justify-between">
//                     <h3 className="text-2xl w-full  CertifiedInput p-3">
//                       {data?.file_name}
//                     </h3>
//                     <div className="w-full flex p-2 justify-between">
//                       <div className="w-full flex flex-col md:w-[49%] justify-center">
//                         <div className="flex flex-wrap ">
//                           <div className="w-full flex flex-col">
//                             <div className="flex flex">
//                               <h4 className="text-xl keyName pe-4 w-[30%]">
//                                 {" "}
//                                 File Name{" "}
//                               </h4>
//                               <p className="text-xl keyValue w-[70%]">
//                                 {data?.file_name}
//                               </p>
//                             </div>
//                             <div className="flex">
//                               <h4 className="text-xl keyName pe-4  w-[30%]">
//                                 id:{" "}
//                               </h4>
//                               <p className="text-xl keyValue  w-[70%]">
//                                 {data?.id}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="w-full md:w-[49%] flex justify-center  flex-col">
//                         <div className="flex flex-wrap ">
//                           <div className="w-full">
//                             <div className="flex">
//                               <h4 className="text-xl keyName pe-4 w-[30%]">
//                                 created_at:{" "}
//                               </h4>
//                               <p className="text-xl keyValue w-[70%]">
//                                 {data.created_at}
//                               </p>
//                             </div>
//                             <div className="flex">
//                               <h4 className="text-xl pe-4 w-[30%]">
//                                 updated_at:{" "}
//                               </h4>
//                               <p className="text-xl w-[70%]">
//                                 {data.updated_at}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="w-full section1 flex flex-wrap justify-between">
//                     <h3 className="text-2xl w-full  CertifiedInput p-3">
//                       Certificate Details
//                     </h3>
//                     <div className="w-full flex p-2 justify-between">
//                       <div className="w-full flex flex-col md:w-[49%] justify-center">
//                         <div className="flex flex-wrap ">
//                           <div className="w-full flex flex-col">
//                             <div className="flex">
//                               <h4 className="text-xl keyName pe-4  w-[40%]">
//                                 Certificate Title:{" "}
//                               </h4>
//                               <p className="text-xl keyValue  w-[60%]">
//                                 {
//                                   data?.extracted_data?.[
//                                     "main_certificate_details"
//                                   ]?.title
//                                 }
//                               </p>
//                             </div>
//                             <div className="flex ">
//                               <h4 className="text-xl keyName pe-4 w-[40%]">
//                                 Certificate Number
//                               </h4>
//                               <p className="text-xl keyValue w-[60%]">
//                                 {
//                                   data?.extracted_data?.[
//                                     "main_certificate_details"
//                                   ]?.certificate_no
//                                 }
//                               </p>
//                             </div>

//                             <div className="flex">
//                               <h4 className="text-xl keyName pe-4  w-[40%]">
//                                 Main Address:
//                               </h4>
//                               <p className="text-xl keyValue  w-[60%]">
//                                 {
//                                   data?.extracted_data?.[
//                                     "main_certificate_details"
//                                   ]?.main_address
//                                 }
//                               </p>
//                             </div>
//                             <div className="flex">
//                               <h4 className="text-xl keyName pe-4  w-[40%]">
//                                 For the Following Process
//                               </h4>
//                               <p className="text-xl keyValue  w-[60%]">
//                                 {
//                                   data?.extracted_data?.[
//                                     "main_certificate_details"
//                                   ]?.for_the_following_process
//                                 }
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="w-full md:w-[49%] flex justify-center  flex-col">
//                         <div className="flex flex-wrap ">
//                           <div className="w-full">
//                             <div className="flex">
//                               <h4 className="text-xl keyName pe-4 w-[40%]">
//                                 Valid from:{" "}
//                               </h4>
//                               <p className="text-xl keyValue w-[60%]">
//                                 {
//                                   data?.extracted_data?.[
//                                     "main_certificate_details"
//                                   ]?.valid_from
//                                 }
//                               </p>
//                             </div>
//                             <div className="flex">
//                               <h4 className="text-xl pe-4 w-[40%]">
//                                 Valid till:{" "}
//                               </h4>
//                               <p className="text-xl w-[60%]">
//                                 {
//                                   data?.extracted_data?.[
//                                     "main_certificate_details"
//                                   ]?.valid_till
//                                 }
//                               </p>
//                             </div>

//                             <div className="flex">
//                               <h4 className="text-xl keyName pe-4  w-[40%]">
//                                 Extra Note:{" "}
//                               </h4>
//                               <p className="text-xl keyValue  w-[60%]">
//                                 {
//                                   data?.extracted_data?.[
//                                     "main_certificate_details"
//                                   ]?.extra_note
//                                 }
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex w-full px-2 flex-wrap py-5">
//                       <h4 className="text-xl keyName pe-4">
//                         This Certificate is valid for those Products and area
//                         specified in the Annexe Certification Characteristics:{" "}
//                       </h4>
//                       <p className="text-xl keyValue ">
//                         {
//                           data?.extracted_data?.["main_certificate_details"]
//                             ?.this_certificate_is_valid_for_those_products_and_area_specified_in_the_annexe_certification_characteristics
//                         }
//                       </p>
//                     </div>
//                     <div className="w-full px-2 ">
//                       <h4 className="text-xl keyName pe-4">
//                         This is to certify that the product and area inspected
//                         by Certification body tq cert services private limited
//                         are in accordance with requirements of:{" "}
//                       </h4>
//                       <ul className="list-disc list-inside p-2">
//                         {data?.extracted_data?.[
//                           "main_certificate_details"
//                         ]?.this_is_to_certify_that_the_product_and_area_inspected_by_certification_body_tq_cert_services_private_limited_are_in_accordance_with_requirements_of?.map(
//                           (ele, ind) => {
//                             return (
//                               <li className="text-xl" key={ind}>
//                                 {ele}
//                               </li>
//                             );
//                           }
//                         )}
//                       </ul>
//                       <p className="text-xl keyValue ">{}</p>
//                     </div>
//                   </div>

//                   <div className="w-full section1 flex flex-wrap justify-between">
//                     <h3 className="text-2xl w-full  CertifiedInput p-3">
//                       Certification Characteristics
//                     </h3>
//                     <div className="w-full flex px-2 justify-between p-2">
//                       <div className="w-full flex flex-col md:w-[49%] justify-center">
//                         <div className="flex flex-wrap ">
//                           <div className="w-full flex flex-col">
//                             <div className="flex ">
//                               <h4 className="text-xl keyName pe-4 w-[40%]">
//                                 Certificate Number
//                               </h4>
//                               <p className="text-xl keyValue w-[60%]">
//                                 {
//                                   data?.extracted_data?.["certificate_no"]
//                                     ?.certificate_no
//                                 }
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="w-full md:w-[49%] flex justify-center  flex-col">
//                         <div className="flex flex-wrap ">
//                           <div className="w-full">
//                             <div className="flex">
//                               <h4 className="text-xl keyName pe-4  w-[40%]">
//                                 Managed By:
//                               </h4>
//                               <p className="text-xl keyValue  w-[60%]">
//                                 {
//                                   data?.extracted_data?.[
//                                     "certification_characteristics"
//                                   ]?.managed_by
//                                 }
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex w-full px-2 flex-wrap py-5">
//                       <h4 className="text-xl keyName pe-4 pb-5">ICS Info: </h4>
//                       <table className="w-full border border-collapse">
//                         <thead>
//                           <tr>
//                             <th className="text-left border p-2">Ics Name</th>
//                             <th className="text-left border p-2">Address</th>
//                             <th className="text-left border p-2">
//                               No of Farmers
//                             </th>
//                             <th className="text-left border p-2">Area</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {data?.extracted_data?.[
//                             "certification_characteristics"
//                           ]?.ICS_info?.map((ele, ind) => {
//                             return (
//                               <tr key={ind}>
//                                 <td className="border p-2">{ele?.ics_name}</td>
//                                 <td className="border p-2">{ele?.address}</td>
//                                 <td className="border p-2">
//                                   {ele?.no_of_farmers}
//                                 </td>
//                                 <td className="border p-2">{ele?.area}</td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>

//                   <div className="w-full section1 pb-4">
//                     <h3 className="text-2xl w-full  CertifiedInput p-3">
//                       Approved Products List
//                     </h3>
//                     <div className="flex flex-wrap p-2">
//                       <div className="w-full flex flex-col">
//                         <div className="pb-5">
//                           <h4 className="keyName pe-4 text-xl py-3">
//                             {" "}
//                             Producer Products:{" "}
//                           </h4>
//                           <table className="w-full border border-collapse ">
//                             <thead>
//                               <tr>
//                                 <th className="text-left border p-2">Season</th>
//                                 <th className="text-left border p-2">
//                                   Product's no
//                                 </th>
//                                 <th className="text-left border p-2">
//                                   Product(s)
//                                 </th>
//                                 <th className="text-left border p-2">
//                                   Organic Status
//                                 </th>
//                                 <th className="text-left border p-2">
//                                   Variety
//                                 </th>
//                                 <th className="text-left border p-2">
//                                   Crop Type
//                                 </th>
//                                 <th className="text-left border p-2">
//                                   Area(in Ha.)
//                                 </th>
//                                 <th className="text-left border p-2">
//                                   Est Quantity in MT
//                                 </th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {data?.extracted_data?.[
//                                 "approved_products_list"
//                               ]?.["producer_product(s)"]?.map((ele, ind) => {
//                                 return (
//                                   <tr key={ind}>
//                                     <td className="border p-2">
//                                       {ele?.season}
//                                     </td>
//                                     <td className="border p-2">
//                                       {ele?.product_s_no}
//                                     </td>
//                                     <td className="border p-2">
//                                       {ele?.["product(s)"]}
//                                     </td>
//                                     <td className="border p-2">
//                                       {ele?.organic_status}
//                                     </td>
//                                     <td className="border p-2">
//                                       {ele?.variety}
//                                     </td>
//                                     <td className="border p-2">
//                                       {ele?.crop_type}
//                                     </td>
//                                     <td className="border p-2">
//                                       {ele?.["area(in Ha.)"]}
//                                     </td>
//                                     <td className="border p-2">
//                                       {ele?.est_quantity_in_MT}
//                                     </td>
//                                   </tr>
//                                 );
//                               })}
//                             </tbody>
//                           </table>
//                         </div>

//                         <div className="pb-5">
//                           <h4 className="keyName pe-4 text-xl py-3">
//                             {" "}
//                             Approved Farmer List:{" "}
//                           </h4>
//                           <table className="w-full border border-collapse ">
//                             <thead>
//                               <tr>
//                                 <th className="text-left border p-2">State</th>
//                                 <th className="text-left border p-2">
//                                   District
//                                 </th>
//                                 <th className="text-left border p-2">Taluk</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {data?.extracted_data?.[
//                                 "approved_products_list"
//                               ]?.["approved_farmer_list"]?.map((ele, ind) => {
//                                 return (
//                                   <tr key={ind}>
//                                     <td className="border p-2">{ele?.state}</td>
//                                     <td className="border p-2">
//                                       {ele?.district}
//                                     </td>
//                                     <td className="border p-2">{ele?.taluk}</td>
//                                   </tr>
//                                 );
//                               })}
//                             </tbody>
//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <p>No data available.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TcTypeCropProductinView;



import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FaFilePdf } from "react-icons/fa6";
import { PdfListing3, PdfListing4 } from "../../store/thunk/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { Slidebar } from "../../layout/Slidebar";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const TcTypeCropProductinView = () => {
  const refs = useRef();
  const location = useLocation();
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const pdfListingData4 = useSelector((state) => {
    return state.userReducer?.pdfListingData4;
  });
    const [loading, setLoading] = useState(false);
  

  const getData = async (id) => {
    try {
      const response = await dispatch(PdfListing4(id));
      setData(response?.payload?.data);
      // if (response?.status_code === 201 || response?.status_code === 200) {
      //   // toast.success(response?.payload?.message);
      //   setData(response?.payload?.data);
      //   // setPdfListData(response?.data)
      //   navigate("/tCTypeCropProductionList");
      //   setLoading(false);
      // } else {
      //   setLoading(false);
      //   // toast.error(response?.payload?.message);
      // }
      // setData(response.payload);
      console?.log('response.payload',response.payload)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData(id);
  }, []);

  const handlePdfDownload = async (id) => {
    const element = refs?.current;

    if (!element) {
      console.error("Element not found for ID:", id);
      return;
    }

    // Temporarily hide button section
    const buttonSection = element.querySelector(".button_section");
    if (buttonSection) buttonSection.style.display = "none";

    // Render the element to a canvas
    const canvas = await html2canvas(element, { scale: 2 });

    // Initialize jsPDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth(); // A4 width: 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // A4 height: 297mm

    // Calculate canvas dimensions and scaling
    const imgWidth = canvas.width / 2; // Scale factor matches html2canvas scale
    const imgHeight = canvas.height / 2;
    const scaleFactor = pageWidth / imgWidth;
    const scaledHeight = imgHeight * scaleFactor;
    const contentHeight = scaledHeight; // Total height of the content
    let yOffset = 0;

    // Add content to the PDF, page by page
    while (yOffset < imgHeight) {
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = Math.min(
        canvas.height - yOffset,
        (pageHeight / scaleFactor) * 2
      ); // Divide height for 2x scale

      const context = pageCanvas.getContext("2d");
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
      );

      const pageData = pageCanvas.toDataURL("image/png");
      if (yOffset > 0) pdf.addPage();
      pdf.addImage(pageData, "PNG", 0, 0, pageWidth, pageHeight);

      yOffset += pageHeight / scaleFactor; // Move to the next portion
    }

    // Generate the PDF Blob
    const pdfBlob = pdf.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Navigate to PDF review page
    navigate("/PdfReview", { state: { pdfUrl: blobUrl } });

    // Restore button section visibility
    if (buttonSection) buttonSection.style.display = "block";
  };
  const recordId = data?.id;
  return (
    <>
      {" "}
      <div className="flex">
        <div style={{ width: "20%" }}>
          {" "}
          <Slidebar />
        </div>{" "}
        <div style={{ width: "80%" }}>
          {" "}
          <div className="container formList-cont border rounded-xl mx-auto  my-10 ">
            <div className="card card_list">
              {data ? (
                <div
                  ref={refs}
                  className="card_item flex flex-col gap-3 rounded-xl p-5"
                >
                  <div className="w-full flex justify-between button_section pb-10">
                    <button
                      className="btn flex items-center text-white py-2 px-4 rounded-lg font-semibold   transition-all download_pdf_btn button_section"
                      onClick={(e) => handlePdfDownload(recordId)}
                    >
                      Download
                      <FaFilePdf className="ms-2" />
                    </button>
                  </div>
                  {console.log(data)}

                  <div className="w-full section1 flex flex-wrap justify-between">
                    <h3 className="text-2xl w-full  CertifiedInput p-3">
                      {data?.file_name}
                    </h3>
                    <div className="w-full flex p-2 justify-between">
                      <div className="w-full flex flex-col md:w-[49%] justify-center">
                        <div className="flex flex-wrap ">
                          <div className="w-full flex flex-col">
                            <div className="flex flex">
                              <h4 className="text-xl keyName pe-4 w-[30%]">
                                {" "}
                                File Name{" "}
                              </h4>
                              <p className="text-xl keyValue w-[70%]">
                                {data?.file_name}
                              </p>
                            </div>
                            <div className="flex">
                              <h4 className="text-xl keyName pe-4  w-[30%]">
                                id:{" "}
                              </h4>
                              <p className="text-xl keyValue  w-[70%]">
                                {data?.id}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-[49%] flex justify-center  flex-col">
                        <div className="flex flex-wrap ">
                          <div className="w-full">
                            <div className="flex">
                              <h4 className="text-xl keyName pe-4 w-[30%]">
                                created_at:{" "}
                              </h4>
                              <p className="text-xl keyValue w-[70%]">
                              {dayjs(data.created_at).format("DD/MM/YYYY")}
                              </p>
                            </div>
                            <div className="flex">
                              <h4 className="text-xl pe-4 w-[30%]">
                                updated_at:{" "}
                              </h4>
                              <p className="text-xl w-[70%]">
                              {dayjs(data.updated_at).format("DD/MM/YYYY")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full section1 flex flex-wrap justify-between">
                    <h3 className="text-2xl w-full  CertifiedInput p-3">
                      Certificate Details
                    </h3>
                    <div className="w-full flex p-2 justify-between">
                      <div className="w-full flex flex-col md:w-[49%] justify-center">
                        <div className="flex flex-wrap ">
                          <div className="w-full flex flex-col">
                            <div className="flex">
                              <h4 className="text-xl keyName pe-4  w-[40%]">
                                Certificate Title:{" "}
                              </h4>
                              <p className="text-xl keyValue  w-[60%]">
                                {
                                  data?.extracted_data?.[
                                    "main_certificate_details"
                                  ]?.title
                                }
                              </p>
                            </div>
                            <div className="flex ">
                              <h4 className="text-xl keyName pe-4 w-[40%]">
                                Certificate Number
                              </h4>
                              <p className="text-xl keyValue w-[60%]">
                                {
                                  data?.extracted_data?.[
                                    "main_certificate_details"
                                  ]?.certificate_no
                                }
                              </p>
                            </div>

                            <div className="flex">
                              <h4 className="text-xl keyName pe-4  w-[40%]">
                                Main Address:
                              </h4>
                              <p className="text-xl keyValue  w-[60%]">
                                {
                                  data?.extracted_data?.[
                                    "main_certificate_details"
                                  ]?.main_address
                                }
                              </p>
                            </div>
                            <div className="flex">
                              <h4 className="text-xl keyName pe-4  w-[40%]">
                                For the Following Process
                              </h4>
                              <p className="text-xl keyValue  w-[60%]">
                                {
                                  data?.extracted_data?.[
                                    "main_certificate_details"
                                  ]?.for_the_following_process
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-[49%] flex justify-center  flex-col">
                        <div className="flex flex-wrap ">
                          <div className="w-full">
                            <div className="flex">
                              <h4 className="text-xl keyName pe-4 w-[40%]">
                                Valid from:{" "}
                              </h4>
                              <p className="text-xl keyValue w-[60%]">
                                {
                                  data?.extracted_data?.[
                                    "main_certificate_details"
                                  ]?.valid_from
                                }
                              </p>
                            </div>
                            <div className="flex">
                              <h4 className="text-xl pe-4 w-[40%]">
                                Valid till:{" "}
                              </h4>
                              <p className="text-xl w-[60%]">
                                {
                                  data?.extracted_data?.[
                                    "main_certificate_details"
                                  ]?.valid_till
                                }
                              </p>
                            </div>

                            <div className="flex">
                              <h4 className="text-xl keyName pe-4  w-[40%]">
                                Extra Note:{" "}
                              </h4>
                              <p className="text-xl keyValue  w-[60%]">
                                {
                                  data?.extracted_data?.[
                                    "main_certificate_details"
                                  ]?.extra_note
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full px-2 flex-wrap py-5">
                      <h4 className="text-xl keyName pe-4">
                        This Certificate is valid for those Products and area
                        specified in the Annexe Certification Characteristics:{" "}
                      </h4>
                      <p className="text-xl keyValue ">
                        {
                          data?.extracted_data?.["main_certificate_details"]
                            ?.this_certificate_is_valid_for_those_products_and_area_specified_in_the_annexe_certification_characteristics
                        }
                      </p>
                    </div>
                    <div className="w-full px-2 ">
                      <h4 className="text-xl keyName pe-4">
                        This is to certify that the product and area inspected
                        by Certification body tq cert services private limited
                        are in accordance with requirements of:{" "}
                      </h4>
                      <ul className="list-disc list-inside p-2">
                        {data?.extracted_data?.[
                          "main_certificate_details"
                        ]?.this_is_to_certify_that_the_product_and_area_inspected_by_certification_body_tq_cert_services_private_limited_are_in_accordance_with_requirements_of?.map(
                          (ele, ind) => {
                            return (
                              <li className="text-xl" key={ind}>
                                {ele}
                              </li>
                            );
                          }
                        )}
                      </ul>
                      <p className="text-xl keyValue ">{}</p>
                    </div>
                  </div>

                  <div className="w-full section1 flex flex-wrap justify-between">
                    <h3 className="text-2xl w-full  CertifiedInput p-3">
                      Certification Characteristics
                    </h3>
                    <div className="w-full flex px-2 justify-between p-2">
                      <div className="w-full flex flex-col md:w-[49%] justify-center">
                        <div className="flex flex-wrap ">
                          <div className="w-full flex flex-col">
                            <div className="flex ">
                              <h4 className="text-xl keyName pe-4 w-[40%]">
                                Certificate Number
                              </h4>
                              <p className="text-xl keyValue w-[60%]">
                                {
                                  data?.extracted_data?.["certificate_no"]
                                    ?.certificate_no
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-[49%] flex justify-center  flex-col">
                        <div className="flex flex-wrap ">
                          <div className="w-full">
                            <div className="flex">
                              <h4 className="text-xl keyName pe-4  w-[40%]">
                                Managed By:
                              </h4>
                              <p className="text-xl keyValue  w-[60%]">
                                {
                                  data?.extracted_data?.[
                                    "certification_characteristics"
                                  ]?.managed_by
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full px-2 flex-wrap py-5">
                      <h4 className="text-xl keyName pe-4 pb-5">ICS Info: </h4>
                      <table className="w-full border border-collapse">
                        <thead>
                          <tr>
                            <th className="text-left border p-2">Ics Name</th>
                            <th className="text-left border p-2">Address</th>
                            <th className="text-left border p-2">
                              No of Farmers
                            </th>
                            <th className="text-left border p-2">Area</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.extracted_data?.[
                            "certification_characteristics"
                          ]?.ICS_info?.map((ele, ind) => {
                            return (
                              <tr key={ind}>
                                <td className="border p-2">{ele?.ics_name}</td>
                                <td className="border p-2">{ele?.address}</td>
                                <td className="border p-2">
                                  {ele?.no_of_farmers}
                                </td>
                                <td className="border p-2">{ele?.area}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="w-full section1 pb-3">
                    <h3 className="text-2xl w-full  CertifiedInput p-3">
                      Approved Products List
                    </h3>
                    <div className="flex flex-wrap p-2">
                      <div className="w-full flex flex-col">
                        <div className="pb-5">
                          <h4 className="keyName pe-4 text-xl py-3">
                            {" "}
                            Producer Products:{" "}
                          </h4>
                          <table className="w-full border border-collapse ">
                            <thead>
                              <tr>
                                <th className="text-left border p-2">Season</th>
                                <th className="text-left border p-2">
                                  Product's no
                                </th>
                                <th className="text-left border p-2">
                                  Product(s)
                                </th>
                                <th className="text-left border p-2">
                                  Organic Status
                                </th>
                                <th className="text-left border p-2">
                                  Variety
                                </th>
                                <th className="text-left border p-2">
                                  Crop Type
                                </th>
                                <th className="text-left border p-2">
                                  Area(in Ha.)
                                </th>
                                <th className="text-left border p-2">
                                  Est Quantity in MT
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.extracted_data?.[
                                "approved_products_list"
                              ]?.["producer_product(s)"]?.map((ele, ind) => {
                                return (
                                  <tr key={ind}>
                                    <td className="border p-2">
                                      {ele?.season}
                                    </td>
                                    <td className="border p-2">
                                      {ele?.product_s_no}
                                    </td>
                                    <td className="border p-2">
                                      {ele?.["product(s)"]}
                                    </td>
                                    <td className="border p-2">
                                      {ele?.organic_status}
                                    </td>
                                    <td className="border p-2">
                                      {ele?.variety}
                                    </td>
                                    <td className="border p-2">
                                      {ele?.crop_type}
                                    </td>
                                    <td className="border p-2">
                                      {ele?.["area(in Ha.)"]}
                                    </td>
                                    <td className="border p-2">
                                      {ele?.est_quantity_in_MT}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        <div className="pb-5">
                          <h4 className="keyName pe-4 text-xl py-3">
                            {" "}
                            Approved Farmer List:{" "}
                          </h4>
                          <table className="w-full border border-collapse ">
                            <thead>
                              <tr>
                                <th className="text-left border p-2">State</th>
                                <th className="text-left border p-2">
                                  District
                                </th>
                                <th className="text-left border p-2">Taluka</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.extracted_data?.[
                                "approved_products_list"
                              ]?.["approved_farmer_list"]?.map((ele, ind) => {
                                return (
                                  <tr key={ind}>
                                    <td className="border p-2">{ele?.state}</td>
                                    <td className="border p-2">
                                      {ele?.district}
                                    </td>
                                    <td className="border p-2">{ele?.taluk}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TcTypeCropProductinView;
