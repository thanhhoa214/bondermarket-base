import 'axios';
import { BonderBaseSepoliaUSDC } from '../flattened/BonderBaseSepoliaUSDCFlattened.sol'

async function verifyContract() {
  
  const apiKey = "0x1Bc38c8465F28e27c9808ab3A5AfAa2b33631FFc";

  const params = new URLSearchParams({
    codeformat: 'solidity-single-file',
    sourceCode: BonderBaseSepoliaUSDC,
    // constructorArguements: 
    contractaddress: '0x1Bc38c8465F28e27c9808ab3A5AfAa2b33631FFc',
    contractname: 'BonderBaseSepoliaUSDC',
    compilerversion: 'v0.8.20',
    optimizationUsed: '1',
    runs: '200'
  });

  try {
    const response = await axios.post(`https://api.basescan.org/api?module=contract&action=verifysourcecode&apikey=${apiKey}`, params);
    console.log(response.data);
  } catch (error) {
    console.error('Verification failed:', error);
  }
}

// Replace with your deployed contract address
verifyContract();
