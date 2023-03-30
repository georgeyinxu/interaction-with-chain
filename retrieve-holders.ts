import { Contract, ethers } from 'ethers';

const bscProvider = new ethers.JsonRpcProvider('https://sparkling-spring-aura.bsc.discover.quiknode.pro/3a05797555eaa784fe794a1626894b31ba3558ad/');
const swthTokenAddress: string = '0x250b211ee44459dad5cd3bca803dd6a7ecb5d46c';

const holderAddresses: Array<string> = [
  '0x123d475e13aa54a43a7421d94caa4459da021c77',
  '0x0020c5222a24e4a96b720c06b803fb8d34adc0af',
  '0xfe808b079187cc460f47374580f5fb47c82b87a5'
];

async function getSwthBalance(address: string): Promise<ethers.BigNumberish> {
  const swthTokenContract: Contract = new ethers.Contract(swthTokenAddress, ['function balanceOf(address) view returns (uint256)'], bscProvider);
  const balance = await swthTokenContract.balanceOf(address);

  return balance;
}

function formatBalance(balance: ethers.BigNumberish): string {
  const balanceString = ethers.formatUnits(balance, 8);
  const balanceInt = Number(balanceString);
  const formattedNumber = balanceInt.toLocaleString(undefined, {maximumFractionDigits: 8});

  return formattedNumber;
}

async function getSwthBalances() {
  for (const address of holderAddresses) {
    let balance = await getSwthBalance(address);
    const balanceString = formatBalance(balance);

    console.log(`${address} ${balanceString}`);
  }
}

getSwthBalances();