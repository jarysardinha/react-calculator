import React, { Component } from 'react';

class LastCalculation extends Component {
    render() {
        if (this.props.lastCalculations.length > 0) {
            return <div>
                <ul>{this.props.lastCalculations.map((calculation, key) => {
                return <li key={key}>{calculation}</li>
            })}</ul>
                <a href="#" onClick={this.props.handleClearCalculations}>Clear last calculations</a>
            </div>
        } else {
            return <i>No calculations were done yet</i>
        }
    }
}

export default LastCalculation;