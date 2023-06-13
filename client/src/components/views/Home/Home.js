import { Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/userRedux';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { getAds } from "../../../redux/adsRedux";

const Home = () => {

  const ads = useSelector(getAds);
  const user = useSelector(getUser);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  }

  return (
    <>
    <section>
        <div className="d-flex justify-content-between my-4">
            <h1 className="h2">Ads Board</h1>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Group controlId="formSearch" />
              <Form.Control className="mx-2" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form>
            {user && (<Nav.Link as={NavLink} to={"/ad/add"} className="text-decoration-none text-info">
                  <button className="btn border-info bg-transparent py-2 px-3 mx-1 text-info">Add New Ad</button>
                </Nav.Link>
            )}
        </div>
        </section>
      <AdsGrid ads={ads} />
    </>
  );
};

  export default Home