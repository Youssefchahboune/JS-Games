import React, { Component } from 'react'
import { useState, useEffect} from 'react'

    

function Snake() {
    const rows = 25;
    const cols = 25;
    let head = [0,1] 
    const[map,setMap] = useState([]);
    const[headCurrentPosition, setheadCurrentPosition] = useState(head);

    
    useEffect(() =>{
        const array2D = new Array(rows).fill().map(() => new Array(cols).fill(0));
        array2D[headCurrentPosition[0]][headCurrentPosition[1]] = 1;
        setMap(array2D);
    },[])
    

    let generateMap = () => {
        const rows = 25;
        const cols = 25;
        const array2D = new Array(rows).fill().map(() => new Array(cols).fill(0));
        array2D[0][1] = 1;
        setMap(array2D);
        setheadCurrentPosition([0,1]);
    }


    useEffect(() => {
        const move = (event) => {
          console.log(`Key pressed: ${event.key}`);
            
            if(event.key == "ArrowRight"){
                console.log(headCurrentPosition);
                map[headCurrentPosition[0]][headCurrentPosition[1] + 1] = 1;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = 0;
                setheadCurrentPosition([headCurrentPosition[0],headCurrentPosition[1]++]);
                setMap(map);
                console.log(headCurrentPosition);
            }
            if(event.key == "ArrowLeft"){
                console.log(headCurrentPosition);
                map[headCurrentPosition[0]][headCurrentPosition[1] - 1] = 1;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = 0;
                setheadCurrentPosition([headCurrentPosition[0],headCurrentPosition[1]--]);
                setMap(map);
                console.log(headCurrentPosition);
            }
            if(event.key == "ArrowUp"){
                console.log(headCurrentPosition);
                map[headCurrentPosition[0] - 1][headCurrentPosition[1]] = 1;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = 0;
                setheadCurrentPosition([headCurrentPosition[0]--,headCurrentPosition[1]]);
                setMap(map);
                console.log(headCurrentPosition);
            }
            if(event.key == "ArrowDown"){
                console.log(headCurrentPosition);
                map[headCurrentPosition[0] + 1][headCurrentPosition[1]] = 1;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = 0;
                setheadCurrentPosition([headCurrentPosition[0]++,headCurrentPosition[1]]);
                setMap(map);
                console.log(headCurrentPosition);
            }
        };
    
        // Add the event listener
        window.addEventListener('keydown', move);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('keydown', move);
        };
    }, []);

    

    return (
        <>
            <div className='flex justify-center py-10'>
                <div>
                    <div className='flex bg-black justify-between px-5 py-5'>
                        <div className='text-[#51ff00] font-bold'>Snake Game</div>
                        <div className='text-[red] font-bold'>Score : 0</div>
                    </div>
                    

                    <div className='flex flex-wrap w-[500px]'>

                        {
                            map.map((row) => row.map((cell) => 
                                cell == 
                                0 ? <div className='w-5 h-5 bg-black border-[1px] border-[rgba(255,255,255,0.1)]'></div> 
                                : <div className='w-5 h-5 bg-black flex justify-center items-center'>
                                    <div className='w-5 h-5 bg-[#51ff00] rounded-full'></div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Snake