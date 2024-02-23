'use client'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const router = useRouter()
    const [UserData, setUserData] = useState()
    const [IsLoading, setIsLoading] = useState(true)
    async function fetchUserData(){
        try{
            const resp = await fetch('/api/profile',{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            if (resp.ok){ 
                const data = await resp.json()
                setUserData(data)
                setIsLoading(false)
            } else{
                router.replace('/login')
            }
        } catch(error){
            router.replace('/servererror')
        }
    }

    useEffect(()=>{
        fetchUserData()
    },[])
    if(IsLoading){
        return(
            <div>
                <Navbar/>
            <div className='h-screen flex justify-center items-center text-4xl animate-ping'>Loading...</div>
        
            </div>
            )
    }
  return (
    <div>
        <Navbar/>
        <div className='text-4xl text-center'>Profile</div>
        <div className='flex justify-center items-center h-screen'>
        <div className='grid grid-cols-2 gap-x-4 gap-y-6'>
            <div>
                <label>Name</label>
            </div>
            <div>
                <p className='capitalize'>{UserData.user_name}</p>
            </div>
            <div>
                <label>Email</label>
            </div>
            <div>
                <p className=''>{UserData.email}</p>
            </div>
            <div>
                <label>Phone</label>
            </div>
            <div>
                <p className='capitalize'>{UserData.phone}</p>
            </div>
            <div>
                <label>Signed Up on</label>
            </div>
            <div>
                <p className='capitalize'>{UserData.signed_up}</p>
            </div>
            <div>
                <label>Email Verified</label>
            </div>
            <div>
                <p className='capitalize'>{UserData.email_verified ? <p>Verified</p> : <p>Not Verified <Link href='/email_otp'>Click To verify</Link></p>}</p>
            </div>
            <div>
                <label>Phone Verified</label>
            </div>
            <div>
                <p className='capitalize'>{UserData.phone_verified ? 'Verified' : 'Not Verified'}</p>
            </div>
            <div>
                <label>Score</label>
            </div>
            <div>
                <p className='capitalize'>{UserData.initial_score}</p>
            </div>
            <div>
                <label>Tests</label>
            </div>
            <div>
                <p className='capitalize'>{UserData.scores && UserData['scores'].map((test, index)=>(
                    <div key={index} className='flex gap-10'>
                        <p>
                            Date : {test.test_date}
                        </p>
                        <p>
                            Score : {test.score}
                        </p>
                    </div>
                ))}</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Profile