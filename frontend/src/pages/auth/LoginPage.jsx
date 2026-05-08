import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'

const LoginPage = () => {
  return (
<div className='min-h-screen flex flex-col items-center justify-center bg-background p-4'>
  {/* Add max-w-md here to stop it from stretching to the edges */}
  <div className='z-10 w-full max-w-md'> 
    <div className='mb-8 text-center'>
      <h1 className='text-4xl font-bold tracking-tight text-foreground'>Welcome Back</h1>
      <p className='text-muted-foreground mt-2'>We're glad to see you again</p>
    </div>
    <LoginForm />
  </div>
</div>
  )
}

export default LoginPage