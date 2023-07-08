import React, { useContext, useState } from 'react';
import { CommonContext } from './CommonContext';

function ChatRoom() {
  const username = localStorage.getItem("username");
  const [message, setMessage] = useState({
    sender: localStorage.getItem("username"),
    content: '',
    timestamp: ''
  });

  const sendMessage = e => {
    e.preventDefault();

    if (message.content.trim() !== '') {
      stompClient.send("/app/send-message", {}, JSON.stringify({
        sender: message.sender,
        content: message.content.trim(),
        timestamp: message.timestamp
      }));
      setMessage({ ...message, content: '', timestamp: '' });
    }
  }

  const {
    messages,
    stompClient
  } = useContext(CommonContext);

  return (
    <div style={{ maxHeight: "70vh" }} className="p-4 container my-10 mx-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] rounded-md shadow shadow-slate-400">
      {
        (messages.length === 0) ?
          <>
            <div className="text-center">
              <span className="">No Conversation</span>
            </div>
          </> :
          <>
            <div className="">
              {
                messages.map((message, index) =>
                  <div key={index} className={(message.sender === username) ? "flex justify-end" : ""}>
                    <div className={((index === 0) || (messages[index].sender !== messages[index - 1].sender)) ? "px-4 py-0.5 inline-flex flex-col gap-2" : "px-4 py-0.5 inline-flex flex-col gap-2"}>
                      {
                        ((index === 0) || (messages[index].sender !== messages[index - 1].sender)) &&
                        <div style={{ marginTop: (message.sender !== username && index !== 0) ? "26px" : "0px" }} className={(message.sender === username) ? "flex flex-row-reverse gap-x-2 items-center" : "flex gap-x-2 items-center"}>
                          <div className="px-2.5 py-1.5 rounded-full bg-slate-300">
                            <i className="fa-solid fa-user text-xl"></i>
                          </div>
                          <div className="space-y-0.5">
                            <div className="whitespace-nowrap font-semibold">{(message.sender === username) ? "You" : message.sender}</div>
                            <div className="text-xs font-medium text-slate-500">{message.timestamp}</div>
                          </div>
                        </div>
                      }
                      <div style={{ alignSelf: (message.sender === username) ? "flex-end" : "flex-start" }} className={(message.sender === username) ? "p-2 flex rounded-lg shadow-sm shadow-slate-400 bg-[#d9fdd3]" : "p-2 flex rounded-lg shadow-sm shadow-slate-400 bg-white"}>
                        <div className="flex gap-x-2">
                          <pre className="font-roboto overflow-x-auto whitespace-pre-wrap">{message.content}</pre>
                          <div className="self-end bottom-0 flex justify-end text-xs">
                            <span className="whitespace-nowrap text-slate-600">{message.timestamp.split(',')[1].toLowerCase()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </>
      }
      <div className="absolute w-full bottom-0 left-0">
        <form className="px-4 py-2 lg:mx-40 my-4 flex justify-between items-center gap-4">
          <div className="px-4 py-3 w-full flex items-center rounded-lg outline-none shadow shadow-slate-600">
            <textarea value={message.content} onKeyDown={e => {
              if (e.code === "Enter" || e.code === "NumpadEnter") {
                if (e.shiftKey) {
                  console.log('shift enter was pressed');
                } else {
                  sendMessage(e);
                }
              }
            }} onChange={e => setMessage({ ...message, content: e.target.value, timestamp: new Date().toLocaleString() })} name="" id="" style={{ resize: "none" }} className="w-full outline-none" placeholder="Type a message"></textarea>
          </div>
          {
            (message.content.trim() !== '') ?
              <div onClick={sendMessage} className="cursor-pointer px-2.5 py-2 rounded-full bg-green-300">
                <div><i className="fa-solid fa-paper-plane text-2xl text-[#041b0b]"></i></div>
              </div> :
              <div className="px-2.5 py-2 rounded-full bg-slate-300">
                <div><i className="fa-solid fa-paper-plane text-2xl text-slate-700"></i></div>
              </div>
          }
          <button type="button" className="focus:outline-none" onClick={() => { localStorage.clear(); window.location.reload(); }}>
            <i className="fa-solid fa-right-from-bracket outline-none text-3xl text-red-600"></i>
          </button>
        </form>
      </div>
    </div >
  );
}

export default ChatRoom;
