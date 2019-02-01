import React, { Component } from 'react';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    studentManagement(){
      this.props.studentManagement();
      let option = document.getElementById('student');
      let options = document.getElementsByClassName('menu-option');
      for (var i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = "#0F141A";
        options[i].style.textIndent = "3vw";
      }
      option.style.backgroundColor = "#212F3C";
      option.style.textIndent = "5vw";
    }
    courseManagement(){
      this.props.courseManagement();
      let option = document.getElementById('course');
      let options = document.getElementsByClassName('menu-option');
      for (var i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = "#0F141A";
        options[i].style.textIndent = "3vw";
      }
      option.style.backgroundColor = "#212F3C";
      option.style.textIndent = "5vw";
    }
    teacherManagement(){
      this.props.teacherManagement();
      let option = document.getElementById('teacher');
      let options = document.getElementsByClassName('menu-option');
      for (var i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = "#0F141A";
        options[i].style.textIndent = "3vw";
      }
      option.style.backgroundColor = "#212F3C";
      option.style.textIndent = "5vw";
    }
    searchManagement(){
      this.props.searchManagement();
      let option = document.getElementById('search');
      let options = document.getElementsByClassName('menu-option');
      for (var i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = "#0F141A";
        options[i].style.textIndent = "3vw";
      }
      option.style.backgroundColor = "#212F3C";
      option.style.textIndent = "5vw";
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
