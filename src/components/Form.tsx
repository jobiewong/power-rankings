import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../data/Context";

export default function Form() {
  const [data, setData] = useContext(DataContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (input) => {
    const id = nanoid();
    setData([...data, { id, name: input.name }]);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input type="text" autoComplete="off" {...register("name")} />
        </label>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
