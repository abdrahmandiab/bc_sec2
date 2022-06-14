import React from 'react';
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap';
import { ethers } from "ethers";
const VisitCard = ({visit ,visid}) => {
  let style1 = {
    background:"linear-gradient(#267dfd, transparent),linear-gradient(to top left, #333, transparent),linear-gradient(to top right, blue, transparent)",
    backgroundColor:"#267dfd" ,
    color: "white" ,
    borderRadius: 10, 
    boxShadow: "5px 10px 5px #9E9E9E",
    border:0,
    height: 250,
    paddingTop: 15,
};

  
  return (
  <div style = {{display:"grid"}} >
  <Card style = {style1}>
    <Card.Body >
    <Card.Title style ={{fontSize: 30, textDecoration:"underline"}}>{visit.visid}</Card.Title>
    <Card.Text>
    <div style ={{display: "grid" , gridTemplateColumns: "2fr 2fr", alignItems:"center", marginBottom: "50px"}}>
      <div>
        Reason: {visit.visitReason} <br></br>
        Diagnosis: {visit.drDiagnosis}<br></br>
        Perscription: {visit.perscription}<br></br>
        Referals: {visit.referals}<br></br>
        Glucose: {visit.glucose}<br></br>
        Weight: {visit.weight}<br></br>
        Blood Pressure: {visit.bloodPressure}<br></br>
        Blood Oxygen: {visit.oxygen}
      </div>
      <div style = {{"display":"flex", "justifyContent": "flex-end"}}>
      {/* <button type="button" onClick={() => clicker(patid)} className="btn btn-light"> Add Visit
      </button> 
         <>
        <Link to={{
          pathname: '/add-visits',
          state: patid
        }} >Add Visit</Link>
        </> 
       <button type="button"  onClick={verify} className="btn btn-light"> Verify Record
      </button> */}
      </div>
    </div>
    </Card.Text>
    </Card.Body>
  </Card>
 </div>
        )
};

export default VisitCard;
