"use client";
import { useEffect, useState } from "react";
import { A_start } from "./utils/A*";
import { RandomMaze,RandomInt } from "./utils/RandoMaze";
import { Coordinate, Walls } from "./types/mazeTypes";
export default function Home() {
  const [Size, setSize] = useState<number>(10);
  const [MazeSize, setMazeSize] = useState<number>(10);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const updateSize = () => {
      setMazeSize(undefined); 
      setTimeout(() => {
        setMazeSize(Size);
      }, 0);
      setGoal(undefined);
      setStart(undefined);
   
  };
  
  const RandomSize = () => {
    setMazeSize(undefined); 
    setTimeout(() => {
      const size=RandomInt(10,100)
      setMazeSize(size);
    }, 0);
    setGoal(undefined);
    setStart(undefined);
 
};
  const [Solution, setSolution] = useState<{
    noads: Coordinate[];
    childs: any[][];
    visited: any[];
  }>();
  const [Start, setStart] = useState<Coordinate>();
  const [Goal, setGoal] = useState<Coordinate>();
  const [Maze, setMaze] = useState<Walls[][]>();
  const [GoalTurn, setTurn] = useState<boolean>(false);

  useEffect(() => {
    if (Start != undefined && Goal != undefined)
      setSolution(A_start(Maze, Start, Goal));
    else setSolution(undefined);
  }, [Start, Goal, Maze]);

  useEffect(() => {
    if(MazeSize){
      setMaze(undefined);
      setTimeout(() => {
        setMaze(RandomMaze(MazeSize, MazeSize)); 
      }, 5);
    }
  }, [MazeSize]);

  const SolutionCor = (cor: Coordinate) => {
    if (GoalTurn) {
      if (Start?.i != cor.i || Start?.j != cor.j) {
        setGoal(cor);
        setTurn(false);
      }
    } else {
      setStart(cor);
      setGoal(undefined);
      setTurn(true);
    }
  };

  return (
    <div className="flex justify-around m-auto w-[90vw] h-[90vh]">
      <div className="w-96 h-96">
        <div
          style={{
             gridTemplateColumns:MazeSize && Maze && `repeat(${MazeSize}, minmax(0, 1fr))`,
            gridTemplateRows:MazeSize && Maze && `repeat(${MazeSize}, minmax(0, 1fr))`,
          }}
          className={` w-full max-h-full min-h-full h-full ${!MazeSize || !Maze ? "flex justify-center items-center "  : "grid"  } grid m-5 border-solid border-4 border-[red] `}
        >
          {MazeSize &&
            Maze &&
            Maze.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <div
                  id={`${rowIndex}${colIndex}`}
                  key={`${rowIndex}-${colIndex}`}
                  className={` ${value.down && "border-b-[red] "} ${
                    value.up && "border-t-[red]"
                  }  ${value.left && "border-l-[red] "}
            ${
              value.right && "border-r-[red] "
            } border-solid border border-[#ffffff00] w-full h-full ${
                    Solution?.visited.some(
                      (items) => items.i == rowIndex && items.j == colIndex
                    )
                      ? Start?.i == rowIndex && Start?.j == colIndex
                        ? "bg-[#004cff]"
                        : "bg-[#ffff00d6]"
                      : Start?.i == rowIndex && Start?.j == colIndex
                      ? "bg-[#004cff]"
                      : "bg-white"
                  }
              ${Goal?.i == rowIndex && Goal?.j == colIndex && "bg-[green]"}
              ${Start?.i == rowIndex && Start?.j == colIndex && "bg-[#004cff]"}
              `}
                  onClick={() => SolutionCor({ i: rowIndex, j: colIndex })}
                ></div>
              ))
            )}
           {
            !MazeSize || !Maze && <div className="text-xl text-[red] font-bold " >
              Loading ...
            </div>
           } 
        </div>
      </div>
      <div className="grid  h-56 items-center ">
        {/* <button className="bg-black text-white w-20 h-6  ">
          Start MiniGame
        </button>
        <button className="bg-black text-white  w-20 h-6   ">Solution</button>
        <button className="bg-black text-white  w-20 h-6  ">Select</button> */}
        <div className="w-60">
          <input
            type="range"
            min="10"
            max="100"
            value={Size}
            onChange={handleSizeChange}
            className="slider w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="mt-2 text-center text-sm font-medium text-gray-700">
            Maze Size :   {Size} * {Size}
          </div>
        </div>
        <button className="w-60 h-14 rounded-md flex items-center justify-center text-white bg-black font-semibold text-sm " onClick={() => updateSize()}> Generate a maze with the defined Size </button>
        <button className="w-60 h-14 rounded-md flex items-center justify-center text-white bg-black font-semibold text-sm " onClick={() => RandomSize()}> Generate a maze with a random size </button>
      </div>
    </div>
  );
}
