import './newHome.css';
import {useRef, useEffect, useContext} from 'react';
import { useMediaQuery } from 'react-responsive';
import ThemeButton from '../Button/themebutton'
import { IoIosArrowRoundForward  } from "react-icons/io";
import {motion, useInView, useAnimation} from 'framer-motion';
import { useNavigate } from "react-router";
import { ChessUtilsContext, ChessExtraContext } from '../Context/context';

export default function NewHome() {
    const isMobile = useMediaQuery({ query: '(max-width: 860px)' })
    const navigate = useNavigate()
    const {chessUtils, setChessUtils} = useContext(ChessUtilsContext);
    const {chessExtra, setChessExtra} = useContext(ChessExtraContext);
    const steps = useRef(null);
    const numberGrid = useRef(null);
    const featuresGrid = useRef(null);
    const featuresGrid2 = useRef(null);
    const animationControls = useAnimation();
    const featureAnimationControls = useAnimation();
    const featureAnimationControls2 = useAnimation();
    const isVisible = useInView(steps, {once:true, amount: 'all'})
    // const [isVisibleSteps, stepsInView] = useInView({ once: true });
    // const [isVisibleNumberGrid, numberGridView] = useInView({ once: true });
    const isVisibleNumberGrid = useInView(numberGrid, {once:true})
    const isVisibleFeaturesGrid = useInView(featuresGrid, {once:true, amount:'some'})
    const isVisibleFeaturesGrid2 = useInView(featuresGrid2, {once:true})

    useEffect(()=>{
        setChessUtils({
            bg:"bg-[#000000]", ring:"ring-[#000000]", ring2:"ring-offset-[#000000]",
            text:"text-[#000000]", border:"border-[#000000]", bgHover:"hover:bg-[#000000]", 
            hex:"#000000", chessBg:"bg-[#00000098]", call:false,
            selfName:"", opponentName:""
        })
    }, [])

    useEffect(() => {
        if(isVisible){
            animationControls.start("visible");
        }
    }, [isVisible])

    useEffect(() => {
        if(isVisibleNumberGrid){
            animationControls.start("visible");
        }
    }, [isVisibleNumberGrid])

    useEffect(() => {
        if(isVisibleFeaturesGrid){
            featureAnimationControls.start("visible");
        }
        if(isVisibleFeaturesGrid2){
            featureAnimationControls2.start("visible");
        }
    }, [isVisibleFeaturesGrid, isVisibleFeaturesGrid2])
    
    const title = "8 x 8";
    const titleLetters = title.split("");
    const animationContainer={
        hidden:{opacity:0},
        visible:(i=2)=>({
            opacity:1,
            transition:{staggerChildren:0.24, delayChildren:0.04*i}
        })
    }

    const title2 = "CHESS";
    const titleLetters2 = Array.from(title2);

    const playText = "Play. Now.";
    const playLetters = playText.split(" ");

    const titleSide = "PLAY. CHAT. CONNECT."
    const titleSideLetters = titleSide.split(" ");

    const child =(i)=>({
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
            y: -20,
            x:-20,
            transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
            },
        }
    })

    const reveal=(i) => ({
        visible: {
            opacity: 1,
            // scale:1,
            y: 0,
            x:0,
            transition:{
            delay: i*0.15,
            duration: 1,
            ease: "circOut",
            // damping: 12,
            // stiffness: 100,
            }
        },
        hidden: {
            opacity: 0,
            // scale:0.5,
            y: 20,
            x:-10,
            transition: {
            duration: 1,
            ease: "easeInOut",
            // type: "spring",
            // damping: 12,
            // stiffness: 100,
            },
        }
    })

    const slowReveal=(i) => ({
        visible: {
            opacity: 1,
            // scale:1,
            y: 0,
            x:0,
            transition:{
            delay: i*0.15,
            duration: 1.3,
            ease: "circOut",
            // damping: 12,
            // stiffness: 100,
            }
        },
        hidden: {
            opacity: 0,
            // scale:0.5,
            y: 20,
            x:-10,
            transition: {
            duration: 1,
            ease: "easeInOut",
            // type: "spring",
            // damping: 12,
            // stiffness: 100,
            },
        }
    })

    const fadeInAnimation=(i)=>({
        hidden:{opacity:0, 
            // scale:0.8,
            transformOrigin:"left"},
        visible:{
            opacity:1,
            // scale:1,
            transition:{
                duration:i,
                ease: "easeInOut"
            }
        }
    })

    const fadeInAnimationDelay=(i)=>({
        hidden:{opacity:0,
            y:75,
            // scale:0.8,
            transformOrigin:"left"},
        visible:{
            y:0,
            opacity:1,
            // scale:1,
            transition:{
                delay:i*0.1,
                duration:1.2,
                type: "spring",
                damping: 12,
                stiffness: 100,
            }
        }
    })

    const fadeInAnimationDelay2=(i)=>({
        hidden:{opacity:0,
            y:75,
            // scale:0.8,
            transformOrigin:"left"},
        visible:{
            y:0,
            opacity:1,
            // scale:1,
            transition:{
                duration:1,
                type: "spring",
                damping: 12,
                stiffness: 100,
            }
        }
    })

    const fadeInAndExpandAnimation=(i)=>({
        visible: {
            opacity: 1,
            // scale:1,
            y: 0,
            x:0,
            transition:{
            delay: 1.5,
            duration: 1.5,
            type: "spring",
            damping: 12,
            stiffness: 100,
            }
        },
        hidden: {
            opacity: 0,
            // scale:0.5,
            y: 10,
            x:-3,
            transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
            },
        }
    })

    const paletteAnimation={
        visible:{
            width:"max-content",
            opacity:1,
            transition: { duration: 1.5, ease: "circOut"}
        },
        hidden:{
            width:"0%",
            opacity:0,
        }
    }

    const animateText =(i)=>({
        visible: {
            opacity: 1,
            // scale:1,
            y: 0,
            x:0,
            transition:{
            delay: 2+i*0.4,
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

    const stepGridItems = [
        { id:1 , bgColor: chessUtils?.bg, textColor: "text-white", title: "Play With Friends", description: "Click on the 'Play with Friends' button to kick start a new chess match.", buttonText: "PLAY WITH FRIENDS" },
        { id:2 , bgColor: chessUtils?.bg, textColor: "text-white", title: "Register", description: "Fill in the required details to register for the match and click on 'Generate' to receive your unique match link.", buttonText: "GENERATE" },
        { id:3 , bgColor: "bg-white", textColor: chessUtils?.text, title: "Invite Friend", description: "Copy the link generated and share it with your friends to invite them for a pawn tug of war ", buttonText: "LET’S PLAY" },
        { id:4 , bgColor: "bg-white", textColor: chessUtils?.text, title: "Play !", description: "Once your friend joins in, the match will begin automatically.", buttonText: "Chessboard" },
    ];

    const featureGridItems = [
        {id:1, bgColor: chessUtils?.bg, textColor: "white", title: "MULTIPLE THEMES", description: "Choose from a variety of visually appealing themes for a personalized gaming experience."},
        {id:2, bgColor: "white", textColor: chessUtils?.text, title: "IN-GAME CHAT", description: "Stay connected! Chat with your friend while you strategize your next move."},
        {id:3, bgColor: chessUtils?.bg, textColor: "white", title: "VIDEO CALLS", description: "Make your game more interactive with our built-in video call feature."},
        {id:4, bgColor: "white", textColor: chessUtils?.text, title: "CHESS AI", description: "Challenge yourself with our advanced Chess AI. Perfect your skills anytime, anywhere."},
    ]

    const VerticalSpace = ({h})=>{
        return(
        <div className={`h-${h} grid grid-cols-2`}>
            <div className={`pt-${h} col-span-1 ${chessUtils?.bg}`}></div>
            <div className="col-span-1 bg-white"></div>
        </div>)
    }

    const borderColorLeft=(index)=> index===0?'border-r-[2px] border-white':index===2?'border-r-[2px]'+chessUtils?.border:'';

    return (
        <div className={`h-full ${chessUtils?.bg} select-none`}>
        {isMobile?
        (<>
            <div className={`h-full w-full ${chessUtils?.bg} select-none overflow-x-hidden`}>
                <div className="pt-6 min-h-[2rem] min-w-full flex flex-row">
                    <motion.div variants={fadeInAnimation(1.3)} initial="hidden" animate="visible" className="ml-4 p-1 px-2 text-white font-[CenturyGothic] border-2 text-sm border-white">Choose Theme</motion.div>
                    <motion.div variants={paletteAnimation} initial="hidden" animate="visible" className='mr-4 w-max overflow-hidden flex justify-center'>
                        <div className="min-h-[1.5rem] max-h-[1.8rem] flex flex-row justify-center items-center border-2 border-white ml-10">
                            <motion.div onClick={()=>setChessUtils({
                                bg:"bg-[#000000]", ring:"ring-[#000000]", 
                                text:"text-[#000000]", border:"border-[#000000]", bgHover:"hover:bg-[#000000]", 
                                hex:"#000000", chessBg:"bg-[#00000098]", call:false,
                                selfName:"", opponentName:""
                            })} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[5vw] bg-[#000000] hover:border-2 hover:border-white"></motion.div>
                            <motion.div onClick={()=>setChessUtils({
                                bg:"bg-[#CC2936]", ring:"ring-[#CC2936]", 
                                text:"text-[#CC2936]", border:"border-[#CC2936]", bgHover:"hover:bg-[#CC2936]", 
                                hex:"#CC2936", chessBg:"bg-[#CC293698]", call:false,
                                selfName:"", opponentName:""
                            })} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[5vw] bg-[#CC2936] hover:border-2 hover:border-white"></motion.div>
                            <motion.div onClick={()=>setChessUtils({
                                bg:"bg-[#E57C04]", ring:"ring-[#E57C04]", 
                                text:"text-[#E57C04]", border:"border-[#E57C04]", bgHover:"hover:bg-[#E57C04]", 
                                hex:"#E57C04", chessBg:"bg-[#E57C0498]", call:false,
                                selfName:"", opponentName:""
                            })} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[5.5vw] bg-[#E57C04] hover:border-2 hover:border-white"></motion.div>
                            <motion.div onClick={()=>setChessUtils({
                                bg:"bg-[#338E58]", ring:"ring-[#338E58]", 
                                text:"text-[#338E58]", border:"border-[#338E58]", bgHover:"hover:bg-[#338E58]", 
                                hex:"#338E58", chessBg:"bg-[#338E5898]", call:false,
                                selfName:"", opponentName:""
                            })} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[6vw] bg-[#338E58] hover:border-2 hover:border-white"></motion.div>
                            <motion.div onClick={()=>setChessUtils({
                                bg:"bg-[#6356E5]", ring:"ring-[#6356E5]", 
                                text:"text-[#6356E5]", border:"border-[#6356E5]", bgHover:"hover:bg-[#6356E5]", 
                                hex:"#6356E5", chessBg:"bg-[#6356E598]", call:false,
                                selfName:"", opponentName:""
                            })} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[6.5vw] bg-[#6356E5] hover:border-2 hover:border-white"></motion.div>
                            <motion.div onClick={()=>setChessUtils({
                                bg:"bg-[#111D5E]", ring:"ring-[#111D5E]", 
                                text:"text-[#111D5E]", border:"border-[#111D5E]", bgHover:"hover:bg-[#111D5E]", 
                                hex:"#111D5E", chessBg:"bg-[#111D5E98]", call:false,
                                selfName:"", opponentName:""
                            })} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[7vw] bg-[#111D5E] hover:border-2 hover:border-white"></motion.div>
                            <motion.div onClick={()=>setChessUtils({
                                bg:"bg-[#420217]", ring:"ring-[#420217]", 
                                text:"text-[#420217]", border:"border-[#420217]", bgHover:"hover:bg-[#420217]", 
                                hex:"#420217", chessBg:"bg-[#42021798]", call:false,
                                selfName:"", opponentName:""
                            })} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[7.5vw] bg-[#420217] hover:border-2 hover:border-white"></motion.div>
                        </div>
                    </motion.div>
                </div>
                <div className='ml-4 mt-8 min-w-full h-max flex flex-col'>
                    <div className=''>
                        <motion.div id='title' variants={animationContainer} initial="hidden" animate="visible" className='ml-2 text-[4rem] text-white overflow-hidden flex'>
                        {
                            titleLetters.map((letter, index) => (
                                <motion.span key={index} variants={reveal(index)} initial="hidden" animate="visible" className='mr-4'>{letter}</motion.span>
                            ))
                        }
                        </motion.div>
                        <motion.div className='min-w-[20vw] max-w-[40vw]'>
                            <motion.div variants={animationContainer} initial="hidden" animate="visible" id='title2' className='-mt-4 text-[5.1rem] text-white tracking-wide'>
                                {titleLetters2.map((letter, index) => (
                                    <motion.span key={index} variants={reveal(index)} initial="hidden" animate="visible">
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.div>
                            <motion.div variants={reveal(2)} initial="hidden" animate="visible" className='mt-2 ml-2 w-[80vw] text-white font-[CenturyGothic]'>8X8 is your one stop solution for AI based Chess engine with loaded features like video calls, timers, move history and much more ...</motion.div>
                        </motion.div>
                    </div>
                </div>
                <div className='ml-6 mt-4 flex flex-col justify-center'>
                     <div className='flex flex-col text-white'>
                        {titleSideLetters.map((letter, index) => (
                            <motion.div variants={animateText(index)} initial="hidden" animate="visible" className='mb-3 text-2xl font-bold font-[CenturyGothic] tracking-wider'>{letter}</motion.div>
                        ))}
                    </div>
                </div>
                <div className='mt-4 mb-8'>
                    {/* <div className='flex flex-row'>
                        <div className='ml-2 border-4 border-white w-max'>
                            <img src="assets/bg_assets/step4image.svg" alt="" className='h-[10vh]'/>
                        </div>
                        <div>

                        </div>
                    </div> */}
                    <div className='flex justify-center'>
                        <motion.img variants={reveal(2)} initial="hidden" animate="visible" src="assets/bg_assets/video-call-feature.png" alt="" className='mt-2 h-36'/>
                    </div>
                    <div className='mt-3 flex flex-col justify-end'>
                        <motion.img variants={reveal(2)} initial="hidden" animate="visible" src="assets/bg_assets/chat.svg" className='h-44' alt="" />
                    </div>
                        
                    <div className='mt-6 py-10 h-max bg-white'>
                         <motion.div variants={fadeInAndExpandAnimation(2.3)} initial="hidden" animate="visible" className='mt-2 w-full flex flex-col justify-center items-center gap-6'>
                            <button onClick={()=>navigate('/register')} className={`mt-4 w-[60vw] border-[0.2rem] px-4 py-2 ${chessUtils?.border} text-xl font-bold flex flex-row justify-center items-center gap-4 bg-white`}>Play with Friends</button>
                            <button onClick={()=>navigate('/coming-soon')} className={`mt-2 w-[60vw] border-[0.2rem] px-4 py-2 ${chessUtils?.border} text-xl font-bold flex flex-row justify-center items-center gap-4 bg-white`}>Play with Computer</button>
                        </motion.div>
                    </div>
                    <div className={`pl-6 h-full ${chessUtils?.bg} flex flex-col`}>
                        <div id='title2' className= {`pt-10 pb-10 pr-2 col-span-1 ${chessUtils?.bg} text-white flex 
                        justify-start`}>
                            <motion.div ref={steps}  variants={fadeInAnimation(1)} initial="hidden" animate={animationControls} className='text-[3rem] tracking-widest' >
                                STEPS
                            </motion.div>
                        </div>
                        <div className='text-white flex flex-col'>
                            {
                                stepGridItems.map((item, index) => (
                                    <motion.div ref={numberGrid} variants={fadeInAnimationDelay(1)} initial="hidden" animate={animationControls} className='flex flex-row'>
                                    <motion.div id='title2' className='text-[6rem]'>{item.id}</motion.div>
                                    <motion.div className='ml-6 flex flex-col font-[CenturyGothic]'>
                                        <div className='mt-3 text-[2rem]'>{item.title}</div>
                                        <div className='w-[70vw] flex flex-wrap text-sm'>{item.description}</div>
                                    </motion.div>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='h-max bg-white '>
                    <div className='pl-4 pt-12 flex justify-start'><motion.div ref={numberGrid} variants={fadeInAnimation(1)} initial="hidden" animate={featureAnimationControls} id='title2' className={`mr-2 text-[3rem] ${chessUtils?.text} tracking-wider`}>FEATURES</motion.div></div>
                    <motion.div ref={featuresGrid} variants={fadeInAnimationDelay(1)} initial="hidden" animate={featureAnimationControls} className='pl-4 pt-4 font-[CenturyGothic] font-bold text-[1.6rem] flex flex-col
                    justify-start tracking-wider'>
                        {
                            featureGridItems.map((item, index) => (
                                <>
                                    <div>
                                    {item.title}
                                    </div>
                                    <div className={`pt-2
                                    w-4/5 font-[CenturyGothic] font-normal text-[1rem] ${chessUtils?.text}`}>{item.description}</div>
                                    {item.id===1?(
                                        <div className='pt-8 flex flex-col justify-center gap-8 mb-10'>
                                            <img src="./assets/bg_assets/color-palette.svg" alt="for theme change" className='h-12'/>
                                            <img src="./assets/bg_assets/theme-changed.svg" alt="theme changed" className='h-28'/>
                                        </div>
                                    ):item.id===2?(
                                        <img ref={featuresGrid} src="./assets/bg_assets/chat.svg" alt="" className='mt-10 mb-10 h-40'/>
                                    ):item.id===3?(
                                        <img ref={featuresGrid2} src="./assets/bg_assets/video-call-feature.png" alt="" className='mt-8 mb-10 h-28 border'/>
                                    ):(
                                        <img ref={featuresGrid2} src="./assets/bg_assets/chess-ai-2.png" alt="" className='mt-8
                                        '/>
                                    )}
                                </>
                            ))
                        }
                        
                    </motion.div>
                </div>
            </div>
        </>):(
            <>
                <div className={`h-full ${chessUtils?.bg} grid grid-cols-12`}>
                    <div className={`${chessUtils?.bg} w-full col-span-6 pb-10`}>
                        <div className="mt-6 min-h-[2rem] min-w-full flex flex-row">
                            <motion.div variants={fadeInAnimation(1.3)} initial="hidden" animate="visible" className="ml-16 py-1 px-4 flex flex-col justify-center items-center border-[0.1rem] border-white font-[CenturyGothic] text-sm text-white ">Choose your theme</motion.div>
                            <motion.div variants={paletteAnimation} initial="hidden" animate="visible" className='w-max overflow-hidden flex justify-center'>
                                <div className="min-h-[1.5rem] max-h-[1.8rem] flex flex-row justify-center items-center border-2 border-white ml-10">
                                    <motion.div onClick={()=>setChessUtils({
                                        bg:"bg-[#000000]", ring:"ring-[#000000]", 
                                        text:"text-[#000000]", border:"border-[#000000]", bgHover:"hover:bg-[#000000]", 
                                        hex:"#000000", chessBg:"bg-[#00000098]", call:false,
                                        selfName:"", opponentName:""
                                    })} whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[2vw] bg-[#000000] hover:border-2 hover:border-white"></motion.div>
                                    <motion.div onClick={()=>setChessUtils({
                                        bg:"bg-[#CC2936]", ring:"ring-[#CC2936]", 
                                        text:"text-[#CC2936]", border:"border-[#CC2936]", bgHover:"hover:bg-[#CC2936]", 
                                        hex:"#CC2936", chessBg:"bg-[#CC293698]", call:false,
                                        selfName:"", opponentName:""
                                    })} whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[2vw] bg-[#CC2936] hover:border-2 hover:border-white"></motion.div>
                                    <motion.div onClick={()=>setChessUtils({
                                        bg:"bg-[#E57C04]", ring:"ring-[#E57C04]", 
                                        text:"text-[#E57C04]", border:"border-[#E57C04]", bgHover:"hover:bg-[#E57C04]", 
                                        hex:"#E57C04", chessBg:"bg-[#E57C0498]", call:false,
                                        selfName:"", opponentName:""
                                    })} whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[2.5vw] bg-[#E57C04] hover:border-2 hover:border-white"></motion.div>
                                    <motion.div onClick={()=>setChessUtils({
                                        bg:"bg-[#338E58]", ring:"ring-[#338E58]", 
                                        text:"text-[#338E58]", border:"border-[#338E58]", bgHover:"hover:bg-[#338E58]", 
                                        hex:"#338E58", chessBg:"bg-[#338E5898]", call:false,
                                        selfName:"", opponentName:""
                                    })} whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[3vw] bg-[#338E58] hover:border-2 hover:border-white"></motion.div>
                                    <motion.div onClick={()=>setChessUtils({
                                        bg:"bg-[#6356E5]", ring:"ring-[#6356E5]", 
                                        text:"text-[#6356E5]", border:"border-[#6356E5]", bgHover:"hover:bg-[#6356E5]", 
                                        hex:"#6356E5", chessBg:"bg-[#6356E598]", call:false,
                                        selfName:"", opponentName:""
                                    })} whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[3.5vw] bg-[#6356E5] hover:border-2 hover:border-white"></motion.div>
                                    <motion.div onClick={()=>setChessUtils({
                                        bg:"bg-[#111D5E]", ring:"ring-[#111D5E]", 
                                        text:"text-[#111D5E]", border:"border-[#111D5E]", bgHover:"hover:bg-[#111D5E]", 
                                        hex:"#111D5E", chessBg:"bg-[#111D5E98]", call:false,
                                        selfName:"", opponentName:""
                                    })} whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[4vw] bg-[#111D5E] hover:border-2 hover:border-white"></motion.div>
                                    <motion.div onClick={()=>setChessUtils({
                                        bg:"bg-[#420217]", ring:"ring-[#420217]", 
                                        text:"text-[#420217]", border:"border-[#420217]", bgHover:"hover:bg-[#420217]", 
                                        hex:"#420217", chessBg:"bg-[#42021798]", call:false,
                                        selfName:"", opponentName:""
                                    })} whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[4.5vw] bg-[#420217] hover:border-2 hover:border-white"></motion.div>
                                </div>
                            </motion.div>
                        </div>
                        <div className='ml-16 mt-10 min-w-full h-screen flex flex-col'>
                            <div className=''>
                                <motion.div id='title' variants={animationContainer} initial="hidden" animate="visible" className='ml-2 text-[4.5rem] 3xl:text-[8rem] text-white overflow-hidden flex'>
                                {
                                    titleLetters.map((letter, index) => (
                                        <motion.span key={index} variants={reveal(index)} initial="hidden" animate="visible" className='mr-4'>{letter}</motion.span>
                                    ))
                                }
                                </motion.div>
                                <motion.div className='min-w-[20vw] max-w-[40vw]'>
                                    <motion.div variants={animationContainer} initial="hidden" animate="visible" id='title2' className='-mt-4 text-[6rem] text-white tracking-wide'>
                                        {titleLetters2.map((letter, index) => (
                                            <motion.span key={index} variants={reveal(index)} initial="hidden" animate="visible">
                                                {letter}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                    <motion.div variants={reveal(2)} initial="hidden" animate="visible" className='mt-2 text-white font-[CenturyGothic]'>8X8 is your one stop solution for AI based Chess engine with loaded features like video calls, timers, move history and much more ...</motion.div>
                                </motion.div>
                            </div>
                            <div>
                                <div className='mt-16 font-[CenturyGothic] text-white text-4xl'>
                                    {playLetters.map((word, index) => (
                                    <motion.span
                                        key={index}
                                        variants={child(index)}
                                        initial="hidden"
                                        animate="visible"
                                        className="text-white mr-4">{word}</motion.span>
                                    ))}
                                </div>
                                <motion.img variants={fadeInAnimation(3)} initial="hidden" animate="visible" src="./chesspieceline.png" className='ml-2 mt-16 h-28' />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white col-span-6 pb-10">
                        <div className='mt-8 min-w-full flex flex-col justify-center items-center'>
                            {/* <motion.div  variants={fadeInAnimation(2.3)} initial="hidden" animate="visible" whileHover={{scale:1.5}} className='min-w-[5vw] grid grid-cols-5 gap-4'>
                                <div className='text-3xl font-[CenturyGothic] font-bold'>F</div>
                                <div className='text-3xl font-[CenturyGothic] font-bold'>I</div>
                                <div className='text-3xl font-[CenturyGothic] font-bold'>R</div>
                                <div className='text-3xl font-[CenturyGothic] font-bold'>S</div>
                                <div className='text-3xl font-[CenturyGothic] font-bold'>T</div>
                            </motion.div> */}
                            {/* <motion.img variants={fadeInAnimation(2.3)} initial="hidden" animate="visible" src="./chessfront.svg" className='mt-10 xl:h-52 lg:h-24 md:h-16 sm:h-16  mb-24' /> */}
                            <div className='flex flex-row'>
                            {titleSideLetters.map((letter, index) => (
                                    <motion.div id='title' variants={animateText(index)} initial="hidden" animate="visible" className={`mr-3 text-2xl font-[CenturyGothic] tracking-wider ${chessUtils?.text}`}>{letter}</motion.div>
                            ))}
                            </div>
                            {/* <motion.div id="title" variants={animateText(2.3)} initial="hidden" animate="visible" whileHover={{scale:1.3}} className='text-2xl font-[CenturyGothic] tracking-wider'>PLAY. CHAT. CONNECT.</motion.div> */}
                            <div className='flex flex-col justify-center'>
                                <motion.img src='assets/bg_assets/cover.png' variants={fadeInAnimation(2.3)} initial="hidden" animate="visible" className='mt-10 lg:h-[42vh] sm:h-[20vh] mb-24'></motion.img>
                            </div>
                            <motion.div variants={fadeInAndExpandAnimation(2.3)} initial="hidden" animate="visible" className='w-full flex flex-col justify-center items-center gap-12'>
                                <ThemeButton textColor={chessUtils?.text} color={chessUtils?.bg} border={chessUtils?.border} redirect={'/register'} text={"Play with Friends"}/>
                                <ThemeButton textColor={chessUtils?.text} border = {chessUtils?.border} color={chessUtils?.bg} redirect={'/coming-soon'} text={"Play with Computer"}/>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div id='title2' className='grid grid-cols-2 text-6xl'>
                    <div className= {`pl-16 pt-10 pb-10 pr-2 col-span-1 ${chessUtils?.bg} text-white flex 
                    justify-start`}>
                        <motion.div ref={steps}  variants={fadeInAnimation(1)} initial="hidden" animate={animationControls} className='text-[3.5rem] tracking-widest' >
                            STEPS
                        </motion.div>
                    </div>
                    <div className={`pt-10 pb-10 col-span-1 bg-white ${chessUtils?.text} `}></div>
                </div>
                <div className='h-max flex flex-col'>
                    <div className="grid grid-cols-4">
                        {
                            stepGridItems.map((item, index) => (
                                <div className={`col-span-1 ${borderColorLeft(index)} `}>
                                    <div id='title2' className={`pl-16 col-span-1 ${item.bgColor} ${item.textColor}`} >
                                        <motion.div ref={numberGrid} variants={fadeInAnimationDelay(index)} initial="hidden" animate={animationControls} id='title2' className={`${item.textColor} text-[6rem] `} >{item.id}.</motion.div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='grid grid-cols-4'>
                        {
                            stepGridItems.map((item, index) => (
                                <div className={`h-full pl-16 col-span ${item.bgColor} ${item.textColor} ${borderColorLeft(index)}`} >
                                    <motion.div ref={numberGrid} variants={fadeInAnimationDelay(index)} initial="hidden" animate={animationControls} className='text-[1.85rem] font-[CenturyGothic]'>{item.title}</motion.div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='grid grid-cols-4'>

                        {
                            stepGridItems.map((item, index) => (
                                <div className={`pl-16 col-span-1 ${item.bgColor} ${item.textColor} ${borderColorLeft(index)}`} >
                                    <motion.div ref={numberGrid} variants={fadeInAnimationDelay(index)} initial="hidden" animate={animationControls} className='mt-12 font-[CenturyGothic] w-4/5'>{item.description}</motion.div>  
                                </div>
                            ))
                        }
                    </div>
                    <div className='grid grid-cols-4'>
                        {
                            stepGridItems.map((item, index) => (
                                <div className={`pl-16 pb-4 col-span-1 ${item.bgColor} -b${item.textColor} ${borderColorLeft(index)}`} >
                                    {item.id==4?(
                                        <div className='mt-10 w-4/5'>
                                            <motion.img ref={numberGrid} variants={fadeInAnimationDelay(index)} initial="hidden" animate={animationControls} src="./assets/bg_assets/step4image.svg" alt="chessboard" />
                                        </div>
                                    ):(
                                        <motion.div ref={numberGrid} variants={fadeInAnimationDelay(index)} initial="hidden" animate={animationControls} className={`mt-24 py-2 px-1 w-4/5 bg-white ${chessUtils?.text} border-[0.15rem] ${chessUtils?.border} flex flex-row justify-center items-center font-bold text-[1.1rem] font-[CenturyGothic] tracking-wide`}>{item.buttonText} <IoIosArrowRoundForward className='ml-2' size={30}/></motion.div>
                                    )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='grid grid-cols-2 h-5 lg:h-10'>
                    <div className={`col-span-1 ${chessUtils?.bg}`}></div>
                    <div className="col-span-1 bg-white"></div>
                </div>
                <div className='h-full flex flex-col'>
                    <div className='grid grid-cols-2'>
                    <div className={`pl-10 pt-12 col-span-1 ${chessUtils?.bg} flex justify-start`}><motion.div ref={numberGrid} variants={fadeInAnimation(1)} initial="hidden" animate={featureAnimationControls} id='title2' className='mr-2 text-[3.5rem] text-white tracking-widest'>FEATURES</motion.div></div>
                        <div className="col-span-1 bg-white h-full"></div>
                    </div>
                    {/* <div className='grid grid-cols-2'>
                        <div className="pt-10 col-span-1 bg-black"></div>
                        <div className="pt-10 col-span-1 bg-white"></div>
                    </div> */}
                    <VerticalSpace h='10'></VerticalSpace>
                    <div className="w-full flex flex-row text-[1.8rem] tracking-widest font-[CenturyGothic] font-semibold">
                        <div className={`w-1/2 ${chessUtils?.bg} text-white flex flex-col items-center`}>
                            <motion.div ref={featuresGrid} variants={fadeInAnimationDelay(1)} initial="hidden" animate={featureAnimationControls}>
                                MULTIPLE&nbsp;&nbsp;THEMES
                            </motion.div>
                        </div>
                        <div className={`pl-10 w-1/2 bg-white ${chessUtils?.text} flex flex-col items-center`}>
                            <motion.div ref={featuresGrid} variants={fadeInAnimationDelay(1)} initial="hidden" animate={featureAnimationControls}>
                            IN-GAME&nbsp;&nbsp;CHAT
                            </motion.div>
                        </div>
                    </div>
                    <VerticalSpace h='5'></VerticalSpace>
                    <div className='grid grid-cols-2'>
                        <div className={`col-span-1 ${chessUtils?.bg} flex justify-center`}>
                            <motion.p ref={featuresGrid} variants={fadeInAnimationDelay(2)} initial="hidden" animate={featureAnimationControls} className='w-3/5 font-[CenturyGothic] text-center font-normal text-[1rem] text-white'>Choose from a variety of visually appealing themes for a personalized gaming experience.</motion.p>
                        </div>
                        <div className="pl-10 col-span-1 bg-white flex justify-center">
                            <motion.p ref={featuresGrid} variants={fadeInAnimationDelay(2)} initial="hidden" animate={featureAnimationControls} className={`w-3/5 font-[CenturyGothic] font-semibold text-center text-[1rem] ${chessUtils?.text}`}>Stay connected! Chat with your friend while you strategize your next move.</motion.p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className={`pt-12 col-span-1 ${chessUtils?.bg}`}>
                            <motion.div ref={featuresGrid} variants={fadeInAnimationDelay(3)} initial="hidden" animate={featureAnimationControls} className='flex justify-center gap-8'>
                                <img src="./assets/bg_assets/color-palette.svg" alt="for theme change" className='h-14'/>
                                <img src="./assets/bg_assets/theme-changed.svg" alt="theme changed" className='h-32'/>
                            </motion.div>
                        </div>
                        <div className="pl-10 pt-12 h-full col-span-1 bg-white">                
                            <motion.div ref={featuresGrid} variants={fadeInAnimationDelay(3)} initial="hidden" animate={featureAnimationControls} className='flex justify-center gap-14'>
                                <div className='pt-0'>
                                    <img src="./assets/bg_assets/feature2.svg" alt="for theme change" className='h-52'/>                          
                                </div>
                                <div className='w-1/5'>
                                    <img src="./assets/bg_assets/chat1.svg" alt="" className='h-16 ml-20 mb-3'/>
                                    <img src="./assets/bg_assets/chat-2.svg" alt="" className='h-20 mb-3'/>
                                    <img src="./assets/bg_assets/chat3.svg" alt="" className='h-24 ml-20'/>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <VerticalSpace h='10'></VerticalSpace>
                    <div className="w-full flex flex-row text-[1.8rem] tracking-widest font-[CenturyGothic] font-semibold">
                        <div className={`w-1/2 ${chessUtils?.bg} text-white flex justify-center text-center`}>
                            <motion.div ref={featuresGrid2} variants={fadeInAnimationDelay(1)} initial="hidden" animate={featureAnimationControls2}>
                                VIDEO&nbsp;&nbsp;CALLS
                            </motion.div>
                        </div>
                        <div className={`w-1/2 bg-white ${chessUtils?.text} flex justify-center text-center`}>
                            <motion.div ref={featuresGrid2} variants={fadeInAnimationDelay(1)} initial="hidden" animate={featureAnimationControls2}>
                                CHESS&nbsp;AI
                            </motion.div>
                        </div>
                    </div>
                    <VerticalSpace h='5'></VerticalSpace>
                    <div className='grid grid-cols-2'>
                        <div className={`pl-10 col-span-1 ${chessUtils?.bg} flex justify-center`}>
                            <motion.p ref={featuresGrid2} variants={fadeInAnimationDelay(2)} initial="hidden" animate={featureAnimationControls2} className='w-3/5 font-[CenturyGothic] font-normal text-[1rem] text-white text-center'>Make your game more interactive with our built-in video call feature.</motion.p>
                        </div>
                        <div className="pl-10 col-span-1 bg-white flex justify-center">
                            <motion.p ref={featuresGrid2} variants={fadeInAnimationDelay(2)} initial="hidden" animate={featureAnimationControls2} className={`w-3/5 font-[CenturyGothic] font-semibold text-[1rem] ${chessUtils?.text} text-center`}>Challenge yourself with our advanced Chess AI. Perfect your skills anytime, anywhere.</motion.p>
                        </div>
                    </div>
                    <VerticalSpace h='5'></VerticalSpace>

                    <div className='grid grid-cols-2'>
                        <div className={`pt-10 col-span-1 ${chessUtils?.bg} h-full flex justify-center`}>
                            <motion.img ref={featuresGrid2} variants={fadeInAnimationDelay(3)} initial="hidden" animate={featureAnimationControls2} src="./assets/bg_assets/video-call-feature.png" alt="" className={`h-40 border ${chessUtils?.border}`}/>
                        </div>
                        <div className="pt-10 col-span-1 bg-white flex justify-center">
                            <motion.img ref={featuresGrid2} variants={fadeInAnimationDelay(3)} initial="hidden" animate={featureAnimationControls2} src="./assets/bg_assets/chess-ai-2.png" alt="" className='h-[30vh] '/>
                        </div>
                    </div>
                </div>
            </>
        )}
        </div>
    )
}