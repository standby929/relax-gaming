type ValidationMessageProps = {
  message?: string;
};

export default function ValidationMessage({ message }: ValidationMessageProps) {
  if (!message) return null;

  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}
