import {A_start} from './utils/A*'
import { RandomMaze } from "./utils/RandoMaze";
export default function Home() {

const start={i:0,j:0}
const goal={i:3,j:3}
// const A=A_start(Matrix,start,goal);
  // console.log(A.noads,A.childs)

const columnCount=3
const rowCount=3
const Maze=RandomMaze(columnCount,rowCount,start)

  return (
   <div className="w-52 h-52" >
<div 
  style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        gridTemplateRows:`repeat(${rowCount}, minmax(0, 1fr))`,
      }}  
      className={` w-full max-h-full h-full grid bg-[red] m-5 border-solid border-4 border-black `}>
      {Maze.map((row, rowIndex) => (
        row.map((value, colIndex) => (
        <div
            id={`${rowIndex}${colIndex}`}
            key={`${rowIndex}-${colIndex}`}
            className={`${value.down && "border-b-black "  } ${value.up && "border-t-black "  }  ${value.left && "border-l-black "  }
            ${value.right && "border-r-black "} border-solid border-2 border-[#ffffff00] w-full h-full`}
          >
           
          </div>
        ))
      ))}
    </div>
   </div>
  );
}
