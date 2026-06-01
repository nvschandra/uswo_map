import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, ChevronDown } from 'lucide-react';
import { getResponse } from '../data/knowledge.js';

function renderMarkdown(text) {
  // Bold
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#e8bf4b">$1</strong>');
  // Bullets
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul style="margin:6px 0 6px 16px;line-height:1.7">$1</ul>');
  // Newlines
  html = html.replace(/\n/g, '<br/>');
  return html;
}

const SUGGESTIONS = [
  'Where can I eat?',
  'Where is the nearest restroom?',
  'How do I get here?',
  'Tell me about hole 4',
  'What tickets do I need?',
  'Is there free WiFi?',
];

const WELCOME = {
  role: 'bot',
  text: "Welcome to the **81st U.S. Women's Open** at The Riviera! ⛳\n\nI'm your interactive guide. Click any marker on the map for instant details, or ask me anything — food, restrooms, transportation, holes, hospitality, and more. Type **'help'** to see all topics.",
  ts: Date.now(),
};

export default function ChatPanel({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    const q = text.trim();
    if (!q) return;
    setInput('');

    const userMsg = { role: 'user', text: q, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate a brief typing delay
    setTimeout(() => {
      const botText = getResponse(q);
      setMessages(prev => [...prev, { role: 'bot', text: botText, ts: Date.now() }]);
      setIsTyping(false);
    }, 500 + Math.random() * 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          bottom: 24, right: 24,
          width: 56, height: 56,
          borderRadius: '50%',
          background: isOpen ? '#163459' : '#c9a227',
          border: 'none',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          zIndex: 200,
          transition: 'background 0.2s, transform 0.2s',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
          color: isOpen ? '#fff' : '#0d2240',
        }}
        title={isOpen ? 'Close chat' : 'Ask a question'}
      >
        {isOpen ? <ChevronDown size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="panel-in"
          style={{
            position: 'fixed',
            bottom: 92, right: 24,
            width: 360,
            maxHeight: 520,
            background: 'rgba(10,28,56,0.97)',
            backdropFilter: 'blur(16px)',
            borderRadius: 16,
            border: '1px solid rgba(201,162,39,0.3)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 199,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(13,34,64,0.9)',
            borderBottom: '1px solid rgba(201,162,39,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #c9a227, #e8bf4b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>
              ⛳
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>USWO Guide</div>
              <div style={{ fontSize: 11, color: '#5a8aaa' }}>Ask me anything about the event</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px' }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 10,
                }}
              >
                {msg.role === 'bot' && (
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #c9a227, #e8bf4b)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, marginRight: 8, flexShrink: 0, marginTop: 2,
                  }}>
                    ⛳
                  </div>
                )}
                <div
                  className="chat-bubble"
                  style={{
                    maxWidth: '80%',
                    padding: '9px 13px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #1a5c8a, #163459)'
                      : 'rgba(255,255,255,0.07)',
                    border: msg.role === 'user'
                      ? '1px solid rgba(74,144,217,0.3)'
                      : '1px solid rgba(255,255,255,0.08)',
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: '#e8ecf0',
                  }}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                />
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c9a227, #e8bf4b)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14,
                }}>⛳</div>
                <div style={{
                  padding: '9px 14px',
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: '4px 16px 16px 16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', gap: 4, alignItems: 'center',
                }}>
                  {[0,1,2].map(i => (
                    <div
                      key={i}
                      style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#c9a227',
                        animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  style={{
                    background: 'rgba(201,162,39,0.12)',
                    border: '1px solid rgba(201,162,39,0.3)',
                    borderRadius: 20,
                    padding: '4px 10px',
                    fontSize: 11.5,
                    color: '#c9a227',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.target.style.background = 'rgba(201,162,39,0.25)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(201,162,39,0.12)'}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '10px 12px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            gap: 8,
            background: 'rgba(13,34,64,0.8)',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the event..."
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10,
                padding: '9px 12px',
                color: '#fff',
                fontSize: 13,
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              style={{
                background: input.trim() ? '#c9a227' : 'rgba(201,162,39,0.2)',
                border: 'none',
                borderRadius: 10,
                width: 38, height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                color: input.trim() ? '#0d2240' : '#5a7a9a',
                transition: 'background 0.15s',
                flexShrink: 0,
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 1; }
        }
      `}</style>
    </>
  );
}
