import { type ReactNode } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

interface SocialItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const SOCIAL_LINKS: SocialItem[] = [
  {
    href: 'https://github.com/jgarrone82',
    label: 'GitHub',
    icon: <Github size={18} />,
  },
  {
    href: 'https://www.linkedin.com/in/jorge-ariel-garrone/',
    label: 'LinkedIn',
    icon: <Linkedin size={18} />,
  },
  {
    href: 'https://x.com/jorgegarrone',
    label: 'X (Twitter)',
    icon: <Twitter size={18} />,
  },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            &copy; 2026 Jorge Garrone. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-background transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
