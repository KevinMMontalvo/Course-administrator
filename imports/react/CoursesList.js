import React, { Component } from 'react';

export default class CoursesList extends React.Component {
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
              <div className="course-list-name">{this.props.coursesByStudent.name} - {this.props.coursesByStudent.number}</div>
            </div>
          </div>
        );
    }
}
