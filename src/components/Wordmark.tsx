/** Geometric single-storey a: circular bowl and a straight right stem. */
export default function Wordmark({ className = '' }: { className?: string }) {
  return <svg className={`husai-wordmark ${className}`} viewBox="0 0 133 43" role="img" aria-label="husai" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5v31m0-13c0-13 20-13 20 0v13" />
      <path d="M36 15v12c0 12 20 12 20 0V15" />
      <path d="M83 17c-3-4-17-5-17 2 0 8 17 4 17 12 0 7-14 7-19 2" />
      <circle cx="101" cy="26" r="10" /><path d="M111 16v20M124 16v20" />
    </g><circle cx="124" cy="6" r="2.5" fill="currentColor" />
  </svg>;
}
