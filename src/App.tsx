import { Routes, Route } from 'react-router-dom';
import About from './pages/About/About';
import Dashboard from './pages/Dashboard/Dashboard';
import Animals from './pages/Animals/Animals';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Navbar from './components/Navbar/Navbar';
import Quiz from './pages/Quiz/Quiz';

function App() {
  return <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Animals />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>;
}

export default App;
