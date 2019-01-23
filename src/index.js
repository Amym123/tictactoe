import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// class Square extends React.Component {
//   // constructor to initialize state
//   // in javascript classes, always call super when defining "constructor" of a subclass
//   // all react component classes that have a "constructor" sthould start it with a "super(props)" call.
//     // constructor(props){
//     //   super(props);
//     //   this.state = {  //Square no longer keeps track of game's state
//     //     value: null,
//     //   };
//     // React components can use state to remember things. private to defined component.
//     // store current value of Square in "this.state", change it when Square is clicked.
//
//   render() {
//     return (
//       // <button className="square" onClick={function() {alert('click');}}>
//       // arrow function syntax for event handlers
//       // onClick={() => alert('click')} : alert when a square is clicked
//         // <button
//         //   className="square"
//         //   onClick={() => alert('click')}>
//         //   {this.props.value}
//         // </button>
//         // passes a prop from a parent Board component to a child Square component
//
//       // displays the current state's value when clicked.
//       // onClick={() => this.setState({value: 'X'})}>: tells react to re-render square whenever its button
//       // is clicked. after update, square's this.state.value = 'X'.
//
//       // ** when setState is called in a component, react automatically updates the child components inside of it too
//         // <button
//         //   className="square"
//         //   onClick={() => this.setState({value: 'X'})}>
//         //   {this.state.value}
//         // </button>
//
//       // passing down value and onlick from Board to Square
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//         >
//         {this.props.value}
//       </button>
//     );
//   }
// }

// replaced square class with square function
// function components are simpler to write components containing only a render method without its own state.
// takes props and returns what should be rendered.

// In a class, use arrow function to access correct "this" value, but not in function component
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>
  );
}


class Board extends React.Component {
// lifting state into a parent component: when components are refactored.
// to collect data from multiple children, or two children communicate with
// each other: declare shared state in parent component.
// parent component can pass state back down to the children via props.

// lifted to Game component to display all past histories
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }

  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   // .slice() creates a copy. in this case, a copy of the squares Array
  //   // two approaches to changing data:
  //   //  - mutate data by directly changing the data's values
  //   //  - replace data with a new copy which has desired changes
  //   //    - immutability makes complex features much easier to make. keep previous versions, and reuse
  //   //    - easier to detect changes
  //   //    - build pure components in React. immutable data can easily determine if changes have been made
  //   //      which helps to determine when component needs re-rendering
  //   //      https://reactjs.org/docs/optimizing-performance.html#examples
  //
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //
  //   // squares[i] = 'X';
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    // used prop to make board instruct each individual Square about its current value
    // pass down a function from board to square to maintain board's state's privacy
    return (
      <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
  );
  }

  render() {
    // const status = 'Next player: X';
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    // // because game component is now rendering the game's status
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  // set up initial state of Game component
  constructor(props) {
    super(props);
    // store previous square arrays in history array - all board states
    // place history in top-level because we need access to the history to display list of past moves
    //  - can remove the squares state from Board component (Board to Game component lift up)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    };
  }

  handleClick(i) {
    // cannot mutate squares array to make time travel.
    // use slice to create new copy of squares array after every move, and make it immutable.
    //  store every past version of the squares array in history array

    // history in Game component -> remove squares state from its child Board.

  // update render in Game to use most recent history entry to produce game's status
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    // react elements are first-class JavaScript objects so they can be passed around in applications
    // use array of react elements to render multiple items.
      //map() is used for mapping data to other data, can be used to map history of moves
    const moves = history.map((step, move) => {
      const desc = move ?
      'Go to move #' + move :
      'Go to game start';
      return (
        // key: when element is created, React extracts key property and stores key directly on the returned element
        //      cannot be referenced with this.props.key
        //      React automatically decides which component to update using the key
        //      component cannot inquire about its key
        // assign proper keys when building dynamic lists!
        // no key: warning from React, and use array index as key by default -> bad when re-ordering list's items/insert/delete
        // only need to unique between components and siblings
        <li key = {move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner!: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
