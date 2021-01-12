import { useFilterContext } from '../../context/actions/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filtered, grid } = useFilterContext();

  return filtered.length >= 1 ? (
    grid === false ? (
      <ListView products={filtered} />
    ) : (
      <GridView products={filtered}>product list</GridView>
    )
  ) : (
    <h5 style={{ textTransform: 'none' }}>Sorry, no products matched your search</h5>
  );
};

export default ProductList;
