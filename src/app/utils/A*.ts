import { Coordinate,Walls } from "../types/mazeTypes";

export const A_start = (
  Matrix: Walls[][],
  Start: {
    i: number;
    j: number;
  },
  Goal : Coordinate
) => {
 var openFile: Coordinate[] =[]
var Closed = [];
var noads: Coordinate[] = [];
var childs = [[]];
var Indexchilds = 0;
 openFile.push(Start);
 noads.push(Start);

  while (openFile.length != 0) {
    var min = MinDistance(Goal, openFile);
    var Minindex = openFile.indexOf(min);
    var noad = openFile.splice(Minindex, 1)[0]; // Remove the element and return it
    if (noad.i == Goal.i && noad.j == Goal.j) {
    //   lastoneclosed = Closed[Closed.length - 1];
    //   Indexchilds = noads.findIndex(
    //     (item) => item.i === lastoneclosed.i && item.j === lastoneclosed.j
    //   );
    //   console.log(noads);
    //   console.log("Index : " + Indexchilds);
    //   console.log(childs);
    Closed.push(noad)
      break;
    }
    if (Closed.findIndex((item) => item.i === noad.i && item.j === noad.j) == -1) {
      Indexchilds = noads.findIndex(
        (item) => item.i === noad.i && item.j === noad.j
      );
      var path = Children(noad, Matrix);
      for (let i = 0; i < path.length; i++) {
        if (
          Closed.findIndex(
            (item) => item.i === path[i].i && item.j === path[i].j
          ) == -1
        ) {
          openFile.push(path[i]);
          noads.push(path[i]);
          childs.push([]);
          childs[Indexchilds].push(path[i]);
        }
      }
    }
    Closed.push(noad);
  }
  return {
    noads: noads,
    childs: childs,
    visited:Closed
  };
};
const ManhattanDistance = (index:Coordinate, Goal:Coordinate) => {
  return Math.abs(index.i - Goal.i) + Math.abs(index.j - Goal.j);
};

const MinDistance = (Goal:Coordinate, openFile:Coordinate[]) => {
  var min = openFile[0];
  for (let i = 1; i < openFile.length; i++) {
    if (ManhattanDistance(openFile[i], Goal) < ManhattanDistance(min, Goal))
      min = openFile[i];
  }
  return min;
};

const Children = (noad:Coordinate, Matrix:Walls[][]) => {
   var possiblePath = [];
  const i = noad.i;
  const j = noad.j;
    if (Matrix[i][j].up == 0) possiblePath.push({ i: i - 1, j: j });

    if (Matrix[i][j].down == 0) possiblePath.push({ i: i + 1, j: j });

    if (Matrix[i][j].left == 0) possiblePath.push({ i: i, j: j - 1 });

    if (Matrix[i][j].right == 0) possiblePath.push({ i: i, j: j + 1 });

  return possiblePath;
};

//     nodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
// children = [[1, 2, 3], [4, 5], [], [6], [], [], []]
