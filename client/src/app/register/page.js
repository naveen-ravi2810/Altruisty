'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Register = () => {    
    const router = useRouter()
    const [userData, setuserData] = useState({})
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
            localStorage.removeItem('token')
            setIsLoading(false)      
          }
    }    

    useEffect(()=>{
        if (localStorage.getItem('token')){
            check_token()
        }
    },[check_token])
    function onUserDataChange(event){
        setuserData({
            ...userData,
            [event.target.name]:event.target.value
        })
    }
    async function handleRegister(e){
        e.preventDefault()
        if (userData['password'] !== userData['reenterpassword'] || userData['password'].length < 8){
            alert('Password Does not match or lenght is minimum');
            return;
        }
        const resp = await fetch('/api/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userData)
        })
        const data = await resp.json()
        if (data.status){
            alert('Register Successfully')
            router.replace('/login')
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
        <div>
            <form onSubmit={handleRegister} className='flex justify-center items-center h-screen'>
                <div className='text-xl border-[1px] border-gray-500 p-2'>
                    <h1 className='flex justify-center text-4xl'>Register here</h1>
                    <div className='py-2 flex gap-3'>
                        <label>Name</label>
                        <input className='p-1 border-[1px] border-gray-500 outline-none' type='text' onChange={onUserDataChange} name='user_name' required/>
                    </div>
                    <div className='py-2 flex gap-3'>
                        <label>Email</label>
                        <input className='p-1 border-[1px] border-gray-500 outline-none' type='email' onChange={onUserDataChange} name='email' required/>
                    </div>
                    <div className='py-2 flex gap-3'>
                        <label>Phone</label>
                        <input className='p-1 border-[1px] border-gray-500 outline-none' type='tel' onChange={onUserDataChange} name='phone' required/>
                    </div>
                    <div className='py-2 flex gap-3'>
                        <label>Password</label>
                        <input className='p-1 border-[1px] border-gray-500 outline-none' type='password' onChange={onUserDataChange} name='password' required/>
                    </div>
                    <div className='py-2 flex gap-3'>
                        <label>Password</label>
                        <input className='p-1 border-[1px] border-gray-500 outline-none' type='password' onChange={onUserDataChange} name='reenterpassword' required/>
                    </div>
                    <div>
                        <input type='submit' value="Register"/>
                    </div>
                    <div>
                        <Link className='text-sm text-blue-600' href='/login'>Already Have an account</Link>
                    </div>    
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register