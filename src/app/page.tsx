import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-linear-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/falcon.webp"
            alt="Falcon"
            width={200}
            height={200}
            priority
            className="w-32 h-32 md:w-48 md:h-48 object-contain"
          />
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Falcon
          </h1>
          {/* <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A production-ready Next.js boilerplate for building robust, accessible CRMs
          </p> */}
        </div>

        {/* Quote */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -top-4 -left-4 text-6xl text-primary/20 font-serif">"</div>
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-light italic text-foreground/90 leading-relaxed pt-8">
            Corporations that are purely AI and ROBOTICS will outperform corporations that have people in the loop.
          </blockquote>
          <footer className="mt-6 text-sm md:text-base text-muted-foreground">
            ~ Elon, 2026
          </footer>
        </div>

        {/* CTA or additional info */}
        <div className="pt-8">
          <p className="text-sm text-muted-foreground">
            Built with Next.js, TypeScript, Tailwind CSS v4, and shadcn/ui
          </p>
        </div>
      </div>
    </main>
  );
}
