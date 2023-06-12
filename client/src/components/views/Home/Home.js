import { Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import AllAds from "../../features/AllAds/AllAds";

const Home = () => {
  return (
    <>
    <section>
        <div className="d-flex justify-content-between my-4">
            <h1 className="h2">Ads Board</h1>
                <Nav.Link as={NavLink} to={"/ad/add"} className="text-decoration-none text-info">
                  <button className="btn border-info bg-transparent py-2 px-3 mx-1 text-info">Add New Ad</button>
                </Nav.Link>
        </div>
        </section>
      <AllAds />
    </>
  );
};

  export default Home