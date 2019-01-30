import React, { Component } from 'react';
import ButterToast from 'butter-toast';

import { Careers } from '../../lib/collections/collections.js';
import { Students } from '../../lib/collections/collections.js';
import { Teachers } from '../../lib/collections/collections.js';
import { Roles } from '../../lib/collections/collections.js';
import SearchResult from '../react/SearchResult';

export default class Search extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showSearchMenu: true,
      showResult: false,
      searchStudents: false,
      searchCarrers: false,
      searchTeacherByName: false,
      searchTeacherByRole: false,
      students: [],
      careers:[],
      searchResult: null,
      roles: undefined,
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
  searchStudentsByRange(){
    let max = document.getElementById('max').value;
    let min = document.getElementById('min').value;
    let ltDate=new Date();
    let gtDate=new Date();
    ltDate.setFullYear(ltDate.getFullYear()-min);
    gtDate.setFullYear(gtDate.getFullYear()-max);
    this.setState({
      showSearchMenu: false,
      showResult: true,
      searchStudents: false,
      searchCarrers: false,
      searchTeacherByName: false,
      searchTeacherByRole: false,
      searchResult: Students.find({
          birthDate: {
              $lt: ltDate,
              $gt: gtDate
          }
      }).fetch(),
      search: 1
    });
  }
  searchCareers(ltDate){
      let studentList=Students.find({
      birthDate: {
              $lt: ltDate
          }
    }).fetch();

    let careerList=new Array();
    for (var i = 0; i < studentList.length; i++) {
      careerList[i]=studentList[i].career;
    }

    careerList.sort(function (a, b){
  	if ( a.name < b.name )
    	return -1;
      if ( a.name > b.name )
        return 1;
      return 0;
  });

  if(careerList.length>0){
    let lastCareer=careerList[0].name;
    for (var i = 1; i < careerList.length; i++) {
      if(lastCareer==careerList[i].name){
        careerList.splice(i,1);
      }else{
        lastCareer=careerList[i].name;
      }
    }
  }
return careerList;

  }
    searchCarrersByAge(){
      let studentAge = document.getElementById('age').value;
      let ltDate=new Date();
      ltDate.setFullYear(ltDate.getFullYear()-studentAge);

      let careers=this.searchCareers(ltDate);
console.log(careers);
      this.setState({
        showSearchMenu: false,
        showResult: true,
        searchStudents: false,
        searchCarrers: false,
        searchTeacherByName: true,
        searchTeacherByRole: false,
        searchResult: careers,
        search: 2
      });
    }

  searchTeacherByNameOrLastName(){
    let searchedName = document.getElementById('searchedName').value;
    this.setState({
      showSearchMenu: false,
      showResult: true,
      searchStudents: false,
      searchCarrers: false,
      searchTeacherByName: true,
      searchTeacherByRole: false,
      searchResult: Teachers.find({
          $or: [{ name: searchedName },{ lastname: searchedName }]
      }).fetch(),
      search: 3
    });
  }
  searchTeachersByRole(){
    let searchedRoleId = document.getElementById('role-listbox').value;
    let roleObj = undefined;
    for (var i = 0; i < this.state.roles.length; i++) {
      if(searchedRoleId == this.state.roles[i]._id){
        roleObj = this.state.roles[i];
        break;
      }
    }
    this.setState({
      showSearchMenu: false,
      showResult: true,
      searchStudents: false,
      searchCarrers: false,
      searchTeacherByName: false,
      searchTeacherByRole: true,
      searchResult: Teachers.find({
        role:roleObj
      }).fetch(),
      search: 4
    });
  }
  returnToSearchMenu(){
    this.setState({
      showSearchMenu: true,
      showResult: false,
      searchStudents: false,
      searchCarrers: false,
      searchTeacherByName: false,
      searchTeacherByRole: false,
    });
  }
  modifyStudent(){
    let phoneNumbersArray = [];

    let newPhone = {
      number: document.getElementById('newPhone').value,
      _id: 0,
    }

    let student = Students.find({name: document.getElementById('studentName').value}).fetch();
    student = student[0]._id;
    phoneNumbersArray.push(newPhone);
    console.log(phoneNumbersArray);
    Students.update({
      _id: student
    }, {$set:
        {phoneNumbers: phoneNumbersArray}
      }, {"multi": false}
    );
    this.showNotification("Telefonos modificado");
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
  componentWillMount(){
    Tracker.autorun(() => {
      this.setState({
        careers: Careers.find().fetch(),
        roles:Roles.find().fetch(),
      }, () => this.loadRoles())
    });
  }
  render() {
    return(
      <div>
        {this.state.showSearchMenu
          ?
            <div className="search-menu">
              <div className="search-option-container">
                <div className="search-option">
                  <div className="search-title">BUSCAR ALUMNOS POR RANGO DE EDAD</div>
                  <div className="search-input">
                    <p className="search-input-text">EDAD MINIMA: </p> <input id="min" className="search-input-range" type="text" refs="min"></input>
                    <p className="search-input-text">EDAD MAXIMA: </p> <input id="max" className="search-input-range" type="text" refs="max"></input>
                  </div>
                  <div onClick={() => this.searchStudentsByRange()} className="search-button"></div>
                </div>
                <div className="search-option">
                  <div className="search-title">CARRERAS SEGUN LA EDAD DEL ALUMNO</div>
                  <div className="search-input">
                    <p className="search-input-text">MAYORES A: </p> <input id="age" className="search-input-range" type="text"></input>
                  </div>
                  <div onClick={() => this.searchCarrersByAge()} className="search-button"></div>
                </div>
                <div className="search-option">
                  <div className="search-title">BUSCAR PROFESORES POR NOMBRE/APELLIDO</div>
                  <div className="search-input">
                    <p className="search-input-text">NOMBRE/APELLIDO: </p> <input id="searchedName" className="search-input-name" type="text"></input>
                  </div>
                  <div onClick={() => this.searchTeacherByNameOrLastName()} className="search-button"></div>
                </div>
                <div className="search-option">
                  <div className="search-title">BUSCAR PROFESORES POR CARGO</div>
                  <div className="search-input">
                    <select id="role-listbox" className="listbox"></select>
                  </div>
                  <div onClick={() => this.searchTeachersByRole()} className="search-button"></div>
                </div>
                <div className="search-option">
                  <div className="search-title">MODIFICAR TELEFONOS</div>
                  <div className="search-input">
                    <p className="search-input-text">TELEFONO: </p> <input id="newPhone" className="search-input-name" type="text"></input>
                    <p className="search-input-text">NOMBRE: </p> <input id="studentName" className="search-input-name" type="text"></input>
                  </div>
                  <div onClick={() => this.modifyStudent()} id="modify" className="search-button"></div>
                </div>
              </div>
              <div>
                <ButterToast trayPosition="top-right"/>
              </div>
            </div>
          :
          undefined
        }
        {this.state.showResult
          ?
            <div>
              <div className="search-result-container">
                <SearchResult search={this.state.search} searchResult={this.state.searchResult}></SearchResult>
              </div>
              <div onClick={() => this.returnToSearchMenu()} className="return-button">←</div>
            </div>
          :
          undefined
        }
      </div>
    )
  }
}
