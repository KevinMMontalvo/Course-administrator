import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import PhoneNumberInformation from '../react/PhoneNumberInformation';
import CoursesByStudentInformation from '../react/CoursesByStudentInformation';
import CoursesList from '../react/CoursesList';
import Modal from 'react-responsive-modal';
import { Careers } from '../../lib/collections/collections.js';
import { Students } from '../../lib/collections/collections.js';

export default class StudentInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          age: 0,
          coursesByStudent: [],
          open: false,
          date: new Date(),
          phoneNumbers: [],
        }
    }
    onOpenModal = () => {
      this.setState({ open: true }, () => {
        this.loadCareers();
        document.getElementById('identificationCard').value = this.props.students.identificationCard;
        document.getElementById('name').value = this.props.students.name;
        document.getElementById('lastname').value = this.props.students.lastname;
        document.getElementsByClassName('career-listbox').value = this.props.students.career._id;
        this.setState({
          date: this.props.students.birthDate,
          phoneNumbers: this.props.students.phoneNumbers,
        })
      });
    };
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
    onCloseModal = () => {
      this.setState({ open: false });
    };
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
    showAddCoursesForm(){
      this.props.setSelectedStudent(this.props.students);
      this.props.showAddCoursesForm();
    }
    deleteStudent(){
      this.props.deleteStudent(this.props.students._id);
    }
    componentWillMount(){
      Tracker.autorun(() => {
        this.setState({
          careers: Careers.find().fetch(),
        })
      });
      if(this.props.students.courses[0] != undefined){
        this.setState({
          age: this.getAge(this.props.students.birthDate),
          coursesByStudent: this.props.students.courses,
        });
      }
      else {
        this.setState({
          age: this.getAge(this.props.students.birthDate),
        });
      }
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
    onChange = date => this.setState({ date });
    modifyStudent(){
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
      Students.update(this.props.students._id, {
        $set: student,
      });
      this.setState({ open: false });
      this.props.showNotification("Información modificada");
    }

    render() {
        return(
          <div>
            <div className="">
              <div className="student-column-container">
                <p className="info-title">Información personal</p>
                <div className="student-information-column">
                  <div className="information-row-container">
                    <div className="atribute-container">CEDULA</div>
                    <div className="value-container">{this.props.students.identificationCard}</div>
                  </div>
                  <div className="information-row-container">
                    <div className="atribute-container">NOMBRE</div>
                    <div className="value-container">{this.props.students.name}</div>
                  </div>
                  <div className="information-row-container">
                    <div className="atribute-container">APELLIDO</div>
                    <div className="value-container">{this.props.students.lastname}</div>
                  </div>
                  <div className="information-row-container">
                    <div className="atribute-container">CARRERA</div>
                    <div className="value-container">{this.props.students.career.name}</div>
                  </div>
                  <div className="information-row-container">
                    <div className="atribute-container">FECHA N</div>
                    <div className="value-container"> {this.props.students.birthDate.getDay()}-{this.props.students.birthDate.getMonth()}-{this.props.students.birthDate.getFullYear()}</div>
                  </div>
                  <div className="information-row-container">
                    <div className="atribute-container">EDAD</div>
                    <div className="value-container">{this.state.age}</div>
                  </div>
                </div>
                <p className="info-title">Números de contacto</p>
                <div className="student-phone-numbers-column">
                  {this.props.students.phoneNumbers.map((phoneNumbers) => {
                    return <PhoneNumberInformation phoneNumbers={phoneNumbers}  key={phoneNumbers._id}></PhoneNumberInformation>
                  })}
                </div>
                <p className="info-title">Cursos tomados por el estudiante</p>
                <div className="student-courses-column">
                  <div className="courses-by-student-container">
                    <div className="courses-by-student-information">
                      {this.state.coursesByStudent.map((coursesByStudent) => {
                        return <CoursesList coursesByStudent={coursesByStudent}  key={coursesByStudent._id}></CoursesList>
                      })}
                    </div>
                    <div className="add-course-by-student-container">
                      <div onClick={() => this.showAddCoursesForm()} className="add-course-by-student-button">+</div>
                    </div>
                  </div>
                </div>
                <div className="management-buttons">
                  <div onClick={this.onOpenModal} className="button">MODIFICAR REGISTRO</div>
                  <div onClick={() => this.deleteStudent()} className="button">ELIMINAR REGISTRO</div>
                </div>
              </div>
              <div className="student-separator"></div>
            </div>
            <Modal open={this.state.open} onClose={this.onCloseModal} center>
              <div className="modify-container">
                <div className="management-title">REGISTRAR ALUMNO</div>
                <div className="form-input">
                  <div className="field-container">
                    <div className="field-title">CEDULA</div>
                    <div className="field-input-container">
                      <input id="identificationCard" ref="identificationCard" className="field-input" type="input"></input>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">NOMBRE</div>
                    <div className="field-input-container">
                      <input id="name" ref="name" className="field-input" type="input"></input>
                    </div>
                  </div>
                  <div className="field-container">
                    <div className="field-title">APELLIDO</div>
                    <div className="field-input-container">
                      <input id="lastname" ref="lastname" className="field-input" type="input"></input>
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
                    <div id="modify-number-container" className="phone-numbers-container">
                      <div id="phone-input" className="number-input-container">
                        <input id="phone-ref" ref="phone" className="field-input" type="input"></input>
                      </div>
                      <div onClick={() => this.addNewPhoneNumber()} className="add-phone-button">+</div>
                      <div className="phone-numbers-list">
                        {this.state.phoneNumbers.map((phoneNumbers) => {
                          return <PhoneNumberInformation phoneNumbers={phoneNumbers}  key={phoneNumbers._id}></PhoneNumberInformation>
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="register-button-container">
                    <div onClick={() => this.modifyStudent()} className="register-button">MODIFICAR</div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        );
    }
}
