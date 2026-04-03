import { useState } from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";

const infoItems = [
  {
    icon: MapPin,
    title: "Address",
    text: "11 Ember Lane, Neo District, Mumbai 400001",
  },
  {
    icon: Phone,
    title: "Phone",
    text: "+91 90000 22222",
  },
  {
    icon: Mail,
    title: "Email",
    text: "hello@midnightbites.com",
  },
  {
    icon: Clock3,
    title: "Hours",
    text: "Daily: 6:00 PM - 1:00 AM",
  },
];

const defaultState = { name: "", email: "", message: "" };

export default function ContactBlock() {
  const [formData, setFormData] = useState(defaultState);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormData(defaultState);
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section className="section-space">
      <div className="container contact-layout">
        <div className="contact-info">
          {infoItems.map((item) => (
            <article key={item.title} className="contact-card">
              <span className="contact-icon">
                <item.icon size={18} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
          <div className="map-placeholder">
            <span>Map Preview</span>
          </div>
        </div>

        <div className="form-panel contact-panel">
          <h3>Send A Message</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={onChange}
                className="form-input"
                placeholder=" "
                required
              />
              <label htmlFor="contact-name" className="form-label">
                Name
              </label>
            </div>
            <div className="form-group">
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                className="form-input"
                placeholder=" "
                required
              />
              <label htmlFor="contact-email" className="form-label">
                Email
              </label>
            </div>
            <div className="form-group">
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={onChange}
                className="form-input form-textarea"
                placeholder=" "
                rows={5}
                required
              />
              <label htmlFor="contact-message" className="form-label">
                Message
              </label>
            </div>
            <Button type="submit" className="submit-btn">
              Submit Message
            </Button>
          </form>

          <AnimatePresence>
            {submitted ? (
              <motion.p
                className="success-note"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Thanks for reaching out. We will get back to you very soon.
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
