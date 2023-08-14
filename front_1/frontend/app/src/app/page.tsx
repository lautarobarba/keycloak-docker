import { PublicNavbar } from "@/components/navbar/PublicNavbar";
import { ConfigMenu } from "@/components/config-button/ConfigMenu";
import { HomeSection } from "./sections/HomeSection";
import { InstSection } from "./sections/InstSection";
import { TeamSection } from "./sections/TeamSection";
import { BlogSection } from "./sections/BlogSection";
import { MapSection } from "./sections/MapSection";

const Home = () => {
  return (
    <main>
      <PublicNavbar />
      <ConfigMenu />


      <HomeSection />
      <InstSection />
      <TeamSection />
      <BlogSection />
      <MapSection />
      {/* <BlogSection /> */}
      {/* <BigFooter /> */}
    </main>
  );
};

export default Home;
