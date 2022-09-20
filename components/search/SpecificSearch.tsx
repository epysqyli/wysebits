import { useEffect, useState, KeyboardEvent, FormEvent } from "react";
import { X, Search } from "react-feather";
import { NextRouter, useRouter } from "next/dist/client/router";

interface Props {
  placeholder: string;
  baseUrl: string;
  searchContext: string;
  dynamicResource: string;
  searchTerms: string;
}

const SpecificSearch = ({ placeholder, baseUrl, searchContext, dynamicResource, searchTerms }: Props) => {
  const [terms, setTerms] = useState<string>(searchTerms);
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setTerms(e.currentTarget.value);
  };

  const router: NextRouter = useRouter();

  const search = () => {
    router.push({
      pathname: `${baseUrl}/${dynamicResource}`,
      query: { searchTerms: terms, page: 1 }
    });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key == "Enter") search();
  };

  const clearSearch = () => {
    setTerms("");
  };

  useEffect(() => {
    if (terms === "") search();
  }, [terms]);

  return (
    <div className='flex justify-center items-center gap-x-5' onKeyDown={handleKeyPress}>
      <button type='submit' className=''>
        <Search size={26} className='mx-auto' onClick={() => search()} color='white' />
      </button>
      <input
        type='text'
        name='tmp'
        id='tmp'
        className='border-white border-b border-t-0 border-l-0 border-r-0 focus:ring-0 bg-transparent text-white focus:border-white placeholder-white text-center mb-2'
        value={terms}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
      {terms ? (
        <X
          size={26}
          color='white'
          onClick={clearSearch}
          className='cursor-pointer hover:scale-90 active:scale-75 hover:rotate-180 transition-transform'
        />
      ) : null}
    </div>
  );
};

export default SpecificSearch;
