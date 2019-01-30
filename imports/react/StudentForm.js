import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import ButterToast from 'butter-toast';

import PhoneNumberInformation from '../react/PhoneNumberInformation';

import { Students } from '../../lib/collections/collections.js';
import { Careers } from '../../lib/collections/collections.js';

export default class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          phoneNumbers: [],
          date: new Date(),
        }
    }
    onChange = date => this.setState({ date });
    goBack() {
      this.props.hideAddForm();
    }
    addNewPhoneNumber(){
      let newPhone = {
        number: this.refs.phone.value.trim(),
        _id: this.state.phoneNumbers.length,
      }
      var phoneNumbers = this.state.phoneNumbers;
      phoneNumbers.push(newPhone);
      this.setState({
        phoneNumbers: phoneNumbers
      });
      this.refs.phone.value = "";
    }
    getAge(birthDate) {
      var now = new Date();
      function isLeap(year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
      }
      var days = Math.floor((now.getTime() - birthDate.getTime())/1000/60/60/24);
      var age = 0;
      for (var y = birthDate.getFullYear(); y <= now.getFullYear(); y++){
        var daysInYear = isLeap(y) ? 366 : 365;
        if (days >= daysInYear){
          days -= daysInYear;
          age++;
        }
      }
      return age;
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
      this.refs.phone.value = "";
      this.refs.lastname.value = "";
      this.setState({
        phoneNumbers: [],
        date: new Date(),
      })
    }
    registerStudent() {
      let identificationCard = this.refs.identificationCard.value.trim();
      let name = this.refs.name.value.trim();
      let lastname = this.refs.lastname.value.trim();
      let birthDate = this.state.date;
      let phoneNumbers = this.state.phoneNumbers;
      let careerId = document.getElementById('career-listbox').value;
      let career = undefined;
      for (var i = 0; i < this.state.careers.length; i++) {
        if(careerId == this.state.careers[i]._id){
          career = this.state.careers[i];
          break;
        }
      }
      let student = {
        identificationCard: identificationCard,
        name: name,
        lastname: lastname,
        career: career,
        birthDate: birthDate,
        phoneNumbers: phoneNumbers,
        courses: [],

      }
      if(Students.insert(student)){
        this.showNotification("Estudiante registrado");
        this.clearInputs();
      }
    }
    loadCareers() {
      let listbox = document.getElementById("career-listbox");
      let max = listbox.length;
      for (var i=0; i < max; i++){
         listbox.remove(0);
      }
      let rolesArray = this.state.careers;
      document.getElementById("career-listbox").innerHTML += "<option disabled selected hidden value=''>"+"Carrera"+"</option>";
        for(var i in rolesArray){
          document.getElementById("career-listbox").innerHTML += "<option value='"+rolesArray[i]._id+"'>"+rolesArray[i].name+"</option>";
        }
    }
    componentWillMount(){
      Tracker.autorun(() => {
        this.setState({
          careers: Careers.find().fetch(),
        }, () => this.loadCareers())
      });
    }
    render() {
        return(
            <div>
              <div className="form-container">
                <div className="management-title">REGISTRAR ALUMNO</div>
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
                    <div className="field-title">CARRERA</div>
                    <div className="field-input-container">
                      <select id="career-listbox" className="listbox"></select>
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
                  <div className="field-container">
                    <div className="field-title">NUMEROS DE TELEFONO</div>
                    <div className="phone-numbers-container">
                      <div onClick={() => this.addNewPhoneNumber()} className="add-phone-button">+</div>
                      <div className="phone-numbers-list">
                        {this.state.phoneNumbers.map((phoneNumbers) => {
                          return <PhoneNumberInformation phoneNumbers={phoneNumbers}  key={phoneNumbers._id}></PhoneNumberInformation>
                        })}
                      </div>
                      <div className="number-input-container">
                        <input ref="phone" className="field-input" type="input"></input>
                      </div>
                    </div>
                  </div>
                  <div className="register-button-container">
                    <div onClick={() => this.registerStudent()} className="register-button">REGISTRAR</div>
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
