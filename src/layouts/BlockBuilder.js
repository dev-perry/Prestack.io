import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";

function BlockBuilder(props){
  const {cards} = props;

  function typeLabeler(type){
    switch (type) {
      case "cloud":
        return <i className="fas fa-font mx-auto fa-2x"></i>
      case "poll":
        return <i className="fas fa-poll mx-auto fa-2x"></i>
      case "photo":
        return <i className="far fa-images mx-auto fa-2x"></i>
      case "quiz":
        return <i className="far fa-check-square fa-2x"></i>
      default:
        return null
    }
  }

  return(
    <div className="row row-cols-1 row-cols-md-4 row-cols-sm-2 pl-4">
      {
        cards.map((card, index) => (
          <div className="col mb-4" key={index}>
            <Card className="bg-secondary text-center px-3">
              <CardBody>
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <div>
                      <span>{typeLabeler(card.data.type)}</span>
                    </div>
                  </Col>
                  <div className="col ml--2">
                    <h3 className="mb-0">
                        {card.data.title}
                    </h3>
                    <span className="text-info">●</span>
                    <small>{card.data.points} points</small>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </div>
        ))
      }
    </div>
  )
}

export default BlockBuilder;
