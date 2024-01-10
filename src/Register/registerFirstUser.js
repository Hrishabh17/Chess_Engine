import React, { useState, useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import ChessAnimation from './chessAnimation';
import { IoIosArrowRoundForward  } from "react-icons/io";
import { ChessExtraContext, ChessUtilsContext } from '../Context/context';

export default function RegisterFirstUser() {
    
    const {chessUtils} = useContext(ChessUtilsContext);
    const {chessExtra, setChessExtra} = useContext(ChessExtraContext);
    const isMobile = useMediaQuery({ query: '(max-width: 860px)' })

    const navigate = useNavigate()

    const [user, setUser] = useState({
        id: 'randomId',
        name: '',
        color: '',
    })

    const handleInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const registerUser = () => {
        if(user.name.trim().length === 0 || user.color.trim().length === 0) return;
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                setChessExtra({...chessExtra, selfName: user.name})
                navigate('/invite', {state: {roomId: data.roomId, player1Id: data.player1Id, player2Id: data.player2Id, player1Color: data.player1Color}}, {replace: true})
            })
            .catch(error => {
                console.log(error)
            })
    }

    return(
        <>
        {
            isMobile?(
                <>
                <div className='h-full w-[100vw] bg-white flex items-center justify-center select-none'>
                    <ChessAnimation/>
                    <div className={`flex flex-col items-center ml-3 justify-center w-[93vw] h-max ${chessUtils?.bg} z-10`}>
                        <div className={`flex flex-col items-center py-2 justify-start relative bg-white w-full h-full bottom-3 right-3 ${chessUtils?.border} border-4`}>
                            <h1 className={`font-[Monoton] ${chessUtils?.text} text-[200%]`}>8 X 8</h1>
                            <h1 className={`px-2 font-[CenturyGothic] ${chessUtils?.text} text-sm text-center font-bold mt-5`}>Click on Generate to create a new chess room</h1>
                            <div className='flex flex-row items-center justify-center w-4/5 h-max mt-10'>
                                <h1 className={`${chessUtils?.bg} text-white font-[Poppins] text-sm py-1 px-1 text-center w-1/3 ring-1 ${chessUtils?.ring}`}>Name</h1>
                                <input type='text' name='name' placeholder='Enter your name' className={`font-[Poppins] font-medium text-sm ring-1 ${chessUtils?.ring} text-[#212121] py-1 px-3 w-3/3 line-clamp-1 bg-slate-200 outline-none`} onChange={handleInputChange}/>
                            </div>
                            <span className={`py-2 w-[97%] bg-slate-200 mt-12 ${chessUtils?.text} font-[CenturyGothic] text-sm font-bold text-center`}>Choose Your Color</span>
                            <div className='flex flex-row items-center justify-center w-4/5 h-max mt-10'>
                                <div onClick={(e)=>setUser({...user, color:'white'})} className={`flex flex-row items-center justify-center w-1/2 h-max py-1 ${chessUtils?.bg} ring-1 ${chessUtils?.ring} gap-2 hover:w-full ${user.color==='white' ? "w-full" : ""} ease-in-out duration-500 delay-75 cursor-pointer`}>
                                    <img src='assets\bg_assets\pawn_white.png' alt='pawn' className='h-[30px] rotate-12 '/>
                                    <h1 className='font-[Holtwood] font-medium tracking-wider text-white text-sm py-3 text-left '>White</h1>
                                </div>
        
                                <div onClick={(e)=>setUser({...user, color:'black'})} className={`flex flex-row items-center justify-center w-1/2 h-max py-1 bg-white ring-1 ${chessUtils?.ring} gap-2 hover:w-full ${user.color==='black' ? "w-full" : ""} ease-in-out duration-500 delay-75 cursor-pointer`}>
                                    <h1 className='font-[Holtwood] font-medium tracking-wider text-black text-sm py-3 text-center'>Black</h1>
                                    <img src='assets\bg_assets\pawn_black.png' alt='pawn' className='h-[30px] -rotate-12'/>
                                </div>
                            </div>
                            <button onClick={registerUser} className={`ring-1 ${chessUtils?.ring} text-sm  text-center px-4 py-0 mt-6 mb-5 font-bold ${chessUtils?.text} hover:text-white ${chessUtils?.bgHover} ease-in-out duration-200 delay-75 flex flex-row items-center`}>Generate <IoIosArrowRoundForward  size={40}/> </button>
                        </div>  
                    </div>
                </div>
                </>
            ):(
                <div className="h-full w-full bg-[#ffffff] flex items-center justify-center select-none ">
                    <ChessAnimation/>    
                    <div className={`flex flex-col items-center justify-center w-1/3 h-max ${chessUtils?.bg} z-10`}>
                        <div className={`flex flex-col items-center py-2 justify-start relative bg-white w-full h-full bottom-5 right-5 ${chessUtils?.border} border-4`}>
                            <h1 className={`font-[Monoton] ${chessUtils?.text} text-[320%]`}>8 X 8</h1>
                            <h1 className={`font-[CenturyGothic] ${chessUtils?.text} text-lg lg:text-xl px-3 font-bold mt-5`}>Click on Generate to create a new chess room</h1>
                            <div className='flex flex-row items-center justify-center w-4/5 h-max mt-10'>
                                <h1 className={`${chessUtils?.bg} text-white font-[Poppins] text-lg py-3 px-10 text-center w-1/3 ring-1 ${chessUtils?.ring}`}>Name</h1>
                                <input type='text' name='name' placeholder='Enter your name' className={`font-[Poppins] font-medium text-lg ring-1 ${chessUtils?.ring} text-[#212121] py-3 px-5 w-2/3 line-clamp-1 bg-slate-200 outline-none`} onChange={handleInputChange}/>
                            </div>
                            <span className={`py-2 w-[97%] bg-slate-200 mt-12 ${chessUtils?.text} font-[CenturyGothic] text-lg font-bold text-center`}>Choose Your Color</span>
        
                            <div className='flex flex-row items-center justify-center w-4/5 h-max mt-10'>
                                <div onClick={(e)=>setUser({...user, color:'white'})} className={`flex flex-row items-center justify-center w-1/2 h-max py-1 ${chessUtils?.bg} ring-1 ${chessUtils?.ring} gap-3 hover:w-full ${user.color==='white' ? "w-full" : ""} ease-in-out duration-500 delay-75 cursor-pointer`}>
                                    <img src='assets\bg_assets\pawn_white.png' alt='pawn' className='h-[40px] rotate-12 '/>
                                    <h1 className='font-[Holtwood] font-medium tracking-wider text-white text-2xl py-3 text-left '>White</h1>
                                </div>
        
                                <div onClick={(e)=>setUser({...user, color:'black'})} className={`flex flex-row items-center justify-center w-1/2 h-max py-1 bg-white ring-1 ${chessUtils?.ring} gap-3 hover:w-full ${user.color==='black' ? "w-full" : ""} ease-in-out duration-500 delay-75 cursor-pointer`}>
                                    <h1 className='font-[Holtwood] font-medium tracking-wider text-black text-2xl py-3 text-center'>Black</h1>
                                    <img src='assets\bg_assets\pawn_black.png' alt='pawn' className='h-[40px] -rotate-12'/>
                                </div>
                            </div>
                            <button onClick={registerUser} className={`ring-1 ${chessUtils?.ring} text-xl  text-center px-10 py-1 mt-12 font-bold ${chessUtils?.text} hover:text-white ${chessUtils?.bgHover} ease-in-out duration-200 delay-75 flex flex-row items-center mb-4`}>Generate <IoIosArrowRoundForward  size={40}/> </button>
                        </div>
                    </div>
                    
                </div>
            )
        }
        </>
    )
}

