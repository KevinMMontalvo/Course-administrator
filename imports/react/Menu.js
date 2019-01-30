import React, { Component } from 'react';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    studentManagement(){
      this.props.studentManagement();
      document.getElementById('student').style.backgroundColor = '#2471A3';
      document.getElementById('course').className = "menu-option";
      document.getElementById('teacher').className = "menu-option";
      document.getElementById('search').className = "menu-option";
      document.getElementById('course').style.backgroundColor = '#1A5276';
      document.getElementById('teacher').style.backgroundColor = '#1A5276';
      document.getElementById('search').style.backgroundColor = '#1A5276';
    }
    courseManagement(){
      this.props.courseManagement();
      document.getElementById('student').className = "menu-option";
      document.getElementById('course').style.backgroundColor = '#2471A3';
      document.getElementById('teacher').className = "menu-option";
      document.getElementById('search').className = "menu-option";
      document.getElementById('student').style.backgroundColor = '#1A5276';
      document.getElementById('teacher').style.backgroundColor = '#1A5276';
      document.getElementById('search').style.backgroundColor = '#1A5276';
    }
    teacherManagement(){
      this.props.teacherManagement();
      document.getElementById('student').className = "menu-option";
      document.getElementById('course').className = "menu-option";
      document.getElementById('teacher').style.backgroundColor = '#2471A3';
      document.getElementById('search').className = "menu-option";
      document.getElementById('student').style.backgroundColor = '#1A5276';
      document.getElementById('course').style.backgroundColor = '#1A5276';
      document.getElementById('search').style.backgroundColor = '#1A5276';
    }
    searchManagement(){
      this.props.searchManagement();
      document.getElementById('student').className = "menu-option";
      document.getElementById('course').className = "menu-option";
      document.getElementById('teacher').className = "menu-option";
      document.getElementById('search').style.backgroundColor = '#2471A3';
      document.getElementById('student').style.backgroundColor = '#1A5276';
      document.getElementById('teacher').style.backgroundColor = '#1A5276';
      document.getElementById('course').style.backgroundColor = '#1A5276';
    }
    render() {
        return(
            <div>
              <div className="menu-container">
                <div className="menu-options-container">
                  <div id="student" onClick={() => this.studentManagement()} className="menu-option">ALUMNOS</div>
                  <div id="course" onClick={() => this.courseManagement()} className="menu-option">CURSOS</div>
                  <div id="teacher" onClick={() => this.teacherManagement()}  className="menu-option">PROFESORES</div>
                  <div id="search" onClick={() => this.searchManagement()} className="menu-option">BUSQUEDAS</div>
                </div>
              </div>
            </div>
        );
    }
}
