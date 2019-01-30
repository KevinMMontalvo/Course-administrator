import React, { Component } from 'react';

import StudentInformation from '../react/StudentInformation';
import CareerList from '../react/CareerList';
import TeacherInformation from '../react/TeacherInformation';

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
      console.log(this.props.searchResult);
    }
    render() {
        return(
          <div>
            <div>
              {this.props.search == 1
                ?
                  <div>
                    {this.props.searchResult.map((searchResult) => {
                      return <StudentInformation  students={searchResult}  key={searchResult._id}></StudentInformation>
                    })}
                  </div>
                :
                undefined
              }
              {this.props.search == 2
                ?
                  <div>
                  {this.props.searchResult.map((searchResult) => {
                    return <CareerList  careers={searchResult}  key={searchResult._id}></CareerList>
                  })}
                  </div>
                :
                undefined
              }

              {this.props.search == 3
                ?
                  <div>
                  {this.props.searchResult.map((searchResult) => {
                    return <TeacherInformation  teachers={searchResult}  key={searchResult._id}></TeacherInformation>
                  })}
                  </div>
                :
                undefined
              }
              {this.props.search == 4
                ?
                  <div>
                  {this.props.searchResult.map((searchResult) => {
                    return (<TeacherInformation  teachers={searchResult}  key={searchResult._id}></TeacherInformation>
                      );
                  })}
                  <div className="student-column-container">
                  <div className="student-information-column">
                  <div className="information-row-container">
                  <div className="atribute-container">TOTAL</div>
                  <div className="student-column-container">{this.props.searchResult.length}</div></div></div></div>
                  </div>

                :
                undefined
              }
            </div>
          </div>
        );
    }
}
