import React, { useEffect, useRef, useState } from 'react';
import { form3ListApi, formcropProductionList } from '../../api/Form1Api';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { FaEye } from 'react-icons/fa6';
import CustomTable from '../../component/CustomTable';
import moment from 'moment';
import { Slidebar } from '../../layout/Slidebar';

const TCTypeCropProductionListV3 = () => {
  const refs = useRef({})
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await formcropProductionList();
        setData(response);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const columns = [
    {
      title: "ID",dataIndex: "id", key: "id" 
 
    },
    { title: "File Name", dataIndex: "file_name", key: "file_name" },
    { title: "Created At", dataIndex: "created_at", 
        key: "created_at" ,
      render: (text) => (text ? moment(text).format("DD-MM-YYYY") : "-"),

    },
    { title: "Update at", 
        dataIndex: "updated_at", 
        key: "updated_at" ,
      render: (text) => (text ? moment(text).format("DD-MM-YYYY") : "-"),

    },
    
   
    {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <div style={{ gap: "20px" }}>
            
            <FaEye
              style={{ fontSize: "20px" }}
            //   icon={faEye}
              onClick={() =>{
                handleViewDetails(record.id)
               } } // Delete functionality
            />
          </div>
        ),
      },
  ];
  
  const navigate = useNavigate();

const handleViewDetails = (id) => {
  navigate(`/tcTypeCropProductinView/${id}/`);
};

  return (
    <>
       <div className='flex justify-center'>  {/* <div style={{ width: "20%" }}> */}
        <div> <Slidebar /></div>   {/* <div style={{ width: "80%" }}> */}
        <div>
    <div className="container formList-cont border rounded-xl mx-auto  my-10  mt-20">
        <h3 className='text-3xl p-5 font-bold'>TC Type Crop Production List</h3>
      <div className="card card_list">
        {/* {data.length > 0 ? ( */}
               <CustomTable
               columns={columns}
               data={data}
             />
        {/* ) : <p>No data available.</p>} */}
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default TCTypeCropProductionListV3;
