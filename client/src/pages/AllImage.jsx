import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AllImages = () => {
  const [images, setImages] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(`/api/image/getImages/${currentUser._id}`,{
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setImages(data.images);
      } else {
        console.error('Failed to fetch images:', response.status);
      }
    };

    fetchImages();
  }, [currentUser]);

  console.log(images)
  const images2 = images.filter(image => image.imageName.toLowerCase().includes(searchQuery.toLowerCase()));

  console.log(images2)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
    <form className="max-w-md mx-auto mt-5" onSubmit={(e) => e.preventDefault()}>   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Images" 
            required 
            value={searchQuery}
            onChange={handleSearchChange}/>
            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
    </form>
    {images2.length > 0 ? 
      <div className="m-5 grid grid-cols-3 gap-4 p-5">
        {images2.map((image) => (
          <div key={image._id} className="flex flex-col items-center">
            <img src={image.image} alt={image.imageName} className="w-full h-auto rounded-lg" />
            <p className="mt-2 text-center">{image.imageName}</p>
          </div>
        ))}
      </div> : <div> No Images Found </div>
    }
    </div>
  );
};

export default AllImages;
