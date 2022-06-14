import React from 'react';
import {Card} from 'react-bootstrap';
const PatientCard = ({patient}) => {
  let style1 = {
    background:"linear-gradient(#267dfd, transparent),linear-gradient(to top left, #333, transparent),linear-gradient(to top right, blue, transparent)",
    backgroundColor:"#267dfd" ,
    color: "white" ,
    borderRadius: 10, 
    boxShadow: "5px 10px 5px #9E9E9E",
    border:0,
    height: 230,
    paddingTop: 15,
};

  const addVis = async () => {
    
  }
  const verify = async() =>{
    
  }
  return (
  <div style = {{display:"grid"}} >
  <Card style = {style1}>
    <Card.Body >
    <Card.Title style ={{fontSize: 30, textDecoration:"underline"}}>{patient.name}</Card.Title>
    <Card.Text>
    <div style ={{display: "grid" , gridTemplateColumns: "2fr 2fr", alignItems:"center", marginBottom: "50px"}}>
      <div>
        Age: {patient.age} <br></br>
        Gender: {patient.gender}<br></br>
        Blood Type: {patient.blood}<br></br>
        Weight: {patient.weight}<br></br>
        Blood Oxygen: {patient.oxygen}
      </div>
      <div style = {{"display":"flex", "justifyContent": "flex-end"}}>
      <button type="button" onClick={addVis} className="btn btn-light"> Add Visit
      </button>
      <button type="button"  onClick={verify} className="btn btn-light"> Verify Record
      </button>
      </div>
    </div>
    </Card.Text>
    </Card.Body>
  </Card>
 </div>
        )
};

export default PatientCard;
