import classes from "./storyCard.module.css";
function StoryCard(props) {
  return (
    <>
      <div
        className={
          props.isLeft
            ? `${classes.card_container} ${classes.left}`
            : classes.card_container
        }
      >
        <div className={`${classes.card} ${classes.card_one}`}>
          <h2 className={classes.story_title}>{props.title}</h2>
          <h3 className={classes.story_sub_title}>{props.subTitle}</h3>
        </div>
        <div className={`${classes.card} ${classes.card_two}`}>
          <img src={props.image} className={classes.story_video_image} />
          <div className={`${classes.sub_image} ${classes.sub_animation}`}>
            <div
              className={props.hasAnimation ? `${classes.animation_card}` : ""}
            >
              <img src={props.subImage} className={classes.sub_image} />
              <div>
                <h3 className={classes.animation_title}>{props.animTitle}</h3>
                <p className={classes.animation_sub_title}>
                  {props.animSubTitle}
                </p>
              </div>
              <div className={props.hasAnimation ? classes.download : ""}></div>
            </div>

            <video className={classes.story_video} autoPlay muted loop>
              <source src={props.video} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className={classes.splitter}></div>
    </>
  );
}

export default StoryCard;
