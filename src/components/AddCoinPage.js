import React from 'react';
import CoinForm from './CoinForm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startAddCoin } from '../actions/coins';

export class AddCoinPage extends React.Component {
    onSubmit = (coin) => {
        this.props.startAddCoin(coin);
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add a coin to your portafolio</h1>
                        <Link className="back-link" to="/dashboard">
                            <p>&lt;  Go Back to Dashboard</p>
                        </Link>
                    </div>
                </div>

                <div className="content-container">
                    <CoinForm 
                        onSubmit = {this.onSubmit}
                    />
                </div>
            </div>  
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        startAddCoin: (coin) => dispatch(startAddCoin(coin))
    };
}

export default connect(undefined, mapDispatchToProps)(AddCoinPage);