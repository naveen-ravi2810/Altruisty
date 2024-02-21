'use client'
import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [UserData, setUserData] = useState()

    async function fetchUserData(){
        try{
            const resp = await fetch('/api/profile',{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await resp.json()
            if (data.status){
                setUserData(data.details)
            } else{
                console.log("first")
            }
        } catch(error){
            console.error("Erro")
        }
    }

    useEffect(()=>{
        fetchUserData()
    },[])

  return (
    <div>
        <div className='text-4xl text-center'>Profile</div>
    </div>
  )
}

export default Profile