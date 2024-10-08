import React, { Component } from 'react'
import { useState, useEffect} from 'react'

    

function Snake() {
    const rows = 20;
    const cols = 25;
    let head = [4,4] 
    const[map,setMap] = useState(new Array(rows).fill().map(() => new Array(cols).fill(-1)));
    const[headCurrentPosition, setheadCurrentPosition] = useState(head);
    const[mapCreated,setMapCreated] = useState(false);
    const[headfacing,setHeadFacing] = useState();
    let pushIntervalId;
    let MAX_NUMBER_OF_APPLES = 10;
    const[score,setScore] = useState(0);
    let snake = [];
    
    
    let generateApplePosition = () => {
        let row = Math.floor(Math.random() * (rows));
        let col = Math.floor(Math.random() * (cols));
        return [row,col];
    }

    
    useEffect(() =>{
        if(mapCreated == false){
            snake = [head,[4,3],[4,2]]
            
            // set up the snake position the 2d array map with a 0 as their label
            let newMap = [...map];

            // set up the apples position and add them to the 2d array map with a 1 for their label
            for(let i = 0; i < MAX_NUMBER_OF_APPLES ; i++){
                let applePosition = generateApplePosition();
                newMap[applePosition[0]][applePosition[1]] = 1;
                
            }

            for(let i = 0; i < snake.length; i++){
                newMap[snake[i][0]][snake[i][1]] = 0;
            }

            console.log(snake);

            setMap(newMap);
            setMapCreated(true);
        }
        //push("RIGHT");
    },[])

    let updateSnakeOnMap = (snake) => {
        let newMap = [...map];
        for(let i = 0; i < snake.length; i++){
            newMap[snake[i][0]][snake[i][1]] = 0;
        }
        setMap(newMap);
    }


    let push = (facing) => {
        clearInterval(pushIntervalId);
        pushIntervalId = setInterval(()=>{
            if(facing == "RIGHT"){
                ateApple("RIGHT",snake[0]);
                let lastposition;
                let currentLastPosition;
                for(let i = 0; i<snake.length; i++){
                    
                    if(i == 0){
                        // making a deep copy of the last position
                        lastposition = [...snake[i]];
                        snake[i][1] = snake[i][1]+1  
                    } 
                    else if(i == snake.length -1 ) {
                        currentLastPosition = snake[i]
                        snake[i] = lastposition;
                        lastposition = currentLastPosition;
                        let newmap = [...map];
                        newmap[currentLastPosition[0]][currentLastPosition[1]] = -1
                        setMap(newmap);
                    }
                    else {
                        currentLastPosition = snake[i]
                        snake[i] = lastposition;
                        lastposition = currentLastPosition;
                    }
                }
                console.log(snake);
                updateSnakeOnMap(snake);
            } 
            else if(facing == "UP"){
                ateApple("UP",snake[0]);
                let lastposition;
                let currentLastPosition;
                for(let i = 0; i<snake.length; i++){
                    
                    if(i == 0){
                        // making a deep copy of the last position
                        lastposition = [...snake[i]];
                        snake[i][0] = snake[i][0]-1  
                    } 
                    else if(i == snake.length -1 ) {
                        currentLastPosition = snake[i]
                        snake[i] = lastposition;
                        lastposition = currentLastPosition;
                        let newmap = [...map];
                        newmap[currentLastPosition[0]][currentLastPosition[1]] = -1
                        setMap(newmap);
                    }
                    else {
                        currentLastPosition = snake[i]
                        snake[i] = lastposition;
                        lastposition = currentLastPosition;
                    }
                }
                console.log(snake);
                updateSnakeOnMap(snake);
            } 
            else if(facing == "DOWN"){
                ateApple("DOWN",snake[0]);
                let lastposition;
                let currentLastPosition;
                for(let i = 0; i<snake.length; i++){
                    
                    if(i == 0){
                        // making a deep copy of the last position
                        lastposition = [...snake[i]];
                        snake[i][0] = snake[i][0]+1  
                    } 
                    else if(i == snake.length -1 ) {
                        currentLastPosition = snake[i]
                        snake[i] = lastposition;
                        lastposition = currentLastPosition;
                        let newmap = [...map];
                        newmap[currentLastPosition[0]][currentLastPosition[1]] = -1
                        setMap(newmap);
                    }
                    else {
                        currentLastPosition = snake[i]
                        snake[i] = lastposition;
                        lastposition = currentLastPosition;
                    }
                }
                console.log(snake);
                updateSnakeOnMap(snake);
            }  
            else if(facing == "LEFT"){
                ateApple("LEFT",snake[0]);
                let lastposition;
                let currentLastPosition;
                for(let i = 0; i<snake.length; i++){
                    
                    if(i == 0){
                        // making a deep copy of the last position
                        lastposition = [...snake[i]];
                        snake[i][1] = snake[i][1]-1  
                    } 
                    else if(i == snake.length -1 ) {
                        currentLastPosition = snake[i]
                        snake[i] = lastposition;
                        lastposition = currentLastPosition;
                        let newmap = [...map];
                        newmap[currentLastPosition[0]][currentLastPosition[1]] = -1
                        setMap(newmap);
                    }
                    else {
                        currentLastPosition = snake[i]
                        snake[i] = lastposition;
                        lastposition = currentLastPosition;
                    }
                }
                updateSnakeOnMap(snake);
            }
        },100);
    }
    
    let updatHeadFacing = (facing) => {
        setHeadFacing(facing);
    }
    
    useEffect(() => {
        const move = (event) => {
        console.log(`Key pressed: ${event.key}`);
            
            if(event.key == "ArrowRight"){
                //ateApple("RIGHT",snake[0])
                push("RIGHT"); 
            } else if (event.key == "ArrowLeft") {
                //ateApple("LEFT",snake[0]);
                push("LEFT");
            } else if (event.key == "ArrowUp") {
                //ateApple("UP",snake[0]);
                push("UP");
            } else if (event.key == "ArrowDown") {
                //ateApple("DOWN",snake[0]);
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

    let ateApple = (facing,currentHeadPosition) => {
        // based on which way we are facing we need to check if the next cell has a 1  (1 = apple)
        if(facing == "RIGHT"){
            console.log(map[currentHeadPosition[0]][currentHeadPosition[1]+1])
            if(map[currentHeadPosition[0]][currentHeadPosition[1]+1] == 1){
                updateScore();
            }
        }
        else if (facing == "LEFT") {
            console.log(map[currentHeadPosition[0]][currentHeadPosition[1]-1])
            if(map[currentHeadPosition[0]][currentHeadPosition[1]-1] == 1){
                updateScore();
            }
        } 
        else if (facing == "UP") {
            console.log(map[currentHeadPosition[0]-1][currentHeadPosition[1]])
            if(map[currentHeadPosition[0]-1][currentHeadPosition[1]] == 1){
                updateScore();
            }
        } 
        else if (facing == "DOWN") {
            console.log(map[currentHeadPosition[0]+1][currentHeadPosition[1]])
            if(map[currentHeadPosition[0]+1][currentHeadPosition[1]] == 1){
                updateScore();
            }
        }
    }

    let updateScore = () => {
        setScore(prevScore => prevScore + 1);
        // let newSnake = [...snake]
        // let lastposition = newSnake[newSnake.length-1];
        // newSnake[newSnake.length] = [lastposition[0]][lastposition[1]-1];
        // updateSnakeOnMap(newSnake);
    }
    

    return (
        <>
            <div className='flex justify-center py-10'>
                <div>
                    <div className='flex bg-black justify-between px-5 py-5 border-4 border-[#51ff00]'>
                        <div className='text-[#51ff00] font-bold'>Snake Game</div>
                        <div className='text-[red] font-bold'>Score : {score}</div>
                    </div>
                    
                    <div className='border-4 border-[#51ff00] shadow-2xl'>
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
            </div>
        </>
    )
}

export default Snake