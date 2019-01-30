import React, { Component } from 'react';

export default class PhoneNumberInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
          <div>
            <div className="phone-number-row">
              <div id={this.props.phoneNumbers._id} className="phone-number-information-container">
                <div className="phone-index-text">{this.props.phoneNumbers._id + 1} - </div>
                <div className="phone-number-text">{this.props.phoneNumbers.number}</div></div>
            </div>
          </div>
        );
    }
}
