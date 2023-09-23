export interface ExampleData {
  uuid: string;
  name: string;
  textColour: string;
  backgroundColour: string;
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ListData {
  root: string[];
  overflow: string[];
  tierBreaks: string[];
}

export type OverflowBehaviour = "displace" | "disallow" | "swap";
