import React, { Component } from 'react';
import ButterToast from 'butter-toast';

import { Courses } from '../../lib/collections/collections.js';
import { Departments } from '../../lib/collections/collections.js';

export default class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          departments: undefined,
        }
    }
    goBack() {
      this.props.hideAddForm();
    }
    registerCourse() {
      let number = this.refs.number.value.trim();
      let name = this.refs.name.value.trim();
      let departmentId = document.getElementById('department-listbox').value;
      let department = undefined;
      for (var i = 0; i < this.state.departments.length; i++) {
        if(departmentId == this.state.departments[i]._id){
          department = this.state.departments[i];
          break;
        }
      }
      let course = {
        number: number,
        name: name,
        department: department,
        teachers: [],
      }
      if(Courses.insert(course)){
        this.showNotification("Curso registrado");
        this.clearInputs();
      }
    }
    loadDepartments() {
      let listbox = document.getElementById("department-listbox");
      let max = listbox.length;
      for (var i = 0; i < max; i++){
         listbox.remove(0);
      }
      let departmentsArray = this.state.departments;
      document.getElementById("department-listbox").innerHTML += "<option disabled selected hidden value=''>"+"Departamento"+"</option>";
      for(var i in departmentsArray) {
        document.getElementById("department-listbox").innerHTML += "<option value='"+departmentsArray[i]._id+"'>"+departmentsArray[i].name+"</option>";
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
    clearInputs() {
      this.refs.number.value = "";
      this.refs.name.value = "";
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
                <div className="management-title">REGISTRAR CURSO</div>
                <div className="form-input">
                  <div className="field-container">
                    <div className="field-title">NUMERO</div>
                    <div className="field-input-container">
                      <input ref="number" className="field-input" type="input"></input>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">NOMBRE</div>
                    <div className="field-input-container">
                      <input ref="name" className="field-input" type="input"></input>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">DEPARTAMENTO</div>
                    <div className="field-input-container">
                      <select id="department-listbox" className="listbox"></select>
                    </div>
                  </div>
                  <div className="register-button-container">
                    <div onClick={() => this.registerCourse()} className="register-button">REGISTRAR</div>
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
