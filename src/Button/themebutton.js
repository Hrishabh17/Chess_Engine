import { useState, useEffect } from "react";
import { IoIosArrowRoundForward  } from "react-icons/io";
import {motion, useAnimation, useAnimationControls} from 'framer-motion';
import { useNavigate } from "react-router";

export default function ThemeButton({textColor,border,color, redirect, text}) {
    const controls = useAnimationControls();
    const [isHover, setIsHover] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(isHover){
            controls.start({
                zIndex: 10,
                width: "100%",
                opacity: 1,
                transition: { duration: 1, ease: "circOut"},
            });
        
        }
        if(!isHover){
            controls.start({
                width: "0%",
                zIndex: 0,
            });
        }
    }, [controls,isHover]);
    return(
        <motion.div onClick={()=>navigate(redirect)} id='bahar' whileHover={{scale:1.07}} className={`relative ${color} h-16 lg:w-5/12 md:w-6/12 cursor-pointer`} onHoverStart={()=>{setIsHover(true)}} onHoverEnd={()=>{setIsHover(false)}}>
            <motion.div id="fill"
            // whileHover={{width:"100%"}}
            animate={controls}
            // transition={{
            //     duration:1,
            //     ease: "circOut"
            // }}
            style={{width:"0%", zIndex:0}}
            className={`select-none z-10 h-full w-full px-2 py-2 ${color} absolute -left-[0.65rem] bottom-[1.1vh] border-[0.2rem] border-white lg:text-lg md:text-sm flex flex-row justify-center items-center overflow-hidden`}>
                {text.split(" ").map((word, index) => (
                <motion.span
                    key={index}
                    className="text-white"
                >
                    {word}&nbsp;
                </motion.span>
                ))}
                <motion.span
                    className="text-white"
                >
                    <IoIosArrowRoundForward size={40} />
                </motion.span>
            </motion.div>
            <motion.button
            style={{
                transformOrigin:"left",
            }}
            // whileHover={{backgroundColor: "#000000", color:"white", border:"1px solid white"}}
            // transition={{
            //     duration:2,
            //     ease: "circOut"
            // }}
            className={`z-0 ${textColor} absolute right-[0.7vw] bottom-[1.1vh] w-full border-[0.2rem] px-2 md:px-0 py-2 ${border} text-xl xl:text-lg lg:text-sm md:text-sm first-letter:font-bold flex flex-row justify-center items-center gap-4 bg-white`}>{text}<IoIosArrowRoundForward  size={40}/> </motion.button>
        </motion.div>
    )
}