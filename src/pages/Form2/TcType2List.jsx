import React, { useEffect } from 'react'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { pdfListingApi, pdfListingApi2 } from '../../store/thunk/userThunk'
import { Button, Space, Table, Tag } from 'antd'
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CustomTable from '../../component/CustomTable'
import { Slidebar } from '../../layout/Slidebar'

function TcType2List () {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const { PdfListData2 } = useSelector(state => state.userReducer)

  useEffect(() => {
    dispatch(pdfListingApi2())
  }, [])

  const handleView = symbol => {
    navigate(`/tcType2View/${symbol}/`)
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

  const ipoData = PdfListData2?.map((item, index) => ({ key: index, ...item }))

    

  return (
 <>  <div className='flex'>   <div style={{ width: "20%" }}>  <Slidebar /></div>      <div style={{ width: "80%" }}>  <div className="container formList-cont border rounded-xl mx-auto  my-10  ">
        <h3 className='text-3xl p-5 font-bold'>Transaction Certificate (TC) Type 2 List</h3>
      <CustomTable
        columns={columns}
        data={ipoData}
      />
    </div>    </div>    </div></>
  )
}

export default TcType2List
