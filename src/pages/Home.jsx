import { useEffect, useState } from "react";
import desktopImage from "../assests/hero/desktop.jpg";
import mobileImage from "../assests/hero/Mob.jpg";
import TestSlide from "../components/core/home/Slider";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/core/home/ProductCard";
import Footer from "../components/common/Footer";

function Home() {


  const [products, setProduct] = useState([]);
  const [products2, setProduct2] = useState([]);
  const { allProduct } = useSelector((state) => state.product);
  let selectedProducts

  

  const selectRandomProducts = (products) => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array");
      return [];
    }

    // Create a shallow copy of the products array
    const productsCopy = products.slice();

    // Fisher-Yates shuffle algorithm
    for (let i = productsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [productsCopy[i], productsCopy[j]] = [productsCopy[j], productsCopy[i]];
    }

    // Select the first four products from the shuffled array
    return productsCopy.slice(0, 4);
  };



  useEffect(() => {
    // fetchSubLinks();
    setProduct(allProduct );
    selectedProducts = selectRandomProducts(products);
    console.log(selectedProducts)
    setProduct2(selectedProducts)
  }, [allProduct]);

  if(allProduct.length ===0 ){
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
  <>
      <div className=" mt-[60px]">
      {/* Hero Image */}
      <div>
        <div>
          <img src={desktopImage} alt="" className="mobile" />
          <img
            src={mobileImage}
            alt=""
            className="lg:hidden sm:hidden md:hidden "
          />
        </div>




        <div>

        <div className=" flex items-center justify-between w-11/12 mx-auto mt-[10px] ">
          <p>New Drops </p>


          <Link
              to="/allProduct"
              className=""
            >
              <div
                to="/allProduct"
                className=" text-[15px] border-2 bg-red-300 text-black p-1 px-3 rounded-md"
              >
                Discover More
              </div>

              {/* <IoShirtSharp className=" text-blue-600" /> */}
            </Link>

        </div>
        {products && <TestSlide products={products} />}

        </div>
      </div>



<div className=" my-[40px] flex justify-center ">
  <img src="https://thememyparty.in/cdn/shop/products/interior-wall-decoration-home-decor-new-with-picture-of-property-in-idea-material-image-stone-photo-texture-wallpaper-cladding-living-roomcopy_600x.jpg?v=1588225780" alt="" />
</div>


      {/* Slider  */}

      <div>
      <div className=" flex items-center justify-between w-11/12 mx-auto mt-[10px] ">
          <p>Our Trending Product </p>


          <Link
              to="/allProduct"
              className=""
            >
              <div
                to="/allProduct"
                className=" text-[15px] border-2 bg-red-300 text-black p-1 px-3 rounded-md"
              >
                Discover More
              </div>

              {/* <IoShirtSharp className=" text-blue-600" /> */}
            </Link>

        </div>

      <div className="  w-11/12 mx-auto  grid lg:grid-cols-4 gap-4 sm:grid-cols-3 md:grid-cols-3 xs:grid-cols-2 grid-cols-2">
            
            
              {products &&
                products2?.map((product) => (
                  <ProductCard key={product._id} products={product} />
                ))}
            </div>
      </div>

      
    </div>
    <Footer />
  </>
  );
}

export default Home;
