import React from 'react';
import './Tile.css';
import black from '../../assets/black.png';
import white from '../../assets/white.png';
import { Piece } from '../Piece';
import { Position } from '../Position';

interface Props{
    pieces : Piece[];
    id: string;
}

const piles = [ '13','15','17','22', '28', 
                '31','33','35','37', '39', 
                '51','53','55','57','59',
                '71','73','75','77','79',
                '82','88', '93','95','97'];
                
                
const player1 = ['q3', 'q5','q7', 'e3','e5','e7'];
const player2 = ['u3', 'u5','u7', 'o3','o5','o7'];

export default function Tile({id, pieces} : Props): JSX.Element{
    if(piles.includes(id)){
        const i = parseInt(id);

        let x = Math.floor(i / 10);
        let y = i % 10;

        let ind = new Position(x,y);
        console.log(ind)
        const currentPiece = pieces.find((p) => p.samePosition(ind));

        if(currentPiece){
            console.log(currentPiece)
            if(currentPiece.team == "black"){
                return <span className="pieceTile">
                {black && <div style = {{backgroundImage: `url(${black})`}} className='piece'/> }
              </span>;
            }
            else{
                return <span className="pieceTile">
                {white && <div style = {{backgroundImage: `url(${white})`}} className='piece'/> }
               </span>;
            }
        }
        else{
            return <span className="pieceTile"></span>
        }
        /*
        if(player1.includes(id)){
            return <span className="pieceTile">
              {black && <div style = {{backgroundImage: `url(${black})`}} className='piece'/> }
            </span>;
        }
        if(player2.includes(id)){
            return <span className="pieceTile">
                 {white && <div style = {{backgroundImage: `url(${white})`}} className='piece'/> }
                </span>;
        }
        else
            return <span className="pieceTile"></span>;
            */
    }
    else 
        return <span className="tile"></span>;
}