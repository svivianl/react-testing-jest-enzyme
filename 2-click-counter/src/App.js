import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { timingSafeEqual } from 'crypto';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      counter: 0,
      isError: false
    }
  }

  render(){
    return (
      <div data-test='component-app'>
        <h1 data-test='counter-display'>The counter is currently {this.state.counter}</h1>
        <button 
          data-test='increment-button' 
          onClick={()=> {
            if(this.state.isError){
             this.setState({isError: false}) 
            }
            this.setState({counter: this.state.counter + 1});
        }}
        >
          Increment
        </button>
        <button 
          data-test='decrement-button' 
          onClick={() => this.state.counter > 0 ? this.setState({counter: this.state.counter - 1}) : this.setState({isError: true})}
        >
          Decrement
        </button>
        {this.state.isError && (
          <h5 data-test='message' style={{color: 'red'}}>Cannot go below 0</h5>
        )}
      </div>
    );
  }
}

export default App;
