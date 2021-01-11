import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../../context/actions/products_context';
import Error from '../sections/Error';
import Loading from '../utils/Loading';
import Product from './Product';

const FeaturedProducts = () => {
  const { loading, error, featured } = useProductsContext();

  return !loading ? (
    !error ? (
      <Wrapper className="section">
        <div className="title">
          <h2>featured products</h2>
          <div className="underline" />
        </div>

        <div className="section-center featured">
          {featured.slice(0, 3).map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </Wrapper>
    ) : (
      <Error />
    )
  ) : (
    <Loading />
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
