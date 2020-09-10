import React from "react";
// import {connect} from "react-redux";
//reactstrap componenets
import {
  ListGroupItem,
  ListGroup,
  Row,
  Col
} from "reactstrap";
import {getDate} from "../firebase/actions";

function ListBuilder(props){
  const {documents} = props;

    return(
      <ListGroup className="list my--3 pl-4 pt-3">
        {documents.map((doc) => (
          <ListGroupItem key={doc.id}>
            <Row className="align-items-center">
              <Col className="col-auto">
                <img
                  alt="..."
                  src={require("../assets/img/icons/flags/US.png")}
                />
              </Col>
              <div className="col">
                <small>Name:</small>
                <h5 className="mb-0">{doc.data.name}</h5>
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

}

// function mapStateToProps(state){
//   return{
//     documents: state.drive.documents
//   }
// }
//
// export default connect(mapStateToProps)(ListBuilder);

export default ListBuilder;
