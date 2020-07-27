import React, {useState, useEffect } from "react";

import { Redirect } from "react-router-dom";
import localAPI from "../api/localAPI";
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function NavBar() {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  
  useEffect(() => {
    localAPI
      .get(`/users`)
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function showProfile(userId) {
  //   return(
  //     <Redirect to={`/profile/user/${userId}`}></Redirect>
  //   )
  // }

  return (
    <Autocomplete
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => (
        <Redirect to={`/profile/user/${option._id}`} ></Redirect>
      )}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default NavBar;
