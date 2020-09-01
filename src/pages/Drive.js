import React from "react";

import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
} from "reactstrap";

function Drive(props){

  return (
      <>
        <div className="card-columns mt-3 px-3 h-100">
          <Card>
            <CardImg
              alt="..."
              src={require("../assets/img/theme/img-1-1000x600.jpg")}
              top
            />
            <CardBody>
              <CardTitle>Card title that wraps to a new line</CardTitle>
              <CardText>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </CardText>
            </CardBody>
          </Card>
          <Card className="p-3">
            <CardBody className="blockquote mb-0">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer posuere erat a ante.
              </p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </CardBody>
          </Card>
          <Card>
            <CardImg
              alt="..."
              src={require("../assets/img/theme/img-1-1000x600.jpg")}
              top
            />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardText>
                This card has supporting text below as a natural lead-in to
                additional content.
              </CardText>
              <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardText>
            </CardBody>
          </Card>
          <Card className="bg-primary text-white text-center p-3">
            <blockquote className="blockquote mb-0">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer posuere erat.
              </p>
              <footer className="blockquote-footer">
                <small>
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card className="text-center">
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardText>
                This card has a regular title and short paragraphy of text
                below it.
              </CardText>
              <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardText>
            </CardBody>
          </Card>
          <Card>
            <CardImg
              alt="..."
              src={require("../assets/img/theme/img-1-1000x600.jpg")}
            />
          </Card>
          <Card className="p-3 text-right">
            <blockquote className="blockquote mb-0">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer posuere erat a ante.
              </p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
          <Card>
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardText>
                This is another card with title and supporting text below.
                This card has some additional content to make it slightly
                taller overall.
              </CardText>
              <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardText>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }

export default Drive;
