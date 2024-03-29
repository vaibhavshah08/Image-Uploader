import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold  mb-4 text-slate-800'>Welcome to Image Uploader using MERN stack</h1>
      <p className='mb-4 text-slate-700'>
        This is a MERN (MongoDB, Express, React, Node.js) stack application with
        authentication. It allows users to sign up, log in, and log out, and
        provides access to protected routes only for authenticated users.
      </p>
      <p className='mb-4 text-slate-700'>
        The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Node.js and
        Express, and uses MongoDB as the database. Authentication is implemented
        using JSON Web Tokens (JWT). We are using Firebase as our storage provider
        media files and Images.
      </p>
      <p className='mb-4 text-slate-700 text-center animate-pulse font-bold'>
        Please click the button below to use the app.
      </p>
      <div className="flex justify-center">
        <Link to='/home' className='bg-emerald-500 max-w-60
        rounded-lg text-sm px-4 py-2 text-white hover:bg-emerald-300 '>
          Start Using App
        </Link>
      </div>
    </div>
  );
}
