import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');

  const whatsappNumber = '18005554252';

  const handleOpenWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const defaultText =
      quickMessage.trim() ||
      'Hello Hendrix Cargo & Logistics, I would like assistance with a freight shipment / quotation.';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end no-print">
      {/* Expandable Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn">
          <div className="bg-brand-navy p-4 text-white flex items-center justify-between border-b border-brand-navy-surface">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md relative">
                <MessageCircle className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-300 ring-2 ring-brand-navy" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white">
                  Hendrix WhatsApp Desk
                </h4>
                <span className="text-[11px] text-emerald-400 font-medium block">
                  24/7 Cargo &amp; Quote Assistance
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              aria-label="Close WhatsApp chat widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-slate-600 leading-relaxed shadow-sm">
              Welcome to <strong>Hendrix Cargo &amp; Logistics</strong>. Message our dispatch desk on
              WhatsApp for freight quotes, customs questions, or tracking support.
            </div>

            <form onSubmit={handleOpenWhatsApp} className="space-y-2.5">
              <input
                type="text"
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                placeholder="Type your cargo inquiry or tracking ID..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Conversation</span>
              </button>
            </form>

            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Direct Voice Support:</span>
              <a
                href="tel:+18005554252"
                className="text-brand-navy font-semibold hover:text-brand-gold-dark flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>+1 (800) 555-HCL2</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl border-2 border-white/20 transition-all hover:scale-105 cursor-pointer"
        aria-label="Chat with Hendrix Logistics on WhatsApp"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 fill-white/15" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white animate-ping" />
        </span>
        <span className="font-heading font-bold text-xs sm:text-sm tracking-wide">
          WhatsApp Support
        </span>
      </button>
    </div>
  );
};

