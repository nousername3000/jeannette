import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { getSectionPadding } from "@/lib/themeStyles";

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description:
      "We start with a no-obligation call to understand your goals and see if we're the right fit.",
  },
  {
    number: "02",
    title: "Personalised Plan",
    description:
      "I create a tailored hypnotherapy programme designed specifically around your unique needs.",
  },
  {
    number: "03",
    title: "Deep Sessions",
    description:
      "Experience guided hypnosis in a safe, comfortable setting — in person or online.",
  },
  {
    number: "04",
    title: "Lasting Change",
    description:
      "Walk away with tools and techniques for lasting transformation and continued growth.",
  },
];

export function Process() {
  const { ref } = useScrollReveal();
  const { sectionSpacing } = useTheme();

  return (
    <section id="process" className={`${getSectionPadding(sectionSpacing)} bg-muted/40`}>
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className={`text-center mb-16 reveal`}>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">
            How It Works
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Journey to Change
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A clear, supportive process from first conversation to lasting
            transformation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative reveal reveal-delay-${i + 1}`}
            >
              <span className="font-display text-5xl font-bold text-primary/15">
                {step.number}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 right-0 translate-x-1/2 w-8 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
