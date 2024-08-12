import React from 'react';

const CategIcons = ({categicon:CategIcon}) =>{
    return CategIcon ? <CategIcon sx={{fontSize:50}}/>: null;
}
export default CategIcons;