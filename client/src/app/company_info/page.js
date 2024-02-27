'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Company_info = () => {

    const router = useRouter()
    const [IsLoading, setIsLoading] = useState(true)
    const [Company_details, setCompany_details] = useState({})

    useEffect(()=>{
        fetch('/api/token',{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            }
        }).then((resp)=>{
            if(resp.ok){
                setIsLoading(false)
            }else{
                router.replace('/login') 
            }
        })
    },[])

    function handle_company_details(event){
        setCompany_details({
            ...Company_details,
            [event.target.name]: event.target.value
        })
    } 

    async function handle_company_submit(event){
        event.preventDefault()
        const resp = await fetch('/api/register_company',{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Company_details)
        })
        if(resp.ok){
            router.replace('/questions')
        }
    }

if(IsLoading){
    return(
        <div className='flex h-screen justify-center items-center text-4xl animate-pulse'>LOADING...</div>
    )
}

  return (
    <div className='h-screen flex justify-center items-center'>
        <div>
            <h1 className='text-3xl underline pb-6'>Enter company informations</h1>
            <form className='grid grid-rows-2' onSubmit={handle_company_submit}>
                {/* 
                name: str 
                description: str
                company_type: str
                start_date: date = Field(lt=date.today())
                prototype_description: str
                idea: str = Field(min_length=300) 
                */}
                <div className='flex flex-col py-4'>
                    <label>Comapny Name</label>
                    <input className='outline-none border-[1px] p-2' type='text' name='name' onChange={handle_company_details} required/>
                </div>
                <div className='flex flex-col py-4'>
                    <label>Company Decription</label>
                    <input className='outline-none border-[1px] p-2' type='text' name='description' onChange={handle_company_details} required/>
                </div>
                <div className='flex flex-col py-4'>
                    <label>company Type</label>
                    <input className='outline-none border-[1px] p-2' type='text' name='company_type' onChange={handle_company_details} required/>
                </div>
                <div className='flex flex-col py-4'>
                    <label>start_date</label>
                    <input className='outline-none border-[1px] p-2' type='date' name='start_date' onChange={handle_company_details} required/>
                </div>
                <div className='flex flex-col py-4'>
                    <label>prototype Description</label>
                    <input className='outline-none border-[1px] p-2' type='text' name='prototype_description' onChange={handle_company_details} required/>
                </div>
                <div className='flex flex-col py-4'>
                    <label>Idea<span className='text-xs pl-3'>min 300 words</span></label>
                    <textarea className='outline-none border-[1px] p-2' minLength={300} type='text'  name='idea' onChange={handle_company_details} required/>
                </div>
                <div className='flex justify-center'>
                    <button className='p-2 bg-green-200 hover:bg-green-400' type='submit'>Register</button>
                </div>
        </form>
        </div>
    </div>
  )
}

export default Company_info