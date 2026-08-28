import { useState } from 'react';

interface FaqProps {
  items: { question: string; answer: string }[];
  idPrefix?: string;
}

export const Faq = ({ items, idPrefix = 'faq' }: FaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="surface divide-y divide-line overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-surface-soft transition-colors"
              >
                <span className="t-label">{item.question}</span>
                <svg
                  className={`w-4 h-4 shrink-0 text-brand-ink transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-6 pb-5 -mt-1"
              >
                <p className="t-meta max-w-[70ch]">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
