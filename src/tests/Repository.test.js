import React from "react";
import { shallow } from "enzyme";
import Repository from "../views/Repository";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("set username and component renders correct", () => {
  const wrapper = shallow(<Repository />);

  wrapper.setProps({
    username: "repo-username"
  });

  expect(wrapper.find("#repository-username").text()).toBe("repo-username");
});

it("repository renders correct number of items based on props repos", () => {
  const wrapper = shallow(<Repository />);

  wrapper.setProps({
    repos: [
      {
        id: 1,
        name: "repo 1"
      },
      {
        id: 2,
        name: "repo 2"
      }
    ]
  });

  expect(
    wrapper
      .find("RepositoryList")
      .render()
      .find("li")
  ).toHaveLength(2);
});

it("first item should not show parent full name but second item should", () => {
  const wrapper = shallow(<Repository />);

  wrapper.setProps({
    repos: [
      {
        id: 1,
        name: "repo 1"
      },
      {
        id: 2,
        name: "repo 2",
        parent: {
          full_name: "repo 2 parent",
          forks: 60
        }
      }
    ]
  });

  expect(
    wrapper
      .find("RepositoryList")
      .render()
      .find("li")
      .first()
      .find(".secondaryDescription")
  ).toHaveLength(0);

  expect(
    wrapper
      .find("RepositoryList")
      .render()
      .find("li")
      .last()
      .find(".secondaryDescription")
  ).toHaveLength(1);
});

it("first item should show language but second item should not", () => {
  const wrapper = shallow(<Repository />);

  wrapper.setProps({
    repos: [
      {
        id: 1,
        name: "repo 1",
        language: "Javascript"
      },
      {
        id: 2,
        name: "repo 2",
        language: null
      }
    ]
  });

  expect(
    wrapper
      .find("RepositoryList")
      .render()
      .find("li")
      .first()
      .find(".repo-language")
  ).toHaveLength(1);

  expect(
    wrapper
      .find("RepositoryList")
      .render()
      .find("li")
      .last()
      .find(".repo-language")
  ).toHaveLength(0);
});

it("first item should show parent fork but second item should not", () => {
  const wrapper = shallow(<Repository />);

  wrapper.setProps({
    repos: [
      {
        id: 1,
        name: "repo 1",
        parent: {
          forks: 60
        }
      },
      {
        id: 2,
        name: "repo 2",
        parent: {
          full_name: "repo 2 parent"
        }
      }
    ]
  });

  expect(
    wrapper
      .find("RepositoryList")
      .render()
      .find("li")
      .first()
      .find(".sourceFork")
  ).toHaveLength(1);

  expect(
    wrapper
      .find("RepositoryList")
      .render()
      .find("li")
      .last()
      .find(".sourceFork")
  ).toHaveLength(0);
});
