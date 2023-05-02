import {Board} from "./Board";
import { Piece } from "./Piece";
import { Position } from "./Position";
import { playerName } from "./Player";

    /* 
  22 13 15 17 28
  31 33 35 37 39
  51 53 55 57 59
  71 73 75 77 79
  82 93 95 97 88      
      */


export const row = ["q", "w", "e", "r", "t",'y','u','i','o','p'];
export const col = [ 1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10];
export const GRID_SIZE = 50;

export const white_win = [
    new Position(1,3),
    new Position(1,5),
    new Position(1,7),
    new Position(3,3),
    new Position(3,5),
    new Position(3,7)];

export const black_win = [
    new Position(9,3),
    new Position(9,5),
    new Position(9,7),
    new Position(7,3),
    new Position(7,5),
    new Position(7,7)];


export const initialBoard : Board = new Board( [

    new Piece(
        new Position(1,3),
        playerName.OPPONENT,
        false
    ),
    new Piece(
        new Position(1,5),
        playerName.OPPONENT,
        false
    ),
    new Piece(
        new Position(1,7),
        playerName.OPPONENT,
        false
    ),
    new Piece(
        new Position(3,3),
        playerName.OPPONENT,
        false
    ),
    new Piece(
        new Position(3,5),
        playerName.OPPONENT,
        false
    ),
    new Piece(
        new Position(3,7),
        playerName.OPPONENT,
        false
    ),



    new Piece(
        new Position(9,3),
        playerName.OUR,
        false
    ),
    new Piece(
        new Position(9,5),
        playerName.OUR,
        false
    ),
    new Piece(
        new Position(9,7),
        playerName.OUR,
        false
    ),
    new Piece(
        new Position(7,3),
        playerName.OUR,
        false
    ),
    new Piece(
        new Position(7,5),
        playerName.OUR,
        false
    ),
    new Piece(
        new Position(7,7),
        playerName.OUR,
        false
    ),


] , 1)
