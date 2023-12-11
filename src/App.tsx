import './App.css'
import { NavBar } from './components'
import { Home } from './pages'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <>
    <Provider store={store}>
      <NavBar/>
      <Home/>
    </Provider>
    </>
  )
}

export default App
