import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ 
  totalPages = 26, 
  currentPage = 1, 
  onPageChange = () => {},
  perPage = 10,
  onPerPageChange = () => {}
}) {
  const [goToPage, setGoToPage] = useState(currentPage);
  const [itemsPerPage, setItemsPerPage] = useState(perPage);
  const [showPerPageDropdown, setShowPerPageDropdown] = useState(false);
  const [showPageDropdown, setShowPageDropdown] = useState(false);

  const perPageOptions = [5, 10, 20, 50, 100];

  useEffect(() => {
    setGoToPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setItemsPerPage(perPage);
  }, [perPage]);

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      
      // Always show first page
      pages.push(1); 
      
      let middlePages = [];
      
      if (currentPage <= 2) {
        middlePages = [2, 3];
      } else if (currentPage >= totalPages - 2) {
        middlePages = [totalPages - 3, totalPages - 2];
      } else {
        middlePages = [currentPage, currentPage + 1];
      }
      
      middlePages.forEach(page => {
        if (page > 1 && page < totalPages - 1) {
          pages.push(page);
        }
      });
      
      // Always add ellipsis
      pages.push("...");
      
      // Always show last two pages
      pages.push(totalPages - 1);
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page === "..." || page === currentPage) return;
    onPageChange(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePerPageInputChange = (e) => {
    const value = e.target.value;
    setItemsPerPage(value === '' ? '' : Number(value));
  };

  const handlePerPageBlur = () => {
    setShowPerPageDropdown(false);
    if (itemsPerPage === '' || itemsPerPage < 1) {
      setItemsPerPage(perPage);
    } else if (itemsPerPage > 1000) {
      setItemsPerPage(1000);
      onPerPageChange(1000);
    } else {
      onPerPageChange(Number(itemsPerPage));
    }
  };

  const handlePerPageKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePerPageBlur();
    }
  };

  const handlePerPageSelect = (value) => {
    setItemsPerPage(value);
    onPerPageChange(value);
    setShowPerPageDropdown(false);
  };

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setGoToPage(value === '' ? '' : Number(value));
  };

  const handlePageBlur = () => {
    setShowPageDropdown(false);
    if (goToPage === '' || goToPage < 1) {
      setGoToPage(currentPage);
    } else if (goToPage > totalPages) {
      setGoToPage(totalPages);
      onPageChange(totalPages);
    } else {
      onPageChange(Number(goToPage));
    }
  };

  const handlePageKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePageBlur();
    }
  };

  const getPageSuggestions = () => {
    const suggestions = new Set([1]);
    if (totalPages > 1) suggestions.add(totalPages);
    if (currentPage > 1) suggestions.add(currentPage);
    if (currentPage < totalPages) suggestions.add(currentPage + 1);
    
    // Add some nearby pages
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      suggestions.add(i);
    }
    
    return Array.from(suggestions).sort((a, b) => a - b).slice(0, 5);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 p-3 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Left: Navigation Buttons and Page Numbers */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-full">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {generatePageNumbers().map((page, index) => {
            const isCurrentPage = page === currentPage;
            const isEllipsis = page === "...";

            return (
              <button
                key={`${page}-${index}`}
                onClick={() => handlePageClick(page)}
                disabled={isEllipsis}
                className={`
                  min-w-[32px] h-8 sm:min-w-[40px] sm:h-10 px-2 sm:px-3 flex items-center justify-center rounded-full
                  text-sm sm:text-sm font-medium transition-all duration-200
                  ${isCurrentPage 
                    ? "bg-white border-2 border-gray-800 text-gray-900 shadow-sm" 
                    : isEllipsis
                      ? "cursor-default text-gray-400"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                aria-label={isEllipsis ? "More pages" : `Go to page ${page}`}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Next page"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Right: Items Per Page and Go to Page Controls */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
        {/* Items Per Page */}
        <div className="flex items-center gap-1 sm:gap-2 relative">
          <label htmlFor="per-page" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Items:
          </label>
          <div className="relative">
            <input
              id="per-page"
              type="number"
              min="1"
              max="1000"
              value={itemsPerPage}
              onChange={handlePerPageInputChange}
              onBlur={handlePerPageBlur}
              onKeyPress={handlePerPageKeyPress}
              onFocus={() => setShowPerPageDropdown(true)}
              className="w-14 sm:w-16 h-8 sm:h-10 px-2 sm:px-3 pr-6 sm:pr-7 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
              aria-label="Items per page"
            />
            <ChevronRight 
              size={14} 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none"
            />
            {showPerPageDropdown && (
              <div className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {perPageOptions.map(option => (
                  <button
                    key={option}
                    onMouseDown={() => handlePerPageSelect(option)}
                    className="w-full px-3 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Go to Page */}
        <div className="flex items-center gap-1 sm:gap-2 relative">
          <label htmlFor="page-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">
            GoToPage:
          </label>
          <div className="relative">
            <input
              id="page-select"
              type="number"
              min="1"
              max={totalPages}
              value={goToPage}
              onChange={handlePageInputChange}
              onBlur={handlePageBlur}
              onKeyPress={handlePageKeyPress}
              onFocus={() => setShowPageDropdown(true)}
              className="w-14 sm:w-16 h-8 sm:h-10 px-2 sm:px-3 pr-6 sm:pr-7 rounded-lg border border-gray-300 bg-white text-xs sm:text-sm text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
              aria-label="Select page number"
            />
            <ChevronRight 
              size={14} 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none"
            />
            {showPageDropdown && (
              <div className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {getPageSuggestions().map(page => (
                  <button
                    key={page}
                    onMouseDown={() => {
                      setGoToPage(page);
                      onPageChange(page);
                      setShowPageDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left text-xs sm:text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
