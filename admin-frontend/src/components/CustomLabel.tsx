type CustomLabelProps = {
  children: React.ReactNode;
  required?: boolean;
};

export default function CustomLabel({ children, required = false }: CustomLabelProps) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}
