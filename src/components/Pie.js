/* eslint-disable no-template-curly-in-string */
import React from 'react';
import PropTypes from 'prop-types';
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
    AccumulationLegend, PieSeries, AccumulationTooltip, Inject,
    AccumulationDataLabel
  } from '@syncfusion/ej2-react-charts';
import IPointRender from '../utils/pointRender';

/**
 * Return the pie chart component based on data
 * @param {*} data 
 * @returns 
 */
const PieCharComponent = ({
    data,
    pointIndex,
    setPointIndex
}) => {
    return (
        <AccumulationChartComponent id='pie-chart'
            pointClick={(data) => {
                setPointIndex(data.pointIndex);
            }}
            pointRender={IPointRender}
            title='AQI Chart'
            legendSettings={{ visible: false }}
            enableSmartLabels={true}
            enableAnimation={false}
            tooltip={{ enable: true, format: '${point.x} : <b>${point.y}%</b>' }}
        >
            <Inject services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective dataSource={data} xName='city' yName='aqi' name='City'
                    explode={true} explodeOffset='20%' explodeIndex={pointIndex}
                    dataLabel={{
                        visible: true,
                        position: 'Outside', name: 'text',
                        font: {
                            fontWeight: '600'
                        }
                    }}
                    radius='60%'
                >
                </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>
    )
}

PieCharComponent.defaultProps = {
    data: [],
    pointIndex: 0,
    setPointIndex: null
};

PieCharComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    pointIndex: PropTypes.number,
    setPointIndex: PropTypes.func
};

export default PieCharComponent;