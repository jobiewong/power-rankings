import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { teamProps } from "../data/team-type";

interface props {
  id: string;
  team: teamProps;
}

const Card = (props: props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useSortable({ id: props.id, transition: null }); // error created by tsconfig jsx: preserve which is set automatically by nextjs

  const baseStyles: React.CSSProperties = {
    position: "relative",
  };

  const initialStyles = {
    x: 0,
    y: 0,
    scale: 1,
  };

  const stylesItem = "mb-4 flex h-16 w-full flex-row";

  return (
    <div className="flex flex-row">
      <div className="pointer-events-none h-0 w-16 bg-transparent"></div>

      <motion.div
        className={stylesItem}
        style={baseStyles}
        ref={setNodeRef}
        layoutId={props.id}
        animate={
          transform
            ? {
                x: transform.x,
                y: transform.y,
                scale: isDragging ? 1.05 : 1,
                zIndex: isDragging ? 1 : 0,
                boxShadow: isDragging
                  ? "0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(0, 0, 0, 0.25)"
                  : undefined,
              }
            : initialStyles
        }
        transition={{
          duration: !isDragging ? 0.25 : 0,
          damping: 15,
          type: "spring",
          scale: {
            duration: 0.25,
          },
          zIndex: {
            delay: isDragging ? 0 : 0.25,
          },
        }}
        {...attributes}
        {...listeners}
      >
        <div
          className={`flex w-full flex-row rounded-sm`}
          style={{
            color: props.team.textCol,
            backgroundColor: props.team.bgCol,
          }}
        >
          <div className="flex h-full w-16 flex-col items-center justify-center rounded-l-sm bg-white">
            <Image
              alt={props.team.name}
              src={`/images/${props.team.logo}.png`}
              width={48}
              height={48}
            />
          </div>
          <div className="flex items-center px-4 text-2xl font-black uppercase">
            {props.team.name}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
