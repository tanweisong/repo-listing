import React from "react";
import { shallow } from "enzyme";
import ReadMe from "../views/ReadMe";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

it("set props are displayed correctly", () => {
  const wrapper = shallow(<ReadMe />);
  wrapper.setProps({
    username: "test-username",
    repoName: "test-repo",
    readMe: "test-readme"
  });

  expect(wrapper.find("#readme-username").text()).toEqual("test-username");
  expect(wrapper.find("#readme-repo").text()).toEqual("test-repo");
  expect(
    wrapper
      .find("pre")
      .first()
      .html()
  ).toEqual("<pre>test-readme</pre>");
});
