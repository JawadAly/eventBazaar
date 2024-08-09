import React from 'react';
import Button from '@mui/material/Button';

const SimpleMUIButton = ({variant,content}) =>{
    return <Button variant={variant} style={{backgroundColor:'#bc2649',color:'#ffffff'}}>{content}</Button>;
}
export default SimpleMUIButton;