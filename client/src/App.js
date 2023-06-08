import { Container } from "react-bootstrap";
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";

const App = () => {
  return (
    <Container>
      <Header />
        <h1>Hello World!</h1>
      <Footer />
    </Container>
  );
}

export default App;
