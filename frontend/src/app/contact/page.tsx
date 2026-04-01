export default function ContactPage() {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4 text-[#101828]">Contact</h1>
  
        <p className="text-gray-700 mb-4">
          You can contact us using the form below.
        </p>
  
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 w-full rounded"
          />
  
          <input
            type="email"
            placeholder="Your Email"
            className="border p-2 w-full rounded"
          />
  
          <textarea
            placeholder="Your Message"
            className="border p-2 w-full rounded h-32"
          />
  
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Send Message
          </button>
        </form>
      </div>
    );
  }
  