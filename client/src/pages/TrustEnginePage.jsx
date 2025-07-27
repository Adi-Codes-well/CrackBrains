import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  TrendingUp, 
  Eye, 
  CheckCircle, 
  Star,
  Award,
  Users,
  BarChart3,
  Clock,
  Camera,
  FileCheck,
  Zap,
  Target,
  Lock,
  Verified,
  AlertTriangle,
  ThumbsUp
} from 'lucide-react';

const TrustEnginePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trustComponents = [
    {
      icon: Shield,
      title: "Platform Verification",
      description: "Every supplier undergoes rigorous document verification including GSTIN, business licenses, and quality certifications before joining our platform.",
      features: ["GSTIN Verification", "Business License Check", "Bank Account Validation", "Address Verification"],
      color: "emerald"
    },
    {
      icon: TrendingUp,
      title: "Dynamic Trust Score",
      description: "Our AI-powered algorithm continuously calculates trust scores based on multiple real-time factors to give you instant reliability insights.",
      features: ["Order Fulfillment Rate", "Customer Ratings", "Response Time", "Business History"],
      color: "blue"
    },
    {
      icon: Eye,
      title: "Photo-Based Reviews",
      description: "Visual proof of product quality through mandatory photo uploads with every review, ensuring complete transparency in the buying process.",
      features: ["Mandatory Photo Reviews", "Quality Verification", "Visual Evidence", "Community Validation"],
      color: "purple"
    }
  ];

  const trustFactors = [
    {
      icon: FileCheck,
      title: "Document Verification",
      weight: "25%",
      description: "Comprehensive verification of business documents and licenses"
    },
    {
      icon: Star,
      title: "Customer Ratings",
      weight: "30%",
      description: "Average ratings from verified customers over time"
    },
    {
      icon: Clock,
      title: "Fulfillment History",
      weight: "20%",
      description: "On-time delivery and order completion rates"
    },
    {
      icon: Users,
      title: "Business Longevity",
      weight: "15%",
      description: "Years in business and platform engagement history"
    },
    {
      icon: ThumbsUp,
      title: "Community Feedback",
      weight: "10%",
      description: "Peer reviews and community recommendations"
    }
  ];

  const trustLevels = [
    {
      level: "New Supplier",
      score: "0.0 - 2.0",
      color: "bg-red-100 text-red-800",
      icon: AlertTriangle,
      description: "Recently joined, limited transaction history"
    },
    {
      level: "Developing Trust",
      score: "2.1 - 3.5",
      color: "bg-orange-100 text-orange-800",
      icon: TrendingUp,
      description: "Building reputation with consistent performance"
    },
    {
      level: "Trusted Supplier",
      score: "3.6 - 4.2",
      color: "bg-blue-100 text-blue-800",
      icon: Shield,
      description: "Reliable track record with good customer feedback"
    },
    {
      level: "Highly Trusted",
      score: "4.3 - 4.7",
      color: "bg-emerald-100 text-emerald-800",
      icon: Award,
      description: "Excellent performance with outstanding reviews"
    },
    {
      level: "Premium Verified",
      score: "4.8 - 5.0",
      color: "bg-purple-100 text-purple-800",
      icon: Verified,
      description: "Top-tier suppliers with exceptional quality standards"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Supplier Joins Platform",
      description: "New suppliers complete comprehensive verification process including document submission and business validation.",
      icon: FileCheck
    },
    {
      step: "2",
      title: "Initial Trust Score",
      description: "Based on verification status and business credentials, suppliers receive their initial trust score.",
      icon: BarChart3
    },
    {
      step: "3",
      title: "Real Transactions",
      description: "As suppliers fulfill orders, their performance data is continuously collected and analyzed.",
      icon: Target
    },
    {
      step: "4",
      title: "Customer Reviews",
      description: "Vendors leave detailed reviews with photos, providing visual proof of product quality and service.",
      icon: Camera
    },
    {
      step: "5",
      title: "Dynamic Updates",
      description: "Trust scores are updated in real-time based on new transactions, reviews, and performance metrics.",
      icon: Zap
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
              <a href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Home</a>
              <a href="/vendors" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">For Vendors</a>
              <a href="/suppliers" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">For Suppliers</a>
              <a href="/trust-engine" className="text-emerald-600 font-medium">Trust Engine</a>
              <a href="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              The <span className="text-emerald-600">Trust Engine</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
              Our revolutionary Trust Engine combines AI-powered algorithms, comprehensive verification, and community-driven reviews to create the most reliable B2B marketplace in India.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Verified Suppliers</div>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">Real-time</div>
                <div className="text-sm text-gray-600">Trust Scoring</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">Visual</div>
                <div className="text-sm text-gray-600">Proof Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Components */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Three Pillars of Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Trust Engine is built on three fundamental components that work together to ensure every transaction is transparent and reliable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trustComponents.map((component, index) => {
              const IconComponent = component.icon;
              const colorClasses = {
                emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
                blue: 'bg-blue-100 text-blue-600 border-blue-200',
                purple: 'bg-purple-100 text-purple-600 border-purple-200'
              };
              
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${colorClasses[component.color]}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{component.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{component.description}</p>
                  <ul className="space-y-2">
                    {component.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Score Calculation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How Trust Scores Are Calculated
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI algorithm considers multiple factors to generate dynamic trust scores that reflect real supplier reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {trustFactors.map((factor, index) => {
              const IconComponent = factor.icon;
              return (
                <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 mb-2">{factor.weight}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{factor.title}</h3>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trust Score Levels
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding what each trust score level means for your business decisions.
            </p>
          </div>
          
          <div className="space-y-6">
            {trustLevels.map((level, index) => {
              const IconComponent = level.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{level.level}</h3>
                        <p className="text-gray-600">{level.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${level.color}`}>
                        {level.score}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How the Trust Engine Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A step-by-step look at how we build and maintain trust scores across our platform.
            </p>
          </div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {howItWorks.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="text-center relative animate-fade-in-up" style={{animationDelay: `${index * 0.2}s`}}>
                    <div className="bg-white border-4 border-emerald-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                      <IconComponent className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Trust Engine Matters
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              The Trust Engine transforms B2B commerce by eliminating uncertainty and building confidence in every transaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Reduced Risk</h3>
              <p className="text-emerald-100">Make informed decisions with comprehensive supplier insights</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Time Savings</h3>
              <p className="text-emerald-100">Skip lengthy due diligence with instant trust assessments</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Better Outcomes</h3>
              <p className="text-emerald-100">Higher success rates with verified, trusted suppliers</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
              <p className="text-emerald-100">Benefit from collective wisdom of thousands of vendors</p>
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
                Revolutionizing B2B commerce in India through our innovative Trust Engine and comprehensive marketplace platform.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Trust Engine</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Trust Levels</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Verification Process</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Photo Reviews</a></li>
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

export default TrustEnginePage;