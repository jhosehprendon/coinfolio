import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


export default class CoinForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: props.coin ? (props.coin.amount / 100).toString() : '',
            name: props.coin ? props.coin.name : '',
            error: '',
            times: 0,
            coinlist: ["Bitcoin", "Ethereum", "Ripple", "Bitcoin-Cash", "EOS", "Litecoin", "Cardano", "Stellar", "IOTA", "TRON", "NEO", "Dash", "Monero", "NEM", "VeChain", "Tether", "Bytecoin-bcn", "Ethereum-Classic", "ICON", "Qtum", "Zcash", "Binance-Coin", "OmiseGO", "Lisk", "Zilliqa", "Bitcoin-Gold", "Aeternity", "Ontology", "Verge", "Nano", "Steem", "0x", "Decred", "Siacoin", "Wanchain", "Bytom", "BitShares", "Waves", "Stratis", "Bitcoin-Diamond", "RChain", "Populous", "Maker", "Augur", "Dogecoin", "Bitcoin-Private", "Golem-network-tokes", "IOStoken", "Status", "DigiByte", "Basic-Attention-Token", "Hshare", "Waltonchain", "DigixDAO", "Aion", "Loopring", "Nebulas-token", "Ark", "aelf", "Komodo", "Mixin", "Ardor", "Dentacoin", "Loom-Network", "KuCoin-Shares", "PIVX", "Polymath-network", "WaykiChain", "Mithril", "Kyber-Network", "Fusion", "Gas", "Cortex", "Bancor", "Elastos", "ReddCoin", "Cryptonex", "MonaCoin", "Ethos", "Skycoin", "GXChain", "QASH", "Substratum", "FunFair", "Huobi-Token", "Kin", "Veritaseum", "Centrality", "Syscoin", "Matrix AI Network", "CyberMiles", "Enigma", "Dragonchain", "iExec-RLC", "Storm", "Gifto", "Nuls", "WAX", "ZCoin", "SALT"]
        };
    }

    onCoinChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }))
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return true;
      }

    getCoinValue = async () => {

        const coinApi = `https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/${this.state.name}`;
        let requestCoin;
        let type;

        try {
            requestCoin = await axios.get(coinApi);       
        }catch(error){
            console.log('error', error);
        }

        let times = requestCoin.data[0].price_usd * this.state.amount;
        console.log(times);
        this.setState(() => ({ times }))
    
    }  

    // componentDidMount() {
    //     this.getCoinValue();

    // }


    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.name || !this.state.amount) {
            this.setState(() => ({ error: 'Please select a coin and input amount' }));
        } else if (this.state.times) {
            this.setState(() => ({ error: ''})); 
            this.props.onSubmit({
                name: this.state.name,
                amount: parseFloat(this.state.amount, 10) * 100,
                times: parseFloat(this.state.times, 10) * 100
            });   
            
        }
    };

    render() {
        return(
                
                <form className="form" onSubmit={this.onSubmit} onChange={this.getCoinValue.bind(this)}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <select 
                        type="text"
                        className="text-input"
                        value={this.state.name} 
                        onChange={this.onCoinChange}           
                    >
                        <option value="" disabled>Select a coin</option>
                        {this.state.coinlist.map((coin, i)=>{
                            return <option key={i}>{coin}</option>
                        })}
                    </select>
                    <input 
                        type="text"
                        placeholder="Amount"
                        className="text-input" 
                        value={this.state.amount}  
                        onChange={this.onAmountChange}           
                    />
                    <div>
                        <button className="button">Save coin</button>
                    </div>
                    
                </form>  
        )
    }
}
