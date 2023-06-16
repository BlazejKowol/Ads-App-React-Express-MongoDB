import { Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import {Col, Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { editAdsRequest, getAdById } from "../../../redux/adsRedux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getUser } from "../../../redux/userRedux";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { removeAdsRequest } from "../../../redux/adsRedux";
import { IMGS_URL } from "../../../config";
import { Navigate } from "react-router";
import '../../../styles/global.scss';

const Ad = () => {
    
  const {id} = useParams();
  const ad = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const adRemove = e => {
    e.preventDefault();
    dispatch(removeAdsRequest(id))
  };


  if(!ad) return <Navigate to="/" />

  return (
    <>
      <Col key={id}>
        <div className={"border border-2 rounded py-2 px-2 mx-1 mb-2"}>
          <Row>
          <h3 className="h4 col-6">{ad.title}</h3>
          <div className="d-flex col-6 justify-content-end">
            {user === ad.user.login && (<Nav.Link as={NavLink} className="col-2 text-decoration-none text-light px-1" key={ad._id} to={"/ad/edit/" + ad._id} >
                <Button type="submit" className="btn border-none bg-primary rounded p-2 w-100">Edit</Button>
                </Nav.Link>
              )}
              {user === ad.user.login && (<Button onClick={handleShow} className="col-2 btn border-danger bg-transparent py-0 mx-1">
                <p className="m-1 text-danger">Delete</p>
              </Button>)}
            </div>
          </Row>
          <h4 className="small"><b>Description: </b>{ad.content}</h4>
          <h4 className="small"><b>Date: </b>{ad.date}</h4>
          <div className='photoCover'>
            <img className="photo" src={IMGS_URL + ad.image} alt="ad_photo" />
          </div>
          <h4 className="small"><b>Location: </b>{ad.location}</h4>
          <h4 className="small"><b>Price: </b>{ad.price}</h4>
          <h4 className="small"><b>User: </b>{ad.user.login}</h4>
          <h4 className="small"><b>Avatar: </b></h4>
          <div className='photoCover'>
            <img className="photo" src={IMGS_URL + ad.user.avatar} alt="avatar" />
          </div>
          <h4 className="small"><b>Number: </b>{ad.user.number}</h4>
          
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              This operation will completly remove this ad. 
              Do you want to proceed?
              </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary py-0 mx-1" onClick={handleClose}>
              <p className="m-2 text-light">Cancel</p>
              </button>
              <button className="btn btn-danger py-0 mx-1" onClick={adRemove}>
              <p className="m-2 text-light">Remove</p>
              </button>
            </Modal.Footer>
          </Modal>

        </div>
      </Col>
    </>
    );
  };
  
    export default Ad;