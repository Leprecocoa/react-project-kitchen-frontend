import ArticleList, {
  IArticleList,
  TArticle,
} from '../../../../components/article-list/article-list';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import agent from '../../../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../../../constants/actionTypes';
import { TPayload } from '../tags/tags';

interface IYourFeedTab {
  token: string;
  tab: string;
  onTabClick: (
    tag: string,
    pager: (page: number) => IArticleList,
    payload: TPayload
  ) => Dispatch<SetStateAction<string>>;
}

interface IGlobalFeedTab {
  tab: string;
  onTabClick: (
    tag: string,
    pager: (page: number) => IArticleList,
    payload: TPayload
  ) => Dispatch<SetStateAction<string>>;
}

interface ITagFilterTab {
  tag: string;
}

interface IMainView {
  token?: string;
  tab?: string;
  tag?: string;
  pager?: () => Promise<unknown>;
  articles?: any;
  loading?: boolean;
  articlesCount?: number;
  currentPage?: number;
  onTabClick?: (
    tag?: string,
    pager?: (page: number) => IArticleList,
    payload?: TPayload
  ) => Dispatch<SetStateAction<string>>;
}

const YourFeedTab: React.FC<IYourFeedTab> = ({ token, tab, onTabClick }) => {
  if (token) {
    const clickHandler = (ev: React.MouseEvent) => {
      ev.preventDefault();
      onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    };
    return (
      <li className="nav-item">
        <a
          href="/"
          className={tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab: React.FC<IGlobalFeedTab> = ({ tab, onTabClick }) => {
  const clickHandler = (ev: React.MouseEvent) => {
    ev.preventDefault();
    onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <a
        href="/"
        className={tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab: React.FC<ITagFilterTab> = ({ tag }) => {
  if (!tag) {
    return null;
  }
  return (
    <li className="nav-item">
      <a href="/" className="nav-link active">
        <i className="ion-pound"></i> {tag}
      </a>
    </li>
  );
};

/**
 * Не типизировано, перепишется на хуки в рамках рефакторинга редакс
 */
// const mapStateToProps = (state) => ({
//   ...state.articleList,
//   tags: state.home.tags,
//   token: state.common.token,
// });

// const mapDispatchToProps = (dispatch) => ({
//   onTabClick: (tab, pager, payload) =>
//     dispatch({ type: CHANGE_TAB, tab, pager, payload }),
// });
/** */

const MainView: React.FC<IMainView> = ({
  tab,
  tag,
  token,
  pager,
  articles = [
    {
      slug: '666-uusufe',
      title: '666',
      description: '666',
      body: '666',
      createdAt: '2022-04-23T23:17:05.200Z',
      updatedAt: '2022-04-23T23:17:05.200Z',
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: '666777',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        following: false,
      },
    },
  ],
  loading,
  articlesCount,
  currentPage,
  onTabClick,
}) => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab token={token} tab={tab} onTabClick={onTabClick} />
          <GlobalFeedTab tab={tab} onTabClick={onTabClick} />
          <TagFilterTab tag={tag} />
        </ul>
      </div>
      <ArticleList
        pager={pager}
        articles={articles}
        loading={loading}
        articlesCount={articlesCount}
        currentPage={currentPage}
      />
    </div>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(MainView);
export default MainView;
