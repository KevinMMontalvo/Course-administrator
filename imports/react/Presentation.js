import React, { Component } from 'react';
import Menu from '../react/Menu';

export default class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div>
              <div className="presentation-container">
                <div className="title">ADMINISTRACION DE CURSOS</div>
                <div className="presentation-logo-container"></div>
              </div>
            </div>
        );
    }
}
