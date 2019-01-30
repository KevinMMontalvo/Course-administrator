import React, { Component } from 'react';

import { Courses } from '../../lib/collections/collections.js';

export default class TeachersByCourseInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
      console.log(this.props.course);
    }

    assingTeacher(){
      let teachers = this.props.course.teachers;
      let isRepeated = false;
      for (var i = 0; i < teachers.length; i++) {
        if(teachers[i]._id == this.props.teachers._id){
          isRepeated = true;
          this.props.showNotification("El profesor ya fue sido asignado");
          break;
        }
      }
      if(!isRepeated) {
        teachers.push(this.props.teachers);
        Courses.update({ _id: this.props.course._id }, { $set: { teachers: teachers }});
        this.props.showNotification("Profesor asignado");
      }
    }
    render() {
        return(
          <div>
            <div className="course-by-student-row">
              <div className="course-by-student-number">{this.props.teachers.name} {this.props.teachers.lastname}</div>
              {
                this.props.add ?
                  <div onClick={() => this.assingTeacher()} className="assign-course-by-student-button">+</div>
                :
                <div></div>
              }
            </div>
          </div>
        );
    }
}
