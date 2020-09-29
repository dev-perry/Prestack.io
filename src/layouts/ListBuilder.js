import React from "react";
import {connect} from "react-redux";
//reactstrap componenets
import {
  ListGroupItem,
  ListGroup,
  Row,
  Col
} from "reactstrap";
import {getDate} from "../firebase/actions";

function ListBuilder(props){
  const {documents, searching, searchResults} = props;

  const getAlgoliaDate = (date) => {
      const options = {month: 'short', year: 'numeric', day: 'numeric' }
      var dateStamp = new Date(date._seconds * 1000);
      return dateStamp.toLocaleDateString(undefined, options);
    }

  if(searching && searchResults.length > 0){
    return(
      <ListGroup className="list my--3 pl-4 pt-3">
        {searchResults.map((hit) => (
          <ListGroupItem key={hit.name}>
            <Row className="align-items-center">
              <Col className="col-auto">
                <img
                  alt="..."
                  src={require("../assets/img/icons/flags/US.png")}
                />
              </Col>
              <div className="col">
                <small>Name:</small>
                <h5 className="mb-0">{hit.name}</h5>
              </div>
              <div className="col">
                <small>Size:</small>
                <h5 className="mb-0">{hit.size % 1000} MB</h5>
              </div>
              <div className="col">
                <small>Uploaded:</small>
                <h5 className="mb-0">{getAlgoliaDate(hit.uploaded)}</h5>
              </div>
            </Row>
          </ListGroupItem>
        ))}
        </ListGroup>
    )
  }
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

}

function mapStateToProps(state) {
  return {
    searchResults: state.search.searchResults,
    searching: state.search.isSearching
  }
}

export default connect(mapStateToProps)(ListBuilder);
