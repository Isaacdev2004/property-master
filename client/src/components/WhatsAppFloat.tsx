import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "971585707110";
  const defaultMessage = "Hello! I'm interested in your services. Can you help me?";

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" data-testid="whatsapp-float">
      {isOpen && (
        <div
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[320px] overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300"
          data-testid="whatsapp-popup"
        >
          <div className="bg-[#25D366] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <SiWhatsapp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">The Property Masters</p>
                <p className="text-white/80 text-xs">Typically replies within minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              data-testid="button-close-whatsapp"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-[#ECE5DD]">
            <div className="bg-white rounded-lg px-4 py-3 shadow-sm max-w-[85%]">
              <p className="text-sm text-gray-800">
                Hi there! Welcome to The Property Masters. How can we help you today?
              </p>
              <p className="text-[10px] text-gray-400 text-right mt-1">Just now</p>
            </div>
          </div>

          <div className="p-4 bg-white">
            <button
              onClick={openWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full py-3 px-6 flex items-center justify-center gap-2 transition-colors text-sm font-medium"
              data-testid="button-start-whatsapp-chat"
            >
              <SiWhatsapp className="w-4 h-4" />
              Start Chat
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 group"
        data-testid="button-whatsapp-float"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <SiWhatsapp className="w-7 h-7 text-white" />
        )}
      </button>
    </div>
  );
}
