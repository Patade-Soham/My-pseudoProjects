import ReservationForm from "../components/sections/ReservationForm";

export default function Reservations() {
  return (
    <>
      <section className="page-banner reservation-banner">
        <div className="container">
          <p className="hero-kicker">Reservations</p>
          <h1>Book Your Candlelit Table</h1>
          <p>
            Tell us your preferred date and time, and we will prepare an evening
            tailored to your pace.
          </p>
        </div>
      </section>
      <ReservationForm />
    </>
  );
}
