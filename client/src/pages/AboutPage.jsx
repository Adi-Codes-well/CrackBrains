import React, { useState, useEffect } from 'react';
import {
  Target,
  Users,
  Award,
  TrendingUp,
  Heart,
  Globe,
  Shield,
  Zap,
  Building,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Trust First",
      description: "We believe trust is the foundation of all successful business relationships. Our platform is built to foster transparency and reliability in every transaction."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our success comes from empowering the community of vendors and suppliers. We listen, learn, and evolve based on their needs and feedback."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously innovate to solve real problems faced by Indian businesses, leveraging technology to create meaningful solutions."
    },
    {
      icon: Heart,
      title: "Empowerment",
      description: "We're passionate about empowering small and medium businesses to compete and thrive in the digital economy."
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "The Vision",
      description: "VyaparSetu was conceived to solve the trust deficit in India's B2B marketplace, starting with extensive market research across 15 states."
    },
    {
      year: "2023",
      title: "Platform Launch",
      description: "Launched our MVP with 500 verified suppliers and 2,000 vendors, introducing the revolutionary Trust Engine to the Indian market."
    },
    {
      year: "2024",
      title: "Rapid Growth",
      description: "Scaled to 50,000+ suppliers and 200,000+ vendors across India, processing over ₹500 crores in monthly trade volume."
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Expanding to serve 1 million vendors with advanced AI features, fintech integration, and pan-India logistics network."
    }
  ];

  const team = [
    {
      name: "Ankit Kumar",
      role: "Founder & CEO",
      description: "A young entrepreneur with a vision to transform B2B commerce in India.",
      image: "https://via.placeholder.com/150"
    },
    {
      name: "Priya Patel",
      role: "Co-Founder & CTO",
      description: "Technology leader specializing in AI and machine learning, previously at leading fintech companies.",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      name: "Amit Kumar",
      role: "Head of Operations",
      description: "Supply chain expert with deep understanding of Indian wholesale markets and logistics networks.",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      name: "Sunita Reddy",
      role: "Head of Trust & Safety",
      description: "Former banking professional focused on risk management and verification systems for B2B platforms.",
      image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  const stats = [
    {
      icon: Users,
      value: "250K+",
      label: "Active Users",
      description: "Vendors and suppliers actively trading on our platform"
    },
    {
      icon: Building,
      value: "50K+",
      label: "Verified Suppliers",
      description: "Thoroughly verified and trusted business partners"
    },
    {
      icon: Globe,
      value: "28",
      label: "States Covered",
      description: "Pan-India presence connecting businesses nationwide"
    },
    {
      icon: TrendingUp,
      value: "₹500Cr+",
      label: "Monthly Volume",
      description: "Trade volume processed through our platform"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-emerald-600">VyaparSetu</h1>
              <span className="ml-2 text-sm text-gray-600 hidden sm:block">Business Bridge</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Home</Link>
              <Link to="/vendor" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">For Vendors</Link>
              <Link to="/supplier" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">For Suppliers</Link>
              <Link to="/trust-engine" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Trust Engine</Link>
              <Link to="/about" className="text-emerald-600 font-medium">About</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              About <span className="text-emerald-600">VyaparSetu</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              We're on a mission to transform B2B commerce in India by building trust, transparency, and efficiency into every business transaction. VyaparSetu means "Business Bridge" - connecting verified suppliers with trusted vendors across the nation.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-600">{stat.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="bg-emerald-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To democratize B2B commerce in India by creating a trusted, transparent, and efficient marketplace that empowers every vendor and supplier to grow their business without geographical or informational barriers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that trust is the cornerstone of successful business relationships. Through our innovative Trust Engine, we're eliminating the uncertainty and risk that has traditionally plagued B2B transactions in India.
              </p>
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To become India's most trusted B2B marketplace, where every business transaction is backed by transparency, verified quality, and mutual trust. We envision a future where geographical boundaries don't limit business opportunities.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By 2030, we aim to serve over 1 million vendors and connect them with verified suppliers across every corner of India, processing over ₹10,000 crores in annual trade volume while maintaining the highest standards of trust and quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide every decision we make and every feature we build at VyaparSetu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="bg-emerald-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id='Our Team' className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate leaders driving VyaparSetu's mission to transform B2B commerce in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-emerald-100"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-emerald-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Have questions about VyaparSetu? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Our Office</h3>
              <p className="text-emerald-100">
                VyaparSetu Technologies Pvt. Ltd.<br />
                Salt Lake, Kolkata<br />
                West Bengal, India - 700091
              </p>
            </div>

            <div className="text-center text-white">
              <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-emerald-100">
                General: hello@vyaparsetu.com<br />
                Support: support@vyaparsetu.com<br />
                Business: business@vyaparsetu.com
              </p>
            </div>

            <div className="text-center text-white">
              <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-emerald-100">
                Support: +91 9341089155<br />
                Business: +91 9431296664<br />
                Mon-Fri: 9 AM - 6 PM IST
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="bg-emerald-500 hover:bg-emerald-400 p-3 rounded-lg transition-colors">
                <Linkedin className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="bg-emerald-500 hover:bg-emerald-400 p-3 rounded-lg transition-colors">
                <Twitter className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="bg-emerald-500 hover:bg-emerald-400 p-3 rounded-lg transition-colors">
                <Instagram className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">VyaparSetu</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Transforming B2B commerce in India through trust, transparency, and technology. Building bridges between businesses nationwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#Our Team" className="hover:text-emerald-400 transition-colors">Our Team</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>

              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 VyaparSetu Technologies Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;