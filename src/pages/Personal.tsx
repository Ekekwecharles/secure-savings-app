import ActivitiesNav from "../components/ActivitiesNav";
import ChooseCard from "../components/ChooseCard";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Search from "../components/Search";

export default function Personal() {
  return (
    <div>
      <Nav />
      <Search />
      <ActivitiesNav />
      <ChooseCard />
      <Footer />
    </div>
  );
}
