import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import getColor from '../utils/getColor';

let curretData = null;
dayjs.extend(relativeTime);


/**
 * Return the table component based on data
 * @param {*} data 
 * @returns 
 */
const TableComponent = ({
    data
}) => {
    return (
        <Table striped bordered hover size="md">
            <thead>
                <tr>
                    <th>#</th>
                    <th>City</th>
                    <th>Current AQI</th>
                    <th>Last Updated</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(data).map((key, index) => {
                        curretData = data[key].slice(-1)[0];
                        return (
                            <tr key={key}>
                                <td>{index + 1}</td>
                                <td>{key}</td>
                                <td style={{
                                    color: getColor(curretData.aqi),
                                    fontWeight: 600
                                }}>{curretData.aqi}</td>
                                <td>{dayjs(curretData.date).fromNow()}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

TableComponent.defaultProps = {
    data: []
};

TableComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};

export default TableComponent;