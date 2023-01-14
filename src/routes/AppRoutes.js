import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
const IssueDetailPage = lazy(() => import("../pages/IssueDetailPage"));
const IssueListingPage = lazy(() => import("../pages/IssuePage"));
const AppRoutes = () => {
  return (
    <>
      <Suspense fallback="">
        <Switch>
          <Route exact path="/">
            <IssueListingPage />
          </Route>
          <Route exact path="/detail">
            <IssueDetailPage />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};
export default AppRoutes;
