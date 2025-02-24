const TermsAndConditions = () => {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h1 className="text-3xl font-bold text-center mb-4">Terms and Conditions</h1>
 
  
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>By using Ai-FinTrak, you agree to abide by these Terms and Conditions. If you do not agree, please do not use our platform.</p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
            <p>You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials.</p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Use of the Platform</h2>
            <p>You agree <strong>NOT</strong> to violate laws, engage in fraud, or attempt to disrupt our platform.</p>
          </section>
  
          {/* <section>
            <h2 className="text-xl font-semibold mb-2">4. Transactions & Payments</h2>
            <p>All transactions are final unless otherwise stated. We use secure third-party payment providers.</p>
          </section> */}
  
          <section>
            <h2 className="text-xl font-semibold mb-2">4. Privacy Policy</h2>
            <p>Our Privacy Policy</a> explains how we handle your data.</p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
            <p>We are not responsible for damages, losses, or technical failures related to our platform.</p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
            <p>We may update these Terms and will notify users of significant changes.</p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
            <p>If you have any questions, contact us at <a href="mailto:muthup61@gmail.com" className="text-blue-500 hover:underline">support@ai-fintrak.com</a>.</p>
          </section>
        </div>
      </div>
    );
  };
  
  export default TermsAndConditions;
  