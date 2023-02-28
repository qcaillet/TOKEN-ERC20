import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import Token from './artifacts/contracts/MyToken.sol/MyToken.json';
import './App.css';

const tokenAddress ="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {

   // ce qui va nous permettre de mettre le nombre de token que possede l'utilisateur.
   const [balance, setBalance] = useState();

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
         // a definir
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         // a definir 
         const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
         // a definir 
         const balance = await contract.balanceOf(accounts[0]);
         // a definir
           setBalance(balance / 10 ** 18);
       }
     }
     return (
       <div className="App">
         <div> {console.log(balance)}</div>
         <p> Vous avez {balance} MCO</p>
       </div>
     );
}

export default App;
