import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import ButterToast from 'butter-toast';

import { Teachers } from '../../lib/collections/collections.js';
import { Departments } from '../../lib/collections/collections.js';
import { Roles } from '../../lib/collections/collections.js';

export default class TeacherForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          date: new Date(),
          departments: undefined,
          roles: undefined,
        }
    }
    onChange = date => this.setState({ date });
    goBack() {
      this.props.hideAddForm();
    }
    registerTeacher() {
      let identificationCard = this.refs.identificationCard.value.trim();
      let name = this.refs.name.value.trim();
      let lastname = this.refs.lastname.value.trim();
      let roleId = document.getElementById('role-listbox').value;
      let role = undefined;
      for (var i = 0; i < this.state.roles.length; i++) {
        if(roleId == this.state.roles[i]._id){
          role = this.state.roles[i];
          break;
        }
      }
      let departmentId = document.getElementById('department-listbox').value;
      let department = undefined;
      for (var i = 0; i < this.state.departments.length; i++) {
        if(departmentId == this.state.departments[i]._id){
          department = this.state.departments[i];
          break;
        }
      }
      let birthDate = this.state.date;
      let teacher = {
        identificationCard: identificationCard,
        name: name,
        lastname: lastname,
        birthDate: birthDate,
        role: role,
        department: department,
      }
      if(Teachers.insert(teacher)){
        this.showNotification("Profesor registrado");
        this.clearInputs();
      }
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
      this.loadRoles();
    }
    loadRoles() {
      let listbox = document.getElementById("role-listbox");
      let max = listbox.length;
      for (var i=0; i < max; i++){
         listbox.remove(0);
      }
      let rolesArray = this.state.roles;
      document.getElementById("role-listbox").innerHTML += "<option disabled selected hidden value=''>"+"Cargo"+"</option>";
        for(var i in rolesArray){
          document.getElementById("role-listbox").innerHTML += "<option value='"+rolesArray[i]._id+"'>"+rolesArray[i].name+"</option>";
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
      this.refs.identificationCard.value = "";
      this.refs.name.value = "";
      this.refs.lastname.value = "";
      this.setState({
        date: new Date(),
      });
    }
    componentWillMount(){
      Tracker.autorun(() => {
        this.setState({
          roles: Roles.find().fetch(),
          departments: Departments.find().fetch(),
        }, () => this.loadDepartments())
      });
    }
    render() {
        return(
            <div>
              <div className="form-container">
                <div className="management-title">REGISTRAR PROFESOR</div>
                <div className="form-input">
                  <div className="field-container">
                    <div className="field-title">CEDULA</div>
                    <div className="field-input-container">
                      <input ref="identificationCard" className="field-input" type="input"></input>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">NOMBRE</div>
                    <div className="field-input-container">
                      <input ref="name" className="field-input" type="input"></input>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">APELLIDO</div>
                    <div className="field-input-container">
                      <input ref="lastname" className="field-input" type="input"></input>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">CARGO</div>
                    <div className="field-input-container">
                      <select id="role-listbox" className="listbox"></select>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">DEPARTAMENTO</div>
                    <div className="field-input-container">
                      <select id="department-listbox" className="listbox"></select>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">FECHA DE NACIEMIENTO</div>
                    <div className="field-input-container">
                      <DatePicker
                        onChange={this.onChange}
                        value={this.state.date}
                      />
                    </div>
                  </div>
                  <div className="register-button-container">
                    <div onClick={() => this.registerTeacher()} className="register-button">REGISTRAR</div>
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
