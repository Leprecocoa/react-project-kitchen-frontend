import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArticlePreview from '../../components/article-preview/article-preview';
import styles from './main.module.scss';
import { useAppSelector, useAppDispatch } from 'services/hooks';
import {
  selectLazyArticles,
  selectLazyArticlesSuccess,
} from 'services/selectors/articles';
import { getLazyArticles, setLazyArticles } from 'services/slices/articles';
import PopularArticles from 'components/popular-articles/popular-articles';
import PopularTags from 'components/popular-tags/popular-tags';
import api from 'utils/api';
import Loader from 'components/loader/loader';

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectLazyArticles);
  const isSuccess = useAppSelector(selectLazyArticlesSuccess);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);
  const articlesByPage = 6;

  useEffect(() => {
    if (!isSuccess) {
      dispatch(getLazyArticles(articlesByPage));
    }
  }, [dispatch, isSuccess]);

  const fetchArticles = async () => {
    const res = api.getArticlesBy(undefined, undefined, articlesByPage, page);
    const data = await res;
    return data;
  };

  const fetchData = async () => {
    const articlesFormServer = await fetchArticles();

    dispatch(setLazyArticles(articlesFormServer));
    if (
      articlesFormServer.length === 0 ||
      articlesFormServer.length < articlesByPage
    ) {
      sethasMore(false);
    }
    setpage(page + 1);
  };

  if (articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <div style={{ padding: 20, transform: 'scale(.5)' }}>
          <Loader />
        </div>
      }
      endMessage={<p className={styles.endMsg}>Yay! You have seen it all</p>}>
      <div className={styles.container}>
        <ul className={styles.main}>
          {articles.map((article) => {
            return <ArticlePreview article={article} key={article.slug} />;
          })}
        </ul>
        <div className={styles.rightbord}>

          <PopularTags />

          <div>
            <PopularArticles />
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default MainPage;
