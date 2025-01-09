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

export const form1List = async()  => {
  try {
    const response = await axiosInstance.get(
      'api/pdf/transaction-certificates/',
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

export const form3ListApi = async()  => {
  try {
    const response = await axiosInstance.get(
      'api/openai/scope-certifications/'
      // 'api/openai/scope-certifications/',
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