import React from 'react';
import { Users, Award, Shield, Target, MapPin, Calendar, TrendingUp, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    { label: 'Active Users', value: '800K+', icon: Users, color: 'purple' },
    { label: 'Cities', value: '33', icon: MapPin, color: 'blue' },
    { label: 'Rides Completed', value: '3M+', icon: Award, color: 'green' },
    { label: 'Driver Partners', value: '25K+', icon: Shield, color: 'orange' },
  ];

  const timeline = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'Kuber.cab was founded with a vision to revolutionize urban transportation',
      icon: <Calendar className="h-6 w-6" />
    },
    {
      year: '2023',
      title: 'First City Launch',
      description: 'Successfully launched operations in Mumbai with 100+ drivers',
      icon: <MapPin className="h-6 w-6" />
    },
    {
      year: '2024',
      title: 'Multi-City Expansion',
      description: 'Expanded to 12+ cities across India with over 100K driver partners',
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      year: '2024',
      title: '10M+ Rides',
      description: 'Achieved milestone of 10 million completed rides with 4.8/5 rating',
      icon: <Award className="h-6 w-6" />
    }
  ];

  const team = [
    {
      name: 'Sarah Anderson',
      role: 'CEO & Co-founder',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: '15+ years of experience in transportation and technology sectors. Previously led operations at major ride-sharing companies.',
      linkedin: '#'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Former tech lead at leading ride-sharing companies. Expert in scalable systems and mobile app development.',
      linkedin: '#'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Expert in scaling operations across multiple cities. Previously managed logistics for major e-commerce platforms.',
      linkedin: '#'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Head of Driver Relations',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Passionate about driver welfare and community building. 10+ years in human resources and partner management.',
      linkedin: '#'
    }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safety First',
      description: 'Ensuring the safety and security of our riders and drivers is our top priority in everything we do.',
      color: 'green'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality service in every ride, every interaction, every day.',
      color: 'blue'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community',
      description: 'Building strong relationships with our riders, drivers, and the communities we serve.',
      color: 'purple'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Integrity',
      description: 'Operating with transparency, honesty, and ethical practices in all our business dealings.',
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: 'bg-purple-100 text-purple-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/kuber-cab-sb.png" 
                alt="Kuber.cab" 
                className="h-20 w-auto mr-4"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                About <span className="text-purple-700">Kuber.cab</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 mb-8">
              Revolutionizing urban mobility with technology-driven solutions that make transportation 
              accessible, reliable, and sustainable for everyone across India.
            </p>
            <div className="inline-block px-6 py-3 bg-purple-100 text-purple-700 rounded-full font-medium">
              Trusted by 1M+ riders across Gujarat & Rajasthan
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getColorClasses(stat.color)}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2023, Kuber.cab emerged from a simple yet powerful vision: to transform urban 
                    transportation and make it accessible to everyone. What started as a small operation in 
                    Mumbai has now grown into a trusted mobility partner across multiple metropolitan areas.
                  </p>
                  <p>
                    Our journey has been driven by continuous innovation, a customer-centric approach, and 
                    a commitment to creating positive impact in the communities we serve. We've built a 
                    platform that not only connects riders with reliable transportation but also creates 
                    economic opportunities for thousands of driver partners.
                  </p>
                  <p>
                    Today, we're proud to be one of the fastest-growing ride-hailing services in India, 
                    known for our reliability, safety standards, and innovative technology solutions that 
                    put people first.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Kuber.cab journey"
                  className="rounded-xl shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-purple-700 text-white p-6 rounded-lg shadow-lg">
                  <p className="text-lg font-semibold">Trusted by millions</p>
                  <p className="text-sm opacity-90">Making cities more accessible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-gray-600">Key milestones in our growth story</p>
            </div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <div className="text-purple-600">{item.icon}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-center mb-2">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mr-3">
                          {item.year}
                        </span>
                        <p className="text-gray-600">Duffnala, Shahibag<br />Ahmedabad, Gujarat 380004</p>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
              <p className="text-gray-600">Meet the passionate individuals driving our mission forward</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-purple-700 mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-gray-600">The principles that guide everything we do</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${getColorClasses(value.color)}`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Mission
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Be part of the transportation revolution. Whether as a rider, driver, or team member, 
              there's a place for you in the Kuber.cab family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors">
                Join as Driver
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-purple-600 transition-colors">
                View Careers
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;