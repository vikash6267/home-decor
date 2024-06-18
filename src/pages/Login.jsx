import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../serivces/operations/user'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/common/Footer'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, () => navigate('/dashboard'))) // Assuming '/dashboard' is the route to redirect after successful login
  }

  return (
   <>
     <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg'>
        <div className='text-center text-2xl font-bold text-gray-900'>
          Login
        </div>
        <form className='space-y-6' onSubmit={handleOnSubmit}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input 
              type='email' 
              id='email' 
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
              placeholder='you@example.com' 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input 
              type='password' 
              id='password' 
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' 
              placeholder='Enter your password' 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button 
              type='submit' 
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer></Footer>
   </>
  )
}

export default Login
