import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Numpad from './components/Numpad/Numpad';
import Result from './components/Result/Result';
import {RESULT_STRING} from './components/Constants';
import {SERVICE_URL} from './components/Constants';



class App extends Component {

  state = {
    userInput: "",
    pin:"",
    resultStr:  RESULT_STRING,
    resultCode: "",
    key: ""
  
  }

  numberClickedHandler = (number) => {
    if(this.state.userInput.length < 6) {
      const inp = this.state.userInput + number;
      this.setState({
        userInput: inp
      })
    }
   
  }

  clearNumberHandler = () => {
    this.setState({
      userInput: ""
      
    })
     this.setState({
      userInput: ""
      
    })
    
  }

  deleteNumberHandler = () => {
    const inp = this.state.userInput.substring(0, this.state.userInput.length - 1);
    this.setState({
      userInput: inp
    })
  }
  changePin = (e) =>{
    this.setState({pin: e.target.value});
  
  }

  apiCalledHandler = () => {
    const amount = this.state.userInput;
    const pin = this.state.pin;

    if( pin === ""){
      this.setState({
        resultStr: "PLEASE ENTER Pin Number",
        resultCode: "1",
        key: Math.random()
      })
    }
    else if(amount !== "" && pin !== ""){
      let newResultStr = "";
      var th = this;
      const source = SERVICE_URL.replace('?1',amount).replace('?2',pin) 
      this.serverRequest = 
        axios.get(source)
          .then(function(result) {    
            console.log(result.data);
            newResultStr += result.data['responseDesc'];
            if("0" === result.data['responseCode']){
              newResultStr += " \n DISPENSING AMOUNT " + amount;
            }
            th.setState({
              resultStr: newResultStr,
              resultCode: result.data['responseCode'],
              key: Math.random()
            });
          })
          .catch(error => {
            th.setState({
              resultStr: "OUT OF SERVICE",
              resultCode: "1",
              key: Math.random()
            });
          });
      this.clearNumberHandler();
    } else {
      this.setState({
        resultStr: RESULT_STRING,
        resultCode: "1",
        key: Math.random()
      })
    }
  }
 
  render() {
    return (
      
      <div>
           <h1 className="Numpad">ATM Simulator</h1>  <br/> 
           <h1 className="Numpad"> Enter Pin Number :</h1> <input id="input" type="password" onChange={this.changePin} className="Numpad"/>
        
        <Numpad 
          userInput={this.state.userInput}
          pin={this.state.pin}
          clicked={this.numberClickedHandler}
          del={this.deleteNumberHandler}
          clear={this.clearNumberHandler}
          dispense={this.apiCalledHandler} />
        <Result 
          key={this.state.key}
          resultStr={this.state.resultStr} 
          resultCode={this.state.resultCode} />
      </div>
    );
  }
}

export default App;
