import React from 'react';
import PropTypes from 'prop-types';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    DateTime, Legend, Tooltip, Category, BarSeries
} from '@syncfusion/ej2-react-charts';
import IPointRender from '../utils/pointRender';

/**
 * Return the bar chart component based on data
 * @param {*} data 
 * @returns 
 */
const BarChartComponent = ({
    data
}) => {
    return (
        <ChartComponent id='charts' style={{ textAlign: "center" }}
            primaryXAxis={{
                valueType: 'Category'
            }}
            height={'100%'}
            pointRender={IPointRender}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }} s
            title='AQI Chart - Live'>
            <Inject services={[BarSeries, DateTime, Category, Legend, Tooltip]} />
            <SeriesCollectionDirective>
                <SeriesDirective dataSource={data} xName='city' yName='aqi' type='Bar' />
            </SeriesCollectionDirective>
        </ChartComponent>
    )
}

BarChartComponent.defaultProps = {
    data: []
};

BarChartComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};

export default BarChartComponent;