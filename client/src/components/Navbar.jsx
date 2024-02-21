'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Navbar = () => {

  const router = useRouter()
  const [IsLoading, setIsLoading] = useState(true)
  const [IsLoggedIn, setIsLoggedIn] = useState(true)
  async function validate_token(){
    const resp = await fetch('/api/token',{
      method:'GET',
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    })
    if(resp.ok){
      setIsLoading(false)      
    } else{
      router.replace("/")
      setIsLoading(false)      
      setIsLoggedIn(false)
    }
  }

  useEffect(()=>{
    validate_token()
  },[])

  function handleLogout(){
    localStorage.removeItem('token')
    router.replace('/')
  }

  if(IsLoading){
    return(
      <div className='flex justify-between px-20 py-10 border-b-[1px] border-black'>
        <div className='uppercase'>altruisty</div>
        <div className='flex gap-10'>
          <p>Loading...</p>
          <p>Loading...</p>
          <p>Loading...</p>
        </div>
    </div>
    )
  }

  if(!IsLoggedIn){
    return(
      <div className='flex justify-between px-20 py-10 border-b-[1px] border-black'>
        <div className='uppercase'>altruisty</div>
        <div className='flex gap-10'>
          <p>WELCOME BACK...</p>
        </div>
    </div>
    )
  }


  return (
    <div className='flex justify-between px-20 py-10 border-b-[1px] border-black'>
        <Link href="/" className='uppercase text-3xl'>altruisty</Link>
        <div className='flex gap-10 items-center'>
          <Link href='/dashboard'>Dashboard</Link>
          <Link href='/profile'>Profile</Link>
          <button onClick={()=>handleLogout()}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar