
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare, Clock, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message Sent Successfully", {
        description: "We've received your message and will respond soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-center">
              We're here to help with your road anomaly detection needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-roadapp-purple">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <div className="relative">
                          <Input 
                            id="name" 
                            name="name" 
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Input 
                            id="email" 
                            name="email"
                            type="email" 
                            placeholder="your@email.com" 
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="subject">Subject</Label>
                      <div className="relative">
                        <Input 
                          id="subject" 
                          name="subject"
                          placeholder="How can we help you?" 
                          value={formData.subject}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        placeholder="Please provide details about your inquiry..." 
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="resize-none"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-roadapp-purple hover:bg-roadapp-dark-purple"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Sending...</span>
                          <span className="animate-spin">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </span>
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-roadapp-purple">Contact Information</CardTitle>
                  <CardDescription>
                    Ways to reach our team directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-start">
                    <div className="bg-roadapp-purple/10 p-2 rounded-full mr-3">
                      <Mail className="h-5 w-5 text-roadapp-purple" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:aryansharmaji1305@gmail.com" className="text-roadapp-purple hover:underline">
                        aryansharmaji1305@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-roadapp-purple/10 p-2 rounded-full mr-3">
                      <Phone className="h-5 w-5 text-roadapp-purple" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+918939489526" className="text-roadapp-purple hover:underline">
                        +91 89394 89526
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9AM-5PM IST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-roadapp-purple/10 p-2 rounded-full mr-3">
                      <MapPin className="h-5 w-5 text-roadapp-purple" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">
                        Chennai, India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-roadapp-purple">Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-roadapp-purple/10 p-2 rounded-full mr-3">
                      <Clock className="h-5 w-5 text-roadapp-purple" />
                    </div>
                    <div>
                      <p className="font-medium">Hours of Operation</p>
                      <p className="text-gray-600">
                        Monday - Friday: 9AM - 5PM<br />
                        Saturday: 10AM - 2PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-roadapp-purple/10 p-2 rounded-full mr-3">
                      <Calendar className="h-5 w-5 text-roadapp-purple" />
                    </div>
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p className="text-gray-600">
                        24/7 for emergency road hazards<br />
                        Regular support during business hours
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t pt-4">
                  <Button variant="outline" className="w-full" onClick={() => window.location.href = '/'}>
                    Go to Anomaly Detection Tool
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
