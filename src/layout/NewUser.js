import React from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { spacing } from '@material-ui/system';
import { Box } from "@material-ui/core";
// import NavBar from "./NavBar";

const NewUser = () => {

  return (

    <>

      {/* <Box m="40em"> */}
      <Box class="box">
        <FormControl>
          <TextField id="standard-basic" label="Full name" />
          <TextField id="standard-basic" label="Email Address" />
          <TextField id="standard-basic" label="Password" />
          <TextField id="standard-basic" label="Confirm Password" />
          <br></br>
          <Button className="button" variant="contained" >Register</Button>
        </FormControl>
      </Box>
    </>
  );
};



export default NewUser;