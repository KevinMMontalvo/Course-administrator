import React, { Component } from 'react';

import TeacherForm from '../react/TeacherForm';
import TeacherInformation from '../react/TeacherInformation';

import { Teachers } from '../../lib/collections/collections.js';

export default class TeacherManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showAddForm: false,
          teachers: undefined,
        }
    }
    showAddForm() {
      this.setState({
        showAddForm: true,
      });
    }
    hideAddForm() {
      this.setState({
        showAddForm: false,
      });
    }
    isLoading () {
      if(this.state.teachers != undefined){

      }
    }
    componentWillMount(){
      Tracker.autorun(() => {
        this.setState({
          teachers: Teachers.find().fetch(),
        }, () => this.isLoading())
      });
    }
    render() {
        return(
            <div>
              <div className="management-container">
                {
                  this.state.showAddForm ?
                    <div>
                      <TeacherForm hideAddForm = {() => this.hideAddForm()}></TeacherForm>
                    </div>
                  :
                  <div>
                    <div className="management-title">MAESTROS REGISTRADOS</div>
                    <div className="teacher-management-table">
                      {this.state.teachers.map((teachers) => {
                        return <TeacherInformation teachers={teachers}  key={teachers._id}></TeacherInformation>
                      })}
                    </div>
                  </div>
                }
              </div>
              {
                this.state.showAddForm ?
                  <div></div>
                :
                <div>
                  <div onClick={() => this.showAddForm()} className="add-button">+</div>
                </div>
              }
            </div>
        );
    }
}
