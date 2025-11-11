import React, { useState, useEffect, useCallback } from 'react';
import { calculateStrength, generatePassword, RuleCheckResult } from '../utils/SecurityMath';

type ActiveTool = 'checker' | 'generator';

interface Strength {
  score: number;
  feedback: string;
  timeToCrack: string;
  color: string;
  width: string;
}

const Checkbox: React.FC<{ label: string, checked: boolean, onChange: () => void }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <div className="relative">
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
            <div className="w-5 h-5 bg-gray-700 rounded border border-gray-600 peer-checked:bg-fuchsia-500 peer-checked:border-fuchsia-500 transition-colors group-hover:border-fuchsia-500"></div>
            <svg className="absolute w-3 h-3 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </div>
        <span className="text-gray-300 group-hover:text-white transition-colors">{label}</span>
    </label>
);

const PasswordTool: React.FC = () => {
    const [activeTool, setActiveTool] = useState<ActiveTool>('checker');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState<Strength | null>(null);
    const [ruleChecks, setRuleChecks] = useState<RuleCheckResult | null>(null);
    
    // Generator state
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        if (activeTool === 'checker') {
            const { strength, rules } = calculateStrength(password);
            
            let color = 'bg-gray-600';
            let width = 'w-0';

            if (password.length > 0) {
                if (strength.score < 50) { color = 'bg-red-500'; width = 'w-1/4'; }
                else if (strength.score < 75) { color = 'bg-yellow-500'; width = 'w-1/2'; }
                else if (strength.score < 90) { color = 'bg-sky-500'; width = 'w-3/4'; }
                else { color = 'bg-green-500'; width = 'w-full'; }
            }

            setStrength({ ...strength, color, width });
            setRuleChecks(rules);
        }
    }, [password, activeTool]);
    
    const handleGenerate = useCallback(() => {
        const options = { length, upper: includeUppercase, lower: includeLowercase, numbers: includeNumbers, symbols: includeSymbols };
        if (!options.upper && !options.lower && !options.numbers && !options.symbols) {
            setGeneratedPassword('Select at least one character type');
            return;
        }
        setGeneratedPassword(generatePassword(options));
        setCopySuccess(false);
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    useEffect(() => {
        if(activeTool === 'generator') {
            handleGenerate();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTool, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    const handleCopy = () => {
        if (generatedPassword && generatedPassword !== 'Select at least one character type') {
            navigator.clipboard.writeText(generatedPassword).then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            });
        }
    };
    
    const RuleItem: React.FC<{ label: string; valid: boolean }> = ({ label, valid }) => (
        <li className={`flex items-center transition-colors duration-300 ${valid ? 'text-green-400' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`mr-2 h-4 w-4 ${valid ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {valid ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />}
            </svg>
            {label}
        </li>
    );

    return (
        <div className="w-full max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-white/10">
                <button onClick={() => setActiveTool('checker')} className={`flex-1 p-4 text-center font-bold transition-all duration-300 ${activeTool === 'checker' ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400' : 'hover:bg-gray-800/50 text-gray-400'}`}>
                    Strength Checker
                </button>
                <button onClick={() => setActiveTool('generator')} className={`flex-1 p-4 text-center font-bold transition-all duration-300 ${activeTool === 'generator' ? 'bg-fuchsia-500/20 text-fuchsia-400 border-b-2 border-fuchsia-500' : 'hover:bg-gray-800/50 text-gray-400'}`}>
                    Password Generator
                </button>
            </div>

            {activeTool === 'checker' ? (
                <div className="p-6 md:p-8 space-y-6">
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Type your password here"
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-md p-3 pr-20 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-lg"
                            aria-label="Password input"
                        />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 text-gray-400 hover:text-white font-semibold">
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    
                    {strength && (
                        <div>
                            <div className="bg-gray-700 rounded-full h-2.5 w-full mb-2 overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.width}`}></div>
                            </div>
                            <div className="text-center">
                                <span className="font-bold text-lg">{strength.feedback}</span>
                                <p className="text-sm text-gray-400">Est. time to crack: {strength.timeToCrack}</p>
                            </div>
                        </div>
                    )}
                    
                    {ruleChecks && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm pt-4 border-t border-white/10">
                            <RuleItem label="At least 8 characters" valid={ruleChecks.length} />
                            <RuleItem label="Contains uppercase" valid={ruleChecks.hasUpper} />
                            <RuleItem label="Contains lowercase" valid={ruleChecks.hasLower} />
                            <RuleItem label="Contains a number" valid={ruleChecks.hasNumber} />
                            <RuleItem label="Contains a symbol" valid={ruleChecks.hasSymbol} />
                        </ul>
                    )}
                </div>
            ) : (
                <div className="p-6 md:p-8 space-y-6">
                    <div className="relative bg-gray-800/50 border border-gray-600 rounded-md p-3 flex items-center justify-between min-h-[56px]">
                        <span className="font-mono text-lg truncate pr-4">{generatedPassword}</span>
                        <button onClick={handleCopy} className={`bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-1 px-3 rounded-md text-sm transition-colors ${copySuccess ? 'bg-green-600' : ''}`}>
                            {copySuccess ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label htmlFor="length" className="text-gray-300 font-medium">Password Length</label>
                            <span className="text-lg font-bold text-fuchsia-400">{length}</span>
                        </div>
                        <input
                            id="length"
                            type="range"
                            min="8"
                            max="32"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Checkbox label="Uppercase (A-Z)" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
                        <Checkbox label="Lowercase (a-z)" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />
                        <Checkbox label="Numbers (0-9)" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                        <Checkbox label="Symbols (!@#$)" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                    </div>

                    <button onClick={handleGenerate} className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 rounded-md transition-colors text-lg flex items-center justify-center gap-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 8a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        Generate New
                    </button>
                </div>
            )}
        </div>
    );
};

export default PasswordTool;