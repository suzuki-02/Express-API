import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/shared/ProtectedRoute';
import UpdateProfile from './pages/auth/UpdateProfile';
import DetailArticle from './pages/articles/Detail';
import CreateArticle from './pages/articles/Create';
import EditArticle from './pages/articles/Edit';
import ListArticles from './pages/articles/List';
import Layout from './layout/Layout';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/articles">
            <Route index element={<ListArticles />} />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <CreateArticle />
                </ProtectedRoute>
              }
            />
            <Route path=":id">
              <Route index element={<DetailArticle />} />
              <Route
                path="edit"
                element={
                  <ProtectedRoute>
                    <EditArticle />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Route>

        {/* Auth-only pages: no layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-profile" element={<UpdateProfile />} />

        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
