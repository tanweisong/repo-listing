import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Breadcrumbs,
  Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/core/styles";

const MyBreadcrumbs = styled(Breadcrumbs)({
  "margin-left": "1rem",
  "margin-top": "1rem"
});

function ReadMe(props) {
  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Repositories Listing</Typography>
        </Toolbar>
      </AppBar>
      <MyBreadcrumbs id="readMeBreadCrumbs" aria-label="breadcrumb">
        <Link
          id="readme-username"
          color="inherit"
          to="/"
          onClick={props.clearState}
        >
          {props.username}
        </Link>
        <Link id="readme-repo" color="inherit" to="/repositories">
          {props.repoName}
        </Link>
        <Typography color="textPrimary">README.md</Typography>
      </MyBreadcrumbs>
      <Divider />
      <pre>{props.readMe}</pre>
    </div>
  );
}

export default ReadMe;
