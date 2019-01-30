import React, { Component } from 'react';

import TeachersList from '../react/TeachersList';

export default class CourseInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teachersByCourse: [],
        }
    }
    showAddTeachersForm(){
      this.props.setSelectedCourse(this.props.courses);
      this.props.showAddTeachersForm();
    }
    componentWillMount(){
      if(this.props.courses.teachers[0] != undefined){
        this.setState({
          teachersByCourse: this.props.courses.teachers,
        });
      }
      else {
        this.setState({

        });
      }
    }
    render() {
        return(
          <div>
            <div className="course-column-container">
              <div className="course-information-column">
                <div className="information-row-container">
                  <div className="atribute-container">NUMERO</div>
                  <div className="value-container">{this.props.courses.number}</div>
                </div>
                <div className="information-row-container">
                  <div className="atribute-container">NOMBRE</div>
                  <div className="value-container">{this.props.courses.name}</div>
                </div>
                <div className="information-row-container">
                  <div className="atribute-container">DEPARTAMENTO</div>
                  <div className="value-container">{this.props.courses.department.name}</div>
                </div>
              </div>
              <div className="course-teachers-information-column">
                <div className="course-teachers-list-container">
                  {this.state.teachersByCourse.map((teachersByCourse) => {
                    return <TeachersList teachersByCourse={teachersByCourse}  key={teachersByCourse._id}></TeachersList>
                  })}
                </div>
                <div className="add-teacher-by-course-container">
                  <div onClick={() => this.showAddTeachersForm()} className="add-course-by-student-button">+</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
