import HeroSlider from "@/components/Banners/HomeSlider";
import ProductSlider from "@/components/Slider/ProductSlider";
import Test from "@/components/Test";

const HomePage = () => {
  return (
    <main>
      <HeroSlider />
      <ProductSlider />
      {/* <Test /> */}
    </main>
  );
};

export const BACKEND_URL = process.env.BACKEND;
export default HomePage;
