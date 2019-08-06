import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    textAlign: "left",
    margin: "0 auto"
  },
  media: {
    height: 140
  }
});

const User = ({ user, deleteUser }) => {
  console.log(user);

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.bio}
          </Typography>
          <Typography variant="body3" color="textSecondary" component="p">
            Date created: {user.created_at}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => deleteUser(user.id)}>Delete</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default User;
