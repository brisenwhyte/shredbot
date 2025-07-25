import React, { useState, useEffect, FormEvent } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

const generateCode = (): string =>
  Math.random().toString(36).substring(2, 8).toUpperCase();



const Signup: React.FC = () => {
  const [telegram, setTelegram] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");
  const [position, setPosition] = useState<number | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [searchParams] = useSearchParams();
  const [standings, setStandings] = useState<{ telegram: string; position: number }[]>([]);

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) setReferralCode(ref);
  }, [searchParams]);

   useEffect(() => {
    const fetchLeaderboard = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("position", "asc"));
      const snapshot = await getDocs(q);
     const topUsers = snapshot.docs.map(doc => {
  const data = doc.data();
  return {
    telegram: data.telegram,
    position: data.position
  };
});
      setStandings(topUsers);
    };

    fetchLeaderboard();
  }, []);

  const obfuscate = (username: string) =>
  username.length > 4
    ? username.slice(0, 2) + "****" + username.slice(-2)
    : username[0] + "***";

  

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usersRef = collection(db, "users");

    // Check if email already exists
    const telegramQuery = query(usersRef, where("telegram", "==", telegram));
const existingSnapshot = await getDocs(telegramQuery);
if (!existingSnapshot.empty) {
  alert("Telegram username already registered.");
  return;
}

    const referralCodeGenerated = generateCode();

    const userSnapshot = await getDocs(usersRef);
    const currentPosition = userSnapshot.size + 1;

    // Handle referral bonus
    if (referralCode) {
      const refQuery = query(usersRef, where("referralCode", "==", referralCode));
      const refSnapshot = await getDocs(refQuery);

      if (!refSnapshot.empty) {
        const refUserDoc = refSnapshot.docs[0];
        const refUserData = refUserDoc.data() as DocumentData;
        const refDocRef = doc(db, "users", refUserDoc.id);
        const newPos = Math.max(refUserData.position - 1, 1);
        await updateDoc(refDocRef, { position: newPos });
      }
    }

    await addDoc(usersRef, {
      telegram,
      referralCode: referralCodeGenerated,
      referredBy: referralCode || null,
      position: currentPosition,
      timestamp: new Date().toISOString(),
    });

    setGeneratedCode(referralCodeGenerated);
    setPosition(currentPosition);
  };

  return (
    <div className=" bg-[#17000d] text-white flex items-center justify-center px-4">
      <div className="bg-[#18040c] p-8 border border-[#7f0c21] max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#ff003c]">
          🚀 Join ShredBot Waitlist
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
  type="text"
  placeholder="Enter Telegram username (e.g., @username)"
  required
  className="w-full px-3 py-2 text-black rounded"
  value={telegram}
  onChange={(e) => setTelegram(e.target.value)}
/>
          <input
            type="text"
            placeholder="Referral code (optional)"
            className="w-full px-3 py-2 text-black rounded"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#ff003c] px-4 py-2 w-full text-white font-bold rounded hover:bg-[#c2185b] transition"
          >
            Join Waitlist
          </button>
        </form>

        {position !== null && (
          <div className="mt-6 text-left bg-black/50 p-4 rounded text-sm space-y-2">
            <p>
              ✅ <strong>Telegram Username:</strong> {telegram}
            </p>
            <p>
              🧾 <strong>Your Position:</strong> {position}
            </p>
            <p>
              🔗 <strong>Referral Link:</strong>
              <br />
              <span className="break-all text-cyan-400">
                {window.location.origin}/signup?ref={generatedCode}
              </span>
            </p>
          </div>
        )}
        <div className="mt-8 bg-[#0f0f0f] border border-[#ff003c] rounded p-4 text-left">
  <h3 className="text-[#ff003c] font-bold text-lg mb-2">🏁 Live Waitlist Standings</h3>
  <ul className="space-y-2 text-sm text-white">
    {standings.map((entry, index) => (
  <li key={index} className="flex justify-between">
    <span>
      {index + 1}. {obfuscate(entry.telegram)}
    </span>
    <span className="text-cyan-400">#{entry.position}</span>
  </li>
))}
  </ul>
</div>
      </div>
      
    </div>
  );
};

export default Signup;
