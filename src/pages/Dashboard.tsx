import { useState, useEffect } from "react";
import { Download, Mail, Activity, ExternalLink } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  nuevo: "bg-blue-100 text-blue-800",
  contactado: "bg-yellow-100 text-yellow-800",
  interesado: "bg-orange-100 text-orange-800",
  reunion: "bg-purple-100 text-purple-800",
  cliente: "bg-green-100 text-green-800",
  perdido: "bg-red-100 text-red-800"
};

const SCORE_COLOR = (score: number) => {
  if (score < 40) return "text-red-600";
  if (score < 70) return "text-yellow-600";
  return "text-green-600";
};

// Mock Data for the UI preview
const MOCK_LEADS = [
  {
    lead: { id: 1, status: "nuevo", notes: "", proposal_sent: false, email_sent: false, created_at: "2026-03-23T10:00:00Z" },
    company: { id: 1, name: "Restaurante El Puerto", website: "https://elpuerto.com", email: "info@elpuerto.com", phone: "+34 600 123 456", city: "Barcelona", category: "Restaurante" },
    analysis: { score: 35, mobile_score: 20, category: "urgente", has_ssl: false, cms_detected: "WordPress", recommendations: ["Rediseño web completo prioritario", "Instalar certificado SSL"] }
  },
  {
    lead: { id: 2, status: "contactado", notes: "Llamar el jueves", proposal_sent: false, email_sent: true, created_at: "2026-03-22T14:30:00Z" },
    company: { id: 2, name: "Clínica Dental Sonrisas", website: "https://sonrisasdental.es", email: "contacto@sonrisasdental.es", phone: "+34 912 345 678", city: "Madrid", category: "Salud" },
    analysis: { score: 65, mobile_score: 55, category: "rediseno", has_ssl: true, cms_detected: "Wix", recommendations: ["Optimización crítica para móvil", "Mejora de velocidad de carga"] }
  },
  {
    lead: { id: 3, status: "cliente", notes: "Contrato firmado", proposal_sent: true, email_sent: true, created_at: "2026-03-15T09:15:00Z" },
    company: { id: 3, name: "Inmobiliaria Casasur", website: "https://casasur.es", email: "hola@casasur.es", phone: "+34 655 987 654", city: "Sevilla", category: "Inmobiliaria" },
    analysis: { score: 85, mobile_score: 80, category: "mantenimiento", has_ssl: true, cms_detected: "Custom", recommendations: ["Campaña Google Ads", "Mantenimiento preventivo"] }
  }
];

export default function Dashboard() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [stats, setStats] = useState<any>({});
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    // Simulate fetching and calculating stats
    let filtered = MOCK_LEADS;
    if (filterStatus) {
      filtered = MOCK_LEADS.filter(l => l.lead.status === filterStatus);
    }
    setLeads(filtered);

    const total = MOCK_LEADS.length;
    const byStatus = MOCK_LEADS.reduce((acc: any, l) => {
      acc[l.lead.status] = (acc[l.lead.status] || 0) + 1;
      return acc;
    }, {});
    const avgScore = MOCK_LEADS.reduce((sum, l) => sum + (l.analysis?.score || 0), 0) / total;

    setStats({ total, byStatus, avgScore: Math.round(avgScore) });
  }, [filterStatus]);

  function updateStatus(leadId: number, status: string) {
    setLeads(leads.map(l => l.lead.id === leadId ? { ...l, lead: { ...l.lead, status } } : l));
  }

  function generateEmail(leadId: number) {
    const lead = leads.find(l => l.lead.id === leadId);
    if (!lead) return;
    
    const subject = `⚠️ ${lead.company.name}: vuestra web está perdiendo clientes ahora mismo`;
    const body = `Estimado equipo de ${lead.company.name},\n\nHe analizado vuestra web (${lead.company.website}) y los datos son preocupantes: con un rendimiento del ${lead.analysis.score}/100, vuestra web puede estar afectando negativamente a vuestras conversiones.\n\nSi os parece interesante, estaré encantado de preparar una propuesta detallada sin compromiso. ¿Os viene bien una llamada de 20 minutos esta semana?\n\nUn saludo,\nTu Agencia`;
    
    alert(`ASUNTO: ${subject}\n\n${body}`);
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Resumen de leads y análisis web</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              Exportar Excel
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Leads" value={stats.total || 0} color="blue" />
          <StatCard label="Score Medio" value={`${stats.avgScore || 0}/100`} color="purple" />
          <StatCard label="Clientes" value={stats.byStatus?.cliente || 0} color="green" />
          <StatCard label="Interesados" value={stats.byStatus?.interesado || 0} color="orange" />
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["", "nuevo", "contactado", "interesado", "reunion", "cliente", "perdido"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors capitalize ${
                filterStatus === s
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {s || "Todos"}
            </button>
          ))}
        </div>

        {/* Tabla de leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Empresa</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Score</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">CMS</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map(({ lead, company, analysis }) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{company?.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{company?.city} · {company?.email}</div>
                    {company?.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline mt-1 flex items-center gap-1"
                      >
                        {company.website.replace(/^https?:\/\//, "").slice(0, 40)}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {analysis ? (
                      <div>
                        <span className={`text-xl font-bold ${SCORE_COLOR(analysis.score)}`}>
                          {analysis.score}
                        </span>
                        <span className="text-gray-400 text-sm">/100</span>
                        <div className="text-xs font-medium mt-1">
                          {analysis.category === "urgente" && <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded">🔴 Urgente</span>}
                          {analysis.category === "rediseno" && <span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">🟡 Rediseño</span>}
                          {analysis.category === "mantenimiento" && <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded">🟢 Mant.</span>}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">Pendiente</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                      {analysis?.cms_detected || "—"}
                    </span>
                    {analysis?.has_ssl === false && (
                      <div className="text-xs text-red-600 font-medium mt-2">⚠️ Sin SSL</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={e => updateStatus(lead.id, e.target.value)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer outline-none ring-1 ring-inset ring-black/5 ${STATUS_COLORS[lead.status] || "bg-gray-100"}`}
                    >
                      {Object.keys(STATUS_COLORS).map(s => (
                        <option key={s} value={s} className="bg-white text-gray-900">{s.toUpperCase()}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => generateEmail(lead.id)}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-50 text-blue-700 font-medium rounded-md hover:bg-blue-100 transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        Email
                      </button>
                      {company?.website && (
                        <button className="flex items-center gap-1 text-xs px-3 py-1.5 bg-purple-50 text-purple-700 font-medium rounded-md hover:bg-purple-100 transition-colors">
                          <Activity className="w-3 h-3" />
                          Análisis
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No hay leads todavía. Usa el scraper para buscar empresas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string, value: string | number, color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    green: "bg-green-50 text-green-700 border-green-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100"
  };
  return (
    <div className={`${colors[color]} border rounded-xl p-5`}>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm mt-1 font-medium opacity-80">{label}</div>
    </div>
  );
}
