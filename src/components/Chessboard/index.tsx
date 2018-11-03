import "./chessboardjs.css";
import "./index.css";

import * as chess from "chess.js";
import * as chessboardjs from "chessboardjs";
import * as PropTypes from "prop-types";
import * as React from "react";

import * as pieces from "./chesspieces/wikipedia";
import { ChessboardColor, ChessboardStatus, PlayerType } from "./types";

interface IComponentProps {
  pgn?: string; // PGN string
  playerColor: PlayerType;
  onChangePositions: (positions: string) => void;
  onChangeStatus?: (status: ChessboardStatus) => void;
  onMovePiece?: (from: string, to: string) => void;
}

interface IComponentState {
  pgn?: string;
}

function pieceTheme(piece: string) {
  return pieces[piece];
}

export default class Chessboard extends React.Component<
  IComponentProps,
  IComponentState
> {
  public static propTypes = {
    pgn: PropTypes.string,
    playerColor: PropTypes.string.isRequired,
    onChangePositions: PropTypes.func.isRequired,
    onChangeStatus: PropTypes.func
  };

  public game!: ChessInstance;
  public chessboard?: ChessBoardInstance;
  public chessboardRef: React.RefObject<HTMLDivElement>;

  constructor(props: IComponentProps) {
    super(props);
    this.state = {
      pgn: undefined
    };

    this.chessboardRef = React.createRef<HTMLDivElement>();
  }

  public componentDidMount() {
    const el = this.chessboardRef.current;
    if (!el) {
      throw new Error("Could not mount chessboard");
    }
    this.game = new chess();

    this.chessboard = chessboardjs(el, {
      pieceTheme,
      draggable: true,
      onDragStart: this.onDragStart,
      onMouseoverSquare: this.onMouseoverSquare,
      onMouseoutSquare: this.onMouseoutSquare,
      onDrop: this.onDrop
    });

    if (this.chessboard) {
      window.addEventListener("resize", this.onWindowResize);

      // initialize or load chessboard
      this.componentDidUpdate();
    }
  }

  public componentDidUpdate() {
    // When we received a position that is not the current one, we load it
    if (this.chessboard) {
      if (this.props.pgn) {
        // console.log("sync board with component");
        this.game.load_pgn(this.props.pgn);
        this.chessboard.position(this.game.fen());
      } else {
        // console.log("reset board");
        this.game.reset();
        this.chessboard.start();
      }
      this.setState({
        pgn: this.props.pgn
      });
      this.updateStatus();
    }
  }

  public shouldComponentUpdate(
    nextProps: Readonly<IComponentProps>,
    nextState: Readonly<IComponentState>
  ) {
    if (this.state.pgn === nextProps.pgn) {
      return false;
    }

    return true;
  }

  public componentWillUnmount() {
    const el = this.chessboardRef.current;
    if (el && this.chessboard) {
      window.removeEventListener("resize", this.onWindowResize);
      this.chessboard.destroy();
      this.chessboard = undefined;
    }
  }

  public render() {
    return (
      <div className="chessboard-container row d-flex justify-content-center">
        <div
          className="col-11 col-sm-8 col-md-7 col-lg-5"
          ref={this.chessboardRef}
        />
      </div>
    );
  }

  private onDragStart = (source: string, piece: string) => {
    if (
      this.game.game_over() ||
      (this.game.turn() === "w" && piece.search(/^b/) !== -1) ||
      (this.game.turn() === "b" && piece.search(/^w/) !== -1)
    ) {
      return false;
    }
    return undefined;
  };

  private onMouseoverSquare = (square: string, piece: string) => {
    // get list of possible moves for this square
    const moves = this.game.moves({
      square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // // enable this to disable that the selection and movement of enemy pieces
    // if (this.game.turn() !== this.props.playerColor) {
    //   return;
    // }

    // highlight the square they moused over
    this.greySquare(square);

    // highlight the possible squares for this piece
    for (const move of moves) {
      this.greySquare((move as ChessJS.Move).to);
    }
  };

  private onMouseoutSquare = () => {
    this.removeGreySquares();
  };

  private removeGreySquares = () => {
    const board = (window as any).$(this.chessboardRef.current);
    board.find(`.square-55d63`).css("background", "");
  };

  private greySquare = (square: string) => {
    const board = (window as any).$(this.chessboardRef.current);
    const squareEl = board.find(`.square-${square}`);

    let background = "#a9a9a9";
    if (squareEl.hasClass("black-3c85d")) {
      background = "#696969";
    }

    squareEl.css("background", background);
  };

  private onDrop = (source: string, target: string) => {
    this.removeGreySquares();

    if (this.props.onMovePiece) {
      this.props.onMovePiece(source, target);
    }

    // see if the move is legal
    const move = this.game.move({
      from: source,
      to: target,
      promotion: "q" // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) {
      return "snapback";
    }

    this.updatePosition();
    this.updateStatus();
    return undefined;
  };

  private updatePosition = () => {
    const pgn = this.game.pgn();
    this.setState({
      pgn
    });
    this.props.onChangePositions(pgn);
  };

  private updateStatus = () => {
    let status: ChessboardStatus;

    let moveColor = ChessboardColor.WHITE;
    if (this.game.turn() === "b") {
      moveColor = ChessboardColor.BLACK;
    }

    // checkmate?
    if (this.game.in_checkmate()) {
      status = ChessboardStatus[`${ChessboardColor[moveColor]}_CHECKMATE`];
    }

    // draw?
    else if (this.game.in_draw()) {
      status = ChessboardStatus.DRAW;
    }

    // game still on
    else {
      let statusStr: string = ChessboardColor[moveColor];
      // check?
      if (this.game.in_check()) {
        statusStr += `_CHECK`;
      }
      status = ChessboardStatus[statusStr];
    }

    if (this.props.onChangeStatus) {
      this.props.onChangeStatus(status);
    }
  };

  private onWindowResize = () => {
    if (this.chessboard) {
      this.chessboard.resize();
    }
  };
}
