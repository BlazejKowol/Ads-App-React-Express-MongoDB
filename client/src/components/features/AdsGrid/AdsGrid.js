import AdSummary from "../AdSummary/AdSummary";
import { Col, Row } from "react-bootstrap";

const AdsGrid = ({ads}) => {

  if (ads.length === 0) return 'No ads to display'

  return (
    <Row>
      {ads.map(ad =>
        <Col key={ad._id}>
            <AdSummary {...ad} />
        </Col>
        )}
    </Row>
  );
};

  export default AdsGrid;