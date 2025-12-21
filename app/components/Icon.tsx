interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className = '' }: IconProps) {
  return (
    <span className={`material-icons ${className}`}>
      {name}
    </span>
  );
}
