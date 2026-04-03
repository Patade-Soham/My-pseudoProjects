import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";

function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const initialState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  requests: "",
};

export default function ReservationForm() {
  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const minDate = useMemo(() => getTodayDate(), []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData(initialState);
    window.setTimeout(() => setSubmitted(false), 4200);
  };

  return (
    <section className="section-space">
      <div className="container narrow">
        <div className="form-panel">
          <form onSubmit={onSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <input
                  id="res-name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className="form-input"
                  placeholder=" "
                  required
                />
                <label htmlFor="res-name" className="form-label">
                  Full Name
                </label>
              </div>

              <div className="form-group">
                <input
                  id="res-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={onChange}
                  className="form-input"
                  placeholder=" "
                  required
                />
                <label htmlFor="res-email" className="form-label">
                  Email Address
                </label>
              </div>

              <div className="form-group">
                <input
                  id="res-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={onChange}
                  className="form-input"
                  placeholder=" "
                  required
                />
                <label htmlFor="res-phone" className="form-label">
                  Phone Number
                </label>
              </div>

              <div className="form-group">
                <input
                  id="res-date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={onChange}
                  className="form-input"
                  min={minDate}
                  required
                />
                <label htmlFor="res-date" className="form-label">
                  Date
                </label>
              </div>

              <div className="form-group">
                <input
                  id="res-time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={onChange}
                  className="form-input"
                  required
                />
                <label htmlFor="res-time" className="form-label">
                  Time
                </label>
              </div>

              <div className="form-group">
                <select
                  id="res-guests"
                  name="guests"
                  value={formData.guests}
                  onChange={onChange}
                  className="form-input"
                  required
                >
                  {["1", "2", "3", "4", "5", "6", "7", "8+"].map((count) => (
                    <option key={count} value={count}>
                      {count} Guest{count === "1" ? "" : "s"}
                    </option>
                  ))}
                </select>
                <label htmlFor="res-guests" className="form-label fixed">
                  Number of Guests
                </label>
              </div>

              <div className="form-group full">
                <textarea
                  id="res-requests"
                  name="requests"
                  value={formData.requests}
                  onChange={onChange}
                  className="form-input form-textarea"
                  placeholder=" "
                  rows={4}
                />
                <label htmlFor="res-requests" className="form-label">
                  Special Requests
                </label>
              </div>
            </div>
            <Button type="submit" className="submit-btn">
              Confirm Reservation
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
                Reservation request received. Our host team will contact you
                shortly.
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
