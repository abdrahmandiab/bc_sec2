import React, {Component, useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Web3 from "web3/dist/web3.min";
import { abi } from "../../abitwo.js";
import { settings } from '../../settings'

const contractAddr = settings;
// const metamaskAddr = "0xc2983aBAb0FFCFBe35a449bf9448b51B9d2c5035";


function AddPatient() {
  // Patient data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [blood, setBlood] = useState("");
  const [weight, setWeight] = useState("");
  const [oxygen, setOxygen] = useState("");



  const signData = async (data) => {
    try {
      if (!window.ethereum) return alert("INSTALL ETHEREUM");
      const accounts = await window.ethereum.send("eth_requestAccounts");
      console.log("ACCOUNTS");
      console.log(accounts);
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(data.toString());
      const address = await signer.getAddress();
      // console.log("Signature: "+ signature);
      // console.log("Address: " + address);
      return [signature,address];
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    const json = {
      name: name,
      age: age,
      gender: gender,
      blood:blood,
      weight:weight,
      oxygen:oxygen
    };

    const pack = JSON.stringify(json);
    var encrypted=  await axios.post('http://localhost:5000/api/utils/encrypt', {
      user: username,
      password: password,
      data: pack // This is the body part
    }).then((response) =>{return response.data.encrypted})
    const zz = await signData(encrypted)
    const signed = zz[0]
    const address = zz[1]

    const w3 = new Web3(Web3.givenProvider || "http://localhost:7545"); //
    const contractman = new w3.eth.Contract(abi, contractAddr);
    const num_patients = await contractman.methods.patientCount().call(); // FOR READING
    // console.log("encrypted data: " + encrypted.toString());
    // console.log("signed data: " + signed);
    await contractman.methods.addPatient(address,encrypted,signed).send({from: address}); //FOR WRITING
    console.log("Patient added!");
    console.log("Patients after: " + num_patients);

    
    // const decrypted=await window.CryptoJS.AES.decrypt(encrypted,aesPassword).toString(window.CryptoJS.enc.Utf8)
    // const js=JSON.parse(decrypted)
    // console.log(js)
  };

  return (
    <div className="Container">
      <div>
        <div>
          <h1> Add new patient</h1>
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
            <hr className="solid"/>
            <div className="mb-3">
              <label className="form-label">Patient Name:</label>
              <input
                className="form-control"
                name="name"
                value={name}
                onChange={(value) => setName(value.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age:</label>
              <input
                className="form-control"
                name="age"
                value={age}
                onChange={(value) => setAge(value.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <input
                className="form-control"
                name="gender"
                value={gender}
                onChange={(value) => setGender(value.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Blood Type:</label>
              <input
                className="form-control"
                name="blood"
                value={blood}
                onChange={(value) => setBlood(value.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Weight:</label>
              <input
                className="form-control"
                name="weight"
                value={weight}
                onChange={(value) => setWeight(value.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Oxygen:</label>
              <input
                className="form-control"
                name="oxygen"
                value={oxygen}
                onChange={(value) => setOxygen(value.target.value)}
              />
            </div>
            <button type="button" onClick={submit} className="btn btn-primary">
              Add Record
            </button>
          </form>
          {/* <div>
            <button type='button' onClick={submit}>  add record </button>
          </div> */}
        </div>

        {/* Add Visit 
        in: patientid,data
        */}

        {/* Get all visits */}
        {/* Get visits for patientid (take patientid) */}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          alignItems: "center",
          marginBottom: "50px",
        }}
      ></div>
    </div>
  );
}

export default AddPatient;
