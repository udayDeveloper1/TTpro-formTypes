import React, { useEffect, useRef, useState } from 'react';
import { form3ListApi } from '../api/Form1Api';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

const Form3List = () => {
  const refs = useRef({})

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await form3ListApi();
        // const response = resData;
        
        setData(response);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate();

  const handlePdfDownload = async (id) => {
    const ref = refs.current[id]; // Get the ref object
    if (!ref || !ref.current) {
      console.error("Element not found for ID:", id);
      return;
    }
  
    const element = ref.current;
    // const element = refs.current[id];
    // if (!element) {
    //   console.error('Element not found for ID:', id)
    //   return
    // }
    element.querySelector('.button_section').style.display = 'none'
    console.log(element.querySelector('.button_section'));
    
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

// const handleView = (values) => {
//   navigate("/form3view", { state: { formData: values }});
// }
const handleViewDetails = (cardData) => {
  navigate('/form3view', { state: { cardData } });
};
  // Rendering the card view for each item
  const renderCards = () => {
    return data.map((item, index) => 
      {
        const recordId = item.id || index
        console.log(recordId, "----------------------------");
        
          refs.current[recordId] = React.createRef()
        return(
          <div
              key={recordId}
              ref={refs.current[recordId]}
              className='card_item rounded-xl p-5 mb-10'
              // onClick={e => handlePdfDownload(recordId)}
            >
              
      <div key={index} className="card" style={{ border: '1px solid #ccc', padding: '16px', margin: '16px' }}>
        <h1>{index}</h1>
        {/* <button
        className='button_section'
          onClick={() => handleViewDetails(item)}
          style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: '#007BFF', color: '#FFF', border: 'none', cursor: 'pointer' }}
        >
          View Details
        </button> */}
        <div className='w-full flex justify-between button_section'>
                <p className='pb-5'>File Name: {item.file_name}</p>
                <button
                  className='btn flex items-center bg-cyan-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-white hover:text-cyan-400 border border-cyan-400 transition-all button_section'
                  onClick={e => handlePdfDownload(recordId)}
                >
                  Download
                  {/* <FaFilePdf className='ms-2' /> */}
                  {/* Pdf */}
                </button>
              </div>
        {/* <button onClick={handleView(item)}></button> */}
        <h2>{item.file_name}</h2>
        <h3>Scope Certificate Details</h3>
        <ul>
          <li>Certificate Number: {item.extracted_data['scope_certificate'].certificate_number}</li>
          <li>Holder: {item.extracted_data['scope_certificate'].holder}</li>
          <li>Version: {item.extracted_data['scope_certificate'].version}</li>
          <li>Certification Body: {item.extracted_data['scope_certificate'].certification_body}</li>
          <li>Address: {item.extracted_data['scope_certificate'].address}</li>
          <li>Date of Issue: {item.extracted_data['scope_certificate'].date_of_issue}</li>
          <li>CEO Name: {item.extracted_data['scope_certificate'].CEO_name}</li>
        </ul>
        <h3>Products Appendix</h3>
        <ul>
          {item.extracted_data['products_appendix'].map((product, idx) => (
            
            <li key={idx}>
              {product.category} - {product.product_details} ({product.label_grade})
            </li>
          ))}
        </ul>
        <h3>Site Appendix</h3>
        <p>Facility Name: {item.extracted_data['site_appendix'].facility_name}</p>
        <p>Address: {item.extracted_data['site_appendix'].address}</p>
        <p>
          Process Categories:{' '}
          {item.extracted_data['site_appendix'].process_categories?.join(', ')}
        </p>
        <h3>Subcontractors</h3>
        <ul>
          {item.extracted_data['independently_certified_subcontractor_appendix'].map((sub, idx) => (
            
            <li key={idx}>
              <p>Name: {sub.subcontractor_name}</p>
              <p>License Number: {sub.license_number}</p>
              <p>Address: {sub.address}</p>
              <p>Process Categories: {sub?.process_categories}</p>
              <p>Expiry Date: {sub.expiry_date}</p>
              <p>Certification Body: {sub.certification_body}</p>
              <p>License Number: {sub.license_number}</p>
              <p>Number: {sub.number}</p>
            </li>
          ))}
        </ul>
      </div>
      </div>
    )});
  };

  return (
    <div>
      <h1>Form 3 List</h1>
      {data.length > 0 ? renderCards() : <p>No data available.</p>}
    </div>
  );
};

export default Form3List;

