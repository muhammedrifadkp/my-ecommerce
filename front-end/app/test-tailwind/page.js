export default function TestTailwind() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Testing Tailwind CSS
      </h1>
      <p className="text-gray-600 mb-8">
        If you can see this text in gray and the heading in blue, Tailwind CSS is working!
      </p>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-500 p-4 text-white rounded">Red Box</div>
        <div className="bg-green-500 p-4 text-white rounded">Green Box</div>
        <div className="bg-blue-500 p-4 text-white rounded">Blue Box</div>
      </div>
    </div>
  );
}
