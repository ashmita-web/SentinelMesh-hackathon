import { ethers } from "ethers";
import fs from "fs";
import path from "path";

// connect to Hardhat local blockchain
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// load contract address file
const addressFile = path.join(process.cwd(), "backend/blockchain/contract-address.json");
const { address } = JSON.parse(fs.readFileSync(addressFile));

// load ABI file
const abiFile = path.join(process.cwd(), "backend/blockchain/abi.json");
const { abi } = JSON.parse(fs.readFileSync(abiFile));

// connect to contract
export const contract = new ethers.Contract(address, abi, provider);
