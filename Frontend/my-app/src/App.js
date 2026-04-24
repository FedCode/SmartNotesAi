import logo from './logo.svg';
import './App.css';
import Home from '../src/pages/Home';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import {Routes, Route} from 'react-router';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      
       
    </div>
  );
}

export default App;
