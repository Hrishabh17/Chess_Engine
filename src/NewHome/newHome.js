import ThemeButton from '../Button/themebutton'
import { IoIosArrowRoundForward  } from "react-icons/io";

export default function NewHome() {
    const NumberGrid = ({ number, bgColor, textColor }) => (
          <div id='title2' className={`pl-10 col-span-1 bg-${bgColor} border text-[6rem] text-${textColor} border-blue-500`}>{number}</div>
      );

    const stepGridItems = [
        { id:1 , bgColor: "black", textColor: "white", title: "Play With Friends", description: "Click on the 'Play with Friends' button to kick start a new chess match.", buttonText: "PLAY WITH FRIENDS" },
        { id:2 , bgColor: "black", textColor: "white", title: "Register", description: "Fill in the required details to register for the match and click on 'Generate' to receive your unique match link.", buttonText: "GENERATE" },
        { id:3 , bgColor: "white", textColor: "black", title: "Invite Friend", description: "Copy the link generated and share it with your friends to invite them for a pawn tug of war ", buttonText: "LET’S PLAY" },
        { id:4 , bgColor: "white", textColor: "black", title: "Play !", description: "Once your friend joins in, the match will begin automatically.", buttonText: "Chessboard" },
    ];

    const features=[
        {id:1, title:"Multiple Themes", description:"Choose from a variety of visually appealing themes for a personalized gaming experience."},
        {id:2, title:"In-Game Chat:", description:"Stay connected! Chat with your friend while you strategize your next move."},
        {id:3, title:"Video Call Feature:", description:"Make your game more interactive with our built-in video call feature."},
        {id:4, title:"Chess AI:", description:"Challenge yourself with our advanced Chess AI. Perfect your skills anytime, anywhere."},
    ]

    const chessPieces = [
        {id:1, name:"KING", image: "assets/bg_assets/king.svg", bgColor:"black", textColor:"white"},
        {id:2, name:"QUEEN" , image: "/assets/bg_assets/queen.svg" ,bgColor:"white", textColor:"black"},
        {id:3, name:"BISHOP", image: "/assets/bg_assets/bishop.svg", bgColor:"black", textColor:"white"},
        {id:4, name:"KNIGHT", image: "/assets/bg_assets/knight.svg", bgColor:"white", textColor:"black"},
        {id:5, name:"ROOK" , image: "/assets/bg_assets/rook.svg", bgColor:"black", textColor:"white"},
        {id:6, name:"PAWN" , image: "/assets/bg_assets/pawn.svg", bgColor:"white", textColor:"black"},
    ]

    const ChessPieces = ({ name, image, bgColor, textColor }) => (
        <div className={`pt-44 col-span-1 bg-${bgColor} flex flex-row gap-20 ${bgColor=='black'?'justify-start':'pr-32 justify-end'}`}>
            {bgColor=='black'?(<img src={image} alt="" className={`mt-6 ${name=='BISHOP'?'pl-24':'pl-32'}`}/>):(<></>)}
            {console.log(image)}
            <div id='title' className={`mt-10 w-1/5 text-${textColor} text-[3rem] ${bgColor=='black'?'':'text-right flex flex-row justify-end'} tracking-wider`}>THE {name}</div>
            {bgColor=='white'?(<img src={image} alt="" className={`mt-6 ${name=='KNIGHT'?'h-36 mt-14':''}`}/>):(<></>)}
        </div>
    );
    return (
        <>
        <div className="h-screen grid grid-cols-12">
            <div className="bg-black w-full col-span-6 ">
                <div className="mt-6 min-h-[2rem] min-w-full flex flex-row">
                    <button className="ml-16 py-1 px-4 flex flex-col justify-center items-center border-[0.1rem] border-white font-century-gothic text-sm text-white hover:border-black hover:text-black hover:bg-white">Choose your theme</button>
                        <div className="min-h-[1.5rem] max-h-[1.8rem] flex flex-row justify-center items-center">
                            <div className="ml-10 min-h-[1.5rem] max-h-[1.8rem] min-w-[2vw] bg-red-500 hover:border-4 hover:border-white"></div>
                            <div className="min-h-[1.5rem] max-h-[1.8rem] min-w-[2.5vw] bg-yellow-500 hover:border-4 hover:border-white"></div>
                            <div className="min-h-[1.5rem] max-h-[1.8rem] min-w-[3vw] bg-green-700 hover:border-4 hover:border-white"></div>
                            <div className="min-h-[1.5rem] max-h-[1.8rem] min-w-[3.5vw] bg-blue-600 hover:border-4 hover:border-white"></div>
                            <div className="min-h-[1.5rem] max-h-[1.8rem] min-w-[4vw] bg-violet-800 hover:border-4 hover:border-white"></div>
                            <div className="min-h-[1.5rem] max-h-[1.8rem] min-w-[4.5vw] bg-pink-500 hover:border-4 hover:border-white"></div>
                        </div>
                </div>
                <div className='ml-16 mt-10 min-w-full'>
                    <div id='title' className='ml-2 text-[4.5rem] text-white font-[Holtwood]'>8 x 8</div>
                    <div className='min-w-[20vw] max-w-[40vw]'>
                        <div id='title2' className='-mt-4 text-[6rem] text-white tracking-wide font-[Monoton]'>CHESS</div>
                        <div className='mt-2 text-white font-century-gothic'>8X8 is your one stop solution for AI based Chess engine with loaded features like video calls, timers, move history and much more ...</div>
                    </div>
                    <div className='mt-10 font-century-gothic text-white text-4xl'>Play. Now.</div>
                    <img src=" ./chesspieceline.svg" className='ml-2 mt-16 h-28' />
                </div>
            </div>
            <div className="bg-white col-span-6">
                <div className='mt-8 min-w-full flex flex-col justify-center items-center'>
                    <div className='min-w-[5vw] grid grid-cols-5 gap-4'>
                        <div className='text-3xl font-century-gothic font-bold'>F</div>
                        <div className='text-3xl font-century-gothic font-bold'>I</div>
                        <div className='text-3xl font-century-gothic font-bold'>R</div>
                        <div className='text-3xl font-century-gothic font-bold'>S</div>
                        <div className='text-3xl font-century-gothic font-bold'>T</div>
                    </div>
                        <div className='text-5xl font-century-gothic font-bold tracking-widest'>MOVE</div>
                    <img src="./chessfront.svg" className='mt-10 h-52 mb-24' />
                    <div className='w-full flex flex-col justify-center items-center gap-16'>
                        <ThemeButton text={"Play with Friends"}/>
                        <ThemeButton text={"Play with Computer"}/>
                    </div>
                </div>
            </div>
        </div>
        <div className='h-[80vh] flex flex-col'>
            <div className="grid grid-cols-4">
                {
                    stepGridItems.map((item) => (
                        <div className='col-span-1'>
                            <div id='title2' className={`pl-10 pt-12 col-span-1 bg-${item.bgColor} text-[6rem] text-${item.textColor}`} >{item.id}.</div>
                        </div>
                    ))
                }
            </div>
            <div className='grid grid-cols-4'>
                {
                    stepGridItems.map((item) => (
                        <div className={`pl-10 col-span-1 bg-${item.bgColor} text-${item.textColor}`} >
                            <div className='text-[1.85rem] font-century-gothic'>{item.title}</div>
                        </div>
                    ))
                }
            </div>
            <div className='grid grid-cols-4'>

                {
                    stepGridItems.map((item) => (
                        <div className={`pl-10 col-span-1 bg-${item.bgColor} text-${item.textColor}`} >
                            <div className='mt-12 font-century-gothic w-4/5'>{item.description}</div>  
                        </div>
                    ))
                }
            </div>
            <div className='grid grid-cols-4 h-full'>
                {
                    stepGridItems.map((item) => (
                        <div className={`pl-10 col-span-1 bg-${item.bgColor} text-${item.textColor}`} >
                            {item.id==4?(
                                <div className='mt-10 w-4/5'>
                                    <img src="./assets/bg_assets/step4image.svg" alt="chessboard" />
                                </div>
                            ):(
                                <div className={`mt-24 py-2 px-1 w-4/5 bg-white text-black border-[0.15rem] border-black flex flex-row justify-center items-center font-bold text-[1.1rem] font-century-gothic tracking-wide`}>{item.buttonText} <IoIosArrowRoundForward className='ml-2' size={30}/></div>
                            )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
        <div className='h-full flex flex-col'>
            <div className='grid grid-cols-2'>
                <div className='pl-10 col-span-1 bg-black'><p id='title2' className='text-[3.5rem] tracking-wider'>FEATURES:</p></div>
                <div className="col-span-1 bg-white h-full"></div>
            </div>
            <div className='grid grid-cols-2 font-century-gothic'>
                <div className='pl-10 col-span-1 bg-black'>
                    <div className='px-3 py-2 mt-10 bg-white text-black w-9/12 font-bold text-[1.5rem]'>{features[0].title}</div>
                    <div className='mt-8 w-8/12 text-white'>
                        {features[0].description}
                    </div>
                </div>
                <div className="pt-12 col-span-1 bg-white h-full flex justify-center gap-8">
                    <img src="./assets/bg_assets/pallete.svg" alt="for theme change" className='h-14'/>
                    <img src="./assets/bg_assets/theme-changed.svg" alt="theme changed" className='h-28'/>
                </div>
            </div>
            <div className='grid grid-cols-2 font-century-gothic'>
                <div className='pt-12 pl-10 col-span-1 bg-black'>
                    <div className='px-3 py-2 mt-10 bg-white text-black w-9/12 font-bold text-[1.5rem]'>{features[1].title}</div>
                    <div className='mt-8 w-8/12 text-white'>
                        {features[1].description}
                    </div>
                </div>
                <div className="pt-24 col-span-1 bg-white h-full">
                    <div className='flex justify-center gap-14'>
                        <img src="./assets/bg_assets/feature2.svg" alt="for theme change" className='h-48'/>
                        <div className='w-1/5'>
                            <img src="./assets/bg_assets/chat1.svg" alt="" className='h-16 ml-20 mb-3'/>
                            <img src="./assets/bg_assets/chat2.svg" alt="" className='h-20 mb-3'/>
                            <img src="./assets/bg_assets/chat3.svg" alt="" className='h-24 ml-20'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 font-century-gothic'>
                <div className='pt-12 pl-10 col-span-1 bg-black'>
                    <div className='px-3 py-2 mt-10 bg-white text-black w-9/12 font-bold text-[1.5rem]'>{features[2].title}</div>
                    <div className='mt-8 w-8/12 text-white'>
                        {features[2].description}
                    </div>
                </div>
                <div className="pt-24 col-span-1 bg-white h-full flex justify-center">
                    <div className="relative bg-black h-28 w-6/12">
                        <img src="./assets/bg_assets/video-call-feature.svg" alt="" className='absolute h-36 z-10 right-[0.8vw] bottom-[0vh]'/>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 font-century-gothic'>
                <div className='pt-12 pl-10 col-span-1 bg-black'>
                    <div className='px-3 py-2 mt-10 bg-white text-black w-9/12 font-bold text-[1.5rem]'>{features[3].title}</div>
                    <div className='mt-8 w-8/12 text-white'>
                        {features[3].description}
                    </div>
                </div>
                <div className="pt-12 col-span-1 bg-white h-full flex justify-center">
                    <div id='title' className='text-[6rem] tracking-widest'>A.I.</div>
                </div>
            </div>
            <div className='h-full flex-col'>
                <div className='grid grid-cols-2'>
                    <ChessPieces name={chessPieces[0].name} image={chessPieces[0].image} bgColor={chessPieces[0].bgColor} textColor={chessPieces[0].textColor}/>
                    <ChessPieces name={chessPieces[1].name} image={chessPieces[1].image} bgColor={chessPieces[1].bgColor} textColor={chessPieces[1].textColor}/>
                </div>
                <div className='grid grid-cols-2'>
                    <ChessPieces name={chessPieces[2].name} image={chessPieces[2].image} bgColor={chessPieces[2].bgColor} textColor={chessPieces[2].textColor}/>
                    <ChessPieces name={chessPieces[3].name} image={chessPieces[3].image} bgColor={chessPieces[3].bgColor} textColor={chessPieces[3].textColor}/>
                </div>
                <div className='grid grid-cols-2'>
                    <ChessPieces name={chessPieces[4].name} image={chessPieces[4].image} bgColor={chessPieces[4].bgColor} textColor={chessPieces[4].textColor}/>
                    <ChessPieces name={chessPieces[5].name} image={chessPieces[5].image} bgColor={chessPieces[5].bgColor} textColor={chessPieces[5].textColor}/>
                </div>
            </div>
        </div>
        </>
    )
}