import { render } from "@testing-library/react";

import ErrorSection from "./error-section";

describe("ErrorSection", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <ErrorSection message="error" title="error" />
    );
    expect(baseElement).toBeTruthy();
  });
});
