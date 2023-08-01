// System 
import { Routes, Route } from 'react-router-dom';
import Container from './components/layout/Container/Container';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logIn } from './redux/usersRedux';

// Pages
import Home from './components/pages/Home/Home';
import Ad from './components/pages/Ad/Ad';
import AdAdd from './components/pages/AdAdd/AdAdd';
import AddEdit from './components/pages/AdEdit/AdEdit';
import AdRemove from './components/pages/AdRemove/AdRemove';
import Search from './components/pages/Search/Search';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import NotFound from './components/pages/NotFound/NotFound';
import Register from './components/pages/Register/Register';
import AddAds from './components/pages/AddAds/AddAds';
import AdPage from './components/pages/AdPage/AdPage';
import EditPages from './components/pages/EditPages/EditPages';


// Vievs
import Footer from './components/views/Footer/Footer';
import Navbar from './components/views/NavBar/NavBar';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      dispatch(logIn({ login: loggedInUser }));
    }
  }, [dispatch]);


  return (
    <main>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/ad/add" element={<AdAdd />} />
          <Route path="/ad/edit/:id" element={<AddEdit />} />
          <Route path="/ad/remove/:id" element={<AdRemove />} />
          <Route path="/search/:searchPhrase" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/ads/add" element={<AddAds />} />
          <Route path="/ads/:id" element={<AdPage />}/>
          <Route path="/ads/edit/:id" element={<EditPages />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />

    </main>
  )
};

export default App;