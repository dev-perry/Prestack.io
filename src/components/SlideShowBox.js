import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import {connect} from "react-redux";
import firebase from "../firebase";
import SlideBuilder from "../layouts/SlideBuilder";


function SlideShowBox(props){
  const {user} = props;
  const db = firebase.firestore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [items, setSeq] = useState();
  const {showid} = useParams();

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  useEffect(()=>{
    db.collection("users").doc(user.uid).collection("presentations").doc(showid).get().then(function(doc) {
      setSeq(doc.data().sequence)
      console.log(doc.data().sequence);
    }).catch(function(error) {
      console.log("Error getting document ", error);
    })
  //eslint-disable-next-line
  },[])

  return (
    <div className="vh-100 vw-100">
    {
      items != null ?
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={false}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {
          items.map((item,index) => {
            return (
              <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={index}
              >
                <SlideBuilder module={item}/>
              </CarouselItem>
            );
          })
        }
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
      : <div className="my-auto">Loading slideshow</div>
    }
  </div>
  );
}

function mapStateToProps(state){
  return{
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(SlideShowBox);
