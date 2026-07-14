import React, { useEffect } from 'react'
import { getApiData, postApiData, useApiForm } from '../Api/ReusableApiLogics'
import { ReusableButton, ReusableInput, showSequentialMessage } from '../Components/UI/ReusableComponents'

const InitialFormData ={
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    number:''
  }

const RegistrationPage = () => {
  
  useEffect(() => {
    // getApiData('https://api.example.com/data', { param1: 'value1', param2: 'value2' })
    getApiData('test')  // Calling the 'users' endpoint
  }, [])
  const {formData,handleInputChange,handleSubmit,loading,responseMessage} = useApiForm('register',InitialFormData)
  const submitRegistration = () => {
    showSequentialMessage([
      { type: 'info', content: 'Preparing your registration...' },
      { type: 'loading', content: 'Validating your details...' },
      { type: 'success', content: 'Registration submitted successfully!' },
    ])

    console.log('Registration submitted')
  }
 

  return (
    <div className="flex-box-center" style={{ height: '100vh' }}>
      <div className="registration-wrapper border p-4 rounded-lg shadow-md border-gray-300">
        <ReusableInput label="First Name" name="first_name" value={formData.first_name} onChange={handleInputChange} size="medium" placeholder="Enter your name" />
        <ReusableInput label="Last Name" name="last_name" value={formData.last_name} onChange={handleInputChange} size="medium" placeholder="Enter your name" />
        <ReusableInput label="Email" name="email" value={formData.email} onChange={handleInputChange} size="medium" placeholder="Enter your email" type="email" />
        <ReusableInput label="Password" name="password" value={formData.password} onChange={handleInputChange} size="medium" placeholder="Enter your password" type="password" />
        <ReusableButton label="Register" onClick={handleSubmit} />
      </div>
          {responseMessage && <p>{responseMessage}</p>}
    </div>
  )
}

export default RegistrationPage