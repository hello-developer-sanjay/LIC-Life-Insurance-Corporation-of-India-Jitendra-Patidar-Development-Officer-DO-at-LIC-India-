import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import { Link } from 'react-scroll';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  FaTwitter, FaInstagram } from "react-icons/fa";
import profileImage1 from '../assets/jitendraprofilephoto.jpg';
import Typed from 'react-typed';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styles } from '../styles';
import '../styles/home.css';
import StarsCanvas from '../components/Stars';
import LearnImage from '../assets/lic-term-insurance.png';
import WhyUsImage from '../assets/utsav.png';

import { useInView } from 'react-intersection-observer'; 
import LicHeader from '../components/LicHeader';
import LicChatBot from '../components/LicChatBot';
const H2 = styled.h1`
color: #0DCB9A;

  font-size: 3rem;
 margin-bottom: 0rem;
 font-weight: 900;
 font-family: 'Playfair Display', serif !important; 
 margin-top: 0rem;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
 transform: skew(-5deg); /* Apply a slight skew for a dynamic effect */
 
 @media (max-width: 768px) {
   margin-top: 0rem;
   font-size: 1.2rem;

 }
`;
const ContactButton = styled.a`
  color: white;
  box-shadow: 0px 0px 10px #fff;
  padding: 3px 5px;
  border: 2px solid #ffbb00; /* Creative border */
  border-radius: 30px; /* Increased border radius */
  font-size: 1rem; /* Slightly increased font size */
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease; 

  &:hover {
      border-color: #ffd700; /* Matching border color */
    box-shadow: 0px 0px 10px #ffd700; /* Shining effect */
  }
`;


const ContactButtonText = styled.span`
  font-weight: Bold;
`;
const Next = styled.h1`
font-size: 1.1rem;
color: #f3f3f3;
margin-bottom: 1.5rem;
line-height: 1.4;
text-align: justify;
border-left: 4px solid #5d00ff;
border-right: 4px solid #5d00ff;

padding-left: 10px;
padding-right:10px;
border-radius: 8px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const TypedText = styled.span`
    display: block;
    margin-top: 1rem;
    margin-bottom: 2rem;
    text-transform:uppercase;
    font-style: italic;
    font-weight: bold;
    font-size: 4rem;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;

    @media (max-width: 768px) {
      font-size: 1.2rem;
      margin-bottom: 1rem;

    }

    /* Change the color of the typing text */
    @media (prefers-color-scheme: dark) {
      color: #51D5FF; /* Bright yellow in dark mode */
    }

    @media (prefers-color-scheme: light) {
      color: #ffffff; /* Deep orange in light mode */
    }
  `;
  const ProfileTextContainer = styled.div`
  display: flex;
  position : relative;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin-top: 0rem;
  margin-right: 1rem;
  height: 180px;
  @media (min-width: 768px) {
    text-align: left;
    margin-top: 0;
  
  }
  @media (max-width: 768px) {
    
    max-width: 90%;
  
  }
  `;
 const Introduction = styled(motion.p)`
 font-size: 1.5rem;
 line-height: 1.5;
 max-width: 800px;
 text-align: center;
 margin-top : 1rem;
 margin-bottom: 1rem;
 color: #ffffff; /* White on hover */

 
 .highlight {
   position: relative;
   display: inline-block;
   font-size: 4rem;
   font-weight: bold;
   color: transparent;
   background: linear-gradient(45deg, #ff4081, #00bcd4); /* Gradient highlight */
   background-clip: text;
   -webkit-background-clip: text;
   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Shadow for depth */
   padding-bottom: 5px;
   margin-bottom: 1px;
   line-height: 4rem;
   /* Animation for the highlight class */
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


 @media (max-width: 768px) {
 margin-top:1rem;
 font-size: 1.5rem;

 }
`;


const HomeContainer = styled(motion.div)`
  display: flex;
  height: 50vh;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  box-sizing: border-box;
  overflow-y: scroll;
  position: relative;
margin-bottom: 2rem;
 
  background-color: #050816; 

  
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

const F2 = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;

  font-weight: 900;
  color: #2ecc71;
  font-family: 'Playfair Display', serif;

  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transform: skew(-5deg); /* Apply a slight skew for a dynamic effect */
  @media (max-width: 768px) {
    font-size:2rem;
    }
`;

const Text = styled.h1`
  margin: 0;
  font-size: 1.1rem;
  color: #fff; 
  text-align: left;
  padding: 5px 10px; /* Padding to create space around the text */

`;



const ProfileImageContainer = styled.div`
  flex-shrink: 0;

  @media (min-width: 768px) {
    order: 1;
    margin-right: 2rem;

    align-self: flex-start; /* Align the image to the start of the container on larger screens */
  }
  
`;


const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(25, 47, 62, 0.8), rgba(11, 19, 43, 0.8));
  z-index: -1;
`;


const ProfileImage = styled(motion.img)`
  width: 210px;
  height: 210px;
  margin-top: 2rem;
  margin-left: 15rem;

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
    margin-left: 0.5rem;

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


const images = [profileImage1];
let currentImageIndex = 0;

const Introduction2 = styled(motion.p)`
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

const Onlyforlap = styled.div`

  margin-top: 2rem;
  margin-bottom: 1rem;
margin-right : 1rem;
margin-left: 1rem;

  @media (max-width: 768px) {
    margin-top: 0rem;
  
  }
`;


const SocialIconsContainer = styled(motion.div)`
display: flex;
justify-content: center;
align-items: center;
gap: 1rem;
margin-top: 1rem;
@media (max-width: 768px) {
  display: none;
  margin-top: 0rem;

}

`;
const socialButtons = [
  { icon: <FaTwitter />, label: "Twitter", link: "#" },
  { icon: <FaInstagram />, label: "Instagram", link: "https://www.instagram.com/jay7268patidar" },
];

const SocialIcon = styled(motion.a)`
display: flex;
align-items: center;
margin-top:4rem;
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

function Home() {  
  
  const [imageAnimated] = useState(false);
  const [contentAnimated, setContentAnimated] = useState(false);
  const controlsImage = useAnimation();
  const controlsContent = useAnimation();
  const controlsContents = useAnimation();

  const [inViewImage] = useInView();
  const [whyImageAnimated, setWhyImageAnimated] = useState(false);
  const [learnImageAnimated, setLearnImageAnimated] = useState(false);
  const controlsWhyImage = useAnimation();
  const controlsLearnImage = useAnimation();
  const [refWhyImage,    inViewWhyImage] = useInView();
  const [refLearnImage, inViewLearnImage] = useInView();

  const [ inViewContent] = useInView();

  useEffect(() => {
   

    if (inViewWhyImage && !whyImageAnimated) {
      controlsWhyImage.start({
        scale: [0.8, 1.2, 1],
        rotateY: [0, 360],
        opacity: [0, 1],
        transition: {
          duration: 2,
          ease: 'easeInOut',
          bounce: 0.5,
        },
      });
      setWhyImageAnimated(true);
    }

    if (inViewLearnImage && !learnImageAnimated) {
      controlsLearnImage.start({
        scale: [0.8, 1.2, 1],
        rotateY: [0, 360],
        opacity: [0, 1],
        transition: {
          duration: 2,
          ease: 'easeInOut',
          bounce: 0.5,
        },
      });
      setLearnImageAnimated(true);
    }

    if (inViewContent && !contentAnimated) {
      controlsContent.start((index) => ({
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1.5,
          delay: index * 0.2,
          type: 'spring',
          stiffness: 100,
          bounce: 0.5, 
        },
      }));
      setContentAnimated(true);
    }
    
    if (inViewContent && !contentAnimated) {
      controlsContents.start((index) => ({
        y: 0,
        opacity: 1,
        rotate: [0, (index % 2 === 0 ? 360 : -360)],
        transition: {
          duration: 1.5,
          delay: index * 0.2,
          type: 'spring',
          stiffness: 100,
        },
      }));
      setContentAnimated(true);
    }
  }, [controlsImage, controlsWhyImage,controlsContents, inViewWhyImage, controlsLearnImage, inViewLearnImage, whyImageAnimated, learnImageAnimated, inViewImage, controlsContent, inViewContent, imageAnimated, contentAnimated]);
  useEffect(() => {
    // Display an info toast message
    toast.info("आपका स्वागत है! यदि आप अपने वित्तीय भविष्य के लिए चिंतित हैं, तो हम LIC Neemuch शाखा में आपके लिए एक अवसर लाए हैं। LIC एजेंट बनकर हमारे साथ मिलकर आपका भविष्य सुरक्षित करें। हमारे साथ जुड़ें और LIC बीमा के लाभों को अपने लाभ के लिए उठाएं। ", {
      position: "top-center", // Set toast position
      autoClose: 12000, 
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
    });
  }, []);
 
  const contentBlock = [
    {
      title: 'Immersive Career Opportunities at LIC India',
      description: 'Discover exciting career prospects at LIC India, where dedication and expertise meet to shape the future of insurance. Join our team and embark on a journey of growth and success in the dynamic world of life insurance.',
    },
    {
      title: 'Dynamic Leadership with Jitendra Patidar: DO at LIC India',
      description: 'Experience the leadership of Jitendra Patidar, Development Officer at LIC India. With a wealth of knowledge and a commitment to excellence, Jitendra leads by example, fostering innovation and growth within the LIC team.',
    },
  ];
  
  const contentBlocks = [
  
    {
      description: "LIC Neemuch is a branch of the Life Insurance Corporation of India, led by Jitendra Patidar as the Development Officer (DO). Jitendra helps people in Neemuch, Mandsaur, Ratangarh, Singoli, Manasa, Jawad and Sarwaniya Maharaj with their insurance needs. At LIC Neemuch, we focus on keeping families financially secure. With Jitendra's guidance, we provide simple and effective insurance options for everyone in these areas.",
    },
  ];  
  

  const contentBlockz = [
    {
      title: "Jitendra Patidar: Development Officer (DO) at LIC Neemuch, INDIA"      ,
      description: 
      "एलआईसी नीमच भारतीय जीवन बीमा निगम की एक शाखा है, जिसका प्रबंधन विकास अधिकारी (डीओ) के रूप में जितेंद्र पाटीदार द्वारा किया जाता है। यह शाखा नीमच, मंदसौर, रतनगढ़, सिंगोली, मनासा, जावद और सरवानीयाँ महाराज के लोगों की सेवा करती है। एलआईसी नीमच में, हम परिवारों की आर्थिक सुरक्षा पर जोर देते हैं। जितेंद्र के मार्गदर्शन में, हम इन क्षेत्रों में सरल और प्रभावी बीमा विकल्प प्रदान करते हैं, ताकि सभी लोग अपनी आर्थिक सुरक्षा को सुनिश्चित कर सकें।",
    },
   
  ];  
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    pauseOnHover: true,
    arrows: false,
    draggable: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          arrows: false,  
        },
      },
    ],
  };
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);


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


  

  const controlsArray = Array.from({ length: 7 }, () => useAnimation());

  const animateInView = async (index) => {
    await controlsArray[index].start({
      y: 0,
      opacity: 1,
      rotate: [0, (index % 2 === 0 ? 360 : -360)],
      transition: {
        duration: 1.5,
        type: 'spring',
        stiffness: 100,
      },
    });
  };


  

  const [ inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  useEffect(() => {
    if (inView && animationEnabled) {
      controlsArray.forEach(async (_, index) => {
        await animateInView(index);
      });
      // Disable animation after the first trigger
      setAnimationEnabled(false);
    }
  }, [controlsArray, inView, animationEnabled]);


  
  useEffect(() => {
    // Create a slideshow effect
    const interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      // Update the profile image
      document.querySelector('.profile-image').src = images[currentImageIndex];
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`relative w-full  min-h-screen mx-auto`}>
  

  <Helmet>
  <title>LIC Neemuch | Jitendra Patidar Development Officer (DO) From Neemuch | Mandsaur| Ratangarh|Deeken|Manasa|Jawad|SarwaniyaMaharaj MadyaPradesh|Life Insurance Corporation of India | भारतीय जीवन बीमा निगम |</title>

 <meta
   name="description"
   content="LIC Neemuch is a branch of the Life Insurance Corporation of India, led by Jitendra Patidar as the Development Officer (DO). Jitendra helps people in Neemuch, Mandsaur, Ratangarh, Singoli, Indore, and Jaipur with their insurance needs. At LIC Neemuch, we focus on keeping families financially secure. With Jitendra's guidance, we provide simple and effective insurance options for everyone in these areas. Jitendra Patidar, an esteemed Development Officer (DO) at LIC India, epitomizes the pinnacle of professionalism and expertise within the insurance industry.Jitendra Patidar, our esteemed  Development Officer (DO), operates from the headquarters located in Neemuch District, Madhya Pradesh. With a strong presence across all regions and cities of India, including Ratangarh, Neemuch, Singoli, Mandsaur, and more, Jitendra diligently serves our valued clients nationwide. As a trusted representative of LIC, Jitendra ensures that our insurance solutions reach every corner of the country, providing financial security and peace of mind to individuals and families from diverse backgrounds. With his commitment and expertise, Jitendra exemplifies LIC's mission to be a beacon of trust and reliability in the insurance industry, serving our customers with dedication and integrity. With a rich background in fostering growth and nurturing talent, Jitendra leads by example, guiding his team towards excellence in serving our valued clients. At LIC India, we are committed to providing comprehensive life insurance solutions that safeguard the financial well-being of individuals and families across the nation.

As India's leading life insurance provider, LIC offers a diverse range of insurance products tailored to meet the evolving needs of our customers. Whether it's securing your family's future, planning for retirement, or investing in wealth creation, LIC has you covered with innovative and reliable insurance plans.

Our team of dedicated professionals, under the leadership of Jitendra Patidar, works tirelessly to ensure that our customers receive personalized attention and top-notch service. We believe in building long-lasting relationships based on trust, transparency, and integrity. With LIC, you can rest assured that your financial goals are in safe hands.

At LIC India, we pride ourselves on our extensive network of agents and development officers who are committed to providing expert guidance and support at every step of your insurance journey. From selecting the right policy to assisting with claims processing, our team is here to assist you with professionalism and empathy.

In addition to our core insurance offerings, LIC India is also committed to promoting financial literacy and inclusion across the country. Through various outreach programs and educational initiatives, we strive to empower individuals with the knowledge and resources they need to make informed financial decisions.

Furthermore, LIC India is deeply committed to corporate social responsibility (CSR) initiatives aimed at uplifting communities and making a positive impact on society. From supporting education and healthcare initiatives to environmental sustainability projects, we are dedicated to creating a brighter and more equitable future for all.

Join hands with Jitendra Patidar and the LIC India team today to experience the difference that personalized service and unmatched expertise can make in securing your financial future. Contact us now to explore our comprehensive range of insurance solutions and embark on a journey towards financial security and peace of mind with LIC India.This detailed meta description provides comprehensive information about LIC India's offerings, values, and commitment to customer service, highlighting the leadership of Jitendra Patidar and the company's dedication to excellence in the insurance industry.
"
 />
 

 <meta property="og:description" content="LIC Neemuch is a branch of the Life Insurance Corporation of India, led by Jitendra Patidar as the Development Officer (DO). Jitendra helps people in Neemuch, Mandsaur, Ratangarh, Singoli, Indore, and Jaipur with their insurance needs. At LIC Neemuch, we focus on keeping families financially secure. With Jitendra's guidance, we provide simple and effective insurance options for everyone in these areas.Jitendra Patidar, an esteemed Development Officer (DO) at LIC India, epitomizes the pinnacle of professionalism and expertise within the insurance industry. Jitendra Patidar, our esteemed Development Officer (DO), operates from the headquarters located in Neemuch District, Madhya Pradesh. With a strong presence across all regions and cities of India, including Ratangarh, Neemuch, Singoli, Mandsaur, and more, Jitendra diligently serves our valued clients nationwide. As a trusted representative of LIC, Jitendra ensures that our insurance solutions reach every corner of the country, providing financial security and peace of mind to individuals and families from diverse backgrounds. With his commitment and expertise, Jitendra exemplifies LIC's mission to be a beacon of trust and reliability in the insurance industry, serving our customers with dedication and integrity.With a rich background in fostering growth and nurturing talent, Jitendra leads by example, guiding his team towards excellence in serving our valued clients. At LIC India, we are committed to providing comprehensive life insurance solutions that safeguard the financial well-being of individuals and families across the nation.

As India's leading life insurance provider, LIC offers a diverse range of insurance products tailored to meet the evolving needs of our customers. Whether it's securing your family's future, planning for retirement, or investing in wealth creation, LIC has you covered with innovative and reliable insurance plans.

Our team of dedicated professionals, under the leadership of Jitendra Patidar, works tirelessly to ensure that our customers receive personalized attention and top-notch service. We believe in building long-lasting relationships based on trust, transparency, and integrity. With LIC, you can rest assured that your financial goals are in safe hands.

At LIC India, we pride ourselves on our extensive network of agents and development officers who are committed to providing expert guidance and support at every step of your insurance journey. From selecting the right policy to assisting with claims processing, our team is here to assist you with professionalism and empathy.

In addition to our core insurance offerings, LIC India is also committed to promoting financial literacy and inclusion across the country. Through various outreach programs and educational initiatives, we strive to empower individuals with the knowledge and resources they need to make informed financial decisions.

Furthermore, LIC India is deeply committed to corporate social responsibility (CSR) initiatives aimed at uplifting communities and making a positive impact on society. From supporting education and healthcare initiatives to environmental sustainability projects, we are dedicated to creating a brighter and more equitable future for all.

Join hands with Jitendra Patidar and the LIC India team today to experience the difference that personalized service and unmatched expertise can make in securing your financial future. Contact us now to explore our comprehensive range of insurance solutions and embark on a journey towards financial security and peace of mind with LIC India.This detailed meta description provides comprehensive information about LIC India's offerings, values, and commitment to customer service, highlighting the leadership of Jitendra Patidar and the company's dedication to excellence in the insurance industry.

" />
 <meta property="og:type" content="website" />
 <meta property="og:image:alt" content="Jitendra Patidar" />

 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content="LIC Neemuch is a branch of the Life Insurance Corporation of India, led by Jitendra Patidar as the Development Officer (DO). Jitendra helps people in Neemuch, Mandsaur, Ratangarh, Singoli, Indore, and Jaipur with their insurance needs. At LIC Neemuch, we focus on keeping families financially secure. With Jitendra's guidance, we provide simple and effective insurance options for everyone in these areas.Jitendra Patidar, an esteemed  Development Officer (DO) at LIC India, epitomizes the pinnacle of professionalism and expertise within the insurance industry. Jitendra Patidar, our esteemed Development Officer (DO), operates from the headquarters located in Neemuch District, Madhya Pradesh. With a strong presence across all regions and cities of India, including Ratangarh, Neemuch, Singoli, Mandsaur, and more, Jitendra diligently serves our valued clients nationwide. As a trusted representative of LIC, Jitendra ensures that our insurance solutions reach every corner of the country, providing financial security and peace of mind to individuals and families from diverse backgrounds. With his commitment and expertise, Jitendra exemplifies LIC's mission to be a beacon of trust and reliability in the insurance industry, serving our customers with dedication and integrity.With a rich background in fostering growth and nurturing talent, Jitendra leads by example, guiding his team towards excellence in serving our valued clients. At LIC India, we are committed to providing comprehensive life insurance solutions that safeguard the financial well-being of individuals and families across the nation.

As India's leading life insurance provider, LIC offers a diverse range of insurance products tailored to meet the evolving needs of our customers. Whether it's securing your family's future, planning for retirement, or investing in wealth creation, LIC has you covered with innovative and reliable insurance plans.

Our team of dedicated professionals, under the leadership of Jitendra Patidar, works tirelessly to ensure that our customers receive personalized attention and top-notch service. We believe in building long-lasting relationships based on trust, transparency, and integrity. With LIC, you can rest assured that your financial goals are in safe hands.

At LIC India, we pride ourselves on our extensive network of agents and development officers who are committed to providing expert guidance and support at every step of your insurance journey. From selecting the right policy to assisting with claims processing, our team is here to assist you with professionalism and empathy.

In addition to our core insurance offerings, LIC India is also committed to promoting financial literacy and inclusion across the country. Through various outreach programs and educational initiatives, we strive to empower individuals with the knowledge and resources they need to make informed financial decisions.

Furthermore, LIC India is deeply committed to corporate social responsibility (CSR) initiatives aimed at uplifting communities and making a positive impact on society. From supporting education and healthcare initiatives to environmental sustainability projects, we are dedicated to creating a brighter and more equitable future for all.

Join hands with Jitendra Patidar and the LIC India team today to experience the difference that personalized service and unmatched expertise can make in securing your financial future. Contact us now to explore our comprehensive range of insurance solutions and embark on a journey towards financial security and peace of mind with LIC India.This detailed meta description provides comprehensive information about LIC Indias offerings , values, and commitment to customer service, highlighting the leadership of Jitendra Patidar and the company's dedication to excellence in the insurance industry." />
 <meta name="twitter:site" content="@sanjaypatidar" />
 <meta name="twitter:creator" content="@sanjaypatidar" />

 <meta name="keywords" content="Jitendra Patidar, LIC India,Development Officer, Associate Development Officer, ADO,DO,life insurance, insurance solutions, financial security, retirement planning, wealth creation, insurance plans, financial goals, trusted insurance provider, customer service, financial literacy, financial inclusion, CSR initiatives, community support, financial empowerment, personalized service, expert guidance, comprehensive insurance coverage, financial well-being, trusted advisor, insurance policies, claims processing, educational initiatives, environmental sustainability, financial decisions, LIC agents, financial services, India's leading insurance company" />
 <meta name="author" content="Sanjay Patidar" />      
    
   
    </Helmet>
      

     <div className={`relative top-[10px] max-w-8xl mx-auto ${styles.paddingX} flex flex-col items-center`}>
  <div className="w-full max-w-4xl">
    
  <Slider {...sliderSettings}>
    <div className="w-full">
        <img
          src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/licheader1.jpg"
          alt="Image 1"
          className="w-full h-auto object-cover"
        />
        
      </div>
      <div className="w-full">
        <img
          src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/licheader2.jpg"
          alt="Image 2"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="w-full">
        <img
          src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/licheader3.jpg"
          alt="Image 3"
          className="w-full h-auto object-cover"
        />

      </div>

    </Slider>

    
  </div>
  <div
  style={{
    width: "100%",
    maxWidth: "1280px",
  }}
>
  <style>
    {`
      @media (max-width: 768px) {
        .mobile-text {
          font-size: 1rem !important;
        }
      }
    `}
  </style>

  {contentBlockz.map((block, index) => {
    const [refContent, inViewContent] = useInView({ triggerOnce: true });
    const controlsContents = useAnimation();

    useEffect(() => {
      if (inViewContent) {
        controlsContents.start({
          y: 0,
          opacity: 1,
          scale: 1,
          transition: {
            duration: 1.5,
            delay: index * 0.2,
            type: "spring",
            stiffness: 100,
          },
        });
      }
    }, [inViewContent, controlsContents, index]);

    return (
      <motion.div
        key={index}
        ref={refContent}
        className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={controlsContents}
      >
        <div
          className={`${styles.sectionHeadText} text-center mb-4 mobile-text`}
        >
          {block.title}
        </div>

        <Next>
          <span className="mobile-text">{block.description}</span>
        </Next>
      </motion.div>
    );
  })}

  <Next>
    💰💼 Click{" "}
    <ContactButton href="/be-an-lic-agent" smooth={true} duration={500}>
      <ContactButtonText className="mobile-text">
        LIC Agent बनने का अवसर
      </ContactButtonText>
    </ContactButton>
  </Next>

  <Next>
    ☎ Jitendra Patidar LIC (DO) Neemuch (MP){" "}
    <span className="light mobile-text">Contact</span>{" "}
    <button
      onClick={() => (window.location.href = "tel:+917987235207")}
      style={{
        marginLeft: "4px",
        color: "#fff",
        padding: "2px 4px",
        border: "2px solid #ff6b6b",
        borderRadius: "30px",
        cursor: "pointer",
        boxShadow: "0px 0px 10px #ffd700",
      }}
    >
      Call Officer Now
    </button>
  </Next>

  <ContactButton href="/contact-lic-officer-jitendra-patidar" smooth={true} duration={500}>
    <ContactButtonText className="mobile-text">Feedback / Query</ContactButtonText>
  </ContactButton>
</div>;

  <div className="w-full max-w-6xl">

            {contentBlocks.map((block , index) => {
                  const [refContent, inViewContent] = useInView({ triggerOnce: true });
                  const controlsContents = useAnimation();

              useEffect(() => {
  if (inViewContent) {
    controlsContents.start({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        delay: index * 0.2,
        type: 'spring',
        stiffness: 100,
      },
    });
  }
}, [inViewContent, controlsContents, index]);

                  return (
                    <motion.div
                      key={index}
                      ref={refContent}
                      className="mb-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={controlsContent}
                    >
          <div className={`${styles.sectionHeadText} text-center mb-4`}>
                        {block.title}
                      </div>
                      
                    <Next>     
                     {block.description}

                     </Next> 



           </motion.div>
                  );
                })}
 
 

             </div>

  <ProfileTextContainer>
 
    
  <Introduction
    initial={{ opacity: 0, y: -100,  scale: 0.5 }} 
    animate={{ opacity: 1, y: 0, scale: 1 }} 
    transition={{
      type: "spring", 
      stiffness: 200, 
      damping: 12, 
      delay: 1, 
      duration: 0.8 
    }}
  >
       
          
          <TypedText>
          <H2>

  <Typed
strings={[
  'जीवन बीमा कंपनी में नौकरी के अवसर हैं, तुरंत संपर्क करें।',
  'बीमा क्षेत्र में नौकरी के लिए आवेदन करें, विकास अधिकारी की टीम में शामिल हों।',
  'बीमा कंपनी के लिए अपनी योग्यता और कौशल का परीक्षण करें।',
  'विकास अधिकारी की टीम में नौकरी पाने के लिए स्नातक योग्यता आवश्यक है।',
  'बीमा कंपनी में कैरियर बनाएं, विकास अधिकारी के तहत काम करें।',
  'बीमा कंपनी में नौकरी के लिए आवेदन करें, विकास अधिकारी के सहायक बनें।',
  'विकास अधिकारी की टीम में शामिल होकर करियर को बढ़ावा दें।',
  'बीमा कंपनी में प्रोफेशनल विकास के लिए विकास अधिकारी के साथ काम करें।',
]}
    typeSpeed={60}
    backSpeed={60}
    smartBackspace={true}
    shuffle={false}
    backDelay={1500}
    loop
  />
  </H2>
</TypedText>

          </Introduction>


          
          </ProfileTextContainer>
   
          <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >


      <BackgroundOverlay />
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


<SocialIconsContainer>
          {socialButtons.map((button, index) => (
  <SocialIcon
  key={index}
  color={button.color}
  initial={{ opacity: 0, y: -50, scale: 0, rotate: -180 }}
  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
  exit={{ opacity: 0, y: -50 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  href={button.link}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={button.label} 
>
  {button.icon}
</SocialIcon>

          ))}
          
        </SocialIconsContainer>

        <Onlyforlap>
        <Introduction2>
        <Next>
  ☎ Jitendra Patidar <span className="light">Contact | Mobile Number : </span>{' '}
  <a href="tel:+917987235207" id="contactNumber" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>+91 7987 235 207</a> 📞 | OR |
  
  <button onClick={copyContactNumber} style={{ marginLeft: '4px', color: '#fff', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer' }}>Copy Number</button>
</Next>
          
<Next>
  🔗 <span className="light">Jitendra Patidar's Instagram ID : </span>{' '}
  <a href="https://www.instagram.com/jay7268patidar" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }} id="instaIDAnchor" target="_blank" rel="noopener noreferrer">jay7268patidar</a>
  {' '} | OR | {' '}
  <button onClick={copyInstaID} style={{ marginLeft: '4px', color: '#fff', padding: '2px 4px', border: '2px solid #ff6b6b', borderRadius: '30px', cursor: 'pointer' }} id="instaIDButton">Copy Insta ID</button>
</Next>

                <Next>              <span className="light">  LIC Development Officer (DO) | LIC Neemuch | भारतीय जीवन बीमा निगम (LIC) | Leader </span><br/>


                </Next>

  


</Introduction2>

  </Onlyforlap>
        </ProfileImageContainer>
  
    
      <ProfileTextContainer>

       
      <Introduction2
  initial={{ opacity: 0, y: -100, rotate: -180, scale: 0.5 }} 
  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} 
  transition={{
    type: "spring", 
    stiffness: 200, 
    damping: 12, 
    delay: 1, 
    duration: 0.8 
  }}
>

        Hi there! I'm{' '}
    
        <F2> Jitendra Patidar</F2>  
        <span className="highlight">Development Officer</span><br/> 



<Text>
🙋‍♀️    Jitendra Patidar एलआईसी भारत में विकास अधिकारी (DO) हैं। <br/>
<br/>
</Text>


<Text>➥  जितेंद्र एक दक्ष और अनुभवी पेशेवर हैं। उनकी कार्यक्षमता, संवादात्मक कौशल और टीम के साथ अच्छे संबंध ने LIC को उन्हें महत्वपूर्ण धाराओं में बनाए रखा है। </Text><br/>



      </Introduction2>
      </ProfileTextContainer>

      </FlexContainer>
  
    </HomeContainer>
    <LicChatBot/>

          <div className={`${styles.sectionHeadText} text-center mb-4`}>
          आपके लिए तैयार एलआईसी योजनाएं खरीदें!
</div>
<p className={`${styles.heroSubText} mt-8 text-white-100 text-center`}>
अपनी आवश्यकताओं के अनुसार बीमा खोजें</p>


</div>



      <div className={`relative top-[20px] max-w-8xl mx-auto mb-0 ${styles.paddingX} flex flex-col items-center`}>
      <LicHeader/>


        <div className="why-us-section py-16 flex flex-col lg:flex-row items-center">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center mb-12">
            <div className="shining-ring-container">
        
              <div className="flex-container">
              <motion.img
                  ref={refLearnImage}
                  src={LearnImage}
                  alt="withUs"
                  className="w-full lg:w-full rounded-lg shadow-lg mb-6 lg-mb-0"
                  initial={{ scale: 0, rotateY: 0, opacity: 0 }}
                  animate={controlsLearnImage}
                />
                
              </div>
              
            </div>
            <div className="lg:w-1/2 lg:pl-12 why-us-content">
            {contentBlock.map((block, index) => {
                  const [refContent, inViewContent] = useInView({ triggerOnce: true });
                  const controlsContent = useAnimation();

                  useEffect(() => {
                    if (inViewContent) {
                      controlsContent.start({
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 2,
                          delay: index * 0.2,
                          type: 'spring',
                          stiffness: 100,
                        },
                      });
                    }
                  }, [inViewContent, controlsContent, index]);

                  return (
                    <motion.div
                      key={index}
                      ref={refContent}
                      className="mb-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={controlsContent}
                    >
                      <motion.h3 className="text-3xl font-bold mb-4 text-purple-500">
                        {block.title}
                      </motion.h3>
                      <motion.p className="text-gray-800 mb-6 text-lg">
                        {block.description}
                      </motion.p>
                      
                    </motion.div>
                    
                  );
                })}
                
             </div>
             
          </div>
         
        </div>
      </div>


      </div>
      <StarsCanvas />



    </section>
  );
}


export default Home;
