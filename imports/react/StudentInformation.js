import React, { Component } from 'react';

import PhoneNumberInformation from '../react/PhoneNumberInformation';
import CoursesByStudentInformation from '../react/CoursesByStudentInformation';
import CoursesList from '../react/CoursesList';

export default class StudentInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          age: 0,
          coursesByStudent: [],
        }
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
    showAddCoursesForm(){
      this.props.setSelectedStudent(this.props.students);
      this.props.showAddCoursesForm();
    }
    componentWillMount(){
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
    render() {
        return(
          <div>
            <div className="student-column-container">
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
              <div className="student-phone-numbers-column">
                {this.props.students.phoneNumbers.map((phoneNumbers) => {
                  return <PhoneNumberInformation phoneNumbers={phoneNumbers}  key={phoneNumbers._id}></PhoneNumberInformation>
                })}
              </div>
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
            </div>
          </div>
        );
    }
}
