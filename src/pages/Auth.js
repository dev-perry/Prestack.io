import React, {useState} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {loginUser, signUpUser} from "../actions";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

function Auth(props){
  const {isLoggingIn, isAuthenticated, login, signup} = props;
  const sender = props.location.state;
  const [state, setState] = useState({});
  const [formLogin, setLogin] = useState(true);
  const [input, setInput] = useState({
    fname: '',
    lname: '',
    email: '',
    email2: '',
    password: '',
    password2: '',
    provider: null
  })

  function fileInput(formInput){
    for (const [key, value] of Object.entries(formInput)){
      setInput(
        {
          ...input,
          [key]: value
        }
      )
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    if(formLogin){
      login(null, input.email, input.password);
    }else if(!formLogin){
      signup({
        fname: input.fname,
        lname: input.lname,
        email: input.email,
        password: input.password
      });
    }
    // console.log(input);
  }

  if(isAuthenticated && sender){
    return <Redirect to={sender.from}/>
  }else if(isAuthenticated){
    return <Redirect to="/c/drive"/>
  }else{
    return(
      <Container className="mt-8 pb-5 h-100">
            <Row className="justify-content-center">
              <Col className="my-auto" lg="5" md="7">
                <Card className="bg-secondary border-0 mb-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>{formLogin ? "Sign in to your account" : "Create new account"}</small>
                    </div>
                    <Form role="form" onSubmit={handleSubmit}>
                      {
                        !formLogin &&
                        <FormGroup
                          className={classnames("mb-3", {
                            focused: state.focusedName
                          })}
                        >
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-user" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="First Name"
                              onFocus={() => setState({ focusedName: true })}
                              onBlur={() => setState({ focusedName: false })}
                              value={input.fname}
                              onChange={(e)=>fileInput({fname: e.target.value})}
                            />
                            <Input
                              placeholder="Last Name"
                              onFocus={() => setState({ focusedName: true })}
                              onBlur={() => setState({ focusedName: false })}
                              value={input.lname}
                              onChange={(e)=>fileInput({lname: e.target.value})}
                            />
                          </InputGroup>
                        </FormGroup>
                      }
                      <FormGroup
                        className={classnames("mb-3", {
                          focused: state.focusedEmail
                        })}
                      >
                        <InputGroup className="input-group-merge input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-envelope" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            onFocus={() => setState({ focusedEmail: true })}
                            onBlur={() => setState({ focusedEmail: false })}
                            value={input.email}
                            onChange={(e)=>fileInput({email: e.target.value})}
                          />
                          {!formLogin &&
                            <Input
                              placeholder="Confirm Email"
                              type="email"
                              onFocus={() => setState({ focusedEmail: true })}
                              onBlur={() => setState({ focusedEmail: false })}
                              value={input.email2}
                              onChange={(e)=>fileInput({email2: e.target.value})}
                            />
                          }
                        </InputGroup>
                      </FormGroup>
                      <FormGroup
                        className={classnames({
                          focused: state.focusedPassword
                        })}
                      >
                        <InputGroup className="input-group-merge input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fas fa-lock" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onFocus={() =>
                              setState({ focusedPassword: true })
                            }
                            onBlur={() =>
                              setState({ focusedPassword: false })
                            }
                            value={input.password}
                            onChange={(e)=>fileInput({password: e.target.value})}
                          />
                          {!formLogin &&
                            <Input
                              placeholder="Confirm Password"
                              type="password"
                              onFocus={() =>
                                setState({ focusedPassword: true })
                              }
                              onBlur={() =>
                                setState({ focusedPassword: false })
                              }
                              value={input.password2}
                              onChange={(e)=>fileInput({password2: e.target.value})}
                            />
                          }
                        </InputGroup>
                      </FormGroup>
                      {!isLoggingIn &&
                        <div className="text-center">
                          <Button className="my-4" color="info" type="btn">
                            {formLogin ? "Sign in" : "Create account"}
                          </Button>
                        </div>
                      }
                    </Form>
                  </CardBody>
                </Card>
                <Row className="mt-3">
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                  <Col className="text-right" xs="6">
                    <a
                      className="text-light"
                      href={formLogin ? "#login" : "#new"}
                      onClick={() => setLogin(!formLogin)}
                    >
                      <small>{formLogin ? "Create new account" : "Login to account"}</small>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
    );
  }

}

function mapStateToProps(state){
  return{
    isLoggingIn: state.auth.isLoggingIn,
    // loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return{
    login: (provider,email,password) => dispatch(loginUser(provider,email,password)),
    signup: (user) => dispatch(signUpUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
