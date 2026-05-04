import React from 'react';
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      id: 'information-collect',
      title: 'Information We Collect',
      icon: <FileText className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              Personal Information
            </h3>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-purple-600 rounded-full mr-3"></div>
                  Name, email address, and phone number
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-purple-600 rounded-full mr-3"></div>
                  Profile information and profile picture
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-purple-600 rounded-full mr-3"></div>
                  Payment information and transaction history
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-purple-600 rounded-full mr-3"></div>
                  Location data when using our services
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-purple-600 rounded-full mr-3"></div>
                  Communication preferences
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="h-2 w-2 bg-purple-600 rounded-full mr-3"></div>
                  Device and usage information
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <Eye className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">We use the collected information to:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-purple-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Service Operations</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Provide, maintain, and improve our services</li>
                <li>• Process your transactions and send related information</li>
                <li>• Connect riders with drivers</li>
              </ul>
            </div>
            <div className="bg-white border border-purple-100 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Communication & Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Send you technical notices and support messages</li>
                <li>• Communicate about products and services</li>
                <li>• Monitor and analyze usage patterns</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: <Users className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-yellow-800 font-medium mb-2">Important Notice</p>
            <p className="text-yellow-700">We may share your personal information only in specific circumstances:</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Service Providers</h4>
                <p className="text-gray-600">Trusted partners who help us operate our service</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Legal Requirements</h4>
                <p className="text-gray-600">Law enforcement agencies when required by law</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Service Functionality</h4>
                <p className="text-gray-600">Other users as part of the ride-sharing service</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock className="h-6 w-6" />,
      content: (
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-green-900">Your Data is Protected</h3>
          </div>
          <p className="text-green-800 mb-4">
            We implement industry-standard security measures to protect your personal information, including:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-green-700">
                <div className="h-2 w-2 bg-green-600 rounded-full mr-3"></div>
                End-to-end encryption
              </div>
              <div className="flex items-center text-green-700">
                <div className="h-2 w-2 bg-green-600 rounded-full mr-3"></div>
                Secure data transmission
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-green-700">
                <div className="h-2 w-2 bg-green-600 rounded-full mr-3"></div>
                Regular security audits
              </div>
              <div className="flex items-center text-green-700">
                <div className="h-2 w-2 bg-green-600 rounded-full mr-3"></div>
                Access controls and monitoring
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-green-100 rounded">
            <p className="text-green-800 text-sm">
              <strong>Note:</strong> While we implement robust security measures, no method of transmission over the Internet is 100% secure.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy <span className="text-purple-700">Policy</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            Last updated: March 15, 2024
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="text-purple-600 mr-3">{section.icon}</div>
                  <span className="text-sm font-medium text-gray-900">{section.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mr-4">
                  <div className="text-purple-600">{section.icon}</div>
                </div>
                <div>
                  <div className="text-sm text-purple-600 font-medium">Section {index + 1}</div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
              </div>
              {section.content}
            </section>
          ))}

          {/* Your Rights Section */}
          <section className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-purple-600 font-medium">Section 5</div>
                <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">You have control over your data</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center text-blue-800">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    Access your personal information
                  </div>
                  <div className="flex items-center text-blue-800">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    Correct inaccurate information
                  </div>
                  <div className="flex items-center text-blue-800">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    Request deletion of your information
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-blue-800">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    Object to processing of your information
                  </div>
                  <div className="flex items-center text-blue-800">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    Withdraw consent
                  </div>
                  <div className="flex items-center text-blue-800">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3"></div>
                    Data portability
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-purple-700 text-white rounded-xl p-8">
            <div className="text-center">
              <Mail className="h-12 w-12 text-purple-200 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
              <p className="text-purple-100 mb-6">
                If you have any questions about this Privacy Policy, we're here to help.
              </p>
              <div className="bg-purple-600 rounded-lg p-4 inline-block">
                <p className="font-medium">Contact Information</p>
                <p className="text-purple-100">Email: info.kubercab@gmail.com</p>
                <p className="text-purple-100">Address: Duffnala, Shahibag, Ahmedabad, Gujarat 380004</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;