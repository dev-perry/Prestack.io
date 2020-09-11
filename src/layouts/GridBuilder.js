import React from "react";
// import {connect} from "react-redux";
//reactstrap componenets
import {
  Card,
  CardTitle,
  CardBody,
  CardImg,
} from "reactstrap";

import {getDate} from "../firebase/actions";

function GridBuilder(props){
  const {documents} = props;

    return(
      <div className="row row-cols-1 row-cols-md-4 row-cols-sm-2 pl-4">
        {
          documents.map((doc) => (
            <div className="col mb-4" key={doc.id}>
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

// function mapStateToProps(state){
//   return{
//     documents: state.drive.documents
//   };
// }
//
// export default connect(mapStateToProps)(GridBuilder);

export default GridBuilder;
