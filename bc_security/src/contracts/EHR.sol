// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract EHR {
    mapping(string => uint256[]) public patientRecordsPerHospital;
    mapping(string => uint256[]) public visitRecordsPerHospital;
    mapping(uint256 => string) public Enc_Visits;
    mapping(uint256 => string) public Visits_sig;
    mapping(uint256 => string) public Enc_Patients; // 1 -> akshdasyhdkuasygdousaydo8uasdouashdousahdousahduoashdw890asu
    mapping(uint256 => string) public Patients_sig;
    uint256 public visitCount;
    uint256 public patientCount;

    function getPatientById(uint256 idx) public view returns (string memory) {
        return Enc_Patients[idx];
    }

    function addPatient(
        string memory hospAddress,
        string memory _patientEnc,
        string memory _patientSig
    ) public {
        patientCount++;
        patientRecordsPerHospital[hospAddress].push(patientCount);
        // 0xE1b726AE79aEaf755e1F38723d9f87e1c76a4C9B --> [1,2,3,7,9]
        // 0xA3C726AwWE434343as1F38723d9f87e1c76a4C9B --> [4,5,6,8]
        Enc_Patients[patientCount] = _patientEnc;
        Patients_sig[patientCount] = _patientSig;
    }

    function addVisit(
        string memory hospAddress,
        string memory _visitHash,
        string memory _visitSig
    ) public {
        visitCount++;
        visitRecordsPerHospital[hospAddress].push(visitCount);
        Enc_Visits[visitCount] = _visitHash;
        Visits_sig[visitCount] = _visitSig;
    }
}
