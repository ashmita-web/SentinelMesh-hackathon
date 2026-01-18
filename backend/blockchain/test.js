import { ethers } from "ethers";
import dotenv from "dotenv";
import contractData from "./contract-address.json" assert { type: "json" };


dotenv.config();

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// get wallet key from .env
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// contract address + abi
const contractAddress = contractData.address;
const abi = contractData.abi;

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function run() {
    console.log("Connected wallet:", wallet.address);

    const owner = await contract.owner();
    console.log("Contract Owner:", owner);

    try {
        const tx = await contract.withdraw();
        await tx.wait();
        console.log("Withdraw executed:", tx.hash);
    } catch (err) {
        console.log("Withdraw failed:", err.message);
    }
}

run();
