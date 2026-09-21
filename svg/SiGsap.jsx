export default function SiGsap({ size = 40, className, ...props }) {
  return (
    <svg
      role="img"
      aria-label="GSAP"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>GSAP</title>
      <rect x="4" y="4" width="40" height="40" rx="10" fill="currentColor" fillOpacity="0.15" />
      <text
        x="24"
        y="29"
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.5px"
      >
        GSAP
      </text>
    </svg>
  );
}
