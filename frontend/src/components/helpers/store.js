import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'


function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state',serializedState);
    } catch(e){
        console.log(e);
    }
}

function loadFromLocalStorage(state) {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch(e){
        console.log(e);
        return undefined
    }
}

const rootReducer = combineReducers({
    reducer
})

const persistedState = loadFromLocalStorage()
const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(thunk)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(()=> saveToLocalStorage(store.getState()))

export default store;
