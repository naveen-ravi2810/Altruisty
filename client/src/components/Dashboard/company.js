'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';


const Company = () => {

    const [isLoading, setisLoading] = useState('')

    const [ProfileFile, setProfileFile] = useState(null)


    async function profile_upload(event){
        event.preventDefault()
        const formData = new FormData();
        formData.append("profile", ProfileFile);
        const resp = await fetch('/api/update_company_profile',{
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

    const [Company_details, setCompany_details] = useState({})
    console.log(Company_details)
    useEffect(()=>{
        fetch('/api/company',{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}` 
            }
        }).then((resp)=>resp.json()).then((data)=>setCompany_details(data))},[])

    return (
    <div className='w-1/2'>

        <h1 className='flex justify-center text-4xl'>Company Details</h1>

       {Company_details ?
       
       <div>
       {Company_details.logo_url ? <img src={Company_details.logo_url} width={80} height={40}/> :  
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
   </Popup>}
       <h1 className='py-1'>Name: {Company_details.name}</h1>  <br/>
       <h1 className='py-1'>Type: {Company_details.company_type}</h1> <br/>
       <h1 className='py-1'>Start Date: {Company_details.start_date}</h1> <br/>
       <h1 className='py-1'>description: {Company_details.description}</h1> <br/>
   </div>
   : <div className='pt-10'>
        <Link className='flex justify-center items-center' href='/company_info'><button className='p-2 border-[1px] border-gray-500'>Update Company</button></Link>
    </div>}
    </div>
  )
}

export default Company