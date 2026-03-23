import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionTitle } from '@/src/components/ui/SectionTitle';

describe('SectionTitle', () => {
  it('renders the title text', () => {
    render(<SectionTitle title="About Me" />);
    expect(screen.getByRole('heading', { name: 'About Me' })).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<SectionTitle title="Skills" subtitle="Technologies I work with" />);
    expect(screen.getByText('Technologies I work with')).toBeInTheDocument();
  });

  it('does not render a subtitle element when subtitle is not provided', () => {
    render(<SectionTitle title="Projects" />);
    // No <p> should be present
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('applies text-center class when align is center', () => {
    const { container } = render(
      <SectionTitle title="Centered" align="center" />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('text-center');
  });

  it('applies text-left class by default', () => {
    const { container } = render(<SectionTitle title="Left" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('text-left');
  });

  it('applies mx-auto to subtitle when align is center', () => {
    render(
      <SectionTitle title="Centered" subtitle="Some subtitle" align="center" />,
    );
    const subtitle = screen.getByText('Some subtitle');
    expect(subtitle).toHaveClass('mx-auto');
  });
});
