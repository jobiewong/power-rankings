import { motion } from "framer-motion";
import React from "react";
import initialTeams from "../data/initial-data.mjs";
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
      <div className="relative z-10 w-[75vw] lg:w-[64rem]">
        <div className="columns-2 gap-0">
          <div className="pointer-events-none absolute w-[66vw] columns-2 gap-0 ">
            {numbers.map((number, index) => (
              <Numbers key={number} number={number} index={index} />
            ))}
          </div>
          <RankingsList />
          <div className="initialiseTailwindColours hidden">
            <div className="bg-[#CBAE39]"></div>
            <div className="bg-[#D8D8D8]"></div>
            <div className="bg-[#CBAE39]"></div>
          </div>
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

const variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 25,
    transition: { delay: custom * 0.2, damping: 5, type: "spring" },
  }),
};

// define numbers component

const Numbers = ({ number, index }: numbersProps) => {
  return (
    <div className="relative mb-4 flex h-16 w-14 flex-col items-center justify-center text-2xl font-black text-white">
      {number}
      {index === 0 && <Underline colour="#CBAE39" iter={index} />}
      {index === 1 && <Underline colour="#D8D8D8" iter={index} />}
      {index === 2 && <Underline colour="#CBAE39" iter={index} />}
    </div>
  );
};

const Underline = (props: { colour: string; iter: number }) => {
  const colour = props.colour;

  return (
    <motion.div
      className="absolute flex translate-y-6 flex-col items-center"
      variants={variants}
      custom={props.iter}
      initial={"hidden"}
      animate={"visible"}
      transition={{
        delay: 100,
      }}
    >
      <div className={`mb-1 h-[.2rem] w-8 bg-[${colour}]`} />
      <div className={`h-[.2rem] w-5 bg-[${colour}]`} />
    </motion.div>
  );
};
