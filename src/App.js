import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Playground from './Playground/playground';
import Invite from './Invite/invite';
import RegisterFirstUser from './Register/registerFirstUser';
import socket from './Socket/socket';
import RegisterSecondUser from './Register/registerSecondUser';
import {ChessContext, ChessExtraContext, ChessUtilsContext} from './Context/context';
import NewHome from './NewHome/newHome';
import NotFound from './404';
import NewLobby from './Register/lobby';


function App() {
  const [message, setMessage] = useState(null)
  const [chessUtils, setChessUtils] = useState()
  const [chessExtra, setChessExtra] = useState({ call:false, selfName:"", opponentName:"", shouldSendAck:true})

  useEffect(() => {
    if (chessUtils === null) {
      const theme = localStorage.getItem('8by8Theme');
      if (theme !== null && theme !== "undefined") {
        setChessUtils(JSON.parse(theme));
      }
      return;
    }
    else{
      localStorage.setItem('8by8Theme', JSON.stringify(chessUtils));
    }
  
  }, [chessUtils]);

  useEffect(() => {
    socket.connect();
    const theme = localStorage.getItem('8by8Theme');
    if(theme!==null && theme !== "undefined"){
      setChessUtils(JSON.parse(theme));
    }
    else{
        setChessUtils({
          bg:"bg-[#303030]", ring:"ring-[#303030]", 
          text:"text-[#303030]", border:"border-[#303030]", bgHover:"hover:bg-[#303030]", 
          hex:"#303030", chessBg:"bg-[#30303098]", call:false,
          selfName:"", opponentName:""
      })
    }
  }, [])
  
  return (
    <ChessExtraContext.Provider value={{chessExtra, setChessExtra}}>
      <ChessUtilsContext.Provider value={{chessUtils, setChessUtils}}>
        <ChessContext.Provider value={{message, setMessage}}>
          <div className="h-[100vh] bg-black">
            <Router>
                <Routes>
                  <Route path="/" element={<NewHome/>} />
                  <Route path="/register" element={<RegisterFirstUser/>} />
                  <Route path='/invite' element={<Invite/>} />
                  <Route path='/join/:roomId/:playerId' element={<RegisterSecondUser/>} />
                  <Route path='/lobby' element={<NewLobby/>} />
                  <Route path="/playground/:roomId" element={<Playground/>} />
                  <Route path="*" element={<NotFound/>} />
                </Routes>
            </Router>
          </div>
        </ChessContext.Provider>
      </ChessUtilsContext.Provider>
    </ChessExtraContext.Provider>
  );
}

export default App;