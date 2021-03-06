import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/reducer'
import App from './containers/app'
import {StyleRoot} from 'radium'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const store = createStore(rootReducer)

render(
    <StyleRoot className='flex layout-column layout-fill'>
        <Provider store={store}>
            <App />
        </Provider>
    </StyleRoot>,
    document.getElementById('app')
)
