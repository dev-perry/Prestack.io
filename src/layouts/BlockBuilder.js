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
        return <span style={{color: "#21209c"}}><i className="fas fa-font mx-auto fa-2x"></i></span>
      case "poll":
        return <span style={{color:"#fdb827"}} ><i className="fas fa-poll mx-auto fa-2x"></i></span>
      case "quiz":
        return <span style={{color: "#6f9eaf"}}><i className="far fa-check-square fa-2x"></i></span>
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
                    <small>{card.data.prompt}</small>
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
