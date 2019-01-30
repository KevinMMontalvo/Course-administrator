import React, { Component } from 'react';

import CourseForm from '../react/CourseForm';
import CourseInformation from '../react/CourseInformation';
import TeachersByCoursesForm from '../react/TeachersByCoursesForm';

import { Courses } from '../../lib/collections/collections.js';

export default class CourseManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showAddForm: false,
          showAddTeachers: false,
          couses: undefined,
          selectedCourse: undefined,
        }
    }
    showAddForm() {
      this.setState({
        showAddForm: true,
      });
    }
    hideAddForm() {
      this.setState({
        showAddForm: false,
      });
    }
    showAddTeachersForm() {
      this.setState({
        showAddForm: false,
        showAddTeachers: true,
      });
    }
    hideAddTeachersForm() {
      this.setState({
        showAddForm: false,
        showAddTeachers: false,
      });
    }
    setSelectedCourse(course){
      this.setState({
        selectedCourse: course,
      });
    }
    isLoading () {
      if(this.state.courses != undefined){

      }
    }
    componentWillMount(){
      Tracker.autorun(() => {
        this.setState({
          courses: Courses.find().fetch(),
        }, () => this.isLoading())
      });
    }
    render() {
        return(
            <div>
              <div className="management-container">
                {
                  this.state.showAddForm ?
                    <div>
                      <CourseForm hideAddForm = {() => this.hideAddForm()}></CourseForm>
                    </div>
                  :
                  !this.state.showAddTeachers?
                    <div>
                      <div className="management-title">CURSOS REGISTRADOS</div>
                      <div className="column-container">
                        <div className="c1-information-column">INFORMACION DE CURSO</div>
                        <div className="c2-information-column">PROFESORES QUE DICTAN EL CURSO</div>
                      </div>
                      <div className="course-management-table">
                        {this.state.courses.map((courses) => {
                          return <CourseInformation setSelectedCourse={this.setSelectedCourse.bind(this)} showAddTeachersForm={() => this.showAddTeachersForm()} courses={courses}  key={courses._id}></CourseInformation>
                        })}
                      </div>
                      <div>
                        <div onClick={() => this.showAddForm()} className="add-button">+</div>
                      </div>
                    </div>
                  :
                  <div>
                    <TeachersByCoursesForm selectedCourse={this.state.selectedCourse} hideAddTeachersForm = {() => this.hideAddTeachersForm()}></TeachersByCoursesForm>
                  </div>
                }
              </div>
            </div>
        );
    }
}
