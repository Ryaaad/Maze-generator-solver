import { Coordinate, Walls } from "../types/mazeTypes";

export const RandomMaze = (
  columns: number,
  rows: number,
  Start: Coordinate,
) => {
  var Maze = initMaze(columns, rows);
  var visited: Coordinate[] = [];
  var Stack: Coordinate[] = [];
  var notVisited: Coordinate[] = [];
  visited.push(Start);
  Stack.push(Start);

  var N = Neighbors(Start, Maze, visited,notVisited);
  for (let i = 0; i < N.length; i++) {
    notVisited.push(N[i]);
  }
  var Index_to_visit = 0;
  var notVisitedIndex:number
//   console.log(notVisited);

  var noad: Coordinate;
  while (notVisited.length > 0) {
    while (N.length == 0) {
        console.log('====================================');
        console.log("visited  : ");
        console.log(visited);
        console.log('------------------------------------');
        console.log("unvisited  : ");
        console.log(notVisited);
        console.log('------------------------------------');
        console.log("Stack before : ");
      noad = Stack.splice(Stack.length-1, 1)[0]; // delete last element from stack
      console.log("Stack after : ");
      console.log(Stack)
      console.log("noad : ");
      console.log(noad)
      console.log('====================================');
      N = Neighbors(noad, Maze, visited);
      if (N.length != 0) Stack.push(noad); // restack that noad
    }
    Index_to_visit = RandomInt(0, N.length - 1);
    noad = N[Index_to_visit];
    notVisitedIndex = notVisited.findIndex(
        (item) => item.i == noad.i && item.j == noad.j
    );

      if (notVisitedIndex != -1) {
        notVisited.splice(notVisitedIndex, 1)[0];
      }
    Maze = UpdateMaze(Maze, noad, Stack[Stack.length - 1]);
    visited.push(noad);
    Stack.push(noad);
    N = Neighbors(noad, Maze, visited,notVisited);

  }
  console.log('====================================');
  console.log(Maze)
  console.log('====================================');
  console.log(visited)

  return Maze;
};

const initMaze = (columns: number, rows: number) => {
  var Mat: Walls[][] = [];
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
  visited: Coordinate[],
  notVisited?:Coordinate[],
) => {
  const i = cell.i;
  const j = cell.j;
  var Ns: { i: number; j: number }[] = [];
  if (i - 1 >= 0 && !CellVisited(i - 1, j, visited))
   {
     Ns.push({ i: i - 1, j: j });
    //  notVisited && notVisited.push({ i: i - 1, j: j })
    }
  if (i + 1 < Maze.length && !CellVisited(i + 1, j, visited))
   { Ns.push({ i: i + 1, j: j });
//   notVisited && notVisited.push({ i: i + 1, j: j })
}
  if (j - 1 >= 0 && !CellVisited(i, j - 1, visited)){
    Ns.push({ i: i, j: j - 1 });
    // notVisited && notVisited.push({ i: i, j: j-1 })
}
  if (j + 1 < Maze[0].length && !CellVisited(i, j + 1, visited)){
    Ns.push({ i: i, j: j + 1 });
    // notVisited && notVisited.push({ i: i, j: j+1 })
}
  return Ns;
};

const CellVisited = (i: number, j: number, visited: Coordinate[]) => {
  const visitedIndex = visited.findIndex(
    (item) => item.i === i && item.j === j
  );
  if (visitedIndex != -1) return true;
  else return false;
};
function RandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const UpdateMaze = (Maze: Walls[][], noad: Coordinate, prenoad: Coordinate) => {
  if (noad.i == prenoad.i + 1) {
    Maze[prenoad.i][prenoad.j].down = 0;
    Maze[noad.i][noad.j].up = 0;
  }
  if (noad.i == prenoad.i - 1) {
    Maze[prenoad.i][prenoad.j].up = 0;
    Maze[noad.i][noad.j].down = 0;
  }
  if (noad.j == prenoad.j - 1) {
    Maze[prenoad.i][prenoad.j].left = 0;
    Maze[noad.i][noad.j].right = 0;
  }
  if (noad.j == prenoad.j + 1) {
    Maze[prenoad.i][prenoad.j].right = 0;
    Maze[noad.i][noad.j].left = 0;
  }
  return Maze;
};
