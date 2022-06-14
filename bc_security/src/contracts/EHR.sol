// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

// Pointers explanation
// To get pointer from visit to previous visit we:
// 1. Check first if this visit is the first for the patient from isFirstVisOfPatient mapping
//      a. if yes, then VisToPrevVis holds id of patient not of visit.
//      b. if no, then returned holds id of previous visit
// 2. Get the id of whatever it is (having stored the boolean from [1])
// 3. Fetch the Visit/patient and render in front end

contract EHR {
    mapping(bytes => uint256[]) public patientRecordsPerHospital;

    mapping(bytes => uint256[]) public visitRecordsPerHospital;
    mapping(bytes => mapping(uint256 => uint256[])) visitRecordsPerPatientPerHospital;
    mapping(uint256 => string) public Enc_Visits;
    mapping(uint256 => string) public Visits_sig;
    mapping(uint256 => string) public Enc_Patients; // 1 -> akshdasyhdkuasygdousaydo8uasdouashdousahdousahduoashdw890asu
    mapping(uint256 => string) public Patients_sig;

    mapping(uint256 => uint256) public VisToPrevVis; // links to patient if patPrevVis[patid] ==0
    mapping(uint256 => bool) public isFirstVisOfPatient; //check if patPrevVis[patid] ==0
    mapping(uint256 => uint256) public patPrevVis; // link to most recent visit of that patient

    uint256 public visitCount;
    uint256 public patientCount;

    // To get a specific patient
    function getPatientById(uint256 idx) public view returns (string memory) {
        return Enc_Patients[idx];
    }

    // To get a specific patient's signature
    function getPatientSigById(uint256 idx)
        public
        view
        returns (string memory)
    {
        return Patients_sig[idx];
    }

    // To get patients added by my hospital
    function getMyPatients(bytes memory addr)
        public
        view
        returns (uint256[] memory ids)
    {
        return patientRecordsPerHospital[addr];
    }

    // To get a specific visit
    function getVisitById(uint256 idx) public view returns (string memory) {
        return Enc_Visits[idx];
    }

    // To get a specific visit's signature
    function getVisitSigById(uint256 idx) public view returns (string memory) {
        return Visits_sig[idx];
    }

    // To get visits added by my hospital
    function getMyVisits(bytes memory addr)
        public
        view
        returns (uint256[] memory ids)
    {
        return visitRecordsPerHospital[addr];
    }

    // Get visits add by my hopsital of a specific patient
    function getPatientVisits(bytes memory addr, uint256 patidx)
        public
        view
        returns (uint256[] memory ids)
    {
        return visitRecordsPerPatientPerHospital[addr][patidx];
    }

    function VisPointsToPatient(uint256 idx) public view returns (bool) {
        return isFirstVisOfPatient[idx];
    }

    function getPrevVisitById(uint256 idx) public view returns (uint256) {
        return VisToPrevVis[idx];
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
        patPrevVis[patientCount] = 0;
    }

    function addVisit(
        uint256 patid,
        bytes memory hospAddress,
        string memory _visitHash,
        string memory _visitSig
    ) public {
        visitCount++;
        visitRecordsPerPatientPerHospital[hospAddress][patid].push(visitCount);
        visitRecordsPerHospital[hospAddress].push(visitCount);
        Enc_Visits[visitCount] = _visitHash;
        Visits_sig[visitCount] = _visitSig;
    }

    function addVisitOld(
        bytes memory hospAddress,
        string memory _visitHash,
        string memory _visitSig
    ) public {
        visitCount++;
        visitRecordsPerHospital[hospAddress].push(visitCount);
        Enc_Visits[visitCount] = _visitHash;
        Visits_sig[visitCount] = _visitSig;
    }

    function addVisit2(
        uint256 patid,
        bytes memory hospAddress,
        string memory _visitHash,
        string memory _visitSig
    ) public {
        visitCount++;
        visitRecordsPerHospital[hospAddress].push(visitCount);
        Enc_Visits[visitCount] = _visitHash;
        Visits_sig[visitCount] = _visitSig;

        if (patPrevVis[patid] == 0) {
            isFirstVisOfPatient[visitCount] = true;
            VisToPrevVis[visitCount] = patid;
        } else {
            isFirstVisOfPatient[visitCount] = false;
            VisToPrevVis[visitCount] = patPrevVis[patid];
        }
        patPrevVis[patid] = visitCount;
    }
}
