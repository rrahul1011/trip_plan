import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const destinations = [
  {
    name: 'Rajasthan',
    weather: '25°C to 35°C, Low rainfall',
    budget: '3000-4000 INR/day',
    transportation: 'Car with driver, buses/trains',
    highlights: ['Jaipur: Amber Fort, City Palace', 'Udaipur: Lake Pichola, City Palace', 'Jodhpur: Mehrangarh Fort'],
    activities: ['Hot air balloon ride in Jaipur', 'Boat ride on Lake Pichola', 'Desert safari near Jodhpur'],
    itinerary: [
      'Day 1-3: Jaipur - Explore Pink City, visit Hawa Mahal, shop at bazaars',
      'Day 4-6: Udaipur - Enjoy lakeside views, visit City Palace, take cooking class',
      'Day 7-8: Jodhpur - Explore blue city, visit Mehrangarh Fort, try zip-lining'
    ],
    cuisine: ['Dal Baati Churma', 'Laal Maas', 'Pyaaz Kachori', 'Lassi'],
    mustHave: ['Camel ride in Thar Desert', 'Stay in a heritage hotel', 'Attend a Rajasthani folk music and dance show']
  },
  {
    name: 'Kerala',
    weather: '23°C to 29°C, Moderate to heavy rainfall',
    budget: '2500-3500 INR/day',
    transportation: 'Car with driver, buses/trains, houseboat',
    highlights: ['Munnar: Tea plantations, Eravikulam National Park', 'Alleppey: Backwaters', 'Kochi: Fort Kochi, Chinese Fishing Nets'],
    activities: ['Tea plantation tour', 'Houseboat stay in Alleppey', 'Kathakali dance performance'],
    itinerary: [
      'Day 1-2: Kochi - Explore Fort Kochi, enjoy sunset at Chinese fishing nets',
      'Day 3-4: Munnar - Visit tea plantations, trek in Eravikulam National Park',
      'Day 5-6: Alleppey - Houseboat cruise, kayaking in backwaters',
      'Day 7: Varkala - Beach day, cliff-top cafes, water sports'
    ],
    cuisine: ['Kerala Fish Curry', 'Appam with Stew', 'Kerala Parotta', 'Karimeen Pollichathu'],
    mustHave: ['Ayurvedic massage', 'Overnight houseboat stay', 'Spice plantation tour']
  },
  {
    name: 'Ladakh',
    weather: '10°C to 25°C, Low rainfall',
    budget: '3500-5000 INR/day',
    transportation: 'Fly to Leh, car with driver for local travel',
    highlights: ['Leh: Leh Palace, Shanti Stupa', 'Nubra Valley: Diskit Monastery, sand dunes', 'Pangong Lake'],
    activities: ['River rafting on Zanskar River', 'Camel ride in Nubra Valley', 'Stargazing at Pangong Lake'],
    itinerary: [
      'Day 1-2: Leh - Acclimatize, visit Leh Palace and local markets',
      'Day 3-4: Nubra Valley - Khardung La Pass, sand dunes, monastery visit',
      'Day 5-6: Pangong Lake - Camp by the lake, enjoy sunrise and sunset views',
      'Day 7: Leh - Shanti Stupa, souvenir shopping'
    ],
    cuisine: ['Thukpa', 'Momos', 'Butter Tea', 'Chhurpi (Yak Cheese)'],
    mustHave: ['Ride world\'s highest motorable road (Khardung La)', 'Stay in traditional Ladakhi homestay', 'Monastery meditation session']
  },
  {
    name: 'Goa',
    weather: '24°C to 29°C, Moderate to heavy rainfall',
    budget: '2500-3500 INR/day',
    transportation: 'Rent scooters, hire car, taxis',
    highlights: ['North Goa: Anjuna Beach, Chapora Fort', 'South Goa: Palolem Beach, Dudhsagar Falls'],
    activities: ['Water sports at Baga Beach', 'Visit spice plantations', 'Enjoy nightlife in Anjuna or Baga'],
    itinerary: [
      'Day 1-2: North Goa - Beach hopping, water sports, night markets',
      'Day 3: Old Goa - Visit ancient churches, spice plantation tour',
      'Day 4-5: South Goa - Relaxed beaches, Dudhsagar Falls trek',
      'Day 6-7: Panjim & North Goa - Casino visit, farewell party night'
    ],
    cuisine: ['Goan Fish Curry', 'Vindaloo', 'Bebinca', 'Feni (local cashew/coconut liquor)'],
    mustHave: ['Sunset cruise', 'Learn to surf', 'Saturday Night Market at Arpora']
  },
  {
    name: 'Darjeeling and Sikkim',
    weather: '14°C to 24°C, Moderate rainfall',
    budget: '2500-3500 INR/day',
    transportation: 'Fly to Bagdogra, taxi between cities',
    highlights: ['Darjeeling: Tiger Hill, Tea estates', 'Gangtok: Rumtek Monastery, Nathula Pass'],
    activities: ['Ride the Darjeeling Himalayan Railway', 'Tea tasting', 'Trekking in Sikkim'],
    itinerary: [
      'Day 1-3: Darjeeling - Sunrise at Tiger Hill, tea estate visit, toy train ride',
      'Day 4-5: Pelling - Kanchenjunga views, monastery visits',
      'Day 6-7: Gangtok - Rumtek Monastery, MG Marg exploration, day trip to Tsomgo Lake'
    ],
    cuisine: ['Momos', 'Thukpa', 'Sel Roti', 'Darjeeling Tea'],
    mustHave: ['Sunrise view of Kanchenjunga', 'River rafting in Teesta', 'Visit a traditional Sikkimese village']
  },
  {
    name: 'Daman and Diu',
    weather: '24°C to 32°C, Moderate rainfall',
    budget: '2500-4000 INR/day',
    transportation: 'Fly between Daman and Diu, rent scooter/bicycle',
    highlights: ['Daman: Devka Beach, Fort of St. Jerome', 'Diu: Diu Fort, Naida Caves, Nagoa Beach'],
    activities: ['Water sports at Jampore Beach', 'Visit Vaibhav Waterpark', 'Bike around Diu island'],
    itinerary: [
      'Day 1-2: Daman - Beach time, fort exploration, nightlife',
      'Day 3-5: Diu - Fort visit, Naida Caves, water sports, island biking',
      'Day 6-7: Diu/Daman - Relaxation, last-minute sightseeing, souvenir shopping'
    ],
    cuisine: ['Portugese-influenced seafood', 'Diu-style Biryani', 'Coconut based curries', 'Feni (cashew liquor)'],
    mustHave: ['Sunset at Nagoa Beach', 'Scuba diving in Diu', 'Visit to a local fishing village']
  }
];

const budgetData = destinations.map(dest => ({
  name: dest.name,
  budget: parseInt(dest.budget.split('-')[1].split(' ')[0])
}));

const DestinationCard = ({ destination }) => (
  <Card className="w-full mb-4">
    <CardHeader className="font-bold text-lg">{destination.name}</CardHeader>
    <CardContent>
      <p><strong>Weather:</strong> {destination.weather}</p>
      <p><strong>Budget:</strong> {destination.budget}</p>
      <p><strong>Transportation:</strong> {destination.transportation}</p>
      <p><strong>Highlights:</strong></p>
      <ul className="list-disc pl-5">
        {destination.highlights.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </ul>
      <p><strong>Activities:</strong></p>
      <ul className="list-disc pl-5">
        {destination.activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
      <p><strong>Itinerary:</strong></p>
      <ul className="list-disc pl-5">
        {destination.itinerary.map((day, index) => (
          <li key={index}>{day}</li>
        ))}
      </ul>
      <p><strong>Must-try Cuisine:</strong></p>
      <ul className="list-disc pl-5">
        {destination.cuisine.map((dish, index) => (
          <li key={index}>{dish}</li>
        ))}
      </ul>
      <p><strong>Must-have Experiences:</strong></p>
      <ul className="list-disc pl-5">
        {destination.mustHave.map((experience, index) => (
          <li key={index}>{experience}</li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const BudgetComparison = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={budgetData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="budget" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(destinations[0].name);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">India Travel Destination Comparison for Young Friend Groups (September)</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {destinations.map(dest => (
            <TabsTrigger key={dest.name} value={dest.name}>{dest.name}</TabsTrigger>
          ))}
        </TabsList>
        {destinations.map(dest => (
          <TabsContent key={dest.name} value={dest.name}>
            <DestinationCard destination={dest} />
          </TabsContent>
        ))}
      </Tabs>
      <h2 className="text-xl font-bold mt-8 mb-4">Budget Comparison (Max per day in INR)</h2>
      <BudgetComparison />
    </div>
  );
};

export default Dashboard;