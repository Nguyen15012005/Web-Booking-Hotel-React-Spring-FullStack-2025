import React from 'react'

const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers = Array.from({length : totalPages}, (_, i) => i + 1)
  return (
    <nav className=''>
        <ul className='pagination, justify-content-center'>
            {pageNumbers.map((pageNumbers) => (
                <li key={pageNumbers}
                    className={`page-item ${currentPage === pageNumbers ? "active" : ""}`}
                >
                    <button className='page-link' onClick={() => onPageChange(pageNumbers)}>
                        {pageNumbers}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default RoomPaginator