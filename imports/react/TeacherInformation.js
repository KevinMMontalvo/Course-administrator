import React, { Component } from 'react';

export default class TeacherInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          age: 0,
        }
    }
    getAge(birthDate) {
      var now = new Date();
      function isLeap(year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
      }
      var days = Math.floor((now.getTime() - birthDate.getTime())/1000/60/60/24);
      var age = 0;
      for (var y = birthDate.getFullYear(); y <= now.getFullYear(); y++){
        var daysInYear = isLeap(y) ? 366 : 365;
        if (days >= daysInYear){
          days -= daysInYear;
          age++;
        }
      }
      return age;
    }
    componentWillMount(){
      this.setState({
        age: this.getAge(this.props.teachers.birthDate),
      })
    }
    render() {
        return(
          <div>
            <div className="teacher-column-container">
              <p className="info-title">Información del profesor</p>
              <div className="teacher-information-column">
                <div className="information-row-container">
                  <div className="atribute-container">CEDULA</div>
                  <div className="value-container">{this.props.teachers.identificationCard}</div>
                </div>
                <div className="information-row-container">
                  <div className="atribute-container">NOMBRE</div>
                  <div className="value-container">{this.props.teachers.name}</div>
                </div>
                <div className="information-row-container">
                  <div className="atribute-container">APELLIDO</div>
                  <div className="value-container">{this.props.teachers.lastname}</div>
                </div>
                <div className="information-row-container">
                  <div className="atribute-container">FECHA N</div>
                  <div className="value-container"> {this.props.teachers.birthDate.getDay()}-{this.props.teachers.birthDate.getMonth()}-{this.props.teachers.birthDate.getFullYear()}</div>
                </div>
                <div className="information-row-container">
                  <div className="atribute-container">EDAD</div>
                  <div className="value-container">{this.state.age}</div>
                </div>
                <div className="information-row-container">
                  <div className="atribute-container">CARGO</div>
                  <div className="value-container">{this.props.teachers.role.name}</div>
                </div>
                <div className="information-row-container">
                  <div className="atribute-container">DEPARTAMENTO</div>
                  <div className="value-container">{this.props.teachers.department.name}</div>
                </div>
              </div>
            </div>
            <div className="student-separator"></div>
          </div>
        );
    }
}
