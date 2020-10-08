import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";

function PresentationController(){
  return(
    <Card className="bg-primary h-100">
      <CardBody>
        <CardTitle className="text-uppercase text-muted mb-0">
          <h3 className="text-white">Control Panel</h3>
        </CardTitle>
        <div className="d-flex justify-content-around pt-3">
            <Button className="rounded-circle">
              <span><i className="fas fa-chevron-left"></i></span>
            </Button>
          <Button className="rounded-circle">
            <span><i className="fas fa-chevron-right"></i></span>
          </Button>
        </div>
        <div className="d-flex justify-content-around pt-3">
          <Button className="rounded-circle">
            <span><i className="fas fa-pause"></i></span>
          </Button>
          <Button className="rounded-circle">
            <span><i className="fas fa-play"></i></span>
          </Button>
          <Button className="rounded-circle">
            <span><i className="fas fa-redo-alt"></i></span>
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default PresentationController
