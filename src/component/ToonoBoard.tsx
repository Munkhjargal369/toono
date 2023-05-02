import React, { useRef } from "react";
import './Board.css';
import Tile from "./Tile/Tile";
import { Piece } from "./Piece";
import { useState } from "react";
import { Position } from "./Position";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { useEffect } from "react";
//import {row ,col , GRID_SIZE } from './initialBoard';
/**/
const row = ["q", "w", "e", "r", "t",'y','u','i','o','p'];
const row2 = ["1", "2", "3", "4", "5",'6','7','8','9','p'];
const col = [ 1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10];
const GRID_SIZE = 50;

const piles = [ 'q3','q5','q7','w2', 'w8', 
                'e1','e3','e5','e7', 'e9', 
                't1','t3','t5','t7','t9',
                'u1','u3','u5','u7','u9',
                'i2','i8', 'o3','o5','o7'];

const piles2 = [ '13','15','17','22', '28', 
                '31','33','35','37', '39', 
                '51','53','55','57','59',
                '71','73','75','77','79',
                '82','88', '93','95','97'];

const player1 = ['q3', 'q5','q7', 'e3','e5','e7'];
const player2 = ['u3', 'u5','u7', 'o3','o5','o7'];


interface Props {
    playMove: (piece: Piece, position: Position) => boolean;
    pieces: Piece[];
  }

export default function ToonoBoard({ playMove , pieces } :Props){ 

    let board = [];

    for( let i = 0; i<row2.length ; ++i){
        for(let j = 0; j<col.length; ++j){
            let pile:string = row2[i] + col[j]
            board.push(<Tile id = {pile} pieces={pieces}/>)
        }
    }

    const [activePiece , setActivePiece] = useState <HTMLElement | null>(null);
    const [grabPostion , setGrabPostition] = useState<Position>(new Position(-1,-1));
    const [destination , setDestination] = useState<Position>(new Position(-1,-1));
    const [selectPiece , setSelectedPiece] = useState<Piece>();

    const boardRef = useRef<HTMLDivElement>(null);
    
    function grabPiece(e: React.MouseEvent){
        const element = e.target as HTMLElement;
        const crr = boardRef.current;
        
        if(element.classList.contains("piece") && crr){

            const grabY = Math.ceil((e.clientX - crr.offsetLeft) / GRID_SIZE);
            const grabX = Math.ceil((e.clientY - crr.offsetTop ) / GRID_SIZE);
            
            setGrabPostition(new Position(grabX, grabY));

            element.style.position = 'absolute';
            setActivePiece(element);
        }
    }
 
    function movePiece(e: React.MouseEvent) {
        const board = boardRef.current;
        const crr = boardRef.current;

        if (activePiece && crr) {

            const x = e.clientX - GRID_SIZE / 3 ;
            const y = e.clientY - GRID_SIZE / 3 ;
            activePiece.style.position = "absolute";
            activePiece.style.left = `${x}px`;
            activePiece.style.top = `${y}px`;
        }
    }

    function dropPiece(e: React.MouseEvent) {
        const board = boardRef.current;
        const crr = boardRef.current;
        if (activePiece && crr) {
            const grabY = Math.ceil((e.clientX - crr.offsetLeft) / GRID_SIZE);
            const grabX = Math.ceil((e.clientY - crr.offsetTop ) / GRID_SIZE);
         
        setDestination(new Position(grabX,grabY));

        const currentPiece = pieces.find((p) => p.samePosition(grabPostion));

        if(activePiece && currentPiece){

            var succes = playMove(currentPiece, new Position(grabX,grabY));

            if(succes){
                const x1 = (grabY-1) * GRID_SIZE + crr.offsetLeft + 5;
                const y1 = (grabX-1) * GRID_SIZE + crr.offsetTop + 5;
    
                activePiece.style.position = "absolute";
    
                activePiece.style.left = `${x1}px`;
                activePiece.style.top = `${y1}px`

            }
            else{
                /*
                activePiece.style.position = "relative";
                activePiece.style.removeProperty("top");
                activePiece.style.removeProperty("left");
                */
                const x1 = (grabPostion.y-1) * GRID_SIZE + crr.offsetLeft + 5;
                const y1 = (grabPostion.x-1) * GRID_SIZE + crr.offsetTop + 5 ;
                activePiece.style.position = "absolute";
    
                activePiece.style.left = `${x1}px`;
                activePiece.style.top = `${y1}px`
            }
        }
         
          setActivePiece(null);
        }
    }

    return (
        
            <div 
                onMouseDown={e =>grabPiece(e)}
                onMouseMove = {e =>movePiece(e)}
                onMouseUp={e =>dropPiece(e)}
                id='board'
                
                ref={boardRef}
                >
                {board}
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
                <div className="line4"></div>
                <div className="line5"></div>
                <div className="line6"></div>
                <div className="line7"></div>
                <div className="line8"></div>    

                <div className="line9"></div>
                <div className="line10"></div>
                <div className="line11"></div>
                <div className="line12"></div>
                <div className="line13"></div>
                <div className="line14"></div>
                <div className="line15"></div>
                <div className="line16"></div>               
            </div>
    )
}