import { Home } from "./client/components";
import fetchSpaceXData from "./data";

const routes = [
	{
		path: "/",
		exact: true,
		component: Home,
		fetchInitialData: (urlObj) => fetchSpaceXData(urlObj),
	}
];

export default routes;
