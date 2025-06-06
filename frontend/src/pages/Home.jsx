import Carousel from "../components/Sidebar";
import Featured from "../components/Featured";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Offer from "../components/Offer";
import Vendor from "../components/Vendor";

export default function Home() {
  return (
    <>
      <Carousel />
      <Featured />
      <Categories />
      <Products type="Featured"/>
      <Offer />
      <Products type="Recent"/>
      <Vendor />
    </>
  );
}
