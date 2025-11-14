

// FIX: Corrected the import statement for React and its hooks.
import React, { useState, useEffect, useRef } from 'react';

// --- SVG ICONS ---

const CrownIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2h14z"/>
  </svg>
);

const FlourishDivider = ({ className = "w-32 h-10" }) => (
    <svg className={className} viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,10 C 20,10 10,0 2,10 C 10,20 20,10 50,10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M50,10 C 80,10 90,0 98,10 C 90,20 80,10 50,10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M50,10 m -5,-3 c 2.5,0 5,3 5,3 C 50,7 47.5,10 45,10 S 40,7 40,7 s 2.5,-3 5,-3" fill="currentColor" opacity="0.8" />
        <path d="M50,10 m 5,-3 c -2.5,0 -5,3 -5,3 C 50,7 52.5,10 55,10 S 60,7 60,7 s -2.5,-3 -5,-3" fill="currentColor" opacity="0.8" />
    </svg>
);


const WaxSealIcon = ({ className = "", isBreaking = false }) => (
    <svg className={`w-24 h-24 text-red-800/90 drop-shadow-lg ${className}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="wax-texture">
                <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise"/>
                <feDiffuseLighting in="noise" lightingColor="#a66a39" surfaceScale="2" result="light">
                    <feDistantLight azimuth="235" elevation="60"/>
                </feDiffuseLighting>
                <feComposite in="light" in2="SourceAlpha" operator="in" result="textured"/>
            </filter>
        </defs>
        
        <g className={isBreaking ? "seal-body-breaking" : ""}>
          <circle cx="50" cy="50" r="45" fill="#991b1b" filter="url(#wax-texture)"/>
          <path d="M50 20c-10 0-15 15-25 15S5 40 5 50s5 15 15 15 15-5 25-15c10 10 15 15 25 15s15-5 15-15-5-15-15-15-15 5-25 15c-10-10-15-15-25-15z" fill="#b91c1c" opacity="0.6"/>
        </g>
        
        <g className={isBreaking ? "seal-engraving-breaking" : ""}>
          {/* Shadow (bottom-right) for engraved effect */}
          <text
              x="51"
              y="58"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#450a0a"
              opacity="0.6"
              fontSize="32"
              fontFamily="'MedievalSharp', cursive"
              style={{ letterSpacing: '0.1em' }}
          >
              nbl
          </text>
          {/* Highlight (top-left) for engraved effect */}
          <text
              x="49"
              y="56"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#fca5a5"
              opacity="0.6"
              fontSize="32"
              fontFamily="'MedievalSharp', cursive"
              style={{ letterSpacing: '0.1em' }}
          >
              nbl
          </text>
        </g>
        
        {isBreaking && (
            <g className="cracks" stroke="#450a0a" strokeWidth="1.5" strokeLinecap="round">
                <path d="M50,50 L 65,35" className="crack-1" />
                <path d="M50,50 L 30,40" className="crack-2" />
                <path d="M50,50 L 55,70" className="crack-3" />
                <path d="M50,50 L 75,60" className="crack-4" />
            </g>
        )}
    </svg>
);


const GrandTribunal: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'deliberating' | 'verdict'>('idle');
    const [verdict, setVerdict] = useState('');
    const [progress, setProgress] = useState(0);

    const verdicts = [
        "The council confirms: I was, in fact, being 'a bit much'.",
        "Verdict: Guilty. Of excessive jesting.",
        "The stars decree: A more thoughtful approach is required.",
        "A formal apology has been deemed... acceptable.",
        "My methods have been found... unorthodox.",
        "The council suggests I try 'being normal' for a change.",
        "It is decreed: My sense of humor is an acquired taste.",
        "The universe whispers: 'Maybe tone it down a bit.'",
        "A sparkling miscalculation on my part.",
        "The council agrees: Poking is not a universal love language.",
        "Destiny pauses... then face-palms.",
        "My charm has been temporarily overruled.",
        "Unanimous decision: I should have known better.",
        "The court finds my shenanigans... shenanigan-y."
    ];

    const startTribunal = () => {
        setStatus('deliberating');
        setProgress(0);
        const trumpet = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_967c134812.mp3');
        trumpet.volume = 0.5;
        trumpet.play().catch(e => console.error("Audio play failed", e));
    };

    const resetTribunal = () => {
        setStatus('idle');
    }

    useEffect(() => {
        if (status === 'deliberating') {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStatus('verdict');
                        setVerdict(verdicts[Math.floor(Math.random() * verdicts.length)]);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 45);
            return () => clearInterval(interval);
        }
    }, [status, verdicts]);

    if (status === 'idle') {
        return (
            <div className="text-center">
                <button
                  onClick={startTribunal}
                  className="royal-button group relative inline-flex items-center justify-center px-8 sm:px-12 py-3 sm:py-4 text-lg text-amber-100 rounded-md shadow-lg"
                  aria-label="Await the Council's Judgment"
                >
                  <CrownIcon className="inline-block w-5 h-5 mr-3 text-amber-300" />
                  AWAIT JUDGMENT
                  <CrownIcon className="inline-block w-5 h-5 ml-3 text-amber-300" />
                </button>
                <p className="text-stone-400 italic text-sm mt-4 font-body">(Let the official record show my contrition.)</p>
            </div>
        );
    }
    
    return (
        <div className="w-full max-w-md mx-auto p-6 bg-stone-900 border-2 border-stone-700 rounded-lg shadow-lg animate-fade-in text-center">
             {status === 'deliberating' && (
                <>
                    <h3 className="font-heading text-lg text-stone-300 animate-reveal" style={{animationDelay: '0s'}}>The Council reflects upon my actions...</h3>
                    <p className="font-body text-stone-400 mt-2 animate-reveal" style={{animationDelay: '1s'}}>A period of solemn introspection is underway.</p>
                    <div className="w-full bg-stone-700 rounded-full h-2.5 mt-6 animate-reveal" style={{animationDelay: '2s'}}>
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
                    </div>
                    <p className="text-amber-400/80 mt-2 text-sm animate-reveal" style={{animationDelay: '2.5s'}}>Measuring Remorsefulness...</p>
                </>
             )}
             {status === 'verdict' && (
                <div className="animate-fade-in">
                    <h3 className="font-heading text-xl text-amber-300">The Judgment is In:</h3>
                    <p className="font-body text-2xl text-white my-4">"{verdict}"</p>
                    <button onClick={resetTribunal} className="px-6 py-2 font-body text-amber-200 bg-transparent border border-amber-400/50 rounded hover:bg-amber-400/10 hover:border-amber-400 transition-colors">
                        Reflect Anew
                    </button>
                </div>
             )}
        </div>
    );
}

const App: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [isSealBreaking, setIsSealBreaking] = useState(false);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  const handleUnseal = () => {
    if (isSealBreaking) return;
    setIsSealBreaking(true);

    setTimeout(() => {
        setIsUnsealed(true);
    }, 800); // Corresponds to seal break animation duration
  };

  useEffect(() => {
    if (!isUnsealed) return;

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    const targets = document.querySelectorAll('.scroll-fade-in');
    targets.forEach(target => observer.observe(target));

    return () => {
        window.removeEventListener('scroll', handleScroll);
        targets.forEach(target => observer.unobserve(target));
    };
}, [isUnsealed]);

  return (
    <>
      <div className={`min-h-screen w-full bg-stone-900 text-stone-300 flex flex-col items-center justify-start p-4 sm:p-8 overflow-x-hidden ${isUnsealed ? 'py-16 sm:py-24' : ''}`}>
        <div
          className="fixed inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23999' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translateY(${offsetY * 0.3}px)`
          }}
        ></div>
        <div
          className="fixed inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900 z-10"
        ></div>
          
        {!isUnsealed && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-900/80 backdrop-blur-sm animate-fade-in">
                <div className="text-center text-stone-300 p-8 flex flex-col items-center">
                    <h1 className="font-heading text-2xl sm:text-4xl text-amber-100 mb-4" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>An Apology of Utmost Importance</h1>
                    <p className="mt-1 mb-8 text-stone-400 font-body">Sealed with Sincere Regret</p>

                    <div 
                        className="relative cursor-pointer group"
                        onClick={handleUnseal}
                        aria-label="Unfurl the Decree"
                    >
                        <div className="w-20 h-56 sm:w-24 sm:h-64 bg-gradient-to-r from-[#d3c4a8] via-[#fdfaef] to-[#d3c4a8] rounded-lg shadow-[5px_5px_15px_rgba(0,0,0,0.5),_inset_8px_0_10px_-5px_rgba(0,0,0,0.25),_inset_-8px_0_10px_-5px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <WaxSealIcon className="animate-pulse-shimmer" isBreaking={isSealBreaking} />
                        </div>
                    </div>
                    
                    <p className="mt-8 font-body text-lg tracking-wider text-amber-200/80">Click the Seal to Unfurl</p>
                </div>
            </div>
        )}
        
        {isUnsealed && (
            <div className="w-full flex flex-col items-center">
                <header className="relative z-20 w-full max-w-4xl text-center flex flex-col items-center mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
                    <div style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
                      <CrownIcon className="w-12 h-12 text-amber-400/90 mb-2 drop-shadow-[0_2px_4px_rgba(251,191,36,0.5)]"/>
                    </div>
                     <h1 className="font-heading text-3xl sm:text-5xl font-bold text-amber-100" style={{
                       textShadow: '2px 2px 5px rgba(0,0,0,0.5)',
                       transform: `translateY(${offsetY * 0.15}px)`
                       }}>
                        An Apology of Utmost Importance
                      </h1>
                      <div className="flex items-center justify-center" style={{ transform: `translateY(${offsetY * 0.12}px)` }}>
                         <p className="text-stone-400 italic mt-2 text-sm sm:text-lg">Anno Domini, This Year of Grace</p>
                      </div>
                </header>

                <div className="relative z-20 w-full max-w-3xl scroll-container animate-unfurl">
                    <div className="scroll-ends top"></div>
                    <main className="parchment text-[#3a2f2f] p-8 sm:p-16">
                        <div className="text-base sm:text-lg lg:text-xl leading-relaxed text-left max-w-prose space-y-6 sm:space-y-8 mx-auto">
                          <p className="text-center text-stone-600 scroll-fade-in" style={{transitionDelay: '50ms'}}>To the Esteemed Maleeha:</p>
                          
                          <p className="scroll-fade-in" style={{transitionDelay: '100ms'}}>
                              <span className="font-body text-5xl sm:text-6xl float-left mr-3 mt-1 text-[#991b1b]">I</span>t has come to my attention—through a period of profound and deeply humbling introspection—that my recent conduct may have been perceived as... less than ideal.
                          </p>
                          <p className="scroll-fade-in" style={{transitionDelay: '200ms'}}>
                            Indeed, it appears my particular brand of jesting, which I typically dispense with magnanimous flair, may not be universally appreciated. The very notion that my attempts at humor—my <span className="text-[#991b1b] font-semibold">relentless poking</span>, if you will—could cause anything other than pure delight has shaken the very foundations of my gilded worldview.
                          </p>
                          <p className="scroll-fade-in" style={{transitionDelay: '300ms'}}>
                            I now understand that not everyone wishes to be the subject of such... pointed amusement. This realization has been a trial, I assure you. A heart as grand as mine does not easily concede error.
                          </p>
                          <blockquote className="border-l-0 text-center italic text-stone-700/90 my-8 scroll-fade-in font-body" style={{transitionDelay: '400ms'}}>
                              “Even the sun must admit when its rays have been a trifle too harsh.”
                          </blockquote>
                          <p className="scroll-fade-in" style={{transitionDelay: '500ms'}}>
                           Therefore, let this decree serve as a formal record of my sentiment. I was wrong. The poking was, perhaps, excessive. My wit, though undeniably dazzling, was misapplied.
                          </p>
                           <p className="scroll-fade-in" style={{transitionDelay: '600ms'}}>
                            For this, I am truly sorry. My intellect, usually unrivalled, failed to account for this variable. My excellence, a guiding light to lesser beings, momentarily flickered. It is a burden I shall carry with grace and dignity.
                          </p>

                          <div className="bg-red-900/5 border-l-4 border-[#991b1b] p-6 my-8 scroll-fade-in" style={{transitionDelay: '700ms'}}>
                              <h3 className="font-heading text-xl text-center text-stone-800/90 mb-4">Therefore, I Hereby Proclaim:</h3>
                              <p>
                                That I formally apologize to you, Maleeha. I shall endeavor to restrain my more... pokey instincts in future interactions, and consult the Grand Council of My Own Conscience before engaging in such antics again.
                              </p>
                          </div>

                          <p className="scroll-fade-in" style={{transitionDelay: '800ms'}}>
                            I shall await your judgment on this apology with bated breath. The fate of my considerable, yet momentarily humbled, ego rests in your hands.
                          </p>
                          <div className="text-center scroll-fade-in pt-4" style={{transitionDelay: '900ms'}}>
                              <p>With overflowing regret and staggering humility,</p>
                              <p className="font-body text-2xl tracking-widest mt-4">THE ONE AND ONLY</p>
                              <p className="text-stone-600/80 italic text-sm">(Who is capable of admitting when he is wrong, on very rare occasions.)</p>
                          </div>

                          <div className="text-right mt-12 scroll-fade-in" style={{transitionDelay: '1000ms'}}>
                              <p className="font-script text-3xl text-stone-700/90 tracking-wider">by nbl</p>
                          </div>

                        </div>
                    </main>
                    <div className="scroll-ends bottom"></div>
                </div>

                <footer className="relative z-20 w-full max-w-3xl text-center mt-12 space-y-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                    <div className="border border-amber-800/30 bg-stone-800/20 p-6 italic text-stone-300 text-lg rounded">
                        “Let the record show that on this day, humility was demonstrated. It was exhausting, but necessary.”
                    </div>

                    <GrandTribunal />
                    
                    <div>
                        <FlourishDivider className="w-24 h-8 mx-auto text-stone-500/60" />
                        <p className="mt-2 text-base text-stone-500">
                          Composed with unparalleled regret and delivered with supreme sincerity.
                        </p>
                    </div>
                </footer>
            </div>
        )}
      </div>

      <style>{`
        body { background-color: #1c1917; } /* bg-stone-900 */
       
        .scroll-container {
          position: relative;
          padding: 30px 0;
          margin-top: -1rem; /* Adjust positioning */
        }

        .scroll-ends {
          position: absolute;
          left: 0; /* Contained on mobile */
          right: 0;
          height: 40px;
          background: linear-gradient(to right, #6b4f3a, #a58162, #6b4f3a);
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.4), inset 0 2px 5px rgba(0,0,0,0.3);
          z-index: 10;
        }

        @media (min-width: 640px) { /* sm breakpoint */
          .scroll-ends {
            left: -25px; /* Wider on larger screens */
            right: -25px;
          }
        }

        .scroll-ends.top { top: 0; }
        .scroll-ends.bottom { bottom: 0; }

        .parchment {
          background-color: #fdfaef;
          background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"%3E%3Cfilter id="b" x="0" y="0"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="5" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23b)" opacity="0.05"/%3E%3C/svg%3E');
          position: relative;
          box-shadow: 0 5px 25px rgba(0,0,0,0.5);
          opacity: 0;
          animation: fade-in-content 0.8s ease-out 1s forwards;
        }
       
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
        
        @keyframes fade-in-content {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-reveal {
          opacity: 0;
          animation: reveal 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        /* --- WAX SEAL ANIMATIONS --- */

        @keyframes pulse-shimmer {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
          }
          50% {
            transform: scale(1.03);
            filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1)) drop-shadow(0 0 15px rgba(253, 224, 71, 0.8));
          }
        }
        .animate-pulse-shimmer {
          animation: pulse-shimmer 3s infinite ease-in-out;
        }

        .cracks path {
            opacity: 0;
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
        }
        .cracks .crack-1 { animation: crack-draw 0.3s ease-out 0.1s forwards; }
        .cracks .crack-2 { animation: crack-draw 0.2s ease-out 0.2s forwards; }
        .cracks .crack-3 { animation: crack-draw 0.3s ease-out 0.25s forwards; }
        .cracks .crack-4 { animation: crack-draw 0.2s ease-out 0.3s forwards; }

        @keyframes crack-draw {
            to {
                opacity: 0.8;
                stroke-dashoffset: 0;
            }
        }

        .seal-body-breaking, .seal-engraving-breaking {
            animation: seal-shatter 0.5s ease-in-out 0.3s forwards;
        }

        @keyframes seal-shatter {
            0% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0); }
            100% { transform: scale(0.9) rotate(10deg); opacity: 0; filter: blur(8px); }
        }

        @keyframes unfurl {
          from {
            transform-origin: top;
            transform: scaleY(0);
            opacity: 0;
          }
          to {
            transform-origin: top;
            transform: scaleY(1);
            opacity: 1;
          }
        }
        .animate-unfurl {
          animation: unfurl 1.2s cubic-bezier(0.86, 0, 0.07, 1) forwards;
        }
        
        .scroll-fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .scroll-fade-in.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        .shadow-red-glow {
          box-shadow: 0 0 15px rgba(220, 38, 38, 0.5), 0 0 30px rgba(220, 38, 38, 0.3);
        }
        .shadow-yellow-glow {
          box-shadow: 0 0 15px rgba(253, 224, 71, 0.5), 0 0 30px rgba(253, 224, 71, 0.3);
        }

      `}</style>
    </>
  );
};

export default App;