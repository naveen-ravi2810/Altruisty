import React, { useState, useEffect, useRef } from 'react';

const ChatBox = () => {
    const [ShowChat, setShowChat] = useState(false);
    const [Chat, setChat] = useState([{ 'message': 'Hi How may I help you', 'user': 'bot' }]);
    const [UserChat, setUserChat] = useState('');
    const chatAreaRef = useRef(null);

    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [Chat]);

    async function handleChat(e) {
        e.preventDefault();
        const newChat = [...Chat, { 'message': UserChat, 'user': 'human' }];
        setChat(newChat);

        const resp = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'chat_query': UserChat })
        });

        if (resp.ok) {
            const data = await resp.json();
            const updatedChat = [...newChat, { 'message': data.resp, 'user': 'bot' }];
            setChat(updatedChat);
        }
        setUserChat('');
    }

    return (
        <div className='fixed bottom-0 right-10 w-[460px]'>
            <div className='p-2 bg-blue-500'>
                <button onClick={() => setShowChat(!ShowChat)}>Raise your Query here</button>
            </div>
            {ShowChat &&
                <div className='h-[900px]'>
                    <div ref={chatAreaRef} id='chatarea' className='overflow-y-scroll'>
                        {Chat && Chat.map((chat, index) => (
                            <div key={index} >
                                <p className={`${chat.user === 'bot' ? 'text-blue-600' : 'text-green-600'} text-xl`}>{chat.message}</p>
                            </div>
                        ))}
                    </div>
                    <div className='bottom-0 w-10 fixed'>
                        <form onSubmit={handleChat}>
                            <input id='chat_input_container' type='text' onChange={(event) => setUserChat(event.target.value)} className='border-[1px] border-black p-1' value={UserChat} required /><button type='submit'>Ask</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
}

export default ChatBox;
