import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { SvglIcon } from '../types';
import { fetchSvgContent } from '../services/svgService';

interface IconDetailModalProps {
  icon: SvglIcon | null;
  onClose: () => void;
}

// Helper to sanitize SVG content
const sanitizeSvg = (svgString: string): string => {
  if (!svgString) return '';
  return svgString
    .replace(/<\?xml[^>]*\?>/i, '')
    .replace(/<!DOCTYPE[^>]*>/i, '')
    .replace(/<!--.*?-->/gs, '')
    .trim();
};

const toCamelCase = (str: string): string => {
  return str.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
};

const convertSvgToJsx = (svgString: string): string => {
  if (!svgString) return '';
  let jsxString = svgString
    .replace(/<svg/g, '<svg {...props}')
    .replace(/class="/g, 'className="');

  jsxString = jsxString.replace(/ ([a-zA-Z0-9:_-]+)="([^"]*)"/g, (match, attrName, attrValue) => {
    if (attrName.includes('-') || attrName.includes('_') || attrName.includes(':')) {
      const camelCased = toCamelCase(attrName);
      return ` ${camelCased}="${attrValue}"`;
    }
    return match;
  });

  return jsxString;
};

const CodeBlock: React.FC<{ code: string, language: string }> = ({ code, language }) => {
  const [copyText, setCopyText] = useState('Copy');

  const handleCopy = useCallback(() => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy'), 2000);
    });
  }, [code]);

  return (
    <div className="relative mt-2">
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-md transition-all ${copyText === 'Copied!'
            ? 'bg-green-600 text-white'
            : 'bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200'
          }`}
        disabled={!code}
      >
        {copyText}
      </button>
      <pre className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm min-h-[8rem] flex items-center text-zinc-800 dark:text-zinc-200">
        {code ? <code className={`language-${language}`}>{code}</code> : <div className="w-full h-8 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>}
      </pre>
    </div>
  );
};

const IconDetailModal: React.FC<IconDetailModalProps> = ({ icon, onClose }) => {
  const [originalSvgContent, setOriginalSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (icon) {
      const getSvg = async () => {
        setIsLoading(true);
        setError(null);
        setOriginalSvgContent(null);
        try {
          const content = await fetchSvgContent(icon.route);
          setOriginalSvgContent(sanitizeSvg(content));
        } catch (err) {
          setError('Failed to load SVG content.');
        } finally {
          setIsLoading(false);
        }
      };
      getSvg();
    }
  }, [icon]);

  const jsxCode = useMemo(() => convertSvgToJsx(originalSvgContent || ''), [originalSvgContent]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  if (!icon) return null;

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true">
      <div className={`fixed inset-0 bg-black/60 ${isClosing ? 'animate-backdrop-fade-out' : 'animate-backdrop-fade-in'}`} onClick={handleClose} aria-hidden="true"></div>

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-dark-accent shadow-2xl z-50 flex flex-col ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
        <div className="flex-shrink-0 flex justify-between items-center p-4 border-b border-zinc-200 dark:border-dark-border">
          <div className='flex-grow min-w-0'>
            <h2 className="text-xl font-bold truncate text-zinc-900 dark:text-white" title={icon.name}>{icon.name}</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{icon.category}</p>
          </div>
          <button onClick={handleClose} className="p-2 ml-4 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors" aria-label="Close panel">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex-grow p-6 overflow-y-auto space-y-8">
          <div className="flex items-center justify-center p-6 bg-zinc-100 dark:bg-dark rounded-lg min-h-[200px]">
            {isLoading ? <div className="w-24 h-24 animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded-md"></div> :
              error ? <p className="text-red-500">{error}</p> :
                <div className="w-32 h-32 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: originalSvgContent }} />
            }
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">SVG</h3>
              <CodeBlock code={originalSvgContent || ''} language="svg" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">JSX</h3>
              <CodeBlock code={jsxCode} language="jsx" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconDetailModal;