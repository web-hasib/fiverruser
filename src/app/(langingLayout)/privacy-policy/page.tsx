"use client";
export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen">
      <div className="mb-8 text-center bg-black pt-44 pb-12 my-20 text-white p-4">
        <h1 className=" text-3xl md:text-6xl font-bold mb-2 ">Privacy Policy</h1>
        <p className="mt-6">Last updated: 23 February 2026</p>
      </div>
      
      <div className="space-y-8 container mx-auto py-8">
        <section>
          <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
          <p>MedAI Pro (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy and handling personal and medical data responsibly. This Privacy Policy explains what data we collect, why we collect it, and how it is used and protected when you use our platform.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">2. What Data We Collect</h2>
          <h3 className="font-medium mt-4 mb-2">Account Information:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name</li>
            <li>Email address(es)</li>
            <li>Optional phone number</li>
            <li>Country</li>
            <li>Professional details (specialty, clinical rank - optional)</li>
          </ul>
          
          <h3 className="font-medium mt-4 mb-2">Usage & Technical Data:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Login activity</li>
            <li>Team usage</li>
            <li>Feature usage statistics</li>
            <li>Device and browser information (for security and performance)</li>
          </ul>
          
          <h3 className="font-medium mt-4 mb-2">Patient & Case Data:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Case notes</li>
            <li>Uploads & documents</li>
            <li>Transcriptions</li>
            <li>AI-generated summaries</li>
            <li>Patient identifiers (as provided by the user)</li>
          </ul>
          
          <div className="mt-4 p-4">
            <h4 className="font-bold flex items-center">
              
              Important:
            </h4>
            <p className="mt-2">You are responsible for ensuring that any patient data uploaded is lawful and authorized.</p>
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">3. How We Use Your Data</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Provide and operate the MedAI Pro platform</li>
            <li>Process AI requests and generate outputs</li>
            <li>Secure accounts and prevent misuse</li>
            <li>Improve system performance and features</li>
            <li>Comply with legal and regulatory obligations (GDPR)</li>
          </ul>
          <p className="mt-2">We do not sell your data.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">4. AI Processing & Medical Data</h2>
          <p>• AI processing is performed only to support clinical workflows.</p>
          <p>• AI outputs are not medical advice and must be reviewed by a qualified clinician.</p>
          <p>• AI-generated content is not shared with other users unless you explicitly share it.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">5. Data Retention</h2>
          <p>Retention periods depend on your subscription plan and workspace policy.</p>
          <h3 className="font-medium mt-4 mb-2">Examples:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Free plans: limited retention (e.g., 30 days)</li>
            <li>Paid plans: extended or configurable retention</li>
            <li>AI-derived data may be stored before deletion</li>
          </ul>
          <p className="mt-2">Admins may configure retention rules at organization or department level.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">6. Data Sharing</h2>
          <p>Your data is shared only when you choose to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Sharing patients or cases with team members</li>
            <li>Sharing assistants templates in a workspace</li>
            <li>We do not share your data with third parties for marketing.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">7. Security Measures</h2>
          <p>We implement industry-standard security practices:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Encryption in transit and at rest</li>
            <li>Role-based access control (RBAC)</li>
            <li>Two-factor authentication (2FA)</li>
            <li>Audit logs for admin actions</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">8. Your Rights (GDPR)</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Access your data</li>
            <li>Export your data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion (subject to retention rules)</li>
            <li>Restrict or object to processing</li>
          </ul>
          <p className="mt-2">Requests can be made via account settings or by contacting support.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">9. Changes to This Policy</h2>
          <p>You have the right to:</p>
          <p>We may update this Privacy Policy from time to time.</p>
          <p>Significant changes will be communicated within the platform.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-2">10. Contact</h2>
          <p>If you have questions about privacy or data protection:</p>
          <p>support@medaipro.com</p>
        </section>
      </div>
    </div>
    </div>
  );
}