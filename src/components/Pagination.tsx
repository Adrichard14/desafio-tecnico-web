import { TMDBMovie } from '../types/TMDBMovie';
import arrowLeft from '../assets/chevron_left.svg';
import arrowRight from '../assets/chevron_right.svg';
import { useEffect, useState } from 'react';

interface PaginationProps {
  movies: TMDBMovie[] | [];
  totalPages: number;
  totalResults: number;
  currentPage: number;
  filters: string;
  handleAsyncFetchMovies: (filters: string, page: number) => void;
}

const Pagination = ({ totalPages, currentPage, filters, handleAsyncFetchMovies }: PaginationProps) => {

  const [width, setWidth] = useState<number>(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);
  const paginationItemClick = (page: number) => {
    const filterAndPage = filters;
    handleAsyncFetchMovies(filterAndPage, page);
  }
  let paginationItemsToShow = 4;
  if (width < 768) {
    paginationItemsToShow = 2;
  }

  const getPaginationItems = (pageCount: number, actualPage: number) => {
    const content = [];
    const remainingPages = pageCount - actualPage > paginationItemsToShow ? paginationItemsToShow : (pageCount - actualPage) - 1;
    if (pageCount <= 5) {
      content.push(<a className={`item-pagination item-left disabled`}><span><img src={arrowLeft} /></span></a>);
      for (let i = 0; i < pageCount; i++) {
        content.push(<a onClick={() => paginationItemClick(i + 1)} className={`item-pagination ${actualPage === i + 1 ? 'active' : ''}`}><span>{i + 1}</span></a>);
      }
      content.push(<a className={`item-pagination item-right disabled`}><span><img src={arrowRight} /></span></a>);
    }
    if (pageCount > 5) {
      if (actualPage > 1) {
        content.push(<a onClick={() => paginationItemClick(actualPage - 1)} className={`item-pagination item-left`}><span><img src={arrowLeft} /></span></a>);
        for (let i = actualPage - 1; i <= actualPage + remainingPages; i++) {
          content.push(<a onClick={() => paginationItemClick(i + 1)} className={`item-pagination ${actualPage === i + 1 ? 'active' : ''}`}><span>{i + 1}</span></a>);
        }
        content.push(<a onClick={() => paginationItemClick(actualPage + 1)} className={`item-pagination item-right`}><span><img src={arrowRight} /></span></a>);
      } else {
        content.push(<a className={`item-pagination item-left disabled`}><span><img src={arrowLeft} /></span></a>);
        for (let i = 0; i < paginationItemsToShow; i++) {
          content.push(<a onClick={() => paginationItemClick(i + 1)} className={`item-pagination ${actualPage === i + 1 ? 'active' : ''}`}><span>{i + 1}</span></a>);
        }
        content.push(<a className={`item-pagination`} onClick={() => paginationItemClick(actualPage + 1)}><span>...</span></a>);
        content.push(<a onClick={() => paginationItemClick(actualPage + 1)} className={`item-pagination item-right`}><span><img src={arrowRight} /></span></a>);
      }
    }
    return content;
  }

  return <>
    <div className="d-flex justify-content-center">
      {getPaginationItems(totalPages * 2, currentPage)}
    </div>
  </>;
}

export default Pagination;