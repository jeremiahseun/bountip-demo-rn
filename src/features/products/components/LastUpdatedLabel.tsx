import { AppText } from '@/components/ui/AppText';

type LastUpdatedLabelProps = {
  value: string | null;
};

export function LastUpdatedLabel({ value }: LastUpdatedLabelProps) {
  if (!value) {
    return null;
  }

  const formatted = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));

  return (
    <AppText color="muted" variant="label">
      Updated {formatted}
    </AppText>
  );
}
