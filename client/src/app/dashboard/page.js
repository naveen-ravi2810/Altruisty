'use client'
import ChatBox from '@/components/ChatBox'
import Company from '@/components/Dashboard/company'
import Profile from '@/components/Dashboard/profile'
import Task from '@/components/Dashboard/task'
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'

const Page = () => {
    

    
      

      
  return (
    <div>
      <Navbar/>
      <h1 className='text-center text-3xl'>The Company Details will displayed Soon</h1>
      <div className='flex justify-between px-10 pt-20'>
        <Company/>
        <Profile/>
      </div>
      <Task/>
      <ChatBox/>
    </div>
  )
}

export default Page