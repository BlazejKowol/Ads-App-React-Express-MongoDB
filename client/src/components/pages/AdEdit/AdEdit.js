import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/userRedux";
import { useNavigate} from "react-router";
import { useDispatch } from "react-redux";
import { editAdsRequest, getAdById } from "../../../redux/adsRedux";
import AdForm from "../../features/AdForm/AdForm";

const AdEdit = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const adById = useSelector(state => getAdById(state, id))

  const handleSubmit = ad => {
      dispatch(editAdsRequest({...ad}, id));
      navigate("/");
  };

  return (
    <>
      {user === null && (<h1>You need to log in first!</h1>)}
      {user && (<AdForm 
      action={handleSubmit} 
      actionText="Edit post"
      title={adById.title}
      content={adById.content} 
      date={adById.date} 
      image={adById.image} 
      price={adById.price} 
      location={adById.location}  
      />)}
    </> 
  );
};
  
    export default AdEdit;