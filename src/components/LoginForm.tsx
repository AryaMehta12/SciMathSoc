
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Brain, Trophy, Users, Clock } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";
// import { useLeaderboard } from "@/hooks/useLeaderboard";
// import { useToast } from "@/hooks/use-toast";
// import TillEndDate from "@/components/TillEndDate"

// interface LoginFormProps {
//   onLogin: (rollNumber: string, name: string) => Promise<void>;
// }

// export const LoginForm = ({ onLogin }: LoginFormProps) => {
//   const [rollNumber, setRollNumber] = useState("");
//   const [name, setName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { logout } = useAuth();
//   const { totalParticipants } = useLeaderboard();
//   const { toast } = useToast();

//   const handleLogin = async () => {
//     if (!rollNumber.trim() || !name.trim()) {
//       toast({
//         title: "Missing Information",
//         description: "Please enter both roll number and name",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       await onLogin(rollNumber.trim(), name.trim());
//     } catch (error) {
//       console.error('Login error:', error);
//     }
    
//     setIsLoading(false);
//   };

//   // Calculate time left (mock data for now)
//   const competitionTimeLeft = <TillEndDate />;

//   return (
//     <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Background decoration */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
//       <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
//       <div className="w-full max-w-md space-y-6 relative z-10">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <div className="flex items-center justify-center space-x-3 mb-6">
//             <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
//               <div className="flex items-center space-x-1">
//                 <img
//                   src="/smslogo.png"
//                   alt="🧪 📐"
//                   className="w-30 h-30 object-cover rounded-full"
//                 />
//                 {/* <span className="text-2xl">🧪</span>
//                 <span className="text-2xl">📐</span> */}
//               </div>
//             </div>
//           </div>
          
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
//             SciMathSoc  
//           </h1>
          
//           <p className="text-lg text-muted-foreground">
//             Bold Minds. Sharp Ideas. One Society.
//           </p>
          
//           <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
//             <span className="flex items-center space-x-1">
//               <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
//               <span>Live Competition</span>
//             </span>
//           </div>
//         </div>

//         {/* Live Stats */}
//         <div className="grid grid-cols-2 gap-4">
//           <Card className="bg-gradient-card border-primary/20 shadow-card backdrop-blur-sm">
//             <CardContent className="p-4 text-center">
//               <div className="flex items-center justify-center space-x-1 mb-2">
//                 <span className="text-lg"></span>
//                 <Clock className="w-4 h-4 text-primary" />
//               </div>
//               <div className="text-lg font-bold text-primary">{competitionTimeLeft}</div>
//               <div className="text-xs text-muted-foreground">Time Remaining</div>
//             </CardContent>
//           </Card>
          
//           <Card className="bg-gradient-card border-primary/20 shadow-card backdrop-blur-sm">
//             <CardContent className="p-4 text-center">
//               <div className="flex items-center justify-center space-x-1 mb-2">
//                 <span className="text-lg"></span>
//                 <Users className="w-4 h-4 text-success" />
//               </div>
//               <div className="text-lg font-bold text-success">{totalParticipants || 0}</div>
//               <div className="text-xs text-muted-foreground">Active Players</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Login Form */}
//         <Card className="bg-gradient-card border-primary/20 shadow-glow backdrop-blur-sm">
//           <CardHeader className="text-center pb-4">
//             <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-center space-x-2">
//               <span>🚀</span>
//               <span>Join the Challenge</span>
//             </CardTitle>
//             <CardDescription className="text-muted-foreground">
//               Enter your details to compete with fellow scientists & mathematicians
//             </CardDescription>
//           </CardHeader>
          
//           <CardContent className="space-y-6">
//             <div className="space-y-2">
//               <label htmlFor="rollNumber" className="text-sm font-medium text-foreground flex items-center space-x-2">
//                 <span>🎓</span>
//                 <span>Roll Number</span>
//               </label>
//               <Input
//                 id="rollNumber"
//                 type="text"
//                 placeholder="e.g., 21CS001"
//                 value={rollNumber}
//                 onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
//                 className="bg-input border-primary/20 text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary py-3 text-lg"
//                 disabled={isLoading}
//               />
//             </div>
            
//             <div className="space-y-2">
//               <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center space-x-2">
//                 <span>👤</span>
//                 <span>Full Name</span>
//               </label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleLogin()}
//                 className="bg-input border-primary/20 text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary py-3 text-lg"
//                 disabled={isLoading}
//               />
//             </div>
            
//             <Button 
//               onClick={handleLogin}
//               disabled={!rollNumber.trim() || !name.trim() || isLoading}
//               className="w-full bg-gradient-primary hover:shadow-primary text-white font-medium h-14 text-lg transition-all duration-300"
//             >
//               {isLoading ? (
//                 <div className="flex items-center space-x-2">
//                   <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
//                   <span>Connecting...</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-2">
//                   <span>⚡</span>
//                   <span>Start Quiz Challenge</span>
//                 </div>
//               )}
//             </Button>

//             <div className="text-center pt-2">
              
//               <p className="text-xs text-muted-foreground">
//               Bold Minds. Sharp Ideas. One Society.
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Competition Info */}
//         <Card className="bg-gradient-card border-primary/20 shadow-card backdrop-blur-sm">
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-2 mb-4">
//               <span className="text-2xl">🏆</span>
//               <span className="text-lg font-semibold text-foreground">SciMathSoc Recognition</span>
//             </div>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-winner-gold/10 to-transparent">
//                 <span className="text-winner-gold text-lg">🥇</span>
//                 <span className="text-foreground font-medium">Winner: Insta Shoutout + Special Prize</span>
//               </div>
//               <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-winner-silver/10 to-transparent">
//                 <span className="text-winner-silver text-lg">2-5</span>
//                 <span className="text-foreground font-medium">Runner-up: Insta Shoutout</span>
//               </div>
              
//             </div>
//             <div className="mt-4 pt-3 border-t border-primary/20 text-center">
//                <p className="text-xs text-muted-foreground">
//                 🎯 8 Questions • ⚡ Speed Scoring • 📈 Live Rankings
//               </p> 
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useToast } from "@/hooks/use-toast";
import TillEndDate from "@/components/TillEndDate";

// --- Animation/Visual imports ---
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks"; // (Or use your preferred get window size)

// ---- Helpers for Animated Players Counter ----
const AnimatedNumber = ({ number }) => (
  <motion.span
    key={number}
    initial={{ scale: 0.8, y: -10, opacity: 0 }}
    animate={{ scale: 1, y: 0, opacity: 1 }}
    exit={{ scale: 0.8, y: 10, opacity: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 14 }}
    className="inline-block"
  >
    {number}
  </motion.span>
);

export const LoginForm = ({ onLogin }) => {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [rollValid, setRollValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const { logout } = useAuth();
  const { totalParticipants } = useLeaderboard();
  const { toast } = useToast();
  const { width, height } = useWindowSize();

  const handleLogin = async () => {
    if (!rollNumber.trim() || !name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both roll number and name",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    try {
      await onLogin(rollNumber.trim(), name.trim());
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2200);
    } catch (error) {
      console.error('Login error:', error);
    }
    setIsLoading(false);
  };

  // Example validation logic (adjust as needed)
  const validateRoll = (val) => {
  if (!/^25\d{4}$/.test(val)) return false; // must start with 25 and have 4 digits
  const num = parseInt(val.slice(2), 10);   // extract the 4-digit number
  return num >= 0 && num <= 1350;
};

  const validateName = (val) => val.length > 1 && /[a-zA-Z ]/.test(val);

  // Validate on change
  const onRollChange = (v) => {
    setRollNumber(v.toUpperCase());
    setRollValid(validateRoll(v));
  };
  const onNameChange = (v) => {
    setName(v);
    setNameValid(validateName(v));
  };

  // --- Particles Config (for background flourish) ---
  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 48,
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 40, duration: 0.3 } }
    },
    particles: {
      color: { value: "#81e6d9" },
      number: { value: 24 },
      opacity: { value: 0.34 },
      shape: { type: ["circle", "triangle", "polygon"], },
      size: { value: { min: 2, max: 6 } },
      move: { enable: true, speed: 0.7, direction: "none", random: true }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating particles */}
      <Particles id="tsparticles" options={particlesOptions} className="absolute inset-0 z-0" />

      {/* Animate Confetti on login */}
      <AnimatePresence>
        {showConfetti && (
          <Confetti width={width || 800} height={height || 600} numberOfPieces={240} />
        )}
      </AnimatePresence>

      {/* Decorative animated blurred circles */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: -26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}>
          <div className="flex items-center justify-center space-x-3 mb-6 relative">
            {/* Animated glowing ring behind logo */}
            <motion.div
              className="absolute inset-0 m-auto rounded-full"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 32px 8px rgba(103,193,245,0.45)",
                  "0 0 48px 20px #7fda74",
                  "0 0 32px 8px rgba(103,193,245,0.45)"
                ]
              }}
              transition={{
                duration: 3.5,
                times: [0, 0.7, 1],
                repeat: Infinity
              }}
              style={{ width: 92, height: 92, zIndex: 0 }}
            >
              <svg className="w-full h-full animate-spin-slower" style={{ animationDuration: '14s' }} viewBox="0 0 92 92">
                <circle cx="46" cy="46" r="44" stroke="#6ee7b7" strokeWidth="3.5" fill="none" opacity="0.34" />
                <circle cx="46" cy="46" r="38" stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.20" strokeDasharray="24 10" />
              </svg>
            </motion.div>
            {/* Logo */}
            <img
              src="/smslogo.png"
              alt="🧪📐"
              className="relative w-20 h-20 object-cover rounded-full shadow-xl z-10"
            />
          </div>
          {/* Animated Title */}
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7 }}
          >
            SciMathSoc
          </motion.h1>
          {/* Tagline with word-by-word pop-in */}
          <motion.p
            className="text-lg text-muted-foreground"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {},
            }}
          >
            {["Bold Minds.", "Sharp Ideas.", "One Society."].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 + i * 0.12, duration: 0.56 }}
                className="inline-block mx-1"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
          {/* Neon live status */}
          <motion.div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mt-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.35, yoyo: Infinity }}
          >
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse filter drop-shadow-[0_0_4px_#34d399]" />
              <span className="pl-1">Live Competition</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Timer Card */}
          <Card className="bg-gradient-card border-primary/20 shadow-card backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              {/* Replace below with an animated circle if desired */}
              <div className="text-lg font-bold text-primary relative">
                {/* Place circular countdown SVG/progress here if using */}
                <TillEndDate />
              </div>
              <div className="text-xs text-muted-foreground">Time Remaining</div>
            </CardContent>
          </Card>
          {/* Active Players Card */}
          <Card className="bg-gradient-card border-primary/20 shadow-card backdrop-blur-lg">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Users className="w-4 h-4 text-success" />
              </div>
              <div className="text-lg font-bold text-success">
                <AnimatePresence mode="wait" initial={false}>
                  <AnimatedNumber number={totalParticipants || 0} />
                </AnimatePresence>
              </div>
              <div className="text-xs text-muted-foreground">Active Players</div>
            </CardContent>
          </Card>
        </div>

        {/* Login Form */}
        <Card className="bg-gradient-card border-primary/20 shadow-glow backdrop-blur-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-center space-x-2">
              <span>🚀</span>
              <span>Join the Challenge</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your details to compete with fellow scientists & mathematicians
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="rollNumber" className="text-sm font-medium text-foreground flex items-center space-x-2">
                <span>🎓</span>
                <span>Roll Number</span>
                {/* Animated check on validation */}
                <AnimatePresence>
                  {rollValid && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0 }}
                      className="text-success ml-1"
                    >
                      ✔️
                    </motion.span>
                  )}
                </AnimatePresence>
              </label>
              <Input
                id="rollNumber"
                type="text"
                placeholder="e.g., 21CS001"
                value={rollNumber}
                onChange={(e) => onRollChange(e.target.value)}
                className={`bg-input border-primary/20 text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary py-3 text-lg transition-all ${(rollNumber.length>0 && !rollValid) ? "border-red-400 animate-shake" : ""}`}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center space-x-2">
                <span>👤</span>
                <span>Full Name</span>
                <AnimatePresence>
                  {nameValid && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0 }}
                      className="text-success ml-1"
                    >
                      ✔️
                    </motion.span>
                  )}
                </AnimatePresence>
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleLogin()}
                className={`bg-input border-primary/20 text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary py-3 text-lg transition-all ${(name.length>0 && !nameValid) ? "border-red-400 animate-shake" : ""}`}
                disabled={isLoading}
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px #81e6d9cc" }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button 
                onClick={handleLogin}
                disabled={!rollNumber.trim() || !name.trim() || isLoading || !rollValid || !nameValid}
                className="w-full bg-gradient-primary hover:shadow-primary text-white font-medium h-14 text-lg transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>⚡</span>
                    <span>Start Quiz Challenge</span>
                  </div>
                )}
              </Button>
            </motion.div>

            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                Bold Minds. Sharp Ideas. One Society.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Competition Info */}
        <Card className="bg-gradient-card border-primary/20 shadow-card backdrop-blur-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🏆</span>
              <span className="text-lg font-semibold text-foreground">SciMathSoc Recognition</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-winner-gold/10 to-transparent">
                <span className="text-winner-gold text-lg">🥇</span>
                <span className="text-foreground font-medium">Winner: Insta Shoutout + Special Prize</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-winner-silver/10 to-transparent">
                <span className="text-winner-silver text-lg">2-5</span>
                <span className="text-foreground font-medium">Runner-up: Insta Shoutout</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-primary/20 text-center">
              <p className="text-xs text-muted-foreground">
                🎯 8 Questions • ⚡ Speed Scoring • 📈 Live Rankings
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ---- OPTIONAL: Add a dark/light toggle here if your app supports ---- */}
        {/* <DarkModeToggle /> */}
      </div>
    </div>
  );
};
