import React, { createRef, useContext, useEffect, useState } from 'react'
import './videoCall.css'
import SimplePeer from 'simple-peer'
import socket from '../Socket/socket'
import { ChessContext, ChessExtraContext, ChessUtilsContext } from '../Context/context'
import { PiPhoneCallFill, PiPhoneFill } from 'react-icons/pi'
import { motion } from 'framer-motion'

export default function VideoCall({roomId, playerId}) {
    const connStatus = {
        STAGE : 'STAGE',
        OFFERING: 'OFFERING',
        RECEIVING: 'RECEIVING',
        ANSWERING: 'ANSWERING',
        CONNECTED: 'CONNECTED',
        STREAM : 'STREAM',
        FAILED: 'FAILED',
    }

    const {chessUtils} = useContext(ChessUtilsContext)
    const {chessExtra, setChessExtra} = useContext(ChessExtraContext)

    const senderId = playerId

    
    const {message} = useContext(ChessContext)
    
    const videoSelf = createRef(null)
    const videoOther = createRef(null)
    
    const [connectionStatus, setConnectionStatus] = useState(connStatus.STAGE)
    const [offer, setOffer] = useState(null)
    const [simplePeer, setSimplePeer] = useState(null)
    const [selfStream, setSelfStream] = useState(null)
    const [otherStream, setOtherStream] = useState(null)

    const [initiator, setInitiator] = useState(false)

    useEffect(()=>{
        if(chessExtra?.call === true && connectionStatus === connStatus.STAGE){
            sendInvitation()
        }
    }, [chessExtra?.call])

    useEffect(()=>{
        if(message?.code === 500){
            const payLoad = message?.message?.data 
            const type = message?.message?.type

            if(type === 'offer'){
                setOffer(payLoad)
                if(senderId !== message?.senderId){
                    setConnectionStatus(connStatus.RECEIVING)
                    setChessExtra({...chessExtra, call:true})
                }
            }
            else if(type === 'answer'){
                if(senderId !== message?.senderId){
                    simplePeer?.signal(payLoad)
                }
            }
            else if(type === 'end'){
                if(senderId !== message?.senderId){
                    handleEndCall(false)
                }
            }
        }
    }, [simplePeer, message])


    useEffect(()=>{
        if(otherStream){
            videoOther.current.srcObject = otherStream
            videoOther.current.play()
        }
    }, [otherStream])

    useEffect(()=>{
        if(selfStream){
            videoSelf.current.srcObject = selfStream
            videoSelf.current.play()
        }
    }, [selfStream])

    const sendInvitation = () => {
        setInitiator(true)
        navigator.mediaDevices.getUserMedia({audio:true, video:true}).then((mediaStream)=>{

            setSelfStream(mediaStream)

            const sp = new SimplePeer({
                initiator: true,
                stream: mediaStream,
                trickle: false
            })

            setConnectionStatus(connStatus.OFFERING)

            sp.on('signal', (data)=>{
                setOffer(JSON.stringify(data))

                var dataToSend = {
                    code: 500,
                    messageId : "randomId",
                    roomId: roomId,
                    senderId: senderId,
                    videoMessage: {
                        data: data,
                        type: 'offer',
                    },
                    timestamp: new Date().getTime()
                }

                socket.send(`/app/videoChat/${roomId}`, dataToSend)
            })

            sp.on('connect', ()=>{
                setConnectionStatus(connStatus.CONNECTED)
            })

            sp.on('error', (err)=>{
                console.log(err)
                setConnectionStatus(connStatus.FAILED)
            })

            sp.on('stream', (stream)=>{
                setOtherStream(stream)
            })

            setSimplePeer(sp)

            setTimeout(() => {
                if (connectionStatus !== connStatus.CONNECTED) {
                    handleEndCall(true);
                    mediaStream?.getTracks().forEach((track) => {
                        track.stop();
                    });
                }
            }, 10000);
        })
    }

    const acceptInvitation = () => {
        navigator.mediaDevices.getUserMedia({audio:true, video:true}).then((mediaStream)=>{
        
            setSelfStream(mediaStream)

            const sp = new SimplePeer({
                initiator: false,
                stream: mediaStream,
                trickle: false
            })

            offer && sp.signal(offer)
            setConnectionStatus(connStatus.ANSWERING)

            sp.on('signal', (data)=>{
                var dataToSend = {
                    code: 500,
                    messageId : "randomId",
                    roomId: roomId,
                    senderId: senderId,
                    videoMessage: {
                        data: data,
                        type: 'answer',
                    },
                    timestamp: new Date().getTime()
                }
                socket.send(`/app/videoChat/${roomId}`, dataToSend)
            })

            sp.on('connect', ()=>{
                setConnectionStatus(connStatus.CONNECTED)
            })

            sp.on('error', (err)=>{
                console.log(err)
                setConnectionStatus(connStatus.FAILED)
            })

            sp.on('stream', (stream)=>{
                setConnectionStatus(connStatus.STREAM)
                setOtherStream(stream)
            })

            setSimplePeer(sp)
        })
    }


    const handleDragEnd = (event, info) => {
        if(info.offset.x > 250){
            acceptInvitation()
        }
    }

    const handleEndCall = (isFirst) => {
        setConnectionStatus(connStatus.STAGE)
        setChessExtra({...chessExtra, call:false})
        if(videoSelf?.current) videoSelf.current.srcObject = null
        if(videoOther?.current) videoOther.current.srcObject = null
        if(simplePeer){
            simplePeer?.destroy()
            setSimplePeer(null)
        }
        setOffer(null)
        if(selfStream){
            selfStream?.getTracks().forEach((track) => {
                track.stop();
            })
            setSelfStream(null)
        }
        if(otherStream){
            otherStream?.getTracks().forEach((track) => {
                track.stop();
            });
            setOtherStream(null)
        }
        setInitiator(false)
        
        if(isFirst){
            var dataToSend = {
                code: 500,
                messageId : "randomId",
                roomId: roomId,
                senderId: senderId,
                videoMessage: {
                    data: null,
                    type: 'end',
                },
                timestamp: new Date().getTime()
            }

            socket.send(`/app/videoChat/${roomId}`, dataToSend)
        }
    }
    
    return (
        <div className={`flex flex-col items-center justify-center gap-4 h-[80%] w-[95%] mx-auto my-auto bg-white`}>
            <span className="h-1 w-10 bg-white absolute left-[45%] top-2 rounded-md"></span>
            {
                ((connectionStatus === connStatus.STAGE || otherStream===null) && (initiator)) && <>
                    <PiPhoneCallFill className={`animate-shake-2 ${chessUtils?.text} bg-white rounded-full h-[80px] w-[80px] p-3 ml-1`}/>
                    <h1 className={`${chessUtils?.text} text-2xl font-bold font-[Athiti] tracking-wider`}>
                        Calling
                        <span className={`dot-animation px-1 text-[50px]`}>
                            <span className={`animate-ping`} style={{ animationDelay: '0.5s' }}>.</span>
                            <span className={`animate-ping`} style={{ animationDelay: '0.9s' }}>.</span>
                            <span className={`animate-ping`} style={{ animationDelay: '0s' }}>.</span>
                        </span>
                    </h1>
                </>
            }
            {
                connectionStatus === connStatus.RECEIVING && 
                <div className={`flex flex-col items-center justify-center gap-8 w-full`}>
                    <PiPhoneCallFill className={`${chessUtils?.text} text-[60px] animate-shake`}/>
                    <motion.div className={`overflow-hidden flex flex-row items-center justify-start w-[90%] bg-gradient-to-r from-white to-gray-400 h-16 rounded-full`}>
                        <motion.div 
                            drag='x'
                            dragConstraints={{left:0, right:300}}
                            dragElastic={{left:0, right:0.1}}
                            dragDirectionLock
                            onDragEnd={handleDragEnd}
                        >
                            <PiPhoneCallFill className={`animate-shake-2 text-[40px] text-green-500 ${chessUtils?.bg} rounded-full h-[60px] w-[60px] p-3 ml-1`}/>
                        </motion.div>
                        <h1 className={`text-slate-400 ml-24 text-xl font-semibold font-[CenturyGothic]`}>Slide to answer..</h1>
                    </motion.div>                
                </div> 
            }

            
            <div className={`flex ${chessUtils?.bg} flex-col items-center justify-center w-full h-[100%] gap-2 ${otherStream===null ? 'hidden':''}`}>
                <div className={`flex flex-row items-center justify-center w-[100%] h-full ${otherStream===null ? 'hidden':''}`}>
                    <span className={`absolute top-8 left-5 bg-white text-black w-max px-2 font-[Poppins] text-sm rounded-sm`}>{chessExtra?.opponentName}</span>
                    <video className={`h-full w-[60%] object-cover`} ref={videoOther} autoPlay></video>
                    
                    <div className={`flex flex-col items-center justify-start h-full w-[40%] gap-4`}>
                        <span className={`absolute top-8 right-5 bg-white text-black w-max px-2 font-[Poppins] text-sm rounded-sm`}>You</span>
                        <video className={`h-[100%] w-full object-cover`} ref={videoSelf} autoPlay muted={true}></video>
                    </div>
                </div>
                <span onClick={()=>handleEndCall(true)} className={`absolute bottom-2 flex flex-row justify-center items-center gap-2 bg-white text-black border-2 ${chessUtils?.border} box-shadow px-5 py-1 cursor-pointer`}>
                    <PiPhoneFill className={`text-red-500 text-[20px] rotate-[135deg] `}/>
                    <h1 className={`text-xs font-semibold font-[CenturyGothic]`}>End Call</h1>
                </span>
            </div>   
            
        </div>
    )
}