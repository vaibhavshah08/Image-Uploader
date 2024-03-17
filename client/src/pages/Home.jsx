import { FaAngleDoubleDown } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Home() {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === 'image') {
      setImage(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async () => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
        },
        (error) => {
          console.log(error);
          setImageError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      setImageError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/image/upload/${currentUser._id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json()
    navigate('/all-images')
    console.log(data)
    setFormData({});
    document.getElementById('imageName').value = '';
    document.getElementById('image').value = '';  
  };

  return (
    <>
      <div className="justify-center flex mt-5 bg-slate-500 animate-pulse">
        <h2>Welcome to Image uploader app. Upload your images by using below form!</h2>
      </div>
      <div className='p-3 max-w-lg mx-auto'>
        <div className="flex justify-center">
          <FaAngleDoubleDown className="text-3xl mr-2 pt-2 animate-bounce"/>
          <h1 className='text-3xl text-center font-semibold mb-5'>
            Upload New Image
          </h1>
          <FaAngleDoubleDown className="text-3xl ml-2 pt-2 animate-bounce"/>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='name'
            placeholder='Name'
            id='imageName'
            className='bg-slate-100 p-3 rounded-lg'
            onChange={handleChange}
          />
          <div className='p-3 rounded-lg w-fit'>Upload Image</div>
          <input
            className="w-fit"
            type='file'
            id='image'
            accept='image/*'
            onChange={handleChange}
          />
          <p className='text-sm self-center'>
            {imageError ? (
              <span className='text-red-700'>
                Error uploading image (file size must be less than 3 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className='text-green-700'>Image uploaded successfully please submit</span>
            ) : (
              ''
            )}
          </p>
          <div className="flex justify-between">
            <button
              type="submit"
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 w-2/5'
            >
              Upload Image
            </button>
            <Link to='/all-images' className='bg-slate-700 flex justify-center rounded-lg w-2/5 hover:opacity-90 disabled:opacity-80'>
              <button className="text-white rounded-lg p-3 text-center uppercase">
                See all images
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
