import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import blog_img from '../assets/logos/blog.jpg'
import '../stylesheets/Blogs.css'; 

const BlogPage = () => {
  const blogs = [
    { 
      id: 1, 
      title: 'DeskAVR: The Ultimate Virtual Interview Platform for Engineering Students!', 
      excerpt: 'DeskAVR is a next-generation virtual interview platform designed specifically for engineering students aiming to crack interviews in top tech companies...', 
      image:blog_img // Sample image URL
    },
    
  ];

  return (
    <>
    <Navbar/>
    <div className="blog-page">
      <div className="blog-container">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <div className="blog-text">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <Link to={`/blog/${blog.id}`} >
                <button className="read_more_btn">Read More</button>
              </Link>
            </div>
            <div className="blog-image">
              <img src={blog.image} alt={blog.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default BlogPage;
