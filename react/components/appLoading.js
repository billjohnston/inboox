import React from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'

const rotate = Radium.keyframes({
    '100%': {
        transform: 'rotate(360deg)'
    }
}, 'rotate')

const dashColor = Radium.keyframes({
    '0%': {
        strokeDasharray: '1,200',
        strokeDashoffset: '0'
    },
    '50%': {
        strokeDasharray: '89,200',
        strokeDashoffset: '-35px'
    },
    '100%': {
        strokeDasharray: '89,200',
        strokeDashoffset: '-124px'
    },
    '100%, 0%': {
        stroke: '#d62d20'
    },
    '40%': {
        stroke: '#0057e7'
    },
    '66%': {
        stroke: '#008744'
    },
    '80%, 90%': {
        stroke: '#ffa700'
    }
}, 'dashColor')

var styles = {

    container: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'white',
        zIndex: 2
    },

    loader: {
        position: 'relative',
        width: 100
    },

    fakeBefore: {
        display: 'block',
        paddingTop: '100%'
    },

    circular: {
        animation: 'x 2s linear infinite',
        animationName: rotate,
        height: '100%',
        transformOrigin: 'center center',
        width: '100%',
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        margin: 'auto'
    },

    path: {
        strokeDasharray: '1,200',
        strokeDashoffset: 0,
        animation: 'x 1.5s ease-in-out infinite, y 6s ease-in-out infinite',
        animationName: dashColor,
        strokeLinecap: 'round',
    }
}

@connect(state => ({
    appLoading: state.get('appLoading'),
}))
@Radium
export default class AppLoading extends React.Component {
    render() {
        return (
            <div
                className='layout-column layout-align-center-center'
                style={[styles.container ,{
                    display: this.props.appLoading ? 'flex' : 'none'
                }]}
            >
                <div style={styles.loader}>
                    <div style={styles.fakeBefore}></div>
                    <svg style={styles.circular} viewBox="25 25 50 50">
                        <circle style={styles.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                    </svg>
                </div>
            </div>
        )
    }
}
