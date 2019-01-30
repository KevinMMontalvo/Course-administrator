import React, { Component } from 'react';
import ButterToast from 'butter-toast';

import StudentForm from '../react/StudentForm';
import CoursesByStudentForm from '../react/CoursesByStudentForm';
import StudentInformation from '../react/StudentInformation';

import { Students } from '../../lib/collections/collections.js';

export default class StudentManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showAddForm: false,
          showAddCourses: false,
          students: undefined,
          selectedStudent: undefined,
        }
    }
    showAddForm() {
      this.setState({
        showAddForm: true,
        showAddCourses: false,
      });
    }
    hideAddForm() {
      this.setState({
        showAddForm: false,
        showAddCourses: false,
      });
    }
    showAddCoursesForm() {
      this.setState({
        showAddForm: false,
        showAddCourses: true,
      });
    }
    hideAddCoursesForm() {
      this.setState({
        showAddForm: false,
        showAddCourses: false,
      });
    }
    setSelectedStudent(student){
      this.setState({
        selectedStudent: student,
      });
    }
    isLoading () {
      if(this.state.students != undefined){

      }
    }
    componentWillMount(){
      Tracker.autorun(() => {
        this.setState({
          students: Students.find().fetch(),
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
                      <StudentForm hideAddForm = {() => this.hideAddForm()}></StudentForm>
                    </div>
                  :
                  !this.state.showAddCourses ?
                    <div>
                      <div className="management-title">ALUMNOS REGISTRADOS</div>
                      <div className="column-container">
                        <div className="information-column">INFORMACION PERSONAL</div>
                        <div className="phone-numbers-column">NUMEROS TELEFONICOS</div>
                        <div className="courses-column">CURSOS</div>
                      </div>
                      <div className="student-management-table">
                        {this.state.students.map((students) => {
                          return <StudentInformation setSelectedStudent={this.setSelectedStudent.bind(this)} showAddCoursesForm={() => this.showAddCoursesForm()} students={students}  key={students._id}></StudentInformation>
                        })}
                      </div>
                      <div>
                        <div onClick={() => this.showAddForm()} className="add-button">+</div>
                      </div>
                    </div>
                  :
                  <div>
                    <CoursesByStudentForm selectedStudent={this.state.selectedStudent} hideAddCoursesForm = {() => this.hideAddCoursesForm()}></CoursesByStudentForm>
                  </div>
                }
              </div>
            </div>
        );
    }
}
