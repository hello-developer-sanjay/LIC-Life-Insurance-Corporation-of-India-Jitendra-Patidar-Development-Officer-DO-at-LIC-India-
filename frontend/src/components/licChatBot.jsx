import React, { useEffect, useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/chatbot.css';

const LicChatBot = () => {
    const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('lic-chat')) || []);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);
    const [autoReplyEnabled, setAutoReplyEnabled] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [chatMode, setChatMode] = useState('general');
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null); // New ref for the messages container

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechRef = useRef(null);

    // Initial welcome message
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    sender: 'ai',
                    text: 'नमस्ते! मैं आपका चैटबॉट हूँ। LIC से संबंधित या कोई भी सवाल पूछें, मैं आपकी मदद करूँगा!',
                    id: Date.now(),
                    timestamp: new Date().toLocaleTimeString(),
                },
            ]);
        }
    }, []);

    // Initialize Speech Recognition
    useEffect(() => {
        if (SpeechRecognition) {
            speechRef.current = new SpeechRecognition();
            speechRef.current.lang = 'hi-IN';
            speechRef.current.continuous = false;
            speechRef.current.interimResults = false;
            speechRef.current.maxAlternatives = 1;

            speechRef.current.onstart = () => {
                setIsListening(true);
                setMessages(prev => [
                    ...prev,
                    { sender: 'ai', text: 'बोलना शुरू करें...', id: Date.now(), timestamp: new Date().toLocaleTimeString() },
                ]);
            };

            speechRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setShowConfirmPopup(true);
                setIsListening(false);
            };

            speechRef.current.onerror = (event) => {
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
                setIsListening(false);
                if (input) setShowConfirmPopup(true);
            };
        }
    }, [input]);

    // Smooth scroll to new message
    useEffect(() => {
        if (messagesEndRef.current && !isHistoryCollapsed && messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            const lastMessage = messagesEndRef.current;
            const containerHeight = container.clientHeight;
            const scrollHeight = container.scrollHeight;
            const lastMessageOffset = lastMessage.offsetTop;

            // Only scroll if the new message is out of view or near the bottom
            if (scrollHeight > containerHeight && lastMessageOffset > container.scrollTop + containerHeight - 50) {
                container.scrollTo({
                    top: lastMessageOffset - containerHeight + lastMessage.offsetHeight + 20, // Adjust for padding
                    behavior: 'smooth',
                });
            }
        }
    }, [messages, isHistoryCollapsed]);

    // Persist messages
    useEffect(() => {
        localStorage.setItem('lic-chat', JSON.stringify(messages));
    }, [messages]);

    const chatAnimation = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        config: { tension: 200, friction: 20 },
    });

    const sendMessageToGemini = async (message) => {
        if (!message.trim()) return;

        const userMessage = { sender: 'user', text: message, id: Date.now(), timestamp: new Date().toLocaleTimeString() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const formatInstruction = "हिंदी में आसान और संक्षिप्त जवाब दें। बुलेट पॉइंट्स के लिए `-` का उपयोग करें, जहां जरूरी हो नंबर लिस्ट करें, और बोल्ड टेक्स्ट के लिए `**` का उपयोग करें।";
        const context = chatMode === 'lic'
            ? `${formatInstruction} आप एक हिंदी चैटबॉट हैं जो LIC (भारतीय जीवन बीमा निगम) से संबंधित जानकारी देता है। उपयोगकर्ता सवाल: ${message}`
            : `${formatInstruction} आप एक सामान्य ज्ञान हिंदी चैटबॉट हैं। उपयोगकर्ता सवाल: ${message}`;

        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBTD9ltLvYEDK9MWgTR-71nXt1SsfRzGXI', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: context }] }] }),
            });

            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            const aiResponse = data.candidates[0].content.parts[0].text;
            const customMessage = chatMode === 'lic'
                ? "**अधिक जानकारी के लिए LIC अधिकारी से संपर्क करें: जितेंद्र पाटीदार, फोन: 798723527**"
                : null;

            setMessages(prev => [
                ...prev,
                { sender: 'ai', text: aiResponse, id: Date.now(), timestamp: new Date().toLocaleTimeString() },
                ...(customMessage ? [{ sender: 'ai', text: customMessage, id: Date.now() + 1, timestamp: new Date().toLocaleTimeString() }] : []),
            ]);

            if (autoReplyEnabled) {
                setTimeout(() => {
                    setMessages(prev => [
                        ...prev,
                        { sender: 'ai', text: 'क्या आपके पास और कोई सवाल है?', id: Date.now() + 2, timestamp: new Date().toLocaleTimeString() },
                    ]);
                }, 2000);
            }
        } catch (error) {
            setMessages(prev => [
                ...prev,
                { sender: 'ai', text: 'कुछ गलत हुआ। कृपया फिर से कोशिश करें!', id: Date.now(), timestamp: new Date().toLocaleTimeString() },
            ]);
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

    const toggleAutoReply = () => {
        setAutoReplyEnabled(prev => !prev);
    };

    const toggleChatMode = () => {
        setChatMode(prev => (prev === 'lic' ? 'general' : 'lic'));
        setMessages(prev => [
            ...prev,
            { sender: 'ai', text: `मोड बदल गया: ${chatMode === 'lic' ? 'सामान्य' : 'LIC'}`, id: Date.now(), timestamp: new Date().toLocaleTimeString() },
        ]);
    };

    const adjustFontSize = (delta) => {
        setFontSize(prev => Math.max(12, Math.min(20, prev + delta)));
    };

    const suggestedPrompts = chatMode === 'lic'
        ? [
            'एलआईसी क्या है?',
            'एलआईसी से पैसे कैसे कमाएं?',
            'बीमा लेने के फायदे बताएं',
            'एलआईसी एजेंट कैसे बनें?',
            'मेरे गांव में एलआईसी ऑफिस कहां है?',
            'एलआईसी का नंबर क्या है?',
        ]
        : [
            'आज का मौसम क्या है?',
            'भारत की राजधानी क्या है?',
            'सबसे बड़ा महासागर कौन सा है?',
            'हिंदी में कविता लिखें',
            '1 दिन में कितने घंटे होते हैं?',
            'सूर्योदय कब होता है?',
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
        <animated.div
            style={{ ...chatAnimation, fontSize: `${fontSize}px` }}
            className={`chatbot-container ${isDarkMode ? 'dark-mode' : ''}`}
        >
            <div className="chatbot-header">
                <h3>{chatMode === 'lic' ? 'एलआईसी चैटबॉट' : 'सामान्य चैटबॉट'}</h3>
                <div className="chatbot-controls">
                    <button className="theme-btn" onClick={toggleTheme}>
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                    <button className="history-btn" onClick={toggleHistory}>
                        {isHistoryCollapsed ? 'इतिहास दिखाएं' : 'इतिहास छुपाएं'}
                    </button>
                    <button className="auto-reply-btn" onClick={toggleAutoReply}>
                        {autoReplyEnabled ? 'ऑटो-जवाब बंद' : 'ऑटो-जवाब चालू'}
                    </button>
                    <button className="mode-btn" onClick={toggleChatMode}>
                        {chatMode === 'lic' ? 'सामान्य मोड' : 'LIC मोड'}
                    </button>
                    <button className="font-btn" onClick={() => adjustFontSize(2)}>A+</button>
                    <button className="font-btn" onClick={() => adjustFontSize(-2)}>A-</button>
                </div>
            </div>
            <div className="chatbot-content">
                {!isHistoryCollapsed && (
                    <div className="chat-messages" ref={messagesContainerRef}>
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
                        placeholder="कोई भी सवाल पूछें..."
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

            {showConfirmPopup && (
                <div className="confirm-popup">
                    <p>आपने कहा: "{input}"</p>
                    <button onClick={confirmSpeechInput}>Confirm करें</button>
                    <button onClick={cancelSpeechInput}>रद्द करें</button>
                </div>
            )}
        </animated.div>
    );
};

export default LicChatBot;
