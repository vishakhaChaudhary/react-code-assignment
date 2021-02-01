import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { FilterSection, LaunchList } from "./subFeature";

const Home = props => {
    const { fetchInitialData: fetchFilteredData } = props;
    const [selectYear, setYear] = useState("");
    const [isLaunchSuccessful, setLaunchSuccess] = useState("");
    const [isLandSuccessful, setLandSuccess] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [isFilterChanged, setFilterChanged] = useState(false);

    useEffect(() => {
        if(!isFilterChanged) {
            return undefined;
        }
        setDataLoading(true);
        const resultData = fetchFilteredData({
            "launch_year": selectYear,
            "launch_success": (isLaunchSuccessful !== "" && isLaunchSuccessful.toString()) || "",
            "land_success": (isLandSuccessful !== "" && isLandSuccessful.toString()) || ""
        });
        resultData
            .then(data => {
                setFilteredData(data);
                setDataLoading(false);
                if (window.__PRELOADED_STATE__) {
                    delete window.__PRELOADED_STATE__;
                }
            })
            .catch(_ => setDataLoading(false));
    }, [fetchFilteredData, isFilterChanged, isLandSuccessful, isLaunchSuccessful, selectYear]);

    const resetFilter = () => {
        setYear("");
        setLaunchSuccess("");
        setLandSuccess("");
        window.history.replaceState(null, null, "/");
    };

    const finalData = (isFilterChanged && filteredData) || (typeof window !== "undefined" && window.__PRELOADED_STATE__) || [];

    return (
        <Row className="mt-5">
            <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                <FilterSection
                    yearValue={selectYear}
                    isLaunchSuccessful={isLaunchSuccessful}
                    setLaunchSuccess={setLaunchSuccess}
                    setYear={setYear}
                    resetFilter={resetFilter}
                    isLandSuccessful={isLandSuccessful}
                    setLandSuccess={setLandSuccess}
                    setFilterChanged={setFilterChanged}
                />
            </Col>
            <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                <Row>
                    <LaunchList
                        launches={finalData}
                        loading={dataLoading}
                    />
                </Row>
            </Col>
        </Row>
    )
}

export default Home;
