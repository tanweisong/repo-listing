import React, { useState } from "react";
import "../styles/App.css";
import _ from "lodash";
import { FormControl, InputLabel, Input, Button, Box } from "@material-ui/core";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { styled } from "@material-ui/core/styles";
import Repository from "./Repository";
import ReadMe from "./ReadMe";

const MyButton = styled(Button)({
  "margin-top": "2rem"
});

function Login(props) {
  return (
    <div className="app">
      <div className="content">
        <div style={{ width: "400px" }}>
          <Box
            display="flex"
            flexDirection="column"
            p={1}
            bgcolor="background.paper"
          >
            <FormControl fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                placeholder="Enter github username"
                onChange={props.onUsernameChange}
              />
            </FormControl>
            <MyButton
              variant="outlined"
              color="primary"
              disableFocusRipple
              onClick={() => {
                props.getRepository();
              }}
            >
              Submit
            </MyButton>
          </Box>
        </div>
      </div>
    </div>
  );
}

function App() {
  let history = useHistory();

  const [username, setUserName] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [readMe, setReadMe] = useState(null);
  const [repoName, setRepoName] = useState("");
  const [open, setOpen] = useState(false);

  const clearState = () => {
    setUserName("");
    setLoggedIn(false);
    setRepositories([]);
    setReadMe(null);
    setRepoName("");
  };

  const onUsernameChange = e => {
    setUserName(e.target.value);
  };

  const getFullRepository = async repos => {
    let repositories = [];

    for (var i = 0; i < repos.length; i++) {
      const repo = repos[i];
      await fetch(`https://api.github.com/repos/${username}/${repo.name}`)
        .then(response => response.json())
        .then(response => repositories.push(response));
    }

    setRepositories(repositories);
    setOpen(false);
  };

  const getReadmeClick = repo => {
    fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`
    )
      .then(response => response.json())
      .then(response => {
        let content = _.get(response, "content");

        setReadMe(window.atob(content));
        setRepoName(repo.name);

        history.push("/readme");
      });
  };

  const getRepository = () => {
    setOpen(true);

    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => {
        if (response.status === 200) return response.json();
        else return null;
      })
      .then(response => {
        if (response !== null) {
          setLoggedIn(true);

          getFullRepository(response, username);
        } else {
          setLoggedIn(false);
          setOpen(false);
        }
      });
  };

  return (
    <Switch>
      <Route path="/" exact>
        {isLoggedIn ? (
          <Redirect to="/repositories" />
        ) : (
          <Login
            onUsernameChange={onUsernameChange}
            getRepository={getRepository}
          ></Login>
        )}
      </Route>
      <Route path="/repositories">
        {username === "" ? (
          <Redirect to="/" />
        ) : (
          <Repository
            repos={repositories}
            readme={getReadmeClick}
            clearState={clearState}
            username={username}
            open={open}
          />
        )}
      </Route>
      <Route path="/readme">
        {username === "" ? (
          <Redirect to="/" />
        ) : (
          <ReadMe
            readMe={readMe}
            username={username}
            repoName={repoName}
            clearState={clearState}
          />
        )}
      </Route>
    </Switch>
  );
}

export default App;
