import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

import { toast } from 'react-toastify'
import {
  setPdfListData,
  setPdfListData2,
  setPdfListData3,
  setPdfListData4
} from '../slice/userSlice'

export const pdfListingApi = createAsyncThunk(
  'pdfListingApi',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/tc/type-one-list/`
      )
      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setPdfListData(response?.data))
      } else {
        toast.error('Internal server error. Please try again later.')
      }

      // switch (response?.data?.meta?.status_code) {
      //   case 200:
      //     toast.success(response?.data?.meta?.message);
      //     return response.data;

      //     case 400:
      //       break;

      //   case 500:
      //     toast.error("Internal server error. Please try again later.");
      //     return rejectWithValue(response.data);

      //     case 401:
      //       break;

      //   default:
      //     toast.info("Unexpected response from server.");
      //     return rejectWithValue(response.data);
      // }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const pdfListingApi2 = createAsyncThunk(
  'pdfListingApi2',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/pdf/transaction-certificates-type2/`
      )
      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setPdfListData2(response?.data))
      } else {
        toast.error('Internal server error. Please try again later.')
      }


      // switch (response?.data?.meta?.status_code) {
      //   case 200:
      //     toast.success(response?.data?.meta?.message);
      //     return response.data;

      //     case 400:
      //       break;

      //   case 500:
      //     toast.error("Internal server error. Please try again later.");
      //     return rejectWithValue(response.data);

      //     case 401:
      //       break;

      //   default:
      //     toast.info("Unexpected response from server.");
      //     return rejectWithValue(response.data);
      // }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const PdfListing3 = createAsyncThunk(
  'PdfListing3',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/openai/scope-certifications/${id}/`
      )
      
      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setPdfListData3(response?.data))
      } else {
        toast.error('Internal server error. Please try again later.')
      }



      // switch (response?.data?.meta?.status_code) {
      //   case 200:
      //     toast.success(response?.data?.meta?.message);
      //     return response.data;

      //     case 400:
      //       break;

      //   case 500:
      //     toast.error("Internal server error. Please try again later.");
      //     return rejectWithValue(response.data);

      //     case 401:
      //       break;

      //   default:
      //     toast.info("Unexpected response from server.");
      //     return rejectWithValue(response.data);
      // }
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const PdfListing4 = createAsyncThunk(
  'PdfListing4',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/scope-certificate/type-prod-crop/${id}/`
      )
      dispatch(setPdfListData4(response))

      // switch (response?.data?.meta?.status_code) {
      //   case 200:
      //     toast.success(response?.data?.meta?.message);
      //     return response.data;

      //     case 400:
      //       break;

      //   case 500:
      //     toast.error("Internal server error. Please try again later.");
      //     return rejectWithValue(response.data);

      //     case 401:
      //       break;

      //   default:
      //     toast.info("Unexpected response from server.");
      //     return rejectWithValue(response.data);
      // }
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)
