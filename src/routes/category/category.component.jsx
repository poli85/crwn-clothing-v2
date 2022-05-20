import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../store/categories/categories.selector";
import "./category.styles.scss";

const Category = () => {
  const {category} = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);
  
  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <div className="category-container">
        <h2 className="category-title">{category.toUpperCase()}</h2>
        {
          products && products.map(product => <ProductCard key={product.id} product={product}></ProductCard>)
        }
      </div>
    </Fragment>
  )
}

export default Category;