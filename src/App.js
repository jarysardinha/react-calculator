import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LastCalculation from './LastCalculation';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

class App extends Component {
    state = {
        lastCalculations: [],
        currentCalculation: 0,
        operator: '+',
    };

  componentWillMount() {
      this.state.lastCalculations = read_cookie('lastCalculations').length > 0 ? read_cookie('lastCalculations') : [];
  }

  handleClick = () => {
     const number1 = parseFloat(document.getElementById('number1').value);
     const number2 = parseFloat(document.getElementById('number2').value);

     if (!number1 && !number2) {
         alert('You must send two numbers');

         return;
     } else if (isNaN(number1) || isNaN(number2)) {
         alert('You must send two numbers');

         return;
     }

     let calculation = 0;

     switch (this.state.operator) {
         case '+': calculation = number1 + number2; break;
         case '-': calculation = number1 - number2; break;
         case '/': calculation = number1 / number2; break;
         case '*': calculation = number1 * number2; break;
         case '^': calculation = number1 ^ number2; break;
         case 'root': calculation = Math.pow(number1, (1 / number2)); break;
     }

      let calculationText = number1 + ' ' + this.state.operator + ' ' + number2 + ' = ' + calculation;

      this.setState({
         currentCalculation: calculation
     });

     this.setState((prevState) => {
         prevState.lastCalculations.push(calculationText);

         bake_cookie('lastCalculations', prevState.lastCalculations);

         return prevState;
     });
  };

  handleChange = (e) => {
     this.setState({
         operator: e.target.value
     })
  };

    handleClearCalculations = (e) => {
        e.preventDefault();

        delete_cookie('lastCalculations');

        this.setState({
            lastCalculations: []
        });
    };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to my calculator</h1>
        </header>
        <div className="container">
          <div className="fields">
              <input type="text" name="number_1" id="number1" className="form-control"/>
          </div>
          <div className="fields" id="operator">
                <select className="form-control" onChange={this.handleChange}>
                    <option>+</option>
                    <option>-</option>
                    <option>/</option>
                    <option>*</option>
                    <option>^</option>
                    <option>root</option>
                </select>
          </div>
          <div className="fields">
            <input type="text" name="number_2" id="number2" className="form-control"/>
          </div>
          <div>
            <button onClick={this.handleClick} className="btn btn-primary">Calculate</button>
          </div>
          <div className="calculation">
              <b>Result:</b> {this.state.currentCalculation}
          </div>
          <div className="lastResults">
              <b>Latest calculations</b><br/>
              <LastCalculation {...this.state} handleClearCalculations={this.handleClearCalculations}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
