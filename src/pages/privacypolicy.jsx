import React from "react";
import {Link} from 'react-router-dom'

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>EasyShope</strong>, we value your privacy and are committed
        to protecting your personal information. This Privacy Policy outlines
        how we collect, use, and safeguard your data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We collect personal information when you register, log in, or place an
        order. This may include your name, email, phone number, address, and
        delivery location.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Use of Cookies & Tracking</h2>
      <p className="mb-4">
        EasyShope uses cookies and other tracking technologies to improve user
        experience, analyze traffic, and enhance our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>To process orders and deliver products</li>
        <li>To personalize user experience</li>
        <li>To improve our customer service</li>
        <li>To process secure payments using Razorpay</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell or trade your personal data. We only share your
        information with trusted third parties like Razorpay for secure payment
        processing.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You have the right to update, modify, or delete your personal
        information at any time through your account settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-2">
        If you have any questions or concerns about this policy, you can reach
        us by:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Phone: 8252637157</li>
        <li>
          Contact Form: Visit our{" "}
          <Link
          onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
            to="/contact"
            className="text-blue-600 hover:underline"
          >
            Contact Page
          </Link>
        </li>
      </ul>

      <p className="text-sm text-gray-500">
        This policy is subject to change. Please review periodically for
        updates.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
