"use client"
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import OrganizationFactoryABI from "../../blockchain/artifacts/contracts/OrganizationFactory.sol/OrganizationFactory.json";
import CertificationValidationContractABI from "../../blockchain/artifacts/contracts/OrganizationFactory.sol/CertificationValidationContract.json";

const organizationFactoryAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function ContractInteraction() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [organizationFactory, setOrganizationFactory] = useState(null);
    const [organizationAddress, setOrganizationAddress] = useState(null);
    const [newOrgEmail, setNewOrgEmail] = useState("");
    const [certContract, setCertContract] = useState(null);
    const [certHash, setCertHash] = useState("");
    const [hashExists, setHashExists] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setProvider(provider);

                const signer = provider.getSigner();
                setSigner(signer);

                const orgFactory = new ethers.Contract(
                    organizationFactoryAddress,
                    OrganizationFactoryABI.abi,
                    signer
                );
                setOrganizationFactory(orgFactory);
            } else {
                alert("Please install MetaMask to use this app.");
            }
        };
        init();
    }, []);
    const createOrganization = async () => {
        if (organizationFactory && newOrgEmail) {
            const tx = await organizationFactory.createOrganization(newOrgEmail);
            await tx.wait();
            alert(`Organization created with email: ${newOrgEmail}`);
        }
    };

    const getOrganizationByOwner = async () => {
        if (organizationFactory) {
            const orgAddress = await organizationFactory.getOrganizationByOwner(await signer.getAddress());
            setOrganizationAddress(orgAddress);
            const certContract = new ethers.Contract(
                orgAddress,
                CertificationValidationContractABI.abi,
                signer
            );
            setCertContract(certContract);
        }
    };
    const addCertificateHashes = async () => {
        if (certContract && certHash) {
            const tx = await certContract.addCertificateHash([certHash]);
            await tx.wait();
            alert(`Certificate hash added: ${certHash}`);
        }
    };
    const checkCertificateExists = async () => {
        if (certContract && certHash) {
            const exists = await certContract.checkElement(certHash);
            setHashExists(exists);
        }
    };

    return (
        <div>
            <h1>Certification Platform</h1>

            <div>
                <h2>Create Organization</h2>
                <input
                    type="text"
                    placeholder="Organization Email"
                    value={newOrgEmail}
                    onChange={(e) => setNewOrgEmail(e.target.value)}
                />
                <button onClick={createOrganization}>Create Organization</button>
            </div>

            <div>
                <h2>Get Organization by Owner</h2>
                <button onClick={getOrganizationByOwner}>Retrieve Organization</button>
                {organizationAddress && <p>Organization Address: {organizationAddress}</p>}
            </div>

            <div>
                <h2>Certificate Management</h2>
                <input
                    type="text"
                    placeholder="Certificate Hash"
                    value={certHash}
                    onChange={(e) => setCertHash(e.target.value)}
                />
                <button onClick={addCertificateHashes}>Add Certificate Hash</button>
                <button onClick={checkCertificateExists}>Check Certificate Exists</button>
                {hashExists !== null && (
                    <p>Certificate exists: {hashExists ? "Yes" : "No"}</p>
                )}
            </div>
        </div>
    );
}

export default ContractInteraction;
