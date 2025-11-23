export default function Input({ id, label, type = "text", value, onChange, placeholder, className = "" }) {
  return (
<div className={`flex flex-col space-y-1 sm:space-y-2 ${className}`}>
  <label htmlFor={id} className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-200">
    {label}
  </label>

  <input
    required
    id={id}
    name={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={
      "w-full rounded-lg border border-gray-600 bg-gray-800 " +
      "px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-2.5 md:text-base lg:px-4 lg:py-3 lg:text-lg " +
      "text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 " +
      "focus:ring-offset-2 focus:ring-offset-gray-900 transition"
    }
    aria-label={label}
  />
</div>
  );
}