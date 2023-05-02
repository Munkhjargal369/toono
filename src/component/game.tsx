import React, { useRef, useState } from "react";
import Board from './ToonoBoard';
import { Position } from "./Position";
import { Piece } from "./Piece";
import { playerName } from "./Player";

    /*
         12 13 14
       11        15
      21 22 23 24 25  
      31 32 33 34 35
      41 42 43 44 45
       51        55
         52 53 54 

    */
    /*
      
    13 15 17
  22 13 15 17 28
  31 33 35 37 39
  51 53 55 57 59
  71 73 75 77 79
  82 93 95 97 88
      93 95 97   


    11 13 15 17 29
    31 33 35 37 39
    51 53 55 57 59
    71 73 75 77 79
    91 93 95 97 99

    11 12 13 14 15
    21 22 23 24 25
    31 32 33 34 35
    41 42 43 44 45
    51 52 53 54 55
    */
export class Main{

    pieces: Piece[];
    totalTurns: number;

    constructor(pieces: Piece[], totalTurns: number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }

    get currentPlayer(): playerName{
        return this.totalTurns % 2 === 0 ? playerName.OPPONENT : playerName.OUR;
    }
    calculateMoves(){

    }

    playMove(enPassantMove: boolean,
        validMove: boolean,
        playedPiece: Piece,
        destination: Position): boolean {

        // If the move is a castling move do this
        

        if (enPassantMove) {
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                 
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);
        } 
        else {
            return false;
        }

        return true;
    }
/*
    clone(): Board {
        return new Board(this.pieces.map(p => p.clone()),
            this.totalTurns);
    }
*/
}



