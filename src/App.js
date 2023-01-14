import React from "react";
import Layout from "./components/Layout";
import "./App.css";
import IssueListingPage from "./pages/IssuePage";
const App = () => {
  return (
    <>
      <Layout>
        <IssueListingPage />
      </Layout>
    </>
  );
};

export default App;
