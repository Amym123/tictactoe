import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  // constructor to initialize state
  // in javascript classes, always call super when defining "constructor" of a subclass
  // all react component classes that have a "constructor" sthould start it with a "super(props)" call.
    // constructor(props){
    //   super(props);
    //   this.state = {  //Square no longer keeps track of game's state
    //     value: null,
    //   };
    // React components can use state to remember things. private to defined component.
    // store current value of Square in "this.state", change it when Square is clicked.
  
  render() {
    return (
      // <button className="square" onClick={function() {alert('click');}}>
      // arrow function syntax for event handlers
      // onClick={() => alert('click')} : alert when a square is clicked
        // <button
        //   className="square"
        //   onClick={() => alert('click')}>
        //   {this.props.value}
        // </button>
        // passes a prop from a parent Board component to a child Square component

      // displays the current state's value when clicked.
      // onClick={() => this.setState({value: 'X'})}>: tells react to re-render square whenever its button
      // is clicked. after update, square's this.state.value = 'X'.

      // ** when setState is called in a component, react automatically updates the child components inside of it too
        // <button
        //   className="square"
        //   onClick={() => this.setState({value: 'X'})}>
        //   {this.state.value}
        // </button>

      // passing down value and onlick from Board to Square
      <button
        className="square"
        onClick={() => this.props.onClick()}
        >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
// lifting state into a parent component: when components are refactored.
// to collect data from multiple children, or two children communicate with
// each other: declare shared state in parent component.
// parent component can pass state back down to the children via props.
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    // used prop to make board instruct each individual Square about its current value
    // pass down a function from board to square to maintain board's state's privacy
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
