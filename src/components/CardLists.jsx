import StoryCard from "./StoryCard";
function CardLists() {
  return (
    <>
      <StoryCard
        title="Enjoy on your TV."
        subTitle=" Watch on Smart TVs, Playstation, Xbox, Chromecast. Apple TV, Blu-ray
        players, and more."
        image="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
        video="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
      />
      <StoryCard
        animTitle="Stranger Things"
        animSubTitle="Downloading..."
        hasAnimation={true}
        subImage="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
        title="Download your shows to watch offline."
        subTitle="Save your favorites easily and always have something to watch."
        image="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
        isLeft={true}
      />
      <StoryCard
        title="Save your favorites easily and always have something to watch."
        subTitle="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
      />
      <StoryCard
        title="Create profiles for kids."
        subTitle="Send kids on adventures with their favorite characters in a space made just for them—free with your membership."
        image="https://occ-0-6554-58.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABfpnX3dbgjZ-Je8Ax3xn0kXehZm_5L6-xe6YSTq_ucht9TI5jwDMqusWZKNYT8DfGudD0_wWVVTFLiN2_kaQJumz2iivUWbIbAtF.png"
        isLeft={true}
      />
    </>
  );
}
export default CardLists;
