// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificationValidationContract {
    string[] public certificates_hash;

    function getContractLength() public view returns (uint256) {
        return certificates_hash.length;
    }

    function addCertificateHash(string[] memory _certificates_hash) public {
        for (uint256 i = 0; i < _certificates_hash.length; i++) {
            certificates_hash.push(_certificates_hash[i]);
        }
    }

    function checkElement(string memory _certificate_hash)
        public
        view
        returns (bool)
    {
        for (uint256 i = 0; i < certificates_hash.length; i++) {
            if (
                keccak256(abi.encodePacked(certificates_hash[i])) ==
                keccak256(abi.encodePacked(_certificate_hash))
            ) {
                return true;
            }
        }
        return false;
    }
}

contract OrganizationFactory {
    struct Organization {
        string email;
        address contractAddress;
    }

    Organization[] public organizations;
    mapping(address => address) public ownerToContract;

    event OrganizationCreated(
        string name,
        address contractAddress,
        address owner
    );

    // Function to create a new organization contract
    function createOrganization(string memory _email) public {
        CertificationValidationContract newOrgContract = new CertificationValidationContract();
        organizations.push(
            Organization({
                email: _email,
                contractAddress: address(newOrgContract)
            })
        );
        ownerToContract[msg.sender] = address(newOrgContract);

        emit OrganizationCreated(_email, address(newOrgContract), msg.sender);
    }

    function getOrganizationsCount() public view returns (uint256) {
        return organizations.length;
    }

    function getOrganization(uint256 _index)
        public
        view
        returns (string memory, address)
    {
        require(_index < organizations.length, "Invalid index");
        Organization memory org = organizations[_index];
        return (org.email, org.contractAddress);
    }

    function getOrganizationByOwner(address _owner)
        public
        view
        returns (address)
    {
        return ownerToContract[_owner];
    }

    function getOrganizationByName(string memory _email)
        public
        view
        returns (address)
    {
        for (uint256 i = 0; i < organizations.length; i++) {
            if (
                keccak256(abi.encodePacked(organizations[i].email)) ==
                keccak256(abi.encodePacked(_email))
            ) {
                return organizations[i].contractAddress;
            }
        }
        revert("Organization not found");
    }
}
