'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Register = () => {    
    const router = useRouter()
    const [userData, setuserData] = useState({})
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
  return (
    <div>
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
                    <input type='submit'/>
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