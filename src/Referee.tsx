import { useEffect, useRef, useState } from "react";
import { Piece } from "./component/Piece";
import { Position } from "./component/Position";
import { playerName } from "./component/Player";
import { Board } from "./component/Board";
import { initialBoard } from "./component/initialBoard";
import ToonoBoard from "./component/ToonoBoard";
import { white_win, black_win } from "./component/initialBoard";
import { stringify } from "querystring";
import blackWon from  './assets/blackWon.jpg';
import temp from './assets/starter.png';
import whiteWon from './assets/whiteWon.jpg';


export default function Referee() {

    let init = initialBoard.clone();
    const [board , setBoard] = useState<Board>(init);
    const [flag, setFlag] = useState<Boolean>(false);
    const [won , setWon] = useState<String>();
    const [reset, setReset] = useState<Boolean>(false);

    let timer : [Piece , Position];

    function playMove(playedPiece : Piece, destination : Position):boolean{
        console.log("start" , playedPiece.position)

        if(playedPiece.team === playerName.OUR && board.totalTurns %2 !==1){
            return false;
        };
        if(playedPiece.team === playerName.OPPONENT && board.totalTurns %2 !==0){
            return false;
        }
        
        if(playedPiece.position === destination){ 
            console.log("refree is fail");
            return false;
        }
        
        let posmoves: Position[]  = possibleMoves(playedPiece);
        let positionExists = posmoves.some(pos => pos.samePosition(destination));

        console.log("bolomjit nvvdel: " , posmoves);
        // console.log(positionExists);
        if(positionExists){
            //timer.push(playedPiece , playedPiece.position);

            playedPiece.position = destination;
            console.log("end" , playedPiece.position);
           
            setBoard(() => {
                const clonedBoard = board.clone();
                clonedBoard.totalTurns += 1;
                isWin(playedPiece.team);
                return clonedBoard;
            });           
            return true;
        }
       return false;
    }

    const moves = [
        [22, 13, 15, 17, 28],
        [31, 33, 35, 37, 39],
        [51, 53, 55, 57, 59],
        [71, 73, 75, 77, 79],
        [82, 93, 95, 97, 88],
        [22, 33, 55, 77, 88],
        [82, 73, 55, 37, 28],
        [82, 31, 51, 71, 82],

        [13, 33, 53, 73, 93],
        [15, 35, 55, 75, 95],
        [17, 37, 57, 77, 97],
        [28, 39, 59, 79, 88]
    ];


    function possibleMoves(playedPiece : Piece) : Position[]{
        const pos : number = playedPiece.position.x * 10 + playedPiece.position.y;
 
        const flatMoves = moves.flat();
        const found = flatMoves.includes(pos);
        let validMoves : Position[] = [];

        if(found){
           
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].includes(pos)) {
                    
                    for (let j = 0; j < moves[i].length; j++) {
                        if(moves[i][j] == pos){
                            if(j > 0){
                                let x = Math.floor(moves[i][j - 1] / 10);
                                let y = moves[i ][j - 1] % 10;
                                
                                let newPos = new Position(x,y);

                                const checkPiece = board.pieces.find((p) => p.samePosition(newPos));
                               
                                if(!checkPiece)
                                    validMoves.push(newPos);
                                else
                                    validMoves.push( isJump(i, j , j - 1))
                            }
                            if(j < moves[0].length - 1){
                                let x = Math.floor(moves[i][j + 1] / 10);
                                let y = moves[i][j + 1] % 10;
                                
                                let newPos = new Position(x,y);
                               
                                const checkPiece = board.pieces.find((p) => p.samePosition(newPos));
                               
                                if(!checkPiece)
                                    validMoves.push(newPos);
                                else
                                    validMoves.push( isJump(i, j , j + 1))
                            }
                        }
                    }
                }
            }
        }
        else{
            console.log("oldsogvi")
        }
        return validMoves;
    }

    function isJump(i: number , j0: number,j1: number ): Position{

        let newPos : Position = new Position(-1, -1);

        if(j0 > j1 && j1 > 0){
            let x = Math.floor(moves[i][j1 - 1] / 10);
            let y = moves[i][j1 - 1] % 10;
            
            var newPos1 = new Position(x,y);
            const checkPiece = board.pieces.find((p) => p.samePosition(newPos1));
                               
            if(!checkPiece)
                return newPos1;
        }
        if(j0 < j1 && j1 < moves.length - 1){
            let x = Math.floor(moves[i][j1 + 1] / 10);
            let y = moves[i][j1 + 1] % 10;
            
            var newPos2 = new Position(x,y);
            const checkPiece = board.pieces.find((p) => p.samePosition(newPos2));
                               
            if(!checkPiece)
                return newPos2;
        }
        return newPos;
    }

    function isWin(team: playerName) : Boolean{
        let ret = false;
        let p = board.pieces;
        if(playerName.OUR === board.currentTeam){
            var check : Position [] = [];
            for(let x of p){
                if(x.team === team){
                    check.push(x.position);
                }
            }
            check.sort((a, b) => {
                if (a.x !== b.x) {
                  return a.x - b.x;
                } 
                else {
                  return a.y - b.y;
                }
            });
            white_win.sort((a,b) =>{
                if(a.x !== b.x){
                    return a.x - b.x;
                }
                else{
                    return a.y - b.y;
                }
            });

            if(JSON.stringify(check) === JSON.stringify(white_win)){
                setFlag(true)
                console.log("WHITE WIN");
                setWon(whiteWon);
            }
        }
        else{
            var check : Position [] = [];
            for(let x of p){
                if(x.team === team){
                    check.push(x.position);
                }
            }

            check.sort((a, b) => {
                if (a.x !== b.x) {
                  return a.x - b.x;
                } 
                else {
                  return a.y - b.y;
                }
            });

            black_win.sort((a,b) =>{
                if(a.x !== b.x){
                    return a.x - b.x;
                }
                else {
                    return a.y - b.y;
                }
            });

            if(JSON.stringify(check) === JSON.stringify(black_win)){
                setFlag(true);
                setWon(blackWon);
                console.log("BLACK IS WIN")
            }
        }
        return ret;
    }
    
    function playGame(){
        if(flag){
            let init = initialBoard.clone();
            setBoard(init);
            setFlag(false);
            setWon("");
        }
    }

    function resetGame(){
        let init = initialBoard.clone();
        setBoard(init);
        setWon("");
       // ToonoBoard(playMove ,board.pieces , true);
    }


    return <>

        <div style={ {height: "500px", width: "250px", backgroundColor: "#bbc5c4", marginRight:"100px"}}>
            <p style={{textAlign: "center", color: "black", fontSize: "24px",}}>Turn count : {board.totalTurns}<br></br>Turn player: {board.currentTeam}</p>

            <div style={{margin: "50px"}}>
                <button onClick={e => resetGame()}>reset game</button>
                <br></br><br></br>
                <button onClick={e => playGame()}>play game</button>
                <br></br><br></br>
                
            </div>
            
        </div>

        {!flag && <ToonoBoard playMove={playMove} pieces={board.pieces} />}
        {flag && (<div style = {{height: "500px", width: "500px", backgroundImage: `url(${won})`}}></div>)}

        <div style={ {height: "500px", width: "250px", backgroundColor: "#bbc5c4", marginLeft:"100px"}}>
            <p style={{margin: "10px", fontSize: "18px" }}><strong>Тооно хөлөгт тоглоом</strong><br></br>Тойрог хэлбэртэй 25 буудалтай хөлөг дээр 2 тоглогч 6-н хар, 6-н цагаан чулуугаар тоглодог.
            Тоглоход бэлтгэж 6, 6 чулуугаа хөлөгт зохих ёсоор байрлуулна. Цагаан нь эхэлж нүүнэ. Зураасны дагууд нэг нэг буудлаар өөрийн чулууг нүүнэ.
            Шулуун зураасны дагууд зэргэлдээ буудалд хэн нэгний чулуу байвал түүнийг давж нүүж болно.
            Энэхүү тоглоомын зорилт бол хэн нэгэн нь нөгөөгийнхөө 6-н чулууны анхны байрыг түрүүлж эзлэхийг эрмэлзэх явдал мөн.
            Ингэж урьдаар бусдын чулууны байрыг өөрийн чулуугаар эзлүүлж чадсан хүн хожно.
            </p>
        </div>
    </>
}
