import React from 'react';
import Radium from 'radium'
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { changeTab } from '../actions/appActions';

var styles = {
    addAccountButton: {
        margin: '5px 5px 0 5px',
        boxShadow: 'none'
    }
}

@connect(state => ({}))
@Radium
export default class AddAccountButton extends React.Component {
    render() {

        return (
            <FloatingActionButton
                backgroundColor='#db4437'
                style={styles.addAccountButton}
                onTouchTap={() => this.props.dispatch(
                    changeTab('loginTab')
                )}
            >
                <ContentAdd />
            </FloatingActionButton>
        )

    }
}
