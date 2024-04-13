import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(){
    return(
        <>
            <div className="w-full rounded-full relative bg-white border-2 border-gray-300 grid">
                <input placeholder="test" className="bg-transparent p-1 pl-3"/>
                <SearchIcon className='absolute right-1 top-1/2 -translate-y-1/2 bg-OWL-orange rounded-full p-0.5 cursor-pointer'/>
            </div>
        </>
    )
}