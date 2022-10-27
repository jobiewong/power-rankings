import React from "react";
import initialTeams from "../data/initial-data.mjs";
import Form from "./Form";
import RankingsList from "./RankingsList";

const Rankings = () => {
  // set list length to match team list length

  const listLength = Object.keys(initialTeams.teams).length;

  // generate list numbers based on team list length

  const numbers = [];
  for (let i = 1; i <= listLength; i++) {
    numbers.push(i);
  }

  return (
    <>
      <div className="w-[66vw]">
        <div className="columns-2 gap-0">
          <div className="pointer-events-none absolute w-[66vw] columns-2 gap-0 ">
            {numbers.map((number, index) => (
              <Numbers key={number} number={number} index={index} />
            ))}
          </div>
          {/* <Form /> */}
          <RankingsList />
        </div>
      </div>
    </>
  );
};

export default Rankings;

type numbersProps = {
  number: number;
  index: number;
};

// define numbers component
const Numbers = ({ number, index }: numbersProps) => {
  return (
    <div className="relative mb-4 flex h-16 w-14 flex-col items-center justify-center text-2xl font-black text-white">
      {number}
      {index === 0 && (
        <div className="absolute flex translate-y-6 flex-col items-center">
          <div className="mb-1 h-[.2rem] w-8 bg-[#CBAE39]" />
          <div className="h-[.2rem] w-5 bg-[#CBAE39]" />
        </div>
      )}
      {index === 1 && (
        <div className="absolute flex translate-y-6 flex-col items-center">
          <div className="mb-1 h-[.2rem] w-8 bg-[#D8D8D8]" />
          <div className="h-[.2rem] w-5 bg-[#D8D8D8]" />
        </div>
      )}
      {index === 2 && (
        <div className="absolute flex translate-y-6 flex-col items-center">
          <div className="mb-1 h-[.2rem] w-8 bg-[#AC8A61]" />
          <div className="h-[.2rem] w-5 bg-[#AC8A61]" />
        </div>
      )}
    </div>
  );
};
