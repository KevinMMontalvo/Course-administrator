import React, { Component } from 'react';
import Menu from '../react/Menu';
import Presentation from '../react/Presentation';
import StudentManagement from '../react/StudentManagement';
import CourseManagement from '../react/CourseManagement';
import TeacherManagement from '../react/TeacherManagement';
import Search from '../react/Search';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showPresentation: true,
          showStudentManagement: false,
          showCourseManagement: false,
          showTeacherManagement: false,
          showSearchManagement: false,
        }
    }
    studentManagement(){
      this.setState({
        showStudentManagement: true,
        showPresentation: false,
        showCourseManagement: false,
        showTeacherManagement: false,
        showSearchManagement: false,
      });
    }
    courseManagement(){
      this.setState({
        showStudentManagement: false,
        showPresentation: false,
        showCourseManagement: true,
        showTeacherManagement: false,
        showSearchManagement: false,
      });
    }
    teacherManagement(){
      this.setState({
        showStudentManagement: false,
        showPresentation: false,
        showCourseManagement: false,
        showTeacherManagement: true,
        showSearchManagement: false,
      });
    }
    searchManagement(){
      this.setState({
        showStudentManagement: false,
        showPresentation: false,
        showCourseManagement: false,
        showTeacherManagement: false,
        showSearchManagement: true,
      });
    }
    render() {
        return(
            <div>
              <Menu studentManagement = {() => this.studentManagement()} courseManagement = {() => this.courseManagement()} teacherManagement = {() => this.teacherManagement()} searchManagement={() => this.searchManagement()}>

              </Menu>
              <div className="data-container">
                {
                  this.state.showPresentation ?
                    <Presentation></Presentation> :
                  undefined
                }
                {
                  this.state.showStudentManagement ?
                    <StudentManagement></StudentManagement> :
                  undefined
                }
                {
                  this.state.showCourseManagement ?
                    <CourseManagement></CourseManagement> :
                  undefined
                }
                {
                  this.state.showTeacherManagement ?
                    <TeacherManagement></TeacherManagement> :
                  undefined
                }
                {
                  this.state.showSearchManagement ?
                    <Search></Search> :
                  undefined
                }
              </div>
            </div>
        );
    }
}
