import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";
import { Award, GraduationCap, Heart } from "lucide-react";
import { getImageClasses, getSectionPadding } from "@/lib/themeStyles";

const credentials = [
  { icon: GraduationCap, text: "MSc Clinical Hypnotherapy" },
  { icon: Award, text: "15+ Years Experience" },
  { icon: Heart, text: "2,000+ Lives Changed" },
];

export function About() {
  const { ref } = useScrollReveal();
  const { imageStyle, sectionSpacing } = useTheme();

  return (
    <section id="about" className={`${getSectionPadding(sectionSpacing)} bg-muted/40`}>
      <div
        ref={ref}
        className={`mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center reveal`}
      >
        {/* Image side */}
        <div className="flex justify-center">
          <div className="relative">
            <div className={`w-72 h-72 md:w-80 md:h-80 bg-secondary shadow-theme-lg ${getImageClasses(imageStyle)}`}>
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="font-display text-6xl text-primary/40">SM</span>
              </div>
            </div>
            <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 -z-10 ${getImageClasses(imageStyle)}`} />
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary mb-3">
            About Me
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            A Safe Space for Transformation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm Sarah Mitchell, and I believe that every person holds the power
            to heal within themselves. As a certified clinical hypnotherapist,
            I've spent over 15 years guiding individuals through gentle,
            evidence-based techniques that unlock their subconscious potential.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            My approach combines traditional hypnotherapy with modern
            neuroscience, creating a warm and supportive environment where real
            change happens — naturally and comfortably.
          </p>

          <div className="flex flex-wrap gap-6">
            {credentials.map((cred) => (
              <div key={cred.text} className="flex items-center gap-2">
                <cred.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {cred.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
