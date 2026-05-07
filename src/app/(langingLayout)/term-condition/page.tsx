"use client";

export default function TermsOfServicePage() {
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen">
      <div className="mb-8 text-center bg-black pt-44 pb-12 my-20 text-white p-4">
        <h1 className="text-6xl font-bold mb-2">Terms of Service</h1>
        <p className="mt-6">Last updated: 23 February 2026</p>
      </div>
      
      <div className="space-y-8 container mx-auto py-8">
        <section>
          <h2 className="text-xl font-bold mb-2">1. Acceptance of Terms</h2>
          <p>By accessing or using MedAI Pro, you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">2. Purpose of the Platform</h2>
          <p>MedAI Pro is a clinical support and documentation assistant. It is designed to help healthcare professionals:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Structure medical data</li>
            <li>Draft notes, letters, and summaries</li>
            <li>Improve workflow efficiency</li>
          </ul>
          <p className="mt-2">MedAI Pro does not replace professional medical judgment.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">3. User Responsibilities</h2>
          <p>You agree that:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>You are authorized to use any data you upload</li>
            <li>You will not upload unlawful or unauthorized patient data</li>
            <li>You remain responsible for all clinical decisions</li>
            <li>AI outputs are reviewed before use</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">4. Account Security</h2>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>You are responsible for keeping your login credentials secure</li>
            <li>Two-factor authentication may be required</li>
            <li>We must notify you immediately of unauthorized access</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">5. Subscription & Usage Limits</h2>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Usage limits (tokens, retention, tasks) depend on your plan</li>
            <li>Limits may change according to admin or organizational settings</li>
            <li>Exceeding limits may restrict functionality until reset or upgrade</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">6. Acceptable Use</h2>
          <p>You may not:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Bypass system limits or security</li>
            <li>Reverse engineer the platform</li>
            <li>Use the system for fraudulent documentation</li>
            <li>Use AI output as verified medical fact without review</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">7. Data Ownership</h2>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>You own your content and data</li>
            <li>You grant MedAI Pro a limited license to process data solely to provide the service</li>
            <li>Shared content remains under your control based on permissions</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">8. Suspension & Termination</h2>
          <p>We reserve the right to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Suspend or restrict accounts for policy violations</li>
            <li>Temporarily or permanently disable access</li>
            <li>Retain or delete data according to retention rules</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">9. Limitation of Liability</h2>
          <p>MedAI Pro is provided &quot;as is&quot;:</p>
          <p>We are not liable for:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Clinical decisions made using AI output</li>
            <li>Data entered incorrectly by users</li>
            <li>Indirect or consequential damages</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">10. Changes to Terms</h2>
          <p>We may update these Terms.</p>
          <p>Continued use of the platform implies acceptance of updated terms.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">11. Contact</h2>
          <p>If you have questions about privacy or data protection:</p>
          <p>support@medaipro.com</p>
        </section>
      </div>
    </div>
    </div>
  );
}