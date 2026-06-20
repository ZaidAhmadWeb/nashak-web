interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-(--accent) mb-2">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold leading-tight ${
          light ? 'text-white' : 'text-(--primary)'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
