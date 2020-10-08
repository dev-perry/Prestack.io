import React from "react";
import {useHistory} from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import PresentationController from "../components/PresentationController";
import ActivityList from '../layouts/ActivityList';
import SlideList from "../layouts/SlideList";
import SlideShowBox from "../components/SlideShowBox";

function SlideShow() {
  const history = useHistory();
  const endPres = () => {
    history.replace("/c/presentations");
  }
  return (
    <div>
    <Button onClick={endPres} className="mt-3 ml-5 rounded-pill" color="danger" type="button">
  <i className="fas fa-times"> End Presentation</i>
  </Button>
    <div className = "d-flex align-items-stretch" >
  <Container className="pt-3">
    <Row>
      <Col className="pb-0 vh-75">
        <Card className="bg-gradient-default">
          <CardBody>
            <CardTitle className="text-uppercase text-muted mb-0 text-white">
              <h1 style={{color: "white"}}>Attendant Activity</h1>
            </CardTitle>
            <div>
              <ActivityList/>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col className="pb-0 vh-75">
        <Row>
          <Card className="bg-info w-100">
            <CardBody className="pb-0">
              <CardTitle className="text-uppercase text-muted mb-0">
                <h1 className="text-white">Shakespeare in History</h1>
              </CardTitle>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Cras ornare arcu dui vivamus arcu felis bibendum ut tristique. Aliquam sem et tortor consequat id porta nibh.
              </p>
            </CardBody>
          </Card>
        </Row>
        <Row className="mt--3">
          <Col className="pl-0">
            <Card className="h-100">
              <CardBody className="overflow-auto">
                <div className="bg-white sticky-top">
                  <CardTitle className="text-uppercase text-muted mb-0">
                    <h3 className="text-dark">Modules</h3>
                  </CardTitle>
                </div>
                <div>
                  <SlideList/>
              </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="pr-0">
            <PresentationController/>
          </Col>
        </Row>
        <Row className="pt-3">
          <Card style={{backgroundColor:"#ced4da"}} className="w-100">
            <CardBody className="pb-0">
              <CardTitle className="text-uppercase text-muted mb-0">
                <h3 className="text-default">REMEMBER:</h3>
              </CardTitle>
              <ol className="text-default">
                <li>Double-check you have selected the correct presentation</li>
                <li>Select the pop-out presentation window for screen share</li>
                <li>Use dual monitors when possible</li>
                <li>Stop screen share before exiting presentations</li>
              </ol>
            </CardBody>
          </Card>
        </Row>
      </Col>
    </Row>
  </Container>
</div>
  <SlideShowBox/>
</div>
)
}

export default SlideShow;