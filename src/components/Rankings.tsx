import React from 'react';
import initialTeams from '../data/initial-data.mjs';
import Card from './Card';

const Rankings = () => {
    const teams = initialTeams.teams;

    function objectLength(obj : any) {
        let result = 0;
        for(const prop in obj) {
          if (obj.hasOwnProperty(prop)) {
          // or Object.prototype.hasOwnProperty.call(obj, prop)
            result++;
          }
        }
        return result;
      }

    const listLength = objectLength(teams)
    

    const numbers = [];
    for (let i = 1; i <= listLength; i++) {
        numbers.push(i);
    }

    return (
        <>
        <div className="w-[66vw] bg-zinc-800">
            <div className="lg:columns-2 gap-0">
                <div className="absolute lg:columns-2 gap-0 w-[66vw]">
                    {numbers.map((number) => 
                    <Numbers key={number} number={number} />)}
                </div> 
                <div className="">
                    {initialTeams.columns['list-main'].teamIds.map((teamId) => 
                    <Card key={teamId} team={teams[teamId]} />
                    )}
                </div>
            </div>
            
        </div>
        </>
    )
};

export default Rankings;

type numbersProps = {
    number: number
}

// define numbers component
const Numbers = ({number}: numbersProps) => {
    return(
        <div className="relative h-16 flex items-center mb-4 justify-center font-black text-2xl w-14 bg-blue-500/10">
            {number}
        </div>
    )
}