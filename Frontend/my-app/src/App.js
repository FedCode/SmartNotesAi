import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../src/pages/Home';
import Header from "./components/Header";
import Footer from "./components/Footer"
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import Dashboard from '../src/pages/Dashboard';
import {Routes, Route} from 'react-router';
import ProtectedRoute from './components/ProtectRoute'
import {AuthProvider} from './context/AuthContext'


function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      </Routes>
      <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
