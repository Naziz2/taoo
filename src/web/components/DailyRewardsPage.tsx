import React, { useState, useEffect } from 'react';
import { ChevronLeft, Gift, Star, Zap, Crown, Calendar, Trophy, User } from 'lucide-react';

interface DailyRewardsPageProps {
  currentUser?: any;
  onBack: () => void;
  onAccountClick?: () => void;
  onShowUpgradeAccount?: () => void;
}

interface WheelSegment {
  value: number;
  color: string;
  textColor: string;
  angle: number;
  prob: number;
}

export default function DailyRewardsPage({ currentUser, onBack, onAccountClick, onShowUpgradeAccount }: DailyRewardsPageProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [currentDay, setCurrentDay] = useState(7); // User has completed 2 days
  const [canPlay, setCanPlay] = useState(true);
  const [lastPlayDate, setLastPlayDate] = useState<string | null>(null);
  const [wonPoints, setWonPoints] = useState<number | null>(null);
  const [chosenSegment, setChosenSegment] = useState<WheelSegment | null>(null);
  // Wheel segments with point values
  const segments: WheelSegment[] = [
    { value: 100, color: '#f0932b', textColor: '#2c2c2c', angle: 0, prob:0.10 },
    { value: 20, color: '#f9ca24', textColor: '#2c2c2c', angle: 45, prob:0.30 },
    { value: 200, color: '#f0932b', textColor: '#2c2c2c', angle: 90, prob:0.10 },
    { value: 2000, color: '#f9ca24', textColor: '#2c2c2c', angle: 135, prob:0.01 },
    { value: 50, color: '#f0932b', textColor: '#2c2c2c', angle: 180, prob:0.40 },
    { value: 1000, color: '#f9ca24', textColor: '#2c2c2c', angle: 225, prob:0.02 },
    { value: 500, color: '#f0932b', textColor: '#2c2c2c', angle: 270, prob:0.04 },
    { value: 700, color: '#f9ca24', textColor: '#2c2c2c', angle: 315, prob:0.03 }
  ];
  
  const generateWeightedRandom = (obj: WheelSegment[]): WheelSegment | null => {
      // Define outcomes and their probabilities
      // Calculate cumulative probabilities
      let cumulativeProbabilities = [];
      let sum = 0;
      for (let i = 0; i < obj.length; i++) {
        sum += obj[i].prob;
        cumulativeProbabilities.push(sum);
      }
  
      // Generate a uniform random number
      const randomFloat = Math.random();
  
      // Determine the outcome based on cumulative probabilities
      let chosenOutcome: WheelSegment | null = null;
      for (let i = 0; i < cumulativeProbabilities.length; i++) {
        if (randomFloat < cumulativeProbabilities[i]) {
          chosenOutcome = obj[i];
          break;
        }
      }
      setChosenSegment(chosenOutcome);
      return chosenOutcome;
    };
    
  // Check if user can play today
  useEffect(() => {
    const today = new Date().toDateString();
    const canPlayToday = lastPlayDate !== today;
    setCanPlay(canPlayToday);
  }, [lastPlayDate]);

  const handleSpin = () => {
    if (!canPlay || isSpinning) return;

    setIsSpinning(true);
    setWonPoints(null);
    
    const selectedSegment = generateWeightedRandom(segments);
    
    // Ensure a segment was selected before proceeding
    if (!selectedSegment) {
      setIsSpinning(false);
      return;
    }
    
    // Random rotation between 1440 and 2160 degrees (4-6 full rotations)
    const randomRotation = 1800 - selectedSegment.angle + 20;
    setRotation(prev => prev + randomRotation);

    // Simulate spin duration
    setTimeout(() => {
      setIsSpinning(false);
      
      // Determine winning segment
      const winningPoints = selectedSegment.value;
      
      setWonPoints(winningPoints);
      
      // Set last play date to today
      setLastPlayDate(new Date().toDateString());
      setCanPlay(false);
      
    }, 1000);
  };

  const getDayStatus = (day: number) => {
    if (day <= currentDay) return 'completed';
    if (day === currentDay + 1) return 'current';
    return 'locked';
  };

  const getDayIcon = (day: number) => {
    const status = getDayStatus(day);
    if (status === 'completed') return '✓';
    if (day === 7) return '🎁';
    return day.toString();
  };

  const getDayColor = (day: number) => {
    const status = getDayStatus(day);
    switch (status) {
      case 'completed': return 'bg-yellow-400 text-gray-900';
      case 'current': return 'bg-white text-gray-900 border-2 border-yellow-400';
      case 'locked': return 'bg-gray-600 text-gray-300';
      default: return 'bg-gray-600 text-gray-300';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold">Roue de la Fortune</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onShowUpgradeAccount}
              className="flex items-center bg-yellow-100 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors cursor-pointer"
            >
              <span className="font-semibold text-gray-800">{(currentUser?.points || 0).toLocaleString()}</span>
              <span className="ml-1 text-yellow-600">
                <img src="/Image+Background.png" alt="🪙" width={16} height={16} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 py-0 space-y-2">
        {/* Main Game Section */}
        <div className="bg-gradient-to-br from-gray-600 via-gray-700 to-gray-600 rounded-2xl px-4 py-6 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
              {/* Grand Prize Info */}
            <div className="text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 text-gray-900 mr-2" />
                <span className="text-gray-900 font-bold">Cadeau Spécial</span>
              </div>
            </div>
            {/* Header Section */}
            <div className="text-center mb-8">
              
              <h3 className="text-white text-xl mb-2">

                              </h3>
            </div>

            {/* Wheel of Fortune */}
            <div className="flex justify-center mb-8 py-8 px-10"
                  style={{
                    backgroundImage: 'url(/wheel-cover-8c0e9b5e.webp)',
                    backgroundSize: "contain" ,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center"
                  }}>
              <div className="relative">
                <div className="w-64 h-64 relative"
                  >
                  {/* Wheel container */}
                  <div 
                    className="w-full h-full rounded-full border-4 border-white shadow-2xl relative overflow-hidden transition-transform duration-30000 ease-out "
                    style={{ 
                      transform: `rotate(${rotation}deg)`,
                      background: `conic-gradient(from 0deg, #f0932b 0deg 45deg, #f9ca24 45deg 90deg, #f0932b 90deg 135deg, #f9ca24 135deg 180deg, #f0932b 180deg 225deg, #f9ca24 225deg 270deg, #f0932b 270deg 315deg, #f9ca24 315deg 360deg)`
                    }}
                  >
                    {/* Wheel segments with text */}
                    {segments.map((segment, index) => (
                      <div
                        key={index}
                        className="absolute w-full h-full flex items-center justify-center"
                        style={{
                          transform: `rotate(${segment.angle + 25.715}deg)`,
                          transformOrigin: 'center center'
                        }}
                      >
                        <div 
                          className="text-sm font-bold"
                          style={{ 
                            color: segment.textColor,
                            transform: 'translateY(-90px)'
                          }}
                        >
                          {segment.value} pts
                        </div>
                      </div>
                    ))}
                    
                    {/* Center logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-black bg-opacity-10 rounded-full flex items-center justify-center shadow-2xl  border-1 border-yellow overflow">
                        <img src="/Image+Background.png" alt="🪙" width={24} height={24} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                    <div className="w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
                  </div>
                </div>

                {/* Pointer decoration */}
                <div className="absolute -top-4 -right-6">
                  <div className="w-24 h-33 flex items-center justify-center transform rotate-45 ">
                    <img src="/wheel-pointer-49d89057.webp" alt="🪙" width={48} height={66} />
                  </div>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleSpin}
                disabled={!canPlay || isSpinning}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all ${
                  canPlay && !isSpinning
                    ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg transform hover:scale-105'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isSpinning ? 'Rotation...' : canPlay ? 'Tournez la roue' : 'Déjà joué'}
              </button>
            </div>

            {/* Win Result */}
            {wonPoints && (
              <div className="text-center mb-6">
                <div className="bg-white bg-opacity-20 rounded-xl p-4">
                  <h3 className="text-white text-xl font-bold mb-2">Félicitations !</h3>
                  <div className="flex items-center justify-center">
                    <span className="text-white text-2xl font-bold mr-2">+{wonPoints}</span>
                    <img src="/Image+Background.png" alt="🪙" width={24} height={24} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 7-Day Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Gagnez jusqu'à 2000 points</h3>
            <p className="text-gray-600 text-sm">Tournez la roue pour gagner des points</p>
        </div>

        {/* Play Status */}
        {!canPlay && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600 mr-3" />
              <span className="text-green-700 font-medium">
                Mission accomplie! Revenez demain.
              </span>
            </div>
          </div>
        )}

        {/* Game Rules */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Règles du jeu</h3>
          <div className="space-y-3 text-sm text-gray-700">
           
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <span>Connectez-vous 7 jours consécutifs pour le grand prix</span>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Trophy className="w-4 h-4 text-purple-600" />
              </div>
              <span>Les points gagnés sont ajoutés immédiatement à votre solde</span>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <span>Manquer un jour remet le compteur à zéro</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}