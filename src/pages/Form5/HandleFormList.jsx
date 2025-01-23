import React, { useEffect, useState } from "react";
import CustomTable from "../../component/CustomTable";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pdfListingApi } from "../../store/thunk/userThunk";
import { Button, Space, Table, Tag } from "antd";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { listFormHandlinkTrading } from "../../api/Form1Api";
import { Slidebar } from "../../layout/Slidebar";
import Spinner from "../../layout/Spinner";
import { toast } from "react-toastify";

function HandleFormList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //   const { pdfListData } = useSelector((state) => state.userReducer);
  const [pdfListData, setPdfListData] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await listFormHandlinkTrading(); // Await the API call

       if (response?.status_code === 201 || response?.status_code === 200) {
        toast.success(response?.message)
        setPdfListData(response?.data)
        setLoading(false)
      }else{
        setLoading(false)
        toast.error(response?.message)
      }
      
        console.log("listFormHandlinkTrading response", response);
        setPdfListData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    setLoading(false);
    // Call the async function
  }, [dispatch]);

  const handleView = (symbol) => {
    navigate(`/handlingTradingScTypeView/${symbol}/`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    { title: "File Name", dataIndex: "file_name", key: "file_name" },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (text ? moment(text).format("DD-MM-YYYY") : "-"),
    },
    {
      title: "Update at",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => (text ? moment(text).format("DD-MM-YYYY") : "-"),
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space style={{ gap: "20px" }}>
          <FontAwesomeIcon
            style={{ fontSize: "20px" }}
            icon={faEye}
            onClick={() => {
              handleView(record.id);
            }} // Delete functionality
          />
        </Space>
      ),
    },
  ];
  const ipoData = pdfListData
    ? pdfListData.map((item, index) => ({
        key: index,
        ...item,
      }))
    : [];

  return (
    <>
      {loading && <Spinner message="Loading..." isActive={loading} />}
      <Slidebar />
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "15%" }}>
            <Slidebar />
          </div>
          <div style={{ width: "85%" }}>
            <CustomTable
              columns={columns}
              data={ipoData}
              scroll={{ x: "1750px", y: 500 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HandleFormList;
