import React, {  useState } from "react"; //useEffect,
import { ethers } from "ethers";
import axios from "axios";
import Web3 from "web3/dist/web3.min";
import { abi } from "../../abitwo.js";
import { settings } from '../../settings'
import Loading from 'react-loading'
import { Container } from "react-bootstrap";
import PatientCard from "./components/PatientCard.js";
const contractAddr = settings;

function ViewPatients(){
    const verifyMessage = async (data, signature, address) => {
        try {
          const signerAddress = await ethers.utils.verifyMessage(data, signature);
          return signerAddress === address;
        } catch (error) {
          console.log(error);
        }
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showList, setShowList] = useState(false);
    const [patientList, setPatients] = useState([]);
    const [patientListDec, setPatientsDec] = useState([]); 
    const [patient1, setPatient1] = useState("");
    const [showAddVisit, setAddVisit] = useState(false);
    const[loading, setLoading] = useState(false);
    
    const onLogin = async () => {
        setLoading(true)
        const w3 = new Web3(Web3.givenProvider || "http://localhost:7545"); //
        const contractman = new w3.eth.Contract(abi, contractAddr);
        const num_patients = await contractman.methods.patientCount().call(); // FOR READING
        console.log("number of patients: " + num_patients)
        for (let i=1; i<=(num_patients); i=i+1){
            console.log("patList: "+patientList.length)
            const patient = await contractman.methods.getPatientById(i).call();
            console.log(patient)
            if(!patientList.includes(patient)){
            await setPatients(oldarray =>  [...oldarray,patient])}
        }
        // const patient = await contractman.methods.getPatientById(1).call();
        // console.log(patient)
        // setPatient1(patient)
        // console.log("1:"+patient1)
        // setShowList(true)

        console.log("patient list Encrypted: "+ patientList)

        //DECRYPT
        const json = {
            enc_data : patientList
        }
        console.log("json: "+ json.enc_data.length);
        const pack = JSON.stringify(json);
        console.log("pack: "+ pack)

        const decrypt = await axios.post('http://localhost:5000/api/utils/decrypt-many', {
        user: username,
        password: password,
        data: pack 
        }).then((response) =>{return response.data.decrypted})
        // console.log("decrypted data:"+ JSON.parse(decrypt[0]).age)
        setPatientsDec(decrypt)
        console.log("patient list Decrypted: "+ patientListDec)
        //SHOW Patients
        
        setLoading(false)
        setShowList(true)
    }
    return (
        <Container fluid>
            <h1> View Patients</h1>
            <form>
                <div className="mb-3">
                <label className="form-label">Hospital ID:</label>
                <input
                    className="form-control"
                    name="hospitalid"
                    value={username}
                    onChange={(value) => setUsername(value.target.value)}
                />
                </div>
                <div className="mb-3">
                <label className="form-label">Hospital password:</label>
                <input
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(value) => setPassword(value.target.value)}
                />
                </div>
            </form>
            <button type="button" onClick={onLogin} className="btn btn-primary">
              Login
            </button>
            <hr className="solid"/>

            {loading && <Loading type={"spinningBubbles"} color="#888" height={'10%'} width={'10%'} />}
            
            {showList && patientListDec.map((patient,key) => {
            return (
                <div key={patient}>
                <PatientCard patient={JSON.parse(patient)} key={key}/>
                </div>
            )
            }
            )}
            {/* <div style ={{display: "grid", gridTemplateColumns: "1fr 4fr 1fr", alignItems:"center", marginBottom: "50px"}}>
            {(pageNum>1)? (<Button style = {{justifySelf: "end", borderRadius:"4px", margin:0}} onClick={()=> setPageNum(pageNum-1)}>{"<< Prev"}</Button>):(<Button style = {{justifySelf: "end", borderRadius:"4px", margin:0 , backgroundColor: "#666"}} >{"<< Prev"}</Button>)}
            <strong style={{justifySelf: "center"}} >{"Page #" + pageNum}</strong>
            {(pageNum<(countryList.length/10))?(<Button style = {{justifySelf: "start", borderRadius:"4px"}} onClick={()=> setPageNum(pageNum+1)}>{"Next >>"}</Button>):(<Button style = {{justifySelf: "start", borderRadius:"4px" , backgroundColor: "#666"}}>{"Next >>"}</Button>)}
            </div> */}


        </Container>
    )
    

}

export default ViewPatients;