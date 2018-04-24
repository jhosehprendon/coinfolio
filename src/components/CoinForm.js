import React from 'react';
import moment from 'moment';

const now = moment();

export default class CoinForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.coin ? props.coin.name : '',
            amount: props.coin ? (props.coin.amount / 100).toString() : '',
            error: ''
        };
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }))
        }
    };

    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.name || !this.state.amount) {
            this.setState(() => ({ error: 'Please select a coin and input amount' }));
        } else {
            this.setState(() => ({ error: ''}));
            this.props.onSubmit({
                name: this.state.name,
                amount: parseFloat(this.state.amount, 10) * 100
            });
        }
    };

    render() {
        return(
                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input 
                        type="text"
                        className="text-input"
                        placeholder="Coin name"
                        autoFocus
                        value={this.state.name} 
                        onChange={this.onNameChange}           
                    />
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