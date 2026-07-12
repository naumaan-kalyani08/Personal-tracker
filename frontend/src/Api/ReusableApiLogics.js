import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/";
export const getApiData = async (endpoint='', params ={}) => {
 try {
    // const param = params || ''; 
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_BASE_URL}${endpoint}?${queryString}`:`${API_BASE_URL}${endpoint}`;
    // const url =`${API_BASE_URL}${endpoint}?${new URLSearchParams(param).toString()}`;       
    console.log('Fetching data from:', url, 'with params:', params);
    const response =await fetch(url)
    if (!response.ok) {
      throw new Error(`Http error: ${response.status}`);      
    }
    const data = await response.json()
    return data
    } catch (error) {
    console.error("GET API Error:", error);
        throw error;
 }  
}
export const postApiData = async (endpoint, data) => {
  const url = `${API_BASE_URL}${endpoint}`;
  try{
    const response = await fetch(url,{
    method: 'POST',
    headers:{
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return result;
  }
  catch(error){
    console.error("POST API Error:", error);
    throw error;
  }
}
export const useApiForm =(endpoint,initialFormData={})=>{
  const [formData, setFormData] = useState(()=>({...initialFormData}))
  const [loading, setloading] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const handleInputChange =(e)=>{
    const{name,value}=e.target
    setFormData(prev=>({
      ...prev,
      [name]:value
    }))
  }
  const resetFormData =()=>{
    setFormData({...initialFormData})
  }
  const handleSubmit = async (e)=>{
    console.log('Submitting form data:', formData);
    if(e?.preventDefault) e.preventDefault()
      setloading(true)
      setResponseMessage('')
      try{
        const result = await postApiData(endpoint,formData)

        if(result.status){
          setResponseMessage(result.message ||'Submitted successfully')
          resetFormData()
        } else{
          setResponseMessage(result.message ||'Failed to submit')
        }
        return result
      }
      catch(error){
        setResponseMessage(error.message ||"Something went wrong")
        throw error
      }
      finally {
        setloading(false)
      }
  }
  return{
    formData,
    handleInputChange,
    handleSubmit,
    loading,
    responseMessage,
    resetFormData
  }
} 