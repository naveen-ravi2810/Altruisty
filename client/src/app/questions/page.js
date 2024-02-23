'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Question = () => {
  const router = useRouter()
    const 
      questions = [
        {
          "s_no": 1,
          "question": "What is your idea?",
          "answers": [
            "Software/App Development",
            "Product Manufacturing",
            "Service Offering",
            "Other"
          ]
        },
        {
          "s_no": 2,
          "question": "Do you have a clearly defined problem or opportunity that your product or service addresses?",
          "answers": [
            "Yes, we have identified a specific problem and validated its existence through market research.",
            "We have a general idea of a problem we want to solve, but haven't conducted detailed research yet.",
            "We are still brainstorming and exploring different problem areas."
          ]
        },
        {
          "s_no": 3,
          "question": "Have you developed a basic document outlining your concept, target market, and value proposition?",
          "answers": [
            "Yes, we have a well-developed pitch deck ready for potential investors.",
            "We have a basic outline or one-pager summarizing our concept and target audience.",
            "We haven't created a formal document yet, but we have a clear idea in mind."
          ]
        },
        {
          "s_no": 4,
          "question": "Have you created a visual representation of your product or service workflow?",
          "answers": [
            "Yes, we have a detailed workflow design outlining all steps and interactions.",
            "We have a basic sketch or flowchart illustrating the core functionalities.",
            "We haven't started designing the workflow yet, but we have a general idea."
          ]
        },
        {
          "s_no": 5,
          "question": "Do you have a functional prototype that demonstrates the core features of your product or service?",
          "answers": [
            "Yes, we have a fully functional prototype ready for user testing and feedback.",
            "We have a low-fidelity or non-interactive prototype to showcase the concept visually.",
            "We haven't started developing a prototype yet, but we have a clear idea of its functionalities."
          ]
        },
        {
          "s_no": 6,
          "question": "Have you secured any intellectual property protection for your idea, such as copyrights or patents?",
          "answers": [
            "Yes, we have obtained the necessary intellectual property protection for our concept.",
            "We are in the process of applying for intellectual property protection.",
            "We haven't started the process of securing intellectual property protection yet."
          ]
        },
        {
          "s_no": 7,
          "question": "Are you currently developing a minimum viable product (MVP) with core functionalities?",
          "answers": [
            "Yes, we are actively developing and testing the MVP with real users.",
            "We are planning to start development of the MVP soon.",
            "We haven't started developing the MVP yet, but we have a clear roadmap."
          ]
        },
        {
          "s_no": 8,
          "question": "Have you conducted comprehensive market research to understand your target audience and their needs?",
          "answers": [
            "Yes, we have conducted in-depth market research and analysis to validate our concept.",
            "We have gathered some initial market data but haven't conducted a full analysis.",
            "We haven't started market research yet, but we have some basic understanding of the target audience."
          ]
        },
        {
          "s_no": 9,
          "question": "Have you analyzed the market data to identify trends, competition, and potential opportunities?",
          "answers": [
            "Yes, we have conducted a thorough market analysis and identified key insights.",
            "We have collected some market data but haven't performed a detailed analysis yet.",
            "We haven't started market analysis yet."
          ]
        },
        {
          "s_no": 10,
          "question": "Have you registered your business as a legal entity?",
          "answers": [
            "Yes, our company is registered and complies with all legal requirements.",
            "We are in the process of registering our company.",
            "We haven't started the company registration process yet."
          ]
        },
        {
          "s_no": 11,
          "question": "Have you conducted small-scale implementations or pilot programs to test your product or service in a limited setting?",
          "answers": [
            "Yes, we have conducted successful pilot programs and gathered valuable feedback.",
            "We are planning to conduct small-scale implementations in the near future.",
            "We haven't conducted any small-scale implementations yet."
          ]
        },
        {
          "s_no": 12,
          "question": "Have you collected customer reviews and feedback through surveys or other methods?",
          "answers": [
            "Yes, we actively collect and analyze customer feedback to improve our product or service.",
            "We have collected some initial feedback but haven't implemented a systematic process yet.",
            "We haven't started collecting customer reviews or feedback yet."
          ]
        },
        {
          "s_no": 13,
          "question": "Do you incorporate customer feedback and suggestions into the development process to improve your product or service?",
          "answers": [
            "Yes, we continuously iterate based on customer feedback to enhance the user experience.",
            "We consider customer feedback when possible but haven't established a formal process yet.",
            "We haven't started incorporating customer feedback into the development process."
          ]
        },
        {
          "s_no": 14,
          "question": "Have you developed a final investor pitch deck tailored for fundraising purposes?",
          "answers": [
            "Yes, we have a professional and compelling pitch deck ready to present to potential investors.",
            "We are working on developing a pitch deck to showcase our concept and business potential.",
            "We haven't started developing an investor pitch deck yet."
          ]
        },
        {
          "s_no": 15,
          "question": "Are you actively seeking funding from angel investors?",
          "answers": [
            "Yes, we are actively seeking funding from angel investors.",
            "No, we are not actively seeking funding from angel investors at the moment.",
            "We are considering seeking funding from angel investors in the near future."
          ]
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
        const resp = await fetch('/api/test',{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'answers':Answers})
        })
        const data = await resp.json()
        if (resp.ok){
          router.replace('/profile')
        } else{
          alert("Error")
        }
      }

      console.log(Answers)
      
  return (
    <div>
        <div>
            <h1 className='flex justify-center'>Questions</h1>
            <form onSubmit={handlesubmit} className='py-10 px-5'>
                {questions.map((question, index)=>(
                    <div className='px-3 py-5' key={index}>
                        <p>{question['s_no']}{" -> "}{question.question}</p>
                        <select name={question['s_no']} required onChange={setEachAnswers}>
                            <option value=""></option>
                            {question['answers'].map((option, index)=>(
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

export default Question