// data/universitiesDB.js

const universitiesDB = [
  {
    _id: "666872a0f82747d9646c7501",
    name: "Imperial College London",
    type: "Public Research University",
    location: { city: "London", country: "United Kingdom", latitude: 51.4988, longitude: -0.1749 },
    admission: { acceptanceRate: 15, applicationFee: 80, averageSAT: "N/A (Test-Optional)", internationalDeadline: "January 31", entryRequirements: ["Minimum 3 A-Levels at A*AA or equivalent", "IELTS 6.5+"] },
    international: { internationalStudents: 10600, nationalities: 140, tuitionFee: 36000, scholarshipOptions: true },
    ranking: { worldQS: 6, uk: 3, engineering: 5 },
    programs: [
      { name: "MSc Computing (AI & Machine Learning)", duration: 1, fee: 38500 },
      { name: "BSc Business Analytics", duration: 3, fee: 36000 },
      { name: "MEng Aeronautical Engineering", duration: 4, fee: 35000 }
    ],
    summary: "Imperial College London is a world-renowned institution focused purely on science, engineering, medicine and business. Located in the heart of London, it attracts students and staff from over 140 countries, making it one of the most international universities globally.",
    imageUrl: "https://via.placeholder.com/800x400/003366/FFFFFF?text=Imperial+College+London+Campus"
  },
  {
    _id: "666872a0f82747d9646c7502",
    name: "ETH Zurich – Swiss Federal Institute of Technology",
    type: "Public Research University",
    location: { city: "Zurich", country: "Switzerland", latitude: 47.3769, longitude: 8.5492 },
    admission: { acceptanceRate: 27, applicationFee: 150, averageSAT: "N/A (Focus on Swiss Matura/Equivalent)", internationalDeadline: "April 30", entryRequirements: ["Recognised upper secondary school-leaving certificate", "German/English proficiency"] },
    international: { internationalStudents: 10400, nationalities: 120, tuitionFee: 1500, scholarshipOptions: true },
    ranking: { worldQS: 9, switzerland: 1, computerScience: 4 },
    programs: [
      { name: "BSc Computer Science", duration: 3, fee: 1500 },
      { name: "MSc Management, Technology, and Economics", duration: 2, fee: 1500 },
      { name: "BSc Electrical Engineering", duration: 3, fee: 1500 }
    ],
    summary: "ETH Zurich is one of the world's leading universities in science and technology. It is famous for its outstanding research, state-of-the-art facilities, and for producing over 20 Nobel Laureates, including Albert Einstein.",
    imageUrl: "https://via.placeholder.com/800x400/A31F34/FFFFFF?text=ETH+Zurich+Main+Building"
  },
  {
    _id: "666872a0f82747d9646c7503",
    name: "National University of Singapore (NUS)",
    type: "Public Autonomous University",
    location: { city: "Singapore", country: "Singapore", latitude: 1.2966, longitude: 103.7764 },
    admission: { acceptanceRate: 25, applicationFee: 100, averageSAT: "1450+", internationalDeadline: "March 15", entryRequirements: ["High school qualification equivalent to the Singapore-Cambridge GCE 'A' Level", "SAT/ACT"] },
    international: { internationalStudents: 8500, nationalities: 100, tuitionFee: 40000, scholarshipOptions: true },
    ranking: { worldQS: 8, asia: 1, business: 12 },
    programs: [
      { name: "BBA (Bachelor of Business Administration)", duration: 4, fee: 38200 },
      { name: "BComp (Computer Science)", duration: 4, fee: 38200 },
      { name: "Master of Science in Financial Engineering", duration: 1.5, fee: 55000 }
    ],
    summary: "NUS is Singapore's flagship university and one of the most highly-regarded institutions in Asia and the world. It offers a comprehensive, rigorous educational experience across a broad spectrum of disciplines.",
    imageUrl: "https://via.placeholder.com/800x400/FF5733/FFFFFF?text=NUS+Singapore+Campus"
  },
  {
    _id: "666872a0f82747d9646c7504",
    name: "Harvard University",
    type: "Private Ivy League University",
    location: { city: "Cambridge", country: "USA", latitude: 42.3770, longitude: -71.1167 },
    admission: { acceptanceRate: 5, applicationFee: 75, averageSAT: "1480-1580", internationalDeadline: "January 1", entryRequirements: ["High school diploma", "Strong recommendation letters"] },
    international: { internationalStudents: 6800, nationalities: 110, tuitionFee: 50000, scholarshipOptions: true },
    ranking: { worldQS: 2, usa: 1, business: 3 },
    programs: [
      { name: "BA Economics", duration: 4, fee: 50000 },
      { name: "BSc Computer Science", duration: 4, fee: 50000 },
      { name: "MBA", duration: 2, fee: 72000 }
    ],
    summary: "Harvard University is a prestigious Ivy League institution in the United States, renowned for its law, business, and medical programs, attracting global talent for centuries.",
    imageUrl: "https://via.placeholder.com/800x400/8B0000/FFFFFF?text=Harvard+University+Campus"
  },
  {
    _id: "666872a0f82747d9646c7505",
    name: "Stanford University",
    type: "Private Research University",
    location: { city: "Stanford", country: "USA", latitude: 37.4275, longitude: -122.1697 },
    admission: { acceptanceRate: 4, applicationFee: 90, averageSAT: "1500-1570", internationalDeadline: "January 5", entryRequirements: ["High school diploma", "SAT/ACT scores", "Extracurriculars"] },
    international: { internationalStudents: 7000, nationalities: 95, tuitionFee: 53000, scholarshipOptions: true },
    ranking: { worldQS: 3, usa: 2, engineering: 2 },
    programs: [
      { name: "BSc Computer Science", duration: 4, fee: 53000 },
      { name: "MS Electrical Engineering", duration: 2, fee: 55000 },
      { name: "MBA", duration: 2, fee: 72000 }
    ],
    summary: "Stanford University is a leading research university in Silicon Valley, known for innovation, entrepreneurship, and world-class programs in engineering, business, and sciences.",
    imageUrl: "https://via.placeholder.com/800x400/228B22/FFFFFF?text=Stanford+University+Campus"
  },
  {
    _id: "666872a0f82747d9646c7506",
    name: "University of Cambridge",
    type: "Public Research University",
    location: { city: "Cambridge", country: "United Kingdom", latitude: 52.2043, longitude: 0.1149 },
    admission: { acceptanceRate: 21, applicationFee: 70, averageSAT: "N/A", internationalDeadline: "October 15", entryRequirements: ["A-Levels or equivalent", "IELTS 7.0+"] },
    international: { internationalStudents: 9000, nationalities: 130, tuitionFee: 33000, scholarshipOptions: true },
    ranking: { worldQS: 5, uk: 2, engineering: 7 },
    programs: [
      { name: "BA Economics", duration: 3, fee: 33000 },
      { name: "MEng Civil Engineering", duration: 4, fee: 34000 },
      { name: "PhD Physics", duration: 3, fee: 33000 }
    ],
    summary: "University of Cambridge is a historic and prestigious UK university with strong research programs across sciences, engineering, and humanities.",
    imageUrl: "https://via.placeholder.com/800x400/000080/FFFFFF?text=University+of+Cambridge+Campus"
  },
  {
    _id: "666872a0f82747d9646c7507",
    name: "University of Oxford",
    type: "Public Research University",
    location: { city: "Oxford", country: "United Kingdom", latitude: 51.7548, longitude: -1.2544 },
    admission: { acceptanceRate: 17, applicationFee: 75, averageSAT: "N/A", internationalDeadline: "October 15", entryRequirements: ["A-Levels or equivalent", "IELTS 7.0+"] },
    international: { internationalStudents: 9500, nationalities: 125, tuitionFee: 34000, scholarshipOptions: true },
    ranking: { worldQS: 4, uk: 1, engineering: 6 },
    programs: [
      { name: "BA Philosophy, Politics & Economics", duration: 3, fee: 34000 },
      { name: "MSc Computer Science", duration: 1, fee: 35000 },
      { name: "DPhil Mathematics", duration: 3, fee: 34000 }
    ],
    summary: "University of Oxford is a world-famous institution known for its academic excellence, historic colleges, and global influence.",
    imageUrl: "https://via.placeholder.com/800x400/800080/FFFFFF?text=University+of+Oxford+Campus"
  },
  {
    _id: "666872a0f82747d9646c7508",
    name: "Massachusetts Institute of Technology (MIT)",
    type: "Private Research University",
    location: { city: "Cambridge", country: "USA", latitude: 42.3601, longitude: -71.0942 },
    admission: { acceptanceRate: 6, applicationFee: 75, averageSAT: "1500-1570", internationalDeadline: "January 1", entryRequirements: ["High school diploma", "Strong STEM foundation"] },
    international: { internationalStudents: 4800, nationalities: 100, tuitionFee: 55000, scholarshipOptions: true },
    ranking: { worldQS: 1, usa: 3, engineering: 1 },
    programs: [
      { name: "BSc Computer Science & Engineering", duration: 4, fee: 55000 },
      { name: "MS Mechanical Engineering", duration: 2, fee: 57000 },
      { name: "MBA", duration: 2, fee: 72000 }
    ],
    summary: "MIT is a world-leading STEM university located in Cambridge, USA, known for pioneering research, innovation, and producing influential tech leaders.",
    imageUrl: "https://via.placeholder.com/800x400/000000/FFFFFF?text=MIT+Campus"
  },
  {
    _id: "666872a0f82747d9646c7509",
    name: "University of Toronto",
    type: "Public Research University",
    location: { city: "Toronto", country: "Canada", latitude: 43.6629, longitude: -79.3957 },
    admission: { acceptanceRate: 43, applicationFee: 90, averageSAT: "1400+", internationalDeadline: "January 15", entryRequirements: ["High school diploma", "IELTS 6.5+"] },
    international: { internationalStudents: 19000, nationalities: 150, tuitionFee: 45000, scholarshipOptions: true },
    ranking: { worldQS: 26, canada: 1, engineering: 10 },
    programs: [
      { name: "BSc Computer Science", duration: 4, fee: 45000 },
      { name: "MBA", duration: 2, fee: 55000 },
      { name: "MEng Electrical Engineering", duration: 1.5, fee: 47000 }
    ],
    summary: "University of Toronto is Canada's top university, known for research, diversity, and strong programs across engineering, business, and sciences.",
    imageUrl: "https://via.placeholder.com/800x400/4169E1/FFFFFF?text=University+of+Toronto+Campus"
  },
  {
    _id: "666872a0f82747d9646c7510",
    name: "University of Melbourne",
    type: "Public Research University",
    location: { city: "Melbourne", country: "Australia", latitude: -37.7980, longitude: 144.9613 },
    admission: { acceptanceRate: 32, applicationFee: 100, averageSAT: "N/A", internationalDeadline: "December 15", entryRequirements: ["High school completion", "IELTS 6.5+"] },
    international: { internationalStudents: 12000, nationalities: 110, tuitionFee: 40000, scholarshipOptions: true },
    ranking: { worldQS: 14, australia: 1, business: 20 },
    programs: [
      { name: "BCom Accounting", duration: 3, fee: 40000 },
      { name: "BSc Computer Science", duration: 3, fee: 40000 },
      { name: "Master of Data Science", duration: 1.5, fee: 42000 }
    ],
    summary: "University of Melbourne is Australia's leading university, renowned for high-quality research and attracting students from around the globe.",
    imageUrl: "https://via.placeholder.com/800x400/8A2BE2/FFFFFF?text=University+of+Melbourne+Campus"
  }
];


export default universitiesDB;

export const getUniversityById = (id) => {
  return universitiesDB.find(uni => uni._id === id);
};

// Exporting data tailored for the list view (only fields needed for the card)
export const universitiesList = universitiesDB.map(uni => ({
    _id: uni._id,
    name: uni.name,
    type: uni.type,
    nationalities: uni.international.nationalities,
    internationalStudents: uni.international.internationalStudents,
    location: `${uni.location.city}, ${uni.location.country}`,
    totalPrograms: uni.programs.length,
    imageUrl: uni.imageUrl.replace('800x400', '150x150').replace('Campus', 'Logo')
}));