import React, { Component } from 'react';

export default class CoursesByStudentInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
    }
    render() {
        return(
          <div>
            <div className="course-list-container">
              <div className="course-list-name">{this.props.teachersByCourse.name} {this.props.teachersByCourse.lastname}</div>
            </div>
          </div>
        );
    }
}
