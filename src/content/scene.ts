const es = {
  hint: 'Mueve el cursor. Explora una conexión.', labels: ['Operación conectada', 'Decisiones', 'Agente → Resultado'],
  descriptions: ['Personas, herramientas y datos conectados en un mismo flujo.', 'La información se organiza para encontrar señales y decidir con contexto.', 'La automatización concentra el esfuerzo en resultados y control humano.'],
  group: 'Explora el núcleo de inteligencia',
};
type SceneCopy = typeof es;
export function getSceneCopy(language: string): SceneCopy {
  if (language.startsWith('en')) return { hint: 'Move your cursor. Explore a connection.', labels: ['Connected operations', 'Decisions', 'Agent → Outcome'], descriptions: ['People, tools and data connected in a single flow.', 'Information organized to reveal signals and support decisions.', 'Automation focuses effort on outcomes and human oversight.'], group: 'Explore the intelligence core' };
  if (language.startsWith('fr')) return { hint: 'Déplacez le curseur. Explorez une connexion.', labels: ['Opérations connectées', 'Décisions', 'Agent → Résultat'], descriptions: ['Équipes, outils et données réunis dans un même flux.', 'Des informations structurées pour révéler les signaux et éclairer les décisions.', 'L’automatisation concentre les efforts sur les résultats et le contrôle humain.'], group: 'Explorez le noyau d’intelligence' };
  return es;
}
