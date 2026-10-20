import React from "react";
import { Sparkles, Flame, ShieldCheck, HeartHandshake, Feather } from "lucide-react";
import { STUDIO_FEATURES } from "../data/products";

export default function Philosophy() {
  return (
    <section className="philosophy-section" id="philosophy-section">
      <div className="philosophy-container">
        {/* Top Story Header */}
        <div className="philosophy-header-block">
          <div className="section-edition-badge">
            <Feather size={14} />
            <span>The Artisan Heritage</span>
          </div>
          <h2 className="section-serif-title">
            Rooted in Soil, Fired by Tradition
          </h2>
          <p className="section-body-text">
            At Arvon, we celebrate slow craft. In a world of mass-manufactured ceramics,
            every single mug, tumbler, and sculptural vase in our collection begins as raw Indian
            clay on a potter’s wheel. We embrace the gentle imperfections—the thumb-notches,
            the fire flashes from the reduction kiln, and the organic glaze pooling.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="philosophy-pillars-grid">
          <div className="pillar-card">
            <div className="pillar-number">01</div>
            <h3 className="pillar-title">Earth &amp; Mineral Slips</h3>
            <p className="pillar-desc">
              We exclusively use high-grade stoneware and kaolin clays sourced sustainably
              from Indian river basins. Colored only with natural iron, cobalt, and copper mineral oxides.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-number">02</div>
            <h3 className="pillar-title">Cone 10 High Vitrification</h3>
            <p className="pillar-desc">
              Fired up to 1240°C in our gas-reduction studio kilns. This fuses the clay into
              non-porous stone, making each piece microwave-safe, dishwasher-proof, and lasting for generations.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-number">03</div>
            <h3 className="pillar-title">Honoring the Maker’s Mark</h3>
            <p className="pillar-desc">
              Each piece bears an impressed studio seal or the master potter’s signature.
              We partner directly with traditional artisan families in Khurja and Pondicherry with fair wages.
            </p>
          </div>
        </div>

        {/* Studio Features Bar */}
        <div className="studio-perks-banner">
          {STUDIO_FEATURES.map((feat, idx) => (
            <div key={idx} className="studio-perk-item">
              <div className="perk-icon-wrap">
                {idx === 0 && <ShieldCheck size={22} />}
                {idx === 1 && <Sparkles size={22} />}
                {idx === 2 && <HeartHandshake size={22} />}
                {idx === 3 && <Flame size={22} />}
              </div>
              <div className="perk-texts">
                <strong>{feat.title}</strong>
                <p>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
