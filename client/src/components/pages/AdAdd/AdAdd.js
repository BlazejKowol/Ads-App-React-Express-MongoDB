import { useSelector } from "react-redux";
import { getUser } from "../../../redux/userRedux";
import { Navigate } from "react-router";

const AdAdd = () => {
    
  const user = useSelector(getUser);
  
  return (
      <>
        <h1>Ad Add</h1>
      </>
    );
  };
  
    export default AdAdd;