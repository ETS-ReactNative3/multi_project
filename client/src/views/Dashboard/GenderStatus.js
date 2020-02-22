import React,{useEffect, useState} from 'react';
import {
    Card,
    Col,
    Progress
} from 'reactstrap';

  
const GenderStatus = (props)=>{

    return(
        
        <Col xs="12" sm="12" lg="12">
              <Card>       
              <ul style={{paddingTop:'28px'}}>
                        <div className="progress-group" style={{paddingLeft:'22px'}}>
                          <div className="progress-group-header">
                            <i className="icon-user progress-group-icon"></i>
                            <span className="title">مردان</span>
                            <span className="ml-auto font-weight-bold">43%</span>
                          </div>
                          <div className="progress-group-bars">
                            <Progress className="progress-xs" color="warning" value="43" />
                          </div>
                        </div>
                        <div className="progress-group mb-5" style={{paddingLeft:'22px'}}>
                          <div className="progress-group-header">
                            <i className="icon-user-female progress-group-icon"></i>
                            <span className="title">زنان</span>
                            <span className="ml-auto font-weight-bold">37%</span>
                          </div>
                          <div className="progress-group-bars">
                            <Progress className="progress-xs" color="warning" value="37" />
                          </div>
                        </div>

              </ul>
            </Card>
          </Col>
    )
}
export default React.memo(GenderStatus)