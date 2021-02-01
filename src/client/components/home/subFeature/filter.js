import React, { useEffect } from "react"
import { Card, ListGroup, Form, Button, Row, Col } from "react-bootstrap";

import config from "../../../../config";

import { baseHelper } from "../../../helper";

const FilterSection = props => {
    const { yearValue, setYear, isLaunchSuccessful, setLaunchSuccess, resetFilter, isLandSuccessful, setLandSuccess, setFilterChanged } = props;

    const search = (typeof window !== "undefined" && window.location.search) || "";

    let searchParams = search.split("?");
    searchParams = (searchParams[1] && searchParams[1].split("&"))|| "";

    const paramObj = {};
    if (searchParams) {
        searchParams.forEach(params => {
            const keyValue = params.split("=");
            paramObj[keyValue[0]] = (keyValue[1] && keyValue[1]) || "";
        });
    }

    useEffect(() => {
        if (paramObj["launch_year"] && paramObj["launch_year"] !== yearValue) {
            setYear(paramObj["launch_year"]);
        }
        if (paramObj["launch_success"] && paramObj["launch_success"] !== isLaunchSuccessful) {
            setLaunchSuccess(paramObj["launch_success"]);
        }
        if (paramObj["land_success"] && paramObj["land_success"] !== isLandSuccessful) {
            setLandSuccess(paramObj["land_success"]);
        }
    }, [isLandSuccessful, isLaunchSuccessful, paramObj, setLandSuccess, setLaunchSuccess, setYear, yearValue])


    const GenericButton = props => {
        const { value, setValue, compareValue, keyName } = props;
        const convertedToStringValue = value.toString();

        const finalValueToCompare = (compareValue && compareValue.toString()) ||  "";

        return (
            <Button
                size="sm"
                value={value}
                active={finalValueToCompare === convertedToStringValue}
                onClick={() => {
                    setFilterChanged(true);
                    setValue(convertedToStringValue);
                    paramObj[keyName] = convertedToStringValue;
                    let paramString = "";
                    for (const keyValue in paramObj) {
                        if(paramString) {
                            paramString += "&";
                        }
                        paramString += `${keyValue}=${paramObj[keyValue]}`;
                    }
                    window.history.replaceState(null, null, `?${paramString}`);
                }}
                variant="outline-success"
            >
                {baseHelper.getFirstLetterUpperCase(convertedToStringValue)}
            </Button>
        );
    };

    const yearList = () => {
        const yearButtons = [];
        const { start, end } = config.year;
        for(let year = start; year <= end; year = year+2){
            yearButtons.push(
                <div key={year}>
                    <Row>
                        <Col xs="6" className="text-align-center">
                            <GenericButton value={year} setValue={setYear} compareValue={yearValue} keyName="launch_year" />
                        </Col>
                        <Col xs="6" className="text-align-center">
                            {(year+1) <= end && <GenericButton value={year+1} setValue={setYear} compareValue={yearValue} keyName="launch_year" />}
                        </Col>
                    </Row>
                    <br />
                </div>
            );
        }

        return yearButtons;
    };

    return (
        <Card className="filter-section mb-5">
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h5>Filter By  <Button variant="outline-primary" onClick={() => resetFilter()}>Reset</Button></h5>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h6>Launch Year</h6>
                    <Form>
                        {yearList()}
                    </Form>
                    
                </ListGroup.Item>
                <ListGroup.Item>
                    <h6>Successful Launch</h6>
                    <Form>
                        <Row>
                            <Col xs="6" className="text-align-center">
                                <GenericButton value={true} setValue={setLaunchSuccess} compareValue={isLaunchSuccessful} keyName="launch_success" />
                            </Col>
                            <Col xs="6" className="text-align-center">
                                <GenericButton value={false} setValue={setLaunchSuccess} compareValue={isLaunchSuccessful} keyName="launch_success" />
                            </Col>
                        </Row>
                    </Form>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h6>Successful Landing</h6>
                    <Form>
                        <Row>
                            <Col xs="6" className="text-align-center">
                                <GenericButton value={true} setValue={setLandSuccess} compareValue={isLandSuccessful} keyName="land_success" />
                            </Col>
                            <Col xs="6" className="text-align-center">
                                <GenericButton value={false} setValue={setLandSuccess} compareValue={isLandSuccessful} keyName="land_success" />
                            </Col>
                        </Row>
                    </Form>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default FilterSection;
