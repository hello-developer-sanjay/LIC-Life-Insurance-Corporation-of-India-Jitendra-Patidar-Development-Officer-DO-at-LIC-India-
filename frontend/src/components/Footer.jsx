import  { useEffect, useRef } from 'react';

import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence,  } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus,faUniversity, faNewspaper,faBriefcase, faUserTie ,faInfoCircle} from '@fortawesome/free-solid-svg-icons';

import { FaLinkedin, FaTwitter, FaInstagram, FaGithub, FaUsers } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const FooterContainer = styled(motion.footer)`
   position: relative;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  overflow: hidden;
  background-color: #050816;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  
  /* Create a complex and artistic background pattern */
  background: 
    radial-gradient(ellipse at center, rgba(5, 8, 22, 0.15) 0%, rgba(5, 8, 22, 0) 30%, rgba(5, 8, 22, 0.4) 50%, rgba(5, 8, 22, 0) 70%, rgba(5, 8, 22, 0.15) 100%),
    linear-gradient(90deg, #010102, #010204);
  
  /* Optional: Add animation or transition properties for a dynamic effect */
  transition: background 0.3s ease-in-out;
`;
const Text = styled.h1`
  margin-top: 0rem;;
  font-size: 1.1rem;
  text-align: left;
  letter-spacing: 0.2px; 
  color: #fff; 
  padding: 2px 5px; /* Padding to create space around the text */

`;

const BorderLineTop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  min-width: 100%;
  height: 4px;
  background: linear-gradient(to right, #ffbb00, #e85d04);
  background-size: 200% 100%;
  box-shadow: 0 0 10px rgba(232, 93, 4, 0.8);
  animation: gradientAnimation 2s linear infinite;
  @keyframes gradientAnimation {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`;

const BorderLineBottom = styled(BorderLineTop)`
  top: auto;
  bottom: 0;
`;

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const neonGlow = keyframes`
  0%, 100% {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  50% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
                0 0 20px rgba(255, 255, 255, 0.8),
                0 0 30px rgba(255, 255, 255, 0.8);
  }
`;

const CatchyMessage = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  color: white;
  word-wrap: break-word;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }

  /* Add a little bounce animation */
  animation: ${bounceAnimation} 1s infinite;

  /* Add fadeIn animation */
  animation: ${fadeIn} 1s ease-in-out;

  /* Add a neon glow effect */
  animation: ${neonGlow} 1s infinite;

  /* Combine animations */
  animation: ${bounceAnimation} 1s infinite, ${fadeIn} 1s ease-in-out, ${neonGlow} 1s infinite;
`;
const SocialIconsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${props => props.color || '#ff6347'};
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    background 0.3s ease;

  &:hover {
    transform: scale(1.2) rotate(360deg);
    background: ${props => props.color || '#e74c3c'};
  }

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
  }

  &:not(:last-child) {
    margin-right: 1rem;
  }

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0)
    );
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 50%;
  }

  &:hover:before {
    transform: translateY(0);
  }

  /* Add a heartbeat animation for extra flair */
  animation: heartbeat 1.5s infinite;

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;
const FooterButton = styled(motion.button)`
  padding: 0.5rem 1rem;
  background-color: #ff4d4d;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  width: 100%;
  max-width: 500px;

    border: 2px solid #ff6b6b; 

`;

const ContactInput = styled.input`
  padding: 1rem;
  border: 1px solid #555;
  border-radius: 5px;
  width: 100%;
  font-size: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;

  &:hover, &:focus {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const NavigationContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
gap : 2rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    width: 60%;
    margin: 0 auto;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  margin: 5px 0;

  &:hover {
    color: #666;
  }
`;

const ContactTextArea = styled.textarea`
  padding: 1.5rem;
  border: none;
  border-radius: 10px;
  width: 100%;
  resize: vertical;
  font-size: 1rem;
  color: #fff;
  background-color: #1a1a1a;
  transition: box-shadow 0.3s ease;

  &::placeholder {
    color: #666;
  }

  &:hover, &:focus {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }

  // Add a subtle pulsating animation on hover
  &:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    animation: pulse 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
`;
const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ffbb00;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e85d04;
  }
`;

const QueryInput = styled(ContactTextArea)`
  // Additional styling for query input
`;
const QueryButton = styled(SubmitButton)`
  // Base styles from SubmitButton
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 25px;
  font-size: 1.3rem;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  transition: background 0.3s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  // Additional styling specific to QueryButton
  margin-top: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  // Shining gradient border effect
  border: 2px solid transparent;
  background-clip: padding-box;
  background-image: linear-gradient(135deg, #e74c3c, #3498db);
  transition: border 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #2c3e50, #2c3e50);
    transform: translateY(-3px) scale(1.05);
    border: 2px solid #e74c3c;
  }

  // Add a subtle pulse animation on hover
  &:hover:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: pulse 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;
const Next = styled.h1`
font-size: 1.1rem;
color: #f3f3f3;
margin-bottom: 1.5rem;
line-height: 1.4;
text-align: justify;
border-left: 4px solid #5d00ff;
border-right: 4px solid #5d00ff;

padding-left: 2px;
padding-right:2px;
border-radius: 8px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Onlyforlap = styled.div`

  margin-top: 2rem;
  margin-bottom: 1rem;
margin-right : 1rem;
margin-left: 1rem;

  @media (max-width: 768px) {
    margin-top: 0rem;
  
  }
`;
const Introduction = styled(motion.p)`
  font-size: 1.5rem;
  line-height: 1.5;
  max-width: 800px;
  text-align: center;

  color: #ffffff; /* White on hover */
  font-family: 'Playfair Display', serif;

  
  .highlight {
    position: relative;
    display: inline-block;
    font-size: 3rem;
    font-weight: bold;
    color: transparent;
    font-family: 'Playfair Display', serif;

    background: linear-gradient(45deg, #ff4081, #00bcd4); /* Gradient highlight */
    background-clip: text;
    -webkit-background-clip: text;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Shadow for depth */
    padding-bottom: 0px;
    /* Animation for the highlight class */
    animation: highlightAnimation 3s ease-in-out infinite;
    @media (max-width: 768px) {
  font-size: 1.5rem;
  line-height: 2rem;

  }
  }


  @keyframes highlightAnimation {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: linear-gradient(45deg, #ff4081, #00bcd4); /* Gradient border */
    margin-top: 0px;
    position: relative;
    animation: shimmerAnimation 3s ease-in-out infinite;
  }

  
  @keyframes shimmerAnimation {
    0% {
      background-position: -200% 50%;
    }
    100% {
      background-position: 200% 50%;
    }
  }
   @media (max-width: 768px) {
  margin-top:1rem;
  font-size: 1.2rem;

  }
`;
const NavHeading = styled.h2`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;






const Footer = () => {
  const catchyMessages = [
    "Stay Curious. Connect with Us!",
    "Exploring the Future. Get Involved!",
  ];
  const [isToastVisible, setIsToastVisible] = useState(false);
  const copyContactNumber = () => {
    const contactNumber = document.getElementById('contactNumber');
    const range = document.createRange();
    range.selectNode(contactNumber);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Contact number copied!');
  };
  const copyInstaID = () => {
    const instaID = document.getElementById('instaID');
    const range = document.createRange();
    range.selectNode(instaID);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Instagram ID copied!');
  };
  const handleCareerInsightsClick = () => {
    if (!isToastVisible) {
      toast.info("Please wait! You're now being redirected to delve into Blog insights on Sanjay Patidar's Portfolio Website...", {
        autoClose: 3000,
        onOpen: () => setIsToastVisible(true),
        onClose: () => setIsToastVisible(false),
      });

      setTimeout(() => {
        window.open("https://sanjay-patidar.vercel.app/blogs", "_blank");
      }, 3000); 
    }
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    return `${month} ${day}, ${year}`;
  };

const footer = useRef(null);
useEffect(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        toast.info(
          "नमस्ते! अगर आपके पास कोई सुझाव या प्रश्न है व्यवस्थापक के लिए, तो कृपया उन्हें हमें अलग से भेजें। हम आपकी प्रतिक्रिया की प्रतीक्षा करेंगे। धन्यवाद!",
          {
            position: "top-right", 
            autoClose: 10000, 
            hideProgressBar: false, 
            closeOnClick: true, 
            pauseOnHover: true, 
            draggable: true, 
            progress: undefined,
            style: {
              background: "#487503", 
              color: "#fff", 
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)", 
              borderRadius: "10px", 
            },
          }
        );
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  const footerElement = document.getElementById("footer");

  if (footerElement) {
    observer.observe(footerElement);
  }

  return () => {
    if (footerElement) {
      observer.unobserve(footerElement);
    }
  };
}, []); // Make sure to i
  const getRandomCatchyMessage = () =>
    catchyMessages[Math.floor(Math.random() * catchyMessages.length)];

  const socialButtons = [
    { icon: <FaLinkedin />, label: "LinkedIn", link: "https://www.linkedin.com/in/sanjay-patidar-25b580292" },
    { icon: <FaGithub />, label: "GitHub", link: "https://github.com/hello-developer-sanjay" },
    { icon: <FaTwitter />, label: "Twitter", link: "#" },
    { icon: <FaInstagram />, label: "Instagram", link: "https://www.instagram.com/sanjay_patidar_mcmxcviii" },
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const feedback = formData.get("message");
    const query = formData.get("query");

    if (!name || !email) {
      toast.error("Please provide your name and email.");
      return;
    }

    if (!feedback && !query) {
      toast.error("Please provide either feedback or a query.");
      return;
    }

    try {
let endpoint = "submit-feedback";
      let successMessage = "Feedback submitted successfully! Thank you for your feedback.";

      if (query) {
        endpoint = "submit-query";
        successMessage = "Query sent! Await our swift reply, tailored just for you.";
      }

      const response = await fetch(`https://eduxcel-api3.onrender.com/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          feedback: feedback || query,
          query,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(successMessage);
      } else {
        console.error("Error submitting feedback/query");
        toast.error("Error submitting feedback/query. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting feedback/query:", error);
      toast.error("Error submitting feedback/query. Please try again later.");
    }
  };

  return (
    <FooterContainer id="footer">
      <BorderLineTop
        initial={{ width: 0 }}
        animate={{ width: "80%" }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <BorderLineBottom
        initial={{ width: 0 }}
        animate={{ width: "80%" }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      <CatchyMessage>
        {getRandomCatchyMessage()}
      </CatchyMessage>
      <FooterButton
        color="#4db6ac"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Navigate to user profiles"
      >
        <FaUsers />
      </FooterButton>
      <AnimatePresence>
       <SocialIconsContainer>
          {socialButtons.map((button, index) => (
            <SocialIcon
              key={index}
              color={button.color}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              href={button.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={button.label} // Provide an accessible label for the link
            >
              {button.icon}
            </SocialIcon>
          ))}
        </SocialIconsContainer>
      </AnimatePresence>
      <Onlyforlap>
  <Introduction>
    <Next>
      ☎ Jitendra Patidar <span className="light">Contact | Mobile Number : </span>{' '}
      <a href="tel:+917987235207" id="contactNumber" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>+91 7987 235 207</a> 📞 | OR |
      
      <button onClick={copyContactNumber} style={{ marginLeft: '4px', color: '#fff', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer' }}>Copy Number</button>
    </Next>

    <Next>
  🔗 <span className="light">Jitendra Patidar's Instagram ID : </span>{' '}
  <a href="https://www.instagram.com/jay7268patidar"style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }} id="instaID" target="_blank">jay7268patidar</a>
  {' '} | OR | {' '}
  <button onClick={copyInstaID} style={{ marginLeft: '4px', color: '#fff', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer' }}>Copy Insta ID</button>
</Next>


    <Next>
      <span className="light"> LIC Development Officer (DO)| Founder | Developer | Creator | Visionary | Innovator | Leader | <br /> | Entrepreneur | Technologist |</span><br />
    </Next>
    
    <Text>➥ Curious to know more about Lic <a style={{ color: '#FAF7F7', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer', textDecoration: "none" }} href="https://licindia.in/hi/home" target="_blank">Lic WebLink</a> to explore!</Text>
  </Introduction>
</Onlyforlap>


  

      <ContactForm
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleFormSubmit}
      >
        <ContactInput type="text" name="name" placeholder="Your Name" />
        <ContactInput type="email" name="email" placeholder="Your Email" />
        <ContactTextArea
          name="message"
          rows="5"
          placeholder="Write your feedback here..."
        />
        <QueryInput
          name="query"
          rows="5"
          placeholder="Have a question? Write your query here..."
        />
       <QueryButton type="submit" aria-label="Submit feedback or query form">
        Submit
      </QueryButton>
      </ContactForm>



      <ToastContainer
  className="custom-toast-container"
  position="top-right"
  style={{ marginTop: '100px' }}
/>






<Text>
</Text>
<Text>Discover the world of Sanjay Patidar: Innovator, Developer, and Founder. Ready to explore? <a style={{ color: '#FAF7F7', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer', textDecoration: 'none' }} href='https://sanjay-patidar.vercel.app/' target='_blank'>Sanjay Patidar</a> to dive in!</Text>
<Text>
  <span style={{ color: '#ffbb00', fontWeight: 'bold', fontSize: '1.2rem' }}>©</span> All rights reserved to&nbsp;
  <span style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#ffbb00' }}>EduXcel</span> founded by&nbsp;
  <span style={{ fontWeight: 'bold', color: '#ffbb00' }}>Sanjay Patidar</span><br />
  <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{getCurrentDate()} | India</span>
</Text>
    </FooterContainer>
  );
};

export default Footer;
