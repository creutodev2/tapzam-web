"use client";

import React, { useState, useMemo, useRef } from 'react';
import { 
    ChevronDown, Star, Lock, Info, Download, Share2, Smartphone, Globe, Mail, Flag,
    ChevronLeft, ChevronRight, X
} from 'lucide-react';

// --- Configuration and Mock Data ---

const PRIMARY_GREEN = 'bg-[#01875f]'; 
const HOVER_GREEN = 'hover:bg-[#016e4e]';
const TEXT_GREEN = 'text-[#01875f]'; 

// --- Interfaces ---
interface ReviewSummary { rating: number; percentage: number; }
interface UserReview { id: string; userName: string; userImage: string | null; rating: number; date: string; text: string; helpfulCount: number; }
interface AppInfo {
  iconUrl: string;
  name: string;
  developer: string;
  rating: number;
  ratingCount: string;
  downloads: string;
  ageRating: string;
  description: string;
  screenshots: string[];
  reviewSummaries: ReviewSummary[];
  userReviews: UserReview[];
}

const mockApp: AppInfo = {
  iconUrl: "https://placehold.co/256x256/4a0e4e/fbbf24?text=►", 
  name: "WinZO: Play Games & Watch TV", 
  developer: "WinZO Private Limited", 
  rating: 4.4, 
  ratingCount: "131K reviews", 
  downloads: "50M+", 
  ageRating: "3+", 
  description: `
    Join over 25 Crore Indians on WinZO - Bharat's #1 destination for nonstop entertainment. It's the only platform where the country can binge short dramas, reels, and mini series while also playing 100+ exciting games - all in one place.
    
    WinZO is a social gaming platform offering over 100+ engaging games in various formats and languages. It provides a fun and personalized gaming experience where users can compete in challenges and tournaments to win exciting rewards.
  `.trim(),
  screenshots: [
    "https://placehold.co/300x500/2a0a38/FFFFFF?text=INDIA'S+LARGEST",
    "https://placehold.co/300x500/1E88E5/FFFFFF?text=NON-STOP+ENTERTAINMENT", 
    "https://placehold.co/300x500/FF5252/FFFFFF?text=ENDLESS+STORIES",
    "https://placehold.co/300x500/FFB300/333333?text=NEW+DRAMAS",
    "https://placehold.co/300x500/673AB7/FFFFFF?text=EXCLUSIVE+SHOWS", 
    "https://placehold.co/300x500/4CAF50/FFFFFF?text=WIN+REWARDS", 
    "https://placehold.co/300x500/9C27B0/FFFFFF?text=PLAY+WITH+FRIENDS", 
  ],
  reviewSummaries: [
    { rating: 5, percentage: 70 }, { rating: 4, percentage: 15 }, { rating: 3, percentage: 8 }, { rating: 2, percentage: 3 }, { rating: 1, percentage: 4 },
  ],
  userReviews: [
      { id: '1', userName: 'Rahul Sharma', userImage: null, rating: 5, date: 'September 14, 2024', text: 'This is the best gaming app I have ever used! Instant withdrawals and so many games to choose from.', helpfulCount: 124 },
      { id: '2', userName: 'Priya Patel', userImage: 'https://placehold.co/100x100/orange/white?text=P', rating: 1, date: 'August 20, 2024', text: 'Good app for time pass but sometimes it lags on my older phone.', helpfulCount: 45 },
      { id: '3', userName: 'Amit Kumar', userImage: null, rating: 5, date: 'October 02, 2024', text: 'Amazing experience. The customer support is very responsive.', helpfulCount: 12 }
  ]
};

// --- Utility Components ---

const RatingStars: React.FC<{ rating: number; size?: string }> = ({ rating, size = "w-3 h-3" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const starClass = `${size} text-[#01875f]`;
  
  return (
    <div className="flex space-x-0.5">
      {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} fill="#01875f" strokeWidth={0} className={starClass} />)}
      {hasHalfStar && (
          <div className="relative">
            <Star className={starClass} fill="none" stroke="currentColor" strokeWidth={2} />
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                <Star className={starClass} fill="#01875f" strokeWidth={0} />
            </div>
          </div>
      )} 
       {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} fill="none" stroke="currentColor" strokeWidth={2} className={starClass} />)}
    </div>
  );
};

const ReviewBar: React.FC<{ star: number; percentage: number }> = ({ star, percentage }) => (
    <div className="flex items-center space-x-3">
        <span className="text-xs font-medium text-gray-600 w-2">{star}</span>
        <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full ${PRIMARY_GREEN} rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

const ReviewCard: React.FC<{ review: UserReview }> = ({ review }) => {
    return (
        <div className="py-4 space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    {review.userImage ? (
                        <img src={review.userImage} alt={review.userName} className="w-8 h-8 rounded-full" />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">{review.userName.charAt(0)}</div>
                    )}
                    <span className="text-sm text-gray-800 font-medium">{review.userName}</span>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <RatingStars rating={review.rating} size="w-3 h-3" />
                <span className="text-xs text-gray-500">{review.date}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
            <div className="flex items-center space-x-6 pt-1">
                <span className="text-xs text-gray-500">Was this review helpful?</span>
                <div className="flex items-center space-x-4">
                    <button className="text-xs text-gray-600 hover:text-gray-900">Yes</button>
                    <button className="text-xs text-gray-600 hover:text-gray-900">No</button>
                </div>
            </div>
        </div>
    );
};

const Footer: React.FC = () => {
    return (
        <div className="mt-8 border-t border-gray-200">
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Flag Section */}
                <div className="py-6">
                    <button className="flex items-center text-sm text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-md -ml-3 transition-colors">
                        <Flag className="w-5 h-5 mr-3 text-gray-500" />
                        Flag as inappropriate
                    </button>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Links Grid */}
                <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
                    <div className="col-span-1 lg:col-span-1">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">Google Play</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#01875f] hover:underline">Play Pass</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#01875f] hover:underline">Play Points</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#01875f] hover:underline">Gift cards</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#01875f] hover:underline">Redeem</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#01875f] hover:underline">Refund policy</a></li>
                        </ul>
                    </div>
                    <div className="col-span-1 lg:col-span-1">
                        <h3 className="text-sm font-medium text-gray-500 mb-4">Kids & family</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#01875f] hover:underline">Parent Guide</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-[#01875f] hover:underline">Family sharing</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Legal & Region */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between py-8 gap-6 text-xs text-gray-500">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <a href="#" className="hover:text-gray-800">Terms of Service</a>
                        <a href="#" className="hover:text-gray-800">Privacy</a>
                        <a href="#" className="hover:text-gray-800">About Google Play</a>
                        <a href="#" className="hover:text-gray-800">Developers</a>
                        <a href="#" className="hover:text-gray-800">Google Store</a>
                        <span>All prices include GST.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Simple India Flag CSS representation */}
                        <div className="w-6 h-4 border border-gray-200 flex flex-col">
                            <div className="h-1/3 bg-[#FF9933]"></div>
                            <div className="h-1/3 bg-white relative flex items-center justify-center">
                                <div className="w-1 h-1 rounded-full bg-[#000080]"></div>
                            </div>
                            <div className="h-1/3 bg-[#138808]"></div>
                        </div>
                        <span className="text-gray-600">India (English)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Right Sidebar Components ---

const AppSupportDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="mb-8">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full py-2 text-gray-700 hover:bg-gray-50 rounded group">
                <span className="text-lg font-medium text-gray-800">App support</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="mt-2 space-y-4 pl-2 animate-fadeIn">
                     <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900"><Globe className="w-4 h-4 mr-3"/> Website</a>
                    <a href="#" className="flex items-center text-sm text-gray-600 hover:text-gray-900"><Mail className="w-4 h-4 mr-3"/> Support email</a>
                    <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500">Address: Ground Floor, Suite No. 004, Okhla, New Delhi 110025</p>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const descriptionParagraphs = useMemo(() => mockApp.description.split('\n').filter(p => p.trim()), []);
  const displayedDescription = useMemo(() => isDescriptionExpanded ? descriptionParagraphs : descriptionParagraphs.slice(0, 2), [isDescriptionExpanded, descriptionParagraphs]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-800">
      
      {/* MODAL / LIGHTBOX (Big Screen View) */}
      {selectedScreenshot && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] p-4"
            onClick={() => setSelectedScreenshot(null)}
        >
            {/* <button 
                className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition-all"
                onClick={() => setSelectedScreenshot(null)}
            >
                <X size={32} />
            </button> */}
            <img 
                src={selectedScreenshot} 
                alt="Full screen preview" 
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
        </div>
      )}

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-12 pb-10">
        
        {/* 1. HERO SECTION */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:space-x-8 pb-8">
              
              {/* Left Content */}
              <div className="flex-1 min-w-0 w-full">
                
                {/* Title Block */}
                <div className="flex items-start">
                    <img 
                        src={mockApp.iconUrl} 
                        alt="App Icon Mobile" 
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl shadow-sm border border-gray-100 object-cover mr-4 lg:hidden flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                        <h1 className="text-[24px] sm:text-[2.5rem] font-medium text-[#202124] leading-tight tracking-tight mb-0.5 break-words">
                            {mockApp.name}
                        </h1>
                        <a href="#" className={`text-sm sm:text-base ${TEXT_GREEN} font-medium hover:underline inline-block mb-4`}>
                            {mockApp.developer}
                        </a>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-start mb-8 w-full">
                    <div className="flex items-center divide-x divide-gray-300 w-full max-w-md">
                        {/* Rating */}
                        <div className="flex flex-col items-center pr-4 sm:pr-6 flex-shrink-0">
                            <div className="flex items-center space-x-1">
                                <span className="font-medium text-xs sm:text-sm text-gray-800">{mockApp.rating.toFixed(1)}</span>
                                <Star className="w-3 h-3 text-[#01875f] fill-[#01875f]" />
                            </div>
                            <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{mockApp.ratingCount}</span>
                        </div>
                        {/* Downloads */}
                        <div className="flex flex-col items-center px-4 sm:px-6 flex-shrink-0">
                            <span className="font-medium text-xs sm:text-sm text-gray-800">{mockApp.downloads}</span>
                            <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Downloads</span>
                        </div>
                        {/* Age */}
                        <div className="flex flex-col items-center pl-4 sm:pl-6 flex-shrink-0">
                             <div className="flex items-center space-x-1">
                                <span className="border border-gray-400 rounded-sm px-1 text-[10px] font-medium text-gray-600">3+</span>
                                <span className="font-medium text-xs sm:text-sm text-gray-800 ml-1">Rated for 3+</span>
                                <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 ml-1" />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Buttons Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 w-full">
                  <button className={`w-full sm:w-auto px-12 py-2.5 ${PRIMARY_GREEN} ${HOVER_GREEN} text-white font-medium rounded-lg shadow-sm transition duration-200 flex justify-center`}>
                    Install
                  </button>
                  <div className="flex items-center space-x-4 justify-center sm:justify-start w-full sm:w-auto">
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full flex items-center text-sm font-medium text-[#01875f]">
                          <Share2 className="w-6 h-6 text-[#01875f] mb-0.5" strokeWidth={1.5}/>
                          <span className="ml-2 sm:hidden md:inline">Share</span>
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full flex items-center text-sm font-medium text-[#01875f]">
                          <div className="border-2 border-[#01875f] rounded-md w-5 h-6 flex items-center justify-center mr-2 relative top-[1px]">
                              <span className="text-lg leading-none -mt-1">+</span>
                          </div>
                          <span className="sm:hidden md:inline">Add to wishlist</span>
                      </button>
                  </div>
                </div>
                
                <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <Smartphone className="w-4 h-4 mr-3 text-gray-400" />
                    <span>This app is available for your device</span>
                </div>
              </div>

              {/* Desktop Logo */}
              <div className="hidden lg:block flex-shrink-0 ml-8">
                  <img src={mockApp.iconUrl} alt="App Icon Desktop" className="w-[220px] h-[220px] rounded-[20%] shadow-sm border border-gray-100 object-cover" />
              </div>
        </header>
            
        {/* 2. SCREENSHOTS CAROUSEL - Updated */}
        <section className="pb-8 relative group">
            
            {/* Left Arrow Button */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md border border-gray-200 hidden group-hover:flex items-center justify-center hover:bg-gray-50 focus:outline-none -ml-4"
            >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            {/* Scrollable Container */}
            <div 
                ref={scrollContainerRef}
                className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth px-1 py-2"
            >
              {mockApp.screenshots.map((url, index) => (
                <div 
                    key={index} 
                    className="relative flex-shrink-0 cursor-pointer transition-transform transform hover:scale-[1.02]"
                    onClick={() => setSelectedScreenshot(url)}
                >
                    <img 
                        src={url} 
                        alt={`Screen ${index}`} 
                        className="h-[250px] sm:h-[350px] w-auto rounded-xl shadow-sm object-cover border border-gray-100" 
                    />
                </div>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md border border-gray-200 hidden group-hover:flex items-center justify-center hover:bg-gray-50 focus:outline-none -mr-4"
            >
                <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
        </section>

        {/* 3. MAIN CONTENT GRID */}
        <div className="flex flex-col lg:flex-row lg:space-x-12 pt-2">
            <main className="flex-1 max-w-[700px]">
                <section className="py-4">
                  <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg sm:text-xl font-medium text-[#202124]">About this game</h2>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                    {displayedDescription.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </section>

                 <section className="py-6 mt-2">
                  <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg sm:text-xl font-medium text-[#202124]">Data safety</h2>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 w-11/12">
                    Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based on your use, region, and age. The developer provided this information and may update it over time.
                  </p>
                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                     <div className="flex items-start">
                         <div className="mt-0.5 mr-3 bg-white border border-gray-300 rounded-full p-0.5"><Share2 className="w-3 h-3 text-gray-500" /></div>
                         <div><h4 className="text-sm font-medium text-gray-800">No data shared with third parties</h4><p className="text-xs text-gray-500">Learn more about how developers declare sharing</p></div>
                     </div>
                     <div className="flex items-start">
                         <div className="mt-0.5 mr-3 bg-white border border-gray-300 rounded-full p-0.5"><Download className="w-3 h-3 text-gray-500" /></div>
                         <div><h4 className="text-sm font-medium text-gray-800">This app may collect these data types</h4><p className="text-xs text-gray-500">Location, Personal info and 5 others</p></div>
                     </div>
                     <div className="flex items-start">
                         <div className="mt-0.5 mr-3 bg-white border border-gray-300 rounded-full p-0.5"><Lock className="w-3 h-3 text-gray-500" /></div>
                         <div><h4 className="text-sm font-medium text-gray-800">Data is encrypted in transit</h4></div>
                     </div>
                     <div className="pt-2"><a href="#" className={`text-sm font-medium ${TEXT_GREEN} hover:underline`}>See details</a></div>
                  </div>
                </section>

                <section className="py-6 mt-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg sm:text-xl font-medium text-[#202124]">Ratings and reviews</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-10 mb-8">
                        <div className="flex flex-col items-center sm:items-start mb-6 sm:mb-0">
                            <div className="text-[56px] leading-none text-[#202124] font-normal">{mockApp.rating.toFixed(1)}</div>
                            <RatingStars rating={mockApp.rating} size="w-4 h-4" />
                            <span className="text-xs text-gray-500 mt-2">{mockApp.ratingCount}</span>
                        </div>
                        <div className="flex-1 w-full space-y-1.5">
                            {mockApp.reviewSummaries.map((summary) => (
                                <ReviewBar key={summary.rating} star={summary.rating} percentage={summary.percentage} />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2 divide-y divide-gray-100">
                        {mockApp.userReviews.map((review) => <ReviewCard key={review.id} review={review} />)}
                    </div>
                    <div className="mt-6">
                         <button className={`text-sm ${TEXT_GREEN} font-medium hover:text-[#007000] hover:bg-green-50 px-4 py-2 rounded-md transition-colors`}>See all reviews</button>
                    </div>
                </section>
            </main>

            {/* Right Sidebar */}
            <aside className="hidden lg:block w-[340px] flex-shrink-0 pt-4">
                <AppSupportDropdown />
            </aside>
        </div>
      </div>
      
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default App;