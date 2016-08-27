import React from 'react'
import { connect } from 'react-redux'
import styles from './index.css'

function App ({ items, input, onAdd, onInput, onDone }) {
  return (
    <div>
      <input value={input || ''} onChange={onInput} />
      <button onClick={onAdd}>Add</button>

      <ul className={styles.list}>
        {items.map(({label, done}, index) => (
          <li key={label}>
            {label}{done ? ' - DONE' : (
              <button onClick={() => onDone(index)}>
                Do
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  items: state.items,
  input: state.input
})

const mapDispatchToProps = (dispatch) => ({
  onAdd: () => dispatch({
    type: 'ADD_ITEM'
  }),
  onInput: (e) => dispatch({
    type: 'ADD_INPUT',
    payload: e.target.value
  }),
  onDone: (index) => dispatch({
    type: 'ITEM_DONE',
    payload: index
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
