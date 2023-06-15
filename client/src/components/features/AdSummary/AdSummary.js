import { NavLink } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import { Col, Button } from "react-bootstrap";
import { IMGS_URL } from "../../../config";

const AdSummary = ({title, image, location, _id}) => {

  return (
        <>
            <Col key={_id}>
                <div className={"border border-2 rounded py-2 ps-2 mx-1 mb-2"}>  
                    <h3 className="h4">{title}</h3>
                    <h4 className="small"><b>Image: </b></h4>
                    <h4 className="small"><b>Location: </b>{location}</h4>     
                    <Nav.Link as={NavLink} className="text-decoration-none text-light px-1" to={"/ad/" + _id}>
                        <Button type="submit" className="border border-none bg-primary rounded py-1">Read more</Button>
                    </Nav.Link>
                </div>
            </Col>
        </>
  );
  };
  
    export default AdSummary;


    //<img src={IMGS_URL + ad.image} alt="cover_photo" />