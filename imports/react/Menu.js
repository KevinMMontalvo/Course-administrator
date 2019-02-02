import React, { Component } from 'react';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showingResponsiveMenu: false,
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
      document.getElementById('menu-container').style.display = "none";
      document.getElementById('burger-menu').style.backgroundImage = "url(menu.svg)";
      document.getElementById('burger-menu').style.backgroundSize = "6vh";
      this.setState({
        showingResponsiveMenu: false,
      });
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
      document.getElementById('menu-container').style.display = "none";
      document.getElementById('burger-menu').style.backgroundImage = "url(menu.svg)";
      document.getElementById('burger-menu').style.backgroundSize = "6vh";
      this.setState({
        showingResponsiveMenu: false,
      });
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
      document.getElementById('menu-container').style.display = "none";
      document.getElementById('burger-menu').style.backgroundImage = "url(menu.svg)";
      document.getElementById('burger-menu').style.backgroundSize = "6vh";
      this.setState({
        showingResponsiveMenu: false,
      });
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
      document.getElementById('menu-container').style.display = "none";
      document.getElementById('burger-menu').style.backgroundImage = "url(menu.svg)";
      document.getElementById('burger-menu').style.backgroundSize = "6vh";
      this.setState({
        showingResponsiveMenu: false,
      });
    }
    deployResponsiveMenu(){
      if(!this.state.showingResponsiveMenu){
        document.getElementById('menu-container').style.display = "flex";
        document.getElementById('burger-menu').style.backgroundImage = "url(close.svg)";
        document.getElementById('burger-menu').style.backgroundSize = "5vh";
        this.setState({
          showingResponsiveMenu: true,
        });
        return;
      }
      else{
        document.getElementById('menu-container').style.display = "none";
        document.getElementById('burger-menu').style.backgroundImage = "url(menu.svg)";
        document.getElementById('burger-menu').style.backgroundSize = "6vh";
        this.setState({
          showingResponsiveMenu: false,
        });
        return;
      }
    }
    render() {
        return(
            <div>
              <div id="menu-container" className="menu-container">
                <div className="menu-options-container">
                  <div id="student" onClick={() => this.studentManagement()} className="menu-option">ALUMNOS</div>
                  <div id="course" onClick={() => this.courseManagement()} className="menu-option">CURSOS</div>
                  <div id="teacher" onClick={() => this.teacherManagement()}  className="menu-option">PROFESORES</div>
                  <div id="search" onClick={() => this.searchManagement()} className="menu-option">BUSQUEDAS</div>
                </div>
              </div>
              <div className="responosive-menu-bar">
                <div onClick={() => this.deployResponsiveMenu()} id="burger-menu" className="burger-menu"></div>
              </div>
            </div>
        );
    }
}
