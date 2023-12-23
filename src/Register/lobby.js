import { useEffect, useState, useContext } from "react";
import ChessAnimation from "./chessAnimation";
import { motion , useAnimate } from "framer-motion";
import { useLocation, useNavigate } from 'react-router-dom';
import { ChessContext, ChessExtraContext } from '../Context/context';
import socket from '../Socket/socket';
import './lobby.css';

export default function NewLobby() {

    const [scope, animate] = useAnimate()
    const boardCol = [1,2,3,4,5,6]
    const boardRow = [1,2,3]

    const waitText = "Waiting for opponent to join"
    const wait = waitText.split(' ')

    const {chessExtra, setChessExtra} = useContext(ChessExtraContext);
    const navigate = useNavigate();
    const {message, setMessage} = useContext(ChessContext)
    const location = useLocation();
    const roomId = location?.state?.roomId === undefined ? "" : location.state.roomId;
    const playerId = location?.state?.playerId === undefined ? "" : location.state.playerId;
    const color = location?.state?.color === undefined ? "" : location.state.color;

    const dict = {
      100: "Start Game",
      200: "New Move",
      300: "Subscribed to Room",
      400: "Game Over",
      500: "Video Call",
      600: "Chat Message",
      700: "Opponent Name"
    }


    useEffect(() => {       
          socket.subscribe(`/topic/${roomId}`, (socket_data) => {
            const parsedData = JSON.parse(socket_data?.body);

            const code = parsedData?.code;

            // for start game
            if(code === 100){
              const { senderId, message } = parsedData;
              console.log("received start game in lobby");
              if(senderId!==playerId){
                console.log("sender id is not equal to player id");
                setChessExtra({...chessExtra, shouldSendAck:false})
              }
              // socket.send(`/app/${roomId}`, JSON.stringify({code: 300, message: {message: "Subscribed to Room"}})
              setMessage({code: 100, roomId: roomId, message: message?.message})
            }
            // for new move
            if(code === 200){
              const { message, senderId } = parsedData;
              setMessage({code: 200, roomId: roomId, from: message?.from, to: message?.to, senderId: senderId})
            }
            // for subscribed to room
            if(code === 300){
              const { message } = parsedData;
              setMessage({code: 300, roomId: roomId, message: message?.message})
            }

            if(code === 500){
              const { videoMessage, senderId } = parsedData;
              setMessage({code: 500, roomId: roomId, senderId:senderId, message: videoMessage})
            }

            if(code === 600){
              const { message, senderId } = parsedData;
              setMessage({code: 600, roomId: roomId, senderId:senderId, message: message?.message})
            }

            if(code === 700){
              const { message, senderId } = parsedData;

              if(senderId!==playerId){
                setChessExtra({...chessExtra, opponentName: message?.name})
              }
              setMessage({code: 700, roomId: roomId, senderId:senderId, message: message?.name})
            }  
          });
    }, []);


    useEffect(() => {
        if(message?.code === 100){
            navigate(`/playground/${roomId}`, {state: {isBlackBoard:color?.toLowerCase()==="white"?false:true, roomId: roomId, playerId: playerId}})
        }
    }, [message])

    const variants = {
      hidden: {
        opacity: 0,
        scale:0.8
      },
      visible: (custom) => ({
        opacity: 1,
        scale:1,
        // Use the custom value to modify the duration and delay
        transition: {
          duration: custom.duration,
          delay: custom.delay,
          repeat: Infinity,
          repeatType: "reverse"
        }
      })
    };
    
    const animateText =(i)=>({
      visible: {
          opacity: 1,
          // scale:1,
          y: 0,
          x:0,
          transition:{
          delay: 1+i*0.4,
          duration: 1,
          type: "spring",
          damping: 12,
          stiffness: 100,
          }
      },
      hidden: {
          opacity: 0,
          // scale:0.5,
          y: 20,
          transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
          },
      }
  })

   return (
    <div ref={scope} className="h-full w-full bg-[#ffffff] flex flex-col items-center justify-center select-none ">
      <ChessAnimation/>
      <div className='absolute px-2 top-12 font-[Monoton] text-black text-[3rem] bg-white'>8 x 8</div>
      
      <div className="flex flex-col items-center justify-center w-max h-max">
      {
        boardRow.map((row, rowIndex) => {
          return(
            <>
              <div className="flex items-center justify-center">
                {
                  boardCol.map((item, colIndex) => {
                    return(
                      // Use the variants and custom props for each square
                      <motion.div 
                        id="circle" 
                        className={`h-[3.4rem] w-[3.4rem] ${item%2===0?'bg-[#F5F5F5] border ':'bg-black'}`}
                        variants={variants}
                        // Pass the row and column index as custom value
                        custom={{
                          duration: 3 - rowIndex, // Decrease the duration as the row index increases
                          delay: colIndex // Increase the delay as the column index increases
                        }}
                        initial="hidden"
                        animate="visible"
                      />
                    )
                  })
                }
              </div>
              <div className="flex items-center justify-center">
                {
                  boardCol.map((item, colIndex) => {
                    return(
                      // Use the variants and custom props for each square
                      <motion.div 
                        id="circle" 
                        className={`h-[3.4rem] w-[3.4rem] ${item%2!=0?'bg-white border':'bg-black'}`}
                        variants={variants}
                        // Pass the row and column index as custom value
                        custom={{
                          duration: 3 - rowIndex, // Decrease the duration as the row index increases
                          delay: colIndex // Increase the delay as the column index increases
                        }}
                        initial="hidden"
                        animate="visible"
                      />
                    )
                  })
                }
              </div>
              <div className="absolute px-2 bottom-16 flex flex-row items-center justify-center bg-white">
                {
                  wait.map((item, index)=>{
                    return(
                      <motion.span variants={animateText(index)} initial="hidden" animate="visible" className="mt-4 mr-2 font-[CenturyGothic] text-[1.6rem]">{item}</motion.span>
                    )
                  })
                }
                <motion.span variants={animateText(5)} initial="hidden" animate="visible" className={`-ml-2 dot-animation px-1 text-[50px]`}>
                    <span className={`animate-ping`} style={{ animationDelay: '0.5s' }}>.</span>
                    <span className={`animate-ping`} style={{ animationDelay: '0.9s' }}>.</span>
                    <span className={`animate-ping`} style={{ animationDelay: '0s' }}>.</span>
                </motion.span>
              </div>
            </>
          )
        })
      }
    </div>
    </div>
  );
}
