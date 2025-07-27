import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Shield, 
  TrendingUp, 
  Package, 
  IndianRupee,
  Clock,
  Star,
  CheckCircle,
  Eye,
  MapPin,
  Award,
  Users,
  BarChart3,
  Truck,
  CreditCard,
  ArrowRight
} from 'lucide-react';

const VendorPage = () => {
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
      icon: Shield,
      title: "Verified Suppliers Only",
      description: "Every supplier on our platform undergoes rigorous verification including GSTIN, business licenses, and quality checks. No more worrying about fraudulent sellers.",
      color: "emerald"
    },
    {
      icon: TrendingUp,
      title: "Dynamic Trust Scores",
      description: "Our AI-powered Trust Engine gives you instant visibility into supplier reliability through real-time scoring based on performance, reviews, and fulfillment history.",
      color: "blue"
    },
    {
      icon: IndianRupee,
      title: "Transparent Bulk Pricing",
      description: "See clear tiered pricing for different quantities. Know exactly how much you save with bulk orders - no hidden costs or surprise charges.",
      color: "purple"
    },
    {
      icon: Eye,
      title: "Photo-Based Reviews",
      description: "Make informed decisions with visual proof. See actual photos of products from other vendors who've purchased from the same suppliers.",
      color: "orange"
    },
    {
      icon: Search,
      title: "Smart Product Discovery",
      description: "Find exactly what you need with advanced search and filtering. Discover new products and suppliers that match your business requirements.",
      color: "green"
    },
    {
      icon: Clock,
      title: "Time-Saving Efficiency",
      description: "Skip the crowded wholesale markets. Browse, compare, and order from thousands of suppliers from the comfort of your store.",
      color: "red"
    }
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Track your purchasing patterns, identify cost-saving opportunities, and make data-driven inventory decisions."
    },
    {
      icon: Truck,
      title: "Integrated Logistics",
      description: "Seamless delivery tracking and coordination with trusted logistics partners for timely deliveries."
    },
    {
      icon: CreditCard,
      title: "Flexible Payment Options",
      description: "Multiple payment methods including credit terms, UPI, and digital wallets for your convenience."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with other vendors, share experiences, and learn from a thriving community of business owners."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      business: "Kumar General Store, Mumbai",
      quote: "VyaparSetu transformed my business. I can now source quality products at better prices without leaving my store. The trust scores help me choose reliable suppliers every time.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      business: "Sharma Kirana, Delhi",
      quote: "The photo reviews are a game-changer. I can see exactly what I'm buying before placing orders. No more surprises or quality issues.",
      rating: 5
    },
    {
      name: "Mohammed Ali",
      business: "City Mart, Bangalore",
      quote: "Bulk pricing transparency helped me increase my margins significantly. I save both time and money with VyaparSetu's efficient platform.",
      rating: 5
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
              <a href="/vendors" className="text-emerald-600 font-medium"><a href="/vendor">For Vendors</a></a>
              <a href="/suppliers" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"><a href="/supplier">For Suppliers</a></a>
              <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"><a href="/about">About</a></a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Empower Your <span className="text-emerald-600">Retail Business</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of successful vendors who trust VyaparSetu to source quality products from verified suppliers at transparent prices.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">50,000+</div>
                  <div className="text-sm text-gray-600">Verified Suppliers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2L+</div>
                  <div className="text-sm text-gray-600">Happy Vendors</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-emerald-600 mr-2" />
                    <span className="font-semibold text-gray-900">Verified Supplier</span>
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    Trust Score: 4.8
                  </div>
                </div>
                <img 
                  src="https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Quality Products" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Regular Price:</span>
                    <div className="flex items-center font-semibold text-gray-900">
                      <IndianRupee className="w-4 h-4" />
                      <span>2,500</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-600">Bulk Price (10+ units):</span>
                    <div className="flex items-center font-semibold text-emerald-600">
                      <IndianRupee className="w-4 h-4" />
                      <span>2,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How VyaparSetu Helps Vendors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How VyaparSetu Transforms Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From sourcing challenges to business growth - we've got you covered with innovative solutions designed specifically for Indian vendors.
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

      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Beyond sourcing - comprehensive tools to grow your business
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
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Vendors
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from business owners who transformed their operations with VyaparSetu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
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

      {/* The VyaparSetu Advantage */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              The VyaparSetu Advantage
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Why thousands of vendors choose us as their trusted business partner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Verified</h3>
              <p className="text-slate-300">Every supplier is thoroughly verified and continuously monitored</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-slate-300">Round-the-clock customer support for all your business needs</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-slate-300">Quality assurance backed by our comprehensive review system</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Business Growth</h3>
              <p className="text-slate-300">Tools and insights to help you grow your business sustainably</p>
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
                Empowering Indian vendors with trusted suppliers, transparent pricing, and innovative business solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Vendors</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Support</a></li>
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

export default VendorPage;