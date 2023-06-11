import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/views/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {

  /* const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatus()), [dispatch]); */


  return (
    <Container>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/ad/:id" element={<Ad />} /> */}
          {/* <Route path="/ad/add" element={<AdAdd />} /> */}
          {/* <Route path="/ad/edit/:id" element={<AdEdit />} /> */}
          {/* <Route path="/search/:searchPhrase" element={<Search />} /> */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes> 
      <Footer />
    </Container>
  );
}

export default App;
