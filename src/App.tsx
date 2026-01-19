import React from 'react';
import { Menu, X, FileText, Brain, Scale, MessageSquare, Users, Shield, BookOpen, ChevronRight, ArrowRight, Linkedin, Mail, Globe, Bot, Gavel, FileCheck, ScrollText, Network, Briefcase, Check, Phone, MapPin, Clock, Star, Award, BarChart } from 'lucide-react';
import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthModal } from './components/AuthModal';
import { DocumentAnalysis } from './components/DocumentAnalysis';
import { DocumentGeneration } from './components/DocumentGeneration';
import { ExpertNetwork } from './components/ExpertNetwork';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signin' as 'signin' | 'signup' });

  const { user, signOut } = useAuth();

  const features = [
    { title: "AI Document Analysis", description: "Instantly analyze legal documents with AI to extract key information and insights.", icon: <FileText className="w-6 h-6" /> },
    { title: "Document Generation", description: "Access a vast database of case law and precedents to strengthen your legal arguments.", icon: <Gavel className="w-6 h-6" /> },
    { title: "Expert Network", description: "Connect with a network of legal experts and consultants for specialized advice and support.", icon: <Users className="w-6 h-6" /> },
    { title: "Contract Review", description: "Automate contract review to identify potential risks and ensure compliance.", icon: <FileCheck className="w-6 h-6" /> },
    { title: "Legal Research", description: "Conduct comprehensive legal research with AI-powered tools that understand context and relevance.", icon: <BookOpen className="w-6 h-6" /> },
    { title: "Compliance Monitoring", description: "Stay up-to-date with regulatory changes and ensure your practice remains compliant.", icon: <Shield className="w-6 h-6" /> }
  ];

  const stats = [
    { number: "98%", label: "Client Satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: "50K+", label: "Documents Processed", icon: <FileText className="w-6 h-6" /> },
    { number: "200+", label: "Law Firms", icon: <Briefcase className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Clock className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      quote: "Lexify has revolutionized how we handle legal documents. The AI-powered analysis saves us countless hours.",
      author: "Sarah Chen",
      role: "Senior Partner, Chen & Associates",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "The accuracy and speed of document processing have significantly improved our firm's efficiency.",
      author: "Michael Rodriguez",
      role: "Legal Director, Global Law Partners",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "Exceptional AI capabilities combined with intuitive interface. A game-changer for legal tech.",
      author: "Emily Thompson",
      role: "Tech Lead, Legal Innovation Hub",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small legal practices",
      monthlyPrice: 8299,
      yearlyPrice: 82990,
      features: [
        "AI Document Analysis (up to 100 pages/month)",
        "Basic Case Law Access",
        "Email Support",
        "1 User License"
      ]
    },
    {
      name: "Professional",
      description: "Ideal for growing law firms",
      monthlyPrice: 16599,
      yearlyPrice: 165990,
      features: [
        "AI Document Analysis (up to 500 pages/month)",
        "Advanced Case Law Access",
        "Priority Support",
        "5 User Licenses",
        "Contract Review Automation"
      ]
    },
    {
      name: "Enterprise",
      description: "For large legal organizations",
      monthlyPrice: 33199,
      yearlyPrice: 331990,
      features: [
        "Unlimited AI Document Analysis",
        "Full Case Law Database Access",
        "24/7 Priority Support",
        "Unlimited User Licenses",
        "Custom AI Model Training",
        "API Access"
      ]
    }
  ];

  const AboutPage = () => (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Lexify</h2>
          <p className="mt-4 text-xl text-gray-500">Transforming legal work through artificial intelligence</p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="mt-4 text-lg text-gray-500">
                At Lexify, we're committed to revolutionizing the legal industry through cutting-edge AI technology. 
                Our mission is to empower legal professionals with tools that enhance efficiency, accuracy, and insight.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              <p className="mt-4 text-lg text-gray-500">
                We envision a future where AI and human expertise work seamlessly together, 
                making legal services more accessible, efficient, and effective for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ServicesPage = () => (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-xl text-gray-500">Comprehensive legal solutions powered by AI</p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#0e7b7f] text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-4 text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PricingPage = () => (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Pricing Plans</h2>
          <p className="mt-4 text-xl text-gray-500">Choose the perfect plan for your needs</p>
          
          <div className="mt-6 flex justify-center">
            <div className="relative rounded-full p-0.5 bg-gray-200">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`relative rounded-full px-4 py-2 text-sm font-medium ${
                  billingPeriod === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`relative rounded-full px-4 py-2 text-sm font-medium ${
                  billingPeriod === 'yearly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-700'
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{(billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice).toLocaleString()}
                  </span>
                  <span className="text-gray-500">/{billingPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                </p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-[#0e7b7f]" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full bg-[#0e7b7f] text-white rounded-md py-2 px-4 hover:bg-[#0a6266] transition-colors">
                  {user ? 'Get Started' : 'Sign Up'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-xl text-gray-500">Get in touch with our team</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0e7b7f] focus:ring-[#0e7b7f]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0e7b7f] focus:ring-[#0e7b7f]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0e7b7f] focus:ring-[#0e7b7f]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0e7b7f] text-white rounded-md py-2 px-4 hover:bg-[#0a6266] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-[#0e7b7f]" />
                <span className="ml-3 text-gray-500">123 Legal Street, Tech City, TC 12345</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-[#0e7b7f]" />
                <span className="ml-3 text-gray-500">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-[#0e7b7f]" />
                <span className="ml-3 text-gray-500">contact@lexify.ai</span>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Office Hours</h3>
                <p className="mt-2 text-gray-500">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-500">Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <>
      {/* Hero Section */}
      <div className="relative bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your Legal</span>
                  <span className="block text-[#74cbce]">Work with AI</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Revolutionize your legal practice with AI-powered document analysis, case law insights, and expert connections.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button 
                      onClick={() => user ? setCurrentPage('document-analysis') : setAuthModal({ isOpen: true, mode: 'signup' })}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0e7b7f] hover:bg-[#309599] md:py-4 md:text-lg md:px-10"
                    >
                      {user ? 'Dashboard' : 'Get Started'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('contact');
                    }} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#74cbce] bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Legal AI"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#0e7b7f] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white">{stat.number}</div>
                <div className="mt-2 text-sm text-[#74cbce]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#0e7b7f] font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              AI-Powered Legal Solutions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Streamline your legal work with our comprehensive suite of AI tools and services.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="relative group">
                  <div className="flex items-center space-x-4 p-6 bg-white rounded-lg border border-gray-200 hover:border-[#74cbce] transition-all duration-300 hover:shadow-lg">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#050505] text-[#74cbce]">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#0e7b7f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Trusted by Leading Legal Professionals
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              See what our clients have to say about Lexify
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.image}
                      alt={testimonial.author}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <blockquote>
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#050505] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0e7b7f] rounded-2xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to transform your</span>
                  <span className="block">legal practice?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-[#74cbce]">
                  Start your free trial today and experience the power of AI in legal work.
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('pricing');
                  }}
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-[#0e7b7f] hover:bg-gray-50"
                >
                  View Pricing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-[#050505] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* ... [Previous Quick Links content remains unchanged] ... */}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" className="text-gray-400 hover:text-[#74cbce]">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#74cbce]">
                <Mail className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#74cbce]">
                <Globe className="h-6 w-6" />
              </a>
            </div>
            <p className="text-gray-400">© 2025 Lexify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#050505] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Bot className="h-8 w-8 text-[#74cbce]" />
                <span className="ml-2 text-xl font-bold">Lexify</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('home');
                  }}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    currentPage === 'home' ? 'text-[#74cbce] border-b-2 border-[#74cbce]' : 'text-gray-300 hover:text-[#74cbce]'
                  }`}
                >
                  Home
                </a>
                {user && (
                  <>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage('document-analysis');
                      }}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        currentPage === 'document-analysis' ? 'text-[#74cbce] border-b-2 border-[#74cbce]' : 'text-gray-300 hover:text-[#74cbce]'
                      }`}
                    >
                      Document Analysis
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage('document-generation');
                      }}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        currentPage === 'document-generation' ? 'text-[#74cbce] border-b-2 border-[#74cbce]' : 'text-gray-300 hover:text-[#74cbce]'
                      }`}
                    >
                      Document Generation
                    </a>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage('expert-network');
                      }}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        currentPage === 'expert-network' ? 'text-[#74cbce] border-b-2 border-[#74cbce]' : 'text-gray-300 hover:text-[#74cbce]'
                      }`}
                    >
                      Expert Network
                    </a>
                  </>
                )}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('about');
                  }}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    currentPage === 'about' ? 'text-[#74cbce] border-b-2 border-[#74cbce]' : 'text-gray-300 hover:text-[#74cbce]'
                  }`}
                >
                  About
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('services');
                  }}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    currentPage === 'services' ? 'text-[#74cbce] border-b-2 border-[#74cbce]' : 'text-gray-300 hover:text-[#74cbce]'
                  }`}
                >
                  Services
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('pricing');
                  }}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    currentPage === 'pricing' ? 'text-[#74cbce] border-b-2 border-[#74cbce]' : 'text-gray-300 hover:text-[#74cbce]'
                  }`}
                >
                  Pricing
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage('contact');
                  }}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    currentPage === 'contact' ? 'text-[#74cbce] border-b-2 border-[#74cbce]' : 'text-gray-300 hover:text-[#74cbce]'
                  }`}
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center">
              {!user ? (
                <div className="flex space-x-4">
                  <button
                    onClick={() => setAuthModal({ isOpen: true, mode: 'signin' })}
                    className="text-gray-300 hover:text-[#74cbce] px-3 py-2 text-sm font-medium"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                    className="bg-[#0e7b7f] text-white px-4 py-2 rounded-md hover:bg-[#0a6266] text-sm font-medium"
                  >
                    Sign up
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300 text-sm">
                    Welcome, {user.name || user.email}
                  </span>
                  <button
                    onClick={signOut}
                    className="text-gray-300 hover:text-[#74cbce] px-3 py-2 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', ...(user ? ['document-analysis', 'document-generation', 'expert-network'] : []), 'about', 'services', 'pricing', 'contact'].map((page) => (
                <a
                  key={page}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    currentPage === page
                      ? 'text-white bg-gray-900'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </a>
              ))}
              {!user && (
                <div className="px-3 py-2 space-y-2">
                  <button
                    onClick={() => {
                      setAuthModal({ isOpen: true, mode: 'signin' });
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-300 hover:text-white"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      setAuthModal({ isOpen: true, mode: 'signup' });
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left bg-[#0e7b7f] text-white px-3 py-2 rounded-md"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'document-analysis' && user && <DocumentAnalysis />}
      {currentPage === 'document-generation' && user && <DocumentGeneration />}
      {currentPage === 'expert-network' && user && <ExpertNetwork />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'services' && <ServicesPage />}
      {currentPage === 'pricing' && <PricingPage />}
      {currentPage === 'contact' && <ContactPage />}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        mode={authModal.mode}
        onModeChange={(mode) => setAuthModal({ ...authModal, mode })}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;