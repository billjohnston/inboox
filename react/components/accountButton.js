import React from 'react';
import Radium from 'radium'
import { connect } from 'react-redux';

import { changeTab, setActiveInbox} from '../actions/appActions';

var styles = {
    accountButton: {
        width: 56,
        height: 56,
        backgroundSize: '100%',
        borderRadius: '50%',
        position: 'relative',
        margin: '5px 5px 0 5px',
    }
}

@connect(state => ({}))
@Radium
export default class AccountButton extends React.Component {

    setAccount(isActive, index){
        if(this.props.activeTab != 'inbox'){
            this.props.dispatch(
                changeTab('inbox')
            );
        }
        if(!isActive){
            this.props.dispatch(
                setActiveInbox(index)
            );
        }
    }

    render() {

        var active = this.props.activeTab == 'inbox' && this.props.account.active;

        var accountSpecificStyles = {
            boxShadow: active ? 'inset 0 0 0 2px white' : 'none',
            backgroundImage: `url(${this.props.account.image})`,
            cursor: active ? 'auto' : 'pointer'
        }

        if(active){
            accountSpecificStyles.opacity = 1
        }
        else{
            accountSpecificStyles[':hover'] = {
                opacity: 0.8
            }
            accountSpecificStyles.opacity = 0.6
        }

        return (
            <div
                onTouchTap={
                    this.setAccount.bind(
                        this,
                        this.props.account.active,
                        this.props.account.id
                    )
                }
                style={[styles.accountButton, accountSpecificStyles]}
            ></div>
        )

    }
}
