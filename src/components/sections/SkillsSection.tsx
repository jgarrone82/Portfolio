import { Badge } from '@/src/components/ui/Badge';
import { SectionTitle } from '@/src/components/ui/SectionTitle';
import { skillCategories } from '@/src/data/skills';

const CATEGORY_ORDER = [
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Cloud & DevOps',
  'Methodologies',
];

export function SkillsSection() {
  const orderedCategories = CATEGORY_ORDER.map((name) =>
    skillCategories.find((c) => c.name === name),
  ).filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <SectionTitle
        title="My Skills & Expertise"
        subtitle="A showcase of my technical and soft skills."
        align="center"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {orderedCategories.map((category) => {
          if (!category) return null;
          return (
            <div key={category.name} className="bg-surface border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} label={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
