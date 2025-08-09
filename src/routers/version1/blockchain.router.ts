import { Router } from 'express';
// import Web3 from 'web3';
// import fs from 'fs';
import blockchainController from '../../controllers/blockchain.controller';
import validateDTO from '../../middlewares/validateDTO.middleware';
import CreateUserDTO from '../../dtos/blockchain.dto';

const blockchainRouter: Router = Router();

// const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// const contractJSON = JSON.parse(
//     fs.readFileSync('./src/contracts/MyContract.json', 'utf8')
// );
// const contractABI = contractJSON.abi;
// const contractAddress = process.env.CONTRACT_ADDRESS;
// const accountKey =
//     '0xb0a8c652c0ef4cde5eea92bf5f88e8677379e1e6877b01fbfa3c52e4856c3429';
// const account = web3.eth.accounts.privateKeyToAccount(accountKey);
// web3.eth.accounts.wallet.add(account);
// web3.eth.defaultAccount = account.address;

// const contract = new web3.eth.Contract(contractABI, contractAddress);

blockchainRouter.get('/message', blockchainController.initialize);
blockchainRouter.post(
    '/test',
    validateDTO(CreateUserDTO),
    blockchainController.initialize
);
blockchainRouter.get('/user/:id', blockchainController.getUserData);

// blockchainRouter.get('/test', async (req, res) => {
//     try {
//         const balanceWei = await web3.eth.getBalance(accountKey);
//         const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

//         console.log(`Account Address: ${accountKey}`);
//         console.log(`Balance: ${balanceEth} ETH`);

//         res.status(200).json({
//             address: accountKey,
//             balance: balanceEth,
//         });
//     } catch (error) {
//         console.error('Error fetching message:', error);
//         res.status(500).json({ error: 'Failed to fetch message' });
//     }
// });

export default blockchainRouter;
