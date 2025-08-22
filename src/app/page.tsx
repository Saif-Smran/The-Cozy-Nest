import Category from "./Components/Catagory";
import Hero from "./Components/Hero";
import TopProducts from "./Components/TopProducts";

export default function Home() {
  return (
    <div>
      <Hero />
      <TopProducts />
      <Category />
    </div>
  );
}
