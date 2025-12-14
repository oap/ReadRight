import { useState } from 'react';

function App() {
  const [pageText, setPageText] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);

  const handleAnalyze = async () => {
    // 1. Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.id) {
      // 2. Inject a script to read the page text
      const result = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          // This runs INSIDE the webpage
          return document.body.innerText;
        }
      });

      // 3. Get the result back
      const text = result[0].result || "";
      setPageText(text.slice(0, 500) + "..."); // Show first 500 chars preview
      setWordCount(text.split(/\s+/).length);
    }
  };

  return (
    <div className="p-4 w-full h-screen bg-gray-50 flex flex-col font-sans">
      <h1 className="text-xl font-bold text-blue-600 mb-2">Reading Level</h1>

      <div className="bg-white p-4 rounded shadow mb-4">
        <p className="text-sm text-gray-500 mb-2">Current Page Stats:</p>
        <div className="text-2xl font-bold">{wordCount} <span className="text-sm font-normal">words</span></div>
      </div>

      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Analyze This Page
      </button>

      {/* Preview Area */}
      {pageText && (
        <div className="mt-4">
          <h3 className="font-bold text-sm mb-1">Preview of text found:</h3>
          <p className="text-xs text-gray-600 p-2 bg-gray-200 rounded">
            {pageText}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;