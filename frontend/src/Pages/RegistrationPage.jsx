import React, { useEffect } from 'react'
import { getApiData, useApiForm } from '../Api/ReusableApiLogics'
import { ReusableButton, ReusableInput } from '../Components/UI/ReusableComponents'
import { useNavigate } from 'react-router'
import { isAuthenticated } from '../Utils/auth'

const InitialFormData ={
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    number:''
  }

const RegistrationPage = () => {
  const navigate = useNavigate()

  if (isAuthenticated()) {
    navigate('/dashboard')
  }

  useEffect(() => {
    getApiData('test')
  }, [])
  const {formData,handleInputChange,handleSubmit,loading,responseMessage} = useApiForm('register',InitialFormData)
  const submitRegistration = async (e) => {
    const result = await handleSubmit(e)

    if (result?.status) {
      navigate('/login')
    }
  }
 

  return (
    <div className="flex-box-center" style={{ height: '100vh' }}>
      <div className="registration-wrapper border p-4 rounded-lg shadow-md border-gray-300">
        <ReusableInput label="First Name" name="first_name" value={formData.first_name} onChange={handleInputChange} size="medium" placeholder="Enter your name" />
        <ReusableInput label="Last Name" name="last_name" value={formData.last_name} onChange={handleInputChange} size="medium" placeholder="Enter your name" />
        <ReusableInput label="Email" name="email" value={formData.email} onChange={handleInputChange} size="medium" placeholder="Enter your email" type="email" />
        <ReusableInput label="Password" name="password" value={formData.password} onChange={handleInputChange} size="medium" placeholder="Enter your password" type="password" />
        <ReusableButton label="Register" onClick={submitRegistration} loading={loading} />
      </div>
          {responseMessage && <p>{responseMessage}</p>}
    </div>
  )
}

export default RegistrationPage