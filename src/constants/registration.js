export const REGISTRATION_ROUTES = [
  '/registration',
  '/registration/user-details',
  '/registration/otp-verification',
  '/registration/login-credentials',
  '/registration/wellness-interests',
  '/registration/wellbeing-pillars',
  '/registration/processing',
  '/registration/welcome',
];

export const WELLNESS_INTEREST_CATEGORIES = [
  {
    name: 'Individual Sports',
    options: ['Aerobics', 'Ballet', 'Calisthenics', 'Dance', 'Gymnastics', 'Hiking', 'Obstacle Racing', 'Pilates', 'Running', 'Walking', 'Yoga'],
  },
  {
    name: 'Ball Sports',
    options: ['Soccer', 'Basketball', 'Tennis', 'Volleyball', 'Baseball', 'Golf'],
  },
  {
    name: 'Wheel Sports',
    options: ['Skateboarding', 'Roller Skating', 'BMX', 'Mountain Biking'],
  },
  {
    name: 'Combat Sports',
    options: ['Boxing', 'Kickboxing', 'MMA', 'Karate', 'Judo', 'Taekwondo'],
  },
  {
    name: 'Resistance Training',
    options: ['Weightlifting', 'CrossFit', 'Bodyweight', 'Powerlifting'],
  },
  {
    name: 'Winter Sports',
    options: ['Skiing', 'Snowboarding', 'Ice Skating', 'Ice Hockey'],
  },
  {
    name: 'Water Sports',
    options: ['Surfing', 'Kayaking', 'Paddleboarding', 'Rowing', 'Sailing'],
  },
  {
    name: 'Other Sports',
    options: ['Climbing', 'Archery', 'Dance Fitness', 'Equestrian'],
  },
];

export const WELLBEING_PILLARS = [
  { title: 'Physical Wellbeing', desc: 'Energy, movement, sleep, and restful care' },
  { title: 'Mental Wellbeing', desc: 'Clarity, focus, and mindfulness' },
  { title: 'Emotional Wellbeing', desc: 'Resilience, self-awareness, and stress regulation' },
  { title: 'Social Wellbeing', desc: 'Relationships and meaningful connection' },
  { title: 'Intellectual Wellbeing', desc: 'Growth, creativity, and learning' },
  { title: 'Occupational Wellbeing', desc: 'Purpose, performance, and work-life balance' },
  { title: 'Spiritual Wellbeing', desc: 'Values, meaning, and inner alignment' },
  { title: 'Environmental Wellbeing', desc: 'Healthy, safe, and productive surroundings' },
  { title: 'Purpose & Contribution', desc: 'Giving back and living with meaning' },
  { title: 'Longevity', desc: 'A sustainable, healthy lifestyle for the long term' },
  { title: 'Nutritional Wellbeing', desc: 'Fueling your body and brain with intention' },
  { title: 'Financial Wellbeing', desc: 'Security, budgeting, and long-term stability' },
];
