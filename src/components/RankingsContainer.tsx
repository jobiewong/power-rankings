import {
  closestCenter,
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
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
  const [activeId, setActiveId] = useState<string | null>();

  const [mainArray, setMainArray] = useState([""]);
  const [overflowArray, setOverflowArray] = useState([""]);

  useEffect(() => {
    // create array of ID's in data
    const main = Object.keys(data.main).map((key) => {
      return data.main[key].id;
    });
    const overflow = Object.keys(data.overflow).map((key) => {
      return data.overflow[key].id;
    });

    setMainArray(main);
    setOverflowArray(overflow);
  }, [data]);

  const [isDragging, setIsDragging] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function findContainer(id: string) {
    if (id in data) {
      return id;
    }

    return Object.keys(data).find((key) =>
      data[key].find((team: teamProps) => team.id === id)
    );
  }

  function handleDragStart(event: any) {
    const { active } = event;
    const { id } = active;
    setIsDragging(true);

    setActiveId(id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = data[activeContainer]
      .map(function (e: teamProps) {
        return e.id;
      })
      .indexOf(active.id);
    const overIndex = data[overContainer]
      .map(function (e: teamProps) {
        return e.id;
      })
      .indexOf(overId);

    if (activeIndex !== overIndex) {
      setData((items: any) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }

  function handleDragOver(event: any) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setData((prev: any) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = data[activeContainer]
        .map(function (e: teamProps) {
          return e.id;
        })
        .indexOf(active.id);
      const overIndex = data[overContainer]
        .map(function (e: teamProps) {
          return e.id;
        })
        .indexOf(overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem = over && overIndex === overItems.length - 1;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        [activeContainer]: [
          ...prev[activeContainer].filter(
            (item: teamProps) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          data[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  return (
    <>
      <div className="relative w-full">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="absolute">
            <div className="pointer-events-none grid h-96 w-[75vw] grid-flow-col grid-cols-2 grid-rows-5 lg:w-[64rem]">
              {numbers.map((number, index) => (
                <Numbers key={number} number={number} index={index} />
              ))}
            </div>
            <div className="w-full">
              <div className="initialiseTailwindColours hidden">
                <div className="bg-[#CBAE39]"></div>
                <div className="bg-[#D8D8D8]"></div>
                <div className="bg-[#AC8A61]"></div>
              </div>
              <div className=""></div>
            </div>
          </div>
          <RankingsList id="main" array={mainArray} dataObj={data.main} />
          <OverflowList
            id={"overflow"}
            array={overflowArray}
            dataObj={data.overflow}
            dragging={isDragging}
          ></OverflowList>
          {/* <DragOverlay>
            {activeId ? <CardOverlay id={activeId} /> : null}
          </DragOverlay> */}
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
    <div className="w-full">
      <div className="mb-4 flex h-16 w-14 flex-col items-center justify-center text-2xl font-black text-white">
        {number}
        {index === 0 && <Underline colour="#CBAE39" iter={index} />}
        {index === 1 && <Underline colour="#D8D8D8" iter={index} />}
        {index === 2 && <Underline colour="#AC8A61" iter={index} />}
      </div>
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

const CardOverlay = (props: any) => {
  return <div>{props.id}</div>;
};
