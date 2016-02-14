import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Sidebar from '../components/sidebar';
import AppLoading from '../components/appLoading';
import LoginTab from '../components/loginTab';
import AccountCheck from '../components/accountCheck';
import Inboxes from '../components/inboxes';

import remote from 'remote';

export default class App extends Component {

    componentDidMount(){

        var menu = new remote.Menu();
        menu.append(new remote.MenuItem(
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" }
        ))
        menu.append(new remote.MenuItem(
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" }
        ))
        menu.append(new remote.MenuItem(
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" }
        ))
        menu.append(new remote.MenuItem(
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ))

        window.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            menu.popup(remote.getCurrentWindow());
        });

    }

    render(){
        return(
            <div className='flex layout-row layout-fill'>
                <AccountCheck />
                <AppLoading />

                <Sidebar />

                <LoginTab />
                <Inboxes />
            </div>
        )
    }

}
