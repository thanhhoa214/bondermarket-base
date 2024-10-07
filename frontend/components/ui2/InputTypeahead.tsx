'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef, useState } from 'react';

export default function InputTypeahead({
  onEnter,
  input,
  setInput,
  options,
}: {
  options: string[];
  onEnter: VoidFunction;
  input: string;
  setInput: (input: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [willShowSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const isDecided = options.includes(input);

  useEffect(() => {
    const filteredSuggestions = options.filter((fruit) => fruit.toLowerCase().includes(input.toLowerCase()));
    setSuggestions(filteredSuggestions);
    if (!isDecided) setShowSuggestions(input.length > 0 && filteredSuggestions.length > 0);
  }, [options, input, isDecided]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && willShowSuggestions) {
      e.preventDefault();
      suggestionsRef.current?.firstElementChild?.setAttribute('tabindex', '0');
      (suggestionsRef.current?.firstElementChild as HTMLElement)?.focus();
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.focus();
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter();
    }
  };
  return (
    <div className="relative">
      <Textarea
        ref={inputRef}
        id="question-input"
        name="question"
        placeholder="Will [an event happen] by [a date]?"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-expanded={willShowSuggestions}
        className="h-36 lg:h-auto min-h-6 resize-none overflow-hidden text-center"
      />
      {willShowSuggestions && (
        <div className="absolute z-50">
          <ScrollArea className="w-full max-h-[200px] mt-1 bg-background border rounded-md shadow-md text-left">
            <ul id="suggestions-list" ref={suggestionsRef} role="listbox" className="text-sm">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  role="option"
                  aria-selected={false}
                  tabIndex={-1}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSuggestionClick(suggestion);
                      setShowSuggestions(false);
                    }
                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextSibling) nextSibling.focus();
                    }
                    if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      const prevSibling = e.currentTarget.previousElementSibling as HTMLElement;
                      if (prevSibling) prevSibling.focus();
                      else inputRef.current?.focus();
                    }
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-accent focus:bg-accent focus:outline-none"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
