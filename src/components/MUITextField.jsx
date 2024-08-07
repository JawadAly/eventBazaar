import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
// import PersonIcon from "@mui/icons-material/Person";
import InputAdornment from "@mui/material/InputAdornment";

// const MUITextField = ({ val, changeEvent, name, type, label, startAdornmentIcon: StartAdornmentIcon }) => {
//   return (
//     <>
//       <FormControl sx={{ m: 1 }} variant="outlined">
//         <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
//         <OutlinedInput
//           id={`outlined-adornment-${name}`}
//           required
//           value={val}
//           onChange={changeEvent}
//           name={name}
//           type={type}
//           startAdornment={
//             StartAdornmentIcon && (
//             <InputAdornment position="start">
//               <StartAdornmentIcon />
//             </InputAdornment>
//           )
//           }
//           label={label}
//         />
//       </FormControl>
//     </>
//   );
// };
// export default MUITextField;


const MUITextField = ({ val, changeEvent, name, type, label, startAdornmentIcon: StartAdornmentIcon }) => {
    return (
      <>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
          <OutlinedInput
            id={`outlined-adornment-${name}`}
            required
            value={val}
            onChange={changeEvent}
            name={name}
            type={type}
            startAdornment={
              StartAdornmentIcon && (
              <InputAdornment position="start">
                <StartAdornmentIcon />
              </InputAdornment>
            )
            }
            label={label}
          />
        </FormControl>
      </>
    );
  };
  export default MUITextField;
  