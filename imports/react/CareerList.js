import React, { Component } from 'react';

export default class CareerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
    }
    render() {
        return(
          <div>
          <div className="teacher-column-container">
            <div className="teacher-information-column">
              <div className="information-row-container">
                <div className="atribute-container">CARRERA</div>
                <div className="value-container">{this.props.careers.name}</div>
              </div>
            </div>
          </div>
          </div>
        );
    }
}
