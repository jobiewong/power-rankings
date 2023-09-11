import * as React from "react";
import type { ExampleData } from "~/types/datatypes";

const RankingsItem = React.forwardRef<HTMLLIElement, { data: ExampleData }>(
  function RankingsItem({ data }, ref) {
    return (
      <li ref={ref} className="flex w-full text-white">
        <div className="aspect-square h-full" />
        <div className="aspect-square h-full bg-red-500" />
        <div
          className="w-full p-4"
          style={{
            backgroundColor: data.backgroundColour,
          }}
        >
          {data.name}
        </div>
      </li>
    );
  },
);

export default RankingsItem;
