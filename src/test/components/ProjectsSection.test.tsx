import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LiveProjectCard } from '@/src/components/sections/ProjectsSection';
import type { Project } from '@/src/types';

// next/image is not available in jsdom — render a plain <img> instead.
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const baseProject: Project = {
  id: 'test',
  title: 'Test Project',
  description: 'A test project.',
  techStack: ['Next.js'],
  githubUrl: 'https://github.com/test/test',
  status: 'live',
  imageUrl: '/images/projects/test.png',
};

describe('LiveProjectCard', () => {
  it('renders a Live Demo link pointing to liveUrl when present', () => {
    render(
      <LiveProjectCard
        project={{ ...baseProject, liveUrl: 'https://demo.example.com' }}
      />,
    );
    const link = screen.getByRole('link', { name: /live demo/i });
    expect(link).toHaveAttribute('href', 'https://demo.example.com');
  });

  it('does not render a Live Demo link when liveUrl is absent', () => {
    render(<LiveProjectCard project={baseProject} />);
    expect(
      screen.queryByRole('link', { name: /live demo/i }),
    ).not.toBeInTheDocument();
  });

  it('renders the GitHub link', () => {
    render(<LiveProjectCard project={baseProject} />);
    expect(
      screen.getByRole('link', { name: /view on github/i }),
    ).toBeInTheDocument();
  });
});
