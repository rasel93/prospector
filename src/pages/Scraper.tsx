import { useState } from "react";
import { Search, MapPin, Briefcase, Globe, Loader2, ExternalLink } from "lucide-react";

export default function Scraper() {
  const [form, setForm] = useState({
    query: "",
    city: "",
    country: "España",
    niche: "",
    max_results: 20,
    source: "google_maps"
  });
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!form.query) return;
    setLoading(true);
    
    // Simulate API call for the preview environment
    setTimeout(() => {
      setResults([
        { id: 101, name: `${form.query} Centro`, city: form.city || "Madrid", category: form.niche || "Negocio Local", website: "https://ejemplo1.com", email: "contacto@ejemplo1.com", phone: "+34 600 000 001" },
        { id: 102, name: `${form.query} Express`, city: form.city || "Madrid", category: form.niche || "Negocio Local", website: "https://ejemplo2.es", email: "info@ejemplo2.es", phone: "+34 600 000 002" },
        { id: 103, name: `Grupo ${form.query}`, city: form.city || "Madrid", category: form.niche || "Negocio Local", website: "", email: "", phone: "+34 600 000 003" },
      ]);
      setLoading(false);
    }, 2000);
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Buscar Empresas</h1>
          <p className="text-gray-500 mt-1">Extrae leads desde Google Maps y Search automáticamente</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 text-gray-400" />
                Búsqueda *
              </label>
              <input
                type="text"
                placeholder="ej: restaurantes, clínicas, inmobiliarias"
                value={form.query}
                onChange={e => setForm({ ...form, query: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                Ciudad
              </label>
              <input
                type="text"
                placeholder="ej: Madrid, Barcelona"
                value={form.city}
                onChange={e => setForm({ ...form, city: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 text-gray-400" />
                Nicho / Sector
              </label>
              <input
                type="text"
                placeholder="ej: pymes, autónomos, e-commerce"
                value={form.niche}
                onChange={e => setForm({ ...form, niche: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 text-gray-400" />
                Fuente de Datos
              </label>
              <select
                value={form.source}
                onChange={e => setForm({ ...form, source: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white"
              >
                <option value="google_maps">Google Maps</option>
                <option value="google_search">Google Search</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Máximo resultados
              </label>
              <input
                type="number"
                min={5}
                max={100}
                value={form.max_results}
                onChange={e => setForm({ ...form, max_results: parseInt(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
              <input
                type="text"
                value={form.country}
                onChange={e => setForm({ ...form, country: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading || !form.query}
            className="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Buscando y analizando webs...
              </>
            ) : (
              "Buscar y Analizar"
            )}
          </button>
        </div>

        {/* Resultados */}
        {results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {results.length} empresas encontradas
              </h3>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full animate-pulse">
                Análisis web en background...
              </span>
            </div>
            
            <div className="space-y-3">
              {results.map(company => (
                <div
                  key={company.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:border-blue-300 transition-colors shadow-sm"
                >
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{company.name}</div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> {company.city} 
                      <span className="text-gray-300">|</span> 
                      <Briefcase className="w-3 h-3" /> {company.category}
                    </div>
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline mt-2 flex items-center gap-1 font-medium"
                      >
                        {company.website}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <div className="text-sm text-red-500 mt-2 font-medium flex items-center gap-1">
                        ⚠️ No tiene página web
                      </div>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="font-medium">{company.email || <span className="text-gray-400 italic">Sin email visible</span>}</div>
                    <div className="mt-1">{company.phone || <span className="text-gray-400 italic">Sin teléfono</span>}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
