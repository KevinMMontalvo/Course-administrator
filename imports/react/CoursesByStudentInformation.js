import React, { Component } from 'react';

import { Students } from '../../lib/collections/collections.js';

export default class CoursesByStudentInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount(){

    }

    assingCourse(){
      let courses = this.props.student.courses;
      let isRepeated = false;
      for (var i = 0; i < courses.length; i++) {
        if(courses[i]._id == this.props.courses._id){
          isRepeated = true;
          this.props.showNotification("El curso ya fue sido asignado");
          break;
        }
      }
      if(!isRepeated) {
        courses.push(this.props.courses);
        Students.update({ _id: this.props.student._id }, { $set: { courses: courses }});
        this.props.showNotification("Curso asignado");
      }
    }
    render() {
        return(
          <div>
            <div className="course-by-student-row">
              <div className="course-by-student-number">{this.props.courses.number} - </div>
              <div className="course-by-student-name">{this.props.courses.name}</div>
              {
                this.props.add ?
                  <div onClick={() => this.assingCourse()} className="assign-course-by-student-button">+</div>
                :
                <div></div>
              }
            </div>
          </div>
        );
    }
}
