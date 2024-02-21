'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const Login = () => {
    const router = useRouter()
    const [UserData, setUserData] = useState({})
    function onUserUpdate(event){
        setUserData({
            ...UserData,
            [event.target.name] : event.target.value
        })
    }
    async function handleLogin(event){
        event.preventDefault()
        
        const resp = await fetch('http://127.0.0.1:5000/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(UserData)
        })
        const data = await resp.json()
        if (data.status){
            localStorage.setItem('token',data.access_token)
            router.replace('/dashboard')
        } else{
            alert(data.message)
        }
    }
  return (
    <div>
        <div className='h-screen justify-center items-center flex'>
            <form onSubmit={handleLogin} className='p-4 border-gray-500 border-[1px]'>
                <div className='text-center font-bold text-3xl py-3'>Login</div>
                <div className='py-3'>
                    <label className='px-3'>Email</label>
                    <input className='border-[1px] border-gray-500 outline-none p-2' name='email' onChange={onUserUpdate} type='email' placeholder='example@gmail.com' required/>
                </div>
                <div className='py-3'>
                    <label className='px-3'>Password</label>
                    <input className='border-[1px] border-gray-500 outline-none p-2' name='password' onChange={onUserUpdate} type='password' required/>
                </div>
                <div className='text-center'>
                    <input className='p-2 hover:bg-green-400 bg-green-300' type='submit'/>
                </div>
                <Link href='/register'>Click to register</Link>
            </form>
        </div>
    </div>
  )
}

export default Login