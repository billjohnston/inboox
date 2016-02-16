import React from 'react'
import Radium from 'radium'
import remote from 'remote'
import { connect } from 'react-redux'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import PowerSettingsNew from 'material-ui/lib/svg-icons/action/power-settings-new'
import { changeTab, logOut, setAppLoading} from '../actions/appActions'

var styles = {
    logOutButton: {
        margin: '5px 5px 5px 5px',
        boxShadow: 'none'
    }
}

@connect(state => ({}))
@Radium
export default class LogoutButton extends React.Component {

    logOut(){
        var self = this
        self.props.dispatch(
            setAppLoading(true)
        )
        remote.session.defaultSession.clearStorageData({}, function(){
            self.props.dispatch(
                logOut()
            )
            self.props.dispatch(
                changeTab('loginTab')
            )
            self.props.dispatch(
                setAppLoading(false)
            )
        })
    }

    render() {
        return (
            <FloatingActionButton
                backgroundColor='#db4437'
                style={styles.logOutButton}
                onTouchTap={this.logOut.bind(this)}
            >
                <PowerSettingsNew />
            </FloatingActionButton>
        )
    }
}
