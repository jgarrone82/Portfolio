import Image from 'next/image';
import { Button } from '@/src/components/ui/Button';
import { timelineEntries } from '@/src/data/timeline';

const BIO =
  'Highly accomplished Senior Software Developer and Leader with over 15 years of extensive experience across the full software development lifecycle. Proven expertise in designing, building, and deploying robust desktop, web, and RESTful applications using technologies such as .NET, Java, and modern front-end frameworks. Experienced in leading and mentoring high-performing development teams, optimizing processes, and driving projects using Agile methodologies like SCRUM. Adept at leveraging cloud platforms and various database systems. Possessing a strong blend of technical depth, strategic thinking, and effective communication to deliver innovative and efficient software solutions.';

export function AboutSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      {/* Top: photo + heading */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-accent mb-6">
          <Image
            src="/images/profile.jpg"
            alt="Jorge Ariel Garrone"
            fill
            className="object-cover object-top"
            sizes="112px"
          />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
          Crafting Digital Experiences
        </h2>
      </div>

      {/* Bio paragraph */}
      <p className="text-text-secondary leading-relaxed max-w-3xl mx-auto text-center mb-16 text-base sm:text-lg">
        {BIO}
      </p>

      {/* Timeline */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-text-primary mb-8 text-center">
          My Professional Journey
        </h3>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

          <ol className="space-y-8">
            {timelineEntries.map((entry, index) => (
              <li key={`${entry.year}-${index}`} className="relative pl-12">
                {/* Year badge */}
                <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-xs font-bold z-10">
                  <span className="sr-only">Year: </span>
                  <span aria-hidden="true">{entry.year.slice(2)}</span>
                </div>

                <div className="bg-surface border border-border rounded-xl p-5">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
                    <span className="text-xs font-semibold text-accent">{entry.year}</span>
                    <h4 className="text-sm font-semibold text-text-primary">{entry.title}</h4>
                    {entry.company && (
                      <span className="text-xs text-text-secondary">@ {entry.company}</span>
                    )}
                  </div>
                  {entry.description && (
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {entry.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-text-primary mb-6">Let&apos;s Work Together</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary" size="lg" href="#projects">
            View My Projects
          </Button>
          <Button variant="outline" size="lg" href="#contact">
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
}
