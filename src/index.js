import React from 'react'
import { render } from 'react-dom'
import getStore from 'arrow-of-time/store'
import styles from './index.css'

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
      state
  }
}

const store = getStore(reducer, initialState)

store.subscribe(({ getAction, getState }) => {
  console.log(getAction().type, getAction().payload, getState())
})

const addInput = (e) => store.dispatch({
  type: 'ADD_INPUT',
  payload: e.target.value
})

const itemDone = (index) => store.dispatch({
  type: 'ITEM_DONE',
  payload: index
})

const addItem = () => store.dispatch({
  type: 'ADD_ITEM'
})

window.store = store

const App = React.createClass({
  getInitialState () {
    return this.props.store.getState()
  },

  componentDidMount () {
    store.subscribe(({ getState }) => {
      this.setState(getState())
    })
  },

  render () {
    const { items, input } = this.state

    return (
      <div>
        <input value={input || ''} onChange={addInput} />
        <button onClick={addItem}>Add</button>

        <ul className={styles.list}>
          {items.map(({label, done}, index) => (
            <li key={label}>
              {label}{done ? ' - DONE' : (
                <button onClick={() => itemDone(index)}>
                  Do
                </button>
              )}
            </li>
          ))}
        </ul>

        <hr />
        <h2>Delorean</h2>
        <button onClick={() => store.update((t) => t.rewind())}>Flash back</button>
        <button onClick={() => store.update((t) => t.redo())}>Flash forward</button>
      </div>
    )
  }
})

render(
  <App store={store} />
  , document.getElementById('test-arrow-of-time')
)
