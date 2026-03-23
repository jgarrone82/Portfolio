interface BadgeProps {
  label: string;
  variant?: 'default' | 'outline';
  className?: string;
}

export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  const base =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors';

  const variants = {
    default:
      'bg-surface text-text-secondary border border-border hover:border-accent hover:text-accent',
    outline:
      'bg-transparent text-text-secondary border border-border hover:border-accent hover:text-accent',
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {label}
    </span>
  );
}
