'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Task = () => {

  const [Tasks, setTasks] = useState([])

  const router = useRouter()

  useEffect(()=>{
    fetch("/api/tasks",{
      method:'GET',
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    }).then((resp)=>{if(resp.ok){return resp.json()}else{router.replace('/login')}}).then((data)=>{
      setTasks(data)
    })
  },[])


  async function updatescore(){
    const resp = await fetch('/api/tasks',{
      method:'PUT',
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    })
    if (resp.ok){
      const data = await resp.json()
      setTasks(data)
    }else{
      console.log("There is an error")
    }
    
  }

  // console.log(Tasks)

  return (
    <div className='px-7'>
      <h1 className='text-3xl font-bold'>Tasks</h1>
      {Tasks && 
        Tasks.map((task,index)=>(
          <p key={index}>{index+1}<span className='px-2'></span>{task}</p>
        ))
      }
      {
        Tasks[0] !== "You have completed all the tasks" && <button className='border-[1px] p-2 rounded-xl bg-gray-200 hover:bg-gray-300' onClick={()=>updatescore()}>Tasks Completed</button>
      }
    </div>
  )
}

export default Task