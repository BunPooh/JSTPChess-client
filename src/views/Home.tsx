import "./Home.css";

import { Collapse, Tabs } from "antd";
import * as React from "react";

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

function callback(key: any) {
  console.log(key);
}

export default class Home extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h2>Our Home</h2>
        <Tabs defaultActiveKey="1" onChange={callback} className="tab">
          <TabPane tab="Chess moves" key="1">
            <Collapse bordered={false} accordion className="tab">
              <Panel header="King" key="1">
                <p>
                  King can move exactly one square horizontally, vertically, or
                  diagonally. At most once in every game, each king is allowed
                  to make a special move, known as castling.
                </p>
              </Panel>
              <Panel header="Queen" key="2">
                <p>
                  Queen can move any number of vacant squares diagonally,
                  horizontally, or vertically.
                </p>
              </Panel>
              <Panel header="Rook" key="3">
                <p>
                  Rook can move any number of vacant squares vertically or
                  horizontally. It also is moved while castling.
                </p>
              </Panel>
              <Panel header="Bishop" key="4">
                <p>
                  Bishop can move any number of vacant squares in any diagonal
                  direction.
                </p>
              </Panel>
              <Panel header="Knight" key="5">
                <p>
                  Knight can move one square along any rank or file and then at
                  an angle. The knight´s movement can also be viewed as an “L”
                  or “7″ laid out at any horizontal or vertical angle.
                </p>
              </Panel>
              <Panel header="Pawns" key="6">
                <p>
                  Pawns can move forward one square, if that square is
                  unoccupied. If it has not yet moved, the pawn has the option
                  of moving two squares forward provided both squares in front
                  of the pawn are unoccupied.
                  <br />A pawn cannot move backward. Pawns are the only pieces
                  that capture differently from how they move. They can capture
                  an enemy piece on either of the two spaces adjacent to the
                  space in front of them (i.e., the two squares diagonally in
                  front of them) but cannot move to these spaces if they are
                  vacant. The pawn is also involved in the two special moves en
                  passant and promotion.
                </p>
              </Panel>
            </Collapse>{" "}
          </TabPane>
          <TabPane tab="General Chess Rules" key="2">
            White is always first to move and players take turns alternately
            moving one piece at a time. Movement is required. If a player´s turn
            is to move, he is not in check but has no legal moves, this
            situation is called “Stalemate” and it ends the game in a draw.
            <br />
            <br />
            <br />
            Each type of piece has its own method of movement. A piece may be
            moved to another position or may capture an opponent´s piece,
            replacing on its square (en passant being the only exception). With
            the exception of the knight, a piece may not move over or through
            any of the other pieces.
            <br />
            <br />
            <br />
            When a king is threatened with capture (but can protect himself or
            escape), it´s called check. If a king is in check, then the player
            must make a move that eliminates the threat of capture and cannot
            leave the king in check.
            <br />
            <br />
            <br />
            Checkmate happens when a king is placed in check and there is no
            legal move to escape. Checkmate ends the game and the side whose
            king was checkmated looses. Chess for kids would be a great option
            to help the kid enhance his thinking capability with the chess
            strategies involved.{" "}
          </TabPane>
          <TabPane tab="How to play the game" key="3">
            Instruction on how to do so.
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
