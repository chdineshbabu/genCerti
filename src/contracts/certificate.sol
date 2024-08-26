// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CertificationManager is Initializable {
    using Address for address;
    using Strings for uint256;

    struct Organisation {
        string name;
        address accountAddress;
        bool isCreated;
    }

    mapping(uint16 => Organisation) public organisations;
    mapping(uint16 => address) public organisationContracts;
    address public owner;

    event OrganisationRegistered(uint16 id, address contractAddress);
    event OrganisationRemoved(uint16 id);
    event CertificateCreated(uint16 orgId, string certId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyOrgOwner(uint16 orgId) {
        require(organisations[orgId].accountAddress == msg.sender, "Not authorized");
        _;
    }

    modifier contractValid(uint16 orgId) {
        require(organisationContracts[orgId] != address(0), "Organisation contract not valid");
        _;
    }

    function initialize() public initializer {
        owner = msg.sender;
    }

    function registerOrganisation(
        string memory name,
        uint16 id
    ) external returns (address) {
        require(!organisations[id].isCreated, "This Organisation Id is already in use");
        require(bytes(name).length != 0, "Invalid Organisation Details");

        address newContract = address(new Certification(address(this), name, id, msg.sender));
        organisations[id] = Organisation(name, msg.sender, true);
        organisationContracts[id] = newContract;

        emit OrganisationRegistered(id, newContract);
        return newContract;
    }

    function removeOrganisation(uint16 id) external onlyOrgOwner(id) contractValid(id) returns (bool) {
        delete organisations[id];
        delete organisationContracts[id];

        emit OrganisationRemoved(id);
        return true;
    }

    function createCertificate(
        uint16 orgId,
        string memory certId,
        bytes32 hashedCertificate
    ) external onlyOrgOwner(orgId) contractValid(orgId) {
        Certification cert = Certification(organisationContracts[orgId]);
        cert.createCertificate(certId, hashedCertificate);

        emit CertificateCreated(orgId, certId);
    }

    function validateCertificate(
        uint16 orgId,
        string memory certId,
        bytes32 hashToValidate
    ) external view contractValid(orgId) returns (bool) {
        Certification cert = Certification(organisationContracts[orgId]);
        return cert.validateCertificate(certId, hashToValidate);
    }
}

contract Certification {
    string public orgName;
    uint16 public orgId;
    address public orgAddress;
    address public manager;
    bool public isContractExpired;

    mapping(string => bytes32) private certificates;

    modifier onlyManager() {
        require(msg.sender == manager, "Not authorized");
        _;
    }

    modifier contractValid() {
        require(!isContractExpired, "Contract expired");
        _;
    }

    constructor(
        address _manager,
        string memory _orgName,
        uint16 _orgId,
        address _orgAddress
    ) {
        manager = _manager;
        orgName = _orgName;
        orgId = _orgId;
        orgAddress = _orgAddress;
        isContractExpired = false;
    }

    function createCertificate(string memory certId, bytes32 hashedCertificate) public onlyManager contractValid {
        require(certificates[certId] == bytes32(0), "Certificate id already exists");
        certificates[certId] = hashedCertificate;
    }

    function validateCertificate(
        string memory certId,
        bytes32 hashToValidate
    ) public view contractValid returns (bool) {
        require(certificates[certId] != bytes32(0), "Certificate id does not exist");

        return (hashToValidate == certificates[certId]);
    }

    function expireContract() public onlyManager {
        isContractExpired = true;
    }
}
