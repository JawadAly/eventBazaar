import React from 'react';
import Button from '@mui/material/Button';

const SimpleMUIButton = ({variant,content,type,passesFunc,disabled}) =>{
    return <Button disabled={disabled} onClick={passesFunc} type={type} variant={variant} style={{backgroundColor:'#bc2649',color:'#ffffff'}}>{content}</Button>;
}
export default SimpleMUIButton;