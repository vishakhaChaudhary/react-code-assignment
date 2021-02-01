import "isomorphic-fetch";
import config from "../config";

function fetchSpaceXData({ launch_year, launch_success, land_success }) {
    const { API, APIDataLimit } = config;

    const launchYear = (launch_year && `&launch_year=${launch_year}`) || "";
    const launchSuccess = (launch_success && `&launch_success=${launch_success}`) || "";
    const landSuccess = (land_success && `&land_success=${land_success}`) || "";

    const url = `${API}?limit=${APIDataLimit}${launchYear}${launchSuccess}${landSuccess}`;

    return fetch(url)
        .then(data => data.json())
        .catch(err => console.error(err));
}

export default fetchSpaceXData;
