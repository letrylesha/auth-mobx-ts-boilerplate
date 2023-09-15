import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export const HomePage = (): ReactElement => {
  return (
    <div>
      <h1>Auth app boiler</h1>
      <hr />

      <Link to="auth">Navigate to auth page</Link>
    </div>
  );
};
