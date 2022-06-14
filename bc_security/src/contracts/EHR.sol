// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract EHR {
    mapping(bytes => uint256[]) public patientRecordsPerHospital;
    mapping(bytes => uint256[]) public visitRecordsPerHospital;
    mapping(uint256 => string) public Enc_Visits;
    mapping(uint256 => string) public Visits_sig;
    mapping(uint256 => string) public Enc_Patients; // 1 -> akshdasyhdkuasygdousaydo8uasdouashdousahdousahduoashdw890asu
    mapping(uint256 => string) public Patients_sig;
    uint256 public visitCount;
    uint256 public patientCount;

    function getPatientById(uint256 idx) public view returns (string memory) {
        return Enc_Patients[idx];
    }

    function getPatientSigById(uint256 idx)
        public
        view
        returns (string memory)
    {
        return Patients_sig[idx];
    }

    function getMyPatients(bytes memory addr)
        public
        view
        returns (uint256[] memory ids)
    {
        return patientRecordsPerHospital[addr];
    }

    function getVisitById(uint256 idx) public view returns (string memory) {
        return Enc_Visits[idx];
    }

    function getVisitSigById(uint256 idx) public view returns (string memory) {
        return Visits_sig[idx];
    }

    function getMyVisits(bytes memory addr)
        public
        view
        returns (uint256[] memory ids)
    {
        return patientRecordsPerHospital[addr];
    }

    function addPatient(
        bytes memory hospAddress,
        string memory _patientEnc,
        string memory _patientSig
    ) public {
        patientCount++;
        patientRecordsPerHospital[hospAddress].push(patientCount);
        Enc_Patients[patientCount] = _patientEnc;
        Patients_sig[patientCount] = _patientSig;
    }

    function addVisit(
        bytes memory hospAddress,
        string memory _visitHash,
        string memory _visitSig
    ) public {
        visitCount++;
        visitRecordsPerHospital[hospAddress].push(visitCount);
        Enc_Visits[visitCount] = _visitHash;
        Visits_sig[visitCount] = _visitSig;
    }
}
