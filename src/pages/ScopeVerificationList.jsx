import React, { useEffect, useRef, useState } from 'react';
import { form3ListApi } from '../api/Form1Api';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { FaEye } from 'react-icons/fa6';
import CustomTable from '../component/CustomTable';
import moment from 'moment';

const ScopeVerificationList = () => {
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
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

const handleViewDetails = (id) => {
  navigate(`/scopeVerificationView/${id}/`);
};

  return (
    
    <div className="container formList-cont border rounded-xl mx-auto  my-10 ">
        <h3 className='text-3xl p-5 font-bold'>Scope Certificate</h3>
      <div className="card card_list">
        {data.length > 0 ? (
               <CustomTable
               columns={columns}
               data={data}
            //    serverPagination={{
            //      current: pagination.page,
            //      pageSize: pagination.perpage,
            //      total: filteredData?.count, // Replace with the actual total count
            //      onChange: handlePageChange,
            //    }}
            //    loading={{
            //      indicator: <Loader />,
            //      spinning: symbolLoading,
            //    }}
            //    scroll={{ x: "1750px", y: 500 }}
             />
        ) : <p>No data available.</p>}
      </div>
    </div>
    
  );
};

export default ScopeVerificationList;
