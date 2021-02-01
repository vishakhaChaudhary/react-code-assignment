import React from "react";
import { Route, Switch } from "react-router-dom";

import { NotFound } from "./components";
import routes from "../sharedRoutes";

const routeComponents = routes.map(route => {
    const { component: Component, path: routePath, exact, ...rest } = route;

    return (
        <Route
            exact={exact}
            path={routePath}
            key={route.path}
            render={(routeProps) => <Component {...routeProps} {...rest} />}
        />
    ); 
});

const Routes = () => {
    return (
        <Switch>
            {routeComponents}
            <Route path="*" component={NotFound} />
        </Switch>
    );
};

export default Routes;
