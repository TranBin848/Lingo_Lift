import {
  LandingNavbar,
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  LearningPhasesSection,
  TestimonialsSection,
  CTASection,
  Footer,
} from "../components/landing";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* How It Works */}
        <section id="how-it-works">
          <HowItWorksSection />
        </section>

        {/* Features */}
        <section id="features">
          <FeaturesSection />
        </section>

        {/* Learning Phases / Roadmap */}
        <section id="roadmap">
          <LearningPhasesSection />
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* CTA */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
