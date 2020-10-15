import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import firebase from "../firebase";
import {setPresentation} from "../actions";
import PresentationController from "../components/PresentationController";
import ActivityList from '../layouts/ActivityList';
import SlideList from "../layouts/SlideList";
import NewWindow from "react-new-window";

function SlideShow(props) {
  const {user, presentation, setPres} = props;
  const db = firebase.firestore();
  const history = useHistory();
  const [openWindow, open] = useState(false);
  const {presid} = useParams();

  useEffect(() => {
    db.collection("users").doc(user.uid).collection("presentations").doc(presid).get().then(function(doc) {
      setPres(doc.data())
    }).catch(function(error) {
      console.log("Error getting document ", error);
    })

    return () => setPres({});
    //eslint-disable-next-line
  }, [])

  const endPres = () => {
    history.replace("/c/presentations");
  }

  return (
    <>
    <Button onClick = {
    endPres
  }
  className = "mt-3 ml-5 rounded-pill" color = "danger" type = "button" > <i className="fas fa-times">
    End Presentation</i>
</Button>
    {
    presentation != null
      ? <div className="d-flex align-items-stretch">
          <Container className="pt-3">
            <Row>
              <Col className="pb-0 vh-75">
                <Card className="bg-gradient-default">
                  <CardBody>
                    <CardTitle className="text-uppercase text-muted mb-0 text-white">
                      <h1 style={{
                          color: "white"
                        }}>Attendant Activity</h1>
                    </CardTitle>
                    <div>
                      <ActivityList/>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="pb-0 vh-75">
                <Row>
                  <Card className="bg-info w-100">
                    <CardBody className="pb-0">
                      <CardTitle className="text-uppercase text-muted mb-0">
                        <h1 className="text-white">{presentation.title}</h1>
                      </CardTitle>
                      <p className="text-white">
                        {presentation.desc}
                      </p>
                    </CardBody>
                  </Card>
                </Row>
                <Row className="mt--3">
                  <Col className="pl-0">
                    <Card className="h-100">
                      <CardBody className="overflow-auto">
                        <div className="bg-white sticky-top">
                          <CardTitle className="text-uppercase text-muted mb-0">
                            <h3 className="text-dark">Modules</h3>
                          </CardTitle>
                        </div>
                        <div>
                          <SlideList/>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="pr-0">
                    <PresentationController showing={openWindow} toggleWindow={open}/>
                  </Col>
                </Row>
                <Row className="pt-3">
                  <Card style={{
                      backgroundColor: "#ced4da"
                    }} className="w-100">
                    <CardBody className="pb-0">
                      <CardTitle className="text-uppercase text-muted mb-0">
                        <h3 className="text-default">REMEMBER:</h3>
                      </CardTitle>
                      <ol className="text-default">
                        <li>Double-check you have selected the correct presentation</li>
                        <li>Select the pop-out presentation window for screen share</li>
                        <li>Use dual monitors when possible</li>
                        <li>Stop screen share before exiting presentations</li>
                      </ol>
                    </CardBody>
                  </Card>
                </Row>
              </Col>
            </Row>
          </Container>
          {
            openWindow && <NewWindow url={`/s/player/${presid}`} title={"Tozme Presentation Player"} center="screen"/>
          }
        </div>
      : <div className="my-auto">Loading presentation</div>
  } </>
)
}

function mapStateToProps(state){
  return{
    user: state.auth.user,
    presentation: state.presentations.currentPres
  }
}

const mapDispatchToProps = dispatch => {
  return{
    setPres: (pres) => dispatch(setPresentation(pres))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideShow);
