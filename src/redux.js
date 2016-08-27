import React from 'react'
import { render } from 'react-dom'
import getStore from 'arrow-of-time/store'
import App from './container'
import { Provider } from 'react-redux'

const initialState = {
  items: [
    { label: 'Buy milk', done: false }
  ]
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ITEM_DONE':
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === payload
            ? {...item, done: true}
            : item
        )
      }

    case 'ADD_ITEM':
      return state.input !== '' && state.input != null
        ? {
          ...state,
          items: [...state.items, {label: state.input, done: false}],
          input: ''
        }
        : state

    case 'ADD_INPUT':
      return {
        ...state,
        input: payload
      }

    default:
      return {...state}
  }
}

const store = getStore(reducer, initialState)

window.store = store

store.subscribe(({ getAction, getState }) => {
  console.log(getAction().type, getAction().payload, getState())
})

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('test-arrow-of-time')
)
