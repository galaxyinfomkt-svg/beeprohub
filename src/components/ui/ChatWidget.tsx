"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat"
        className="fixed bottom-6 left-6 z-[900] bg-primary text-dark w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(245,184,0,0.4)] hover:scale-110 transition-transform"
      >
        {open ? (
          <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg width={24} height={24} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 left-6 z-[901] w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-scale-in">
          <div className="bg-dark p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <svg width={20} height={20} fill="none" stroke="#1A1A1A" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Bee Pro Hub</p>
                <p className="text-gray-400 text-xs">Responde em minutos</p>
              </div>
            </div>
          </div>
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/3Rzf3zW0TBnYk9zgIMVZ"
            style={{ width: "100%", height: "500px", border: "none" }}
            id="chat-form-3Rzf3zW0TBnYk9zgIMVZ"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="bee pro"
            data-height="500"
            data-layout-iframe-id="chat-form-3Rzf3zW0TBnYk9zgIMVZ"
            data-form-id="3Rzf3zW0TBnYk9zgIMVZ"
            title="bee pro"
          />
        </div>
      )}
    </>
  );
}
