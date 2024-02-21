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
            setIsLoading(false)      
          }
    }    

    useEffect(()=>{
        check_token()
    },[])
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
            <form onSubmit={handleRegister}>
                <h1>Register here</h1>
                <div>
                    <label>Name</label>
                    <input type='text' onChange={onUserDataChange} name='user_name' required/>
                </div>
                <div>
                    <label>Email</label>
                    <input type='email' onChange={onUserDataChange} name='email' required/>
                </div>
                <div>
                    <label>Phone</label>
                    <input type='tel' onChange={onUserDataChange} name='phone' required/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' onChange={onUserDataChange} name='password' required/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' onChange={onUserDataChange} name='reenterpassword' required/>
                </div>
                <div>
                    <input type='submit' value="Register"/>
                </div>
                <div>
                    <Link href='/login'>Already Have an account</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register