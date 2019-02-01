import React, { Component } from 'react';
import ButterToast from 'butter-toast';

import CoursesByStudentInformation from '../react/CoursesByStudentInformation';

import { Courses } from '../../lib/collections/collections.js';
import { Departments } from '../../lib/collections/collections.js';

export default class CoursesByStudentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          departments: undefined,
          courses: [],
        }
    }
    showNotification(message) {
      ButterToast.raise({
        content: ({toastId, dismiss}) => (
          <div className= "notificationContainer">
            <div className="notificationIconContainer"></div>
            <div className="notificationTextContainer">
              {message}
            </div>
          </div>
        ),
        toastTimeout: 5000
      })
    }
    loadDepartments() {
      let listbox = document.getElementById("department-listbox");
      let max = listbox.length;
      for (var i=0; i < max; i++){
         listbox.remove(0);
      }
      let departmentsArray = this.state.departments;
      document.getElementById("department-listbox").innerHTML += "<option disabled selected hidden value=''>"+"Departamento"+"</option>";
      for(var i in departmentsArray) {
        document.getElementById("department-listbox").innerHTML += "<option value='"+departmentsArray[i]._id+"'>"+departmentsArray[i].name+"</option>";
      }
    }
    goBack() {
      this.props.hideAddCoursesForm();
    }
    registerCourse() {
      let number = this.refs.number.value.trim();
      let name = this.refs.name.value.trim();
      let course = {
        number: number,
        name: name,
      }
      Courses.insert(course);
    }
    loadCoursesByDepartment() {
      let departmentId = document.getElementById('department-listbox').value;
      Tracker.autorun(() => {
        this.setState({
          courses: Courses.find({ "department._id": departmentId }).fetch(),
        });
      });
    }
    componentWillMount(){
      Tracker.autorun(() => {
        this.setState({
          departments: Departments.find().fetch(),
        }, () => this.loadDepartments())
      });
    }
    render() {
        return(
            <div>
              <div className="form-container">
                <div className="management-title">AGREGAR CURSOS POR ESTUDIANTE</div>
                <div id="student-name" className="info-title">NOMBRE: {this.props.selectedStudent.name}</div>
                <div className="form-input">
                  <div className="field-container">
                    <div className="field-title">CURSOS TOMADOS POR EL ESTUDIANTE</div>
                    <div className="courses-taken-by-the-student">
                      { this.props.selectedStudent.courses != undefined
                        ?
                          this.props.selectedStudent.courses.map((courses) => {
                            return <CoursesByStudentInformation updateCourses={ () => this.updateCourses() } student={this.props.selectedStudent} add={false} courses={courses}  key={courses._id}></CoursesByStudentInformation>
                          })
                        :
                        undefined
                      }
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">ASIGNAR CURSO</div>
                    <div className="field-input-container">
                      <select onChange={() => this.loadCoursesByDepartment()} id="department-listbox" className="listbox"></select>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="courses-taken-by-the-student">
                      {this.state.courses.map((courses) => {
                        return <CoursesByStudentInformation showNotification={this.showNotification.bind(this)} updateCourses={ () => this.updateCourses() } student={this.props.selectedStudent} add={true} courses={courses}  key={courses._id}></CoursesByStudentInformation>
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => this.goBack()} className="return-button">←</div>
              <div>
                <ButterToast trayPosition="top-right"/>
              </div>
            </div>
        );
    }
}
