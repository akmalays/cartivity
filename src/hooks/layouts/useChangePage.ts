import { useDispatch } from 'react-redux';

import { setIsLoading, setUserPageType } from '../../store/user/userStore';

export function useChangePage() {
  const dispatch = useDispatch();

  function changePage(pageType: "shop" | "task") {
    dispatch(setUserPageType({pageType}));
    dispatch(setIsLoading({isLoading: true}));

    setTimeout(() => {
      dispatch(setIsLoading({isLoading: false}));
    }, 2000);
  }

  function changeToShopPage() {
    changePage("shop");
  }

  function changeToTaskPage() {
    changePage("task");
  }

  return {
    changePage,
    changeToShopPage,
    changeToTaskPage,
  };
}
