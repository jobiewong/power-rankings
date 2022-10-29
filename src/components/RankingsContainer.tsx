import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { DataContext } from "../data/Context";
import initialTeams from "../data/initial-data";
import { teamProps } from "../data/team-type";
import OverflowList from "./OverflowList";
import RankingsList from "./RankingsList";

const RankingsContainer = () => {
  // set list length to match team list length

  const listLength = Object.keys(initialTeams.teams).length;

  // generate list numbers based on team list length

  const numbers = [];
  for (let i = 1; i <= listLength; i++) {
    numbers.push(i);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [data, setData] = useContext(DataContext);

  const teamArray = Object.keys(data).map((key) => {
    return data[key].id;
  });

  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleEnd(event: any) {
    setIsDragging(false);
    const { active, over } = event;

    if (active.id !== over.id) {
      setData((currData: teamProps[]) => {
        // update Data with new array order
        const oldIndex = teamArray.indexOf(active.id);
        const newIndex = teamArray.indexOf(over.id);

        const modifiedArray = arrayMove(teamArray, oldIndex, newIndex);

        const sorted = [...currData].sort(
          (a, b) => modifiedArray.indexOf(a.id) - modifiedArray.indexOf(b.id)
        );
        return sorted;
      });
    }
  }

  return (
    <>
      <div className="relative w-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleEnd}
        >
          <div className="columns-2 gap-0">
            <div className="pointer-events-none absolute w-[75vw] columns-2 gap-0 lg:w-[64rem] ">
              {numbers.map((number, index) => (
                <Numbers key={number} number={number} index={index} />
              ))}
            </div>
            <div className="w-full">
              <div className="">
                <RankingsList array={teamArray} dataObj={data} />
              </div>
            </div>

            <div className="initialiseTailwindColours hidden">
              <div className="bg-[#CBAE39]"></div>
              <div className="bg-[#D8D8D8]"></div>
              <div className="bg-[#CBAE39]"></div>
            </div>
          </div>
          <OverflowList key={"overflow"} id={"overflow"} dragging={isDragging}>
            {/* {parent === id ? item : null} */}
          </OverflowList>
        </DndContext>
      </div>
    </>
  );
};

export default RankingsContainer;

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
