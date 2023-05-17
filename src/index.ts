import * as memoize from "memoizee";

type Space = " ";

type Star = "*";

type Character = Space | Star;

type ArrayOfCharacter<T extends Character> = T[];

type Row = [...ArrayOfCharacter<Space>, ...ArrayOfCharacter<Star>, ...ArrayOfCharacter<Space>];

type Diamond = Row[];

export const print = (diamond: Diamond): string => {
  return diamond.map(printRow).join("\n");
};

const printRow = (row: Row): string => {
  return row.join("");
};

export const diamond = (dimension: number): Diamond => {
  const memoizedBuildRow = memoize(buildRow(dimension));
  return [...Array(dimension)].map((_, index) => memoizedBuildRow(computeTopHalfEquivalentIndex(dimension)(index)));
};

export const buildRow =
  (dimension: number) =>
  (index: number): Row => {
    const numberOfStars = 1 + 2 * index;
    const numberOfSpacesOnEachSide = (dimension - numberOfStars) / 2;
    const stars = buildArrayOf<Star>(numberOfStars, "*");
    const spaces = buildArrayOf<Space>(numberOfSpacesOnEachSide, " ");
    return [...spaces, ...stars, ...spaces];
  };

const buildArrayOf = <C extends Character>(length: number, character: C): ArrayOfCharacter<C> => {
  return Array(length).fill(character);
};

export const computeTopHalfEquivalentIndex =
  (dimension: number) =>
  (index: number): number => {
    if (index > (dimension - 1) / 2) {
      return dimension - 1 - index;
    }
    return index;
  };
