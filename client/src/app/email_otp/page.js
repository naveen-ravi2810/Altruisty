'use client'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const EmailOTP = () => {

    const router = useRouter()
    const [Message, setMessage] = useState('')
    const [EmailSend, setEmailSend] = useState(false)
    const [OTP, setOTP] = useState('')

    async function send_otp_to_email(){
        const resp = await fetch('/api/sendotp',{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        if(resp.ok){
            const data = await resp.json()
            setMessage(data.email)
        }else{
            const data = await resp.json()
            alert(data.detail)
        }
    }

    useEffect(()=>{
        send_otp_to_email()
    },[])

    async function handleverifyotp(e){
        e.preventDefault()
        const resp = await fetch(`/api/verifyemail?otp=${OTP}`,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${localStorage.setItem('token')}`
            },
            
        })
        if(resp.ok){
            router.replace('/profile')
        } else{
            const data = await resp.json()
            alert(data.detail)
        }
    }

  return (
    <div>
        <Navbar/>
        {
        !EmailSend && 
        <div>
            <button>SEND EMAIL</button>    
        </div>
        }
        <p>Enter OTP send to {Message} ID...</p>
        <form onSubmit={handleverifyotp}>
            <input type='number' onChange={(e)=>setOTP(e.target.value)} maxLength={6}/>
            <input type='submit' value="Validate Email"/>
        </form>
    </div>
  )
}

export default EmailOTP