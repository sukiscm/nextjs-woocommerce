// Components
import Hero from '@/components/Index/Hero.component';
import ProductGridVercel from '@/components/Product/ProductGridVercel';
import Layout from '@/components/Layout/Layout.component';

// Utilities
import client from '@/utils/apollo/ApolloClient';

// Types
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

// GraphQL
import { FETCH_ALL_PRODUCTS_QUERY } from '@/utils/gql/GQL_QUERIES';

/**
 * Main index page
 * @function Index
 * @param {InferGetStaticPropsType<typeof getStaticProps>} products
 * @returns {JSX.Element} - Rendered component
 */

const Index: NextPage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Hjem">
    <Hero />
    {products && <div className="container mx-auto px-4 py-8">
  <ProductGridVercel products={products} />
</div>}
  </Layout>
);

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const { data, loading, networkStatus } = await client.query({
    query: FETCH_ALL_PRODUCTS_QUERY,
  });

  return {
    props: {
      products: data.products.nodes,
      loading,
      networkStatus,
    },
    revalidate: 60,
  };
};
