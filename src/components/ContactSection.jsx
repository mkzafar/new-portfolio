import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

export default function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Let's Connect</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                Whether you have a question about my work, want to discuss potential opportunities, 
                or just want to say hello, I'd love to hear from you. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Email</h4>
                  <a href="mailto:john.developer@email.com" className="text-slate-600 hover:text-blue-600 transition-colors">
                    mkzafar23@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Phone</h4>
                  <a href="tel:+1234567890" className="text-slate-600 hover:text-green-600 transition-colors">
                    +1 (647) 564-7144
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">Location</h4>
                  <p className="text-slate-600">Toronto, ON, CAN</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
  <div className="flex gap-4">
    {/* GitHub Button */}
    <a
      href="https://github.com/mkzafar"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-slate-100 transition-colors"
      >
        <Github className="w-5 h-5" />
      </Button>
    </a>

    {/* LinkedIn Button */}
    <a
      href="https://www.linkedin.com/in/mkzafar23/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-slate-100 transition-colors"
      >
        <Linkedin className="w-5 h-5" />
      </Button>
    </a>
  </div>
</div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        First Name
                      </label>
                      <Input
                        placeholder="John"
                        className="border-slate-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        Last Name
                      </label>
                      <Input
                        placeholder="Doe"
                        className="border-slate-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      className="border-slate-200 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Subject
                    </label>
                    <Input
                      placeholder="Let's discuss an opportunity"
                      className="border-slate-200 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      className="border-slate-200 focus:border-blue-500 resize-none"
                    />
                  </div>

                 <button
  type="submit"
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg inline-flex items-center justify-center"
>
  <Send className="w-4 h-4 mr-2" />
  Send Message
</button>

                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}