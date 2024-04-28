import  { useEffect, useRef } from 'react';
import profileImage1 from '../assets/jitendraprofilephoto.jpg';
import Rating from '../components/Rating';
import Review from '../components/Review';
import benefit from '../styles/benefit.css';

import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence,  } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus,faUniversity, faNewspaper,faBriefcase, faUserTie ,faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
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
  text-align:center;
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

  /* Combine animations */
  animation: ${bounceAnimation} 2s infinite, ${fadeIn} 1s ease-in-out;
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

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const ProfileImageContainer = styled.div`
  flex-shrink: 0;

  @media (min-width: 768px) {
    order: 1;
    margin-right: 2rem;

    align-self: flex-start; /* Align the image to the start of the container on larger screens */
  }
  
`;
const ProfileImage = styled(motion.img)`
  width: 350px;
  height: 350px;
  margin-top: 2rem;
  margin-left: 10rem;

  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.8), 0 0 20px rgba(255, 165, 0, 0.6);
  transform-origin: center;
  animation: heartbeat 1.5s infinite, rotateAndGlow 8s infinite, bounce 2s alternate infinite;

  &.loading {
    border: 2px solid transparent;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      z-index: 1;
      border-radius: 50%;
      border: 2px solid #fff; // Change the color as needed
      animation: loadingAnimation 1.5s linear infinite;
    }

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 100%;
      border-left: 2px dashed #fff; // Change the color as needed
      animation: loadingLineAnimation 1.5s linear infinite;
    }
  }

  @keyframes loadingAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loadingLineAnimation {
    0% {
      height: 0;
    }
    50% {
      height: 100%;
    }
    100% {
      height: 0;
    }
  }




  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  margin-top : 2rem;
    margin-left: 3rem;

}

  @keyframes heartbeat {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes rotateAndGlow {
    0%, 100% {
      transform: rotate(0deg) scale(1);
      box-shadow: 0 0 10px rgba(255, 165, 0, 0.8), 0 0 20px rgba(255, 165, 0, 0.6);
    }
    25% {
      transform: rotate(90deg) scale(1.2);
      box-shadow: 0 0 15px rgba(255, 165, 0, 0.9), 0 0 30px rgba(255, 165, 0, 0.7);
    }
    50% {
      transform: rotate(180deg) scale(1);
      box-shadow: 0 0 10px rgba(255, 165, 0, 0.8), 0 0 20px rgba(255, 165, 0, 0.6);
    }
    75% {
      transform: rotate(270deg) scale(1.2);
      box-shadow: 0 0 15px rgba(255, 165, 0, 0.9), 0 0 30px rgba(255, 165, 0, 0.7);
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
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






const Home = () => {
  const catchyMessages = [
    "LIC एजेंट बनने के लिए आज ही संपर्क करें जीतेंद्र पाटीदार अधिकारी(LIC, Neemuch) से । भारतीय जीवन बीमा निगम ,नीमच (मध्य प्रदेश)",
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
          "नमस्ते! अगर आपके पास कोई सुझाव या प्रश्न है तो कृपया उन्हें हमें अलग- अलग से भेजें। हम आपकी प्रतिक्रिया की प्रतीक्षा करेंगे। धन्यवाद!",
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


  const [imageLoading, setImageLoading] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const feedback = formData.get("message");
    const query = formData.get("query");
  
    if (!name) {
      toast.error("कृपया अपना नाम भरें !  ");
      return;
    }
  
    if (!feedback && !query) {
      toast.error("कृपया प्रतिक्रिया या प्रश्न प्रदान करें ।");
      return;
    }
  
    try {
      let endpoint = "submit-feedback";
      let successMessage = "प्रतिक्रिया सफलतापूर्वक जमा किया गया! आपकी प्रतिक्रिया के लिए आपका धन्यवाद।";
  
      if (query) {
        endpoint = "submit-query";
        successMessage = "प्रश्न भेजा गया! हमारे उत्तर की प्रतीक्षा करें, जो केवल आपके लिए तैयार किया गया है।";
      }
  
      const response = await fetch(`https://eduxcel-api-14april.onrender.com/api/${endpoint}`, {
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
        console.error("प्रतिक्रिया/प्रश्न जमा करने में त्रुटि");
        toast.error("प्रतिक्रिया/प्रश्न जमा करने में त्रुटि. कृपया बाद में पुन: प्रयास करें !");
      }
    } catch (error) {
      console.error("प्रतिक्रिया/प्रश्न जमा करने में त्रुटि:", error);
      toast.error("प्रतिक्रिया/प्रश्न जमा करने में त्रुटि. कृपया बाद में पुन: प्रयास करें !");
    }
  };
  

  return (
    <>
    <FooterContainer id="footer">
        <Helmet>
    
    <title>LIC Neemuch | Contact Jitendra Patidar, LIC Development Officer (DO) - Neemuch, Mandsaur, Ratangarh ,Singoli, Manasa, Jawad, Sarwaniya Maharaj|LIC एजेंट बनने के लिए जीतेंद्र पाटीदार (LIC, Neemuch) से संपर्क करें|TOP LIC Agents in Neemuch | Best LIC Agents in Neemuch , Best LIC Officer in Neemuch, Singoli, Ratangarh LIC India </title>
 <meta
   name="description"
   content="अगर आप LIC एजेंट बनने की सोच रहे हैं, तो अब ही जुड़ें और अपने भविष्य को सुरक्षित करने का पहला कदम उठाएं। LIC एजेंट बनने के लिए आज ही संपर्क करें जीतेंद्र पाटीदार अधिकारी (LIC, Neemuch) से।
   भारतीय जीवन बीमा निगम (LIC) एक विश्वसनीय और प्रमुख बीमा कंपनी है जो भारत में अपनी उत्कृष्ट सेवाओं के लिए प्रसिद्ध है। LIC के अधिकारी, जैसे कि जीतेंद्र पाटीदार (LIC, Neemuch), अपने क्षेत्र में विशेषज्ञता और निपुणता के साथ काम करते हैं। उन्होंने अपने क्षेत्र में अपने अच्छे नेतृत्व और विशेषज्ञता के लिए प्रशंसा प्राप्त की है।
   
   LIC के एजेंट बनने का एक उत्कृष्ट और सम्मानित कार्य है। यह एक संघर्षमय और प्रतिस्पर्धी क्षेत्र है, जहां आपको अपनी सामर्थ्य का परिचय देना होगा और लोगों को उनकी आवश्यकताओं के अनुसार बीमा योजनाओं की सलाह देनी होगी।
   
   LIC एजेंट बनने के लिए अपनाएं कुछ महत्वपूर्ण कदम। पहले, आपको LIC की नियम और शर्तों को समझना होगा और उनके अनुसार काम करना होगा। फिर, आपको एक परीक्षा पास करनी होगी और अपने क्षेत्र में अच्छे नेतृत्व कौशलों को प्रदर्शित करना होगा।
   
   जब आप एक LIC एजेंट बन जाते हैं, तो आपको लाभ मिलता है एक स्थायी और सुरक्षित करियर के रूप में। आपको उत्कृष्ट प्रशिक्षण और समर्थन प्राप्त होता है, जो आपको अधिक सफलता की दिशा में आगे बढ़ने में मदद करता है।
   
   LIC एजेंट बनने का यह एक अद्भुत मौका है जो आपको अपने व्यक्तित्व को विकसित करने और अपनी आमदनी को बढ़ाने की समर्था प्रदान करता है। आप अपने ग्राहकों की आवश्यकताओं को समझते हैं और उन्हें उनके लिए सबसे उत्तम बीमा योजना प्रदान करते हैं।
   
   जीतेंद्र पाटीदार अधिकारी (LIC, Neemuch) आपको अपनी टीम में जोड़ने का अवसर प्रदान करते हैं। वे आपको सहायता और मार्गदर्शन प्रदान करेंगे ताकि आप LIC एजेंट बनने के लिए तैयार हो सकें।LIC Neemuch is a branch of the Life Insurance Corporation of India, led by Jitendra Patidar as the Development Officer (DO). Jitendra helps people in Neemuch, Mandsaur, Ratangarh, Singoli, Indore, and Jaipur with their insurance needs. At LIC Neemuch, we focus on keeping families financially secure. With Jitendra's guidance, we provide simple and effective insurance options for everyone in these areas.Jitendra Patidar, an esteemed  Development Officer (DO) at LIC India, epitomizes the pinnacle of professionalism and expertise within the insurance industry. Jitendra Patidar, our esteemed Development Officer (DO), operates from the headquarters located in Neemuch District, Madhya Pradesh. With a strong presence across all regions and cities of India, including Ratangarh, Neemuch, Singoli, Mandsaur, and more, Jitendra diligently serves our valued clients nationwide. As a trusted representative of LIC, Jitendra ensures that our insurance solutions reach every corner of the country, providing financial security and peace of mind to individuals and families from diverse backgrounds. With his commitment and expertise, Jitendra exemplifies LIC's mission to be a beacon of trust and reliability in the insurance industry, serving our customers with dedication and integrity.With a rich background in fostering growth and nurturing talent, Jitendra leads by example, guiding his team towards excellence in serving our valued clients. At LIC India, we are committed to providing comprehensive life insurance solutions that safeguard the financial well-being of individuals and families across the nation.Contact Jitendra Patidar, an esteemed Development Officer (DO) at LIC India, epitomizes the pinnacle of professionalism and expertise within the insurance industry. Jitendra Patidar, our esteemed Associate Development Officer (ADO), operates from the headquarters located in Neemuch District, Madhya Pradesh. With a strong presence across all regions and cities of India, including Ratangarh, Neemuch, Singoli, Mandsaur, and more, Jitendra diligently serves our valued clients nationwide. As a trusted representative of LIC, Jitendra ensures that our insurance solutions reach every corner of the country, providing financial security and peace of mind to individuals and families from diverse backgrounds. With his commitment and expertise, Jitendra exemplifies LIC's mission to be a beacon of trust and reliability in the insurance industry, serving our customers with dedication and integrity.With a rich background in fostering growth and nurturing talent, Jitendra leads by example, guiding his team towards excellence in serving our valued clients. At LIC India, we are committed to providing comprehensive life insurance solutions that safeguard the financial well-being of individuals and families across the nation.

As India's leading life insurance provider, LIC offers a diverse range of insurance products tailored to meet the evolving needs of our customers. Whether it's securing your family's future, planning for retirement, or investing in wealth creation, LIC has you covered with innovative and reliable insurance plans.

Our team of dedicated professionals, under the leadership of Jitendra Patidar, works tirelessly to ensure that our customers receive personalized attention and top-notch service. We believe in building long-lasting relationships based on trust, transparency, and integrity. With LIC, you can rest assured that your financial goals are in safe hands.

At LIC India, we pride ourselves on our extensive network of agents and development officers who are committed to providing expert guidance and support at every step of your insurance journey. From selecting the right policy to assisting with claims processing, our team is here to assist you with professionalism and empathy.

In addition to our core insurance offerings, LIC India is also committed to promoting financial literacy and inclusion across the country. Through various outreach programs and educational initiatives, we strive to empower individuals with the knowledge and resources they need to make informed financial decisions.

Furthermore, LIC India is deeply committed to corporate social responsibility (CSR) initiatives aimed at uplifting communities and making a positive impact on society. From supporting education and healthcare initiatives to environmental sustainability projects, we are dedicated to creating a brighter and more equitable future for all.

Join hands with Jitendra Patidar and the LIC India team today to experience the difference that personalized service and unmatched expertise can make in securing your financial future. Contact us now to explore our comprehensive range of insurance solutions and embark on a journey towards financial security and peace of mind with LIC India."
 />
 

 <meta property="og:title" content="LIC Neemuch | Contact Jitendra Patidar, LIC Development Officer (DO) - Neemuch, Mandsaur, Ratangarh ,Singoli, Manasa, Jawad, Sarwaniya Maharaj|LIC एजेंट बनने के लिए जीतेंद्र पाटीदार (LIC, Neemuch) से संपर्क करें|TOP LIC Agents in Neemuch | Best LIC Agents in Neemuch , Best LIC Officer in Neemuch, Singoli, Ratangarh LIC India " />
 <meta property="og:description" content="अगर आप LIC एजेंट बनने की सोच रहे हैं, तो अब ही जुड़ें और अपने भविष्य को सुरक्षित करने का पहला कदम उठाएं। LIC एजेंट बनने के लिए आज ही संपर्क करें जीतेंद्र पाटीदार अधिकारी (LIC, Neemuch) से।
भारतीय जीवन बीमा निगम (LIC) एक विश्वसनीय और प्रमुख बीमा कंपनी है जो भारत में अपनी उत्कृष्ट सेवाओं के लिए प्रसिद्ध है। LIC के अधिकारी, जैसे कि जीतेंद्र पाटीदार (LIC, Neemuch), अपने क्षेत्र में विशेषज्ञता और निपुणता के साथ काम करते हैं। उन्होंने अपने क्षेत्र में अपने अच्छे नेतृत्व और विशेषज्ञता के लिए प्रशंसा प्राप्त की है।

LIC के एजेंट बनने का एक उत्कृष्ट और सम्मानित कार्य है। यह एक संघर्षमय और प्रतिस्पर्धी क्षेत्र है, जहां आपको अपनी सामर्थ्य का परिचय देना होगा और लोगों को उनकी आवश्यकताओं के अनुसार बीमा योजनाओं की सलाह देनी होगी।

LIC एजेंट बनने के लिए अपनाएं कुछ महत्वपूर्ण कदम। पहले, आपको LIC की नियम और शर्तों को समझना होगा और उनके अनुसार काम करना होगा। फिर, आपको एक परीक्षा पास करनी होगी और अपने क्षेत्र में अच्छे नेतृत्व कौशलों को प्रदर्शित करना होगा।

जब आप एक LIC एजेंट बन जाते हैं, तो आपको लाभ मिलता है एक स्थायी और सुरक्षित करियर के रूप में। आपको उत्कृष्ट प्रशिक्षण और समर्थन प्राप्त होता है, जो आपको अधिक सफलता की दिशा में आगे बढ़ने में मदद करता है।

LIC एजेंट बनने का यह एक अद्भुत मौका है जो आपको अपने व्यक्तित्व को विकसित करने और अपनी आमदनी को बढ़ाने की समर्था प्रदान करता है। आप अपने ग्राहकों की आवश्यकताओं को समझते हैं और उन्हें उनके लिए सबसे उत्तम बीमा योजना प्रदान करते हैं।

जीतेंद्र पाटीदार अधिकारी (LIC, Neemuch) आपको अपनी टीम में जोड़ने का अवसर प्रदान करते हैं। वे आपको सहायता और मार्गदर्शन प्रदान करेंगे ताकि आप LIC एजेंट बनने के लिए तैयार हो सकें।LIC Neemuch is a branch of the Life Insurance Corporation of India, led by Jitendra Patidar as the Development Officer (DO). Jitendra helps people in Neemuch, Mandsaur, Ratangarh, Singoli, Indore, and Jaipur with their insurance needs. At LIC Neemuch, we focus on keeping families financially secure. With Jitendra's guidance, we provide simple and effective insurance options for everyone in these areas.Jitendra Patidar, an esteemed  Development Officer (DO) at LIC India, epitomizes the pinnacle of professionalism and expertise within the insurance industry. Jitendra Patidar, our esteemed Development Officer (DO), operates from the headquarters located in Neemuch District, Madhya Pradesh. With a strong presence across all regions and cities of India, including Ratangarh, Neemuch, Singoli, Mandsaur, and more, Jitendra diligently serves our valued clients nationwide. As a trusted representative of LIC, Jitendra ensures that our insurance solutions reach every corner of the country, providing financial security and peace of mind to individuals and families from diverse backgrounds. With his commitment and expertise, Jitendra exemplifies LIC's mission to be a beacon of trust and reliability in the insurance industry, serving our customers with dedication and integrity.With a rich background in fostering growth and nurturing talent, Jitendra leads by example, guiding his team towards excellence in serving our valued clients. At LIC India, we are committed to providing comprehensive life insurance solutions that safeguard the financial well-being of individuals and families across the nation.Contact Jitendra Patidar, an esteemed Development Officer (DO) at LIC India, epitomizes the pinnacle of professionalism and expertise within the insurance industry. Jitendra Patidar, our esteemed Associate Development Officer (ADO), operates from the headquarters located in Neemuch District, Madhya Pradesh. With a strong presence across all regions and cities of India, including Ratangarh, Neemuch, Singoli, Mandsaur, and more, Jitendra diligently serves our valued clients nationwide. As a trusted representative of LIC, Jitendra ensures that our insurance solutions reach every corner of the country, providing financial security and peace of mind to individuals and families from diverse backgrounds. With his commitment and expertise, Jitendra exemplifies LIC's mission to be a beacon of trust and reliability in the insurance industry, serving our customers with dedication and integrity.With a rich background in fostering growth and nurturing talent, Jitendra leads by example, guiding his team towards excellence in serving our valued clients. At LIC India, we are committed to providing comprehensive life insurance solutions that safeguard the financial well-being of individuals and families across the nation.

As India's leading life insurance provider, LIC offers a diverse range of insurance products tailored to meet the evolving needs of our customers. Whether it's securing your family's future, planning for retirement, or investing in wealth creation, LIC has you covered with innovative and reliable insurance plans.

Our team of dedicated professionals, under the leadership of Jitendra Patidar, works tirelessly to ensure that our customers receive personalized attention and top-notch service. We believe in building long-lasting relationships based on trust, transparency, and integrity. With LIC, you can rest assured that your financial goals are in safe hands.

At LIC India, we pride ourselves on our extensive network of agents and development officers who are committed to providing expert guidance and support at every step of your insurance journey. From selecting the right policy to assisting with claims processing, our team is here to assist you with professionalism and empathy.

In addition to our core insurance offerings, LIC India is also committed to promoting financial literacy and inclusion across the country. Through various outreach programs and educational initiatives, we strive to empower individuals with the knowledge and resources they need to make informed financial decisions.

Furthermore, LIC India is deeply committed to corporate social responsibility (CSR) initiatives aimed at uplifting communities and making a positive impact on society. From supporting education and healthcare initiatives to environmental sustainability projects, we are dedicated to creating a brighter and more equitable future for all.

Join hands with Jitendra Patidar and the LIC India team today to experience the difference that personalized service and unmatched expertise can make in securing your financial future. Contact us now to explore our comprehensive range of insurance solutions and embark on a journey towards financial security and peace of mind with LIC India." />
 <meta property="og:type" content="website" />
 <meta property="og:url" content="https://lic-neemuch-jitendra-patidar.vercel.app/" />
 <meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/jitendraprofilephoto.jpg" />
 <meta property="og:image:alt" content="Jitendra Patidar" />
 <meta property="og:site_name" content="LIC Neemuch | Contact Jitendra Patidar, LIC Development Officer (DO) - Neemuch, Mandsaur, Ratangarh ,Singoli, Manasa, Jawad, Sarwaniya Maharaj|LIC एजेंट बनने के लिए जीतेंद्र पाटीदार (LIC, Neemuch) से संपर्क करें|TOP LIC Agents in Neemuch | Best LIC Agents in Neemuch , Best LIC Officer in Neemuch, Singoli, Ratangarh LIC India " />

 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content="LIC Neemuch | Contact Jitendra Patidar, LIC Development Officer (DO) - Neemuch, Mandsaur, Ratangarh ,Singoli, Manasa, Jawad, Sarwaniya Maharaj|LIC एजेंट बनने के लिए जीतेंद्र पाटीदार (LIC, Neemuch) से संपर्क करें|TOP LIC Agents in Neemuch | Best LIC Agents in Neemuch , Best LIC Officer in Neemuch, Singoli, Ratangarh LIC India" />
 <meta name="twitter:description" content="अगर आप LIC एजेंट बनने की सोच रहे हैं, तो अब ही जुड़ें और अपने भविष्य को सुरक्षित करने का पहला कदम उठाएं। LIC एजेंट बनने के लिए आज ही संपर्क करें जीतेंद्र पाटीदार अधिकारी (LIC, Neemuch) से।
भारतीय जीवन बीमा निगम (LIC) एक विश्वसनीय और प्रमुख बीमा कंपनी है जो भारत में अपनी उत्कृष्ट सेवाओं के लिए प्रसिद्ध है। LIC के अधिकारी, जैसे कि जीतेंद्र पाटीदार (LIC, Neemuch), अपने क्षेत्र में विशेषज्ञता और निपुणता के साथ काम करते हैं। उन्होंने अपने क्षेत्र में अपने अच्छे नेतृत्व और विशेषज्ञता के लिए प्रशंसा प्राप्त की है।

LIC के एजेंट बनने का एक उत्कृष्ट और सम्मानित कार्य है। यह एक संघर्षमय और प्रतिस्पर्धी क्षेत्र है, जहां आपको अपनी सामर्थ्य का परिचय देना होगा और लोगों को उनकी आवश्यकताओं के अनुसार बीमा योजनाओं की सलाह देनी होगी।

LIC एजेंट बनने के लिए अपनाएं कुछ महत्वपूर्ण कदम। पहले, आपको LIC की नियम और शर्तों को समझना होगा और उनके अनुसार काम करना होगा। फिर, आपको एक परीक्षा पास करनी होगी और अपने क्षेत्र में अच्छे नेतृत्व कौशलों को प्रदर्शित करना होगा।

जब आप एक LIC एजेंट बन जाते हैं, तो आपको लाभ मिलता है एक स्थायी और सुरक्षित करियर के रूप में। आपको उत्कृष्ट प्रशिक्षण और समर्थन प्राप्त होता है, जो आपको अधिक सफलता की दिशा में आगे बढ़ने में मदद करता है।

LIC एजेंट बनने का यह एक अद्भुत मौका है जो आपको अपने व्यक्तित्व को विकसित करने और अपनी आमदनी को बढ़ाने की समर्था प्रदान करता है। आप अपने ग्राहकों की आवश्यकताओं को समझते हैं और उन्हें उनके लिए सबसे उत्तम बीमा योजना प्रदान करते हैं।

जीतेंद्र पाटीदार अधिकारी (LIC, Neemuch) आपको अपनी टीम में जोड़ने का अवसर प्रदान करते हैं। वे आपको सहायता और मार्गदर्शन प्रदान करेंगे ताकि आप LIC एजेंट बनने के लिए तैयार हो सकें।LIC Neemuch is a branch of the Life Insurance Corporation of India, led by Jitendra Patidar as the Development Officer (DO). Jitendra helps people in Neemuch, Mandsaur, Ratangarh, Singoli, Indore, and Jaipur with their insurance needs. At LIC Neemuch, we focus on keeping families financially secure. With Jitendra's guidance, we provide simple and effective insurance options for everyone in these areas.Jitendra Patidar, an esteemed  Development Officer (DO) at LIC India, epitomizes the pinnacle of professionalism and expertise within the insurance industry. Jitendra Patidar, our esteemed Development Officer (DO), operates from the headquarters located in Neemuch District, Madhya Pradesh. With a strong presence across all regions and cities of India, including Ratangarh, Neemuch, Singoli, Mandsaur, and more, Jitendra diligently serves our valued clients nationwide. As a trusted representative of LIC, Jitendra ensures that our insurance solutions reach every corner of the country, providing financial security and peace of mind to individuals and families from diverse backgrounds. With his commitment and expertise, Jitendra exemplifies LIC's mission to be a beacon of trust and reliability in the insurance industry, serving our customers with dedication and integrity.With a rich background in fostering growth and nurturing talent, Jitendra leads by example, guiding his team towards excellence in serving our valued clients. At LIC India, we are committed to providing comprehensive life insurance solutions that safeguard the financial well-being of individuals and families across the nation.Contact Jitendra Patidar, an esteemed Development Officer (DO) at LIC India, epitomizes the pinnacle of professionalism and expertise within the insurance industry. Jitendra Patidar, our esteemed Associate Development Officer (ADO), operates from the headquarters located in Neemuch District, Madhya Pradesh. With a strong presence across all regions and cities of India, including Ratangarh, Neemuch, Singoli, Mandsaur, and more, Jitendra diligently serves our valued clients nationwide. As a trusted representative of LIC, Jitendra ensures that our insurance solutions reach every corner of the country, providing financial security and peace of mind to individuals and families from diverse backgrounds. With his commitment and expertise, Jitendra exemplifies LIC's mission to be a beacon of trust and reliability in the insurance industry, serving our customers with dedication and integrity.With a rich background in fostering growth and nurturing talent, Jitendra leads by example, guiding his team towards excellence in serving our valued clients. At LIC India, we are committed to providing comprehensive life insurance solutions that safeguard the financial well-being of individuals and families across the nation.

As India's leading life insurance provider, LIC offers a diverse range of insurance products tailored to meet the evolving needs of our customers. Whether it's securing your family's future, planning for retirement, or investing in wealth creation, LIC has you covered with innovative and reliable insurance plans.

Our team of dedicated professionals, under the leadership of Jitendra Patidar, works tirelessly to ensure that our customers receive personalized attention and top-notch service. We believe in building long-lasting relationships based on trust, transparency, and integrity. With LIC, you can rest assured that your financial goals are in safe hands.

At LIC India, we pride ourselves on our extensive network of agents and development officers who are committed to providing expert guidance and support at every step of your insurance journey. From selecting the right policy to assisting with claims processing, our team is here to assist you with professionalism and empathy.

In addition to our core insurance offerings, LIC India is also committed to promoting financial literacy and inclusion across the country. Through various outreach programs and educational initiatives, we strive to empower individuals with the knowledge and resources they need to make informed financial decisions.

Furthermore, LIC India is deeply committed to corporate social responsibility (CSR) initiatives aimed at uplifting communities and making a positive impact on society. From supporting education and healthcare initiatives to environmental sustainability projects, we are dedicated to creating a brighter and more equitable future for all.

Join hands with Jitendra Patidar and the LIC India team today to experience the difference that personalized service and unmatched expertise can make in securing your financial future. Contact us now to explore our comprehensive range of insurance solutions and embark on a journey towards financial security and peace of mind with LIC India." />
 <meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/lic-term-insurance.png" />
 <meta name="twitter:site" content="@jitendrapatidar" />
 <meta name="twitter:creator" content="@jitendrapatidar" />

 <meta name="keywords" content="portfolio, careers,  , Singoli, Manasa, Jawad, ratangarh, neemuch , sarwaniya Maharaj ,Jitendra Patidar, LIC India,Development Officer, Associate Development Officer, ADO,DO,life insurance, insurance solutions, financial security, retirement planning, wealth creation, insurance plans, financial goals, trusted insurance provider, customer service, financial literacy, financial inclusion, CSR initiatives, community support, financial empowerment, personalized service, expert guidance, comprehensive insurance coverage, financial well-being, trusted advisor, insurance policies, claims processing, educational initiatives, environmental sustainability, financial decisions, LIC agents, financial services, India's leading insurance company" />
 <meta name="author" content="Jitendra Patidar" />         <script type="application/ld+json">
       {JSON.stringify({
         '@context': 'http://schema.org',
         '@type': 'Person',
         "name": "jitendra Patidar",
         "birthDate": "1998-07-01",
         "birthPlace": {
           "@type": "Place",
           "address": {
             "@type": "PostalAddress",
             "addressLocality": "Indore"
           }
         },
         "alumniOf": {
           "@type": "CollegeOrUniversity",
           "name": "IIT Roper",
           "location": {
             "@type": "Place",
             "address": {
               "@type": "PostalAddress",
               "addressLocality": "Chandigarh",
               "addressRegion": "Punjab",
               "addressCountry": "India"
             }
           }
         },
         "address": [
           {
             "@type": "PostalAddress",
             "addressLocality": "Indore",
             "addressRegion": "Madhya Pradesh",
             "postalCode": "452001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Chandigarh",
             "addressRegion": "Punjab",
             "postalCode": "160001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Mumbai",
             "addressRegion": "Maharashtra",
             "postalCode": "400001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Bangalore",
             "addressRegion": "Karnataka",
             "postalCode": "560001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Delhi",
             "addressRegion": "Delhi",
             "postalCode": "110001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Kolkata",
             "addressRegion": "West Bengal",
             "postalCode": "700001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Chennai",
             "addressRegion": "Tamil Nadu",
             "postalCode": "600001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Hyderabad",
             "addressRegion": "Telangana",
             "postalCode": "500001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Pune",
             "addressRegion": "Maharashtra",
             "postalCode": "411001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Ahmedabad",
             "addressRegion": "Gujarat",
             "postalCode": "380001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Jaipur",
             "addressRegion": "Rajasthan",
             "postalCode": "302001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Lucknow",
             "addressRegion": "Uttar Pradesh",
             "postalCode": "226001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Bhopal",
             "addressRegion": "Madhya Pradesh",
             "postalCode": "462001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Nagpur",
             "addressRegion": "Maharashtra",
             "postalCode": "440001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Visakhapatnam",
             "addressRegion": "Andhra Pradesh",
             "postalCode": "530001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Kochi",
             "addressRegion": "Kerala",
             "postalCode": "682001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Guwahati",
             "addressRegion": "Assam",
             "postalCode": "781001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Bhubaneswar",
             "addressRegion": "Odisha",
             "postalCode": "751001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Dehradun",
             "addressRegion": "Uttarakhand",
             "postalCode": "248001",
             "addressCountry": "India"
           },
           {
             "@type": "PostalAddress",
             "addressLocality": "Raipur",
             "addressRegion": "Chhattisgarh",
             "postalCode": "492001",
             "addressCountry": "India"
           }
         ],
         "worksFor": {
           "@type": "Organization",
           "name": "LIC DO" 
         },
         "url": "https://jitendra-patidar.vercel.app/",
         "sameAs": [
           "https://www.linkedin.com/in/sanjay-patidar-25b580292/",
           "https://github.com/hello-developer-sanjay",
           "https://www.instagram.com/jay7268patidar/",
                        "https://jitendra-patidar.vercel.app/contact-lic-officer-jitendra-patidar"

         ]
   

       })}
     </script>


    </Helmet>
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
 
   
      <FlexContainer>
      <ProfileImageContainer>
        
        <ProfileImage
  
    src={profileImage1}
    alt="jitendra patidar"
    initial={{ y: -100, opacity: 0, filter: 'blur(10px)' }}
    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
    transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.5 }}
    className={`profile-image ${imageLoading ? 'loading' : ''}`}
    onLoad={() => {
      setImageLoading(false);
    }}
    onError={() => {
      setImageLoading(true); 
    }}
  />
  

          </ProfileImageContainer>
      <Onlyforlap>

  <Introduction>
  <Next>

  <button 
    onClick={() => window.location.href = 'tel:+917987235207'} 
    style={{
      marginLeft: '4px',
      color: '#fff',
      padding: '2px 4px',
      border: '2px solid #ff6b6b',
      borderRadius: '30px',
      cursor: 'pointer',
      boxShadow: '0px 0px 10px #ffd700'
    }}
  >
    <span className="call-text">अभी अधिकारी को कॉल करें</span>
    <span role="img" aria-label="Phone" className="bounce">📞</span>
  </button>
  {' '} जीतेन्द्र पाटीदार एलआईसी विकास अधिकारी (डीओ) नीमच 
  {' '}<span className="light">संपर्क करे</span>
</Next>

    <Next>
    📞 Jitendra Patidar <span className="light"> LIC Neemuch Contact | Mobile Number : </span>{' '}
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
      <span className="light"> एलआईसी नीमच भारतीय जीवन बीमा निगम की एक शाखा है, जिसका प्रबंधन विकास अधिकारी (डीओ) के रूप में जितेंद्र पाटीदार द्वारा किया जाता है। यह शाखा नीमच, मंदसौर, रतनगढ़, सिंगोली, मनासा, जावद और सरवानीयाँ महाराज के लोगों की सेवा करती है। एलआईसी नीमच में, हम परिवारों की आर्थिक सुरक्षा पर जोर देते हैं। जितेंद्र के मार्गदर्शन में, हम इन क्षेत्रों में सरल और प्रभावी बीमा विकल्प प्रदान करते हैं, ताकि सभी लोग अपनी आर्थिक सुरक्षा को सुनिश्चित कर सकें।</span><br />
    </Next>
    <Next> LIC Neemuch Office Address : Vikas Nagar, Schme No. 14-3, Neemuch Chawni, Neemuch, Madhya Pradesh 458441 </Next>
    <Text>➥ Curious to know more about LIC <a style={{ color: '#FAF7F7', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer', textDecoration: "none" }} href="https://licindia.in/hi/home" target="_blank">LIC Website</a> to explore!</Text>
  </Introduction>
</Onlyforlap>
<Rating/>
</FlexContainer>

  

      <ContactForm
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleFormSubmit}
      >
        <ContactInput type="text" name="name" placeholder="यहाँ आपका नाम भरें " />
        <ContactTextArea
          name="message"
          rows="5"
          placeholder="अपनी प्रतिक्रिया यहां लिखें..."
        />
        <QueryInput
          name="query"
          rows="5"
          placeholder="क्या आपका कोई प्रश्न है? अपना प्रश्न यहां लिखें..."
        />
       <QueryButton type="submit" aria-label="Submit feedback or query form">
       जमा करें !
      </QueryButton>
      </ContactForm>



      <ToastContainer
  className="custom-toast-container"
  position="top-right"
  style={{ marginTop: '100px' }}
/>








    <Review/> 
    </FooterContainer>

<Text>Discover the world of Jitendra Patidar : LIC Neemuch Development Officer (DO) | Innovator, Developer, and Founder. Ready to explore? <a style={{ color: '#FAF7F7', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer', textDecoration: 'none' }} href='https://jitendra-patidar.vercel.app/' target='_blank'>Jitendra Patidar</a> to dive in!</Text>
<Text>
  <span style={{ color: '#ffbb00', fontWeight: 'bold', fontSize: '1.2rem' }}>©</span> All rights reserved to&nbsp;
  <span style={{ fontWeight: 'bold', fontStyle: 'italic', color: '#ffbb00' }}>EduXcel</span> founded by&nbsp;
  <span style={{ fontWeight: 'bold', color: '#ffbb00' }}>Sanjay Patidar</span><br />
  <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{getCurrentDate()} | India</span>
</Text>
    </>
  );
};

export default Home;
