import ChessAnimation from "../Register/chessAnimation"
import { useMediaQuery } from 'react-responsive';

export default function ComingSoon() {
    const isMobile = useMediaQuery({ query: '(max-width: 860px)' })
    
    return(
        <div className="h-full bg-white flex justify-center items-center">
            {isMobile?(
                <div className="flex flex-col justify-center items-center z-10 bg-white">
                    <img src="assets/bg_assets/work-in-progress.svg" alt="" className="h-48"/>
                    <div className="font-[Monoton] text-[3rem] w-4/5 flex justify-center items-center text-center">
                        Work&nbsp;&nbsp;&nbsp;in Progress
                    </div>
                    <span className="mt-4 mb-8 font-[CenturyGothic] font-extrabold text-center w-4/5 bg-white">Challenge yourself with our AI, the ultimate chess partner!</span>
                </div>
            ):(<div className="flex flex-row bg-white z-10">
            <div className="h-max flex items-center justify-center">  
                <img src="assets/bg_assets/work-in-progress.svg" alt=""  className="h-40"/>
            </div>
        <div className="p-3 flex flex-col bg-white z-10 justify-center items-center">
            <div>
                <span className="mr-4 font-[Monoton] text-[4rem]">Work</span>
                <span className="mr-4 font-[Monoton] text-[4rem]">in</span>
                <span className="font-[Monoton] text-[4rem]">progress</span>
            </div>
            <span className="mr-8 font-[CenturyGothic] font-extrabold bg-white">Challenge yourself with our AI, the ultimate chess partner!</span>
        </div>
        </div>)}
        <ChessAnimation/>
        </div>
    )
}