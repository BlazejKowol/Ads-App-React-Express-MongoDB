import { useSelector } from "react-redux";
import { getAds } from "../../../redux/adsRedux";
import { Link } from "react-router-dom";
import { Col, Button } from "react-bootstrap";

const AllAds = () => {

  const ads = useSelector(getAds);

  return (
        <section className="row">
        {ads.map(ad => (
            <Col key={ad._id} xs="12" md="6" className="col-lg-4">
                <div className={"border border-2 rounded py-2 ps-2 mx-1 mb-2"}>  
                    <h3 className="h4">{ad.title}</h3>
                    <h4 className="small"><b>User: </b>{ad.user.login}</h4>
                    <h4 className="small"><b>Image: </b>{ad.image}</h4>
                    <h4 className="small"><b>Location: </b>{ad.location}</h4>
                    <p>{ad.description}</p>      
                    <Link className="text-decoration-none text-light px-1" key={ad._id} to={"/ad/edit/" + ad._id}>
                        <Button type="submit" className="border border-none bg-primary rounded py-1">Read more</Button>
                    </Link>
                </div>
            </Col>
        ))}
        </section>
  );
};

  export default AllAds;