import { Link } from "react-router";
import { Title } from "../components/core/titles/Title";
import { Paragraph } from "../components/core/paragraphs/Paragraph";
import { Button } from "../components/core/buttons/Button";
import { AnimatedSection } from "../components/core/motion/AnimatedSection";

export function NotFoundPage() {
  return (
    <section className="relative h-full w-full flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 z-10">
      <div className="max-w-5xl flex flex-col items-center gap-6 mx-auto w-full text-center">
        <AnimatedSection delay={0.2}>
          <Title tag="h1" variant="primary" className="text-6xl md:text-8xl font-bold">
            404
          </Title>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <Title tag="h2" variant="secondary" className="text-2xl md:text-4xl">
            Page not found
          </Title>
        </AnimatedSection>

        <AnimatedSection delay={0.6}>
          <Paragraph variant="body" className="text-white/70 text-lg md:text-xl">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </Paragraph>
        </AnimatedSection>

        <AnimatedSection delay={0.8}>
          <Button variant="glass" size="md" className="mt-4">
            <Link to="/" className="block w-full h-full">
              Back to home
            </Link>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default NotFoundPage;