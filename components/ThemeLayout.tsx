import React, { useState, ReactNode } from 'react';
import SeoArticle from '../utils/SeoArticle';

interface ThemeLayoutProps {
  children: ReactNode;
}

const Modal: React.FC<{ title: string; content: ReactNode; onClose: () => void }> = ({ title, content, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-800/80 p-4 flex justify-between items-center border-b border-gray-700 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        <div className="p-6 text-gray-300">
          {content}
        </div>
      </div>
    </div>
);

const ThemeLayout: React.FC<ThemeLayoutProps> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const modalContent: { [key: string]: { title: string; content: ReactNode } } = {
        about: { title: "About Us", content: <p>Cosmic Pass is a privacy-focused, client-side tool for password security analysis and generation. Created by HSINI MOHAMED, it leverages pure JavaScript to ensure your data never leaves your browser.</p> },
        contact: { title: "Contact", content: <p>For inquiries, please reach out via email at <a href="mailto:hsini.web@gmail.com" className="text-cyan-400">hsini.web@gmail.com</a> or visit <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400">doodax.com</a>.</p> },
        guide: { title: "The Ultimate Guide to Password Security", content: <SeoArticle /> },
        privacy: { title: "Privacy Policy", content: <p>We respect your privacy. This application is 100% client-side. No data, including the passwords you enter or generate, is ever transmitted or stored outside of your local browser session. We do not use cookies or trackers.</p> },
        terms: { title: "Terms of Service", content: <p>This tool is provided 'as is' without warranty of any kind. Use it at your own risk. The developers are not liable for any damages or losses resulting from its use.</p> },
        dmca: { title: "DMCA", content: <p>For any copyright concerns, please contact us directly via the information provided on the contact page. We will address any valid claims promptly.</p> }
    };

  return (
    <>
      <style>{`
        @keyframes move-background {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .cosmic-background {
          background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #0f0c29, #3a3372);
          background-size: 400% 400%;
          animation: move-background 30s ease infinite;
        }
      `}</style>
      <div className="min-h-screen font-sans text-white bg-gray-900 cosmic-background flex flex-col">
        <header className="w-full p-4 border-b border-white/10 sticky top-0 bg-black/20 backdrop-blur-md z-40">
            <nav className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
                <div className="text-2xl font-bold">
                    <span className="text-cyan-400">Cosmic</span>
                    <span className="text-fuchsia-500">Pass</span>
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {Object.keys(modalContent).map(key => (
                        <li key={key}><button onClick={() => setActiveModal(key)} className="capitalize hover:text-cyan-400 transition-colors">{modalContent[key].title.split(" ")[0]}</button></li>
                    ))}
                </ul>
            </nav>
        </header>

        <main className="flex-grow flex flex-col justify-center items-center p-4">
            <div className="text-center mb-8 max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    Fortify Your <span className="text-cyan-400">Digital</span> <span className="text-fuchsia-500">World</span>
                </h1>
                <p className="text-lg text-gray-300">
                    Instantly analyze password strength and generate unbreakable, secure passwords with Cosmic Pass.
                </p>
            </div>
            {children}
        </main>

        <footer className="w-full text-center p-6 border-t border-white/10 text-gray-400 text-sm">
             <p>Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" style={{color: '#FFD700'}} className="font-bold hover:underline">HSINI MOHAMED</a></p>
            <p>
                <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">doodax.com</a> | <a href="mailto:hsini.web@gmail.com" className="hover:text-white">hsini.web@gmail.com</a>
            </p>
        </footer>

        {activeModal && modalContent[activeModal] && (
            <Modal
                title={modalContent[activeModal].title}
                content={modalContent[activeModal].content}
                onClose={() => setActiveModal(null)}
            />
        )}
      </div>
    </>
  );
};

export default ThemeLayout;