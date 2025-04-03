
import React from 'react';
import { Bot } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ChatMessage } from '@/types';

interface AssistantMessageProps {
  message: ChatMessage;
}

const AssistantMessage = ({ message }: AssistantMessageProps) => {
  return (
    <div className="flex gap-3 items-start w-full">
      <Avatar className="w-8 h-8 mt-1 bg-neutral-200 dark:bg-neutral-700 text-foreground flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4" />
      </Avatar>
      
      <div className="chat-message-assistant prose prose-sm dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => (
              <p className="text-sm whitespace-pre-wrap mb-4 leading-relaxed" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-blue-500 dark:text-blue-400 hover:underline" {...props} target="_blank" rel="noopener noreferrer" />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="my-1" {...props} />
            ),
            h1: ({ node, ...props }) => (
              <h1 className="text-xl font-bold my-6 pb-2 border-b border-border/50" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-lg font-bold my-5 pb-1 border-b border-border/30" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-base font-bold my-4" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className="text-sm font-bold my-3" {...props} />
            ),
            code: ({ node, className, children, ...props }: any) => {
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !className;
              return isInline ? (
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                  {children}
                </code>
              ) : (
                <code className="block bg-muted p-3 my-4 rounded-md overflow-x-auto text-xs font-mono" {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ node, ...props }) => (
              <pre className="bg-muted p-3 my-4 rounded-md overflow-x-auto text-xs font-mono" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-blue-300 dark:border-blue-600 pl-4 py-1 my-4 italic text-muted-foreground" {...props} />
            ),
            hr: ({ node, ...props }) => (
              <hr className="my-6 border-border/50" {...props} />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full border-collapse text-sm" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="bg-muted/50" {...props} />
            ),
            tbody: ({ node, ...props }) => (
              <tbody className="divide-y divide-border/30" {...props} />
            ),
            tr: ({ node, ...props }) => (
              <tr className="border-b border-border/20" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th className="px-3 py-2 text-left font-medium" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="px-3 py-2" {...props} />
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AssistantMessage;
