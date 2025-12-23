'use client';

import { useState, useEffect } from 'react';
import {
  getAllManufacturers,
  getManufacturer,
  getSeries,
  type PLCManufacturer,
  type PLCSeries,
  type PLCModel,
} from '@/lib/plc-models-database';

interface PLCCascadingSelectorProps {
  onSelectionChange?: (selection: {
    manufacturer: PLCManufacturer | null;
    series: PLCSeries | null;
    model: PLCModel | null;
  }) => void;
  defaultManufacturerId?: string;
  defaultSeriesId?: string;
  defaultModelId?: string;
}

export default function PLCCascadingSelector({
  onSelectionChange,
  defaultManufacturerId,
  defaultSeriesId,
  defaultModelId,
}: PLCCascadingSelectorProps) {
  const [manufacturers] = useState<PLCManufacturer[]>(getAllManufacturers());
  const [selectedManufacturer, setSelectedManufacturer] = useState<PLCManufacturer | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<PLCSeries | null>(null);
  const [selectedModel, setSelectedModel] = useState<PLCModel | null>(null);

  // Initialize with defaults
  useEffect(() => {
    if (defaultManufacturerId) {
      const mfr = getManufacturer(defaultManufacturerId);
      if (mfr) {
        setSelectedManufacturer(mfr);

        if (defaultSeriesId) {
          const ser = getSeries(defaultManufacturerId, defaultSeriesId);
          if (ser) {
            setSelectedSeries(ser);

            if (defaultModelId) {
              const mod = ser.models.find(m => m.id === defaultModelId);
              if (mod) {
                setSelectedModel(mod);
              }
            }
          }
        }
      }
    }
  }, [defaultManufacturerId, defaultSeriesId, defaultModelId]);

  // Notify parent of selection changes
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange({
        manufacturer: selectedManufacturer,
        series: selectedSeries,
        model: selectedModel,
      });
    }
  }, [selectedManufacturer, selectedSeries, selectedModel, onSelectionChange]);

  const handleManufacturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const manufacturerId = e.target.value;
    if (!manufacturerId) {
      setSelectedManufacturer(null);
      setSelectedSeries(null);
      setSelectedModel(null);
      return;
    }

    const manufacturer = manufacturers.find(m => m.id === manufacturerId);
    if (manufacturer) {
      setSelectedManufacturer(manufacturer);
      setSelectedSeries(null);
      setSelectedModel(null);
    }
  };

  const handleSeriesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const seriesId = e.target.value;
    if (!seriesId || !selectedManufacturer) {
      setSelectedSeries(null);
      setSelectedModel(null);
      return;
    }

    const series = selectedManufacturer.series.find(s => s.id === seriesId);
    if (series) {
      setSelectedSeries(series);
      setSelectedModel(null);
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelId = e.target.value;
    if (!modelId || !selectedSeries) {
      setSelectedModel(null);
      return;
    }

    const model = selectedSeries.models.find(m => m.id === modelId);
    if (model) {
      setSelectedModel(model);
    }
  };

  return (
    <div className="space-y-6">
      {/* Manufacturer Selection */}
      <div>
        <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-2">
          1. Select Manufacturer
        </label>
        <select
          id="manufacturer"
          value={selectedManufacturer?.id || ''}
          onChange={handleManufacturerChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Choose a manufacturer...</option>
          {manufacturers.map(manufacturer => (
            <option key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.name}
            </option>
          ))}
        </select>
      </div>

      {/* Series Selection */}
      {selectedManufacturer && (
        <div className="animate-fadeIn">
          <label htmlFor="series" className="block text-sm font-medium text-gray-700 mb-2">
            2. Select PLC Series
          </label>
          <select
            id="series"
            value={selectedSeries?.id || ''}
            onChange={handleSeriesChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Choose a series...</option>
            {selectedManufacturer.series.map(series => (
              <option key={series.id} value={series.id}>
                {series.name}
              </option>
            ))}
          </select>

          {selectedSeries && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Description:</span> {selectedSeries.description}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <span className="font-semibold">Software:</span> {selectedSeries.software}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Model Selection */}
      {selectedSeries && selectedSeries.models.length > 0 && (
        <div className="animate-fadeIn">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
            3. Select Specific Model
          </label>
          <select
            id="model"
            value={selectedModel?.id || ''}
            onChange={handleModelChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Choose a model...</option>
            {selectedSeries.models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name} {model.partNumber ? `(${model.partNumber})` : ''}
              </option>
            ))}
          </select>

          {selectedModel && selectedModel.specifications && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Model Specifications</h4>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase">Model Name</dt>
                  <dd className="text-sm font-semibold text-gray-900">{selectedModel.name}</dd>
                </div>
                {selectedModel.partNumber && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase">Part Number</dt>
                    <dd className="text-sm font-semibold text-gray-900">{selectedModel.partNumber}</dd>
                  </div>
                )}
                {Object.entries(selectedModel.specifications).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-xs font-medium text-gray-500 uppercase">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </dt>
                    <dd className="text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      )}

      {/* Summary Card */}
      {selectedManufacturer && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Current Selection</h4>
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-medium">Manufacturer:</span>{' '}
              <span className="text-green-600">{selectedManufacturer.name}</span>
            </p>
            {selectedSeries && (
              <p>
                <span className="font-medium">Series:</span>{' '}
                <span className="text-green-600">{selectedSeries.name}</span>
              </p>
            )}
            {selectedModel && (
              <p>
                <span className="font-medium">Model:</span>{' '}
                <span className="text-green-600">
                  {selectedModel.name}
                  {selectedModel.partNumber && ` (${selectedModel.partNumber})`}
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
