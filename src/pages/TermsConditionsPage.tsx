import React from 'react';
import { FileText, Users, CreditCard, Shield, AlertTriangle, Scale, Mail } from 'lucide-react';

const TermsConditionsPage: React.FC = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <FileText className="h-6 w-6" />,
      content: (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Scale className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-blue-900">Legal Agreement</h3>
          </div>
          <p className="text-blue-800">
            By accessing or using Kuber.cab's services, you agree to be bound by these Terms and Conditions. 
            If you disagree with any part of the terms, you may not access the service.
          </p>
        </div>
      )
    },
    {
      id: 'service-use',
      title: 'Use of Service',
      icon: <Users className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-600">
            You agree to use the service in accordance with all applicable laws and regulations. You must:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                <div className="h-2 w-2 bg-green-600 rounded-full mr-2"></div>
                Requirements
              </h4>
              <ul className="space-y-2 text-green-800">
                <li>• Be at least 18 years old to use the service</li>
                <li>• Provide accurate and complete information</li>
                <li>• Maintain the security of your account</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                <div className="h-2 w-2 bg-red-600 rounded-full mr-2"></div>
                Prohibited Activities
              </h4>
              <ul className="space-y-2 text-red-800">
                <li>• Not use the service for illegal purposes</li>
                <li>• Not interfere with the service's operation</li>
                <li>• Not violate any applicable laws or regulations</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'booking-cancellation',
      title: 'Booking and Cancellation',
      icon: <AlertTriangle className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Important Booking Information</h4>
            <p className="text-yellow-800">When booking a ride through Kuber.cab:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Availability</h5>
                  <p className="text-gray-600 text-sm">All bookings are subject to driver availability</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Fare Estimates</h5>
                  <p className="text-gray-600 text-sm">Fare estimates are approximate and actual fares may vary</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <div className="h-3 w-3 bg-orange-600 rounded-full"></div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Cancellation Fees</h5>
                  <p className="text-gray-600 text-sm">Cancellation fees may apply as per our cancellation policy</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <div className="h-3 w-3 bg-orange-600 rounded-full"></div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Punctuality</h5>
                  <p className="text-gray-600 text-sm">Users must be present at the pickup location on time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'payment-terms',
      title: 'Payment Terms',
      icon: <CreditCard className="h-6 w-6" />,
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Information
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-purple-900 mb-2">Currency & Methods</h5>
                <ul className="space-y-1 text-purple-800">
                  <li>• All fares must be paid in Indian Rupees (₹)</li>
                  <li>• UPI payments accepted</li>
                  <li>• Credit/Debit cards accepted</li>
                  <li>• Cash payments to drivers</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-purple-900 mb-2">Additional Charges</h5>
                <ul className="space-y-1 text-purple-800">
                  <li>• Waiting time charges may apply</li>
                  <li>• Route change fees possible</li>
                  <li>• Surge pricing during peak hours</li>
                  <li>• Toll charges as applicable</li>
                </ul>
              </div>
            </div>
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Scale className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & <span className="text-blue-700">Conditions</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Please read these terms carefully before using our services. They govern your use of Kuber.cab.
          </p>
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Last updated: March 15, 2024
          </div>
        </div>

        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Safe & Secure</h3>
              <p className="text-gray-600 text-sm">Your safety is our priority</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Fair Terms</h3>
              <p className="text-gray-600 text-sm">Transparent and fair policies</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Clear Guidelines</h3>
              <p className="text-gray-600 text-sm">Easy to understand terms</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                  <div className="text-blue-600">{section.icon}</div>
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-medium">Article {index + 1}</div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
              </div>
              {section.content}
            </section>
          ))}

          {/* User Responsibilities */}
          <section className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-blue-600 font-medium">Article 5</div>
                <h2 className="text-2xl font-bold text-gray-900">User Responsibilities</h2>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-900 mb-4">As a Kuber.cab user, you are responsible for:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center text-orange-800">
                    <div className="h-2 w-2 bg-orange-600 rounded-full mr-3"></div>
                    Maintaining appropriate behavior during rides
                  </div>
                  <div className="flex items-center text-orange-800">
                    <div className="h-2 w-2 bg-orange-600 rounded-full mr-3"></div>
                    Following safety guidelines and protocols
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-orange-800">
                    <div className="h-2 w-2 bg-orange-600 rounded-full mr-3"></div>
                    Providing accurate pickup and drop-off locations
                  </div>
                  <div className="flex items-center text-orange-800">
                    <div className="h-2 w-2 bg-orange-600 rounded-full mr-3"></div>
                    Reporting any issues or concerns promptly
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-red-600 font-medium">Article 6</div>
                <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <p className="text-red-800">
                Kuber.cab shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                resulting from your use or inability to use the service. Our liability is limited to the maximum extent 
                permitted by applicable law.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-blue-700 text-white rounded-xl p-8">
            <div className="text-center">
              <Mail className="h-12 w-12 text-blue-200 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
              <p className="text-blue-100 mb-6">
                If you have any questions about these Terms and Conditions, please don't hesitate to contact us.
              </p>
              <div className="bg-blue-600 rounded-lg p-4 inline-block">
                <p className="font-medium">Contact Information</p>
                <p className="text-blue-100">Email: info.kubercab@gmail.com</p>
                <p className="text-blue-100">Address: Duffnala, Shahibag, Ahmedabad, Gujarat 380004</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;