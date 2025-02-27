import React, { useEffect, useState } from 'react'
import CustomTable from '../../component/CustomTable'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { pdfListingApi } from '../../store/thunk/userThunk'
import { Button, Space, Table, Tag } from 'antd'
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Slidebar } from '../../layout/Slidebar'
import { deletePdfTcType1 } from '../../api/Form1Api'
import Swal from 'sweetalert2'

function TcType1List () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { pdfListData } = useSelector(state => state.userReducer)
  const [u] = useState(false)
  useEffect(() => {
    dispatch(pdfListingApi())
  }, [])

  const handleView = symbol => {
    navigate(`/tcType1View/${symbol}/`)
    // return <NewsUpdate id={id}/>
  }

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure you want to delete your account?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#01c0c8',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        // setIsDelete(true)
        deletePdfTcType1(id).then(response => {
          if (response?.meta?.status_code === 200) {
            // setIsDelete(false)
            Swal.fire({
              title: 'Deleted!',
              text: 'Your account has been deleted.',
              icon: 'success',
              confirmButtonColor: '#3085d6'
            })
          }
        })
      }
    })
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
            style={{ fontSize: '20px' }}
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

  const ipoData = pdfListData
    ? pdfListData.map((item, index) => ({
        key: index,
        ...item
      }))
    : []

  return (
    <>
      {' '}
      <div className='flex justify-center'>
        {' '}
        {/* <div style={{ width: "20%" }}> */}
        <div>
          {' '}
          <Slidebar />
        </div>
        {/* <div style={{ width: "80%" }}> */}
        <div>
          <div>
            <div className='container formList-cont border rounded-xl mx-auto  my-10  mt-20'>
              <h3 className='text-3xl p-5 font-bold'>
                Transaction Certificate (TC) List
              </h3>
              <CustomTable columns={columns} data={ipoData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TcType1List
