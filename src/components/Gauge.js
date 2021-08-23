/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective,
} from '@syncfusion/ej2-react-circulargauge';
import { GOOD, MODERATE, POOR, SATISFACTORY, SEVERE, VERY_POOR } from '../constants';

/**
 * Return the gauge chart component based on data
 * @param {*} data 
 * @returns 
 */
const GaugeComponent = ({
    data,
    selectedCity
}) => {
    let eleRef = useRef();
    useEffect(() => {
        try {
            eleRef.setPointerValue(0, 0, data[selectedCity].slice(-1)[0].aqi);
        } catch (e) {
            // Console.log(e)
        }
    }, [selectedCity])

    return (
        <CircularGaugeComponent title={selectedCity} titleStyle={{ size: '18px' }} centerY='75%' id='gauge-container' ref={gaugeRef => eleRef = gaugeRef}>
            <AxesDirective>
                <AxisDirective radius='120%' startAngle={270} endAngle={90} minimum={0} maximum={500}
                    lineStyle={{ width: 0 }}
                    labelStyle={{
                        font: {
                            size: '13px',
                            fontFamily: 'Roboto'
                        },
                        position: 'Outside',
                        autoAngle: true,
                        useRangeColor: false
                    }}
                    majorTicks={{ height: 0 }}
                    minorTicks={{ height: 0 }}>
                    <PointersDirective>
                        <PointerDirective animation={{ enable: true, duration: 900 }} value={0} radius='80%' color='#757575' pointerWidth={7}
                            cap={{
                                radius: 8,
                                color: '#757575',
                                border: { width: 0 }
                            }} needleTail={{
                                color: '#757575',
                                length: '15%'
                            }} />
                    </PointersDirective>
                    <AnnotationsDirective>
                        <AnnotationDirective
                            content='<div style="width:90px;text-align:center;font-size:20px;font-family:Roboto">${pointers[0].value} AQI</div>'
                            angle={0} zIndex='1' radius='30%' />
                    </AnnotationsDirective>
                    <RangesDirective>
                        <RangeDirective
                            start={0} end={50} startWidth={5} endWidth={10} radius='102%'
                            color={GOOD}
                        />
                        <RangeDirective
                            start={50} end={100} startWidth={10} endWidth={15} radius='102%'
                            color={SATISFACTORY}
                        />
                        <RangeDirective
                            start={100} end={200} startWidth={15} endWidth={20} radius='102%'
                            color={MODERATE}
                        />
                        <RangeDirective
                            start={200} end={300} startWidth={20} endWidth={25} radius='102%'
                            color={POOR}
                        />
                        <RangeDirective
                            start={300} end={400} startWidth={25} endWidth={30} radius='102%'
                            color={VERY_POOR}
                        />
                        <RangeDirective
                            start={400} end={500} startWidth={30} endWidth={35} radius='102%'
                            color={SEVERE}
                        />
                    </RangesDirective>
                </AxisDirective>
            </AxesDirective>
        </CircularGaugeComponent>
    )
}

GaugeComponent.defaultProps = {
    data: [],
    selectedCity: null
};

GaugeComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    selectedCity: PropTypes.string
};

export default GaugeComponent;