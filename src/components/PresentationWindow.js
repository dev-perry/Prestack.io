import React from "react";
import ReactDOM from "react-dom";
import copyStyles from '../tools/copyStyles';
import copyScripts from '../tools/copyScripts';
//Code Source: https://gist.github.com/davidgilbertson/de5e5b84373ee60d91525ab37278913e#file-mywindowportal-jsx

class PresentationWindow extends React.PureComponent{
  constructor(props){
    super(props);
    //creating container <div>
    this.container = document.createElement('div');
    this.externalWindow = null;
  }

  render(){
    //Stick any children passed to window to div container
    return ReactDOM.createPortal(this.props.children, this.container);
  }

  componentDidMount(){
    //open window and create reference
    this.externalWindow = window.open('','','width=600, height=400, left=200, top=200');
    this.externalWindow.document.title = 'Tozme Presentation Player';
    //Copy styles to window
    copyStyles(document, this.externalWindow.document);
    //Attach the div, with its appended children to window body
    this.externalWindow.document.body.appendChild(this.container);
    //Copy necessary scripts
    copyScripts(document,this.externalWindow.document);
  }

  componentWillUnmount(){
    //when Presentation Controller tells the window to close
    this.externalWindow.close()
  }
}

export default PresentationWindow;
