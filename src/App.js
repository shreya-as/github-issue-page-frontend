import React from "react";
import Layout from "./components/Layout";
import "./App.css";
import IssueListingPage from "./pages/IssuePage";
import AppRoutes from "./routes/AppRoutes";
const App = () => {
  return (
    <>
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  );
};

export default App;
