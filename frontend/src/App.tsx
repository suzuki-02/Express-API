import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Container from './components/Container';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateProfile from './pages/UpdateProfile';

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
      <ToastContainer />
    </Container>
  );
};

export default App;
