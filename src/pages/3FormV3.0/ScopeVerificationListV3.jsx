import React, { useEffect, useState } from 'react'
import CustomTable from '../../component/CustomTable'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { pdfListingApi } from '../../store/thunk/userThunk'
import { Button, Space, Table, Tag } from 'antd'
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Slidebar } from '../../layout/Slidebar'
import axiosInstance from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import { deletePdfTcType1, deleteScopeCertificateScType2, deleteScopeCertificateV3_0 } from '../../api/Form1Api'

function ScopeVerificationListV3() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const { pdfListData: scopList } = useSelector(state => state.userReducer);

  const [scopList, setScopList] = useState([])
  const [isDelete, setIsDelete] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/scope-certificate/sc-version-3-point-0/`);
        console.log('response scopList', response);
        if (response?.status_code === 200 || response?.status_code === 201) {

          // Handle successful response
          setScopList(response?.data)
        } else {
          setScopList([])
          toast.error("Internal server error. Please try again later.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };
    fetchData();
  }, [isDelete]);

  const handleView = symbol => {
    navigate(`/handlingTradingScTypeView_v3_0/${symbol}/`)
    // return <NewsUpdate id={id}/>
  }

  const handleDelete = id => {
    setIsDelete(true)
    Swal.fire({
      title: 'Are you sure you want to delete your account?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#01c0c8',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // setIsDelete(true)
        deleteScopeCertificateV3_0(id).then((response) => {
          if (response?.status_code === 200) {
            setIsDelete(false)
            Swal.fire({
              title: 'Deleted!',
              text: 'Your account has been deleted.',
              icon: 'success',
              confirmButtonColor: '#01c0c8',
            });
          }
        })
      }
    });
    // return <NewsUpdate id={id}/>
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    { title: 'File Name', dataIndex: 'file_name', key: 'file_name' },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: text => (text ? moment(text).format('DD-MM-YYYY') : '-')
    },
    {
      title: 'Update at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: text => (text ? moment(text).format('DD-MM-YYYY') : '-')
    },

    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space style={{ gap: '20px' }}>
          <FontAwesomeIcon
            style={{ fontSize: '20px'  ,  cursor: 'pointer'}}
            icon={faEye}
            onClick={() => {
              handleView(record.id)
            }} // Delete functionality
          />
          <FontAwesomeIcon
            style={{ fontSize: '20px', color: '#dc3545', cursor: 'pointer' }}
            icon={faTrash}
            onClick={() => {
              handleDelete(record.id)
            }} // Delete functionality
          />
        </Space>
      )
    }
  ]

  const ipoData = scopList
    ? scopList.map((item, index) => ({
      key: index,
      ...item
    }))
    : []

  return (
    <>         <div className='flex justify-center'>     {/* <div style={{ width: "20%" }}> */}
        <div>  <Slidebar /></div>
       {/* <div style={{ width: "80%" }}> */}
        <div><div>
        <div className="container formList-cont border rounded-xl mx-auto  my-10  mt-20">
          <h3 className='text-3xl p-5 font-bold'>Transaction Certificate (TC) List</h3>
          <CustomTable
            columns={columns}
            data={ipoData}
          />
        </div>
      </div></div>
    </div></>
  )
}

export default ScopeVerificationListV3
