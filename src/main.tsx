import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AxiosInterceptor } from './interceptors/axiox.interceptor.tsx'

AxiosInterceptor();
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
