'ActivityList.js'
import React from "react";
//reactstrap components
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from "reactstrap";

function ActivityList() {
  return (
  <>
    <ListGroup className = "list mt-3" flush >
    <ListGroupItem className="px-0 bg-transparent text-white border-0">
    <Row className="align-items-center">
      <Col className="col-auto">
        <a className="avatar rounded-circle" href="#pablo" onClick={e => e.preventDefault()}>
          <img alt="..." src={require("../assets/img/theme/team-1.jpg")}/>
        </a>
      </Col>
      <div className="col ml--2 inline-block">
        <span>
          <h4 className="mb-0 text-white">
              John Michael
          </h4>
          <p>
            Turned on camera
          </p>
        </span>
      </div>
      <Col className="col-auto">
        9:45 am
      </Col>
    </Row>
  </ListGroupItem>
  <ListGroupItem className="px-0 bg-transparent text-white border-0">
<Row className="align-items-center">
  <Col className="col-auto">
    <a className="avatar rounded-circle" href="#pablo" onClick={e => e.preventDefault()}>
      <img alt="..." src={require("../assets/img/theme/team-2.jpg")}/>
    </a>
  </Col>
  <div className="col ml--2 inline-block">
    <span>
      <h4 className="mb-0 text-white">
          Alex Smith
      </h4>
      <p>
        Joined session
      </p>
    </span>
  </div>
  <Col className="col-auto">
    10:15 am
  </Col>
</Row>
</ListGroupItem>
<ListGroupItem className="px-0 bg-transparent text-white border-0">
<Row className="align-items-center">
<Col className="col-auto">
  <a className="avatar rounded-circle" href="#pablo" onClick={e => e.preventDefault()}>
    <img alt="..." src={require("../assets/img/theme/team-3.jpg")}/>
  </a>
</Col>
<div className="col ml--2 inline-block">
  <span>
    <h4 className="mb-0 text-white">
        Samantha Ivy
    </h4>
    <p>
      Turned off camera
    </p>
  </span>
</div>
<Col className="col-auto">
  10:25 am
</Col>
</Row>
</ListGroupItem>
<ListGroupItem className="px-0 bg-transparent text-white border-0">
<Row className="align-items-center">
  <Col className="col-auto">

    <a className="avatar rounded-circle" href="#pablo" onClick={e => e.preventDefault()}>
      <img alt="..." src={require("../assets/img/theme/team-4.jpg")}/>
    </a>
  </Col>
  <div className="col ml--2 inline-block">
    <span>
      <h4 className="mb-0 text-white">
        Miranda Jones
      </h4>
      <p>
        Left session
      </p>
    </span>
  </div>
  <Col className="col-auto">
    10:45 am
  </Col>
</Row>
</ListGroupItem>
<ListGroupItem className="px-0 bg-transparent text-white border-0">
<Row className="align-items-center">
  <Col className="col-auto">
    <a className="avatar rounded-circle" href="#pablo" onClick={e => e.preventDefault()}>
      <img alt="..." src={require("../assets/img/theme/team-1.jpg")}/>
    </a>
  </Col>
  <div className="col ml--2 inline-block">
    <span>
      <h4 className="mb-0 text-white">
          John Michael
      </h4>
      <p>
        Posted in session chat
      </p>
    </span>
  </div>
  <Col className="col-auto">
    11:00 am
  </Col>
</Row>
</ListGroupItem>
<ListGroupItem className="px-0 bg-transparent text-white border-0">
<Row className="align-items-center">
<Col className="col-auto">
  <a className="avatar rounded-circle" href="#pablo" onClick={e => e.preventDefault()}>
    <img alt="..." src={require("../assets/img/theme/team-3.jpg")}/>
  </a>
</Col>
<div className="col ml--2 inline-block">
  <span>
    <h4 className="mb-0 text-white">
        Samantha Ivy
    </h4>
    <p>
      Started screen sharing
    </p>
  </span>
</div>
<Col className="col-auto">
  11:15 am
</Col>
</Row>
</ListGroupItem>

</ListGroup>
</>
  )
}

export default ActivityList;
