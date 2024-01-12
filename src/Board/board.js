import "./board.css";
import React, {useState, useEffect, useContext, useRef } from "react";
import { boardToFen, fenToBoard, generateLegalMoves, getPieceColor, reverseFen } from "./fenBoardLogic";
import socket from "../Socket/socket";
import { ChessContext, ChessExtraContext, ChessUtilsContext } from "../Context/context";
import { Dialog, Transition, Tab } from '@headlessui/react';
import { TiMessages } from "react-icons/ti";
import { FaWindowClose } from "react-icons/fa";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";      
import { RiSendPlaneFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { FaChess } from "react-icons/fa";
import { ChessLeftMessage, ChessRightMessage } from "./chessMessage";
import ChessAnimation from "../Register/chessAnimation";
import { motion, AnimatePresence } from 'framer-motion';
import VideoCall from "../VideoCall/videoCall";
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


function Board({isBlackBoardSet, playerId}) {
    
    const {roomId} = useParams();

    const {message, setMessage} = useContext(ChessContext);
    
    const piece_color = isBlackBoardSet ? "black" : "white";

    const [isBlackBoard, setIsBlackBoard] = useState(isBlackBoardSet); // [false, true] = [white, black]
    const [moveCount, setMoveCount] = useState(0);

    const [board, setBoard] = useState([]);
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    
    const [letters, setLetters] = useState(["a", "b", "c", "d", "e", "f", "g", "h"]);
    const [numbers, setNumbers] = useState([8, 7, 6, 5, 4, 3, 2, 1]);

    const [fromSquare, setFromSquare] = useState(null);
    const [toSquare, setToSquare] = useState(null);

    const [moves, setMoves] = useState([]);

    const [kingPosition, setKingPosition] = useState({white: "e1", black: "e8"});

    const {chessUtils, setChessUtils} = useContext(ChessUtilsContext);
    const {chessExtra, setChessExtra} = useContext(ChessExtraContext);
    const [unread, setUnread] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState({chat:false, movesHistory:false});
    const [chatMessage, setChatMessage] = useState("");
    const [chatMessageArray, setChatMessageArray] = useState([]); // [ {senderId: "randomId", message: "message"}, {senderId: "randomId", message: "message"} ]
    const [movesHistoryArray, setMovesHistoryArray] = useState([]); // [ {color: "black", from: "e4", to: "e6", piece: "knight", hasCaptured: true, captured: "queen"}, {color: "black", from: "e4", to: "e6", piece: "knight", hasCaptured: false, captured: ""} ]
    const [eliminatedPiecesArray, setEliminatedPiecesArray] = useState([]); // [ {color: "black", piece: "queen"}, {color: "white", piece: "knight"}
    const [showVideoMobile, setShowVideoMobile] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 860px)' })
    const [winner, setWinner] = useState();
    const [videoIsOpen, setVideoIsOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        eliminatedPiecesArray.find(piece => piece?.piece === "K") && setWinner("black");
        eliminatedPiecesArray.find(piece => piece?.piece === "k") && setWinner("white");
    }, [eliminatedPiecesArray])

    const saveToStorage = () => {
        let timeStamp = new Date().getTime();
        var dataToSend = {
            code: 800,
            messageId : "randomId",
            roomId: roomId,
            senderId: playerId,
            chessData: {
                moveHistory : movesHistoryArray,
                capturedPieces : eliminatedPiecesArray,
                moveCount : moveCount,
                timeStamp : timeStamp,
                fenString : isBlackBoard ? reverseFen(boardToFen(board)) : boardToFen(board)
            },
            timestamp: new Date().getTime()
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updateChessData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }

    const sendMessage = () => {
        if(chatMessage.trim() === "") return;
        socket.send(`/app/chat/${roomId}`, {
            code: 600,
            messageId : "randomId",
            roomId: roomId,
            senderId: playerId,
            message: {
                message: chatMessage
            },
            timestamp: new Date().getTime()
        })
        setChatMessage("");    
    };

    const handleMessageChange = (e) => {
        setChatMessage(e.target.value);
    }

    const handleKeyPressMessage = (e) => {
        if(e.key === "Enter"){
            sendMessage();
        }
    }

    const chatContainerRef = useRef(null);
    const movesHistoryContainerRef = useRef(null);


    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const scrollToBottomMovesHistory = () => {
        if (movesHistoryContainerRef.current) {
            movesHistoryContainerRef.current.scrollTop = movesHistoryContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
        setUnread(true);
    }, [chatMessageArray]);

    useEffect(() => {
        scrollToBottomMovesHistory();
    }, [movesHistoryArray]);

    useEffect(() => {
        if(isBlackBoard === false){
            setBoard(fenToBoard(fen));
        }
        else{
            setNumbers([1, 2, 3, 4, 5, 6, 7, 8]);
            const reversedFenString = reverseFen(fen);
            setBoard(fenToBoard(reversedFenString));
        }
    }, [isBlackBoard, fen]);

    useEffect(() => {
        if(fromSquare === null) return;

        if(fromSquare !== null){
            const moves = generateLegalMoves(board, fromSquare, numbers, letters, kingPosition, piece_color)

            if(moves !== undefined){
                setMoves(moves);
            }
        }

        if(toSquare === null) return;
        if(moves.includes(toSquare) === false) return;
        if(fromSquare === toSquare) return;

        const piece = getPieceAtSquare(fromSquare);

        if(piece?.toLowerCase() === "k"){
            setKingPosition({...kingPosition, [getPieceColor(piece)]: toSquare});
        }

        movePiece(fromSquare, toSquare)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fromSquare, toSquare]);


    const getPieceImage = (piece) => {
        const color = piece === piece.toUpperCase() ? "white" : "black";
        const type = piece.toLowerCase();
        if (type === "p") return `${process.env.PUBLIC_URL}/assets/chess_pieces/pawn_${color}.png`;
        if (type === "r") return `${process.env.PUBLIC_URL}/assets/chess_pieces/rook_${color}.png`;
        if (type === "n") return `${process.env.PUBLIC_URL}/assets/chess_pieces/knight_${color}.png`;
        if (type === "b") return `${process.env.PUBLIC_URL}/assets/chess_pieces/bishop_${color}.png`;
        if (type === "q") return `${process.env.PUBLIC_URL}/assets/chess_pieces/queen_${color}.png`;
        if (type === "k") return `${process.env.PUBLIC_URL}/assets/chess_pieces/king_${color}.png`;
    };

    const handlePieceClick = (e) => {
        const square_id = e.target.id;

        if(getPieceAtSquare(square_id) !== null){
            if(getPieceColor(getPieceAtSquare(square_id)) === piece_color){
                if(piece_color === "white" && moveCount % 2 !== 0) return;
                if(piece_color === "black" && moveCount % 2 === 0) return;
            }
        }

        if(fromSquare === square_id) {
            setFromSquare(null);
            setMoves([]);
        }
        else{
            if(fromSquare === null){
                if(getPieceAtSquare(square_id) === null) return;
                if(isBlackBoard && getPieceColor(getPieceAtSquare(square_id)) === "white") return;
                if(isBlackBoard === false && getPieceColor(getPieceAtSquare(square_id)) === "black") return;
                setFromSquare(square_id);
            }
            else{
                if(getPieceAtSquare(square_id) !== null && getPieceColor(getPieceAtSquare(square_id)) === getPieceColor(getPieceAtSquare(fromSquare))){
                    setFromSquare(square_id);
                    return;
                }
                setToSquare(square_id);
            }
        }
    }

    const getPieceAtSquare = (square_id) => {
        const row = numbers.indexOf(parseInt(square_id[1]));
        const col = letters.indexOf(square_id[0]);
        return board[row][col];
    }

    const movePiece = (from, to) => {
        const from_row = numbers.indexOf(parseInt(from[1]));
        const from_col = letters.indexOf(from[0]);
        const to_row = numbers.indexOf(parseInt(to[1]));
        const to_col = letters.indexOf(to[0]);

        if (board && board[from_row] && board[from_row][from_col]) {
            const piece = board[from_row][from_col];

            const piece_color = getPieceColor(piece);
            const hasCaptured = board[to_row][to_col] !== null;
            const captured = board[to_row][to_col];
            addMoveToMovesHistory(piece_color, from, to, piece, hasCaptured, captured);

            if(captured !== null){
                const capturedPieceColor = getPieceColor(captured);
                if(captured === "K" || captured === "k"){
                    setWinner(capturedPieceColor === "white" ? "black" : "white");
                }
                setEliminatedPiecesArray([...eliminatedPiecesArray, {color: capturedPieceColor, piece: captured}]);
            }

            const newBoard = [...board];
            newBoard[from_row][from_col] = null;
            newBoard[to_row][to_col] = piece;
            setBoard(newBoard);
        }
        
        setMoveCount(moveCount + 1);
        
        var messageToSend = {
            code: 200,
            messageId : "randomId",
            roomId: roomId,
            senderId: playerId,
            message: {
                to: to,
                from: from
            },
            timestamp: new Date().getTime()
        }
        socket.send(`/app/move/${roomId}`, messageToSend);

        setFromSquare(null);
        setToSquare(null);
        setMoves([]);
        saveToStorage();
    }

    const addMoveToMovesHistory = (piece_color, from, to, piece, hasCaptured, captured) => {
        const move = {color: piece_color, from: from, to: to, piece: piece, hasCaptured: hasCaptured, captured: captured};
        setMovesHistoryArray([...movesHistoryArray, move]);
    }

    const movePieceFromOpponent = (from, to, senderId) => {
        const from_row = numbers.indexOf(parseInt(from[1]));
        const from_col = letters.indexOf(from[0]);
        const to_row = numbers.indexOf(parseInt(to[1]));
        const to_col = letters.indexOf(to[0]);

        if (board && board[from_row] && board[from_row][from_col]) {
            const piece = board[from_row][from_col];

            const piece_color = getPieceColor(piece);
            const hasCaptured = board[to_row][to_col] !== null;
            const captured = board[to_row][to_col];
            addMoveToMovesHistory(piece_color, from, to, piece, hasCaptured, captured);

            if(captured !== null){
                const capturedPieceColor = getPieceColor(captured);
                if(captured === "K" || captured === "k"){
                    setWinner(capturedPieceColor === "white" ? "black" : "white");
                }
                setEliminatedPiecesArray([...eliminatedPiecesArray, {color: capturedPieceColor, piece: captured}]);
            }

            const newBoard = [...board];
            newBoard[from_row][from_col] = null;
            newBoard[to_row][to_col] = piece;
            setBoard(newBoard);
        }
        
        setFromSquare(null);
        setToSquare(null);
        setMoves([]);
        if(senderId !== playerId){
            setMoveCount(moveCount + 1);
        }
        saveToStorage();
    }

    useEffect(() => {
        if(message?.code === 200){
            movePieceFromOpponent(message?.from, message?.to, message?.senderId)
        }
        else if(message?.code === 600){
            setChatMessageArray([...chatMessageArray, {senderId: message?.senderId, message: message?.message}])
            if(isCollapsed){
                setIsCollapsed(false);
            }
        }
    }, [message]);


    const getAndSendData = () => {
        socket.socket_client.onConnect = () => {
            socket.subscribe(`/topic/${roomId}`, (socket_data) => {
                const parsedData = JSON.parse(socket_data?.body);
        
                const code = parsedData?.code;
        
                // for start game
                if(code === 100){
                  const { senderId, message } = parsedData;
                  if(senderId!==playerId && senderId !== 'server' && senderId !== undefined && senderId !== null && senderId !== ""){
                    setChessExtra({...chessExtra, shouldSendAck:false})
                  }
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
        }


        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getChessData/${roomId}`, {}).then(res => res.json()).then(data => {
            console.log(data)
            const {player1, player2} = data;
            if(player1?.id === playerId){
                setChessExtra({...chessExtra, opponentName: player2?.name, selfName: player1?.name})
            }
            else{
                setChessExtra({...chessExtra, opponentName: player1?.name, selfName: player2?.name})
            }
            if(data?.chessData === null) return;
            const {moveHistory, capturedPieces, moveCount, fenString} = data?.chessData;   
            if(fenString !== ""){
                setFen(fenString);
            }

            if(player1?.id === playerId){
                if(player1?.color === "black"){
                    setIsBlackBoard(true);
                }
                else{
                    setIsBlackBoard(false);
                }
            }
            else{
                if(player2?.color === "black"){
                    setIsBlackBoard(true);
                }
                else{
                    setIsBlackBoard(false);
                }
            }

            setMoveCount(moveCount);
            setMovesHistoryArray(moveHistory);
            setEliminatedPiecesArray(capturedPieces);   
        })
    }

    const handleReconnectAndNameFetch = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getChessData/${roomId}`, {}).then(res => res.json()).then(data => {
            console.log(data)
            const {player1, player2} = data;
            if(player1?.id === playerId){
                setChessExtra({...chessExtra, opponentName: player2?.name, selfName: player1?.name})
            }
            else{
                setChessExtra({...chessExtra, opponentName: player1?.name, selfName: player2?.name})
            }
            if(data?.chessData === null) return;
            const {moveHistory, capturedPieces, moveCount, fenString} = data?.chessData;   
            if(fenString !== ""){
                setFen(fenString);
            }

            if(player1?.id === playerId){
                if(player1?.color === "black"){
                    setIsBlackBoard(true);
                }
                else{
                    setIsBlackBoard(false);
                }
            }
            else{
                if(player2?.color === "black"){
                    setIsBlackBoard(true);
                }
                else{
                    setIsBlackBoard(false);
                }
            }

            setMoveCount(moveCount);
            setMovesHistoryArray(moveHistory);
            setEliminatedPiecesArray(capturedPieces);      
        })
    }

    useEffect(() => {
        if(chessExtra?.shouldSendAck === false) return;

        const sendAck = () => {
            socket.send(`/app/ack/${roomId}`, {
                code: 100,
                messageId: "randomId",
                roomId: roomId,
                senderId: playerId,
                message: {
                    message: "Start Game"
                },
                timestamp: new Date().getTime(),
            });
        };

        if (socket?.socket_client?.connected && chessExtra?.shouldSendAck) {
            sendAck()             
        }
    }, [chessExtra?.shouldSendAck, socket?.socket_client?.onChangeState]);

    useEffect(() => {
        if(socket?.socket_client?.connected){
            if(chessExtra?.opponentName === ""){
                handleReconnectAndNameFetch();
            }
        }
    }, [socket?.socket_client?.onChangeState, chessExtra?.opponentName])

    useEffect(()=>{
        setChessExtra({...chessExtra, shouldSendAck:true})
        getAndSendData();
    }, [])

    const openModal = () => {
      setIsOpen(true);
      setUnread(false);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    const closeMobileVideo = () => {
        setVideoIsOpen(false);
    };

    useEffect(() => {
        if(chessExtra?.call){
            setVideoIsOpen(true);
        }else if(chessExtra?.call === false){
            setVideoIsOpen(false);
        }
    }, [chessExtra?.call])

    useEffect(()=>{
        console.log(winner)
    }, [winner])

    return (
        <>
        {
            winner !== null && 
            <div id='popup' className="fixed inset-0 z-10 overflow-y-auto select-none">
                <button className="fixed inset-0 w-full h-full bg-black opacity-70"></button>
                <div className="flex items-center min-h-screen px-4 py-8 text-white ">
                    
                    <div className={`box-shadow-5-white relative w-full max-w-lg tablet:p-4 mobile:p-2 mx-auto shadow-lg ${chessUtils.bg}`}>
                        <div className='flex flex-col items-start justify-center gap-4'>
                            <div className="flex flex-row items-center justify-center mx-auto w-full gap-8">
                                {(isBlackBoard && winner === 'black' || !isBlackBoard && winner==='white') && <h1 className={`border-b-[1px] font-[Poppins] tablet:text-[1.3rem] py-2 px-3 font-medium`}>Winner</h1> }
                                {(!isBlackBoard && winner === 'black' || isBlackBoard && winner==='white') && <h1 className={`border-b-[1px] font-[Poppins] tablet:text-[1.3rem] py-2 px-3 font-medium`}>Hard Luck</h1>}
                            </div>
                            <div className="flex flex-row items-center justify-center mx-auto w-full gap-8 mb-4">
                                {(isBlackBoard && winner === 'black' || !isBlackBoard && winner==='white') && <h1 className='font-[Poppins] font-medium tablet:text-[0.8rem] mobile:text-[0.6rem] text-center px-2'>You truly are a champion!!</h1>}
                                {(!isBlackBoard && winner === 'black' || isBlackBoard && winner==='white') && <h1 className='font-[Poppins] font-medium tablet:text-[0.8rem] mobile:text-[0.6rem] text-center px-2'>You can always come back and lead the way!!</h1>}
                            </div>
                        
                        </div>
                        {/* <div className='flex flex-row items-center justify-center gap-8 tablet:py-3 tablet:px-2 mobile:p-1'>
                            <button id='clickOK' onClick={()=>setModalVisibility(false)} className={`hover:cursor-pointer font-[Poppins] ${theme==='dark'?'link-underline-black':'link-underline-white font-medium'} link link-underline w-1/4 mt-2 py-1 text-[10px] md:text-sm font-medium rounded-lg`}>Close</button>
                        </div> */}
                    </div>

                </div>
            </div>
        }

        {isMobile?(
            <div className="w-screen flex flex-col items-center h-max font-[Athiti] bg-white select-none overflow-clip">
                <h1 className={`mt-8 text-[3rem] font-[Monoton] font-medium z-10 top-8 bg-white h-max ${chessUtils.text}`}>8 X 8</h1>

                <button
                    onClick={openModal}
                    className={`fixed bottom-4 right-4 flex items-center justify-center w-16 h-16 ${chessUtils.bg} rounded-md shadow-2xl shadow-black`}
                >
                    {
                        unread?(                    <div className="relative h-full w-full ">
                        <div className="absolute bg-red-600 h-4 w-4 right-0 -mr-1 -mt-1 rounded-full"></div>
                    </div>):(null)
                    }

                    
                    <TiMessages size={36} className={`text-white absolute`}/>
                </button>

                <Transition appear show={isOpen} as={React.Fragment}>
                    <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                    >
                    <div className="min-h-screen px-4 text-center">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                        >
                        &#8203;
                        </span>

                        <div className="inline-block w-full w-3xl h-[70vh] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl pb-10">
                        <div className="w-full flex justify-between align-center">
                            <div className={`${chessUtils?.text} font-[CenturyGothic] text-[1.3rem] font-bold text-clip`}>{chessExtra?.opponentName}</div>
                            <div className="flex space-x-4">
                            <div onClick={(e)=>{e.stopPropagation(); setChessExtra({...chessExtra, call:true});}} className={`${chessUtils?.bg} flex justify-center align-center p-2 rounded-md`}>
                                <FaVideo size={24} className={`text-white`} />
                            </div>
                            <div className={`${chessUtils?.bg} flex justify-center align-center px-1 rounded-md`}>
                                <IoClose size={36} className={`text-white`} onClick={closeModal}/>
                            </div>
                            </div>
                        </div>
                        <Dialog.Description
                            as="p"
                            className="text-sm text-gray-500 border-2 border-black h-[80%]"
                        >
                            <div ref={chatContainerRef} className="flex flex-col items-center h-[100%] bg-white w-full mb-2 py-2 overflow-y-scroll">
                                {
                                    chatMessageArray.length === 0 ?
                                        <h1 className="text-black font-[Athiti] mt-4 bg-slate-300 px-4 py-1 text-md rounded-md">No messages yet...</h1>
                                        :
                                    chatMessageArray.map((msg, index)=>(
                                        msg.senderId === playerId ? 
                                        <ChessRightMessage key={index} message={msg.message} />
                                            : 
                                        <ChessLeftMessage key={index} message={msg.message} />

                                    ))
                                }
                            </div>
                            <div className="mt-6 flex flex-row items-center justify-between w-full h-[8%] bg-white">
                                <input onKeyDown={handleKeyPressMessage} onChange={handleMessageChange} name="chatMessage" value={chatMessage} placeholder={"Type a message..."} className={`placeholder:text-slate-400 font-semibold text-lg h-full bg-white w-full px-4 outline-none border-2 ${chessUtils?.border}`} autoComplete={"off"}></input>
                                <div className={`${chessUtils?.bg} flex justify-center items-center px-4 h-full`}>
                                    <IoSend onClick={sendMessage} size={24} className={`text-white cursor-pointer`}/>
                                </div>
                            </div>
                        </Dialog.Description>
                        </div>
                    </div>
                    </Dialog>
                </Transition>

                {/* <Transition appear show={videoIsOpen} as={React.Fragment}>
                    <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeMobileVideo}
                    >
                    <div className="min-h-screen px-4 text-center">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                        >
                        &#8203;
                        </span>

                        <div className="inline-block w-full w-3xl h-[70vh] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <div className="w-full flex justify-end items-center">
                            <div className={`${chessUtils?.bg} flex justify-center align-center px-1 rounded-md`}>
                                <IoClose size={36} className={`text-white`} onClick={closeMobileVideo}/>
                            </div>
                        </div>
                        <Dialog.Description
                            as="p"
                            className="text-sm text-gray-500 h-[100%]"
                        >
                            <VideoCall mobile={false} roomId={roomId} playerId={playerId}/>
                        </Dialog.Description>
                        </div>
                    </div>
                    </Dialog>
                </Transition> */}

                <div className={`min-h-screen h-[100%] z-20 absolute bg-black bg-opacity-50 w-screen flex justify-center items-center ${chessExtra?.call ? "":"hidden"}`}>
                    <VideoCall mobile={false} roomId={roomId} playerId={playerId}/>
                </div>

                {/* Chess Board UI start here */}
                <div className="mt-10 flex flex-col justify-center items-center mx-2">
                    <div className={`grid grid-cols-8 h-[100%] w-[100%] ring-[4px] rounded-sm ring-black font-semibold bg-[#f3f3f3] z-10`}>
                        {board.map((row, rowIndex) =>
                            row.map((piece, colIndex) => (
                                <motion.div
                                    onClick={handlePieceClick}
                                    id={`${letters[colIndex]}${numbers[rowIndex]}`}
                                    key={`${letters[colIndex]}${numbers[rowIndex]}`}
                                    className={`flex flex-col items-center justify-center w-[3rem] h-[3rem]
                                        ${fromSquare === `${letters[colIndex]}${numbers[rowIndex]}` ? "bg-yellow-400" : ""}
                                        ${moves.includes(`${letters[colIndex]}${numbers[rowIndex]}`) ? ((rowIndex + colIndex) % 2 === 0 ? "bg-[#f0d860] cursor-pointer" : "bg-[#d4b727] cursor-pointer") : ""}
                                        ${fromSquare !== `${letters[colIndex]}${numbers[rowIndex]}` && !moves.includes(`${letters[colIndex]}${numbers[rowIndex]}`) ? ((rowIndex + colIndex) % 2 === 0 ? chessUtils?.text : `${chessUtils?.chessBg} text-white`) : ""}
                                    `}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {piece && 
                                        <motion.img
                                            onMouseDown={(e) => {e.preventDefault()}}
                                            id={`${letters[colIndex]}${numbers[rowIndex]}`}
                                            key={`${letters[colIndex]}${numbers[rowIndex]}`}
                                            src={getPieceImage(piece)}
                                            className={`
                                                h-[80%] w-[80%]
                                                ${isBlackBoard && getPieceColor(piece) === "black" ? "cursor-pointer" : ""}
                                                ${!isBlackBoard && getPieceColor(piece) === "white" ? "cursor-pointer" : ""}
                                            `}
                                            alt={`${letters[colIndex]}${numbers[rowIndex]}_piece`}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    }
{/* 
                                    {colIndex === 0 && <span className="absolute left-1 h-3 w-3 font-[Poppins] font-semibold text-sm">{numbers[rowIndex]}</span>}

                                    {rowIndex === 7 && <span className="absolute bottom-[7px] ml-1 h-3 w-3 font-[Poppins] font-semibold text-sm">{letters[colIndex]}</span>} */}
                                </motion.div>
                            ))    
                        )}
                    </div>
                    </div>

                    <div className="-mt-8 w-full max-w-md px-2 py-16 sm:px-0">
                        <Tab.Group>
                            <Tab.List className={`flex space-x-1 rounded-xl ${chessUtils?.bg} p-1`}>
                            <Tab
                            className={({ selected }) =>
                                classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                'ring-white/60 focus:outline-none focus:ring-2',
                                selected
                                    ? `bg-white ${chessUtils?.text} shadow font-[CenturyGothic] font-bold text-md`
                                    : 'text-white hover:text-white font-[CenturyGothic] font-bold text-mds'
                                )
                            }
                            >
                            Moves History
                            </Tab>
                            <Tab
                            className={({ selected }) =>
                                classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                'ring-white/60 focus:outline-none focus:ring-2',
                                selected
                                    ? `bg-white ${chessUtils?.text} shadow font-[CenturyGothic] font-bold text-md`
                                    : 'text-white hover:text-white font-[CenturyGothic] font-bold text-mds'
                                )
                            }
                            >
                            Chess Pieces
                            </Tab>
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                            <Tab.Panel
                            className={classNames(
                                'rounded-xl bg-white p-3',
                                `h-[30vh] ring-white/60 border-2 ${chessUtils?.border} focus:outline-none focus:ring-2 flex flex-col items-center overflow-y-scroll`
                            )}
                            >
                                {
                                    movesHistoryArray.length === 0 ?
                                        <h1 className="text-black font-[Athiti] font-semibold mt-2 bg-slate-300 px-4 py-1 text-md rounded-md">No moves yet...</h1>
                                        :
                                        movesHistoryArray.map((move, index) => {
                                            
                                            if(index % 2 == 0){
                                                
                                                let whiteMove = movesHistoryArray[index];
                                                let blackMove = movesHistoryArray[index+1];

                                                return (
                                                    <motion.div layout key={index} className="grid grid-cols-5 place-items-center w-full h-8 first:mt-2 mb-3">
                                                        <motion.div className="col-span-1 flex items-center justify-end h-8">
                                                            <h1 className="text-black font-[CenturyGothic] font-semibold px-4 text-md self-end">{index/2+1}.</h1>
                                                        </motion.div>
                                            
                                                        {whiteMove && (
                                                            <motion.div className="col-span-2 flex items-center justify-end h-8 gap-2">
                                                                <motion.img className="h-8 w-8" src={getPieceImage(whiteMove.piece)} alt={`${whiteMove.piece}_piece`} />
                                                                <h1 className="text-black font-[CenturyGothic] font-semibold text-md self-end">{whiteMove.to}</h1>
                                                            </motion.div>
                                                        )}
                                            
                                                        {blackMove && (
                                                            <motion.div className="col-span-2 flex items-center justify-end h-8 gap-2">
                                                                <motion.img className="h-8 w-8" src={getPieceImage(blackMove.piece)} alt={`${blackMove.piece}_piece`} />
                                                                <h1 className="text-black font-[CenturyGothic] font-semibold text-md self-end">{blackMove.to}</h1>
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                );
                                            }
                                            else{
                                                return null;
                                            }
                                        })
                                }
                            </Tab.Panel>
                            <Tab.Panel
                            className={classNames(
                                'rounded-xl bg-white p-3',
                                `h-[30vh] ring-white/60 border-2 ${chessUtils?.border} focus:outline-none focus:ring-2`
                            )}
                            >
                                <div>
                                    <div className="flex flex-wrap items-start justify-start w-[95%] h-[45%] mx-auto p-2 overflow-y-scroll mt-4">
                                        {
                                            eliminatedPiecesArray.filter(piece => piece?.color === 'white').map((piece, index) => (
                                                <motion.img
                                                    key={index}
                                                    src={getPieceImage(piece.piece)}
                                                    className={`h-10 w-10`}
                                                    alt={`${piece.piece}_piece`}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            ))
                                        }
                                    </div>

                                    <div className="flex flex-wrap items-start justify-start w-[95%] h-[50%] mx-auto p-2 overflow-y-scroll">
                                        {
                                            eliminatedPiecesArray.filter(piece => piece?.color === 'black').map((piece, index) => (
                                                <motion.img
                                                    key={index}
                                                    src={getPieceImage(piece.piece)}
                                                    className={`h-10 w-10`}
                                                    alt={`${piece.piece}_piece`}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
            </div>
        ):(
            <div className="flex flex-col justify-center items-center h-screen font-[Athiti] bg-white overflow-clip select-none">

            <ChessAnimation />

            {/* <h1 className={`text-[60px] font-[Monoton] font-medium absolute z-10 top-5 bg-white h-max ${chessUtils.text}`}>8 X 8</h1> */}

            {/* Chat and video call UI start here */}

            
            <div className={`rounded-sm flex flex-row items-start absolute top-2 right-10 justify-between self-end h-[27%] w-[25%] gap-5 ${chessUtils?.bg} ${chessExtra?.call ? "":"hidden"}`}>
                <VideoCall mobile={false} roomId={roomId} playerId={playerId}/>
            </div>
            

            <AnimatePresence>
            {
                isCollapsed?.chat && <motion.div
                key="collapsed"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '6%' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 1, ease: 'easeInOut', type: "tween" }}
                className={`flex flex-row items-start fixed bottom-0 right-10 justify-between self-end h-[6%] w-[25%] gap-5 ${chessUtils?.bg} select-none rounded-t-sm`}
                >
                <div onClick={()=>setIsCollapsed({...isCollapsed, chat:false})}  className="flex flex-row items-center justify-between h-full w-full px-4 cursor-pointer">
                        <span className="h-1 w-10 bg-white absolute left-[50%] top-2 rounded-md"></span>
                        <div className="flex flex-row items-center justify-start gap-4">
                            <IoPersonSharp className={`text-[23px] text-white`} />
                            <h1 className="text-white font-[CenturyGothic] font-semibold text-sm">{chessExtra?.opponentName}</h1>
                        </div>
                        <PiPhoneCallFill className={`text-[23px] text-white`} />
                    </div>
                </motion.div>
            }
  
            {
                !isCollapsed?.chat && <motion.div
                    key="expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '70%' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut', type: "tween" }}
                    className={`flex flex-row items-start fixed bottom-0 right-10 justify-between self-end h-[6%] w-[25%] gap-5 ${chessUtils?.bg} select-none rounded-t-sm`}
                >
                    <div className="flex flex-col items-center justify-start h-full w-[95%] mx-auto">
                        
                        <div onClick={()=>setIsCollapsed({...isCollapsed, chat:true})} className="cursor-pointer flex flex-row items-center justify-between h-[8%] w-full px-4">
                            <span className="h-1 w-10 bg-white absolute left-[50%] top-2 rounded-md"></span>
                            <div className="flex flex-row items-center justify-start gap-4">
                                <IoPersonSharp className={`text-[23px] text-white`} />
                                <h1 className="text-white font-[CenturyGothic] font-semibold text-sm">{chessExtra?.opponentName}</h1>
                            </div>
                            <PiPhoneCallFill onClick={(e)=>{e.stopPropagation(); setChessExtra({...chessExtra, call:true})}} className={`text-[23px] text-white cursor-pointer`} />
                        </div>

                        <div ref={chatContainerRef} className="flex flex-col items-center h-[82%] bg-white w-full mb-4 py-2 overflow-y-scroll">
                            {
                                chatMessageArray.length === 0 ?
                                    <h1 className="text-black font-[Athiti] font-semibold mt-4 bg-slate-300 px-4 py-1 text-md rounded-md">No messages yet...</h1>
                                    :
                                chatMessageArray.map((msg, index)=>(
                                    msg.senderId === playerId ? 
                                    <ChessRightMessage key={index} message={msg.message} />
                                        : 
                                    <ChessLeftMessage key={index} message={msg.message} />

                                ))
                            }
                        </div>

                        <div className="flex flex-row items-center justify-between w-full h-[8%] bg-white mb-4 px-4">
                            <input onKeyDown={handleKeyPressMessage} onChange={handleMessageChange} name="chatMessage" value={chatMessage} placeholder={"Type a message..."} className="placeholder:text-slate-400 font-semibold text-lg h-full bg-white w-full outline-none" autoComplete={"off"}></input>
                            <RiSendPlaneFill onClick={sendMessage} size={35} className={`${chessUtils?.text} cursor-pointer`}/>
                        </div>
                    </div>
                </motion.div>
            }
            </AnimatePresence>

            {/* Chat and video call UI end here */}

            {/* Chess Board UI start here */}
            <div className={`grid grid-cols-8 h-[800px] w-[800px] ring-[4px] rounded-sm ring-black scale-[80%] font-semibold bg-[#f3f3f3]`}>
                {board.map((row, rowIndex) =>
                    row.map((piece, colIndex) => (
                        <motion.div
                            onClick={handlePieceClick}
                            id={`${letters[colIndex]}${numbers[rowIndex]}`}
                            key={`${letters[colIndex]}${numbers[rowIndex]}`}
                            className={`flex flex-col items-center justify-center w-[100px] h-[100px]  
                                ${fromSquare === `${letters[colIndex]}${numbers[rowIndex]}` ? "bg-yellow-400" : ""}
                                ${moves.includes(`${letters[colIndex]}${numbers[rowIndex]}`) ? ((rowIndex + colIndex) % 2 === 0 ? "bg-[#f0d860] cursor-pointer" : "bg-[#d4b727] cursor-pointer") : ""}
                                ${fromSquare !== `${letters[colIndex]}${numbers[rowIndex]}` && !moves.includes(`${letters[colIndex]}${numbers[rowIndex]}`) ? ((rowIndex + colIndex) % 2 === 0 ? chessUtils?.text : `${chessUtils?.chessBg} text-white`) : ""}
                            `}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {piece && 
                                <motion.img
                                    onMouseDown={(e) => {e.preventDefault()}}
                                    id={`${letters[colIndex]}${numbers[rowIndex]}`}
                                    key={`${letters[colIndex]}${numbers[rowIndex]}`}
                                    src={getPieceImage(piece)}
                                    className={`
                                        h-20 w-20
                                        ${isBlackBoard && getPieceColor(piece) === "black" ? "cursor-pointer" : ""}
                                        ${!isBlackBoard && getPieceColor(piece) === "white" ? "cursor-pointer" : ""}
                                    `}
                                    alt={`${letters[colIndex]}${numbers[rowIndex]}_piece`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            }

                            {colIndex === 0 && <span className="absolute left-1 mb-20 h-3 w-3 font-[Poppins] font-semibold text-sm">{numbers[rowIndex]}</span>}

                            {rowIndex === 7 && <span className="absolute bottom-[7px] ml-1 h-3 w-3 font-[Poppins] font-semibold text-sm">{letters[colIndex]}</span>}
                        </motion.div>
                    ))    
                )}
            </div>

            {/* Chess Board UI end here */}

            {/* Chess Moves History UI start here */}

            <AnimatePresence>
            {
                isCollapsed?.movesHistory && <motion.div
                key="collapsed"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '6%' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 1, ease: 'easeInOut', type: "tween" }}
                className={`flex flex-row items-start fixed bottom-0 left-10 justify-between self-end h-[6%] w-[18%] gap-5 ${chessUtils?.bg} select-none rounded-t-sm`}
                >
                <div onClick={()=>setIsCollapsed({...isCollapsed, movesHistory:false})} className="cursor-pointer flex flex-row items-center justify-between h-full w-full px-4">
                        <span className="h-1 w-10 bg-white absolute left-[45%] top-2 rounded-md"></span>
                        <div className="flex flex-row items-center justify-start gap-4">
                            <FaChess className={`text-[23px] text-white`} />
                            <h1 className="text-white font-[CenturyGothic] font-semibold text-sm">Moves History</h1>
                        </div>
                        <FaChess className={`text-[23px] text-white`} />
                    </div>
                </motion.div>
            }

            {
                !isCollapsed?.movesHistory && <motion.div
                    key="expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '70%' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 1, ease: 'easeInOut', type: "tween" }}
                    className={`flex flex-row items-start fixed bottom-0 left-10 justify-between self-end h-[6%] w-[18%] gap-5 ${chessUtils?.bg} select-none rounded-t-sm`}
                >
                    <div className="flex flex-col items-center justify-start h-full w-[95%] mx-auto">
                        
                            <div onClick={()=>setIsCollapsed({...isCollapsed, movesHistory:true})} className="cursor-pointer flex flex-row items-center justify-between h-[8%] w-full px-4">
                                <span className="h-1 w-10 bg-white absolute left-[45%] top-2 rounded-md"></span>
                                <div className="flex flex-row items-center justify-start gap-4">
                                    <FaChess className={`text-[23px] text-white`} />
                                    <h1 className="text-white text-center font-[CenturyGothic] font-semibold text-sm">Moves History</h1>
                                </div>
                                <FaChess onClick={()=>setChessUtils({...chessUtils, call:true})} className={`text-[23px] text-white cursor-pointer`} />
                            </div>

                            <div ref={movesHistoryContainerRef} className="flex flex-col items-center h-[88%] bg-white w-full mb-4 py-2 overflow-y-scroll">
                                {
                                    movesHistoryArray.length === 0 ?
                                        <h1 className="text-black font-[Athiti] font-semibold mt-4 bg-slate-300 px-4 py-1 text-md rounded-md">No moves yet...</h1>
                                        :
                                        movesHistoryArray.map((move, index) => {
                                            
                                            if(index % 2 == 0){
                                                
                                                let whiteMove = movesHistoryArray[index];
                                                let blackMove = movesHistoryArray[index+1];

                                                return (
                                                    <motion.div layout key={index} className="grid grid-cols-5 place-items-center w-full h-8 first:mt-4">
                                                        <motion.div className="col-span-1 flex items-center justify-end h-8">
                                                            <h1 className="text-black font-[CenturyGothic] font-semibold px-4 text-md self-end">{index/2+1}.</h1>
                                                        </motion.div>
                                            
                                                        {whiteMove && (
                                                            <motion.div className="col-span-2 flex items-center justify-end h-8 gap-2">
                                                                <motion.img className="h-8 w-8" src={getPieceImage(whiteMove.piece)} alt={`${whiteMove.piece}_piece`} />
                                                                <h1 className="text-black font-[CenturyGothic] font-semibold text-md self-end">{whiteMove.to}</h1>
                                                            </motion.div>
                                                        )}
                                            
                                                        {blackMove && (
                                                            <motion.div className="col-span-2 flex items-center justify-end h-8 gap-2">
                                                                <motion.img className="h-8 w-8" src={getPieceImage(blackMove.piece)} alt={`${blackMove.piece}_piece`} />
                                                                <h1 className="text-black font-[CenturyGothic] font-semibold text-md self-end">{blackMove.to}</h1>
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                );
                                            }
                                            else{
                                                return null;
                                            }
                                        })
                                }
                            </div>

                        </div>
                    </motion.div>
            }
            </AnimatePresence>

            {/* Chess Moves History UI end here */}


            {/* Chess Eliminated Pieces UI start here */}
            <div className={`rounded-sm flex flex-col items-start absolute top-2 left-10 justify-between self-end h-[27%] w-[18%] gap-5 ${chessUtils?.bg}`}>
                <span className="h-1 w-10 bg-white absolute left-[45%] top-2 rounded-md"></span>

                <div className="flex flex-wrap items-start justify-start w-[95%] h-[45%] mx-auto p-2 overflow-y-scroll mt-4">
                    {
                        eliminatedPiecesArray.filter(piece => piece?.color === 'white').map((piece, index) => (
                            <motion.img
                                key={index}
                                src={getPieceImage(piece.piece)}
                                className={`h-10 w-10`}
                                alt={`${piece.piece}_piece`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        ))
                    }
                </div>

                <div className="flex flex-wrap items-start justify-start w-[95%] h-[50%] mx-auto p-2 overflow-y-scroll">
                    {
                        eliminatedPiecesArray.filter(piece => piece?.color === 'black').map((piece, index) => (
                            <motion.img
                                key={index}
                                src={getPieceImage(piece.piece)}
                                className={`h-10 w-10`}
                                alt={`${piece.piece}_piece`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        ))
                    }
                </div>
            </div>

            {/* Chess Eliminated Pieces UI end here */}

        </div>
        )}
        </>
    );
}

export default Board;