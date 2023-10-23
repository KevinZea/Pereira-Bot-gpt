import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { createChat } from './chat';
import LinkRenderer from './LinkRenderer/LinkRenderer';
import AddToHomeScreenButton from './AddToHomeScreenButton/AddToHomeScreenButton';
import publi1 from './resources/publi1.webp'
import publi2 from './resources/publi2.webp'

function App() {
  const [chats, setChats] = useState([])
  const [prompt, setPrompt] = useState('')
  const chatContainerRef = useRef(null);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function promptHandle(e) {
    setPrompt(e.target.value)
  }
  async function sendMessages(e) {
    if (prompt.length >= 1) {
      let obj = {
        "role": "user",
        "content": prompt
      }
      setPrompt('')
      stateChats(obj)
      stateChats({ role: "assistant", content: "...Pensando..." })
      const response = await createChat(prompt)
      chats.pop()
      setChats([...chats])
      stateChats(response)
      // console.log(chats)
    }
  }
  function stateChats(obj) {
    chats.push(obj)
    setChats([...chats])
  }

  function Keydownhandle(e) {
    if (e.key === "Enter") {
      sendMessages(e)
    }
  }
  useEffect(() => {
    if (chatContainerRef.current) {
      scrollToBottom();
    }
  }, [chats]);
  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  return (
    <div className='app'>
      <div className='col-princ'>
        <div className='col-title'>
          <h1>PereiraBot</h1>
        </div>
        <div className='col-icons'>
          <div className='col-icon-item'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
            </svg>
          </div>

          <div className='col-icon-item'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            </svg>
          </div>

          <div className='col-icon-item'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-airplane" viewBox="0 0 16 16">
              <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z" />
            </svg>
          </div>

          <div className='col-icon-item'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
            </svg>
          </div>

          <div className='col-icon-item'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
            </svg>
          </div>


        </div>
      </div>
      <div className='col-publi'>
        <div className='col-publi-img'>
          <img src={publi1} alt="" srcset="" />
        </div>
        <div className='col-publi-img'>
          <img src={publi2} alt="" srcset="" />
        </div>
      </div>
      <div className='body'>
        <div className='body-head'>
          <div className='body-title'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
              <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
            </svg>

            <h1>PereiraBot</h1>
          </div>
          <div className='body-icons'>
            <div className='body-icons-item'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
            <div className='body-icons-item'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </div>

          </div>

        </div>
        <div className='body-container'>
          <div className='body-chat' ref={chatContainerRef}>
            <div className='body-image'></div>
            {chats.length > 0 && (
              chats.map((c) => {
                return (
                  c.role === "assistant" ? (
                    <div className='chat-container'>
                      <div className='chat-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
                          <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                          <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                        </svg>
                      </div>
                      <div className='chat-large'>
                        <div className='chat-fill'>
                          {/* <div className='chat-triangulo'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-triangle-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" />
                            </svg>
                          </div> */}
                          <div className='chat-square'>
                            <span><LinkRenderer text={c.content} /></span>
                          </div>
                        </div>
                        <div className='chat-time'>
                          <span>12:00 am</span>
                        </div>
                      </div>
                    </div>
                  ) :

                    <div className='chat-container-user'>

                      <div className='chat-large'>
                        <div className='chat-fill'>

                          <div className='chat-square'>
                            <span>{c.content}</span>
                          </div>
                          {/* <div className='chat-triangulo-user'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-triangle-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" />
                            </svg>
                          </div> */}
                        </div>

                        <div className='chat-time-user'>
                          <span>12:00 am</span>
                        </div>
                      </div>
                      <div className='chat-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                        </svg>
                      </div>
                    </div>

                )
              })
            )}



          </div>
          <div className='inputs'>
            <input type="text" placeholder='Escribe tu mensaje'
              onChange={(e) => { promptHandle(e) }}
              value={prompt}
              onKeyDown={(e) => { Keydownhandle(e) }}
            />
            <div className='input-audio'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
              </svg>
            </div>
            <button className='input-send'
              onClick={(e) => { sendMessages(e) }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AddToHomeScreenButton />
    </div>
    // <div className='app'>
    //   <nav className='navbar'>
    //     <h1>El Asesor</h1>
    //     <div className='navbar-menu'>
    //       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-menu-down" viewBox="0 0 16 16">
    //         <path d="M7.646.146a.5.5 0 0 1 .708 0L10.207 2H14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3.793L7.646.146zM1 7v3h14V7H1zm14-1V4a1 1 0 0 0-1-1h-3.793a1 1 0 0 1-.707-.293L8 1.207l-1.5 1.5A1 1 0 0 1 5.793 3H2a1 1 0 0 0-1 1v2h14zm0 5H1v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zM2 4.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
    //       </svg>
    //     </div>
    //   </nav>
    //   <div className='chat'>
    //     {chats.length < 1 ? (
    //       <div className='chat-baner'>
    //         {/* <div className='chat-baner-icon'>
    //           <img src={logo} width={30} height={30}></img>

    //         </div> */}

    //         <div className='chat-baner-publi'>
    //           <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
    //             <div class="carousel-inner">
    //               <div class="carousel-item active">
    //                 <img src={space} class="d-block w-100" alt="..." />
    //               </div>
    //               <div class="carousel-item">
    //                 <img src={space2} class="d-block w-100" alt="..." />
    //               </div>
    //               <div class="carousel-item">
    //                 <img src={space3} class="d-block w-100" alt="..." />
    //               </div>
    //               <div class="carousel-item">
    //                 <img src={space4} class="d-block w-100" alt="..." />
    //               </div>
    //             </div>
    //             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    //               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //               <span class="visually-hidden">Previous</span>
    //             </button>
    //             <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    //               <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //               <span class="visually-hidden">Next</span>
    //             </button>
    //           </div>
    //         </div>

    //         <div className='chat-baner-info'>
    //           <span>
    //             ¡Bienvenido a El Asesor!
    //           </span>
    //           <p>
    //             Tu asistente virtual.
    //             <br></br>
    //             Aquí encontrarás recomendaciones e información comercial de la ciudad de Yerba Buena.
    //             <br></br>
    //             <br></br>
    //             Puedes iniciar una conversación o probar los siguientes ejemplos:
    //           </p>
    //           <div className='chat-baner-info-buttons'>

    //             <button onClick={(e) => { setPrompt("¿Que comer en Yerbabuena?") }}>
    //               ¿Que comer en Yerbabuena?
    //             </button>
    //             <button onClick={(e) => { setPrompt("¿Donde puedo hacer senderismo?") }}>
    //               ¿Donde puedo hacer senderismo?
    //             </button>
    //           </div>

    //         </div>

    //       </div>

    //     ) :

    //       <div className='chat-messages' ref={chatContainerRef}>
    //         {
    //           chats.length >= 1 && (
    //             chats.map((c) => {
    //               return (
    //                 c.role === "assistant" ? (
    //                   <div className='chat-asistent'>
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
    //                       <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
    //                       <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
    //                     </svg>
    //                     <span><LinkRenderer text={c.content} /></span>
    //                   </div>
    //                 ) :
    //                   <div className='chat-user'>
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
    //                       <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
    //                     </svg>
    //                     <span>{c.content}</span>
    //                   </div>
    //               )
    //             })
    //           )
    //         }
    //       </div>
    //     }
    //     <div className='chat-input'>
    //       <input type='text'
    //         placeholder='Préguntale al Asesor...'
    //         onChange={(e) => { promptHandle(e) }}
    //         value={prompt}
    //         onKeyDown={(e) => { Keydownhandle(e) }}
    //       >
    //       </input>
    //       <button onClick={(e) => { sendMessages(e) }}>
    //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
    //           <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
    //         </svg>
    //       </button>
    //     </div>

    //   </div>
    //   <AddToHomeScreenButton />
    // </div>

  );
}

export default App;
