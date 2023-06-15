import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateToString from '../../../utils/dateToString';
import { useForm } from "react-hook-form";

const AdForm = ({ action, actionText, ...props }) => {
    
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [date, setDate] = useState(props.date || '');
  const [image, setImage] = useState(props.image || null);
  const [price, setPrice] = useState(props.price || '');
  const [location, setLocation] = useState(props.location || '');
  const [user, setUser] = useState(props.user || '');

  const [dateError, setDateError] = useState(false);
  
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = () => {
    setDateError(!date);
    if(date) {
    action({title, content, date, image, price, location, user});
    }
};
  
  return (
      <Form onSubmit={validate(handleSubmit)}>

        <Form.Label>Title</Form.Label>
            <Form.Control 
            {...register("title", { required: true, minLength: 10, maxLength: 50 })} 
            className="mb-3 w-50" 
            value={title} 
            placeholder="Enter Title" 
            type="text" 
            onChange={e => setTitle(e.target.value)} />
            {errors.title && <small className="d-block form-text text-danger mt-2">This field is required</small>}

        <Form.Label>Content</Form.Label>
            <Form.Control 
            {...register("content", { required: true, minLength: 20, maxLength: 1000 })}
            as="textarea" 
            rows={4}  
            className="mb-3 w-50" 
            value={content} 
            placeholder="Leave a comment here..." 
            type="text" 
            onChange={e => setContent(e.target.value)} />
            {errors.content && <small className="d-block form-text text-danger mt-2">This field is required</small>}  
          
        <Form.Label>Date</Form.Label>
            <DatePicker 
            className="mb-3 w-50" 
            value={date} 
            onChange={(date) => setDate(dateToString(date))} />
            {dateError && <small className="d-block form-text text-danger mt-2">Date can't be empty</small>}

        <Form.Label>Image</Form.Label>
            <Form.Control
            {...register("image", { required: true})}  
            type="file" 
            onChange={e => setImage(e.target.files[0])} />

        <Form.Label>Price</Form.Label>
            <Form.Control 
            {...register("price", { required: true})} 
            className="mb-3 w-50" 
            value={parseInt(price)} 
            placeholder="Select your price" 
            type="text" 
            onChange={e => setPrice(parseInt(e.target.value))} />
            {errors.price && <small className="d-block form-text text-danger mt-2">This field is required</small>}    

        <Form.Label>Location</Form.Label>
            <Form.Control 
            {...register("location", { required: true})} 
            className="mb-3 w-50" 
            value={location} 
            placeholder="Select your address" 
            type="text" 
            onChange={e => setLocation(e.target.value)} />
            {errors.location && <small className="d-block form-text text-danger mt-2">This field is required</small>}

        <Form.Label>User</Form.Label>
            <Form.Control 
            {...register("user", { required: true})} 
            className="mb-3 w-50" 
            value={user} 
            type="text" 
            onChange={e => setUser(e.target.value)} />
            {errors.user && <small className="d-block form-text text-danger mt-2">This field is required</small>}    

        <Button type="submit" className="border border-none bg-primary rounded py-1 mt-1">
            <p className="text-light m-0">{actionText}</p>
        </Button>

      </Form>
    );
  };
  
    export default AdForm;