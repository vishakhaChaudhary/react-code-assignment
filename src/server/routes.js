import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { matchPath, StaticRouter } from "react-router";
import qs from "qs";

import "isomorphic-fetch";

import App from "../App";
import routes from "../sharedRoutes";

const router = express.Router();

router.get('/', async (req, res, next) => {
    const activeRoute = routes.find(route => matchPath(req.path, route)) || {};
    const params = (Object.keys(req.query).length !== 0 && qs.parse(req.query)) || {};

    const promise =
			(activeRoute.fetchInitialData && activeRoute.fetchInitialData(params)) ||
            Promise.resolve();

    promise
        .then(initialData => {
            const reactComp = renderToString(
                <StaticRouter location={req.url} context={{ data: initialData }}>
                    <App data={initialData} />
                </StaticRouter>
            );

            // console.log("initialData--->", initialData);

            return res.status(200).render('pages/index', { reactApp: reactComp, initialState: `<script>window.__PRELOADED_STATE__=${JSON.stringify(initialData)}</script>` });
        })
        .catch(next);
});

export default router;
