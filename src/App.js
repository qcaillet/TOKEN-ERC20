import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import Token from './artifacts/contracts/MyToken.sol/MyToken.json';
import './App.css';

const tokenAddress ="0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

   // ce qui va nous permettre de mettre le nombre de token que possede l'utilisateur.
   const [balance, setBalance] = useState(null);
   const [ showBalanceModal, setShowBalanceModal ] = useState(false)


   // a definir 
     useEffect(() => {
       getBalance();
     },[])
   
   // function asyncrone qui nous permet de récuperer le nombre de token que possede un utilisateur 
      async function getBalance() {
       // verif si l'utilisateur est bien connecter 
       if(typeof window.etherum !== 'unedefined'){
         // a definir 
         const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        /***recuperation eth sur le compte meta ***/ 
         const account = accounts[0];
         const balance = await window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
         const wei = parseInt(balance,16)
         const eth = (wei/ Math.pow(10, 18))

         // a definir
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         // a definir 
         const contract = new ethers.Contract(tokenAddress, Token.abi, provider);

         // a definir 
          const balanceToken = await contract.balanceOf(accounts[0]);
          const token = (balanceToken / 10 ** 18)
         // a definir
           setBalance({token, eth});
           setShowBalanceModal(true);
       }
     }
     return (
       <div className="App">
         <div> {console.log(balance)}</div>
         {showBalanceModal && (<div><p>{balance.eth + " ETH"}</p> 
         <p>{balance.token + " MCO"}</p></div>)
         }
       </div>
     );
}

export default App;
