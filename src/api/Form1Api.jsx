import { toast } from 'react-toastify'
import axiosInstance from './axiosInstance'

export const form1Set = async data => {
  try {
    const response = await axiosInstance.post(
      'api/pdf/final-transaction-certificate/',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

export const form1List = async(id)  => {
  try {
    const response = await axiosInstance.get(
      `api/pdf/transaction-certificates/${id}/`,
    )
    // if (response?.status_code === 200 || response?.status_code === 201) {
    //   return response?.data
    // } else {
    //   toast.error('Internal server error. Please try again later.')
    // }
    return response
  } catch (error) {
    return error
  }
}

export const formFill1 = async data => {
  try {
    const response = await axiosInstance.post(
      // 'api/pdf/extrat-tc-by-openai/',
      'api/pdf/extrat-tc-by-groq/',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    if (response?.status_code === 200 || response?.status_code === 201) {
      return response
    } else {
      toast.error('Internal server error. Please try again later.')
    }
  
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

// export const formFill2 = async data => {
//   try {
//     const response = await axiosInstance.post(
//       'api/pdf/extrat-tc2-by-openai/',
//       data,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       }
//     )
//     return response
//   } catch (error) {
//     console.error('Error in API request:', error)
//     return error
//   }
// }

export const formFill2Try = async data => {
  try {
    const response = await axiosInstance.post(
      'api/pdf/extrat-tc2-by-groq/',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

// export const form3ListApi = async()  => {
//   try {
//     const response = await axiosInstance.get(
//       'api/openai/scope-certifications/'
//       // 'api/openai/scope-certifications/',
//     )
//     console.log(response);
    
//     return response
//   } catch (error) {
//     console.error('Error in API request:', error)
//     return error
//   }
// }

// export const form3submit = async(values) => {
//   try {
//     const response = await axiosInstance.post(
//       'api/openai/create-scope-certificate/', values
//     )
//     return response;
//   } catch (error) {
//     console.error('Error in API request:', error)
//     return error
//   }
// }

// ---------------------------- Hemang Api Start ------------------------------

export const form2submit = async(values) => {
  try {
    const response = await axiosInstance.post(
      'api/pdf/transaction-certificates-type2/add/', values
    )
    return response;
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

export const addFormHandlinkTrading = async(values) => {
  try {
    const response = await axiosInstance.post(
      'api/scope-certificate/type-handling-trading/add/', values
    )
    return response;
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

export const listFormHandlinkTrading = async(values) => {
  try {
    const response = await axiosInstance.get(
      'api/scope-certificate/type-handling-trading/', values
    )
    return response;
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

export const viewFormHandlinkTrading = async(values) => {
  try {
    const response = await axiosInstance.get(
      `api/scope-certificate/type-handling-trading/${values}/`,
    )
    return response;
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

export const addPdfFormHandlinkTrading = async data => {
  try {
    const response = await axiosInstance.post(
      // 'api/scope-certificate/extract-handling-trading/',
      'api/scope-certificate/groq-extract-handling-trading/',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}
// ---------------------------- Hemang Api End------------------------------

export const form3ListApi = async()  => {
  try {
    const response = await axiosInstance.get(
      'api/openai/scope-certifications/'
    )
    console.log(response);
    
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

export const form3submit = async(values) => {
  try {
    const response = await axiosInstance.post(
      'api/openai/create-scope-certificate/', values
    )
    return response;
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

export const formFill3 = async (values) => {
  try {
    const response = await axiosInstance.post(
      // 'api/openai/extract-scope-certificate/',
      'api/openai/groq-extract-scope-certificate/',
      values,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}


export const form2List = async(id)  => {
  try {
    const response = await axiosInstance.get(
      `api/pdf/transaction-certificates-type2/${id}/`,
    )
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

export const formcropProductionSet = async data => {
  try {
    const response = await axiosInstance.post(
      'api/scope-certificate/type-prod-crop/add/',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

export const formcropProductionList = async()  => {
  try {
    const response = await axiosInstance.get(
      'api/scope-certificate/type-prod-crop/'
    )
    console.log(response);
    
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}

export const formCropProductinView = async(id) => {
  try {
    const response = await axiosInstance.get(
      `api/scope-certificate/type-prod-crop/${id}/`,
    )
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
} 

export const pdfExtractTypeProdCrop = async data => {
  try {
    const response = await axiosInstance.post(
      'api/scope-certificate/groq-extract-type-prod-crop/',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    return error
  }
}