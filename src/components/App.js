import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange
} from '../store/interactions';
import { contractsLoadedSelector } from '../store/selectors';
import Navbar from './Navbar';
import Content from './Content';

class App extends React.Component {

  componentDidMount() {
    this.loadBlockchainData(this.props.dispatch);
  }

  async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch);
    await web3.eth.net.getNetworkType();
    const networkId = await web3.eth.net.getId();
    await loadAccount(web3, dispatch);
    const token = await loadToken(web3, networkId, dispatch);
    if (!token) {
      window.alert('Token smart contract not detected on the current network. Please select another network with MetaMask.');
      return;
    }
    const exchange = await loadExchange(web3, networkId, dispatch);
    if (!exchange) {
      window.alert('Exchange smart contract not detected on the current network. Please select another network with MetaMask.');
      return;
    }
  }

  render () {
    return (
      <div>
        <Navbar />
        { this.props.contractsLoaded ? <Content /> : <div className="content"></div> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contractsLoaded: contractsLoadedSelector(state)
  };
}

export default connect(mapStateToProps)(App);
