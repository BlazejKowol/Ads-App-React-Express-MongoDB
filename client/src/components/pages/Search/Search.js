import { useParams } from "react-router-dom";
import AdsGrid from "../../features/AdsGrid/AdsGrid";
import { useSelector } from "react-redux";
import { getAdsBySearch } from "../../../redux/adsRedux";
import { Row } from "react-bootstrap";

const Search = () => {

  const { searchPhrase } = useParams();
  const filteredAds = useSelector(state => getAdsBySearch(state, searchPhrase))

    return (
      <>
      <Row>
        <h1>Search Results for: {searchPhrase}</h1>
      </Row>
        <AdsGrid ads={filteredAds}/>
      </>
    );
  };
  
    export default Search;