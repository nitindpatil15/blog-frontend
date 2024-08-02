import './App.css';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './Login';
import Blog from './component/Blog';
import Signup from './component/Signup';
import CreatePost from './component/CreatePost';

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
      </Routes>
    </Router>
    </div>
  );
}

export default App;
