// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificationValidationContract {
    // Using a mapping for efficient lookups
    mapping(string => bool) private certificates;
    uint256 public totalCertificates;

    // Add a single certificate hash to the contract
    function addCertificateHash(string memory _certificate_hash) public {
        require(!certificates[_certificate_hash], "Certificate already exists");
        certificates[_certificate_hash] = true;
        totalCertificates++;
    }

    // Batch add multiple certificate hashes
    function addMultipleCertificateHashes(string[] memory _certificates_hash) public {
        for (uint256 i = 0; i < _certificates_hash.length; i++) {
            if (!certificates[_certificates_hash[i]]) {
                certificates[_certificates_hash[i]] = true;
                totalCertificates++;
            }
        }
    }

    // Check if a certificate hash exists
    function checkCertificate(string memory _certificate_hash) public view returns (bool) {
        return certificates[_certificate_hash];
    }
}
