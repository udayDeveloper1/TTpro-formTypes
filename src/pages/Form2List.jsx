
import React, { useEffect } from 'react'
import CustomTable from '../component/CustomTable'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { pdfListingApi } from '../store/thunk/userThunk'
import { Button, Space, Table, Tag } from 'antd'
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PdfListing2 () {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { pdfListData } = useSelector(state => state.userReducer)

  useEffect(() => {
    dispatch(pdfListingApi())
  }, [])

  const handleView = symbol => {
    navigate(`/form1List/${symbol}/`)
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
    <div className=' ms-10'>
      <CustomTable
        columns={columns}
        data={ipoData}
      />
    </div>
  )
}

export default PdfListing2
