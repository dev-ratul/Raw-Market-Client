import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Support = () => {
    const axiosSecure= useAxiosSecure();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "General question",
    subject: "",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "" });

    try {
     
        const res = axiosSecure.post('/support', form)

      setStatus({ type: "success", message: "Message sent successfully!" });

      // SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting support. We will get back to you soon.",
        confirmButtonColor: "#4f46e5",
      });

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        topic: "General question",
        subject: "",
        message: "",
        consent: false,
      });
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message." });

      // SweetAlert error
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#ef4444",
      });
    }
  };



  return (
    <div className="max-w-3xl my-10 mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Support
      </h2>
      <form onSubmit={onSubmit} className="space-y-5">
        {/* Name & Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
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
              className="mt-1 w-full rounded-xl  text-black border border-gray-300 px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
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
              className="mt-1 w-full rounded-xl border text-black  border-gray-300 px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Phone & Topic */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              placeholder="e.g. +8801XXXXXXXXX"
              className="mt-1 w-full rounded-xl border text-black  border-gray-300 px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-900">
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              value={form.topic}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border text-black  border-gray-300 px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>General question</option>
              <option>Billing</option>
              <option>Technical support</option>
              <option>Partnership</option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
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
            className="mt-1 w-full rounded-xl border text-black  border-gray-300 px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-900">
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
            className="mt-1 w-full resize-y rounded-xl border text-black  border-gray-300 px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={onChange}
            className="mt-1 h-5 w-5 rounded text-black  border-gray-300 text-indigo-600 focus:ring-indigo-500"
            required
          />
          <label htmlFor="consent" className="text-sm text-gray-700">
            I agree to be contacted regarding my inquiry.
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status.type === "loading"}
            className="w-full rounded-2xl bg-indigo-600 px-5 py-3 text-white shadow-lg hover:brightness-110 disabled:opacity-70"
          >
            {status.type === "loading" ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Support;
