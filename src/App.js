import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginForm from './pages/Form';

function App() {
  return (
      <div className='App'>
        <LoginForm></LoginForm>

      </div >
  );
}

export default App;
