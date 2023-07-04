import { useSelector } from "react-redux";
import { getUser } from "../../../redux/userRedux";
import { useNavigate} from "react-router";
import { useDispatch } from "react-redux";
import AdForm from "../../features/AdForm/AdForm";
import { addAdsRequest } from "../../../redux/adsRedux"

const AdAdd = () => {
    
  const user = useSelector(getUser);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = ad => {
      dispatch(addAdsRequest(ad));
      navigate("/");
  };

  return (
    <>
      {user === null && (<h1>You need to log in first!</h1>)}
      {user && (<AdForm 
        action={handleSubmit} 
        actionText="Add post"
        />)}
    </> 
  );
};
  
    export default AdAdd;