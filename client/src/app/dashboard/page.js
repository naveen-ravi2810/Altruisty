'use client'
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'

const Page = () => {
    const questions = [
        {
          "s.no": 1,
          "question": "What is your idea?",
          "options": ["A. Software/App Development", "B. Product Manufacturing", "C. Service Offering", "D. Other"]
        },
        {
          "s.no": 2,
          "question": "What evidence do you have that your idea is viable?",
          "options": ["A. Market Research", "B. Proof of Concept", "C. Initial Sales/Interest", "D. Other"]
        },
        {
          "s.no": 3,
          "question": "What key elements will you include in your pitch deck?",
          "options": ["A. Problem Statement & Solution", "B. Market Opportunity", "C. Business Model", "D. Other"]
        },
        {
          "s.no": 4,
          "question": "What resources and expertise do you need to develop your prototype?",
          "options": ["A. Technical Skills", "B. Design Skills", "C. Funding", "D. Other"]
        },
        {
          "s.no": 5,
          "question": "What aspects of your product or service are eligible for copyright or patent protection?",
          "options": ["A. Unique Features/Functionality", "B. Branding/Logo", "C. Business Process", "D. Other"]
        },
        {
          "s.no": 6,
          "question": "What methods will you use to conduct market research?",
          "options": ["A. Surveys/Questionnaires", "B. Interviews/Focus Groups", "C. Data Analysis", "D. Other"]
        },
        {
          "s.no": 7,
          "question": "What legal structure will you choose for your company?",
          "options": ["A. Sole Proprietorship", "B. Partnership", "C. Corporation", "D. Other"]
        },
        {
          "s.no": 8,
          "question": "How will you initially launch your product or service?",
          "options": ["A. Online Marketing", "B. Social Media Promotion", "C. Local Events/Networking", "D. Other"]
        },
        {
          "s.no": 9,
          "question": "What methods will you use to collect feedback from customers?",
          "options": ["A. Online Surveys", "B. Feedback Forms", "C. Social Media Monitoring", "D. Other"]
        },
        {
          "s.no": 10,
          "question": "What additional information will you include in your investor pitch deck compared to your initial pitch deck?",
          "options": ["A. Financial Projections", "B. Market Validation", "C. Team Background", "D. Other"]
        }
      ]
      const [Answers, setAnswers] = useState({})
      function setEachAnswers(event){
        setAnswers({
            ...Answers,
            [event.target.name]:event.target.value
        })
      }
      async function handlesubmit(event){
        event.preventDefault()
        const resp = await fetch('http://127.0.0.1:5000/test',{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'answers':Answers})
        })
        const data = await resp.json()
        if (data.status){
            alert("True")
        }
      }

      
  return (
    <div>
      <Navbar/>
        <div>
            <h1 className='flex justify-center'>Questions</h1>
            <form onSubmit={handlesubmit} className='py-10 px-5'>
                {questions.map((question, index)=>(
                    <div className='px-3 py-5' key={index}>
                        <p>{question['s.no']}{" -> "}{question.question}</p>
                        <select name={question['s.no']} required onChange={setEachAnswers}>
                            <option value=""></option>
                            {question['options'].map((option, index)=>(
                                <option key={index}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <input type='submit'/>
            </form>
        </div>
    </div>
  )
}

export default Page