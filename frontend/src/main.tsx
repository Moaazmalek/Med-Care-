import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux'
import store from './redux/store.ts'
createRoot(document.getElementById('root')!).render(
<Provider store={store} >
   <BrowserRouter>
    <App />
    <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
  </BrowserRouter>  
  </Provider>

);
