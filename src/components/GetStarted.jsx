import CardLists from "./CardLists";
import Faq from "./Faq";
import Footer from "./Footer";
import StartPage from "./StartPage";
import StoryCard from "./StoryCard";

function GetStartedPage() {
  return (
    <>
      <StartPage />
      <CardLists />
      <Faq />
      <Footer />
    </>
  );
}

export default GetStartedPage;
