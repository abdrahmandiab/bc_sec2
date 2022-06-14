import { HmacSHA3 } from "crypto-js";
// import { verifyMessage } from "ethers/utils";
import React, { useEffect , useState } from "react";

function VerifyRecord() {
    const [signedRecord, setSignedRecord] = useState("")
    const [showSigner, setShowSigner] = useState("")
    const [txt, setTxt] = useState("")
    // const verifyMessage = async (data, signature, address) => {
    //     try {
    //       const signerAddress = await ethers.utils.verifyMessage(data, signature);
    //       return signerAddress === address;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };



  return (
    <div>
    {/* <form>
        <div className="mb-3">
            <label className="form-label">Oxygen:</label>
            <input
            className="form-control"
            name="oxygen"
            value={oxygen}
            onChange={(value) => setOxygen(value.target.value)}
            />
        </div>
        <button type="button" onClick={verifyMessage} className="btn btn-primary">
              Verify
            </button>
            <br />
            <hr />
            {showSigner && <p>txt</p>}
    </form> */}
    </div>
  )
}

export default VerifyRecord