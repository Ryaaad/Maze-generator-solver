import { Coordinate, Walls } from "../types/mazeTypes";

export const RandomMaze = (
  columns: number,
  rows: number,
  Start: Coordinate
) => {
  var Maze = initMaze(columns, rows);
  var visited: Coordinate[] = [];
  var Stack: Coordinate[] = [];
  var notVisited: Coordinate[] = [];

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      notVisited.push({ i, j });
    }
  }

  visited.push(Start);
  Stack.push(Start);

  let N = Neighbors(Start, Maze, visited);
  let Index_to_visit = 0;
  let notVisitedIndex: number;
  let noad: Coordinate;

  while (notVisited.length > 0) {
    while (N.length === 0 && Stack.length > 0) {
      noad = Stack.pop()!; // delete last element from stack
      N = Neighbors(noad, Maze, visited);
      if (N.length !== 0) Stack.push(noad); // restack that noad if it has neighbors
    }

    if (N.length > 0) {
      Index_to_visit = RandomInt(0, N.length - 1);
      noad = N[Index_to_visit];

      notVisitedIndex = notVisited.findIndex(
        (item) => item.i === noad.i && item.j === noad.j
      );
      if (notVisitedIndex !== -1) {
        notVisited.splice(notVisitedIndex, 1);
      }

      Maze = UpdateMaze(Maze, noad, Stack[Stack.length - 1]);
      visited.push(noad);
      Stack.push(noad);
      N = Neighbors(noad, Maze, visited);
    } else {
      // If Stack is empty and no more neighbors to visit, break the loop
      break;
    }
  }
  console.log(Maze)
  return Maze;
};

const initMaze = (columns: number, rows: number): Walls[][] => {
  const Mat: Walls[][] = [];
  for (let i = 0; i < columns; i++) {
    Mat[i] = [];
    for (let j = 0; j < rows; j++) {
      Mat[i].push({ up: 1, down: 1, right: 1, left: 1 });
    }
  }
  return Mat;
};

const Neighbors = (
  cell: Coordinate,
  Maze: Walls[][],
  visited: Coordinate[]
): Coordinate[] => {
  const { i, j } = cell;
  const Ns: Coordinate[] = [];
  if (i - 1 >= 0 && !CellVisited(i - 1, j, visited)) Ns.push({ i: i - 1, j });
  if (i + 1 < Maze.length && !CellVisited(i + 1, j, visited)) Ns.push({ i: i + 1, j });
  if (j - 1 >= 0 && !CellVisited(i, j - 1, visited)) Ns.push({ i, j: j - 1 });
  if (j + 1 < Maze[0].length && !CellVisited(i, j + 1, visited)) Ns.push({ i, j: j + 1 });
  return Ns;
};

const CellVisited = (i: number, j: number, visited: Coordinate[]): boolean => {
  return visited.some(item => item.i === i && item.j === j);
};

function RandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const UpdateMaze = (Maze: Walls[][], noad: Coordinate, prenoad: Coordinate): Walls[][] => {
  if (noad.i === prenoad.i + 1) {
    Maze[prenoad.i][prenoad.j].down = 0;
    Maze[noad.i][noad.j].up = 0;
  }
  if (noad.i === prenoad.i - 1) {
    Maze[prenoad.i][prenoad.j].up = 0;
    Maze[noad.i][noad.j].down = 0;
  }
  if (noad.j === prenoad.j - 1) {
    Maze[prenoad.i][prenoad.j].left = 0;
    Maze[noad.i][noad.j].right = 0;
  }
  if (noad.j === prenoad.j + 1) {
    Maze[prenoad.i][prenoad.j].right = 0;
    Maze[noad.i][noad.j].left = 0;
  }
  return Maze;
};
