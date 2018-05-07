import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CoinForm from './CoinForm';
import { startEditCoin, startRemoveCoin, startModalOpen, startModalClose } from '../actions/coins';
import RemoveModal from './RemoveModal';

export class EditCoinPage extends React.Component {

    // state = { confirmRemove: undefined };
    constructor(props) {
        super(props)
        this.state = {
            confirmRemove: undefined
        }
    }

    onSubmit = (coin)=>{
        this.props.startEditCoin(this.props.coin.id, coin);
        this.props.history.push('/');
    };

    onRemove = ()=>{
        this.props.startRemoveCoin({ id: this.props.coin.id });
        this.setState(() => ({
            confirmRemove: false
        }));
        this.props.history.push('/');
    };

    onCloseModal = ()=>{
        this.setState(() => ({
            confirmRemove: false
        }));
    };

    onOpenModal = () => {
        this.setState(() => ({
            confirmRemove: true
        }));
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit coin</h1>
                        <Link className="back-link" to="/dashboard">
                            <p> &lt;  Go Back to Dashboard</p>
                        </Link>
                    </div>
                </div>
                <div className="content-container">
                    <CoinForm 
                        coin={this.props.coin}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onOpenModal}>Remove Coin</button>
                </div>

                <RemoveModal 
                    confirmRemove={this.state.confirmRemove}
                    onRemove={this.onRemove}
                    onCloseModal={this.onCloseModal}
                />
                
            </div>    
        );
    }
};

const mapStateToProps = (state, props) => {
    return {
        coin: state.coins.find((coin) => coin.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startEditCoin: (id, coin) => dispatch(startEditCoin(id, coin)),
    startRemoveCoin: (data) => dispatch(startRemoveCoin(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCoinPage);