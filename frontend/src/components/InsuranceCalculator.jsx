import React from 'react';
import { motion } from 'framer-motion';
import '../styles/insuranceCalculator.css';

const InsuranceCalculator = () => {
    // Animation variants for the cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    // Animation for the heading
    const headingVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <div className="insurance-calculator-container">
            <motion.div
                className="calculator-heading"
                variants={headingVariants}
                initial="hidden"
                animate="visible"
            >
                <h2>How much you need?</h2>
                <p>Calculate your premium and coverage</p>
            </motion.div>

            <div className="calculator-cards">
                <motion.a
                    href="https://ebiz.licindia.in/D2CPM/?_ga=2.37967139.1235977258.1678337624-1815580326.1656496634&_gac=1.20885834.1677570424.Cj0KCQiA54KfBhCKARIsAJzSrdqvUJ9fEJbJeG9sY9-tsnHcK99WMj4DFvoFJ3mIZ2-okk-4OWQ2xXUaAhXXEALw_wcB#fna/personal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="calculator-card"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                >
                    <div className="card-content">
                        <h3>Coverage Calculator</h3>
                        <p>Calculate the coverage as per your insurance needs</p>
                        <span className="card-link">Calculate Coverage <span className="arrow">→</span></span>
                    </div>
                    <div className="card-icon coverage-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#FFC107"/>
                        </svg>
                    </div>
                </motion.a>

                <motion.a
                    href="https://ebiz.licindia.in/D2CPM/?&_ga=2.2502002.312893476.1677125883-1841437327.1677125883#qni/basicinfo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="calculator-card"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ delay: 0.2 }}
                >
                    <div className="card-content">
                        <h3>Premium Calculator</h3>
                        <p>As per your policy & tenure calculate the premiums</p>
                        <span className="card-link">Calculate Premium <span className="arrow">→</span></span>
                    </div>
                    <div className="card-icon premium-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0-8c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" fill="#FFC107"/>
                        </svg>
                    </div>
                </motion.a>
            </div>
        </div>
    );
};

export default InsuranceCalculator;
