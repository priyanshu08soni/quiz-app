"use client"

import { useState } from "react"
import { ChevronDown, BarChart3, Search } from "lucide-react"

export default function GraphFilter({ selectedGraph, setSelectedGraph, groupedAttempts }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const graphOptions = groupedAttempts ? Object.keys(groupedAttempts) : []
  const filteredOptions = graphOptions.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))

  const displayValue = selectedGraph || (graphOptions.length > 0 ? graphOptions[0] : "Choose a graph to visualize")
  const effectiveSelection = selectedGraph || (graphOptions.length > 0 ? graphOptions[0] : null)

  const handleSelect = (title) => {
    setSelectedGraph(title)
    setIsOpen(false)
    setSearchTerm("")
  }

  if (!groupedAttempts || Object.keys(groupedAttempts).length === 0) {
    return (
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-gray-400" />
          <label className="text-sm font-semibold text-gray-500">Graph Selection</label>
        </div>
        <div className="w-full px-4 py-3.5 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-500 font-medium">
          No graphs available
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <label className="text-sm font-semibold text-gray-900">Graph Selection</label>
      </div>

      {/* Dropdown Container */}
      <div className="relative">
        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3.5 
                     bg-gradient-to-r from-blue-50 to-indigo-50 
                     border-2 border-blue-200 rounded-xl 
                     text-gray-800 font-medium
                     hover:from-blue-100 hover:to-indigo-100 
                     hover:border-blue-300 hover:shadow-md
                     focus:outline-none focus:ring-4 focus:ring-blue-100 
                     focus:border-blue-400
                     transition-all duration-200 ease-out
                     group"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-blue-600 transition-colors" />
            <span className="text-left">{displayValue}</span>
          </div>
          <ChevronDown
            size={20}
            className={`text-blue-600 transition-all duration-200 ${
              isOpen ? "rotate-180 scale-110" : "group-hover:scale-110"
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 z-50">
            <div
              className="bg-white border-2 border-blue-200 rounded-xl shadow-xl 
                           backdrop-blur-sm overflow-hidden"
            >
              {/* Search Bar */}
              {graphOptions.length > 5 && (
                <div className="p-3 border-b border-gray-100 bg-gray-50">
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                     w-4 h-4 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Search graphs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 
                               rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 
                               focus:border-blue-300 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Options List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((title, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect(title)}
                      className={`w-full px-4 py-3 text-left text-sm font-medium
                                 transition-all duration-150 ease-out
                                 hover:bg-blue-50 hover:text-blue-700
                                 focus:outline-none focus:bg-blue-50 focus:text-blue-700
                                 ${
                                   // Use effectiveSelection for comparison
                                   effectiveSelection === title
                                     ? "bg-blue-100 text-blue-800 border-r-4 border-blue-500"
                                     : "text-gray-700"
                                 }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            // Use effectiveSelection for comparison
                            effectiveSelection === title ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        />
                        <span className="truncate">{title}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500 text-sm">
                    <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    No graphs found matching "{searchTerm}"
                  </div>
                )}
              </div>

              {/* Footer Info */}
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  {graphOptions.length} graph{graphOptions.length !== 1 ? "s" : ""} available
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsOpen(false)
            setSearchTerm("")
          }}
        />
      )}
    </div>
  )
}
