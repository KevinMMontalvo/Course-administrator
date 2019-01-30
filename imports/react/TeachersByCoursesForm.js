import React, { Component } from 'react';
import ButterToast from 'butter-toast';

import TeachersByCourseInformation from '../react/TeachersByCourseInformation';

import { Departments } from '../../lib/collections/collections.js';
import { Teachers } from '../../lib/collections/collections.js';

export default class TeachersByCoursesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          departments: undefined,
          teachers: [],
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
      this.props.hideAddTeachersForm();
    }
    loadTeachersByDepartment() {
      let departmentId = document.getElementById('department-listbox').value;
      Tracker.autorun(() => {
        this.setState({
          teachers: Teachers.find({ "department._id": departmentId }).fetch(),
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
                <div className="management-title">AGREGAR PROFESORES POR CURSO</div>
                <div className="management-title">CURSO: {this.props.selectedCourse.number} - {this.props.selectedCourse.name}</div>
                <div className="form-input">
                  <div className="field-container">
                    <div className="field-title">PROFESORES QUE DICTAN EL CURSO</div>
                    <div className="courses-taken-by-the-student">
                      { this.props.selectedCourse.teachers != undefined
                        ?
                          this.props.selectedCourse.teachers.map((teachers) => {
                            return <TeachersByCourseInformation updateCourses={ () => this.updateCourses() } course={this.props.selectedCourse} add={false} teachers={teachers}  key={teachers._id}></TeachersByCourseInformation>
                          })
                        :
                        undefined
                      }
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">ASIGNAR PROFESOR</div>
                    <div className="field-input-container">
                      <select onChange={() => this.loadTeachersByDepartment()} id="department-listbox" className="listbox"></select>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="courses-taken-by-the-student">
                      {this.state.teachers.map((teachers) => {
                        return <TeachersByCourseInformation showNotification={this.showNotification.bind(this)} updateCourses={ () => this.updateCourses() } course={this.props.selectedCourse} add={true} teachers={teachers}  key={teachers._id}></TeachersByCourseInformation>
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
