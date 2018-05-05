import React from 'react';
import axios from 'axios';

export default class CoinForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: props.coin ? (props.coin.amount / 100).toString() : '',
            name: props.coin ? props.coin.name : '',
            error: '',
            times: props.coin ? (props.coin.times / 100).toString() : '',
            coins: []
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

    renderAllCoins = async () => {

        const allCoinsApi = 'https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/';
        let requestAllCoins;
        let type;

        try {
            requestAllCoins = await axios.get(allCoinsApi); 
            type = "FETCH_ALL_COINS" 
        }catch(error){
            console.log('error', error);
        }

        let arrayAllCoins = requestAllCoins.data.map(x => {
            return (x.name)
        });

        const coins = arrayAllCoins;

        this.setState(() => ({ coins }));

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

        let newTimes = requestCoin.data[0].price_usd;

        let times = newTimes * this.state.amount;

        this.setState(() => ({ times }));
   
        // console.log(times)  //OK
        // console.log(this.state.times)
    }


    componentWillMount() {
        this.renderAllCoins();  
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.name || !this.state.amount) {
            this.setState(() => ({ error: 'Please select a coin and input amount' }));
        } else {
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
                
                <form className="form" onSubmit={this.onSubmit} onChange={this.getCoinValue}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <select 
                        type="text"
                        className="text-input"
                        value={this.state.name} 
                        onChange={this.onCoinChange}           
                    >
                        <option value="" disabled>Select a coin</option>
                        {this.state.coins.map((coin, i)=>{
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