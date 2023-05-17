import * as memoize from "memoizee";

type Space = " ";

type Star = "*";

type Character = Space | Star;

type ArrayOfCharacter<T extends Character> = T[];

type Row = [...ArrayOfCharacter<Space>, ...ArrayOfCharacter<Star>, ...ArrayOfCharacter<Space>];

type Diamond = Row[];

export const middleLine = (dimension: number): number => (dimension - 1) / 2;

export const buildRow =
  (dimension: number) =>
  (index: number): Row => {
    if (dimension === 1) {
      return ["*"];
    }

    if (index === middleLine(dimension)) {
      return ["*", ...buildRow(dimension - 2)(index - 1), "*"];
    }

    return [" ", ...buildRow(dimension - 2)(index), " "];
  };

export const computeTopHalfEquivalentIndex =
  (dimension: number) =>
  (index: number): number => {
    if (index > middleLine(dimension)) {
      return dimension - 1 - index;
    }
    return index;
  };

export const diamond = (dimension: number): Diamond => {
  const memoizedBuildRow = memoize(buildRow(dimension));
  return [...Array(dimension)].map((_, index) => memoizedBuildRow(computeTopHalfEquivalentIndex(dimension)(index)));
};

const printRow = (row: Row): string => {
  return row.join("");
};

export const print = (diamond: Diamond): string => {
  return diamond.map(printRow).join("\n");
};
