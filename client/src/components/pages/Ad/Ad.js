import { Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import {Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAdById } from "../../../redux/adsRedux";
import { useParams } from "react-router-dom";

const Ad = () => {
    
  const {id} = useParams();
  const ad = useSelector(state => getAdById(state, id));
  console.log(ad);

  return (
    <>
      <Col key={id}>
        <div className={"border border-2 rounded py-2 ps-2 mx-1 mb-2"}>  
          <h3 className="h4">{ad.title}</h3>
          <h4 className="small"><b>Image: </b></h4>
          <h4 className="small"><b>Location: </b>{ad.location}</h4>     
          <Nav.Link as={NavLink} className="text-decoration-none text-light px-1" key={ad._id} to={"/ad/edit/" + ad._id}>
            <Button type="submit" className="border border-none bg-primary rounded py-1">Edit</Button>
          </Nav.Link>
        </div>
      </Col>
    </>
    );
  };
  
    export default Ad;