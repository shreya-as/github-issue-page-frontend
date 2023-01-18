import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
const IssueDetailPage = lazy(() =>
  import("../pages/IssueDetail/IssueDetailPage")
);
const IssueListingPage = lazy(() => import("../pages/Issue/IssuePage"));
const AppRoutes = () => {
  return (
    <>
      <Suspense fallback="">
        <Switch>
          <Route exact path="/">
            <IssueListingPage />
          </Route>
          <Route exact path="/issues/:id">
            <IssueDetailPage />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};
export default AppRoutes;
