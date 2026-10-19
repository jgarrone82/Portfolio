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

  it('renders a Website link pointing to websiteUrl when present', () => {
    render(
      <LiveProjectCard
        project={{ ...baseProject, websiteUrl: 'https://site.example.com' }}
      />,
    );
    const link = screen.getByRole('link', { name: /website/i });
    expect(link).toHaveAttribute('href', 'https://site.example.com');
  });

  it('renders a Google Play link pointing to storeUrl when present', () => {
    render(
      <LiveProjectCard
        project={{ ...baseProject, storeUrl: 'https://play.google.com/store/apps/details?id=com.example' }}
      />,
    );
    const link = screen.getByRole('link', { name: /google play/i });
    expect(link).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.example',
    );
  });

  it('renders Website and Google Play links without a GitHub link when githubUrl is absent', () => {
    render(
      <LiveProjectCard
        project={{
          ...baseProject,
          githubUrl: undefined,
          websiteUrl: 'https://site.example.com',
          storeUrl: 'https://play.google.com/store/apps/details?id=com.example',
        }}
      />,
    );
    expect(screen.getByRole('link', { name: /website/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /google play/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /view on github/i }),
    ).not.toBeInTheDocument();
  });

  it('renders no action links when the project has no URLs', () => {
    render(<LiveProjectCard project={{ ...baseProject, githubUrl: undefined }} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});
