import React, { Component } from 'react'
import { useState, useEffect} from 'react'

    

function Snake() {
    const rows = 12;
    const cols = 14;
    let head = [4,3] 
    const[map,setMap] = useState(new Array(rows).fill().map(() => new Array(cols).fill(-1)));
    const[headCurrentPosition, setheadCurrentPosition] = useState(head);
    const[mapCreated,setMapCreated] = useState(false);
    let pushIntervalId;
    let MAX_NUMBER_OF_APPLES = 1;
    const[score,setScore] = useState(0);
    let snake = [];
    let headfacing;
    let SNAKE_SPEED = 110;
    
    
    let generateApplePosition = () => {
        let row = Math.floor(Math.random() * (rows));
        let col = Math.floor(Math.random() * (cols));
        return [row,col];
    }

    let spawnNewApple = () => {
        let newMap = [...map];
        let applePosition = generateApplePosition();
        while(checkIfApplePositionisOnSnake(applePosition)){
            applePosition = generateApplePosition();
        }
        newMap[applePosition[0]][applePosition[1]] = 1;
        setMap(newMap);
    }
    
    useEffect(() =>{
        if(mapCreated == false){
            snake = [head,[4,2]]
            
            // set up the snake position the 2d array map with a 0 as their label
            let newMap = [...map];

            // set up the apples position and add them to the 2d array map with a 1 for their label
            for(let i = 0; i < MAX_NUMBER_OF_APPLES ; i++){
                let applePosition = generateApplePosition();
                while(checkIfApplePositionisOnSnake(applePosition)){
                    applePosition = generateApplePosition();
                }
                newMap[applePosition[0]][applePosition[1]] = 1;
            }

            for(let i = 0; i < snake.length; i++){
                newMap[snake[i][0]][snake[i][1]] = 0;
            }
            setMap(newMap);
            setMapCreated(true);
        }
        //push(getRandomDirection());
    },[])

    let checkIfApplePositionisOnSnake = (position) => {
        for(let i = 0; i < snake.length; i++ ){
            if(snake[i][0] == position[0] && snake[i][1] == position[1]){
                return true;
            }
        }
        return false;
    }

    let updateSnakeOnMap = (snake) => {
        let newMap = [...map];
        for(let i = 0; i < snake.length; i++){
            newMap[snake[i][0]][snake[i][1]] = 0;
        }
        setMap(newMap);
    }

    let bounderiesCollision = (facing,snakeHeadPosition) => {
        if(facing == "RIGHT"){
            if(snakeHeadPosition[1]+1 == cols){
                clearInterval(pushIntervalId);
                SNAKE_SPEED = 0;
                return true;
            }
        } else if(facing == "LEFT") {
            if(snakeHeadPosition[1]-1 == -1){
                clearInterval(pushIntervalId);
                SNAKE_SPEED = 0;
                return true;
            }
        } else if(facing == "UP") {
            if(snakeHeadPosition[0]-1 == -1){
                clearInterval(pushIntervalId);
                SNAKE_SPEED = 0;
                return true;
            }
            
        } else if(facing == "DOWN") {
            if(snakeHeadPosition[0]+1 == rows){
                clearInterval(pushIntervalId);
                SNAKE_SPEED = 0;
                return true;
            }
        }

        return false;
    }

    let push = (facing) => {
        clearInterval(pushIntervalId);
        pushIntervalId = setInterval(()=>{
            if(facing == "RIGHT"){
                if(!bounderiesCollision(facing,snake[0])){
                    headColision(facing,snake[0]);
                    let lastposition;
                    let currentLastPosition;
                    for(let i = 0; i<snake.length; i++){
                        
                        if(i == 0){
                            // making a deep copy of the last position
                            lastposition = [...snake[i]];
                            snake[i][1] = snake[i][1]+1
                            //console.log(snake[i]);
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
                    headfacing = facing;
                    updateSnakeOnMap(snake);
                }
            } 
            else if(facing == "UP"){
                if(!bounderiesCollision(facing,snake[0])){
                    headColision("UP",snake[0]);
                    let lastposition;
                    let currentLastPosition;
                    for(let i = 0; i<snake.length; i++){
                        
                        if(i == 0){
                            // making a deep copy of the last position
                            lastposition = [...snake[i]];
                            snake[i][0] = snake[i][0]-1
                            //console.log(snake[i]);
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
                    headfacing = facing;
                    updateSnakeOnMap(snake);
                }
            } 
            else if(facing == "DOWN"){
                if(!bounderiesCollision(facing,snake[0])){
                    headColision("DOWN",snake[0]);
                    let lastposition;
                    let currentLastPosition;
                    for(let i = 0; i<snake.length; i++){
                        
                        if(i == 0){
                            // making a deep copy of the last position
                            lastposition = [...snake[i]];
                            snake[i][0] = snake[i][0]+1
                            //console.log(snake[i]);
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
                    headfacing = facing;
                    updateSnakeOnMap(snake);
                }
            }  
            else if(facing == "LEFT"){
                if(!bounderiesCollision(facing,snake[0])){
                    headColision("LEFT",snake[0]);
                    let lastposition;
                    let currentLastPosition;
                    for(let i = 0; i<snake.length; i++){
                        
                        if(i == 0){
                            // making a deep copy of the last position
                            lastposition = [...snake[i]];
                            snake[i][1] = snake[i][1]-1
                            //console.log(snake[i]);
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
                    headfacing = facing
                    updateSnakeOnMap(snake);
                }
            }
        },SNAKE_SPEED);
    }

    let getRandomDirection = () => {
        let randomIndex = Math.floor(Math.random() * 5);
        let arrayOfDirection = ["RIGHT","LEFT","UP","DOWN"];
        return arrayOfDirection[randomIndex];
    }
    
    useEffect(() => {
        const move = (event) => {
        
            //console.log(`Key pressed: ${event.key}`);
            
            if(SNAKE_SPEED != 0){
                
                if(event.key == "ArrowRight"&& headfacing != "RIGHT" && headfacing != "LEFT"){
                    push("RIGHT"); 
                } else if (event.key == "ArrowLeft" && headfacing != "LEFT" && headfacing != "RIGHT") {
                    push("LEFT");
                } else if (event.key == "ArrowUp" && headfacing != "UP" && headfacing != "DOWN") {
                    push("UP");
                } else if (event.key == "ArrowDown" && headfacing != "DOWN" && headfacing != "UP") {
                    push("DOWN");
                }
            }
            
        };
    
        // Add the event listener
        window.addEventListener('keydown', move);
    
        // Clean up the event listener on component unmount
        return () => {
        window.removeEventListener('keydown', move);
        };
    }, []);

    let headColision = (facing,currentHeadPosition) => {
        // based on which way we are facing we need to check if the next cell has a 1 or 0 (1 = apple) and (0 = body)
        if(facing == "RIGHT"){
            // if the head hits an apple
            if(map[currentHeadPosition[0]][currentHeadPosition[1]+1] == 1){
                updateScore();
            } 
            // if the head of the snake hits his own body
            else if(map[currentHeadPosition[0]][currentHeadPosition[1]+1] == 0){
                clearInterval(pushIntervalId);
                SNAKE_SPEED = 0;
            }
        }
        else if (facing == "LEFT") {
            if(map[currentHeadPosition[0]][currentHeadPosition[1]-1] == 1){
                updateScore();
            } else if(map[currentHeadPosition[0]][currentHeadPosition[1]-1] == 0){
                clearInterval(pushIntervalId);
                SNAKE_SPEED = 0;
            }
        } 
        else if (facing == "UP") {
            if(map[currentHeadPosition[0]-1][currentHeadPosition[1]] == 1){
                updateScore();
            } else if(map[currentHeadPosition[0]-1][currentHeadPosition[1]] == 0){
                clearInterval(pushIntervalId);
                SNAKE_SPEED = 0;
            }
        } 
        else if (facing == "DOWN") {
            if(map[currentHeadPosition[0]+1][currentHeadPosition[1]] == 1){
                updateScore();
            } else if(map[currentHeadPosition[0]+1][currentHeadPosition[1]] == 0){
                clearInterval(pushIntervalId);
                SNAKE_SPEED = 0;
            }
        }
    }

    let updateScore = () => {
        setScore(prevScore => prevScore + 100);
        let lastposition = [...snake[snake.length-1]];
        let grow = [lastposition[0],lastposition[1]-1];
        snake = [...snake,grow]
        updateSnakeOnMap(snake);
        spawnNewApple();
    }

    return (
        <>
            <div className='flex justify-center pt-[108px] pr-[6px]'>
                <div>

                    <div>
                        <div className='text-[rgba(255,255,255,0.8)] text-[15px] font-bold italic absolute pl-[20px] pt-[15px]'>Score : {score}</div>
                    </div>

                    
                    
                    <div className='border-4 border-[#000000] shadow-2xl'>
                        <div className='flex flex-wrap w-[280px]'>

                            {
                                mapCreated ?
                                map.map((row,r) => row.map((cell,c) => 
                                    cell == 
                                    -1 ? <div className='w-5 h-5 bg-black border-[1px] border-[rgba(255,255,255,0.1)] text-white text-[5px]'>{/*[{r}-{c}]*/}</div> 
                                    : cell == 0 ? <div className='w-5 h-5 bg-black flex justify-center items-center'>
                                        <div className='w-5 h-5 bg-[#51ff00]'></div>
                                    </div> 
                                    : cell == 1? <div className='w-5 h-5 bg-black flex justify-center items-center' >
                                        <div className='w-3 h-3 bg-[red] '></div>
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