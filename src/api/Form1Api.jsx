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
    throw error
  }
}

export const form1List = async(id)  => {
  try {
    const response = await axiosInstance.get(
      `api/pdf/transaction-certificates/${id}/`,
    )
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    throw error
  }
}

export const formFill1 = async data => {
  try {
    const response = await axiosInstance.post(
      'api/pdf/extrat-tc-by-openai/',
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
    throw error
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
//     throw error
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
    throw error
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
//     throw error
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
//     throw error
//   }
// }

export const form2submit = async(values) => {
  try {
    const response = await axiosInstance.post(
      'api/pdf/transaction-certificates-type2/add/', values
    )
    return response;
  } catch (error) {
    console.error('Error in API request:', error)
    throw error
  }
}


export const form3ListApi = async()  => {
  try {
    const response = await axiosInstance.get(
      'api/openai/scope-certifications/'
    )
    console.log(response);
    
    return response
  } catch (error) {
    console.error('Error in API request:', error)
    throw error
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
    throw error
  }
}

export const formFill3 = async (values) => {
  try {
    const response = await axiosInstance.post(
      'api/openai/extract-scope-certificate/',
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
    throw error
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
    throw error
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
    throw error
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
    throw error
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
    throw error
  }
} 