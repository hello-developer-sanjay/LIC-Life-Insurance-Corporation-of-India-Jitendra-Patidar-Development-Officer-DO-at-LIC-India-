import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Draggable from 'react-draggable';
import '../styles/benefit.css';

const LicBenefit = () => {
    const [inViewContent, setInViewContent] = useState(false);
    const contentRef = useRef(null);
    const controlsContent = useAnimation();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('lic-chat')) || []);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [chatSize, setChatSize] = useState(() => {
        const savedSize = JSON.parse(localStorage.getItem('lic-chat-size'));
        return savedSize || { width: Math.min(500, window.innerWidth * 0.9), height: Math.min(600, window.innerHeight * 0.8) };
    });
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);
    const messagesEndRef = useRef(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if (SpeechRecognition) {
            speechRef.current = new SpeechRecognition();
            speechRef.current.lang = 'hi-IN';
            speechRef.current.continuous = false;
            speechRef.current.interimResults = false;
            speechRef.current.maxAlternatives = 1;

            speechRef.current.onstart = () => {
                console.log('Speech recognition started');
                setIsListening(true);
                setMessages(prev => [
                    ...prev,
                    { sender: 'ai', text: 'बोलना शुरू करें...', id: Date.now(), timestamp: new Date().toLocaleTimeString() },
                ]);
            };

            speechRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('Speech recognized:', transcript);
                setInput(transcript);
                setShowConfirmPopup(true);
                setIsListening(false);
            };

            speechRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                let errorMsg = 'आवाज समझने में दिक्कत हुई।';
                switch (event.error) {
                    case 'no-speech': errorMsg = 'कोई आवाज नहीं सुनी गई।'; break;
                    case 'not-allowed': errorMsg = 'माइक्रोफोन की अनुमति दें।'; break;
                    case 'audio-capture': errorMsg = 'माइक्रोफोन काम नहीं कर रहा।'; break;
                    default: errorMsg = `त्रुटि: ${event.error}`;
                }
                setMessages(prev => [
                    ...prev,
                    { sender: 'ai', text: errorMsg, id: Date.now(), timestamp: new Date().toLocaleTimeString() },
                ]);
            };

            speechRef.current.onend = () => {
                console.log('Speech recognition ended');
                setIsListening(false);
                if (input) setShowConfirmPopup(true);
            };
        }
    }, []);

    // Auto-scroll to latest message
    useEffect(() => {
        if (messagesEndRef.current && !isHistoryCollapsed) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isHistoryCollapsed]);

    // Persist chat size and adjust on window resize
    useEffect(() => {
        const handleResize = () => {
            setChatSize(prev => ({
                width: Math.max(300, Math.min(800, window.innerWidth * 0.9)),
                height: Math.max(400, Math.min(1000, window.innerHeight * 0.8)),
            }));
        };
        window.addEventListener('resize', handleResize);
        localStorage.setItem('lic-chat-size', JSON.stringify(chatSize));
        return () => window.removeEventListener('resize', handleResize);
    }, [chatSize]);

    // Persist messages
    useEffect(() => {
        localStorage.setItem('lic-chat', JSON.stringify(messages));
    }, [messages]);

    // Handle scroll animation for benefits
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const topPos = contentRef.current.getBoundingClientRect().top;
                const bottomPos = contentRef.current.getBoundingClientRect().bottom;
                const windowHeight = window.innerHeight;
                setInViewContent(topPos < windowHeight && bottomPos > 0);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (inViewContent) {
            controlsContent.start({
                y: 0,
                opacity: 1,
                scale: 1,
                transition: { duration: 2, type: 'spring', stiffness: 100 },
            });
        }
    }, [inViewContent, controlsContent]);

    const chatAnimation = useSpring({
        opacity: isChatOpen ? 1 : 0,
        transform: isChatOpen ? 'scale(1)' : 'scale(0.9)',
        config: { tension: 200, friction: 20 },
    });

    const sendMessageToGemini = async (message) => {
        if (!message.trim()) return;

        const userMessage = { sender: 'user', text: message, id: Date.now(), timestamp: new Date().toLocaleTimeString() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const formatInstruction = "हिंदी में आसान और संक्षिप्त जवाब दें। बुलेट पॉइंट्स के लिए `-` का उपयोग करें, जहां जरूरी हो नंबर लिस्ट करें, और बोल्ड टेक्स्ट के लिए `**` का उपयोग करें।";
        const context = `${formatInstruction} आप एक हिंदी चैटबॉट हैं जो LIC (भारतीय जीवन बीमा निगम) से संबंधित जानकारी देता है। उपयोगकर्ता सवाल: ${message}`;

        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBTD9ltLvYEDK9MWgTR-71nXt1SsfRzGXI', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: context }] }] }),
            });

            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;
            setMessages(prev => [...prev, { sender: 'ai', text: aiResponse, id: Date.now(), timestamp: new Date().toLocaleTimeString() }]);
        } catch (error) {
            console.error('Error fetching Gemini API:', error);
            setMessages(prev => [...prev, { sender: 'ai', text: 'कुछ गलत हुआ। कृपया फिर से कोशिश करें!', id: Date.now(), timestamp: new Date().toLocaleTimeString() }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) sendMessageToGemini(input);
    };

    const toggleVoiceInput = () => {
        if (!SpeechRecognition || !speechRef.current) {
            setMessages(prev => [
                ...prev,
                { sender: 'ai', text: 'यह ब्राउज़र आवाज पहचान को सपोर्ट नहीं करता। कृपया Chrome का उपयोग करें।', id: Date.now(), timestamp: new Date().toLocaleTimeString() },
            ]);
            return;
        }

        if (isListening) {
            speechRef.current.stop();
            console.log('Speech stopped manually');
        } else {
            navigator.permissions.query({ name: 'microphone' }).then(permissionStatus => {
                if (permissionStatus.state === 'denied') {
                    setMessages(prev => [
                        ...prev,
                        { sender: 'ai', text: 'माइक्रोफोन की अनुमति नहीं है। सेटिंग्स में अनुमति दें।', id: Date.now(), timestamp: new Date().toLocaleTimeString() },
                    ]);
                } else {
                    navigator.mediaDevices.getUserMedia({ audio: true })
                        .then(() => {
                            setIsListening(true);
                            setInput('');
                            speechRef.current.start();
                        })
                        .catch(err => {
                            console.error('Microphone access error:', err);
                            setMessages(prev => [
                                ...prev,
                                { sender: 'ai', text: 'माइक्रोफोन तक पहुंच नहीं मिली।', id: Date.now(), timestamp: new Date().toLocaleTimeString() },
                            ]);
                        });
                }
            });
        }
    };

    const confirmSpeechInput = () => {
        setShowConfirmPopup(false);
        if (input.trim()) sendMessageToGemini(input);
    };

    const cancelSpeechInput = () => {
        setShowConfirmPopup(false);
        setInput('');
    };

    const startEditing = (msg) => {
        if (msg.sender === 'user') {
            setEditingMessageId(msg.id);
            setEditedText(msg.text);
        }
    };

    const saveEditedMessage = (msgId) => {
        if (editedText.trim()) {
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === msgId ? { ...msg, text: editedText, timestamp: new Date().toLocaleTimeString() } : msg
                )
            );
            sendMessageToGemini(editedText);
        }
        setEditingMessageId(null);
        setEditedText('');
    };

    const deleteMessage = (msgId) => {
        setMessages(prev => prev.filter(msg => msg.id !== msgId));
    };

    const copyMessage = (text) => {
        navigator.clipboard.writeText(text);
        setMessages(prev => [
            ...prev,
            { sender: 'ai', text: 'संदेश कॉपी हो गया!', id: Date.now(), timestamp: new Date().toLocaleTimeString() },
        ]);
    };

    const handleResize = (e) => {
        const newWidth = Math.max(300, Math.min(800, e.target.offsetWidth));
        const newHeight = Math.max(400, Math.min(1000, e.target.offsetHeight));
        setChatSize({ width: newWidth, height: newHeight });
    };

    const resetSize = () => {
        setChatSize({ width: Math.min(500, window.innerWidth * 0.9), height: Math.min(600, window.innerHeight * 0.8) });
    };

    const clearChat = () => {
        setMessages([]);
        localStorage.removeItem('lic-chat');
    };

    const exportChat = () => {
        const chatText = messages.map(msg => `${msg.timestamp} [${msg.sender === 'user' ? 'आप' : 'चैटबॉट'}]: ${msg.text}`).join('\n');
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lic-chat.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    const toggleHistory = () => {
        setIsHistoryCollapsed(prev => !prev);
    };

    const suggestedPrompts = [
        'एलआईसी क्या है?',
        'एलआईसी से पैसे कैसे कमाएं?',
        'बीमा लेने के फायदे बताएं',
        'एलआईसी एजेंट कैसे बनें?',
        'मेरे गांव में एलआईसी ऑफिस कहां है?',
        'एलआईसी का नंबर क्या है?',
    ];

    const handlePromptClick = (prompt) => {
        setInput(prompt);
        sendMessageToGemini(prompt);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        if (value.trim()) {
            setFilteredSuggestions(
                suggestedPrompts.filter(prompt => prompt.toLowerCase().includes(value.toLowerCase()))
            );
        } else {
            setFilteredSuggestions([]);
        }
    };

    return (
        <div className="benefits-container" ref={contentRef}>
            <h2>फायदे</h2>
            <motion.div className="benefits-icons" animate={controlsContent}>
                <div className="benefit">
                    <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/career.jpg" alt="icon1" width="150px" height="150px" />
                    <p>अपना काम</p>
                </div>
                <div className="benefit">
                    <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/money.jpeg" alt="icon2" width="136px" height="140px" />
                    <p>ज्यादा कमाई</p>
                </div>
                <div className="benefit">
                    <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/loan.jpeg" alt="icon2" width="190px" height="190px" />
                    <p>घर और गाड़ी का लोन</p>
                </div>
                <div className="benefit">
                    <img src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/lic-jay/travel.jpeg" alt="icon2" width="190px" height="190px" />
                    <p>विदेश घूमने का मौका</p>
                </div>
            </motion.div>

            <button className="chat-toggle-btn" onClick={() => setIsChatOpen(!isChatOpen)}>
                {isChatOpen ? 'चैट बंद करें' : 'एलआईसी मदद चैट'}
            </button>

            {isChatOpen && (
                <Draggable handle=".chat-header" bounds="body">
                    <animated.div
                        style={{
                            ...chatAnimation,
                            width: `${chatSize.width}px`,
                            height: isMinimized ? '60px' : `${chatSize.height}px`,
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1001,
                        }}
                        className={`chat-standalone ${isDarkMode ? 'dark-mode' : ''}`}
                        onMouseUp={handleResize}
                    >
                        <div className="chat-header">
                            <h3>एलआईसी मदद चैटबॉट</h3>
                            <div className="chat-controls">
                                <button className="reset-btn" onClick={resetSize}>⟳</button>
                                <button className="toggle-btn" onClick={() => setIsMinimized(!isMinimized)}>
                                    {isMinimized ? '□' : '–'}
                                </button>
                            </div>
                        </div>
                        {!isMinimized && (
                            <div className="chat-content">
                                <div className="chat-header-actions">
                                    <button className="theme-btn" onClick={toggleTheme}>
                                        {isDarkMode ? '☀️' : '🌙'}
                                    </button>
                                    <button className="history-btn" onClick={toggleHistory}>
                                        {isHistoryCollapsed ? 'इतिहास दिखाएं' : 'इतिहास छुपाएं'}
                                    </button>
                                </div>
                                {!isHistoryCollapsed && (
                                    <div className="chat-messages">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
                                            >
                                                <div className="message-content">
                                                    {editingMessageId === msg.id ? (
                                                        <div className="edit-message">
                                                            <input
                                                                type="text"
                                                                value={editedText}
                                                                onChange={(e) => setEditedText(e.target.value)}
                                                                onKeyPress={(e) => e.key === 'Enter' && saveEditedMessage(msg.id)}
                                                            />
                                                            <button onClick={() => saveEditedMessage(msg.id)}>सहेजें</button>
                                                            <button onClick={() => setEditingMessageId(null)}>रद्द करें</button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {msg.sender === 'ai' ? (
                                                                <ReactMarkdown
                                                                    remarkPlugins={[remarkGfm]}
                                                                    rehypePlugins={[rehypeRaw]}
                                                                    components={{
                                                                        code({ node, inline, className, children, ...props }) {
                                                                            const match = /language-(\w+)/.exec(className || '');
                                                                            return !inline && match ? (
                                                                                <SyntaxHighlighter
                                                                                    style={oneDark}
                                                                                    language={match[1]}
                                                                                    PreTag="div"
                                                                                    {...props}
                                                                                >
                                                                                    {String(children).replace(/\n$/, '')}
                                                                                </SyntaxHighlighter>
                                                                            ) : (
                                                                                <code className={className} {...props}>
                                                                                    {children}
                                                                                </code>
                                                                            );
                                                                        },
                                                                    }}
                                                                >
                                                                    {msg.text}
                                                                </ReactMarkdown>
                                                            ) : (
                                                                msg.text
                                                            )}
                                                            <span className="message-timestamp">{msg.timestamp}</span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="message-actions">
                                                    {msg.sender === 'user' && (
                                                        <button className="edit-btn" onClick={() => startEditing(msg)}>
                                                            बदलें
                                                        </button>
                                                    )}
                                                    <button className="delete-btn" onClick={() => deleteMessage(msg.id)}>
                                                        हटाएं
                                                    </button>
                                                    <button className="copy-btn" onClick={() => copyMessage(msg.text)}>
                                                        कॉपी
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && <div className="chat-loading">चैटबॉट लिख रहा है...</div>}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                                <div className="chat-suggestions">
                                    {(filteredSuggestions.length > 0 ? filteredSuggestions : suggestedPrompts).map((prompt, index) => (
                                        <button
                                            key={index}
                                            className="suggestion-btn"
                                            onClick={() => handlePromptClick(prompt)}
                                            disabled={isLoading}
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                                <div className="chat-input-area">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        placeholder="अपना सवाल पूछें..."
                                        disabled={isLoading}
                                    />
                                    <button className="voice-btn" onClick={toggleVoiceInput} disabled={isLoading}>
                                        {isListening ? 'रोकें' : '🎤'}
                                    </button>
                                    <button onClick={() => sendMessageToGemini(input)} disabled={isLoading}>
                                        भेजें
                                    </button>
                                </div>
                                <div className="chat-actions">
                                    <button className="clear-btn" onClick={clearChat} disabled={isLoading || messages.length === 0}>
                                        चैट साफ करें
                                    </button>
                                    <button className="export-btn" onClick={exportChat} disabled={isLoading || messages.length === 0}>
                                        चैट डाउनलोड करें
                                    </button>
                                </div>
                            </div>
                        )}
                    </animated.div>
                </Draggable>
            )}

            {showConfirmPopup && (
                <div className="confirm-popup">
                    <p>आपने कहा: "{input}"</p>
                    <button onClick={confirmSpeechInput}>Confirm करें</button>
                    <button onClick={cancelSpeechInput}>रद्द करें</button>
                </div>
            )}
        </div>
    );
};

export default LicBenefit;
