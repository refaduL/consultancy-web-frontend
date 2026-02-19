// FILE: src/components/admin/universities/UniversityFormModal.jsx
// ============================================
import React, { useState } from "react";
import Modal from "../common/Modal";

export default function UniversityFormModal({ university, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: university?.name || "",
    country: university?.country || "",
    city: university?.city || "",
    type: university?.type || "Public",
    programs: university?.programs || 0,
    admissionSeason: university?.admissionSeason || "",
    acceptanceRate: university?.acceptanceRate || "",
    tuitionFee: university?.tuitionFee || "",
    ranking: university?.ranking || "",
    imageUrl: university?.imageUrl || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={university ? "Edit University" : "Add New University"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">University Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="e.g., Harvard University"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Research">Research University</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="e.g., USA"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="e.g., Cambridge"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Number of Programs</label>
              <input
                type="number"
                name="programs"
                value={formData.programs}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="e.g., 45"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Admission Season</label>
              <input
                type="text"
                name="admissionSeason"
                value={formData.admissionSeason}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="e.g., Spring 2025"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Acceptance Rate (%)</label>
              <input
                type="number"
                name="acceptanceRate"
                value={formData.acceptanceRate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="e.g., 15"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Tuition Fee ($)</label>
              <input
                type="number"
                name="tuitionFee"
                value={formData.tuitionFee}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="e.g., 50000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">QS Ranking</label>
              <input
                type="number"
                name="ranking"
                value={formData.ranking}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="e.g., 6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm"
          >
            {university ? "Update University" : "Add University"}
          </button>
        </div>
      </form>
    </Modal>
  );
}