import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'

import { changeTab, setActiveInbox} from '../actions/appActions'

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

    constructor(props) {
        super(props)
        this.state = {hovered: false}
    }

    setHovered(hovered){
        this.setState({hovered: hovered})
    }

    setAccount(isActive, index){
        if(this.props.activeTab != 'inbox'){
            this.props.dispatch(
                changeTab('inbox')
            )
        }
        if(!isActive){
            this.props.dispatch(
                setActiveInbox(index)
            )
        }
    }

    render() {

        var active = this.props.activeTab == 'inbox' && this.props.account.active

        var accountSpecificStyles = {
            boxShadow: active ? 'inset 0 0 0 2px white' : 'none',
            backgroundImage: `url(${this.props.account.image})`,
            cursor: active ? 'auto' : 'pointer'
        }

        return (
            <div
                onMouseEnter={this.setHovered.bind(this, true)}
                onMouseLeave={this.setHovered.bind(this, false)}
                onTouchTap={
                    this.setAccount.bind(
                        this,
                        this.props.account.active,
                        this.props.account.id
                    )
                }
                style={[
                    styles.accountButton,
                    accountSpecificStyles,
                    {
                        opacity: active ? 1 : this.state.hovered ? 0.8 : 0.6
                    }
                ]}
            ></div>
        )

    }
}
