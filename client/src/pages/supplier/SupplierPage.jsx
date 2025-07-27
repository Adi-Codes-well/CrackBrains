import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  TrendingUp, 
  Package, 
  IndianRupee,
  Globe,
  Star,
  CheckCircle,
  BarChart3,
  MapPin,
  Award,
  Zap,
  Target,
  Handshake,
  Truck,
  CreditCard
} from 'lucide-react';

const SupplierPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const benefits = [
    {
      icon: Users,
      title: "Access to 2L+ Active Vendors",
      description: "Connect with a vast network of verified vendors across India. Expand your customer base beyond geographical limitations and grow your business exponentially.",
      color: "emerald"
    },
    {
      icon: Shield,
      title: "Build Trust & Credibility",
      description: "Our verification process and Trust Engine help you establish credibility with potential customers. Verified suppliers get priority visibility and higher conversion rates.",
      color: "blue"
    },
    {
      icon: TrendingUp,
      title: "Increase Sales & Revenue",
      description: "Leverage our platform's reach to increase your sales volume. Our transparent pricing model and bulk order features help you maximize revenue per transaction.",
      color: "purple"
    },
    {
      icon: Globe,
      title: "Pan-India Market Reach",
      description: "Sell to vendors in every corner of India without setting up physical distribution networks. Our platform brings the entire Indian market to your doorstep.",
      color: "orange"
    },
    {
      icon: BarChart3,
      title: "Business Analytics & Insights",
      description: "Get detailed analytics on your sales performance, customer behavior, and market trends. Make data-driven decisions to optimize your business strategy.",
      color: "green"
    },
    {
      icon: Zap,
      title: "Streamlined Operations",
      description: "Automate order management, inventory tracking, and customer communication. Focus on your core business while we handle the operational complexities.",
      color: "red"
    }
  ];

  const features = [
    {
      icon: Target,
      title: "Smart Product Listing",
      description: "Create compelling product listings with multiple images, detailed descriptions, and tiered pricing to attract more customers."
    },
    {
      icon: Handshake,
      title: "Direct Customer Communication",
      description: "Build relationships with your customers through direct messaging and personalized service offerings."
    },
    {
      icon: Truck,
      title: "Integrated Logistics Support",
      description: "Access our network of logistics partners for efficient and cost-effective delivery solutions across India."
    },
    {
      icon: CreditCard,
      title: "Flexible Payment Solutions",
      description: "Offer multiple payment options to your customers including credit terms, digital payments, and instant settlements."
    }
  ];

  const successMetrics = [
    {
      value: "300%",
      label: "Average Sales Increase",
      description: "Suppliers see significant growth within 6 months"
    },
    {
      value: "15+",
      label: "New Cities Reached",
      description: "Expand to markets previously inaccessible"
    },
    {
      value: "85%",
      label: "Customer Retention",
      description: "High repeat purchase rates from satisfied vendors"
    },
    {
      value: "24hrs",
      label: "Average Response Time",
      description: "Quick customer query resolution"
    }
  ];

  const testimonials = [
    {
      name: "Amit Patel",
      business: "GoodGrain Wholesalers, Gujarat",
      quote: "VyaparSetu transformed our business completely. We went from serving 50 local vendors to over 2,000 vendors across 12 states. Our revenue has tripled in just one year.",
      rating: 5,
      trustScore: 4.8
    },
    {
      name: "Sunita Reddy",
      business: "SpiceKing Distributors, Andhra Pradesh",
      quote: "The Trust Engine helped us build credibility quickly. New customers trust us because of our verification and high trust score. Sales have never been better.",
      rating: 5,
      trustScore: 4.7
    },
    {
      name: "Rajesh Gupta",
      business: "TextileMart India, Punjab",
      quote: "The analytics dashboard gives us insights we never had before. We can now predict demand, optimize inventory, and serve our customers better.",
      rating: 5,
      trustScore: 4.9
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
              <a href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"><a href="/">Home</a></a>
              <a href="/vendors" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"><a href="/vendor">For Vendors</a></a>
              <a href="/suppliers" className="text-emerald-600 font-medium"><a href="/supplier">For Suppliers</a></a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"><a href="/about">About</a></a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Scale Your <span className="text-emerald-600">Supply Business</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join India's most trusted B2B marketplace and connect with millions of verified vendors. Grow your business with transparent pricing, verified customers, and powerful analytics.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2L+</div>
                  <div className="text-sm text-gray-600">Active Vendors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">₹500Cr+</div>
                  <div className="text-sm text-gray-600">Monthly Trade Volume</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Award className="w-6 h-6 text-emerald-600 mr-2" />
                    <span className="font-semibold text-gray-900">Premium Supplier</span>
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    Trust Score: 4.9
                  </div>
                </div>
                <img 
                  src="https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Supplier Dashboard" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Monthly Revenue:</span>
                    <div className="flex items-center font-semibold text-emerald-600">
                      <IndianRupee className="w-4 h-4" />
                      <span>2,45,680</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Customers:</span>
                    <span className="font-semibold text-gray-900">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cities Served:</span>
                    <span className="font-semibold text-gray-900">23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How VyaparSetu Helps Suppliers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How VyaparSetu Accelerates Your Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From local supplier to national distributor - we provide the platform, tools, and network to scale your business across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              const colorClasses = {
                emerald: 'bg-emerald-100 text-emerald-600',
                blue: 'bg-blue-100 text-blue-600',
                purple: 'bg-purple-100 text-purple-600',
                orange: 'bg-orange-100 text-orange-600',
                green: 'bg-green-100 text-green-600',
                red: 'bg-red-100 text-red-600'
              };
              
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${colorClasses[benefit.color]}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Proven Results for Our Suppliers
            </h2>
            <p className="text-xl text-emerald-100">
              Real metrics from suppliers who've transformed their business with VyaparSetu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl lg:text-5xl font-bold mb-2">{metric.value}</div>
                <div className="text-lg font-semibold mb-2">{metric.label}</div>
                <div className="text-emerald-100 text-sm">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Tools for Supplier Success
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage and grow your supply business efficiently
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-6 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Suppliers
            </h2>
            <p className="text-xl text-gray-600">
              Hear from suppliers who've scaled their business and increased revenue with VyaparSetu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                    Trust Score: {testimonial.trustScore}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The VyaparSetu Promise */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              The VyaparSetu Promise to Suppliers
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We're committed to your success with comprehensive support and innovative solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Customers</h3>
              <p className="text-slate-300">All vendors are verified to ensure legitimate business transactions</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Growth Support</h3>
              <p className="text-slate-300">Dedicated account managers to help you maximize your potential</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Onboarding</h3>
              <p className="text-slate-300">Quick setup process to get you selling within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Benefits</h3>
              <p className="text-slate-300">Exclusive features and priority support for verified suppliers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">VyaparSetu</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering Indian suppliers to reach millions of vendors through our trusted B2B marketplace platform.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Suppliers</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Getting Started</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing Plans</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Support Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Press</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 VyaparSetu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SupplierPage;