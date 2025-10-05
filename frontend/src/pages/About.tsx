import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Patients" },
    { icon: Award, value: "100+", label: "Expert Doctors" },
    { icon: Heart, value: "50,000+", label: "Appointments" },
    { icon: Clock, value: "24/7", label: "Support" },
  ];

  return (
    <div>
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-50 to-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                About MedCare
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your trusted partner in healthcare, connecting patients with the
                best medical professionals
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="	https://qeohchpepnnqridc.manus-preview.space/assets/about-team-DtCySkLj.jpg"
                  alt="Medical Team"
                  className="rounded-2xl shadow-xl w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  At MedCare, we believe that everyone deserves access to
                  quality healthcare. Our mission is to bridge the gap between
                  patients and healthcare providers by offering a seamless,
                  user-friendly platform for booking medical appointments.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We work with a network of highly qualified and experienced
                  doctors across various specialties to ensure that you receive
                  the best possible care. Our platform makes it easy to find the
                  right doctor, book appointments at your convenience, and
                  manage your healthcare journey all in one place.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  With MedCare, you can take control of your health and
                  well-being. We are committed to providing exceptional service,
                  maintaining the highest standards of patient care, and
                  continuously improving our platform to meet your needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="bg-teal-100 text-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon size={32} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {stat.value}
                      </h3>
                      <p className="text-gray-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Patient-Centered Care
                  </h3>
                  <p className="text-gray-600">
                    We put patients first in everything we do, ensuring that
                    your health and well-being are our top priorities.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Quality & Excellence
                  </h3>
                  <p className="text-gray-600">
                    We maintain the highest standards of medical care by
                    partnering with qualified and experienced healthcare
                    professionals.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Innovation
                  </h3>
                  <p className="text-gray-600">
                    We leverage technology to make healthcare more accessible,
                    convenient, and efficient for everyone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
