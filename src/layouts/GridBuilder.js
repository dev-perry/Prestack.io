import React, {useState} from "react";
// import {connect} from "react-redux";
//reactstrap componenets
import {
  Card,
  CardTitle,
  CardBody,
  CardImg,
} from "reactstrap";
import DocPreview from "../components/DocPreview";
import {connect} from "react-redux";

import {getDate} from "../firebase/actions";
import {loadFile} from "../actions";

function GridBuilder(props){
  const {documents, searching, searchResults, getFile} = props;

  const [modal, setModal] = useState(false);

  const handleOpen = (e) => {
    getFile(e.currentTarget.dataset.filename)
    setModal(true)
  };


  const getAlgoliaDate = (date) => {
      const options = {month: 'short', year: 'numeric', day: 'numeric' }
      var dateStamp = new Date(date._seconds * 1000);
      return dateStamp.toLocaleDateString(undefined, options);
    }

  if(searching && searchResults.length > 0){
    return(
      <div className="row row-cols-1 row-cols-md-4 row-cols-sm-2 pl-4">
        <DocPreview open={modal} toggle={setModal}/>
        {
          searchResults.map((hit, index) => (
            <div className="col mb-4" key={index}>
              <Card className="h-100" data-filename={hit.name} onClick={handleOpen}>
                 <CardImg
                   alt="File thumbnail"
                   src={require("../assets/img/theme/img-1-1000x600.jpg")}
                   top
                 />
                 <CardBody>
                   <CardTitle>{hit.name}</CardTitle>
                     <small className="text-muted">Uploaded on {getAlgoliaDate(hit.uploaded)}</small>
                 </CardBody>
               </Card>
            </div>
           ))
        }
      </div>
    )
  }else{
    return(
      <div className="row row-cols-1 row-cols-md-4 row-cols-sm-2 pl-4">
        <DocPreview open={modal} toggle={setModal}/>
        {
          documents.map((doc, index) => (
            <div className="col mb-4" key={index}>
              <Card className="h-100" data-filename={doc.id} onClick={handleOpen}>
                 <CardImg
                   alt="File thumbnail"
                   src={require("../assets/img/theme/img-1-1000x600.jpg")}
                   top
                 />
                 <CardBody>
                   <CardTitle>{doc.id}</CardTitle>
                     <small className="text-muted">Uploaded on {getDate(doc.data.uploaded)}</small>
                 </CardBody>
               </Card>
            </div>
           ))
        }
      </div>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(GridBuilder);
