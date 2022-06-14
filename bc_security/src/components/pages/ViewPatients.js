import React, { useEffect, useState } from 'react'; //useEffect,
import { ethers } from 'ethers';
import axios from 'axios';
import Web3 from 'web3/dist/web3.min';
import { abi } from '../../abitwo.js';
import { settings } from '../../settings';
import Loading from 'react-loading';
import { Container } from 'react-bootstrap';
import PatientCard from './components/PatientCard.js';
const contractAddr = settings;

function ViewPatients() {
  const [myAddr, setMyAddr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showList, setShowList] = useState(false);
  const [myPats, setMyPats] = useState('');
  const [patientList, setPatients] = useState([]);
  const [patientListDec, setPatientsDec] = useState([]);
  const [showAddVisitForm, setAddVisitForm] = useState([]);
  const [loading, setLoading] = useState(false);
  // const verifyMessage = async (data, signature, address) => {
  //     try {
  //       const signerAddress = await ethers.utils.verifyMessage(data, signature);
  //       return signerAddress === address;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    async function getAcc() {
      if (!window.ethereum) {
        console.log('INSTALL ETHEREUM');
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setMyAddr(accounts[0]);
    }
    getAcc();

    console.log('address: ' + myAddr);
  }, [myAddr]);

  const onLogin = async () => {
    setLoading(true);
    const w3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    const contractman = new w3.eth.Contract(abi, contractAddr);
    const num_patients = await contractman.methods.patientCount().call(); // FOR READING
    console.log(num_patients);
    console.log(myAddr);

    const myPatties = await contractman.methods.getMyPatients(myAddr).call();
    setMyPats(myPatties);
    console.log('myPats: ' + myPats);
    console.log('number of patients: ' + num_patients);
    for (let i = 1; i <= myPats.length; i = i + 1) {
      const patient = await contractman.methods
        .getPatientById(myPats[i - 1])
        .call();
      console.log(patient);
      if (!patientList.includes(patient)) {
        await setPatients((oldarray) => [...oldarray, patient]);
      }
    }

    console.log('patList length: ' + patientList.length);
    //DECRYPT
    const json = {
      enc_data: patientList,
    };
    const pack = JSON.stringify(json);
    console.log('pack: ' + pack);

    const decrypt = await axios
      .post('http://localhost:5002/api/utils/decrypt-many', {
        user: username,
        password: password,
        data: pack,
      })
      .then((response) => {
        return response.data.decrypted;
      });
    // console.log("decrypted data:"+ JSON.parse(decrypt[0]).age)
    const lis = [];
    const lis2 = [];
    for (let i = 1; i <= myPats.length; i = i + 1) {
      // if(!patientListDec.includes({data: decrypt[i-1], patid: myPats[i-1]})){
      // console.log("i:"+i)
      // console.log(JSON.parse(decrypt[i-1]))
      // console.log(myPats[i-1])

      if (
        !lis.includes({
          data: JSON.parse(decrypt[i - 1]),
          patid: myPats[i - 1],
        })
      ) {
        lis.push({ data: JSON.parse(decrypt[i - 1]), patid: myPats[i - 1] });
        lis2.push(false);
      } else {
        console.log('else:' + JSON.parse(decrypt[i - 1]) + myPats[i - 1]);
      }
    }

    setPatientsDec(lis);
    setAddVisitForm(lis2);
    // setPatientsDec(decrypt)
    console.log('patient list Decrypted: ' + patientListDec);
    //SHOW Patients

    setLoading(false);
    setShowList(true);
  };
  return (
    <Container fluid>
      <h1> View Patients</h1>
      <form>
        <div className='mb-3'>
          <label className='form-label'>Hospital ID:</label>
          <input
            className='form-control'
            name='hospitalid'
            value={username}
            onChange={(value) => setUsername(value.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Hospital password:</label>
          <input
            className='form-control'
            name='password'
            value={password}
            onChange={(value) => setPassword(value.target.value)}
          />
        </div>
      </form>
      <button type='button' onClick={onLogin} className='btn btn-primary'>
        Login
      </button>
      <hr className='solid' />

      {loading && (
        <Loading
          type={'spinningBubbles'}
          color='#888'
          height={'10%'}
          width={'10%'}
        />
      )}

      {showList &&
        patientListDec.map((patient, key) => {
          return (
            <div key={patient.patid}>
              <PatientCard
                patient={patient.data}
                patid={patient.patid}
                key={key}
              />
              {/* <button type="button" onClick={verifyMessage} className="btn btn-primary">
                Verify
                </button> */}
            </div>
          );
        })}
      {/* <div style ={{display: "grid", gridTemplateColumns: "1fr 4fr 1fr", alignItems:"center", marginBottom: "50px"}}>
            {(pageNum>1)? (<Button style = {{justifySelf: "end", borderRadius:"4px", margin:0}} onClick={()=> setPageNum(pageNum-1)}>{"<< Prev"}</Button>):(<Button style = {{justifySelf: "end", borderRadius:"4px", margin:0 , backgroundColor: "#666"}} >{"<< Prev"}</Button>)}
            <strong style={{justifySelf: "center"}} >{"Page #" + pageNum}</strong>
            {(pageNum<(countryList.length/10))?(<Button style = {{justifySelf: "start", borderRadius:"4px"}} onClick={()=> setPageNum(pageNum+1)}>{"Next >>"}</Button>):(<Button style = {{justifySelf: "start", borderRadius:"4px" , backgroundColor: "#666"}}>{"Next >>"}</Button>)}
            </div> */}
    </Container>
  );
}

export default ViewPatients;
