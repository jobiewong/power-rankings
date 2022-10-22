import React from 'react';

type CardProps = {team: string}

const Card = ({team}: any) => {
  return (
    <div className="pl-14 w-full bg-green-500/10 mb-4 h-16 flex flex-row">
        <div className="rounded-sm flex flex-row w-full bg-black text-white">
          <div className=" h-full w-16 flex flex-col items-center justify-center bg-zinc-400">logo</div>
          <div className="flex items-center px-4 font-black text-2xl uppercase">{team.name}</div>
        </div>
       
    </div>
  )
};

export default Card;