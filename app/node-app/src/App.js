import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import User from "./User";
import UserForm from "./UserForm";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function App() {
  const classes = useStyles();
  const [users, setUsers] = useState(null);

  const fetchData = () => {
    axios
      .get("http://localhost:8001/api/users")
      .then(res => {
        console.log("res: ", res);
        setUsers(res.data);
      })

      .catch(err => console.log(err));
  };

  const deleteUser = id => {
    console.log(id);
    axios
      .delete(`http://localhost:8001/api/users/${id}`)
      .then(res => fetchData());
  };

  const addUser = userInfo => {
    axios
      .post("http://localhost:8001/api/users", userInfo)
      .then(res => fetchData());
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(users);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <UserForm addUser={addUser} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <h1>Users List:</h1>

          <Paper className={classes.paper}>
            {users ? (
              users.map(user => <User deleteUser={deleteUser} user={user} />)
            ) : (
              <h2>Loading...</h2>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
