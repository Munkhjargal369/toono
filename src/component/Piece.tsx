import { playerName } from "./Player";
import { Position } from "./Position";

export class Piece {
    image: string;
    position: Position;
    team: playerName;
    possibleMoves?: Position[];
    hasMoved: boolean;
    constructor(position: Position, 
        team: playerName, hasMoved: boolean,
        possibleMoves: Position[] = []) {
        this.image = `assets/images/${playerName}.png`;
        this.position = position;
        this.team = team;
        this.possibleMoves = possibleMoves;
        this.hasMoved = hasMoved;
    }

    samePiecePosition(otherPiece: Piece) : boolean {
        return this.position.samePosition(otherPiece.position);
    }

    samePosition(otherPosition: Position) : boolean {
        return this.position.samePosition(otherPosition);
    }

    getLoc(otherPiece: Piece): Position{
        return otherPiece.position;
    }
       
    

    clone(): Piece {
        return new Piece(this.position.clone(),
              this.team, this.hasMoved,
             this.possibleMoves?.map(m => m.clone()));
    }
}