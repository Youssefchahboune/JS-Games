import React, { Component } from 'react'
import { useState, useEffect} from 'react'

    

function Snake() {
    const rows = 25;
    const cols = 25;
    let head = [4,4] 
    const[map,setMap] = useState(new Array(rows).fill().map(() => new Array(cols).fill(-1)));
    const[headCurrentPosition, setheadCurrentPosition] = useState(head);
    const[mapCreated,setMapCreated] = useState(false);
    const[headfacing,setHeadFacing] = useState();
    let pushIntervalId;
    let MAX_NUMBER_OF_APPLES = 20;
    const[score,setScore] = useState(0);
    
    
    let generateApplePosition = () => {
        let row = Math.floor(Math.random() * (rows));
        let col = Math.floor(Math.random() * (cols));
        return [row,col];
    }

    
    useEffect(() =>{
        if(mapCreated == false){
            console.log(map)
            map[headCurrentPosition[0]][headCurrentPosition[1]] = 0;

            for(let i = 0; i <MAX_NUMBER_OF_APPLES ; i++){
                let applePosition = generateApplePosition();
                console.log(applePosition);
                map[applePosition[0]][applePosition[1]] = 1;
            }

            setMap(map);
            setMapCreated(true);
        }
        //push("RIGHT");
    },[])

    let push = (facing) => {
        clearInterval(pushIntervalId);
        pushIntervalId = setInterval(()=>{
            if(facing == "RIGHT"){
                ateApple("RIGHT",headCurrentPosition);
                map[headCurrentPosition[0]][headCurrentPosition[1] + 1] = 0;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = -1;
                setheadCurrentPosition([headCurrentPosition[0],headCurrentPosition[1]++]);
                setMap(map);
            }
            else if (facing == "LEFT") {
                ateApple("LEFT",headCurrentPosition);
                map[headCurrentPosition[0]][headCurrentPosition[1]-1] = 0;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = -1;
                setheadCurrentPosition([headCurrentPosition[0],headCurrentPosition[1]--]);
                setMap(map);
    
            } else if (facing == "UP") {
                ateApple("UP",headCurrentPosition);
                map[headCurrentPosition[0]-1][headCurrentPosition[1]] = 0;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = -1;
                setheadCurrentPosition([headCurrentPosition[0]--,headCurrentPosition[1]]);
                setMap(map);
            } else if (facing == "DOWN") {
                ateApple("DOWN",headCurrentPosition);
                map[headCurrentPosition[0]+1][headCurrentPosition[1]] = 0;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = -1;
                setheadCurrentPosition([headCurrentPosition[0]++,headCurrentPosition[1]]);
                setMap(map);
            }
        },500);
    }
    
    let updatHeadFacing = (facing) => {
        setHeadFacing(facing);
    }
    
    useEffect(() => {
        const move = (event) => {
        console.log(`Key pressed: ${event.key}`);
            
            if(event.key == "ArrowRight" && (headfacing != "RIGHT" && headfacing != "LEFT")){
                ateApple("RIGHT",headCurrentPosition);
                map[headCurrentPosition[0]][headCurrentPosition[1] + 1] = 0;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = -1;
                setheadCurrentPosition([headCurrentPosition[0],headCurrentPosition[1]++]);
                setMap(map);
                push("RIGHT");
                
            }
            if(event.key == "ArrowLeft" && headfacing != "RIGHT" && headfacing != "LEFT"){
                ateApple("LEFT",headCurrentPosition);
                map[headCurrentPosition[0]][headCurrentPosition[1] - 1] = 0;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = -1;
                setheadCurrentPosition([headCurrentPosition[0],headCurrentPosition[1]--]);
                setMap(map);
                push("LEFT");
                
            }
            if(event.key == "ArrowUp" && headfacing != "UP" && headfacing != "DOWN"){
                ateApple("UP",headCurrentPosition);
                map[headCurrentPosition[0] - 1][headCurrentPosition[1]] = 0;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = -1;
                setheadCurrentPosition([headCurrentPosition[0]--,headCurrentPosition[1]]);
                setMap(map);
                push("UP");
                
            }
            if(event.key == "ArrowDown" && headfacing != "UP" && headfacing != "DOWN"){
                ateApple("DOWN",headCurrentPosition);
                map[headCurrentPosition[0] + 1][headCurrentPosition[1]] = 0;
                map[headCurrentPosition[0]][headCurrentPosition[1]] = -1;
                setheadCurrentPosition([headCurrentPosition[0]++,headCurrentPosition[1]]);
                setMap(map);
                push("DOWN");
            }
        };
    
        // Add the event listener
        window.addEventListener('keydown', move);
    
        // Clean up the event listener on component unmount
        return () => {
        window.removeEventListener('keydown', move);
        };
    }, []);

    let ateApple = (facing,currentPostiton) => {
        // based on which way we are facing we need to check if the next cell has a 1  (1 = apple)
        if(facing == "RIGHT"){
            console.log(map[currentPostiton[0]][currentPostiton[1]+1])
            if(map[currentPostiton[0]][currentPostiton[1]+1] == 1){
                updateScore();
            }
        }
        else if (facing == "LEFT") {
            console.log(map[currentPostiton[0]][currentPostiton[1]-1])
            if(map[currentPostiton[0]][currentPostiton[1]-1] == 1){
                updateScore();
            }
        } 
        else if (facing == "UP") {
            console.log(map[currentPostiton[0]-1][currentPostiton[1]])
            if(map[currentPostiton[0]-1][currentPostiton[1]] == 1){
                updateScore();
            }
        } 
        else if (facing == "DOWN") {
            console.log(map[currentPostiton[0]+1][currentPostiton[1]])
            if(map[currentPostiton[0]+1][currentPostiton[1]] == 1){
                updateScore();
            }
        }
    }

    let updateScore = () => {
        setScore(prevScore => prevScore + 1);
    }
    

    return (
        <>
            <div className='flex justify-center py-10'>
                <div>
                    <div className='flex bg-black justify-between px-5 py-5'>
                        <div className='text-[#51ff00] font-bold'>Snake Game</div>
                        <div className='text-[red] font-bold'>Score : {score}</div>
                    </div>
                    

                    <div className='flex flex-wrap w-[500px]'>

                        {
                            mapCreated ?
                            map.map((row) => row.map((cell) => 
                                cell == 
                                -1 ? <div className='w-5 h-5 bg-black border-[1px] border-[rgba(255,255,255,0.1)]'></div> 
                                : cell == 0 ? <div className='w-5 h-5 bg-black flex justify-center items-center'>
                                    <div className='w-5 h-5 bg-[#51ff00]'></div>
                                </div> 
                                : cell == 1? <div className='w-5 h-5 bg-black flex justify-center items-center' >
                                     <div className='w-3 h-3 bg-[red] rounded-full'></div>
                                </div> : <div></div>
                            )) : <div></div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Snake