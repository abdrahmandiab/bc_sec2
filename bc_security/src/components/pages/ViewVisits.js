import React, { useEffect, useState } from 'react'; //useEffect,
import { ethers } from 'ethers';
import axios from 'axios';
import Web3 from 'web3/dist/web3.min';
import { abi } from '../../abitwo.js';
import { settings } from '../../settings';
import Loading from 'react-loading';
import { Container } from 'react-bootstrap';
import VisitCard from './components/VisitCard.js';
const contractAddr = settings;

function ViewVisits() {
  const [myAddr, setMyAddr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [patid, setPatid] = useState('');
  const [showList, setShowList] = useState(false);
  const [myVisitos, setMyVisitos] = useState('');
  const [visitList, setVisits] = useState([]);
  const [visitListDec, setVisitsDec] = useState([]);
  const [showAddVisitForm, setAddVisitForm] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const num_visits = await contractman.methods.visitCount().call(); // FOR READING
    console.log('numnum: ' + num_visits);
    console.log('addr: ' + myAddr);
    var myVis = [];
    setVisitsDec([]);
    setVisits([]);
    if (patid == '') {
      myVis = await contractman.methods.getMyVisits(myAddr).call();
    } else {
      let id = 0;
      try {
        id = parseInt(patid);
      } catch (err) {
        console.log(err);
      }
      myVis = await contractman.methods.getPatientVisits(myAddr, id).call();
    }
    setMyVisitos(myVis);
    console.log('myVis:' + myVis);
    console.log('myVisitos: ' + myVisitos);
    console.log('number of visits: ' + num_visits);
    for (let i = 1; i <= myVisitos.length; i = i + 1) {
      // console.log(i)
      const visit = await contractman.methods
        .getVisitById(myVisitos[i - 1])
        .call();
      // console.log(visit)
      if (!visitList.includes(visit)) {
        await setVisits((oldarray) => [...oldarray, visit]);
      }
    }

    console.log('visList length: ' + visitList.length);
    //DECRYPT
    const json = {
      enc_data: visitList,
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
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setVisitsDec([]);
        setLoading(false);
        return [];
      });
    // console.log("decrypted data:"+ JSON.parse(decrypt[0]).age)
    const lis = [];
    const lis2 = [];
    if (!decrypt == []) {
      for (let i = 1; i <= decrypt.length; i = i + 1) {
        if (
          !lis.includes({
            data: JSON.parse(decrypt[i - 1]),
            visid: myVisitos[i - 1],
          })
        ) {
          lis.push({
            data: JSON.parse(decrypt[i - 1]),
            visid: myVisitos[i - 1],
          });
          lis2.push(false);
        } else {
          console.log('else:' + JSON.parse(decrypt[i - 1]) + myVisitos[i - 1]);
        }
      }
    } else {
      console.log('ERROR IN DECRYPTION');
    }

    setVisitsDec(lis);
    setAddVisitForm(lis2);
    console.log('visit list Decrypted: ' + visitListDec);

    setLoading(false);
    setShowList(true);
  };
  return (
    <Container fluid>
      <h1> View Visits</h1>
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
        <div className='mb-3'>
          <label className='form-label'>Patient id (optional):</label>
          <input
            className='form-control'
            name='patid'
            value={patid}
            onChange={(value) => setPatid(value.target.value)}
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
        visitListDec.map((visit, key) => {
          return (
            <div key={visit.visid}>
              <VisitCard visit={visit.data} visid={visit.visid} key={key} />
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

export default ViewVisits;
