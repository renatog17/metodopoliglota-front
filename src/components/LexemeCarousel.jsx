import { useState } from "react";
import { deleteLexeme } from "../api/apiService";


export default function LexemeCarousel({ lexemes, onLexemeDeleted }) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? lexemes.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === lexemes.length - 1 ? 0 : i + 1));
  };

  const handleDelete = async (lexemeId) => {
    try {
      await deleteLexeme(lexemeId);
      if (onLexemeDeleted) {
        onLexemeDeleted(lexemeId);
      }
      setIndex((i) => (i > 0 ? i - 1 : 0));
    } catch (error) {
      console.error("Erro ao deletar lexema:", error);
    }
  };

  const current = lexemes[index];

  return (
    <div className="relative w-full flex items-center justify-center py-10">
      <button
        onClick={prev}
        className="absolute left-4 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full transition"
      >
        ‹
      </button>

      <div
        className="
        w-full max-w-xl
        bg-white border rounded-2xl shadow-xl text-center
        p-10
        flex flex-col justify-center
        h-[350px]         
        transition-all transform scale-105
        relative
      "
      >
        {/* Botão de excluir discreto */}
        <button
          onClick={() => handleDelete(current.id)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-sm"
          title="Delete"
        >
          ✕
        </button>

        <p className="text-4xl font-bold mb-6">{current.lexeme}</p>
        <p className="text-lg text-gray-700 mb-6 px-4">{current.description}</p>
        <p className="text-xs text-gray-500 tracking-wide">
          Levels: {current.levels.join(", ")}
        </p>
      </div>

      <button
        onClick={next}
        className="absolute right-4 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full transition"
      >
        ›
      </button>
    </div>
  );
}
