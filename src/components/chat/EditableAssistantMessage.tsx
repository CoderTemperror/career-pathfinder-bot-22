
import React, { useState, useRef, useEffect } from 'react';
import { Bot, PencilLine, Trash2, Check, X } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import type { ChatMessage } from '@/types';

interface EditableAssistantMessageProps {
  message: ChatMessage;
  onEdit: (messageId: string, content: string) => void;
  onDelete: (messageId: string) => void;
}

const EditableAssistantMessage = ({ message, onEdit, onDelete }: EditableAssistantMessageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditedContent(message.content);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditedContent(message.content);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() === "") return;
    onEdit(message.id, editedContent);
    setIsEditing(false);
    toast.success("Response updated");
  };

  const handleDelete = () => {
    onDelete(message.id);
    toast.success("Response deleted, generating new response...");
  };
  
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing, editedContent]);

  return (
    <div className="flex gap-3 items-start max-w-[90%] group">
      <Avatar className="w-8 h-8 mt-1 bg-neutral-200 dark:bg-neutral-700 text-foreground flex items-center justify-center">
        <Bot className="w-4 h-4" />
      </Avatar>
      
      {isEditing ? (
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={editedContent}
            onChange={(e) => {
              setEditedContent(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            className="min-h-[100px] text-sm resize-none mb-2"
          />
          <div className="flex justify-end gap-2">
            <Button 
              variant="ghost"
              size="sm"
              onClick={handleCancelEditing}
              className="h-8 px-3 gap-1"
            >
              <X className="h-4 w-4 mr-1" />
              <span>Cancel</span>
            </Button>
            <Button 
              variant="default"
              size="sm"
              onClick={handleSaveEdit}
              className="h-8 px-3 gap-1"
            >
              <Check className="h-4 w-4 mr-1" />
              <span>Save</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden relative w-full">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => (
                <p className="text-sm whitespace-pre-wrap mb-4" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-500 dark:text-blue-400 hover:underline" {...props} target="_blank" rel="noopener noreferrer" />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 my-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5 my-2" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="my-1" {...props} />
              ),
              h1: ({ node, ...props }) => (
                <h1 className="text-lg font-bold my-3" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-md font-bold my-2" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-sm font-bold my-2" {...props} />
              ),
              code: ({ node, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !className;
                return isInline ? (
                  <code className="bg-muted px-1 py-0.5 rounded text-xs" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className="block bg-muted p-2 my-2 rounded overflow-x-auto text-xs" {...props}>
                    {children}
                  </code>
                );
              },
              pre: ({ node, ...props }) => (
                <pre className="bg-muted p-2 my-2 rounded overflow-x-auto text-xs" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-blue-300 dark:border-blue-600 pl-4 my-2 italic text-muted-foreground" {...props} />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 mt-1 mr-1 flex gap-1 bg-background/80 backdrop-blur-sm rounded p-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
              onClick={handleStartEditing}
            >
              <PencilLine className="h-3.5 w-3.5" />
              <span className="sr-only">Edit response</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 rounded-full hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400"
              onClick={handleDelete}
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only">Delete response</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableAssistantMessage;
