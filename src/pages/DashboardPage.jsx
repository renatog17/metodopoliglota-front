import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LANGUAGES, LEVELS } from "../constants/languageData";
import { useUserData } from "../context/UserDataProvider";
import { createLexeme } from "../api/apiService";

export default function DashboardPage() {
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  const { userData: decks, reloadUserData } = useUserData();
  const [form, setForm] = useState({
    lexeme: "",
    description: "",
    level: "",
    deckId: "",
    newDeck: {
      name: "",
      language: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        lexeme: form.lexeme,
        description: form.description,
        level: form.level,
        deckId: form.deckId === "__new" ? null : form.deckId,
        newDeck:
        form.deckId === "__new"
        ? {
          name: form.newDeck.name,
          language: form.newDeck.language,
          description: form.newDeck.description,
        }
        : null,
      };
      console.log("Submitting form:", payload);

      const response = await createLexeme(payload);
      console.log("Lexeme created:", response.data);

      alert("Lexeme created successfully.");
    } catch (err) {
      console.error(err);
      alert("Error creating lexeme.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
          Add New Lexeme
        </h2>

        <div className="flex flex-col gap-2 mb-6">
          <label
            htmlFor="lexeme"
            className="text-left text-sm font-medium text-gray-700"
          >
            Lexeme
          </label>
          <input
            id="lexeme"
            name="lexeme"
            type="text"
            placeholder="Enter lexeme"
            value={form.lexeme}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={(e) => setForm({ ...form, lexeme: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label
            htmlFor="description"
            className="text-left text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Enter description"
            value={form.description}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label
            htmlFor="level"
            className="text-left text-sm font-medium text-gray-700"
          >
            Level
          </label>
          <select
            id="level"
            name="level"
            value={form.level}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={(e) => setForm({ ...form, level: e.target.value })}
          >
            <option value="" disabled>
              Select level
            </option>
            {LEVELS.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-left text-sm font-medium text-gray-700">
            Deck
          </label>

          <select
            name="deckId"
            value={form.deckId || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({
                ...form,
                deckId: e.target.value,
              })
            }
          >
            <option value="" disabled>
              Select deck
            </option>

            {decks?.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}

            <option value="__new">+ Create new deck</option>
          </select>
        </div>

        {form.deckId === "__new" && (
          <>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-left text-sm font-medium text-gray-700">
                Deck name
              </label>
              <input
                type="text"
                placeholder="New deck name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={form.newDeck.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    newDeck: { ...form.newDeck, name: e.target.value },
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-left text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                placeholder="New deck description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={form.newDeck.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    newDeck: { ...form.newDeck, description: e.target.value },
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-left text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={form.newDeck.language}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                onChange={(e) =>
                  setForm({
                    ...form,
                    newDeck: { ...form.newDeck, language: e.target.value },
                  })
                }
              >
                <option value="" disabled>
                  Select language
                </option>
                {Object.entries(LANGUAGES).map(([code, { name }]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
