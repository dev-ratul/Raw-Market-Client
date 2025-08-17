import React, { useState } from "react";

// A polished, responsive, accessible Contact form component
// - Light/Dark friendly (Tailwind)
// - Subtle glassmorphism card over a hero image
// - Basic client-side validation
// - Keyboard & screen-reader accessible
// - No external libs required

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "General question",
    subject: "",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState({ type: "idle", message: "" });

  const bgImage =
    "https://i.ibb.co/GfhYXrkG/06050a5a-bb33-45d4-b068-332c05d34d3b.jpg"; // note: i.ibb.co (not i.ibb.co.com)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    try {
      // 👉 Replace this block with your real API call (axios/fetch)
      await new Promise((r) => setTimeout(r, 900));
      console.log("Contact form submission:", form);
      setStatus({ type: "success", message: "Thanks! We'll get back to you soon." });
      setForm({
        name: "",
        email: "",
        phone: "",
        topic: "General question",
        subject: "",
        message: "",
        consent: false,
      });
    } catch (err) {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <section
      className="relative isolate min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/60 dark:from-black/70 dark:via-black/60 dark:to-black/80" />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left: Heading & copy */}
          <div className="text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-md">
              <span className="inline-block h-2 w-2 rounded-full bg-current" />
              We usually reply within 24 hours
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Have a question?
              <br />
              <span className="text-white/90">Contact us</span>
            </h1>
            <p className="mt-4 max-w-prose text-white/80">
              Tell us a bit about your question. Our support team will reach out as soon as possible.
              For urgent matters, consider using the phone field.
            </p>

            <ul className="mt-6 space-y-3 text-white/80">
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                support@example.com
              </li>
              <li className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 8.5C2 5.462 4.462 3 7.5 3h9A5.5 5.5 0 0122 8.5V16a5 5 0 01-5 5H7a5 5 0 01-5-5V8.5z" />
                </svg>
                Live chat: 10am–6pm (GMT+6)
              </li>
            </ul>
          </div>

          {/* Right: Form card */}
          <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/80 md:p-8">
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    required
                    placeholder="e.g. Mahmudul Hasan"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-100"
                    aria-required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-100"
                    aria-required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="e.g. +8801XXXXXXXXX"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                    Topic
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={form.topic}
                    onChange={onChange}
                    className="mt-1 w-full appearance-none rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-100"
                  >
                    <option>General question</option>
                    <option>Billing</option>
                    <option>Technical support</option>
                    <option>Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={onChange}
                  required
                  placeholder="How can we help?"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-100"
                  aria-required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  className="mt-1 w-full resize-y rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-gray-800 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-100"
                  aria-required
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={onChange}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  required
                  aria-required
                />
                <label htmlFor="consent" className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to be contacted regarding my inquiry.
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status.type === "loading"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-80 dark:bg-indigo-500"
                  aria-busy={status.type === "loading"}
                >
                  {status.type === "loading" ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M2.3 2.3a1 1 0 011.06-.22l18 7a1 1 0 010 1.86l-7.53 3.01-3 7.53a1 1 0 01-1.86 0l-7-18a1 1 0 01.33-1.18zM6.2 7.8l5.9 5.9 6.4-2.56-12.3-4.94zm5.05 7.75l1.77 1.77-2.9 7.28 1.13-9.05z" />
                      </svg>
                      Send message
                    </>
                  )}
                </button>
              </div>

              {/* Status */}
              {status.type === "success" && (
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {status.message}
                </p>
              )}
              {status.type === "error" && (
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
