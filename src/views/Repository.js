import React from "react";
import "../styles/Respository.css";
import {
  AppBar,
  Typography,
  Toolbar,
  ListItem,
  Box,
  List,
  Breadcrumbs,
  Divider,
  Dialog,
  Link,
  CircularProgress
} from "@material-ui/core";
import { Link as RouteLink } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";

const MyBreadcrumbs = styled(Breadcrumbs)({
  "margin-left": "1rem",
  "margin-top": "1rem"
});

function RepositoryList(props) {
  const repos = props.repos;
  const listItems = repos.map(repo => (
    <ListItem key={repo.id} className="repository">
      <Box display="flex" flexDirection="column">
        <Link
          onClick={() => {
            props.readme(repo);
          }}
        >
          {repo.name}
        </Link>
        {repo.hasOwnProperty("parent") && (
          <div className="secondaryDescription">
            Forked from {repo.parent.full_name}
          </div>
        )}

        <Box className="description" display="flex" flexDirection="row">
          {repo.language !== "" && repo.language !== null && (
            <div className="repo-language">{repo.language}</div>
          )}
          {repo.hasOwnProperty("parent") &&
            repo.parent.hasOwnProperty("forks") && (
              <div>
                <SvgIcon className="sourceFork">
                  <path d="M6,2A3,3 0 0,1 9,5C9,6.28 8.19,7.38 7.06,7.81C7.15,8.27 7.39,8.83 8,9.63C9,10.92 11,12.83 12,14.17C13,12.83 15,10.92 16,9.63C16.61,8.83 16.85,8.27 16.94,7.81C15.81,7.38 15,6.28 15,5A3,3 0 0,1 18,2A3,3 0 0,1 21,5C21,6.32 20.14,7.45 18.95,7.85C18.87,8.37 18.64,9 18,9.83C17,11.17 15,13.08 14,14.38C13.39,15.17 13.15,15.73 13.06,16.19C14.19,16.62 15,17.72 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.72 9.81,16.62 10.94,16.19C10.85,15.73 10.61,15.17 10,14.38C9,13.08 7,11.17 6,9.83C5.36,9 5.13,8.37 5.05,7.85C3.86,7.45 3,6.32 3,5A3,3 0 0,1 6,2M6,4A1,1 0 0,0 5,5A1,1 0 0,0 6,6A1,1 0 0,0 7,5A1,1 0 0,0 6,4M18,4A1,1 0 0,0 17,5A1,1 0 0,0 18,6A1,1 0 0,0 19,5A1,1 0 0,0 18,4M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z" />
                </SvgIcon>
                {repo.parent.forks}
              </div>
            )}
          <div>Updated on {new Date(repo.updated_at).toString()}</div>
        </Box>
      </Box>
    </ListItem>
  ));

  return <List>{listItems}</List>;
}

function Repository(props) {
  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Repositories Listing</Typography>
        </Toolbar>
      </AppBar>
      <MyBreadcrumbs aria-label="breadcrumb" ml="2rem">
        <RouteLink
          id="repository-username"
          color="inherit"
          to="/"
          onClick={props.clearState}
        >
          {props.username}
        </RouteLink>
        <Typography color="textPrimary">Repositories</Typography>
      </MyBreadcrumbs>
      <Divider />
      <RepositoryList repos={props.repos} readme={props.readme} />
      <Dialog aria-labelledby="simple-dialog-title" open={props.open}>
        <Box
          display="flex"
          alignItems="center"
          style={{ width: "400px", height: "100px" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{ width: "100%" }}
          >
            <CircularProgress />
            Retrieving repositories. Please wait...
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}

export default Repository;
