import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import { Link } from 'react-scroll';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LicBenefit from './LicBenefit';
import {  FaTwitter, FaInstagram } from "react-icons/fa";
import profileImage1 from '../assets/jitendraprofilephoto.jpg';
import Typed from 'react-typed';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion'; // Import Framer Motion
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styles } from '../styles';
import '../styles/home.css';
import StarsCanvas from '../components/Stars';
import LearnImage from '../assets/lic-term-insurance.png';
import WhyUsImage from '../assets/utsav.png';

import { useInView } from 'react-intersection-observer'; // Import react-intersection-observer
import LicHeader from '../components/LicHeader';
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
  padding: 3px 5px;
  border: 2px solid #ffbb00; /* Creative border */
  border-radius: 30px; /* Increased border radius */
  font-size: 1rem; /* Slightly increased font size */
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease; /* Smooth transition for both background and border color */

  /* Shining effect on hover */
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
margin-top: 1rem;

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
  font-size: 1.5rem;
    color: #24E558;
  
  text-align: left;
  padding: 3px 2px;
  @media (max-width: 768px) {
    font-size: 1.3rem;
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
  width: 250px;
  height: 250px;
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

function LicAgent() {  
  
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
      title: 'सुरक्षा का साथ, सफलता की ऊंचाइयों तक',

      overview: 'सुरक्षा, संवेदनशीलता, और सफलता की राह में हमारे साथ चलें। LIC एजेंट बनें और जीवन को संवारें।',
      description: 'आप लोगों के आर्थिक लक्ष्यों को पूरा कर उनके सपनों को साकार करने में मदद करेंगे। आप उनके जीवन में जो अंतर लाते हैं, वह आपकी कल्पना से कहीं अधिक फायदेमंद और संतोषजनक होगा ।',
    },
    {
        overview: 'सपनों को साकार करने का एक मात्र माध्यम - LIC',
        description: "हमारे साथ जुड़ने से आप देश के जीवन बीमा अभिकर्त्ताओं की बेहतरीन टीम का हिस्सा होंगे।वर्ष 2015 में, हमने 4021 सदस्यों का योगदान मिलियन डॉलर राउंड टेबल में किया : यह एक वैश्विक मंच है जो दुनिया के सबसे सफल बीमा अभिकर्त्ताओं को अभिवादन करता है।",
      },
      
   
  ];
 
  const contentBlocks = [

    {
      title: 'लाखों का साथी बनें: LIC एजेंट बनने का अवसर (व्यक्तिगत)',

      overview: 'सुरक्षा, संवेदनशीलता, और सफलता की राह में हमारे साथ चलें। LIC एजेंट बनें और जीवन को संवारें।',
      description: 'आप लोगों के आर्थिक लक्ष्यों को पूरा कर उनके सपनों को साकार करने में मदद करेंगे। आप उनके जीवन में जो अंतर लाते हैं, वह आपकी कल्पना से कहीं अधिक फायदेमंद और संतोषजनक होगा ।',
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
    
    <title>Opportunity to Become an LIC Agent (Personal) with LIC Officer Jitendra Patidar (Neemuch) - Path to Security, Sensitivity, and Success | LIC Neemuch | Contact Jitendra Patidar, LIC Development Officer (DO) - Neemuch, Mandsaur, Ratangarh ,Singoli, Manasa, Jawad, Sarwaniya Maharaj|LIC एजेंट बनने के लिए जीतेंद्र पाटीदार (LIC, Neemuch) से संपर्क करें|TOP LIC Agents in Neemuch | Best LIC Agents in Neemuch , Best LIC Officer in Neemuch, Singoli, Ratangarh LIC India </title>
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
 

 <meta property="og:title" content="Opportunity to Become an LIC Agent (Personal) with LIC Officer Jitendra Patidar (Neemuch) - Path to Security, Sensitivity, and Success|LIC Neemuch | Contact Jitendra Patidar, LIC Development Officer (DO) - Neemuch, Mandsaur, Ratangarh ,Singoli, Manasa, Jawad, Sarwaniya Maharaj|LIC एजेंट बनने के लिए जीतेंद्र पाटीदार (LIC, Neemuch) से संपर्क करें|TOP LIC Agents in Neemuch | Best LIC Agents in Neemuch , Best LIC Officer in Neemuch, Singoli, Ratangarh LIC India " />
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
 <meta property="og:url" content="https://jitendra-patidar.vercel.app/be-an-lic-agent" />
 <meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/jitendraprofilephoto.jpg" />
 <meta property="og:image:alt" content="Jitendra Patidar" />
 <meta property="og:site_name" content="LIC Neemuch | Contact Jitendra Patidar, LIC Development Officer (DO) - Neemuch, Mandsaur, Ratangarh ,Singoli, Manasa, Jawad, Sarwaniya Maharaj|LIC एजेंट बनने के लिए जीतेंद्र पाटीदार (LIC, Neemuch) से संपर्क करें|TOP LIC Agents in Neemuch | Best LIC Agents in Neemuch , Best LIC Officer in Neemuch, Singoli, Ratangarh LIC India " />

 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content="Opportunity to Become an LIC Agent (Personal) with LIC Officer Jitendra Patidar (Neemuch) - Path to Security, Sensitivity, and Success|LIC Neemuch | Contact Jitendra Patidar, LIC Development Officer (DO) - Neemuch, Mandsaur, Ratangarh ,Singoli, Manasa, Jawad, Sarwaniya Maharaj|LIC एजेंट बनने के लिए जीतेंद्र पाटीदार (LIC, Neemuch) से संपर्क करें|TOP LIC Agents in Neemuch | Best LIC Agents in Neemuch , Best LIC Officer in Neemuch, Singoli, Ratangarh LIC India" />
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
         '@type': 'ItemList',
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
                        "https://jitendra-patidar.vercel.app/be-an-lic-agent",
                        "https://jitendra-patidar.vercel.app/contact-lic-officer-jitendra-patidar"

         ]
   

       })}
     </script>


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



  <div className="w-full max-w-6xl why-us-content">

  {contentBlocks.map((block, index) => {
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
          <div className={`${styles.sectionHeadText} text-center mb-4`}>
                        {block.title}


                      </div>
                      <Text>     
                     {block.overview}

                     </Text> 
                      <Next>     
                     {block.description}

                     </Next> 

                      
                    </motion.div>
                    
                  );
                })}

             </div>
             < LicBenefit/>

  <div className="w-full max-w-6xl why-us-content">

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
          <div className={`${styles.sectionHeadText} text-center mb-4`}>
                        {block.title}


                      </div>
                      <Text>     
                     {block.overview}

                     </Text> 
                      <Next>     
                     {block.description}

                     </Next> 

                      
                    </motion.div>
                    
                  );
                })}

             </div>

   


      <BackgroundOverlay />
   
  
       

</div>





    </section>
  );
}


export default LicAgent;
