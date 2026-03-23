const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jorge Ariel Garrone",
  jobTitle: "Full Stack Engineer",
  url: "https://www.jorgegarrone.com",
  sameAs: [
    "https://www.linkedin.com/in/jorge-ariel-garrone/",
    "https://github.com/jgarrone82",
    "https://x.com/jorgegarrone",
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
