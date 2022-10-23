import React from "react";
import initialTeams from "../data/initial-data.mjs";
import RankingsList from "./RankingsList";

const Rankings = () => {
  // set list length to match team list length

  const listLength = Object.keys(
    initialTeams.columns["list-main"].teamIds
  ).length;

  // generate list numbers based on team list length

  const numbers = [];
  for (let i = 1; i <= listLength; i++) {
    numbers.push(i);
  }

  return (
    <>
      <div className="w-[66vw] bg-zinc-800">
        <div className="gap-0 lg:columns-2">
          <div className="pointer-events-none absolute w-[66vw] gap-0 lg:columns-2">
            {numbers.map((number) => (
              <Numbers key={number} number={number} />
            ))}
          </div>
          <RankingsList />
        </div>
      </div>
    </>
  );
};

export default Rankings;

type numbersProps = {
  number: number;
};

// define numbers component
const Numbers = ({ number }: numbersProps) => {
  return (
    <div className="relative mb-4 flex h-16 w-14 items-center justify-center bg-blue-500/10 text-2xl font-black">
      {number}
    </div>
  );
};
