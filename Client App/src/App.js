import React, { Component } from 'react';
import axios from 'axios';
let ENDPOINT = 'http://localhost:3000/users';
class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      num1: '',
      num2: '',
      operator: '',
      input: '',
      history: [],
      show: false,
    };
  }

  handleClick = (value) => {
    if (value == '+' || value == '-' || value == '*' || value == '/') {
      this.setState({ operator: value });
    }
    this.setState((prevState) => ({
      input: prevState.input + value,
    }));

    const numbers = (this.state.input + value).match(
      /[-]{0,1}[\d]*[.]{0,1}[\d]+/g
    );

    if (numbers) {
      const num1 = +numbers[0];
      const num2 = parseInt(numbers[1]);

      if (!isNaN(num1) && !isNaN(num2)) {
        console.log('num1:', num1);
        console.log('num2:', num2);
        this.setState({ num1, num2 });
      } else {
        console.log('One or both values are not valid numbers.');
      }
    } else {
      console.log('No valid numbers found in the string.');
    }
  };

  operatorClick = (value) => {
    this.setState(() => ({
      input: value,
    }));
  };

  handleClear = async () => {
    this.setState({
      num1: '',
      num2: '',
      operator: '',
      input: '',
      history: [],
      show: false,
    });
    await axios.post(ENDPOINT + '/clear');
  };

  showHistory = async () => {
    const response = await axios.get(ENDPOINT + '/history');
    console.log(JSON.parse(JSON.stringify(response.data.data)));
    this.setState(() => ({
      show: true,
      history: JSON.parse(JSON.stringify(response.data.data)) || [],
    }));
  };

  handleCalculate = async () => {
    try {
      console.log(this.state);
      let key = '';
      if (this.state.operator === '+') {
        key = '/add';
      }
      if (this.state.operator === '-') {
        key = '/sub';
      }
      if (this.state.operator === '*') {
        key = '/mul';
      }
      if (this.state.operator === '/') {
        key = '/div';
      }
      const response = await axios.post(ENDPOINT + key, {
        num1: this.state.num1,
        num2: this.state.num2,
      });
      console.log(response);
      this.setState(() => ({
        input: JSON.parse(response.data.data),
      }));
    } catch (error) {
      this.setState({
        input: 'Error',
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <input type="text" value={this.state.input} readOnly />
        </div>
        <div>
          <button onClick={() => this.handleClick('0')}>0</button>
          <button onClick={() => this.handleClick('1')}>1</button>
          <button onClick={() => this.handleClick('2')}>2</button>
          <button onClick={() => this.handleClick('3')}>3</button>
          <button onClick={() => this.handleClick('4')}>4</button>
          <button onClick={() => this.handleClick('5')}>5</button>
          <button onClick={() => this.handleClick('6')}>6</button>
          <button onClick={() => this.handleClick('7')}>7</button>
          <button onClick={() => this.handleClick('8')}>8</button>
          <button onClick={() => this.handleClick('9')}>9</button>
          {/* Add buttons for other numbers */}
        </div>
        {/* Add buttons for operators (+, -, *, /) */}
        <div>
          <button onClick={() => this.handleClick('/')}>/</button>
          <button onClick={() => this.handleClick('*')}>*</button>
          <button onClick={() => this.handleClick('+')}>+</button>
          <button onClick={() => this.handleClick('-')}>-</button>
        </div>
        <div>
          <button onClick={this.handleCalculate}>Answer</button>
        </div>
        <div>
          <button onClick={this.showHistory}>Show History</button>
          <button onClick={this.handleClear}>Clear</button>
        </div>
        {this.state.history.length > 0 ? (
          <>
            <table border="1">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Data</th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                {this.state.history.map((item, index) => (
                  <tr key={index}>
                    <td>{item.type}</td>
                    <td>{item.data}</td>
                    <td>{item.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <p>No Data Found in History</p>
          </>
        )}
      </div>
    );
  }
}

export default Calculator;
