/* eslint-disable no-template-curly-in-string */
import React, { Component } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import TableComponent from '../components/Table';
import BarChartComponent from '../components/Bar';
import PieCharComponent from '../components/Pie';
import GaugeComponent from '../components/Gauge';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Simple Dashboard Application to show the AQI Data in City Wise
 * @Akbar
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      selectedCity: null,
      pointIndex: 0
    }
    this.SOCKET = null;
    this.gaugeInstance = null;
  }

  /**
   * Socket initialization method called here
   */
  componentDidMount() {
    this.SOCKET = new WebSocket('ws://city-ws.herokuapp.com/');
    this.handleSocketData();
  }

  /**
   * City wise data has been calculated here
   * @param {*} data 
   * @returns 
   */
  getCityWiseData = (data) => {
    const cityWiseData = {
      ...this.state.data
    }
    data.forEach(({ city, aqi }) => {
      if (!cityWiseData[city]) {
        cityWiseData[city] = []
      }
      cityWiseData[city].push({
        date: Date.now(),
        aqi: +aqi.toFixed(2),
        key: city
      });
    });
    return cityWiseData;
  }

  /**
   * To calcuate the chart data based on EJ2 Components
   * @returns []
   */
  getChartData = () => {
    const { data } = this.state;
    const chartData = Object.keys(data).map((city) => {
      return ({
        city: city,
        aqi: data[city].slice(-1)[0].aqi
      })
    });
    return chartData
  }

  /**
   * Handle scoket data - Message
   */
  handleSocketData = () => {
    this.SOCKET.onmessage = (event) => {
      const cityData = this.getCityWiseData(JSON.parse(event.data));
      const { pointIndex } = this.state;
      const selectedCity = Object.keys(cityData)[pointIndex];
      this.setState({
        data: cityData,
        selectedCity,
      });
    };
  }

  /**
   * Callback action to set the pointer index for chart data
   * @param {*} pointIndex 
   */
  setPointIndex = (pointIndex) => {
    const { data } = this.state;
    const selectedCity = Object.keys(data)[pointIndex];
    this.setState({
      pointIndex,
      selectedCity
    })
  }

  render() {
    const { selectedCity, pointIndex, data } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col>
            <Card style={{
              maxHeight: 490,
              overflow: 'scroll'
            }}>
              <Card.Body>
                <TableComponent data={data} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <BarChartComponent data={this.getChartData()} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row style={{
          marginTop: '5%'
        }}>
          <Col>
            <Card>
              <Card.Body>
                <p>{`Selected Point : ${selectedCity}`}</p>
                <PieCharComponent data={this.getChartData()} pointIndex={pointIndex} setPointIndex={this.setPointIndex} />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <p>{`${selectedCity} - ${selectedCity ? data[selectedCity].slice(-1)[0].aqi : ''}`}</p>
                <GaugeComponent selectedCity={selectedCity} data={data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

}
export default App;
