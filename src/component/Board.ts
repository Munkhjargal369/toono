import { Piece } from "./Piece";
import { playerName } from "./Player";

export class Board {
    pieces: Piece[];
    totalTurns: number;

    constructor(pieces: Piece[], totalTurns: number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }

    get currentTeam(): playerName {
        return this.totalTurns % 2 === 0 ? playerName.OPPONENT : playerName.OUR;
    }
    clone(): Board {
        return new Board(this.pieces.map(p => p.clone()),
            this.totalTurns);
    }
}