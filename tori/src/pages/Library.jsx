import { useNavigate } from "react-router-dom";
import { RECENT } from "../data.js";
import StoryCard from "../components/StoryCard.jsx";

export default function Library() {
  const navigate = useNavigate();
  const goCreate = () => navigate("/app/create");
  const items = [...RECENT, ...RECENT.slice(0, 2)];

  return (
    <div className="p-4 md:p-6 animate-fade-up">
      {items.map((r, i) => (
        <StoryCard key={i} story={r} onReuse={goCreate} />
      ))}
    </div>
  );
}
