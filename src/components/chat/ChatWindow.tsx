import React, { useState, useEffect, useRef } from 'react';
import { X, Maximize2, Minimize2, MessageSquare } from 'lucide-react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 380, height: 600 });
  const [isVisible, setIsVisible] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleResize = (e: React.SyntheticEvent, { size }: { size: { width: number; height: number } }) => {
    setDimensions({
      width: Math.max(300, Math.min(400, size.width)),
      height: Math.max(400, Math.min(600, size.height)),
    });
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed z-50 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {isMinimized ? (
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => setIsMinimized(false)}
            className="glass-card w-16 h-16 flex items-center justify-center text-purple-primary hover:text-purple-hover transition-colors animate-bounce"
          >
            <MessageSquare className="w-8 h-8" />
          </button>
        </div>
      ) : (
        <Draggable handle=".handle" bounds="body">
          <Resizable
            width={dimensions.width}
            height={dimensions.height}
            onResize={handleResize}
            minConstraints={[300, 400]}
            maxConstraints={[400, 600]}
          >
            <div
              ref={chatContainerRef}
              style={{ width: dimensions.width, height: dimensions.height }}
              className="glass-card overflow-hidden shadow-2xl"
            >
              <div className="handle flex items-center justify-between p-4 border-b border-dark-border/20 cursor-move bg-dark-card/30">
                <h3 className="text-lg font-bold text-text-primary">Chat Support</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 hover:text-purple-primary transition-colors"
                    title="Minimize"
                  >
                    <Minimize2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1 hover:text-purple-primary transition-colors"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div 
                id="vfchat"
                className="flex-1 bg-dark-background/50"
                style={{ height: `calc(${dimensions.height}px - 64px)` }}
              />
            </div>
          </Resizable>
        </Draggable>
      )}
    </div>
  );
};

export default ChatWindow;