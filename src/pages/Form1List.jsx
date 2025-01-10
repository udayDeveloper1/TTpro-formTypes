import React, { useEffect, useState, useRef } from "react";
import { form1List } from "../api/Form1Api";
import { FaFilePdf } from "react-icons/fa6";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/utils";
import "../assets/css/tc_type2.css";
import { cloneDeep } from "lodash";

const Form1List = () => {
  const [data, setData] = useState([]);
  const refs = useRef({});
  const navigate = useNavigate();

  const getList = async () => {
    try {
      // Fetch data
      const response = await form1List();
      
      // Process each element
      let datas = response.map((ele, ind) => {
        // Process the fields (convert, replace, and split)
        let input_tcs = String(ele.extracted_data.certified_input_references.input_tcs)
          .replace(/[:;]/g, ',')
          .split(',');
  
        let farm_tcs = String(ele.extracted_data.certified_input_references.farm_tcs)
          .replace(/[:;]/g, ',')
          .split(',');
  
        let farm_scs = String(ele.extracted_data.certified_input_references.farm_scs)
          .replace(/[:;]/g, ',')
          .split(',');
  
        // Create a deep copy of the element and update the certified_input_references
        let obj = cloneDeep(ele);
        obj.extracted_data.certified_input_references = {
          input_tcs,
          farm_tcs,
          farm_scs,
          trader_tcs_for_organic_material: String(ele.extracted_data.certified_input_references.trader_tcs_for_organic_material)
        };
  
  
        return obj;
      });
  
      // Set the processed data to state
      setData(datas);
  
      // Log the final transformed response
      console.log(datas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  


  useEffect(() => {
    getList();
  }, []);

  // const handlePdfDownload = async (id) => {
  //   const element = refs.current[id]?.current;
  //   if (!element) {
  //     console.error("Element not found for ID:", id);
  //     return;
  //   }
  //   element.querySelector(".button_section").style.display = "none";
  //   const canvas = await html2canvas(element, { scale: 2 });
  //   const imgData = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF();
  //   // const pageWidth = pdf.internal.pageSize.getWidth();
  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const pageHeight = pdf.internal.pageSize.getHeight();
  //   const imgWidth = canvas.width / 2;
  //   const imgHeight = canvas.height / 2;
  //   const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  //   const width = imgWidth * ratio;
  //   const height = imgHeight * ratio;
  //   pdf.addImage(imgData, "PNG", 0, 0, width, height);
  //   const pdfBlob = pdf.output("blob");
  //   const blobUrl = URL.createObjectURL(pdfBlob);
  //   navigate("/PdfReview", { state: { pdfUrl: blobUrl } });
  // };


  const handlePdfDownload = async (id) => {
    const element = refs.current[id]?.current;
  
    if (!element) {
      console.error("Element not found for ID:", id);
      return;
    }
  
    // Temporarily hide button section
    const buttonSection = element.querySelector(".button_section");
    if (buttonSection) buttonSection.style.display = "none";
  
    // Render the element to a canvas
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
  
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
      pageCanvas.height = Math.min(canvas.height - yOffset, (pageHeight / scaleFactor) * 2); // Divide height for 2x scale
  
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
  
  
  
  return (
    <div className="container formList-cont border rounded-xl mx-auto  my-10 ">
      <div className="card card_list">
        {data?.map((ele, ind) => {
          const recordId = ele.id || ind;
          refs.current[recordId] = refs.current[recordId] || React.createRef();

          return (
            <div
              key={ind}
              ref={refs.current[recordId]}
              className="card_item flex flex-col gap-3 rounded-xl p-5"
            >
              <div className="w-full flex justify-between button_section pb-10">
                <button
                  className="btn flex items-center bg-cyan-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-white hover:text-cyan-400 border border-cyan-400 transition-all"
                  onClick={(e) => handlePdfDownload(recordId)}
                >
                  Download
                  <FaFilePdf className="ms-2" />
                  {/* Pdf */}
                </button>
              </div>

              <hr className="py-5" />

              <div className="w-full section1 flex flex-wrap justify-between ">
                <h3 className="text-2xl w-full  CertifiedInput p-3">
                  {ele.file_name}
                </h3>
                <div className="w-full flex p-2 justify-between">
                  <div className="w-full flex flex-col md:w-[49%] justify-center ">
                    <div className="flex flex-wrap ">
                      <div className="w-full flex flex-col">
                        <div className="flex flex">
                          <h4 className="text-xl keyName pe-4 w-[30%]">
                            {" "}
                            File Name{" "}
                          </h4>
                          <p className="text-xl keyValue w-[70%]">
                            {ele.file_name}
                          </p>
                        </div>
                        <div className="flex">
                          <h4 className="text-xl keyName pe-4  w-[30%]">
                            id:{" "}
                          </h4>
                          <p className="text-xl keyValue  w-[70%]">{ele.id}</p>
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
                            {ele.created_at}
                          </p>
                        </div>
                        <div className="flex">
                          <h4 className="text-xl pe-4 w-[30%]">updated_at: </h4>
                          <p className="text-xl w-[70%]">{ele.updated_at}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-between flex-wrap">
                <div className="w-full md:w-[49%]">
                  <div className="flex section1 flex-wrap pb-5">
                    <h3 className="text-2xl w-full  CertifiedInput p-3">
                      Buyer of Certified Products:
                    </h3>
                    <div className="p-2">
                      <div className="flex">
                        <h4 className="text-xl pe-4">License No: </h4>
                        <p className="text-xl">
                          {
                            ele.extracted_data.buyer_of_certified_products
                              .license_no
                          }
                        </p>
                      </div>
                      <div className="flex">
                        <h4 className="text-xl pe-4">Main Value: </h4>
                        <p className="text-xl">
                          {
                            ele.extracted_data.buyer_of_certified_products
                              .license_no
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[49%]">
                  <div className="flex section1  flex-wrap pb-5">
                    <h3 className="text-2xl w-full  CertifiedInput p-3">
                      Certification Body:
                    </h3>
                    <div className="p-2">
                      <div className="flex  ">
                        <h4 className="text-xl pe-4">Certification Body: </h4>
                        <p className="text-xl">
                          {
                            ele.extracted_data.certification_body
                              .licensing_code_of_certification_body
                          }
                        </p>
                      </div>
                      <div className="flex">
                        <h4 className="text-xl pe-4">Main Value: </h4>
                        <p className="text-xl">
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
              <div className="w-full flex flex-wrap">
                <div className="w-full ">
                  <div className="flex flex-wrap pb-5">
                    <h3 className="text-2xl w-full  CertifiedInput p-3">
                      Certified Input References:
                    </h3>
                    <div className="flex section1 flex-row justify-between p-3  w-full">
                      <div className="flex flex-col w-[25%]">
                        <h4 className="text-xl pe-4">Farm Scs</h4>
                        <div className="text-xl">
                        
                             {
                            ele?.extracted_data?.certified_input_references
                              .farm_scs?.map((ele, ind) => {
                                return <p>{ele}</p>
                              })
                          }
                        </div>
                      </div>
                      <div className="flex flex-col w-[25%]">
                        <h4 className="text-xl pe-4">Farm Tcs </h4>
                        <p className="text-xl">
                          {
                            ele.extracted_data.certified_input_references
                              .farm_tcs
                          }
                        </p>
                      </div>
                      <div className="flex flex-col w-[25%]">
                        <h4 className="text-xl pe-4">Input Tcs </h4>
                        <p className="text-xl">
                          {
                            ele.extracted_data.certified_input_references
                              .input_tcs
                          }
                        </p>
                      </div>
                      <div className="flex flex-col w-[25%]">
                        <h4 className="text-xl pe-4">
                          Trader Tcs for Organic Material
                        </h4>
                        <p className="text-xl">
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
              {console.log(data)}

              <div className="w-full certifiedProduct  flex flex-wrap">
                <h3 className="text-2xl certifiedProductHeading p-3 w-full">
                  Certified Products:
                </h3>
                <div className="flex w-full flex-wrap">
                  {ele.extracted_data.certified_products.map((elem, indd) => {
                    return (
                      <div className="pb-5 w-full" key={indd}>
                        <h3 className="text-xl pe-2 p-2 pb-0 font-semibold">
                          Product {indd + 1}:
                        </h3>
                        <div className="p-3 overflow-x-auto">
                          <table className="w-full border border-gray-300 text-left">
                            <thead className="bg-gray-100 border-b border-gray-300">
                              <th className=" py-2" colSpan={2}>
                                {" "}
                                Product {indd + 1}:
                              </th>
                            </thead>
                            <tbody>
                              {Object.keys(elem)?.map((element, index) => {
                                return (
                                  <>
                                  

                                    <tr className="bg-gray-100 border-b border-gray-300  ">
                                      <td className="p-1 font-medium py-3">
                                        {element}
                                      </td>
                                      <td className="p-1">{elem[element]}</td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {ele?.extracted_data
                ?.certified_raw_materials_and_declared_geographic_origin && (
                <>
                  {" "}
                  <hr />
                  <h3 className="text-2xl w-full  CertifiedInput p-3">
                    Certified Raw Materials and Declared Geographic Origin:
                  </h3>
                  <div className="overflow-x-auto table_2 pt-3">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase ">
                        <tr>
                          <th scope="col" className="px-6  text-md md:text-lg py-3">
                            {" "}
                            certified_weight{" "}
                          </th>
                          <th scope="col" className="px-6  text-md md:text-lg py-3">
                            {" "}
                            country{" "}
                          </th>
                          <th scope="col" className="px-6  text-md md:text-lg py-3">
                            {" "}
                            material details{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ele?.extracted_data?.certified_raw_materials_and_declared_geographic_origin?.map(
                          (elem, index) => {
                            return (
                              <tr className="bg-white border-b" key={index}>
                                <td className="px-6 py-4 text-md md:text-lg">
                                  {elem.certified_weight}
                                </td>
                                <td className="px-6 py-4 text-md md:text-lg">
                                  {elem.country}
                                </td>
                                <td className="px-6 py-4 text-md md:text-lg">
                                  {elem.material_details}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <div className="w-full flex flex-wrap">
                <div className="w-full ">
                  <div className="flex flex-wrap pb-5">
                    <h3 className="text-2xl w-full  CertifiedInput p-3">
                      Declarations by Certification Body:
                    </h3>
                    <div className="flex flex-col section1 flex-row justify-between p-3  w-full">
                      <div className="flex flex-col">
                        <h4 className="text-xl pe-4">
                          Certification Of The Organic Material Used For The
                          Products Listed Complies With Apeda Np Op Rules:{" "}
                         
                          {capitalizeFirstLetter(
                          
                            ele.extracted_data
                              .declarations_by_certification_body
                              .certification_of_the_organic_material_used_for_the_products_listed_complies_with_apeda_np_op_rules
                          )}
                        </h4>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-xl pe-4">
                          Certification Of The Organic Material Used For The
                          Products Listed Complies With Usda Nop Rules:
                          {capitalizeFirstLetter(
                   ele.extracted_data
                   .declarations_by_certification_body
                   .certification_of_the_organic_material_used_for_the_products_listed_complies_with_usda_nop_rules
                    )}

                         
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-wrap">
                <div className="w-full ">
                  <div className="flex flex-wrap pb-5">
                    <h3 className="text-2xl w-full  CertifiedInput p-3">
                      Declarations By Seller of Certified Products:
                    </h3>
                    <div className="flex flex-col section1 flex-row justify-between p-3  w-full">
                      <div className="flex flex-col">
                        <h4 className="text-xl pe-4">
                          Certification Of The Organic Material Used For The
                          Products Listed Complies With Usda Nop Rules:
                          {capitalizeFirstLetter(
                      ele?.extracted_data
                        ?.declarations_by_seller_of_certified_products
                        ?.the_certified_products_covered_in_this_certificate_have_been_outsourced_to_a_subcontractor
                    )}

                          
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {ele?.extracted_data?.seller_of_certified_products && (
                <>
                  {" "}
                  <hr />
                  <div className="overflow-x-auto table_2 pt-3">
                    <h3 className="text-2xl w-full  CertifiedInput p-3">
                      seller of certified products:
                    </h3>
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase ">
                        <tr>
                          <th scope="col" className="px-6  text-md md:text-lg py-3">
                            {" "}
                            License No{" "}
                          </th>
                          <th scope="col" className="px-6  text-md md:text-lg py-3">
                            {" "}
                            Main Value{" "}
                          </th>
                          <th scope="col" className="px-6  text-md md:text-lg py-3">
                            {" "}
                            Sc Number{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 text-md md:text-lg">
                            {
                              ele?.extracted_data?.seller_of_certified_products
                                ?.license_no
                            }
                          </td>
                          <td className="px-6 py-4 text-md md:text-lg">
                            {
                              ele?.extracted_data?.seller_of_certified_products
                                ?.main_value
                            }
                          </td>
                          <td className="px-6 py-4 text-md md:text-lg">
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

              <div className="w-full flex flex-wrap">
                <h3 className="text-2xl w-full">contents:</h3>
                <ul>
                  {ele?.extracted_data?.declarations_by_certification_body?.contents?.map(
                    (elem, index) => {
                      return <li key={index}>{elem?.DeclarationList_}</li>;
                    }
                  )}
                </ul>
              </div>

              <div className="w-full flex items-center">
                <h3 className="text-xl ">Extra Note:</h3>
                <p className="text-xl">
                  {
                    ele?.extracted_data?.declarations_by_certification_body
                      ?.extra_note
                  }
                </p>
              </div>

              <div className="w-full flex items-center">
                <h3 className="text-xl ">Main Value:</h3>
                <p className="text-xl">
                  {
                    ele?.extracted_data?.declarations_by_certification_body
                      ?.main_value
                  }
                </p>
              </div>
          
              {ele?.extracted_data
                ?.certified_raw_materials_and_declared_geographic_origin && (
                <>
                  {" "}
                  <hr />
                  <h3 className="text-2xl w-full  CertifiedInput p-3">
                    Shipments:
                  </h3>
                  <div className="overflow-x-auto table_2 pt-3">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase ">
                        <tr>
                          <th scope="col" className="px-6  text-md md:text-lg">
                            {" "}
                            Consignee Name and Address
                          </th>
                          <th scope="col" className="px-6  text-md md:text-lg">
                            {" "}
                            Gross Shipping Weight
                          </th>
                          <th scope="col" className="px-6  text-md md:text-lg">
                            {" "}
                            Invoice References
                          </th>
                          <th scope="col" className="px-6  text-md md:text-lg">
                            {" "}
                            Shipment Date
                          </th>
                          <th scope="col" className="px-6  text-md md:text-lg">
                            {" "}
                            Shipment Doc No
                          </th>
                          <th scope="col" className="px-6  text-md md:text-lg">
                            {" "}
                            Shipment No
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ele?.extracted_data?.shipments?.map((elem, index) => {
                          return (
                            <tr className="bg-white border-b" key={index}>
                              <td className="px-6 py-4 text-md md:text-lg">
                                {elem.consignee_name_and_address}
                              </td>
                              <td className="px-6 py-4 text-md md:text-lg">
                                {elem.gross_shipping_weight}
                              </td>
                              <td className="px-6 py-4 text-md md:text-lg">
                                {elem.invoice_references}
                              </td>
                              <td className="px-6 py-4 text-md md:text-lg">
                                {elem.shipment_date}
                              </td>
                              <td className="px-6 py-4 text-md md:text-lg">
                                {elem.shipment_doc_no}
                              </td>
                              <td className="px-6 py-4 text-md md:text-lg">
                                {elem.shipment_no}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Form1List;
