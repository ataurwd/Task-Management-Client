import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import './index.css'

function App() {
  return (
    <BrowserRouter>  {/* Wrap your app in BrowserRouter */}
      <Router />  {/* Use the AppRoutes component that holds your routes */}
    </BrowserRouter>
  );
}

export default App;
