import React from 'react';
import { Users, Award, Shield, Target } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Active Users', value: '1M+', icon: Users },
    { label: 'Cities', value: '12+', icon: Target },
    { label: 'Rides Completed', value: '10M+', icon: Award },
    { label: 'Driver Partners', value: '100K+', icon: Shield },
  ];

  const team = [
    {
      name: 'Sarah Anderson',
      role: 'CEO & Co-founder',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: '15+ years of experience in transportation and technology sectors.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Former tech lead at leading ride-sharing companies.'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Expert in scaling operations across multiple cities.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-purple-700">Kuber.cab</span>
          </h1>
          <p className="text-lg text-gray-600">
            Revolutionizing urban mobility with technology-driven solutions that make transportation accessible, reliable, and sustainable for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2023, Kuber.cab emerged from a simple vision: to transform urban transportation and make it accessible to everyone. What started as a small operation in one city has now grown into a trusted mobility partner across multiple metropolitan areas.
              </p>
              <p>
                Our journey has been driven by continuous innovation, customer-centric approach, and a commitment to creating positive impact in the communities we serve. We've built a platform that not only connects riders with reliable transportation but also creates economic opportunities for thousands of driver partners.
              </p>
              <p>
                Today, we're proud to be one of the fastest-growing ride-hailing services, known for our reliability, safety standards, and innovative technology solutions.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Kuber.cab journey"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-purple-700 text-white p-6 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">Trusted by millions</p>
              <p className="text-sm opacity-90">Making cities more accessible</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-purple-700" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-purple-700 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-purple-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety First</h3>
              <p className="text-gray-600">Ensuring the safety and security of our riders and drivers is our top priority.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Award className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">Committed to delivering the highest quality service in every ride.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Building strong relationships with our riders, drivers, and communities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;