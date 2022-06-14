import { ethers } from 'ethers';
// import { verifyMessage } from 'ethers/utils';
import React, { useEffect, useState } from 'react';

function VerifyRecord() {
  const [myAddr, setMyAddr] = useState('');
  const [signedRecord, setSignedRecord] = useState('');
  const [data, setData] = useState('');
  const [signature, setSignature] = useState('');

  const [showSigner, setShowSigner] = useState('');
  const [txt, setTxt] = useState('');

  const verifyMessage = async () => {
    try {
      setTxt('');
      const signerAddress = await ethers.utils.verifyMessage(data, signature);
      console.log('signer :' + signerAddress);
      console.log('my: ' + myAddr);
      if (signerAddress.toLowerCase() == myAddr.toLowerCase()) {
        setTxt('You signed this!');
      } else {
        setTxt("You didn't sign this");
      }
    } catch (error) {
      setTxt("You didn't sign this");
      console.log(error);
    }
  };
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
  return (
    <div>
      <form>
        <div className='mb-3'>
          <label className='form-label'>Data:</label>
          <input
            className='form-control'
            name='data'
            value={data}
            onChange={(value) => setData(value.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Signature:</label>
          <input
            className='form-control'
            name='signature'
            value={signature}
            onChange={(value) => setSignature(value.target.value)}
          />
        </div>
        <button
          type='button'
          onClick={verifyMessage}
          className='btn btn-primary'>
          Verify
        </button>
      </form>

      <br />
      <hr />
      <h1>{txt}</h1>
    </div>
  );
}

export default VerifyRecord;
