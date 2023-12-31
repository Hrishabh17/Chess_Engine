import React, { useContext } from 'react';
import { ChessUtilsContext } from '../Context/context';


export default function ChessAnimation() {
    const {chessUtils} = useContext(ChessUtilsContext)

    return (
        <div className='flex flex-col items-center justify-between h-full w-full  px-4 absolute z-0'>
            {
                Array(45).fill().map((_, i)=>(

                    <div key={i} className='flex flex-row items-center justify-between w-full h-max  px-4'>
                    {
                        Array(45).fill().map((_, index)=>(
                            <span key={index + i} className={`h-[2px] w-[2px] rounded-full ${chessUtils?.bg} shadow`}></span>

                            ))
                    }
                    </div>
                    ))
            }

        </div>
    );
}