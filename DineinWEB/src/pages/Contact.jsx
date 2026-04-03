import ContactBlock from "../components/sections/ContactBlock";

export default function Contact() {
  return (
    <>
      <section className="page-banner contact-banner">
        <div className="container">
          <p className="hero-kicker">Contact</p>
          <h1>Find Us In The Heart Of The City</h1>
          <p>
            Reach out for private events, curated tasting experiences, or
            reservation assistance.
          </p>
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
