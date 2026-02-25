import Link from "next/link";
import React from "react";

const Terms = () => {
  return (
    <section className="flex justify-center w-full px-4 py-10 bg-black">
      <div className="w-full max-w-4xl  bg-black rounded-[16px] shadow-2xl p-6 text-white">
        <h2 className="mb-3 text-center font-montserrat">
          Prophytes Privacy Policy
        </h2>
        <div className="pb-6 mt-6 space-y-3 border-b border-white/10">
          <p className={` text-white`}>Effective Date: May 20th, 2023</p>
          <p className={` text-white`}>Last Updated: Sep 7th, 2025</p>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">1. Introduction</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            Prophytes (“we,” “our,” or “us”) respects your privacy and is
            committed to protecting your personal data. This Privacy Policy
            explains what information we collect, how we use it, how we protect
            it, and the choices you have regarding your data.
          </p>
          <p className={` text-white sm:leading-6 leading-5 mt-4`}>
            This Policy applies to all services offered through our website
            (Prophytes.com), mobile application (Prophytes App), and any related
            platforms, products, or services. By accessing or using Prophytes,
            you agree to this Privacy Policy.
          </p>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">2. Information We Collect</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            We collect the following categories of information:
          </p>
          <p className={` text-white sm:leading-6 leading-5 mt-4`}>
            a. Personal Information
          </p>
          <ul className="list-disc list-inside mt-4 ml-7">
            <li>
              Name, username, email, phone number, mailing/billing address,
              chapter, and organization details
            </li>
            <li className="mt-1">
              Payment information (e.g., credit/debit card, billing history)
            </li>
          </ul>
          <p className={` text-white sm:leading-6 leading-5 mt-4`}>
            b. Account & Verification Data
          </p>
          <ul className="list-disc list-inside mt-4 ml-7">
            <li>
              Member verification details (organization, chapter, crossing year,
              etc.)
            </li>
            <li className="mt-1">
              Documents or IDs you provide for membership validation
            </li>
          </ul>

          <p className={` text-white sm:leading-6 leading-5 mt-4`}>
            c. Usage Data
          </p>
          <ul className="list-disc list-inside mt-4 ml-7">
            <li>
              Log data (IP address, browser type, device type, operating system,
              date/time of access)
            </li>
            <li className="mt-1">
              In-app behavior (pages visited, features used, voting and posting
              history)
            </li>
          </ul>

          <p className={` text-white sm:leading-6 leading-5 mt-4`}>
            d. Cookies & Tracking Data
          </p>
          <ul className="list-disc list-inside mt-4 ml-7">
            <li>
              Cookies, device identifiers, and similar technologies used for
              analytics, personalization, and advertising
            </li>
          </ul>
          <p className={` text-white sm:leading-6 leading-5 mt-4`}>
            e. Cookies & Tracking Data
          </p>
          <ul className="list-disc list-inside mt-4 ml-7">
            <li>
              Cookies, device identifiers, and similar technologies used for
              analytics, personalization, and advertising
            </li>
          </ul>

          <p className={` text-white sm:leading-6 leading-5 mt-4`}>
            f. Third-Party Data
          </p>
          <ul className="list-disc list-inside mt-4 ml-7">
            <li>
              Demographic, social, or publicly available data that enhances
              member experience
            </li>
          </ul>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">3. How We Use Your Information</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            We process your information for the following purposes:
          </p>

          <ol className="list-decimal list-inside mt-4 ml-7 space-y-2">
            <li>
              Provide & Manage Services, Verify membership, manage your account,
              process payments, deliver platform features
            </li>
            <li>
              Personalize Experience , Recommend features, content, and
              networking opportunities tailored to you
            </li>
            <li>
              Marketing & Communications , Send newsletters, event invites,
              promotions (opt-out available at any time)
            </li>
            <li>
              Security & Compliance , Detect fraud, enforce policies, comply
              with legal obligations
            </li>
            <li>
              Product Development , Improve features, user experience, and
              member offerings
            </li>
          </ol>
        </div>

        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">
            4. Legal Basis for Processing (GDPR)
          </h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            If you are located in the EEA, UK, or other regions with GDPR , like
            laws, we rely on the following legal bases:
          </p>

          <ul className="list-disc list-inside mt-4 ml-7 space-y-2">
            <li>Contract performance (to provide services you request)</li>
            <li className="">
              Legitimate interests (to improve and secure our services)
            </li>
            <li className="">
              Consent (for marketing, cookies, and optional data sharing)
            </li>
            <li className="">
              Legal obligations (to comply with applicable laws)
            </li>
          </ul>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">
            5. How We Share Your Information
          </h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            We may share your data only in the following situations:
          </p>

          <ul className="list-disc list-inside mt-4 ml-7 space-y-2">
            <li>
              With Service Providers: Payment processors, hosting providers,
              analytics tools, and verification services
            </li>
            <li className="">
              With Affiliates & Partners: Only to deliver services you opt into
              (e.g., discounts, verified partner offers)
            </li>
            <li className="">
              For Legal Reasons: To comply with law, enforce agreements, or
              protect rights and safety
            </li>
            <li className="">
              With Your Consent: If you explicitly authorize sharing beyond the
              above
            </li>
          </ul>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            We do not sell your personal information to third parties.
          </p>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">6. Data Retention</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            We retain your personal data only as long as necessary to:
          </p>

          <ul className="list-disc list-inside mt-4 ml-7 space-y-2">
            <li>Provide services and maintain your account</li>
            <li className="">Meet legal, tax, or regulatory obligations</li>
            <li className="">Resolve disputes and enforce agreements</li>
          </ul>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            Once data is no longer required, we securely delete or anonymize it.
          </p>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">7. Your Rights</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            Depending on your location, you may have the following rights:
          </p>

          <ul className="list-disc list-inside mt-4 ml-7 space-y-2">
            <li>Access & Portability : Request a copy of your personal data</li>
            <li className="">
              Correction : Update inaccurate or incomplete data
            </li>
            <li className="">
              Deletion (“Right to be Forgotten”) : Ask us to erase your data
            </li>
            <li>Restriction , Limit processing in certain cases</li>
            <li>
              Objection Opt out of direct marketing or data use based on
              legitimate interests
            </li>
            <li>
              Withdraw Consent Revoke consent for marketing or optional features
            </li>
          </ul>
          <p className="mt-3 leading-5 text-white sm:leading-6">
            To exercise these rights, contact us at{" "}
            <Link
              href="mailto:privacy@prophytes.com"
              target="_blank"
              className="text-white underline "
            >
              privacy@prophytes.com
            </Link>
            .
          </p>
        </div>

        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">8. Cookies & Tracking</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            We use cookies and similar technologies to:
          </p>

          <ul className="list-disc list-inside mt-4 ml-7 space-y-2">
            <li>Keep you signed in</li>
            <li className="">Remember preferences</li>
            <li className="">Analyze site traffic and engagement</li>
            <li> Support advertising and marketing</li>
          </ul>
          <p className="mt-3 leading-5 text-white sm:leading-6">
            You can manage cookies in your browser settings or opt out of
            tracking where required by law.
          </p>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">9. Data Security</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            We use industry standard security practices, including:
          </p>

          <ul className="list-disc list-inside mt-4 ml-7 space-y-2">
            <li>Encryption of sensitive data (at rest & in transit)</li>
            <li className="">Firewalls and intrusion detection systems</li>
            <li className="">
              Limited employee access on a need-to-know basis
            </li>
            <li> Regular security reviews and audits</li>
          </ul>
          <p className="mt-3 leading-5 text-white sm:leading-6">
            However, no system is 100% secure, and we cannot guarantee absolute
            security.
          </p>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">10. International Transfers</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            If you access Prophytes from outside the United States, your data
            may be processed and stored in the U.S. or other countries where we
            or our service providers operate. We ensure appropriate safeguards
            (e.g., Standard Contractual Clauses) for international transfers.
          </p>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">11. Children’s Privacy</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            Prophytes is not intended for individuals under the age of 18. We do
            not knowingly collect personal data from minors. If we learn we have
            inadvertently collected data from a minor, we will delete it
            immediately.
          </p>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">12. Changes to This Policy</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with a new effective date, and where
            appropriate, we will notify you via email or in-app notice.
          </p>
        </div>
        <div className="pb-6 mt-6 border-b border-white/10">
          <h4 className="text-xl font-bold">13. Contact Us</h4>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            If you have questions, concerns, or requests regarding this Privacy
            Policy or your data rights, contact us:
          </p>
          <p className={` text-white sm:leading-6 leading-5 mt-3`}>
            Prophytes Privacy Team
          </p>
          <p className="mt-3 leading-5 text-white sm:leading-6">
            Email:
            <Link
              target="_blank"
              href="mailto:privacy@prophytes.com"
              className="ml-1 text-white underline"
            >
              privacy@prophytes.com
            </Link>
            .
          </p>
          <p className="mt-8 leading-5 text-white sm:leading-6">
            Website:
            <Link
              target="_blank"
              href="https://www.prophytes.com"
              className="ml-1 text-white underline"
            >
              https://www.prophytes.com
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Terms;
