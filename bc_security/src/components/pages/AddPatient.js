import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Web3 from "web3/dist/web3.min";
import { abi } from "../../abitwo.js";

// const privateKeyExported=""
// const publicKeyExported=""
// const publicKeyExported='{"alg":"RS512","e":"AQAB","ext":true,"key_ops":["verify"],"kty":"RSA","n":"-8qjfzgmFc_m0aeNHq_JCDN-znvhbw_Zxj0iEAbYBJ3PM9MXyGlw1N_uvEAo1WNAd78Tx8jmG3sL6OQpfTgvEBdNktQLdRmAs8hF6tM6AemgTw0QD9pIudXnPRJ3v83K6_ILAMHENqjyZaTJGv_gsb6pARg0BI6YpDhFm9yCEN2W4jpXx5T43oq3_Th-K8ztbjeTEOaHBWGiv86uQNlbxN4QJ4HWosjnKzb7szbSn94ZMtj5oKwZ8LFL3GYwkaSjqsJVsp-6jodZAOqX6d15mk8RBSoU65iE05CfhtIU3QmjbcMPjfT1fQwNeEkc9HlDRWrgkQ6vK-c-ubUqaSRM_lDhWdSZgAfMtE0_LSMYeUT0vjxG3a7ANtnkawDTuu38sIoAv_5NpMq1rYIse0JIJclKuMRTdnHT27t5qSuETJZB4yE-mtZrdG6ndjU4HKSYEu81T3p9Jbm4oFl9c7BsALt0jt4J8hs-mB5yU03Zt0lpam_XaJmARBGcPMnrveVKTGp4qADZc0F6Lg9gl5KZ-2gC92xzk6ncmMMU6WcyE7bpu-CPsBjhi_gIyPKSwzC3WPleU2L_mg-Ik92w-GBjdRL_ioo5j-Bc3u694FQAd9B2nI5YQ8ZrFCTXQC9KHFnvlQklabR6zxlC6iRwt_Nfxj3f8mxKCa5XCeWlADYz8r0"}'
// const privateKeyExported='{"alg":"RS512","d":"Amzu-ui4POqf00bYq9kKcR32KUqw_u3t-zsS4va1V6gKzYv3R4GihV5zA4u7G0Eg-YieEyCUIXXahTIQC9M4w_uYV4fJduWQmkrCIxfbmSieTuXIR90ZaS28OI7IKggX3cvIyNmeI98V1vnAlJ9TClRwUkVp4XBbgNt6oQpZAR87DcGh6KBjJX3zGiSdftIp8YGc5yx0L-DnyzNLLFxkzz04iIvAnOHm6-XB8lEe2IPCvOGxajL_XNSsZkzOI3h13iiiTetg6oKlMvQYuFKxdqfT1Inw_SZxOfpe7VLN1G7XqF4iIsLogqIwjb4eRpvoAitulChKO-okm8tLKDA0Xl0xqDmfiUvwY0BU99282ie38SEY3SmKaepTMBSKb4ppLv7nr3urHSyNz8Yu9yqy58g6zhtvvuNgNpIU4E8pnaEVInyP03H2fbmvnTSVDAg1E33l4XyrgzGcLj3iFK5JCADU7La95Tk7ve5UjN8k7zL0fVu7--PJSwRGX7Lug1kBpRH3dWPHny6g0n8U9aZctSxAhidWyaE3uPq5cEd7Mlx0s9_R6y7AFYqMni85B-ujua-JnsFMllYb0j8dQXDmPbldPS7RMWbUq6IT-GJXmTHOfqvCYiyHLl8SeSOPbOwpCnAqzeQ4veM5pseLwZMBv6z1NY2R-O26pyx8pijAxSE","dp":"0yD76ZPYC2386k2vfMCVDtynPArm6DnVIdveAGQiu6mT_ZoZxMGHrn0hcr5HEbg9BDb5atV-IUepKErFJfbRQ2BDVAemaPCFmx-azN5fqqpodaCO44oSJZK4y4lXnYZ9QK939bUtPnOVYLnWhYqB5zQlnKrfKt17PvM3R-Qumrn4RBeMz7d5vejQ-jI8RK6sB4QvdutberW4_OWX9MWmzubNyF_x6Tj6Cfw-gGCkAkl1teTNVMElQlkReHJKQWL2ComyL_FwcxYpkiwP-CrLl0a0O2074IO3td3TGfkZrPzBz4g8NqOerC7d22BsvdJxo3jyLc8yZzt0TktLUklGgQ","dq":"o3vefartGkw-VBBBQzs_DcIHmr5WPwREzHBYwcFEeiRhp0cVXFjkX169Qa_q1NETmRpyPHgg6qYFUD90-_Aqmjh4TgfuheANsxvbPa11Qlzmcb07xIWXfcfmZolBa221TTNrJw-FGEcatWM_SjRb8vWJhxPxgAWzNQIKy51eqBOeQRw7I8L8axpvVwgsQxDRKXreAgYCNe3cJjS78Du12ZnHJzHJgNVCuvym_m1_tujI6MLC6acDPcxEfJLrLYVsM2csPTlq806nHNcIhELpfBPuF6adXymLhywmgyrQcXYrAv1KunqLdI0uBXpTzrNNsQF4zwGlkPAznPDFROxWVQ","e":"AQAB","ext":true,"key_ops":["sign"],"kty":"RSA","n":"-8qjfzgmFc_m0aeNHq_JCDN-znvhbw_Zxj0iEAbYBJ3PM9MXyGlw1N_uvEAo1WNAd78Tx8jmG3sL6OQpfTgvEBdNktQLdRmAs8hF6tM6AemgTw0QD9pIudXnPRJ3v83K6_ILAMHENqjyZaTJGv_gsb6pARg0BI6YpDhFm9yCEN2W4jpXx5T43oq3_Th-K8ztbjeTEOaHBWGiv86uQNlbxN4QJ4HWosjnKzb7szbSn94ZMtj5oKwZ8LFL3GYwkaSjqsJVsp-6jodZAOqX6d15mk8RBSoU65iE05CfhtIU3QmjbcMPjfT1fQwNeEkc9HlDRWrgkQ6vK-c-ubUqaSRM_lDhWdSZgAfMtE0_LSMYeUT0vjxG3a7ANtnkawDTuu38sIoAv_5NpMq1rYIse0JIJclKuMRTdnHT27t5qSuETJZB4yE-mtZrdG6ndjU4HKSYEu81T3p9Jbm4oFl9c7BsALt0jt4J8hs-mB5yU03Zt0lpam_XaJmARBGcPMnrveVKTGp4qADZc0F6Lg9gl5KZ-2gC92xzk6ncmMMU6WcyE7bpu-CPsBjhi_gIyPKSwzC3WPleU2L_mg-Ik92w-GBjdRL_ioo5j-Bc3u694FQAd9B2nI5YQ8ZrFCTXQC9KHFnvlQklabR6zxlC6iRwt_Nfxj3f8mxKCa5XCeWlADYz8r0","p":"_lVVyNmXdVjJIoNjEopGp90rifUiemKT9Z1osKMW-xuSo7S_AHLMXvYn3V2vtGgxhfA3RTQyxsBfsQpvKsOFU9web9FLf5cdvMERWzLlyR_Xy8rKzx-XbCf4doOoK6iQvQjBXY0pQaL_vOoH8KVeZq84HNZ6QgzKSJvNKD09fJ_GxYTLY37GJbGoMKbLbLYzo7J8UOkuFhpUrKFKfYhO2TvlMYKnv5qtSmVXOYkG6-ek5dSJOIQHKzoCTa2IuPiQA-nszyLN0pguHacOfn9xkFH311nfWg_jDxpC7jubq0FdGH9LAD5wcUw4cHkaLGD4Go0nsKb9txKrXXM3y9i9oQ","q":"_XEKHbeg1nkOFMMYSS3Goqv5j8DVhzr_nFT6sJr2wvuoKu0tUpf8zeJ28kqMJJNADRF3ZDdVDjGku1chE_jk3gQ3xmaSqklhCSW11A2Cd3D_ATP_EOKZppRZ1MwfGwuHOIJRgtjgM2zeBmstCDceb_PeF6l7M2ORP2EZpLHg5ShA5WaW2DvUjsipIR10xwRzxcUHD2ZDG481hpc-yL2Z2aRDLKpoklgOxvJR_8wOV5Q1nQmez3CVuSikCfOoPr1R-sCHemAUOuTtkdyhp90OxowN_3vGv8Yf9zrEf-0g4KEz34UIlFI47d4LMdh9L_X_oF11-MjUvIJR0WLrV7BHnQ","qi":"1PdO2VqFvJ7DV_tQSN59pxgphyBHENIInsymyqFACR32VBTQo4OKYxDq4xeQv8Ddz_5Y7beJafASM1spzek62YTAOdlCf4qXkxkfv09zmUfg3C4VzEHr8FK95h7aoHprXyuVus37APKgvtsFSqm1nURA2LjMl0Fr9CHs7gFx2pa7kTLy1PWYYB6lwZgNiOR_Ibwyml74fd11W-CpapstoIs32sBZ5CX4PJX372hGvsnD95kwrUka42vvJHkwchJqtNhmnjpSbRxWbROKVxGavRgO8KcVVUa1p3F9huxd1TK49W4ykg9cBCRnUA4GUdTJ9mppn9XCFBfpRPyIPZoE8Q"}'
const contractAddr = "0xFFe2F8dB501cA43275c18301935a295481796518";
const metamaskAddr = "0xc2983aBAb0FFCFBe35a449bf9448b51B9d2c5035";


function Home() {
  // Patient data
  const [encrypted, setEncrypted] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [account, setAccount] = useState(); // state variable to set account.
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [blood, setBlood] = useState("");
  const [weight, setWeight] = useState("");
  const [oxygen, setOxygen] = useState("");

  const verifyMessage = async (data, signature, address) => {
    try {
      const signerAddress = await ethers.utils.verifyMessage(data, signature);
      return signerAddress === address;
    } catch (error) {
      console.log(error);
    }
  };

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
    await contractman.methods.addPatient(encrypted,signed).send({from: address}); //FOR WRITING
    console.log("Patient added!");
    console.log("Patients after: " + num_patients);

    const decrypt = await axios.post('http://localhost:5000/api/utils/decrypt', {
      user: username,
      password: password,
      data: encrypted // This is the body part
    }).then((response) =>{return response.data.decrypted})
    console.log("decrypted data:"+decrypt)
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

export default Home;
