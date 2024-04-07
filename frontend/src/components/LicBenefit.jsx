import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '../styles/benefit.css'; 

const LicBenefit = () => {
  const [inViewContent, setInViewContent] = useState(false);
  const contentRef = useRef(null);
  const controlsContent = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const topPos = contentRef.current.getBoundingClientRect().top;
        const bottomPos = contentRef.current.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // If the content is in view
        if (topPos < windowHeight && bottomPos > 0) {
          setInViewContent(true);
        } else {
          setInViewContent(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (inViewContent) {
      controlsContent.start({
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 2,
          type: 'spring',
          stiffness: 100,
        },
      });
    }
  }, [inViewContent, controlsContent]);

  return (
    <div className="benefits-container" ref={contentRef}>
      <h2>फायदे</h2>
      <motion.div
        className="benefits-icons"
        animate={controlsContent}
      >
        <div className="benefit">
          <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/career.jpg" alt="icon1" width="150px" height="150px" />
          <p>स्वतंत्र कैरियर</p>
        </div>
        <div className="benefit">
          <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/money.jpeg" alt="icon2" width="136px" height="140px" />
          <p>असीमित आय</p>
        </div>
        <div className="benefit">
          <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/loan.jpeg" alt="icon2" width="190px" height="190px" />
          <p>वाहन व गृह ऋण </p>
        </div>
        <div className="benefit">
          <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/travel.jpeg" alt="icon2" width="190px" height="190px" />
          <p>विदेश यात्रा </p>
        </div>
        {/* Add more benefits with corresponding icons */}
      </motion.div>
    </div>
  );
};

export default LicBenefit;
