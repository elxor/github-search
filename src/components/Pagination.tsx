import React, { FC } from 'react';


interface IPaginagionProps {
    page: number;
    totalPages: number;
    paginationHandler: (pageNum: number) => void;
}

const Pagination: FC<IPaginagionProps> = ({page, totalPages, paginationHandler}) => {
    
    if (totalPages === 1 || totalPages === 0) return null;
    return (
        <ul className="pagination justify-content-center flex-wrap">

            <li className={`page-item ${page === 1 ? 'disabled': ''}`}>
                <button
                    className="page-link"
                    onClick={() => paginationHandler(page - 1)}
                >Prev
                </button>
            </li>

            <li className={`page-item ${page === 1 ? 'active': ''}`}>
                <button
                    onClick={() => paginationHandler(1)}
                    className="page-link"
                >{1}</button>
            </li>

            {page > 3 &&
                <li className="page-item disabled">
                    <button className="page-link">...</button>
                </li>
            }
        
            {page === totalPages && totalPages > 3 &&
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={() => paginationHandler(page - 2)}
                    >{page - 2}
                    </button>
                </li>
            }


            {page > 2 &&
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={() => paginationHandler(page - 1)}
                    >{page - 1}
                    </button>
                </li>
            }

            {page !== 1 && page !== totalPages &&
                <li className="page-item active">
                    <button
                        className="page-link"
                        onClick={() => paginationHandler(page)}
                    >{page}
                    </button>
                </li>
            }

            {page < totalPages - 1 &&
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={() => paginationHandler(page + 1)}
                    >{page + 1}
                    </button>
                </li>
            }

            {page === 1 && totalPages > 3 &&
                <li className="page-item">
                    <button
                        className="page-link"
                        onClick={() => paginationHandler(page + 2)}
                    >{page + 2}
                    </button>
                </li>
            }

            {page < totalPages - 2 &&
                <li className="page-item disabled">
                    <button className="page-link">...</button>
                </li>
            }

            <li className={`page-item ${page === totalPages ? 'active' : ''}`}>
                <button
                    className="page-link"
                    onClick={() => paginationHandler(totalPages)}

                >{totalPages}</button>
            </li>

            <li className={`page-item ${page !== totalPages ? '' : 'disabled'}`}>
                <button
                    className="page-link"
                    onClick={() => paginationHandler(page + 1)}
                >Next
                </button>
            </li>
        </ul>
    );
}

export default Pagination;
