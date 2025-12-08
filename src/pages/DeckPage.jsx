import { useParams } from "react-router-dom";
import { useUserData } from "../context/UserDataProvider";
import LexemeCarousel from "../components/LexemeCarousel";

export default function DeckPage() {
  const { id } = useParams();
  const { userData: decks } = useUserData();

  if (!Array.isArray(decks)) {
    return <p>Loading decks...</p>;
  }

  const deckId = Number(id);
  const deck = decks.find((d) => d.id === deckId);

  if (!deck) {
    return <p>Deck not found.</p>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm text-gray-600 font-semibold">
          {deck.readLanguageDTO?.languageCode}
        </span>
        <h1 className="text-2xl font-bold">{deck.name}</h1>
      </div>
      <p className="text-gray-700 mb-4">{deck.description}</p>

      {deck.lexemes.length === 0 ? (
        <p>No lexemes in this deck.</p>
      ) : (
        <LexemeCarousel lexemes={deck.lexemes} />
      )}
    </div>
  );
}
