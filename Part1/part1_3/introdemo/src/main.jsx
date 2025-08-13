/*import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)*/


/*import ReactDOM from 'react-dom/client'
import First from './First'

let counter = 1

const root = ReactDOM.createRoot(document.getElementById('root'))

const refresh = () => {
  root.render(<First counter={counter} />)
}

setInterval(() => {
  refresh()
  counter += 1
}, 1000)
*/

import ReactDOM from 'react-dom/client'
import Example from './Example'

ReactDOM.createRoot(document.getElementById('root')).render(<Example />)