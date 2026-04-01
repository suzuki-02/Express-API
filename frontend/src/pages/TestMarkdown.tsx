import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const initialMarkdown = `# Hello DevPress

This is **bold**, this is *italic*, and this is ~~strikethrough~~.

## Todo
- [x] Build article CRUD
- [ ] Add markdown preview
- [ ] Polish detail page

## Code
\`\`\`ts
const title = "My first article";
console.log(title);
\`\`\`

## Table
| Feature | Status |
|---|---|
| Markdown | In Progress |
| Likes | Planned |
`;

const TestMarkdown = () => {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Markdown Preview Test</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Test markdown input and live preview before integrating it into the article form.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <label
            htmlFor="markdown"
            className="mb-3 block text-sm font-medium"
          >
            Markdown Input
          </label>

          <textarea
            id="markdown"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your article in markdown..."
            className="min-h-[420px] w-full resize-none rounded-lg border bg-background p-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="mb-3 text-sm font-medium">Preview</p>

          <div className="prose prose-sm max-w-none dark:prose-invert min-h-[420px] rounded-lg border bg-background p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestMarkdown;