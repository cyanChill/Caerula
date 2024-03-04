import { cn } from "@/lib/style";

interface ModalBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  isVisible: boolean;
}

/** @description Reusable backdrop for any modal-like component. */
export default function ModalBackdrop({
  isVisible,
  children,
  className,
  style,
  ...props
}: ModalBackdropProps) {
  return (
    <div
      {...props}
      style={style}
      className={cn(
        "pointer-events-none fixed inset-0 z-20 overflow-clip backdrop-blur-2xl",
        "bg-black/50 opacity-0 transition-opacity duration-500",
        { "pointer-events-auto opacity-100": isVisible },
        className,
      )}
    >
      {children}
    </div>
  );
}
