import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  description?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write your content in markdown...',
  error,
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const hasError = Boolean(error);

  return (
    <div>
      <div className="flex items-center justify-between gap-3 ml-5 mb-1">
        <div className="flex items-center rounded-md">
          <Button
            type="button"
            size="sm"
            variant={mode === 'edit' ? 'default' : 'ghost'}
            onClick={() => setMode('edit')}
          >
            Edit
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === 'preview' ? 'default' : 'ghost'}
            onClick={() => setMode('preview')}
          >
            Preview
          </Button>
        </div>
      </div>

      {mode === 'edit' ? (
        <Textarea
          id="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={hasError}
          className={cn(
            'min-h-[320px] w-full resize-y rounded-[22px] border-2 border-black px-4 py-5 !text-[18px] focus:!outline-none focus:!ring-2 focus:!ring-primary focus:!border-transparent',
            hasError && 'border-destructive focus:border-destructive',
          )}
        />
      ) : (
        <div
          className={cn(
            'min-h-[320px] rounded-[22px] border-2 bg-background px-4 py-5 text-[18px]',
            hasError ? 'border-destructive' : 'border-black',
          )}
        >
          <div className="prose max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {value || 'Nothing to preview yet.'}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
