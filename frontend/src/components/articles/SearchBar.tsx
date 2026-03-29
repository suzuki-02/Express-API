import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [params, setParams] = useSearchParams();
  const qFromUrl = params.get('q') ?? '';
  const [value, setValue] = useState(qFromUrl);

  // Only sync when URL changes externally
  useEffect(() => {
    setValue(qFromUrl);
  }, [qFromUrl]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const next = new URLSearchParams(params);
    const q = value.trim();

    if (q) next.set('q', q);
    else next.delete('q');

    next.set('page', '1');
    setParams(next);
  };

  const onReset = () => {
    const next = new URLSearchParams(params);
    next.delete('q');
    next.set('page', '1');
    setParams(next);
    setValue('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3"
    >
      <Search className="size-5 text-gray-500" />

      <input
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search articles..."
        className="flex-1 bg-transparent text-black placeholder:text-gray-400 caret-black outline-none"
      />

      <div className="flex items-center gap-2">
        {value && (
          <button
            type="button"
            onClick={onReset}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300"
            aria-label="Clear search"
            title="Clear"
          >
            <X className="size-4 text-black" />
          </button>
        )}

        <button
          type="submit"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
          aria-label="Search"
        >
          <Search className="size-4" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
