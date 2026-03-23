import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '@/src/components/ui/Badge';

describe('Badge', () => {
  it('renders the label text', () => {
    render(<Badge label="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Badge label="React" />);
    const badge = screen.getByText('React');
    expect(badge).toHaveClass('bg-surface');
  });

  it('applies outline variant classes', () => {
    render(<Badge label="Node" variant="outline" />);
    const badge = screen.getByText('Node');
    expect(badge).toHaveClass('bg-transparent');
  });

  it('does not apply bg-surface class for outline variant', () => {
    render(<Badge label="Vue" variant="outline" />);
    const badge = screen.getByText('Vue');
    expect(badge).not.toHaveClass('bg-surface');
  });

  it('accepts and applies additional className', () => {
    render(<Badge label="Extra" className="custom-class" />);
    const badge = screen.getByText('Extra');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders as a span element', () => {
    render(<Badge label="Tag" />);
    const badge = screen.getByText('Tag');
    expect(badge.tagName).toBe('SPAN');
  });
});
