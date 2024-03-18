import HeroSlider from "@/components/Banners/HomeSlider";
import ProductSlider from "@/components/Slider/ProductSlider";

const HomePage = () => {
  return (
    <main>
      <HeroSlider />
      <ProductSlider />
    </main>
  );
};

export const BACKEND_URL = process.env.BACKEND;
export default HomePage;
