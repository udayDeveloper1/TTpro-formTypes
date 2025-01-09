import React from "react";
import { useLocation } from "react-router-dom";

const PdfReview = () => {
  const location = useLocation();
  const pdfUrl = location.state?.pdfUrl;

  if (!pdfUrl) {
    return <p>No PDF to display</p>;
  }

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = pdfUrl;
//     link.download = "generated.pdf";
//     link.click();
//   };

  return (
    <div className="" >
      {/* <h1>PDF Preview</h1> */}
      <iframe
        src={pdfUrl}
        title="PDF Preview"
        width="100%"
        height="945px"
        style={{ border: "none" }}
      ></iframe>
      {/* <button onClick={handleDownload}>Download PDF</button> */}
    </div>
  );
};

export default PdfReview;
