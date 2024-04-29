"use strict";
let canvas;
let ctx;
let cordinatesStart = {x:420,y:69};
let x=0;
let y=0;

let steps = 100;

function start(){
    if(x < cordinatesStart.x){
        x +=Math.abs(cordinatesStart.x)/steps;
    }
    if(y < cordinatesStart.y){
        y +=Math.abs(cordinatesStart.y)/steps;
    }

    if(x>cordinatesStart.x){
        x -= Math.abs(cordinatesStart.x)/steps;
    }
    if(y>cordinatesStart.y){
        y -= Math.abs(cordinatesStart.y)/steps;
    }
     
    zime({x:x, y:y});
    if(x<cordinatesStart.x || y< cordinatesStart.y){
        setTimeout(() => {
            start();
        }, 10);
    };
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

    console.log(t1Degrees);
    console.log(t2Degrees);
    console.log(" ");
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