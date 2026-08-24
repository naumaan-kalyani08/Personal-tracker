import React from 'react'
import { ReusableButton, ReusableInput } from '../Components/UI/ReusableComponents'
import { useApiForm } from '../Api/ReusableApiLogics'
import { useNavigate } from 'react-router'

const InitialFormData = {
  email: '',
  password: '',
}

const LoginPage = () => {
  const navigate = useNavigate()
  const { formData, handleInputChange, handleSubmit, loading, responseMessage } = useApiForm('login', InitialFormData)
  const handleLoginSubmit = async (e) => {
    const result = await handleSubmit(e)
    
    if (result && result.access_token) {
      localStorage.setItem('access_token',result.access_token)
      console.log('Login result:', result.access_token)
      navigate('/dashboard')
    }
  }
  return (
    <div className="flex-box-center" style={{ height: '100vh' }}>
      <div className="registration-wrapper border p-4 rounded-lg shadow-md border-gray-300">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <ReusableInput label="Email" name="email" value={formData.email} onChange={handleInputChange} placeholder="" />
        <ReusableInput label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="" />
        <ReusableButton label="Login" onClick={handleLoginSubmit} loading={loading} />
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <button className="text-blue-500 hover:underline" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
        {responseMessage && <p className="mt-3 text-sm text-red-500">{responseMessage}</p>}
      </div>
    </div>
  )
}

export default LoginPage