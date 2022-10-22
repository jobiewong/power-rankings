import React from 'react';

type CardProps = {number: number, teamName: string}

const Card = ({number, teamName}: CardProps) => {
  return (
    <div className="w-full bg-green-500/10 mb-4 h-16 flex flex-row">
        <div className="h-full w-16 text-white bg-red-500/10 flex flex-col items-center justify-center text-2xl font-black">
          <p>{number}</p>
        </div>
        <div className="rounded-sm flex flex-row w-full bg-black text-white">
          <div className=" h-full w-16 flex flex-col items-center justify-center bg-zinc-400">logo</div>
          <div className="flex items-center px-4 font-black text-2xl uppercase">{teamName}</div>
        </div>
       
    </div>
  )
};

export default Card;