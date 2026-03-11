import { useSelector } from 'react-redux';

import { RootState } from '../app/store';
import DefaultLayout from '../components/layouts/DefaultLayout';
import Header from '../components/layouts/Header';
import Products from '../components/layouts/Products';
import Task from '../components/layouts/Task';
import Loading from '../components/loading/loading';

function HomePage() {
  const {isLoading, pageType} = useSelector((state: RootState) => state.userStore);
  return (
    <DefaultLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          {pageType === "shop" ? <Products /> : <Task />}
        </>
      )}
    </DefaultLayout>
  );
}
export default HomePage;
