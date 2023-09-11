import { faker } from "@faker-js/faker";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ExampleData } from "~/types/datatypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateData(number: number) {
  const data = [];
  for (let i = 0; i < number; i++) {
    data.push({
      uuid: faker.string.uuid(),
      name: faker.person.fullName(),
      textColour: faker.internet.color(),
      backgroundColour: faker.internet.color(),
    });
  }
  return data;
}

export function findItem(items: ExampleData[], uuid: string) {
  return items.find((item) => item.uuid === uuid);
}
