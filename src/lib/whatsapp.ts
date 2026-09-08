export type ContactContext = { kind: 'general' } | { kind: 'plan' | 'demo'; name: string };
export function getWhatsAppUrl(language = 'es', context: ContactContext = { kind: 'general' }) {
  const messages = language.startsWith('fr')
    ? ['Bonjour HusAI, je souhaite discuter des opérations de mon entreprise.', 'Je souhaite en savoir plus sur l’offre', 'Je souhaite explorer cette solution pour mon entreprise :']
    : language.startsWith('en')
      ? ['Hello HusAI, I would like to discuss my business operations.', 'I would like to learn more about the plan', 'I would like to explore this solution for my business:']
      : ['Hola HusAI, quiero conversar sobre la operación de mi empresa.', 'Me interesa conocer el plan', 'Quiero explorar esta solución para mi empresa:'];
  const message = context.kind === 'general' ? messages[0] : `${messages[0]} ${messages[context.kind === 'plan' ? 1 : 2]} ${context.name}.`;
  return `https://wa.me/573212686430?text=${encodeURIComponent(message)}`;
}
