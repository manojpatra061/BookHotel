const SearchBar = () => {
  return (
    <div className="bg-blue-800 pt-4 px-10 md:px-40">
      <form
        action="#"
        className="bg-orange-400 p-4 -mb-6 container mx-auto flex flex-row justify-evenly items-center flex-wrap gap-4 *:grow"
      >
        <input type="text" />
        <input type="text" />
        <input type="date" />
        <input type="date" />
        <div className="flex gap-2 justify-center">
          <button
            type="submit"
            className="text-lg font-bold bg-blue-800 text-white px-1 grow"
          >
            search
          </button>
          <button
            type="reset"
            className="text-lg font-bold bg-red-800 text-white px-1 grow"
          >
            clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
