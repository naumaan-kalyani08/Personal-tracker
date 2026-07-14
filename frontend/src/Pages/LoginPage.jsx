import React from 'react'
import { ReusableButton, ReusableInput } from '../Components/UI/ReusableComponents'
import { useApiForm } from '../Api/ReusableApiLogics'

const InitialFormData = {
  email: '',
  password: '',
}

const LoginPage = () => {
  const { formData, handleInputChange, handleSubmit, loading, responseMessage } = useApiForm('login', InitialFormData)

  return (
    <div className="flex-box-center" style={{ height: '100vh' }}>
      <div className="registration-wrapper border p-4 rounded-lg shadow-md border-gray-300">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <ReusableInput label="Email" name="email" value={formData.email} onChange={handleInputChange} placeholder="" />
        <ReusableInput label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="" />
        <ReusableButton label="Login" onClick={handleSubmit} loading={loading} />
        {responseMessage && <p className="mt-3 text-sm text-red-500">{responseMessage}</p>}
      </div>
    </div>
  )
}

export default LoginPage