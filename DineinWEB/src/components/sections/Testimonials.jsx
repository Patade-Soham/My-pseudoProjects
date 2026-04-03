import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import { testimonials } from "../../data/testimonialData";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % testimonials.length);

  return (
    <section className="section-space testimonials-section">
      <div className="container">
        <SectionTitle
          subtitle="Guest Impressions"
          title="Moments That Stay With You"
          align="center"
        />

        <div className="testimonial-shell">
          <button
            type="button"
            className="carousel-btn"
            aria-label="Previous testimonial"
            onClick={prevSlide}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="testimonial-frame">
            <AnimatePresence mode="wait">
              <motion.article
                key={testimonials[current].id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="testimonial-card"
              >
                <span className="quote-mark">"</span>
                <p className="quote-text">{testimonials[current].quote}</p>
                <div className="stars">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, index) => (
                      <Star key={index} size={16} />
                    )
                  )}
                </div>
                <p className="author">{testimonials[current].author}</p>
                <p className="role">{testimonials[current].role}</p>
              </motion.article>
            </AnimatePresence>
          </div>

          <button
            type="button"
            className="carousel-btn"
            aria-label="Next testimonial"
            onClick={nextSlide}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((entry, index) => (
            <button
              type="button"
              key={entry.id}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
