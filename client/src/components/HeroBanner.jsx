import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, ArrowRight, Flame, ShieldCheck, HeartHandshake } from "lucide-react";

export default function HeroBanner({ onExploreClick }) {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const featuresRef = useRef(null);
  const visualCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          featuresRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          visualCardRef.current,
          { opacity: 0, scale: 0.95, x: 20 },
          { opacity: 1, scale: 1, x: 0, duration: 1.1 },
          "-=1.1"
        );

      // Subtle continuous floating motion on visual card badge
      gsap.to(".floating-ceramic-pill", {
        y: -8,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-container">
        {/* Left Column: Story & CTAs */}
        <div className="hero-copy-col">
          <div className="hero-edition-pill" ref={badgeRef}>
            <Sparkles size={14} className="sparkle-gold" />
            <span>Autumn Kiln Firing • Release No. 04</span>
          </div>

          <h1 className="hero-main-title" ref={titleRef}>
            Formed by Earth, <br />
            <span className="title-italic-accent">Sculpted</span> by Hand.
          </h1>

          <p className="hero-subtitle" ref={subtitleRef}>
            Tactile ceramic mugs, fluted amphora vases, and organic tablewares
            handcrafted from mineral stoneware clay. Each piece is individually
            wheel-thrown and high-fired at 1240°C in Indian studio kilns.
          </p>

          <div className="hero-actions-row" ref={buttonsRef}>
            <button
              className="btn-primary-terracotta"
              onClick={onExploreClick}
            >
              Explore Studio Catalog
              <ArrowRight size={18} />
            </button>
            <a
              href="#philosophy-section"
              className="btn-secondary-outline"
            >
              The Clay Philosophy
            </a>
          </div>

          {/* Micro studio promises */}
          <div className="hero-micro-features" ref={featuresRef}>
            <div className="micro-feature-item">
              <Flame size={17} className="feature-icon flame-icon" />
              <div>
                <strong>1240°C High Fired</strong>
                <span>Vitrified &amp; thermal shock resistant</span>
              </div>
            </div>
            <div className="micro-feature-item">
              <ShieldCheck size={17} className="feature-icon shield-icon" />
              <div>
                <strong>100% Non-Toxic</strong>
                <span>Lead &amp; cadmium free food-safe glaze</span>
              </div>
            </div>
            <div className="micro-feature-item">
              <HeartHandshake size={17} className="feature-icon heart-icon" />
              <div>
                <strong>Fair-Wage Studios</strong>
                <span>Supporting traditional Indian potters</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="hero-visual-col" ref={visualCardRef}>
          <div className="hero-visual-card">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80"
              alt="Pebble Dune Speckled Ceramic Mug"
              className="hero-primary-img"
            />
            <div className="hero-img-overlay"></div>

            {/* Floating details tag */}
            <div className="floating-ceramic-pill">
              <div className="pill-dot"></div>
              <div>
                <span className="pill-title">The Dune Speckled Mug</span>
                <span className="pill-price">₹899 • Cone 10 Stoneware</span>
              </div>
            </div>

            {/* Studio seal stamp */}
            <div className="studio-seal-stamp">
              <div className="seal-inner">
                <span>ESTD</span>
                <strong>PEBBLE</strong>
                <span>2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
