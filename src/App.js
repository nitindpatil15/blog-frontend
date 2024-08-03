import './App.css';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Navbar from './component/Navbar';
import Blog from './component/Blog';
import Signup from './component/Signup';
import CreatePost from './component/CreatePost';
import Login from './component/Login';
import Footer from './component/Footer';
import Getuser from './component/Getuser';

function App() {
  return (
    <div className="app bg-black">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Blog/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blog/createblog" element={<CreatePost/>}/>
        <Route path="/user/profile" element={<Getuser/>}/>
      </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
