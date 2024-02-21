'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'



const Login = () => {
    const router = useRouter()
    const [UserData, setUserData] = useState({})
    const [IsLoading, setIsLoading] = useState(true)

    async function check_token(){
        const resp = await fetch('/api/token',{
            method:'GET',
            headers:{
              'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
          })
          if(resp.ok){
            router.replace('/dashboard')    
          } else{
            setIsLoading(false)      
          }
    }    

    useEffect(()=>{
        check_token()
    },[])

    function onUserUpdate(event){
        setUserData({
            ...UserData,
            [event.target.name] : event.target.value
        })
    }

    async function handleLogin(event){
        event.preventDefault()
        
        const resp = await fetch('/api/login',{
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

    if(IsLoading){
        <div className='h-screen flex justify-center items-center text-4xl animate-ping'>Loading...</div>
    }

  return (
    <div>
        <Link href="/" className='uppercase flex justify-center pt-10 text-3xl font-bold'>altruisty</Link>
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
                    <input className='p-2 hover:bg-green-400 bg-green-300 rounded-xl' value='login' type='submit'/>
                </div>
                <div className='text-center pt-10'>
                    <Link className='' href='/register'>Click to register</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login