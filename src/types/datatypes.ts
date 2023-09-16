export interface ExampleData {
  uuid: string;
  name: string;
  textColour: string;
  backgroundColour: string;
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
