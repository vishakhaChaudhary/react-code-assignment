import React from 'react'
import { Col, Card } from "react-bootstrap";

import { ListSkeleton } from '../../generic';

const LaunchList = props => {
    const { loading, launches = [] } = props;

    if (loading) {
        return <ListSkeleton row={3} col={4} />;
    }

    if (launches.length === 0) {
        return (
            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mb-4">
                <Card className="launch-card">
                    <Card.Body>
                        <div>
                            No data found <span role="img" aria-label="sad">😕</span>, try to change some filters
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

    const missionIds = missionCollection => {
        if(!missionCollection.length) {
            return <br />;
        }

        return (
            <>
                {missionCollection.map(missionId => <li className="ml-2" key={missionId}>{missionId}</li>)}
            </>
        );
    };

    const launchList =  launches.map(launch => {
        const { rocket: { first_stage: { cores } } } = launch;
        const isLandSuccessful = cores.some(core => core.land_success);

        return (
            <Col key={`${launch.mission_name}#${launch.flight_number}`} xs={12} sm={12} md={4} lg={3} xl={3} className="mb-4">
                <Card className="launch-card" role="button">
                    <div style={{textAlign: "center"}}>
                        <Card.Img variant="top" src={launch.links.mission_patch_small || "https://via.placeholder.com/150?text=No Image"} />
                    </div>
                    <Card.Body>
                        <div>
                            <b>{`${launch.mission_name} #${launch.flight_number}`}</b>
                            <br />
                            <b>Mission Ids:</b> {missionIds(launch.mission_id)}
                            <b>Launch Year:</b> {launch.launch_year}
                            <br />
                            <b>Successful Launch:</b> {(launch.launch_success && "True") || "False"}
                            <br />
                            <b>Successful Landing:</b> {(isLandSuccessful && "True") || "False"}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    });

    return launchList;
}

export default LaunchList;
