import React, { useState, useRef } from 'react';

const ChatBox = () => {
    const [showChat, setShowChat] = useState(false);
    const [chat, setChat] = useState([{ 'message': 'Hi, how may I help you?', 'user': 'bot' }]);
    const [userChat, setUserChat] = useState('');
    const chatAreaRef = useRef(null);

    // useEffect(() => {
    //     socketRef.current = new WebSocket('ws://localhost:8000/api/v1/ws');
        
    //     socketRef.current.onopen = () => {
    //         console.log('WebSocket connected!');
    //     };

    //     socketRef.current.onmessage = (event) => {
    //         const data = event.data;
    //         setChat(prevChat => [...prevChat, { 'message': data, 'user': 'bot' }]);
    //         chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    //     };
    //     return () => {
    //         socketRef.current.close();
    //     };
    // }, []);

    // async function handleChat(e) {
    //     e.preventDefault();
    //     const newUserChat = { 'message': userChat, 'user': 'human' };
    //     const newChat = [...chat, newUserChat];
    //     setChat(newChat);

    //     socketRef.current.send(userChat);
    //     setUserChat('');
    // }

    async function handleChat(e){
        e.preventDefault()
        const resp = await fetch('/api/chat',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({'chat_query':userChat})
        })
        const data = await resp.json()
        if (resp.ok){
            setChat(prevChat => [...prevChat, { 'message': userChat, 'user': 'user'},{'message':data['resp'], 'user':'bot'}])
            setUserChat("")
        }
    }



    return (
        <div className='fixed bottom-0 right-10 w-[460px] bg-white p-2'>
            <div className='p-2 bg-blue-500'>
                <button onClick={() => setShowChat(!showChat)}>Raise your Query here</button>
            </div>
            {showChat &&
                <div className='h-[900px]'>
                    <div ref={chatAreaRef} id='chatarea' className='h-[90%] overflow-y-scroll'>
                        {chat && chat.map((msg, index) => (
                            <div key={index} className={`py-1 ${msg.user === 'bot' ? 'text-blue-600' : 'text-green-600'} text-xl`}>
                                <p>{msg.message}</p>
                            </div>
                        ))}
                    </div>
                    <div className='bottom-0 w-10 fixed'>
                        <form onSubmit={handleChat}>
                            <input id='chat_input_container' type='text' onChange={(event) => setUserChat(event.target.value)} className='border-[1px] border-black p-1' value={userChat} required /><button type='submit'>Ask</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}

export default ChatBox;
