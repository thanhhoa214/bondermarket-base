'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion'; // Add this import
import { useRef, useState } from 'react';
import { generatePrediction, GeneratePredictionResponse } from '../../app/actions/ai/generatePredition';
import { Button } from '../ui/button';
import InputTypeahead from './InputTypeahead';
import LoaderIcon from './LoaderIcon';

const options = [
  'Will a major global recession begin by the end of 2024?',
  'Will a peace treaty be signed between Russia and Ukraine by July 2025?',
  'Will a new global pandemic be declared by the WHO by 2026?',
  'Will renewable energy surpass fossil fuels in global energy consumption by 2030?',
  'Will artificial intelligence surpass human intelligence in specific tasks by 2028?',
  'Will global temperatures rise by more than 2°C compared to pre-industrial levels by 2035?',
  'Will space tourism become commercially viable by 2027?',
  'Will a global ban on single-use plastics be implemented by 2025?',
  'Will a major breakthrough in cancer treatment be achieved by 2030?',
  'Will the world population exceed 9 billion people by 2040?',
];

export default function AiForm({ className }: { className?: string }) {
  const [output, setOutput] = useState<GeneratePredictionResponse['outcome']>();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generate();
  };

  const generate = async () => {
    if (!formRef.current) return;
    const question = formRef.current['question'].value;
    setLoading(true);
    setOutput(undefined);
    const outcome = await generatePrediction({ question });
    if (outcome) setOutput(outcome);
    else setOutput(undefined);
    setLoading(false);
  };

  const randomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    setInput(options[randomIndex]);
  };

  return (
    <div className={cn('bg-primary/5 border border-primary/40 p-4 rounded-lg shadow-2xl', className)}>
      <h2 className="text-2xl font-semibold">Can we beat Polymarket?</h2>

      <form ref={formRef} className="text-center" onSubmit={handleSubmit}>
        <label htmlFor="question-input" className="block mb-2 mt-2 text-sm text-muted-foreground">
          Ask a question or randomize one
        </label>
        <InputTypeahead options={options} onEnter={generate} input={input} setInput={setInput} />

        <footer className="flex justify-center gap-2 mt-4">
          <Button
            type="button"
            variant={'outline'}
            className="min-w-40 border-white"
            onClick={randomQuestion}
            disabled={loading}
          >
            Randomize
          </Button>

          <Button
            type="submit"
            className="min-w-40 bg-gradient-to-r from-indigo-700 to-purple-700 transition-colors hover:from-indigo-800 hover:to-purple-800"
          >
            {loading ? <LoaderIcon /> : 'Submit'}
          </Button>
        </footer>
      </form>

      <AnimatePresence>
        {output ? (
          <motion.div
            className="mt-8 text-center text-muted-foreground"
            initial={{ height: 0, opacity: 0 }} // Initial state
            animate={{ height: 'auto', opacity: 1 }} // Animate to full height and opacity
            exit={{ height: 0, opacity: 0 }} // Animate back to initial state
            transition={{ duration: 0.3 }} // Duration of the animation
          >
            <strong className="text-4xl font-bold text-primary">{output.likelihood}%</strong>
            <p>Likelihood</p>

            <p className="mt-4">{output.explanation}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
