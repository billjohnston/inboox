import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import AccountButton from './accountButton'
import LogoutButton from './logoutButton'
import AddAccountButton from './addAccountButton'

var styles = {
    sideBar: {
        width: 75,
        maxWidth: 75,
        minWidth: 75,
        backgroundColor: '#3262ba'
    }
}

@connect(state => ({
    activeTab: state.get('activeTab'),
    accounts: state.get('accounts')
}))
@Radium
export default class Sidebar extends React.Component {

    render() {

        var inboxTab = (this.props.activeTab == 'inbox')

        return (
            <div
                className='layout-column'
                style={[styles.sideBar, {
                    display: this.props.accounts.length ? 'inherit' : 'none'
                }]}
            >

                <div className='layout-column layout-align-start-center'>
                    {this.props.accounts.map((account) => {
                        return(
                            <AccountButton
                                key={account.id}
                                activeTab={this.props.activeTab}
                                account={account}
                            />
                        )
                    })}
                </div>

                <div className='flex layout-column layout-align-end-center'>

                    <AddAccountButton />

                    <LogoutButton />

                </div>

            </div>
        )
    }
}
