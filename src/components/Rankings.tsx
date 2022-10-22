import React from 'react';
import Card from './Card';

const Rankings = () => {

    const testList = [
        { number: 1, name: "Faze" },
        { number: 2, name: "Sentinels" },
        { number: 3, name: "Cloud9" },
        { number: 4, name: "NRG" },
        { number: 5, name: "Evil Geniuses" },
        { number: 6, name: "Loud" },
        { number: 7, name: "MIBR" },
        { number: 8, name: "100 Thieves" },
        { number: 9, name: "Furia" },
        { number: 10, name: "Leviatan" },
      ];

    return (
        <div className="w-[66%] bg-zinc-800 columns-2 gap-0 my-10">
            {testList.map((item) => 
            <Card key={item.number} number={item.number} teamName={item.name} />
            )}
        </div>
    )
};

export default Rankings;