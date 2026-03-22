import { useTextScramble } from "@/hooks/useTextScramble";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const TextScramble = ({ text, className = "", delay = 0 }: TextScrambleProps) => {
  const { display, ref } = useTextScramble(text, { delay });

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {display}
    </span>
  );
};

export default TextScramble;
