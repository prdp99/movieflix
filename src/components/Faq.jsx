import { useState } from "react";
import Collapsible from "./Collapsible";
import GetEmail from "./GetEmail";
import classes from "./faq.module.css";

function Faq() {
  return (
    <>
      <div className={classes.faq_wrapper}>
        <div className={classes.faq_container}>
          <h2>Frequently Asked Questions</h2>
          <Collapsible question="What is Netflix?">
            <p>
              Netflix is a streaming service that offers a wide variety of
              award-winning TV shows, movies, anime, documentaries, and more on
              thousands of internet-connected devices.
            </p>
            <p>
              You can watch as much as you want, whenever you want without a
              single commercial - all for one low monthly price. There's always
              something new to discover and new TV shows and movies are added
              every week!
            </p>
          </Collapsible>
          <Collapsible question="How much does Netflix cost?">
            <p>
              Watch Netflix on your smartphone, tablet, Smart TV, laptop, or
              streaming device, all for one fixed monthly fee. Plans range from
              USD3.99 to USD11.99 a month. No extra costs, no contracts.
            </p>
          </Collapsible>
          <Collapsible question="Where can I watch?">
            <p>
              Watch anywhere, anytime. Sign in with your Netflix account to
              watch instantly on the web at netflix.com from your personal
              computer or on any internet-connected device that offers the
              Netflix app, including smart TVs, smartphones, tablets, streaming
              media players and game consoles.
            </p>
            <p>
              You can also download your favorite shows with the iOS, Android,
              or Windows 10 app. Use downloads to watch while you're on the go
              and without an internet connection. Take Netflix with you
              anywhere.
            </p>
          </Collapsible>
          <Collapsible question="How do I cancel?">
            <p>
              Netflix is flexible. There are no pesky contracts and no
              commitments. You can easily cancel your account online in two
              clicks. There are no cancellation fees - start or stop your
              account anytime.
            </p>
          </Collapsible>
          <Collapsible question="What can I watch on Netflix?">
            <p>
              Netflix has an extensive library of feature films, documentaries,
              TV shows, anime, award-winning Netflix originals, and more. Watch
              as much as you want, anytime you want.
            </p>
          </Collapsible>
          <Collapsible question="is Netflix good for kids?">
            <p>
              The Netflix Kids experience is included in your membership to give
              parents control while kids enjoy family-friendly TV shows and
              movies in their own space.
            </p>
            <p>
              Kids profiles come with PIN-protected parental controls that let
              you restrict the maturity rating of content kids can watch and
              block specific titles you don't want kids to see.
            </p>
          </Collapsible>
        </div>
        <GetEmail />
      </div>
      <div className={classes.splitter}></div>
    </>
  );
}

export default Faq;
