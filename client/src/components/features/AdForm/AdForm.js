import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateToString from '../../../utils/DateToString';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { API_URL } from '../../../config';

const AdForm = ({ action, actionText, ...props }) => {
    
  const [title, setTitle] = useState(props.title || '');
  const [content, setContent] = useState(props.content || '');
  const [date, setDate] = useState(props.date || '');
  const [image, setImage] = useState(props.image || null);
  const [price, setPrice] = useState(props.price || 0);
  const [location, setLocation] = useState(props.location || '');

  const [dateError, setDateError] = useState(false);
  
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = () => {
    setDateError(!date);
    if(date) {
    action({title, content, date, image, price, location});
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
            placeholder="Select the date"
            value={date} 
            onChange={(date) => setDate(dateToString(date))} />
            {dateError && <small className="d-block form-text text-danger mt-2">Date can't be empty</small>}

        <Form.Label>Image</Form.Label>
            <Form.Control
            {...register("image", { required: true})}
            className="mb-3 w-50"  
            type="file" 
            onChange={e => setImage(e.target.files[0])} />
            {errors.image && <small className="d-block form-text text-danger mt-2">You need to set an image</small>}

        <Form.Label>Price</Form.Label>
            <Form.Control 
            {...register("price", { required: true, min: 1})} 
            className="mb-3 w-50" 
            value={price} 
            placeholder="Select your price" 
            type="number" 
            onChange={e => setPrice((e.target.value))} />
            {errors.price && <small className="d-block form-text text-danger mt-2">Price can't be set at 0</small>}    

        <Form.Label>Location</Form.Label>
            <Form.Control 
            {...register("location", { required: true})} 
            className="mb-3 w-50" 
            value={location} 
            placeholder="Select your address" 
            type="text" 
            onChange={e => setLocation(e.target.value)} />
            {errors.location && <small className="d-block form-text text-danger mt-2">This field is required</small>}

        <Button type="submit" className="border border-none bg-primary rounded py-1 mt-1">
            <p className="text-light m-0">{actionText}</p>
        </Button>

      </Form>
    );
  };
  
    export default AdForm;