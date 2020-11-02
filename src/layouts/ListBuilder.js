import React, {useState} from "react";
import {connect} from "react-redux";
//reactstrap componenets
import {
  ListGroupItem,
  ListGroup,
  Row,
  Col
} from "reactstrap";
import DocPreview from "../components/DocPreview";
import {getDate} from "../firebase/actions";
import {loadFile} from "../actions";
import FileIcon from './FileIcon';


function ListBuilder(props){
  const {documents, searching, searchResults, getFile} = props;

  const [modal, setModal] = useState(false);

  const handleOpen = (e) => {

    getFile(e.currentTarget.dataset.filename);
    setModal(true)
  };


  const getAlgoliaDate = (date) => {
      const options = {month: 'short', year: 'numeric', day: 'numeric' }
      var dateStamp = new Date(date._seconds * 1000);
      return dateStamp.toLocaleDateString(undefined, options);
    }

  if(searching && searchResults.length > 0){
    return(
      <ListGroup className="list my--3 px-4 pt-3 pb-4">
        <DocPreview open={modal} toggle={setModal}/>
        {searchResults.map((hit, index) => (
          <ListGroupItem key={index} data-filename={hit.name} onClick={handleOpen}>
            <Row className="align-items-center">
              <Col className="col-auto">
                <FileIcon assetType={hit.type} thumb={false}/>
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
      <ListGroup className="list my--3 px-4 pt-3 pb-4">
        <DocPreview open={modal} toggle={setModal}/>
        {documents.map((doc, index) => (
          <ListGroupItem key={index} data-filename={doc.id} onClick={handleOpen}>
            <Row className="align-items-center">
              <Col className="col-auto">
                <FileIcon assetType={doc.data.type} thumb={false}/>
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

const mapDispatchToProps = dispatch => {
  return{
    getFile: (name) => dispatch(loadFile(name)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListBuilder);
