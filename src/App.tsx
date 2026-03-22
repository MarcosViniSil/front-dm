import { Routes, Route } from 'react-router-dom';
import About from './pages/About/About';
import Dashboard from './pages/Dashboard/Dashboard';
import Animals from './pages/Animals/Animals';
import NotFound from './pages/NotFound/NotFound';
import Navbar from './components/Navbar/Navbar';

function App() {
  return <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Animals />} />
        <Route path="/animal/:id" element={<NotFound />} />
        <Route path="/About" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>;
}

export default App;
