import React from 'react';
import { Cookie, Settings, Eye, Target, Shield, Mail } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  const cookieTypes = [
    {
      title: 'Essential Cookies',
      icon: <Shield className="h-6 w-6" />,
      color: 'green',
      description: 'These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.',
      examples: ['Session management', 'Security features', 'Basic functionality']
    },
    {
      title: 'Performance Cookies',
      icon: <Eye className="h-6 w-6" />,
      color: 'blue',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: ['Analytics data', 'Usage patterns', 'Performance metrics']
    },
    {
      title: 'Functional Cookies',
      icon: <Settings className="h-6 w-6" />,
      color: 'purple',
      description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences and choices.',
      examples: ['User preferences', 'Language settings', 'Customization options']
    },
    {
      title: 'Marketing Cookies',
      icon: <Target className="h-6 w-6" />,
      color: 'orange',
      description: 'These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.',
      examples: ['Ad targeting', 'Campaign tracking', 'Behavioral data']
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        icon: 'text-green-600',
        dot: 'bg-green-600'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        icon: 'text-blue-600',
        dot: 'bg-blue-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800',
        icon: 'text-purple-600',
        dot: 'bg-purple-600'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-800',
        icon: 'text-orange-600',
        dot: 'bg-orange-600'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
            <Cookie className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cookie <span className="text-yellow-600">Policy</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Learn about how we use cookies to improve your experience on our website and protect your privacy.
          </p>
          <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            Last updated: March 15, 2024
          </div>
        </div>

        {/* What Are Cookies Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <section className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mr-4">
                <Cookie className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm text-yellow-600 font-medium">Introduction</div>
                <h2 className="text-2xl font-bold text-gray-900">What Are Cookies?</h2>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <p className="text-yellow-800 text-lg leading-relaxed">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our service. Think of them as helpful digital notes that make 
                your browsing experience smoother and more personalized.
              </p>
            </div>
          </section>
        </div>

        {/* Cookie Types */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            <p className="text-gray-600">We use different types of cookies for various purposes to enhance your experience</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie, index) => {
              const colors = getColorClasses(cookie.color);
              return (
                <div key={index} className={`${colors.bg} ${colors.border} border p-6 rounded-lg`}>
                  <div className="flex items-center mb-4">
                    <div className={`${colors.icon} mr-3`}>{cookie.icon}</div>
                    <h3 className={`text-xl font-semibold ${colors.text}`}>{cookie.title}</h3>
                  </div>
                  <p className={`${colors.text} mb-4`}>{cookie.description}</p>
                  <div>
                    <h4 className={`font-medium ${colors.text} mb-2`}>Examples:</h4>
                    <ul className="space-y-1">
                      {cookie.examples.map((example, idx) => (
                        <li key={idx} className={`flex items-center ${colors.text}`}>
                          <div className={`h-2 w-2 ${colors.dot} rounded-full mr-2`}></div>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How We Use Cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <section className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mr-4">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-purple-600 font-medium">Usage</div>
                <h2 className="text-2xl font-bold text-gray-900">How We Use Cookies</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Understand Usage</h4>
                    <p className="text-gray-600 text-sm">Analyze how you interact with our website</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Remember Preferences</h4>
                    <p className="text-gray-600 text-sm">Save your settings and preferences</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Improve Services</h4>
                    <p className="text-gray-600 text-sm">Enhance our website and services</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Relevant Advertising</h4>
                    <p className="text-gray-600 text-sm">Show you more relevant content and ads</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Security</h4>
                    <p className="text-gray-600 text-sm">Ensure website security and prevent fraud</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Performance</h4>
                    <p className="text-gray-600 text-sm">Monitor and improve website performance</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Managing Cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <section className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-blue-600 font-medium">Control</div>
                <h2 className="text-2xl font-bold text-gray-900">Managing Your Cookie Preferences</h2>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">You have control over cookies</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Settings className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-blue-900 mb-2">Browser Settings</h4>
                  <p className="text-blue-800 text-sm">Modify your browser settings to accept or reject cookies</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-blue-900 mb-2">Third-party Tools</h4>
                  <p className="text-blue-800 text-sm">Use various tools to manage cookies across all websites</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Cookie className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-blue-900 mb-2">Our Consent Tool</h4>
                  <p className="text-blue-800 text-sm">Adjust your preferences using our cookie consent banner</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Third-Party Cookies */}
        <div className="max-w-4xl mx-auto mb-12">
          <section className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mr-4">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-orange-600 font-medium">External</div>
                <h2 className="text-2xl font-bold text-gray-900">Third-Party Cookies</h2>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
              <p className="text-orange-800 mb-4">
                Some cookies are placed by third-party services that appear on our pages. We do not control 
                these third-party cookies and recommend reviewing their privacy policies.
              </p>
              <div className="bg-orange-100 p-4 rounded">
                <p className="text-orange-900 font-medium text-sm">
                  Note: Third-party cookies are governed by the respective third party's privacy policy, 
                  not this Cookie Policy.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <section className="bg-yellow-600 text-white rounded-xl p-8">
          <div className="text-center">
            <Mail className="h-12 w-12 text-yellow-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Questions About Our Cookie Policy?</h2>
            <p className="text-yellow-100 mb-6">
              If you have any questions about our Cookie Policy, we're here to help clarify things for you.
            </p>
            <div className="bg-yellow-500 rounded-lg p-4 inline-block">
              <p className="font-medium">Contact Information</p>
              <p className="text-yellow-100">Email: info.kubercab@gmail.com</p>
              <p className="text-yellow-100">Address: Duffnala, Shahibag, Ahmedabad, Gujarat 380004</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookiePolicyPage;