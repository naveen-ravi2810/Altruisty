'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Popup from 'reactjs-popup';
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
            console.log(resp)
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

    const [ProfileFile, setProfileFile] = useState(null)


    async function profile_upload(event){
        event.preventDefault()
        const formData = new FormData();
        formData.append("profile", ProfileFile);
        const resp = await fetch('/api/updateprofile',{
            method:'PUT',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
            },body:formData
        })
        if (resp.ok){
            alert("Image uploaded")
        }
        else{
            alert("Error in image")
        }
    }

    useEffect(()=>{
        fetchUserData()
    },[])
    if(IsLoading){
        return(
            <div>
            <div className=''>Loading...</div>
        
            </div>
            )
    }
  return (
    <div>
        <div className='text-4xl text-center'>Profile</div>
        <div className='flex justify-center items-center'>
            <div>
            <div>{UserData.profile_photo ? <img src={UserData.profile_photo} width={80} height={40}/> : 
            <Popup trigger={<button className='border-[1px] border-gray-500 bg-gray-200 hover:bg-gray-300 px-2'>Upload Profile</button>} position="top left">
            {close => (
            <div className='bg-white p-4'>
                <a className="text-2xl" onClick={close}> &times;
                </a>
                <form onSubmit={profile_upload}>
                    <input type='file' onChange={(e)=>setProfileFile(e.target.files[0])}/>
                    <button>Set Profile</button>
                </form>
               
            </div>
        )}
        </Popup>

            }</div>
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
                <p className='capitalize'>{UserData.email_verified ? <p className='text-green-700'>Verified</p> : <p>Not Verified <button className='border-[1px] border-gray-500 bg-gray-200 hover:bg-gray-300 px-2'><Link href='/email_otp'>Click To verify</Link></button></p>}</p>
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
                <label>Stage</label>
            </div>
            <div>
                <p className='capitalize'>{UserData.scores && UserData['scores'].map((test, index)=>(
                    <div key={index} className='flex gap-10'>
                        <p>
                            Date : {test.test_date}
                        </p>
                        <p>
                            Stage : <span className='font-bold'>{test.score}</span>
                        </p>
                    </div>
                ))}</p>
            </div>
            </div>
            
            </div>
        </div>
    </div>
  )
}

export default Profile