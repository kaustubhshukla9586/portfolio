import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle"); // 'idle', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // If running locally via Vite (not Vercel), mock the network request so the UI can be tested
      if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        return;
      }

      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="w-full bg-ink px-5 md:px-10 pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="mx-auto max-w-[1400px] min-h-[60vh] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          <h2 className="font-display font-bold uppercase tracking-tight text-bone leading-none text-5xl md:text-7xl lg:text-8xl text-left">
            INTERESTED <br /> IN WORKING <br /> TOGETHER?
          </h2>
          <p className="font-body text-bone/70 text-lg max-w-md">
            No pitch. Just say what you need and I'll get back to you securely.
          </p>
        </div>

        {/* Right: Form Box */}
        <div className="w-full bg-bone/[0.02] border border-bone/10 p-8 md:p-12">
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8 }}
              className="bg-amber text-ink p-8 flex items-center justify-center min-h-[300px]"
            >
              <h3 className="font-mono text-sm md:text-base uppercase tracking-widest font-bold text-center">
                MESSAGE SECURED.<br /> I WILL BE IN TOUCH.
              </h3>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              <div className="flex flex-col gap-2 relative">
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  required
                  placeholder="NAME"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-bone/20 rounded-none outline-none py-4 font-mono text-base md:text-lg font-bold uppercase tracking-widest text-bone placeholder:text-bone/40 transition-colors duration-150 ease-out focus:border-amber"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  required
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-bone/20 rounded-none outline-none py-4 font-mono text-base md:text-lg font-bold uppercase tracking-widest text-bone placeholder:text-bone/40 transition-colors duration-150 ease-out focus:border-amber"
                />
              </div>

              <div className="flex flex-col gap-2 relative mt-4">
                <textarea 
                  name="message" 
                  id="message"
                  required
                  placeholder="MESSAGE"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-bone/20 rounded-none outline-none py-4 font-mono text-base md:text-lg font-bold uppercase tracking-widest text-bone placeholder:text-bone/40 transition-colors duration-150 ease-out focus:border-amber resize-none"
                />
              </div>

              {status === "error" && (
                <p className="font-mono text-[10px] text-red-500 uppercase tracking-widest">
                  An error occurred. Please try again.
                </p>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="group relative mt-6 w-full bg-bone py-5 px-8 flex items-center justify-between border-none rounded-none overflow-hidden transition-colors duration-300 hover:bg-amber disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-ink font-bold relative z-10">
                  {isSubmitting ? "ENCRYPTING & SENDING..." : "SEND MESSAGE"}
                </span>
                <span className="text-ink transition-transform duration-300 group-hover:translate-x-2 relative z-10">
                  →
                </span>
              </button>

            </form>
          )}
        </div>
      </div>
    </section>
  );
}
