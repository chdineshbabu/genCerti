const hre = require("hardhat");

async function main() {
    // Deploy OrganizationFactory contract
    const OrganizationFactory = await hre.ethers.getContractFactory("OrganizationFactory");
    const organizationFactory = await OrganizationFactory.deploy();
    await organizationFactory.deployed();

    console.log("OrganizationFactory deployed to:", organizationFactory.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
