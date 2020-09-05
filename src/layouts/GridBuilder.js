import React from "react";
import {connect} from "react-redux";
//reactstrap componenets
import {
  Card,
  CardTitle,
  CardBody,
  CardImg,
} from "reactstrap";

function GridBuilder(props){
  const {documents} = props;

  function getDate(date){
    const options = {month: 'short', year: 'numeric', day: 'numeric' }
    var dateStamp = new Date(date.seconds * 1000);
    return dateStamp.toLocaleDateString(undefined, options);
  }

  if(documents){
    return(
      <div className="row row-cols-1 row-cols-md-4 row-cols-sm-2">
        {
          documents.map((doc, index) => (
            <div className="col mb-4" key={index}>
              <Card className="h-100">
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
  else{
    return null
  }
}

function mapStateToProps(state){
  return{
    documents: state.drive.documents
  };
}

export default connect(mapStateToProps)(GridBuilder);
