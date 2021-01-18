import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card, CardBody} from "reactstrap";
import {useParams} from "react-router-dom";
import firebase from "../firebase";
import {quiz, cloud, poll} from "../layouts/ResponseForms.js";

function Responder(props){
  const {assetID} = useParams();
  const [query, setQuery] = useState(null);
  const db = firebase.firestore();
  useEffect(()=>{
    db.collection("participation").doc(assetID).get()
    .then(function(doc){
      setQuery(doc.data());
    }).catch(function(error){
      console.log("Error getting document", error)
    })
  //eslint-disable-next-line
  },[])

  function construction(data){
    switch (data.type) {
      case "quiz":
      return quiz(data);
      case "cloud":
      return cloud(data);
      case "poll":
      return poll(data);
      default:
        return null
    }
  }

  return(
    <Container className="mt-8 pb-5 h-100">
      <Row className="justify-content-center">
        <Col className="my-auto" lg="5" md="7">
        {
          query != null ?
          <div>
          <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-5">
              <h3>{query.title}</h3>
              <p>{query.prompt}</p>
              <div className="mt-2">
                {construction(query)}
              </div>
            </CardBody>
          </Card>
        </div>
             :
            <p>Loading...</p>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Responder;
