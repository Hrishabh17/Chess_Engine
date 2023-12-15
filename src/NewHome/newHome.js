    import {useRef,useState, useEffect} from 'react';
    import '../fonts/font.css'
    import ThemeButton from '../Button/themebutton'
    import { IoIosArrowRoundForward  } from "react-icons/io";
    import {motion, useInView, useAnimation} from 'framer-motion';
    export default function NewHome() {

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
        const isVisibleFeaturesGrid = useInView(featuresGrid, {once:true})
        const isVisibleFeaturesGrid2 = useInView(featuresGrid2, {once:true})
        useEffect(() => {
            if(isVisible){
                animationControls.start("visible");
                console.log("vdisible")
            }
        }, [isVisible])

        useEffect(() => {
            if(isVisibleNumberGrid){
                animationControls.start("visible");
                console.log("numbergrid")
            }
        }, [isVisibleNumberGrid])

        useEffect(() => {
            if(isVisibleFeaturesGrid){
                featureAnimationControls.start("visible");
                console.log("featuresgrid")
            }
            if(isVisibleFeaturesGrid2){
                featureAnimationControls2.start("visible");
                console.log("featuresgrid2")
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
                    delay:i*0.2,
                    duration:2,
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

        const stepGridItems = [
            { id:1 , bgColor: "black", textColor: "white", title: "Play With Friends", description: "Click on the 'Play with Friends' button to kick start a new chess match.", buttonText: "PLAY WITH FRIENDS" },
            { id:2 , bgColor: "black", textColor: "white", title: "Register", description: "Fill in the required details to register for the match and click on 'Generate' to receive your unique match link.", buttonText: "GENERATE" },
            { id:3 , bgColor: "white", textColor: "black", title: "Invite Friend", description: "Copy the link generated and share it with your friends to invite them for a pawn tug of war ", buttonText: "LET’S PLAY" },
            { id:4 , bgColor: "white", textColor: "black", title: "Play !", description: "Once your friend joins in, the match will begin automatically.", buttonText: "Chessboard" },
        ];

        const VerticalSpace = ({h})=>{
            return(
            <div className={`h-${h} grid grid-cols-2`}>
                <div className={`pt-${h} col-span-1 bg-black`}></div>
                <div className="col-span-1 bg-white"></div>
            </div>)
        }

        const borderColorLeft=(index)=> index===0?'border-r-[2px] border-white':index===2?'border-r-[2px] border-black':'';

        return (
            <div className='h-full bg-gradient-to-r from-black via-black to-white'>
            <div className="h-screen bg-gradient-to-r from-black via-black to-white grid grid-cols-12">
                <div className="bg-black w-full col-span-6 pb-10">
                    <div className="mt-6 min-h-[2rem] min-w-full flex flex-row">
                        <motion.button variants={fadeInAnimation(1.3)} initial="hidden" animate="visible" className="ml-16 py-1 px-4 flex flex-col justify-center items-center border-[0.1rem] border-white font-century-gothic text-sm text-white hover:border-black hover:text-black hover:bg-white">Choose your theme</motion.button>
                            <motion.div variants={paletteAnimation} initial="hidden" animate="visible" className='w-max overflow-hidden flex justify-center'>
                                <div className="min-h-[1.5rem] max-h-[1.8rem] flex flex-row justify-center items-center">
                                    <motion.div whileHover={{scale:1.2}} className="ml-10 min-h-[1.5rem] max-h-[1.8rem] min-w-[2vw] bg-red-500 hover:border-2 hover:border-white"></motion.div>
                                    <motion.div whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[2.5vw] bg-yellow-500 hover:border-2 hover:border-white"></motion.div>
                                    <motion.div whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[3vw] bg-green-700 hover:border-2 hover:border-white"></motion.div>
                                    <motion.div whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[3.5vw] bg-blue-600 hover:border-2 hover:border-white"></motion.div>
                                    <motion.div whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[4vw] bg-violet-800 hover:border-2 hover:border-white"></motion.div>
                                    <motion.div whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[4.5vw] bg-pink-500 hover:border-2 hover:border-white"></motion.div>
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
                                <motion.div variants={reveal(2)} initial="hidden" animate="visible" className='mt-2 text-white font-century-gothic'>8X8 is your one stop solution for AI based Chess engine with loaded features like video calls, timers, move history and much more ...</motion.div>
                            </motion.div>
                        </div>
                        <div>
                            <div className='mt-16 font-century-gothic text-white text-4xl'>
                                {playLetters.map((word, index) => (
                                <motion.span
                                    key={index}
                                    variants={child(index)}
                                    initial="hidden"
                                    animate="visible"
                                    className="text-white mr-4">{word}</motion.span>
                                ))}
                            </div>
                            <motion.img variants={fadeInAnimation(3)} initial="hidden" animate="visible" src=" ./chesspieceline.svg" className='ml-2 mt-16 h-28' />
                        </div>
                    </div>
                </div>
                <div className="bg-white col-span-6 pb-10">
                    <div className='mt-8 min-w-full flex flex-col justify-center items-center'>
                        <motion.div  variants={fadeInAnimation(2.3)} initial="hidden" animate="visible" whileHover={{scale:1.5}} className='min-w-[5vw] grid grid-cols-5 gap-4'>
                            <div className='text-3xl font-century-gothic font-bold'>F</div>
                            <div className='text-3xl font-century-gothic font-bold'>I</div>
                            <div className='text-3xl font-century-gothic font-bold'>R</div>
                            <div className='text-3xl font-century-gothic font-bold'>S</div>
                            <div className='text-3xl font-century-gothic font-bold'>T</div>
                        </motion.div>
                            <motion.div variants={fadeInAnimation(2.3)} initial="hidden" animate="visible" whileHover={{scale:1.3}} className='text-5xl font-century-gothic font-bold tracking-widest'>MOVE</motion.div>
                        <motion.img variants={fadeInAnimation(2.3)} initial="hidden" animate="visible" src="./chessfront.svg" className='mt-10 xl:h-52 lg:h-24 md:h-16 sm:h-16  mb-24' />
                        <motion.div variants={fadeInAndExpandAnimation(2.3)} initial="hidden" animate="visible" className='w-full flex flex-col justify-center items-center gap-16'>
                            <ThemeButton text={"Play with Friends"}/>
                            <ThemeButton text={"Play with Computer"}/>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div id='title2' className='grid grid-cols-2 text-6xl'>
                <div className= {`pl-16 pt-10 pb-10 pr-2 col-span-1 bg-black text-white flex 
                justify-start`}>
                    <motion.div ref={steps}  variants={fadeInAnimation(1)} initial="hidden" animate={animationControls} className='text-[3.5rem] tracking-widest' >
                        STEPS:
                    </motion.div>
                </div>
                <div className="pt-10 pb-10 col-span-1 bg-white text-black "></div>
            </div>
            <div className='h-max flex flex-col'>
                <div className="grid grid-cols-4">
                    {
                        stepGridItems.map((item, index) => (
                            <div className={`col-span-1 ${borderColorLeft(index)} `}>
                                <div id='title2' className={`pl-16 col-span-1 bg-${item.bgColor} text-${item.textColor}`} >
                                    <motion.div ref={numberGrid} variants={fadeInAnimationDelay(index)} initial="hidden" animate={animationControls} id='title2' className={`text-${item.textColor} text-[6rem] `} >{item.id}.</motion.div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='grid grid-cols-4'>
                    {
                        stepGridItems.map((item, index) => (
                            <div className={`h-full pl-16 col-span-1 bg-${item.bgColor} text-${item.textColor} ${borderColorLeft(index)}`} >
                                <motion.div ref={numberGrid} variants={fadeInAnimationDelay(index)} initial="hidden" animate={animationControls} className='text-[1.85rem] font-century-gothic'>{item.title}</motion.div>
                            </div>
                        ))
                    }
                </div>
                <div className='grid grid-cols-4'>

                    {
                        stepGridItems.map((item, index) => (
                            <div className={`pl-16 col-span-1 bg-${item.bgColor} text-${item.textColor} ${borderColorLeft(index)}`} >
                                <motion.div ref={numberGrid} variants={fadeInAnimationDelay(index)} initial="hidden" animate={animationControls} className='mt-12 font-century-gothic w-4/5'>{item.description}</motion.div>  
                            </div>
                        ))
                    }
                </div>
                <div className='grid grid-cols-4'>
                    {
                        stepGridItems.map((item, index) => (
                            <div className={`pl-16 pb-4 col-span-1 bg-${item.bgColor} text-${item.textColor} ${borderColorLeft(index)}`} >
                                {item.id==4?(
                                    <div className='mt-10 w-4/5'>
                                        <motion.img ref={numberGrid} variants={fadeInAnimationDelay(index)} initial="hidden" animate={animationControls} src="./assets/bg_assets/step4image.svg" alt="chessboard" />
                                    </div>
                                ):(
                                    <motion.div ref={numberGrid} variants={fadeInAnimationDelay(index)} initial="hidden" animate={animationControls} className={`mt-24 py-2 px-1 w-4/5 bg-white text-black border-[0.15rem] border-black flex flex-row justify-center items-center font-bold text-[1.1rem] font-century-gothic tracking-wide`}>{item.buttonText} <IoIosArrowRoundForward className='ml-2' size={30}/></motion.div>
                                )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='grid grid-cols-2 h-5 lg:h-10'>
                <div className="col-span-1 bg-black"></div>
                <div className="col-span-1 bg-white"></div>
            </div>
            <div className='h-full flex flex-col'>
                <div className='grid grid-cols-2'>
                    <div className='pl-10 pt-12 col-span-1 bg-black flex justify-start'><motion.div ref={numberGrid} variants={fadeInAnimation(1)} initial="hidden" animate={featureAnimationControls} id='title2' className='mr-2 text-[3.5rem] text-white tracking-widest'>FEATURES:</motion.div></div>
                    <div className="col-span-1 bg-white h-full"></div>
                </div>
                {/* <div className='grid grid-cols-2'>
                    <div className="pt-10 col-span-1 bg-black"></div>
                    <div className="pt-10 col-span-1 bg-white"></div>
                </div> */}
                <VerticalSpace h='10'></VerticalSpace>
                <div className="w-full flex flex-row text-[1.8rem] tracking-widest font-century-gothic font-semibold">
                    <div className="w-1/2 bg-black text-white flex flex-col items-center">
                        <motion.div ref={featuresGrid} variants={fadeInAnimationDelay(1)} initial="hidden" animate={featureAnimationControls}>
                            MULTIPLE&nbsp;&nbsp;THEMES:
                        </motion.div>
                    </div>
                    <div className="pl-10 w-1/2 bg-white text-black flex flex-col items-center">
                        <motion.div ref={featuresGrid} variants={fadeInAnimationDelay(1)} initial="hidden" animate={featureAnimationControls}>
                        IN-GAME&nbsp;&nbsp;CHAT:
                        </motion.div>
                    </div>
                </div>
                <VerticalSpace h='5'></VerticalSpace>
                <div className='grid grid-cols-2'>
                    <div className="col-span-1 bg-black flex justify-center">
                        <motion.p ref={featuresGrid} variants={fadeInAnimationDelay(2)} initial="hidden" animate={featureAnimationControls} className='w-3/5 font-century-gothic text-center font-normal text-[1rem] text-white'>Choose from a variety of visually appealing themes for a personalized gaming experience.</motion.p>
                    </div>
                    <div className="pl-10 col-span-1 bg-white flex justify-center">
                        <motion.p ref={featuresGrid} variants={fadeInAnimationDelay(2)} initial="hidden" animate={featureAnimationControls} className='w-3/5 font-century-gothic font-semibold text-center text-[1rem] text-black'>Stay connected! Chat with your friend while you strategize your next move.</motion.p>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="pt-12 col-span-1 bg-black">
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
                <div className="w-full flex flex-row text-[1.8rem] tracking-widest font-century-gothic font-semibold">
                    <div className="w-1/2 bg-black text-white flex justify-center">
                        <motion.div ref={featuresGrid2} variants={fadeInAnimationDelay(1)} initial="hidden" animate={featureAnimationControls2}>
                            VIDEO&nbsp;&nbsp;CALLS:
                        </motion.div>
                    </div>
                    <div className="w-1/2 bg-white text-black flex justify-center">
                        <motion.div ref={featuresGrid2} variants={fadeInAnimationDelay(1)} initial="hidden" animate={featureAnimationControls2}>
                            CHESS&nbsp;A.I. :
                        </motion.div>
                    </div>
                </div>
                <VerticalSpace h='5'></VerticalSpace>
                <div className='grid grid-cols-2'>
                    <div className="pl-10 col-span-1 bg-black flex justify-center">
                        <motion.p ref={featuresGrid2} variants={fadeInAnimationDelay(2)} initial="hidden" animate={featureAnimationControls2} className='w-3/5 font-century-gothic font-normal text-[1rem] text-white text-center'>Make your game more interactive with our built-in video call feature.</motion.p>
                    </div>
                    <div className="pl-10 col-span-1 bg-white flex justify-center">
                        <motion.p ref={featuresGrid2} variants={fadeInAnimationDelay(2)} initial="hidden" animate={featureAnimationControls2} className='w-3/5 font-century-gothic font-semibold text-[1rem] text-black text-center'>Challenge yourself with our advanced Chess AI. Perfect your skills anytime, anywhere.</motion.p>
                    </div>
                </div>
                <VerticalSpace h='5'></VerticalSpace>

                <div className='grid grid-cols-2'>
                    <div className="pt-10 col-span-1 bg-black h-full flex justify-center">
                        <motion.img ref={featuresGrid2} variants={fadeInAnimationDelay(3)} initial="hidden" animate={featureAnimationControls2} src="./assets/bg_assets/video-call-feature.svg" alt="" className='h-40 border border-black'/>
                    </div>
                    <div className="pt-10 col-span-1 bg-white flex justify-center">
                        <motion.img ref={featuresGrid2} variants={fadeInAnimationDelay(3)} initial="hidden" animate={featureAnimationControls2} src="./assets/bg_assets/chess-ai.jpg" alt="" className='h-[40vh] border border-black'/>
                    </div>
                </div>
            </div>
            </div>
        )
    }