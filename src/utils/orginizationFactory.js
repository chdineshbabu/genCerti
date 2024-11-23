import { ethers } from 'ethers';
import OrganizationFactoryABI from './abi/OrganizationFactory.json';
import { connectWallet } from './walletConnection';

const factoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const factoryAbi = OrganizationFactoryABI.abi;

let factoryContract;

async function initializeFactoryContract() {
  const wallet = await connectWallet(); 
  const signer = wallet.provider.getSigner();
  factoryContract = new ethers.Contract(factoryAddress, factoryAbi, signer);
}

export async function getOrganizations() {
  try {
    if (!factoryContract) await initializeFactoryContract();
    const count = await factoryContract.getOrganizationsCount();
    const organizations = [];
    for (let i = 0; i < count; i++) {
      const org = await factoryContract.getOrganization(i);
      organizations.push(org);
    }
    return organizations;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
}

export async function createOrganization(email) {
  try {
    if (!factoryContract) await initializeFactoryContract();
    const tx = await factoryContract.createOrganization(email);
    await tx.wait();
    alert("Organization created successfully!");
    return tx;
  } catch (error) {
    console.error("Error creating organization:", error);
    throw error;
  }
}
