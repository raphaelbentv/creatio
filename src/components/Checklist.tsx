import { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  checked?: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
  onToggle?: (id: string) => void;
}

export const Checklist = ({
  items: initialItems,
  onToggle,
}: ChecklistProps) => {
  const [items, setItems] = useState(initialItems);

  const handleToggle = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    onToggle?.(id);
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map(item => (
        <div
          key={item.id}
          className={`
            flex items-center gap-3 p-3.5 bg-surface-soft rounded-xl transition-all duration-300
            border border-line cursor-pointer
            hover:bg-brand-soft hover:border-brand
            ${item.checked ? 'checked' : ''}
          `}
          onClick={() => handleToggle(item.id)}
        >
          <div
            className={`
              w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0
              ${item.checked ? 'bg-brand text-on-brand border-brand' : 'border-line-strong'}
            `}
          >
            {item.checked && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-[color:var(--on-brand)] stroke-[3]"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <div
            className={`
              flex-1 text-ink text-sm font-medium transition-all duration-300
              ${item.checked ? 'opacity-50 line-through' : ''}
            `}
          >
            {item.text}
          </div>
        </div>
      ))}
    </div>
  );
};
