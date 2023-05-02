import React from 'react';
import './Tile.css';
import black from '../../assets/black.png';
import white from '../../assets/white.png';

interface Props{
    id: string;
}

const piles = [ 'q3','q5','q7','w2', 'w8', 
                'e1','e3','e5','e7', 'e9', 
                't1','t3','t5','t7','t9',
                'u1','u3','u5','u7','u9',
                'i2','i8', 'o3','o5','o7'];
                
                
const player1 = ['q3', 'q5','q7', 'e3','e5','e7'];
const player2 = ['u3', 'u5','u7', 'o3','o5','o7'];

export default function Tile({id} : Props): JSX.Element{
    if(piles.includes(id)){

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
    }
    else 
        return <span className="tile"></span>;
}