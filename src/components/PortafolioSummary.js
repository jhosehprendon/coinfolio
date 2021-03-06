import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import coinsTotal from '../selectors/coins-total';

export const PortafolioSummary = ({ portafolioTotal }) => {
  const formattedPortafolioTotal = numeral(portafolioTotal / 100).format('$0,0.00');
  
  return (
    <div className="page-header">
      <div className="content-container"> 
        <h1 className="page-header__title">Portafolio Balance: <span>{formattedPortafolioTotal}</span></h1>
        <div className="page-header__actions">
          <Link className="button" to="/add">Add Coin to Portafolio</Link>
        </div>
      </div>  
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    portafolioTotal: coinsTotal(state.coins),
  };
};

export default connect(mapStateToProps)(PortafolioSummary);