import React, { useEffect, useState, useRef } from "react";
import { form1List, viewFormHandlinkTrading } from "../../api/Form1Api";
import { FaFilePdf } from "react-icons/fa6";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/utils";
import "../../assets/css/tc_type2.css";
import { cloneDeep } from "lodash";
import moment from "moment";
import Spinner from "../../layout/Spinner";
import { Slidebar } from "../../layout/Slidebar";
import { toast } from "react-toastify";

const HandleFormView = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const { id } = params;
  const getList = async () => {
    try {
      setLoading(true);
      // Fetch data
      const response = await viewFormHandlinkTrading(id);

      if (response?.status_code === 201 || response?.status_code === 200) {
        // toast.success(response?.message)
        setData(response?.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response?.message);
      }

      // setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // setLoading(true);
    getList();
    // setLoading(false);
  }, []);

  const refs = useRef({});

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

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });

    // Ensure the font is loaded properly
    doc.setFont("Inter-Regular", "normal");

    // Check if the reference exists before proceeding
    const targetElement = refs.current;

    if (!targetElement) {
      console.error("No element found for the provided ID.");
      return;
    }

    doc.html(targetElement, {
      callback: (doc) => {
        // Save the generated PDF
        doc.save("document.pdf");
      },
      x: 10, // Optional: Adjust x-coordinate
      y: 10, // Optional: Adjust y-coordinate
      html2canvas: {
        scale: 1, // Adjust scale to improve PDF quality
      },
    });
  };

  const recordId = data?.id || "default";
  refs.current[recordId] = refs.current[recordId] || React.createRef();

  console?.log("Details Data", data);
  return (
    <>
      {/* {loading && <Spinner message="Loading..." isActive={loading} />} */}
      <div style={{ display: "flex" }}>
        <div style={{ width: "20%" }}>
          <Slidebar />
        </div>
        <div style={{ width: "80%" }}>
          <div className="container formList-cont border rounded-xl mx-auto  my-10 ">
            <div className="card card_list" ref={refs.current[recordId]}>
              {/* <div className="card card_list" ref={refs}> */}
              {/* {data?.map((data, ind) => { */}
              {/* {  const recordId = data.id || ind;
          refs.current[recordId] = refs.current[recordId] || React.createRef()} */}
              <div
                // key={ind}
                className="card_item flex flex-col gap-3 rounded-xl p-5"
              >
                <div className="w-full flex justify-between button_section pb-10">
                  <button
                    className="btn flex items-center text-white py-2 px-4 rounded-lg font-semibold   transition-all download_pdf_btn"
                    onClick={(e) => handlePdfDownload(recordId)}
                    // onClick={handleGeneratePdf}
                  >
                    Download
                    <FaFilePdf className="ms-2" />
                    {/* Pdf */}
                  </button>
                </div>

                <div className="w-full section1 flex flex-wrap justify-between ">
                  <h3 className="text-2xl w-full  CertifiedInput p-3">
                    {data?.file_name}
                  </h3>
                  <div className="w-full flex p-2 justify-between">
                    <div className="w-full flex flex-col md:w-[49%] justify-center ">
                      <div className="flex flex-wrap ">
                        <div className="w-full flex flex-col">
                          <div className="flex flex">
                            <h4 className="text-xl keyName pe-4 w-[30%] font-bold">
                              File Name{" "}
                            </h4>
                            <p className="text-xl keyValue w-[70%]">
                              {data?.file_name}
                            </p>
                          </div>
                          <div className="flex">
                            <h4 className="text-xl keyName pe-4  w-[30%] font-bold">
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
                            <h4 className="text-xl keyName pe-4 w-[30%] font-bold">
                              created At:
                            </h4>
                            <p className="text-xl keyValue w-[70%]">
                              {moment(data?.created_at)?.format(
                                "DD-MM-YYYY hh:mm A"
                              )}
                            </p>
                          </div>
                          <div className="flex">
                            <h4 className="text-xl pe-4 w-[30%] font-bold">
                              updated_at:{" "}
                            </h4>
                            <p className="text-xl w-[70%]">
                              {moment(data?.updated_at)?.format(
                                "DD-MM-YYYY hh:mm A"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-between flex-wrap">
                  <div className="w-full ">
                    <div className="flex section1 flex-wrap pb-5">
                      <h3 className="text-2xl w-full  CertifiedInput ">
                        Certificate Details:
                      </h3>
                      <div className="p-2">
                        <div className="flex">
                          <h4 className="font-bold text-xl pe-4">
                            Certificate No:{" "}
                          </h4>
                          <p className="text-xl">
                            {
                              data?.extracted_data?.main_certificate_details
                                ?.certificate_no
                            }
                          </p>
                        </div>
                        <div className="flex">
                          <h4 className="font-bold text-xl pe-4">
                            Certificate Name:{" "}
                          </h4>
                          <p className="text-xl">
                            {
                              data?.extracted_data?.main_certificate_details
                                ?.title
                            }
                          </p>
                        </div>

                        <div className="flex">
                          <h4 className="font-bold text-xl pe-4">
                            Following process:{" "}
                          </h4>
                          <p className="text-xl">
                            {
                              data?.extracted_data?.main_certificate_details
                                ?.for_the_following_process
                            }
                          </p>
                        </div>

                        <div className="flex">
                          <h4 className="font-bold text-xl pe-4">Note: </h4>
                          <p className="text-xl">
                            {
                              data?.extracted_data?.main_certificate_details
                                ?.extra_note
                            }
                          </p>
                        </div>

                        <div className="flex">
                          <h4 className="font-bold text-xl pe-4">
                            Form End Date:{" "}
                          </h4>
                          <p className="text-xl">
                            {
                              data?.extracted_data?.main_certificate_details
                                ?.valid_till
                            }
                          </p>
                        </div>

                        <div className="flex">
                          <h4 className="font-bold text-xl pe-4">
                            Form Start Date:{" "}
                          </h4>
                          <p className="text-xl">
                            {
                              data?.extracted_data?.main_certificate_details
                                ?.valid_from
                            }
                          </p>
                        </div>

                        <div className="flex">
                          <h4 className="font-bold text-xl pe-4 text-nowrap">
                            Certification Address:{" "}
                          </h4>
                          <p className="text-xl">
                            {
                              data?.extracted_data?.main_certificate_details
                                ?.main_address
                            }
                          </p>
                        </div>

                        {/* <div className="flex">
                      <h4 className="font-bold text-xl pe-4">
                        Form End Date:{" "}
                      </h4>
                      <p className="text-xl">
                        {
                          data?.extracted_data?.main_certificate_details
                            ?.valid_till
                        }
                      </p>
                    </div> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="w-full md:w-[49%]">
              <div className="flex section1  flex-wrap pb-5">
                <h3 className="text-2xl w-full  CertifiedInput p-3">
                  Certification Body:
                </h3>
                <div className="p-2">
                  <div className="flex  ">
                    <h4 className="font-bold text-xl pe-4">
                      Certification Body:{" "}
                    </h4>
                    <p className="text-xl">
                      {
                        data?.extracted_data?.certification_body
                          ?.licensing_code_of_certification_body
                      }
                    </p>
                  </div>
                  <div className="flex">
                    <h4 className="font-bold text-xl pe-4">Main Value: </h4>
                    <p className="text-xl">
                      {data?.extracted_data?.certification_body?.main_value}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
                </div>

                {/* <div className="w-full flex flex-wrap">
            <div className="w-full ">
              <div className="flex flex-wrap pb-5">
                <h3 className="text-2xl w-full  CertifiedInput p-3">
                  Certified Input References:
                </h3>
                <div className="flex section1 flex-row justify-between p-3  w-full">
                  <div className="flex flex-col w-[25%]">
                    <h4 className="font-bold text-xl pe-4">Farm Scs</h4>
                    <div className="text-xl">
                      {data?.extracted_data?.certified_input_references?.farm_scs?.map(
                        (ele, ind) => {
                          return <p>{ele}</p>;
                        }
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col w-[25%]">
                    <h4 className="font-bold text-xl pe-4">Farm Tcs </h4>
                    <p className="text-xl">
                      {
                        data?.extracted_data?.certified_input_references
                          ?.farm_tcs
                      }
                    </p>
                  </div>
                  <div className="flex flex-col w-[25%]">
                    <h4 className="font-bold text-xl pe-4">Input Tcs </h4>
                    <p className="text-xl">
                      {
                        data?.extracted_data?.certified_input_references
                          ?.input_tcs
                      }
                    </p>
                  </div>
                  <div className="flex flex-col w-[25%]">
                    <h4 className="font-bold text-xl pe-4">
                      Trader Tcs for Organic Material
                    </h4>
                    <p className="text-xl">
                      {
                        data?.extracted_data?.certified_input_references
                          ?.trader_tcs_for_organic_material
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {console?.log(data)} */}
                <div className="w-full flex flex-wrap">
                  <div className="w-full ">
                    <div className="flex flex-wrap pb-5">
                      <h3 className="text-2xl w-full  CertifiedInput p-3">
                      This is to certify that the product and area inspected by Certification body tq cert services private limited are in accordance with requirements of:
                      </h3>
                      <div className="flex section1 flex-row justify-between p-3  w-full">
                        <div className="flex">
                          {/* <h4 className="font-bold text-xl pe-4">
                      Certification Of The Organic Material Used For The
                      Products Listed Complies With Usda Nop Rules:
                    </h4> */}
                          <p className="text-xl">
                            <ul className="list-disc pl-6">
                              {data?.extracted_data?.main_certificate_details?.this_is_to_certify_that_the_product_and_area_inspected_by_certification_body_tq_cert_services_private_limited_are_in_accordance_with_requirements_of?.map(
                                (item, index2) => (
                                  <li key={index2}>{item}</li>
                                )
                              )}
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full certifiedProduct  flex flex-wrap">
                  <div className="w-full flex justify-between flex-wrap mb-4">
                    <div className="w-full ">
                      <div className="flex section1 flex-wrap pb-2">
                        <h3 className="text-2xl w-full  CertifiedInput p-2">
                          Certificate Characteristics Details :
                        </h3>
                        <div className="p-2">
                          <div className="flex mt-1">
                            <h4 className="font-bold text-xl pe-4">
                              Certification ID:{" "}
                            </h4>
                            <p className="text-xl">
                              {capitalizeFirstLetter(
                                data?.extracted_data
                                  ?.certification_characteristics
                                  ?.certificate_no
                              )}
                            </p>
                          </div>
                          <div className="flex mt-2">
                            <h4 className="font-bold text-xl pe-4 text-nowrap">
                              Main Value:{" "}
                            </h4>
                            <p className="text-xl">
                              {
                                data?.extracted_data
                                  ?.certification_characteristics?.main_value
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl certifiedProductHeading p-3 w-full">
                    Trader Product:
                  </h3>
                  <div className="flex w-full flex-wrap">
                    {data?.extracted_data?.certification_characteristics?.[
                      "trader_product(s)"
                    ]?.map((elem, indd) => {
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
                                {Object?.keys(elem)?.map((element, index) => {
                                  return (
                                    <>
                                      <tr className="bg-gray-100 border-b border-gray-300  ">
                                        <td className="p-1 font-medium py-3">
                                          {/* {element} */}
                                          {/* organic_status */}
                                          {/* labeling_category */}
                                          {element === "product(s)"
                                            ? "Product Name"
                                            : element === "variety"
                                            ? "Variety"
                                            : element === "organic_status"
                                            ? "Organic Status"
                                            : element === "labeling_category"
                                            ? "Labeling Category"
                                            : element === "product_s_no"
                                            ? "Product Number"
                                            : ""}
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

                {data?.extracted_data
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
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg py-3"
                            >
                              {" "}
                              certified_weight{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg py-3"
                            >
                              {" "}
                              country{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg py-3"
                            >
                              {" "}
                              material details{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.extracted_data?.certified_raw_materials_and_declared_geographic_origin?.map(
                            (elem, index) => {
                              return (
                                <tr className="bg-white border-b" key={index}>
                                  <td className="px-6 py-4 text-md md:text-lg">
                                    {elem?.certified_weight}
                                  </td>
                                  <td className="px-6 py-4 text-md md:text-lg">
                                    {elem?.country}
                                  </td>
                                  <td className="px-6 py-4 text-md md:text-lg">
                                    {elem?.material_details}
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

                {data?.extracted_data?.seller_of_certified_products && (
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
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg py-3"
                            >
                              {" "}
                              License No{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg py-3"
                            >
                              {" "}
                              Main Value{" "}
                            </th>
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg py-3"
                            >
                              {" "}
                              Sc Number{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b">
                            <td className="px-6 py-4 text-md md:text-lg">
                              {
                                data?.extracted_data
                                  ?.seller_of_certified_products?.license_no
                              }
                            </td>
                            <td className="px-6 py-4 text-md md:text-lg">
                              {
                                data?.extracted_data
                                  ?.seller_of_certified_products?.main_value
                              }
                            </td>
                            <td className="px-6 py-4 text-md md:text-lg">
                              {
                                data?.extracted_data
                                  ?.seller_of_certified_products?.sc_number
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {data?.extracted_data
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
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg"
                            >
                              {" "}
                              Consignee Name and Address
                            </th>
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg"
                            >
                              {" "}
                              Gross Shipping Weight
                            </th>
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg"
                            >
                              {" "}
                              Invoice References
                            </th>
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg"
                            >
                              {" "}
                              Shipment Date
                            </th>
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg"
                            >
                              {" "}
                              Shipment Doc No
                            </th>
                            <th
                              scope="col"
                              className="px-6  text-md md:text-lg"
                            >
                              {" "}
                              Shipment No
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.extracted_data?.shipments?.map(
                            (elem, index) => {
                              return (
                                <tr className="bg-white border-b" key={index}>
                                  <td className="px-6 py-4 text-md md:text-lg">
                                    {elem?.consignee_name_and_address}
                                  </td>
                                  <td className="px-6 py-4 text-md md:text-lg">
                                    {elem?.gross_shipping_weight}
                                  </td>
                                  <td className="px-6 py-4 text-md md:text-lg">
                                    {elem?.invoice_references}
                                  </td>
                                  <td className="px-6 py-4 text-md md:text-lg">
                                    {elem?.shipment_date}
                                  </td>
                                  <td className="px-6 py-4 text-md md:text-lg">
                                    {elem?.shipment_doc_no}
                                  </td>
                                  <td className="px-6 py-4 text-md md:text-lg">
                                    {elem?.shipment_no}
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
              </div>
              {/* ); */}
              {/* })} */}
            </div>
          </div>
          {/* Add your content here */}
        </div>
      </div>
    </>
  );
};

export default HandleFormView;
