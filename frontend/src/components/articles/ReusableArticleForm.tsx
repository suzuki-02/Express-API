import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articleFormSchema, type ArticleFormData } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MarkdownEditor from '@/components/articles/MarkdownEditor';

interface ArticleFormProps {
  defaultValues: ArticleFormData;
  onSubmit: (values: ArticleFormData) => void;
  loading?: boolean;
  mode?: 'create' | 'edit';
  onCancel?: () => void;
}

export default function ReusableArticleForm({
  defaultValues,
  onSubmit,
  loading = false,
  mode = 'edit',
  onCancel,
}: ArticleFormProps) {
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    defaultValues,
  });

  return (
    <>
      <section className="hero_section !min-h-[230px]">
        <h1 className="heading">
          {mode === 'edit' ? 'Update Your Article' : 'Create New Article'}
        </h1>
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="form-container">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <Input className="form-input" type="text" {...field} />
                </FormControl>
                <FormDescription>
                  A short, descriptive headline for your article.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Description</FormLabel>
                <FormControl>
                  <Textarea className="resize-none form-textarea" {...field} />
                </FormControl>
                <FormDescription>
                  A brief summary that appears in previews or article lists.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="form-label">Content</FormLabel>
                <FormControl>
                  <MarkdownEditor
                    label="Content"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Start writing your article here..."
                    error={fieldState.error?.message}
                  />
                </FormControl>
                <FormDescription>
                  Write the main body of your article. Markdown is supported.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Visibility</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select whether the article is public or private.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              type="button"
              onClick={onCancel ?? (() => history.back())}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {mode === 'edit' ? 'Update' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
