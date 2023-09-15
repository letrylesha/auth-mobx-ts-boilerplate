import React from "react";
import { useInit } from "./hooks/useInit";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { PrivateRoute } from "./components/PrivateRoute";

const App = () => {
  const { isLoading } = useInit();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
};

export default App;
