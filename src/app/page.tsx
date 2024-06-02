"use client";
import { useEffect, useState } from "react";
import { A_start } from "./utils/A*";
import { RandomMaze, RandomInt } from "./utils/RandoMaze";
import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { Coordinate, Walls } from "./types/mazeTypes";
export default function Home() {
  const [Size, setSize] = useState<number>(10);
  const [MazeSize, setMazeSize] = useState<number>(10);

  const componentRef = useRef();
  const handleCaptureClick = () => {
    if (componentRef.current) {
      htmlToImage?.toPng(componentRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'component-image.png';
          link.click();
        })
        .catch((error) => {
          console.error('Error capturing the image:', error);
        });
    }
  };
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
      const size = RandomInt(10, 100);
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
  const [Action, setAction] = useState<string>();

  useEffect(() => {
     if (Action=='Solution' && Start != undefined && Goal != undefined && Maze !=undefined )
    setSolution(A_start(Maze, Start, Goal));
     

    else {setSolution(undefined); setAction(undefined)}
  }, [Action,Start,Goal,Maze]);

  useEffect(() => {
    if (MazeSize) {
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
    <div className="flex justify-around items-center min-h-screen min-w-screen">
      <div className="grid h-52 items-center ">
        <button
          className="w-60 h-14 rounded-md flex items-center justify-center text-white bg-black font-semibold text-sm "
          onClick={() => setAction('MiniGame')}
        >
          Play Mini Game 
        </button>
        <button
          className="w-60 h-14 rounded-md flex items-center justify-center text-white bg-black font-semibold text-sm "
          onClick={() => setAction('Solution')}
        >
          Generate Solution
        </button>
        <button
          className="w-60 h-14 rounded-md flex items-center justify-center text-white bg-black font-semibold text-sm "
          onClick={handleCaptureClick}
        >
          Download the Maze
        </button>
      </div>
      <div
        style={{
          gridTemplateColumns:
            MazeSize && Maze && `repeat(${MazeSize}, minmax(0, 1fr))`,
          gridTemplateRows:
            MazeSize && Maze && `repeat(${MazeSize}, minmax(0, 1fr))`,
        }}
        className={` w-[560px] h-[560px] ${
          !MazeSize || !Maze ? "flex justify-center items-center " : "grid"
        } border-solid border-4 border-black `}
        ref={componentRef}
      >
        {MazeSize &&
          Maze &&
          Maze.map((row, rowIndex) =>
            row.map((value, colIndex) => (
              <div
                id={`${rowIndex}${colIndex}`}
                key={`${rowIndex}-${colIndex}`}
                className={` ${value.down && "border-b-black "} ${
                  value.up && "border-t-black"
                }  ${value.left && "border-l-black "}
            ${
              value.right && "border-r-black "
            } border-solid border border-[#ffffff00] w-full h-full ${
                  Solution?.visited.some(
                    (items) => items.i == rowIndex && items.j == colIndex
                  )
                    ? Start?.i == rowIndex && Start?.j == colIndex
                      ? "bg-[red]"
                      : Goal?.i == rowIndex && Goal?.j == colIndex ? "bg-[green]" : "bg-[#ffff00d6]"
                    : Start?.i == rowIndex && Start?.j == colIndex
                    ? "bg-[red]"
                    :Goal?.i == rowIndex && Goal?.j == colIndex ? "bg-[green]" : "bg-white"
                }
                `}
                onClick={() => SolutionCor({ i: rowIndex, j: colIndex })}
                ></div>
              ))
          )}
        {!MazeSize ||
          (!Maze && (
            <div className="text-xl text-black font-bold ">Loading ...</div>
          ))}
      </div>

      <div className="grid h-56 items-center w-64 ">
        <div className="w-full">
          <input
            type="range"
            min="10"
            max="100"
            value={Size}
            onChange={handleSizeChange}
            className="slider w-full h-2 bg-black rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-gray-300 "
          />
          <div className="mt-2 text-center text-sm font-medium text-gray-700">
            Maze Size : {Size} * {Size}
          </div>
        </div>
        <button
          className="w-full h-14 rounded-md flex items-center justify-center text-white bg-black font-semibold text-sm "
          onClick={() => updateSize()}
        >
          Generate a random maze with the defined Size
        </button>
        <button
          className="w-full h-14 rounded-md flex items-center justify-center text-white bg-black font-semibold text-sm "
          onClick={() => RandomSize()}
        >
          Generate a random maze 
        </button>
      </div>
    </div>
  );
}
