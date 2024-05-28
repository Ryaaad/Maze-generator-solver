import {A_start} from './utils/A*'
import { RandomMaze } from "./utils/RandoMaze";
export default function Home() {

const start={i:0,j:0}
const goal={i:14,j:14}

const columnCount=15
const rowCount=15
const Maze=RandomMaze(columnCount,rowCount,start)
const A=A_start(Maze,start,goal);
  console.log(A.noads,A.childs,A.visited)

  return (
   <div className="w-56 h-56" >
<div 
  style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        gridTemplateRows:`repeat(${rowCount}, minmax(0, 1fr))`,
      }}  
      className={` w-full max-h-full h-full grid m-5 border-solid border-4 border-[red] `}>
      {Maze.map((row, rowIndex) => (
        row.map((value, colIndex) => (
        <div
            id={`${rowIndex}${colIndex}`}
            key={`${rowIndex}-${colIndex}`}
            className={` ${value.down && "border-b-[red] "  } ${value.up && "border-t-[red]"  }  ${value.left && "border-l-[red] "  }
            ${value.right && "border-r-[red] "} border-solid border border-[#ffffff00] w-full h-full ${A.visited.some(items=>items.i==rowIndex && items.j==colIndex) ? "bg-[#ffff00d6]" : "bg-white" } `}
          >
          </div>
        ))
      ))}
    </div>
   </div>
  );
}
