"use strict";
let canvas;
let ctx;
let x=0;
let y=0;

let stX = 0;
let stY = 0;

let steps = 100;
let mySteps = 0;

let lineIndex = 1;

let topCanvas;
let topCtx; 

function svgPathToArray(pathString) {
    while(pathString.indexOf("\n") != -1){
        pathString = pathString.replace("\n", " ");
    }
    let comands = pathString.split(" ");
    let arr = [];
    comands.forEach(comand => {
        let moveOrLine = comand[0];
        comand = comand.substring(1,comand.length);
        comand = comand.split(",");
        arr.push({
            moveOrLine: moveOrLine,
            x: JSON.parse(comand[0]),
            y: JSON.parse(comand[1])
        })
    });
    return arr;
}
const pathString = `M50,10
L54.9,13.1
L59.5,17.3
L63.8,22.6
L67.6,28
L70.8,33.5
L73.3,39
L74.9,44.7
L75.5,50.5
L74.9,56.3
L73.3,62
L70.8,67.5
L67.6,73
L63.8,78.4
L59.5,83.7
L54.9,87.9
L50,91
L45.1,87.9
L40.5,83.7
L36.2,78.4
L32.4,73
L29.2,67.5
L26.7,62
L25.1,56.3
L24.5,50.5
L25.1,44.7
L26.7,39
L29.2,33.5
L32.4,28
L36.2,22.6
L40.5,17.3
L45.1,13.1
L50,10`;
const pathArray = svgPathToArray(pathString);
console.log(pathArray);
pathArray.push(pathArray[0]);


let cordinatesStart = {x:pathArray[0].x*10, y:pathArray[0].y*10 - 500};



function start(){
    topCanvas = document.getElementById('topCanvas');
    topCanvas.style.backgroundColor = 'transparent';
    topCtx = topCanvas.getContext('2d', { alpha: true });

    if(x < cordinatesStart.x){
        x +=Math.abs(cordinatesStart.x - stX)/steps;
    }
    if(y < cordinatesStart.y){
        y +=Math.abs(cordinatesStart.y - stY)/steps;
    }

    if(x>cordinatesStart.x){
        x -= Math.abs(cordinatesStart.x - stX)/steps;
    }
    if(y>cordinatesStart.y){
        y -= Math.abs(cordinatesStart.y - stY)/steps;
    }
     
    zime({x:x, y:y});
    topCtx.beginPath();
    topCtx.fillStyle = 'rgba(255, 0, 0, 1)';
    topCtx.arc(x,canvas.height / 2 - y,2, 0, 2 * Math.PI);
    topCtx.fill(); 
    if(mySteps < steps){
        mySteps++;
        setTimeout(() => {
            start();
        }, 10);
    }else{
        mySteps = 0;
        cordinatesStart = {x: pathArray[lineIndex].x*10, y: pathArray[lineIndex].y*10 - 500};
        lineIndex++;
        stX =x;
        stY = y;
        setTimeout(() => {
            start();
        }, 10);
    }
}


function zime(cordinates){
    let rocinasGarums = 500;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");


    uzzimetPaJaunam();

    ctx.beginPath();
    ctx.arc(cordinates.x, canvas.height / 2 - cordinates.y, 6, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cordinatesStart.x, canvas.height / 2 - cordinatesStart.y, 6, 0, 2 * Math.PI, false);
    ctx.fillStyle = "red";
    ctx.fill();



    let d = Math.sqrt(cordinates.x * cordinates.x + cordinates.y * cordinates.y);
    let alpha = Math.acos(d/(2*rocinasGarums));
    let theta1 = alpha + Math.asin(cordinates.y/d);
    let theta2 = -(2 * alpha - theta1);
    let t1Degrees = theta1 * 180 / Math.PI;
    let t2Degrees = theta2 * 180 / Math.PI;

    

    let rocina1 = new Rocina(rocinasGarums, t1Degrees);
    let rocina2 = new Rocina(rocinasGarums, t2Degrees);

    let rocina11 = new OtraRocina(rocina1.dX, rocina1.dY, 500, rocina2.dX, rocina2.dY);
    let rocina12 = new OtraRocina(rocina2.dX, rocina2.dY, 500, rocina1.dX, rocina1.dY);

    /*console.log("beigu x: " + (rocina1.dX + rocina2.dX));
    console.log("beigu y: " + (rocina1.dY + rocina2.dY));*/

    /*console.log(t1Degrees);
    console.log(t2Degrees);
    console.log(" ");*/
}

function uzzimetPaJaunam(){
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    let rutinuDaudzums = 20;
    for(let i = 0; i < rutinuDaudzums; i++){
        for(let j = 0; j < rutinuDaudzums; j++){
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(i*canvas.width/rutinuDaudzums,0);
            ctx.lineTo(i*canvas.width/rutinuDaudzums,canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0,j*canvas.width/rutinuDaudzums);
            ctx.lineTo(canvas.width, j*canvas.width/rutinuDaudzums);
            ctx.stroke();
        }
    }
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(0,0);
    ctx.lineTo(0,canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
    ctx.stroke();
}


class Rocina{
    constructor(garums, lenkis){
        this.garums = garums;
        this.lenkis = lenkis;
        this.dX = this.garums * Math.cos(this.lenkis / 180 * Math.PI);
        this.dY = this.garums * Math.sin(this.lenkis / 180 * Math.PI);
        this.draw();
    }

    draw(){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(0,canvas.height/2);
        ctx.lineTo(this.dX,canvas.height/2 - this.dY);
        ctx.stroke();
    }
}


class OtraRocina{
    constructor(sx,sy, garums, dx,dy){
        this.garums = garums;
        this.sX = sx;
        this.sY = sy;
        this.dX = dx;
        this.dY = dy;
        this.draw();
    }

    draw(){
        ctx.lineWidth = 5;
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(this.sX, canvas.height/2 - this.sY);
        ctx.lineTo(this.sX + this.dX, canvas.height/2 - this.sY - this.dY);
        ctx.stroke();
    }
}