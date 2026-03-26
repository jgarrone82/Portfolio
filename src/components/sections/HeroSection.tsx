import Image from 'next/image';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { services } from '@/src/data/services';
import { Server, Monitor, Users } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server className="size-6 text-accent" />,
  Monitor: <Monitor className="size-6 text-accent" />,
  Users: <Users className="size-6 text-accent" />,
};

export function HeroSection() {
  return (
    <div className="w-full">
      {/* Hero — two-column layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight">
              Jorge Ariel Garrone
            </h1>
            <p className="mt-3 text-xl font-medium text-accent">Full Stack Engineer</p>
            <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0">
              Senior Software Developer &amp; Leader with 15+ years of experience building robust
              web applications, APIs, and leading high-performing development teams.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button variant="primary" size="lg" href="#projects">
                View My Work
              </Button>
              <Button variant="outline" size="lg" href="#contact">
                Get in Touch
              </Button>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/jgarrone82"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-secondary hover:text-accent transition-colors p-2 rounded-lg hover:bg-surface"
              >
                <Github className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jorge-ariel-garrone/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-secondary hover:text-accent transition-colors p-2 rounded-lg hover:bg-surface"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href="https://x.com/jorgegarrone"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-text-secondary hover:text-accent transition-colors p-2 rounded-lg hover:bg-surface"
              >
                <Twitter className="size-5" />
              </a>
            </div>
          </div>

          {/* Right: profile photo */}
          <div className="flex-shrink-0">
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-96 rounded-2xl overflow-hidden border border-border shadow-2xl">
              <Image
                src="/images/profile.jpg"
                alt="Jorge Ariel Garrone"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* What I Do subsection */}
      <div className="bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              What I Do
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              I build end-to-end solutions — from scalable backend APIs to polished frontend
              interfaces — and lead teams to deliver them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-background border border-border rounded-xl p-6 hover:border-accent/50 transition-colors"
              >
                <div className="mb-4">{iconMap[service.icon]}</div>
                <h3 className="text-base font-semibold text-text-primary mb-2">{service.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
