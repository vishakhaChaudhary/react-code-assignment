import React from 'react'
import { Col } from "react-bootstrap";

const ListSkeleton = props => {
    const { rows = 3, cols = 4 } = props;

    const skeleton = [...Array(rows)].map(_ => {
        const column = [...Array(cols).keys()];
        return column;
    });

    return skeleton.map((row, index) => {
        return row.map((_, colIndex) => (
            <Col key={index+colIndex} xs={12} sm={12} md={3} lg={3} xl={3} className="mb-4">
                <div className="list-skeleton" />
            </Col>
        ));
    });
};

export default ListSkeleton;
