import React from 'react';
import TaxPopup from "../TaxPopup";

import './style.css'

export default class App extends React.Component {

    state = {
        showTaxPopup: false
    };

    toggleTaxPopup = (status) => {
        this.setState({showTaxPopup: status})
    };

    render() {
        return (
            <div className={this.state.showTaxPopup ? 'taxApp popup-open' : 'taxApp popup-close'}>
                <button id="openTaxPopup" onClick={() => {this.setState({showTaxPopup: !this.state.showTaxPopup})}}>
                    Налоговый вычет
                </button>
                <TaxPopup
                    toggleTaxPopup={this.toggleTaxPopup}
                    popupStatus={this.state.showTaxPopup}
                />
            </div>
        )
    }
}
