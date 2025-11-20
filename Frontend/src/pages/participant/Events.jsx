import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faLaptopCode,
  faTrophy,
  faCode,
  faFolderOpen,
  faUsers,
  faUserGroup,
  faMoneyBillWave,
  faCalendar,
  faClock,
  faPlay,
  faHistory,
  faUpload,
  faUserPlus,
  faChartBar,
  faEye
} from "@fortawesome/free-solid-svg-icons";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock events data
  const events = [
    {
      id: 1,
      name: 'TechFest 2025 Hackathon',
      organizer: 'University Tech Club',
      description: '24-hour hackathon focusing on innovative solutions for campus problems',
      category: 'Hackathon',
      status: 'ongoing',
      startDate: '2025-11-01',
      endDate: '2025-11-15',
      submissionDeadline: '2025-11-15',
      participants: 156,
      maxTeamSize: 4,
      prizes: ['₹50,000', '₹30,000', '₹20,000'],
      tracks: ['AI/ML', 'Web Dev', 'Mobile App'],
      isRegistered: true,
    },
    {
      id: 2,
      name: 'Innovation Challenge 2025',
      organizer: 'Startup Incubator',
      description: 'Showcase your innovative ideas and win funding for your startup',
      category: 'Competition',
      status: 'upcoming',
      startDate: '2025-12-01',
      endDate: '2025-12-20',
      submissionDeadline: '2025-12-18',
      participants: 89,
      maxTeamSize: 5,
      prizes: ['₹1,00,000', '₹60,000', '₹40,000'],
      tracks: ['HealthTech', 'EdTech', 'FinTech', 'AgriTech'],
      isRegistered: false,
    },
    {
      id: 3,
      name: 'Code Sprint Winter',
      organizer: 'Developer Community',
      description: 'Competitive programming event with algorithmic challenges',
      category: 'Programming',
      status: 'upcoming',
      startDate: '2025-11-25',
      endDate: '2025-11-25',
      submissionDeadline: '2025-11-25',
      participants: 234,
      maxTeamSize: 1,
      prizes: ['₹25,000', '₹15,000', '₹10,000'],
      tracks: ['Algorithms', 'Data Structures'],
      isRegistered: true,
    },
    {
      id: 4,
      name: 'Green Tech Hackathon',
      organizer: 'Environmental NGO',
      description: 'Build sustainable tech solutions for environmental challenges',
      category: 'Hackathon',
      status: 'past',
      startDate: '2024-08-10',
      endDate: '2024-08-25',
      submissionDeadline: '2024-08-25',
      participants: 112,
      maxTeamSize: 4,
      prizes: ['₹40,000', '₹25,000', '₹15,000'],
      tracks: ['Sustainability', 'Clean Energy'],
      isRegistered: true,
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = event.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const tabs = [
    { id: 'ongoing', label: 'Ongoing', count: events.filter((e) => e.status === 'ongoing').length },
    { id: 'upcoming', label: 'Upcoming', count: events.filter((e) => e.status === 'upcoming').length },
    { id: 'past', label: 'Past Events', count: events.filter((e) => e.status === 'past').length },
  ];

  const categoryIcons = {
    Hackathon: faLaptopCode,
    Competition: faTrophy,
    Programming: faCode,
  };

  const statusIcons = {
    ongoing: faPlay,
    upcoming: faClock,
    past: faHistory,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-600 mt-1">Discover and participate in exciting competitions</p>
      </div>

      {/* Search & Filter */}
      <Card padding="default">
        <div className="space-y-4">
          <Input
            placeholder="Search events by name, organizer, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<FontAwesomeIcon icon={faSearch} className="text-gray-500" />}
          />

          <div className="flex gap-2 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <Card padding="lg">
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faCalendar} className="text-5xl text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search or check other tabs</p>
            </div>
          </Card>
        ) : (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} categoryIcons={categoryIcons} statusIcons={statusIcons} />
          ))
        )}
      </div>
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, categoryIcons, statusIcons }) => {
  const statusColors = {
    ongoing: 'bg-green-100 text-green-800 border-green-200',
    upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
    past: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const getDaysRemaining = () => {
    const deadline = new Date(event.submissionDeadline);
    const today = new Date();
    const diff = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    if (event.status === 'past') return 'Ended';
    if (diff < 0) return 'Deadline passed';
    if (diff === 0) return 'Due today';
    if (diff === 1) return '1 day left';
    return `${diff} days left`;
  };

  return (
    <Card padding="default" hover>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl flex-shrink-0">
              <FontAwesomeIcon icon={categoryIcons[event.category] || faFolderOpen} />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">by {event.organizer}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4">{event.description}</p>

              {/* Tracks */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tracks.map((track) => (
                  <span
                    key={track}
                    className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                  >
                    {track}
                  </span>
                ))}
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Participants</p>
                  <p className="font-medium text-gray-900 mt-1">
                    <FontAwesomeIcon icon={faUsers} className="mr-1" /> {event.participants}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Team Size</p>
                  <p className="font-medium text-gray-900 mt-1">
                    <FontAwesomeIcon icon={faUserGroup} className="mr-1" /> Max {event.maxTeamSize}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Prize Pool</p>
                  <p className="font-medium text-gray-900 mt-1">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="mr-1" /> {event.prizes[0]}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Deadline</p>
                  <p className="font-medium text-gray-900 mt-1">
                    <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                    {new Date(event.submissionDeadline).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="lg:ml-6 flex-shrink-0 space-y-3 text-center">

          {/* Status */}
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusColors[event.status]}`}
          >
            <FontAwesomeIcon icon={statusIcons[event.status]} />
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>

          {event.status !== 'past' && (
            <div className="text-sm font-medium text-gray-700 flex items-center justify-center gap-1">
              <FontAwesomeIcon icon={faClock} />
              {getDaysRemaining()}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {event.status === 'ongoing' ? (
              <Button variant="primary" size="sm" fullWidth>
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                Submit Project
              </Button>
            ) : event.status === 'upcoming' ? (
              event.isRegistered ? (
                <Button variant="outline" size="sm" fullWidth disabled>
                  ✓ Registered
                </Button>
              ) : (
                <Button variant="primary" size="sm" fullWidth>
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Register Now
                </Button>
              )
            ) : (
              <Button variant="outline" size="sm" fullWidth>
                <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                View Results
              </Button>
            )}

            <Button variant="ghost" size="sm" fullWidth>
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventsPage;
