export default function SearchBar(){
    return (
            <div className="relative max-w-2xl">
              <div className="relative flex items-center bg-white rounded-2xl shadow-large border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl focus-within:ring-4 focus-within:ring-primary-100">
                <Search className="absolute left-6 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search universities, programs, or countries..."
                  className="flex-1 pl-14 pr-4 py-5 text-base outline-none"
                />
                <button className="m-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-glow">
                  Search
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

    );
}