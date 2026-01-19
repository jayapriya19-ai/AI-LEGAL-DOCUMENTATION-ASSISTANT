import React, { useState } from 'react';
import { Search, Star, MapPin, Phone, Mail, MessageSquare, Filter, Users, Award, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { localDB } from '../lib/auth';

interface Expert {
  id: number;
  name: string;
  title: string;
  specialization: string[];
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  hourlyRate: number;
  image: string;
  verified: boolean;
  languages: string[];
  description: string;
}

export const ExpertNetwork: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [connectionMessage, setConnectionMessage] = useState('');
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      loadConnections();
    }
  }, [user]);

  const loadConnections = async () => {
    if (!user) return;
    
    const { data, error } = await localDB.getExpertConnections(user.id);
    if (error) {
      console.error('Error loading connections:', error);
    } else {
      setConnections(data || []);
    }
  };

  const experts: Expert[] = [
    {
      id: 1,
      name: "Adv. Priya Sharma",
      title: "Senior Advocate, Supreme Court",
      specialization: ["Corporate Law", "Contract Law", "Mergers & Acquisitions"],
      experience: 15,
      rating: 4.9,
      reviews: 127,
      location: "New Delhi",
      hourlyRate: 5000,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      verified: true,
      languages: ["English", "Hindi"],
      description: "Specialized in corporate law with extensive experience in M&A transactions and contract negotiations."
    },
    {
      id: 2,
      name: "Justice (Retd.) Rajesh Kumar",
      title: "Former High Court Judge",
      specialization: ["Constitutional Law", "Criminal Law", "Civil Rights"],
      experience: 25,
      rating: 5.0,
      reviews: 89,
      location: "Mumbai",
      hourlyRate: 8000,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      verified: true,
      languages: ["English", "Hindi", "Marathi"],
      description: "Former High Court Judge with deep expertise in constitutional matters and civil rights cases."
    },
    {
      id: 3,
      name: "Dr. Anita Desai",
      title: "Legal Consultant & Professor",
      specialization: ["Intellectual Property", "Technology Law", "Data Privacy"],
      experience: 12,
      rating: 4.8,
      reviews: 156,
      location: "Bangalore",
      hourlyRate: 4000,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      verified: true,
      languages: ["English", "Hindi", "Kannada"],
      description: "Expert in IP law and technology regulations with academic and practical experience."
    },
    {
      id: 4,
      name: "Adv. Vikram Singh",
      title: "Partner, Corporate Law Firm",
      specialization: ["Banking Law", "Securities Law", "Regulatory Compliance"],
      experience: 18,
      rating: 4.7,
      reviews: 203,
      location: "Mumbai",
      hourlyRate: 6000,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      verified: true,
      languages: ["English", "Hindi"],
      description: "Banking and securities law expert with extensive regulatory compliance experience."
    }
  ];

  const specializations = [
    'all',
    'Corporate Law',
    'Criminal Law',
    'Constitutional Law',
    'Intellectual Property',
    'Banking Law',
    'Technology Law',
    'Contract Law'
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                 expert.specialization.includes(selectedSpecialization);
    return matchesSearch && matchesSpecialization;
  });

  const connectWithExpert = (expert: Expert) => {
    setSelectedExpert(expert);
    setConnectionMessage('');
    setError('');
  };

  const sendConnectionRequest = async () => {
    if (!selectedExpert || !user || !connectionMessage.trim()) {
      setError('Please enter a message');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: saveError } = await localDB.saveExpertConnection(
        user.id,
        selectedExpert.id,
        connectionMessage
      );

      if (saveError) {
        setError('Failed to send connection request');
      } else {
        alert(`Connection request sent to ${selectedExpert.name}`);
        setSelectedExpert(null);
        setConnectionMessage('');
        loadConnections(); // Refresh connections
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Legal Expert Network</h2>
        
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search experts by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0e7b7f]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0e7b7f]"
              >
                {specializations.map(spec => (
                  <option key={spec} value={spec}>
                    {spec === 'all' ? 'All Specializations' : spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Expert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map(expert => (
            <div key={expert.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                    {expert.verified && (
                      <Award className="w-4 h-4 text-blue-500 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{expert.title}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{expert.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({expert.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {expert.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {expert.experience} years experience
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {expert.specialization.slice(0, 2).map(spec => (
                    <span key={spec} className="px-2 py-1 bg-[#0e7b7f] bg-opacity-10 text-[#0e7b7f] text-xs rounded-full">
                      {spec}
                    </span>
                  ))}
                  {expert.specialization.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{expert.specialization.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-2">{expert.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold text-gray-900">
                  ₹{expert.hourlyRate.toLocaleString()}/hr
                </div>
                <button
                  onClick={() => connectWithExpert(expert)}
                  className="bg-[#0e7b7f] text-white px-4 py-2 rounded-md hover:bg-[#0a6266] text-sm"
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">No experts found matching your criteria.</p>
          </div>
        )}

        {/* My Connections */}
        {connections.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Expert Connections</h3>
            <div className="space-y-3">
              {connections.slice(0, 5).map((connection) => {
                const expert = experts.find(e => e.id === connection.expert_id);
                return (
                  <div key={connection.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{expert?.name || 'Expert'}</h4>
                        <p className="text-sm text-gray-500">
                          Status: <span className={`capitalize ${connection.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                            {connection.status}
                          </span> - {new Date(connection.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Connection Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Connect with {selectedExpert.name}
            </h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to Expert
              </label>
              <textarea
                value={connectionMessage}
                onChange={(e) => setConnectionMessage(e.target.value)}
                placeholder="Describe your legal requirements and how this expert can help you..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0e7b7f]"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-[#0e7b7f] mr-3" />
                <span>Schedule a call (₹{selectedExpert.hourlyRate}/hour)</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#0e7b7f] mr-3" />
                <span>Send an email</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-[#0e7b7f] mr-3" />
                <span>Start a consultation chat</span>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setSelectedExpert(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={sendConnectionRequest}
                disabled={loading || !connectionMessage.trim()}
                className="flex-1 px-4 py-2 bg-[#0e7b7f] text-white rounded-md hover:bg-[#0a6266] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};