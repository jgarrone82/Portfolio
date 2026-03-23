import Image from 'next/image';
import { Lock, Github } from 'lucide-react';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { SectionTitle } from '@/src/components/ui/SectionTitle';
import { projects } from '@/src/data/projects';
import type { Project } from '@/src/types';

function LiveProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-colors flex flex-col">
      {/* Project image */}
      <div className="relative w-full h-44 bg-background">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-text-secondary text-sm">No preview</span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base font-semibold text-text-primary mb-2">{project.title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <Badge key={tech} label={tech} variant="outline" />
            ))}
          </div>
        )}

        {/* GitHub button */}
        {project.githubUrl && (
          <Button
            variant="ghost"
            size="sm"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start"
          >
            <Github className="size-4" />
            View on GitHub
          </Button>
        )}
      </div>
    </div>
  );
}

function ComingSoonCard({ project }: { project: Project }) {
  return (
    <div className="bg-surface border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center min-h-[280px] text-center opacity-60 hover:opacity-80 transition-opacity">
      <Lock className="size-8 text-text-secondary mb-4" />
      <h3 className="text-base font-semibold text-text-primary mb-2">{project.title}</h3>
      <p className="text-sm text-text-secondary">{project.description}</p>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <div className="bg-surface border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <SectionTitle
          title="Selected Projects"
          subtitle="A selection of my best work. Feel free to explore the code behind them."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) =>
            project.status === 'live' ? (
              <LiveProjectCard key={project.id} project={project} />
            ) : (
              <ComingSoonCard key={project.id} project={project} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
