import React, { FC, Dispatch, SetStateAction } from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { SET_PAGE } from '../../constants/actionTypes';

// const mapDispatchToProps = (dispatch) => ({
//   onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload }),
// });

interface IListPagination {
  articlesCount: number;
  currentPage: number;
  pager: (page: number) => Promise<string>;
  onSetPage: (
    page: number,
    payload: Promise<string>
  ) => Dispatch<SetStateAction<string>>;
}

const ListPagination: FC<IListPagination> = ({
  articlesCount,
  currentPage,
  pager,
  onSetPage,
}) => {
  if (articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = (page) => {
    if (pager) {
      onSetPage(page, pager(page));
    } else {
      onSetPage(page, agent.Articles.all(page));
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {range.map((v) => {
          const isCurrent = v === currentPage;
          const onClick = (ev) => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            <li
              className={isCurrent ? 'page-item active' : 'page-item'}
              onClick={onClick}
              key={v.toString()}>
              <a className="page-link" href="ya.ru">
                {v + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

// export default connect(() => ({}), mapDispatchToProps)(ListPagination);
export default ListPagination;
