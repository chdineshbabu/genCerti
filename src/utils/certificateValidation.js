import CertificationValidationContractABI  from './abi/CertificationValidationContract.json'
const validationAbi = CertificationValidationContractABI.abi

async function interactWithValidationContract(contractAddress, action, data) {
  const validationContract = new ethers.Contract(contractAddress, validationAbi, signer);
  
  if (action === "addCertificate") {
    const tx = await validationContract.addCertificateHash(data);
    await tx.wait();
    alert("Certificate added!");
  } else if (action === "checkCertificate") {
    const exists = await validationContract.checkElement(data);
    return exists;
  }
}
