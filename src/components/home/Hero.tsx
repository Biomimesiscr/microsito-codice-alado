import { Title } from "../core/titles/Title";
import { Paragraph } from "../core/paragraphs/Paragraph";
import { Button } from "../core/buttons/Button";

export function Hero() {
  return (
    <section className="relative h-full w-full flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 z-10">
      <div className="max-w-4xl flex flex-col items-start gap-4 mx-auto w-full">
        <Title tag="h2" variant="secondary" className="mb-0 text-white font-normal text-3xl md:text-5xl">
          Códice Alado
        </Title>
        <Title tag="h1" variant="primary" className="mb-4 text-5xl md:text-7xl font-bold">
          Archivo de formas de vida
        </Title>
        <Paragraph variant="body" className="mb-10 text-lg md:text-xl text-white/90">
          Explora la naturaleza desde una nueva perspectiva con la colección virtual de datos biofísicos
          del CICIMA, donde los insectos y otros organismos inspiran avances científicos y tecnológicos a
          partir de la riqueza de la biodiversidad local
        </Paragraph>
        
        <div className="w-full flex justify-center mt-4">
          <Button variant="glass" size="lg" className="rounded-full px-12 py-3 text-2xl font-medium tracking-wide">
            menú
          </Button>
        </div>
      </div>
    </section>
  );
}
