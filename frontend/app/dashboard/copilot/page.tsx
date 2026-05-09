'use client';

import React, { useState } from 'react';
import { useCircular } from '@/lib/CircularContext';

export default function DedicatedCopilotChat() {
  const { copilotMessages, sendCopilotMessage, isCopilotThinking, activeStream, t } = useCircular();
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendCopilotMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex flex-col gap-8 pb-16 h-[calc(100vh-140px)]">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface/30 backdrop-blur-glass p-6 rounded-2xl border border-outline-variant/15 shadow-sm shrink-0">
        <div>
          <span className="font-label-caps text-[10px] text-primary font-bold uppercase tracking-widest bg-primary-container/20 px-3.5 py-1.5 rounded-full border border-primary/20">
            Intelligence Module
          </span>
          <h1 className="font-display-hero text-4xl font-extrabold text-on-background tracking-tighter mt-3">
            {t('copilotTitle')}
          </h1>
          <p className="font-body-large text-sm text-on-surface-variant mt-1">
            {t('copilotDesc')}
          </p>
        </div>
        {activeStream && (
          <div className="text-xs bg-primary-container/20 border border-primary/20 text-primary font-bold px-3 py-1 rounded-full uppercase">
            Context Stream: {activeStream.name}
          </div>
        )}
      </div>

      {/* Main chat layout */}
      <div className="glass-panel rounded-2xl p-6 flex-1 flex flex-col justify-between overflow-hidden relative">
        <div className="absolute inset-0 bg-radial-gradient from-primary-container/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Messages listing */}
        <div className="flex-grow overflow-y-auto mb-6 pr-2 space-y-4 text-xs font-semibold">
          {copilotMessages.map((msg) => {
            const isBot = msg.sender === 'assistant';
            return (
              <div 
                key={msg.id} 
                className={`flex gap-4 p-4 rounded-xl border max-w-3xl ${
                  isBot 
                    ? 'bg-surface-bright/70 border-primary-container/55 text-on-background self-start' 
                    : 'bg-primary text-white border-primary self-end ml-auto'
                }`}
              >
                {isBot && (
                  <span className="material-symbols-outlined text-primary bg-primary-container/30 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                    smart_toy
                  </span>
                )}
                <div className="leading-relaxed">
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1 ${isBot ? 'text-on-surface-variant/70' : 'text-white/60'}`}>{msg.timestamp}</span>
                </div>
              </div>
            );
          })}

          {isCopilotThinking && (
            <div className="flex items-center gap-3 text-primary text-xs font-bold animate-pulse p-4">
              <span className="material-symbols-outlined animate-spin-slow">cycle</span>
              <span>{t('copilotThinking')}</span>
            </div>
          )}
        </div>

        {/* Input send message form */}
        <form onSubmit={handleSubmit} className="flex gap-4 shrink-0 relative z-10 border-t border-outline-variant/15 pt-4">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('copilotPlaceholder')}
            className="flex-1 bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3.5 text-xs text-on-background input-glow focus:outline-none transition-all"
          />
          <button 
            type="submit"
            className="px-6 bg-primary text-white font-label-caps text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-secondary hover:holographic-glow transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">send</span>
            {t('copilotSubmit')}
          </button>
        </form>
      </div>

    </div>
  );
}
