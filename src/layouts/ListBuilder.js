import React from "react";
import {connect} from "react-redux";
//reactstrap componenets
import {
  ListGroupItem,
  ListGroup,
  Row,
  Col
} from "reactstrap";

function ListBuilder(props){
  const {documents} = props;

  function getDate(date){
    const options = {month: 'short', year: 'numeric', day: 'numeric' }
    var dateStamp = new Date(date.seconds * 1000);
    return dateStamp.toLocaleDateString(undefined, options);
  }

  if(documents){
    return(
      <ListGroup className="list my--3 pl-4 pt-3">
        {documents.map((doc, index) => (
          <ListGroupItem key={index}>
            <Row className="align-items-center">
              <Col className="col-auto">
                <img
                  alt="..."
                  src={require("../assets/img/icons/flags/US.png")}
                />
              </Col>
              <div className="col">
                <small>Name:</small>
                <h5 className="mb-0">{doc.id}</h5>
              </div>
              <div className="col">
                <small>Size:</small>
                <h5 className="mb-0">{doc.data.size % 1000} MB</h5>
              </div>
              <div className="col">
                <small>Uploaded:</small>
                <h5 className="mb-0">{getDate(doc.data.uploaded)}</h5>
              </div>
            </Row>
          </ListGroupItem>
        ))}
        </ListGroup>
    )
  }else{
    return null
  }

}

function mapStateToProps(state){
  return{
    documents: state.drive.documents
  }
}

export default connect(mapStateToProps)(ListBuilder);
