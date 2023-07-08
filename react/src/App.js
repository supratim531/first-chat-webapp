import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import Login from './Login';
import ChatRoom from './ChatRoom';
import { CommonContext } from './CommonContext';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  const connect = username => {
    let stompClient = null;
    // let socket = new SockJS("http://localhost:8888/server");
    let socket = new SockJS("https://0708-49-37-11-162.ngrok-free.app/server");
    stompClient = over(socket);
    stompClient.connect({}, frame => {
      console.log(`WebSocket Connected: ${frame}`);

      // subscribe to get real time message
      stompClient.subscribe("/topic/public", res => {
        const message = JSON.parse(res.body);
        setMessages(messages => [...messages, message]);
      });
      // subscribe to get real time message

      setIsLogin(true);
      setIsLoading(false);
      setStompClient(stompClient);
      localStorage.setItem("username", username);
    }, err => {
      setIsLoading(false);
      console.log(`err: ${err}`);
      window.alert("Server Error 500");
    });
  }

  useEffect(() => {
    console.error("isLogin called");
    const username = localStorage.getItem("username");

    if (username !== null) {
      connect(username);
    }
  }, []);

  const contextValue = {
    connect,
    messages,
    stompClient,
    isLoading, setIsLoading
  }

  return (
    <CommonContext.Provider value={contextValue}>
      <div>
        {
          isLogin ? <ChatRoom /> : <Login />
        }
      </div>
    </CommonContext.Provider>
  );
}

export default App;
