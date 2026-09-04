
import React, { useState } from "react";
import {
  Pencil,
  Mail,
  Phone,
  Calendar,
  User,
  Save,
  X,
} from "@animateicons/react/lucide";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    number: "9876543210",
    dob: "2000-05-15",
  });

  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later connect this to Laravel:
    // PUT /api/profile

    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Profile Header */}
          <div className="border-b border-gray-200 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              {/* Avatar + Name */}
              <div className="flex items-center gap-4">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-red-100 text-2xl font-semibold text-red-600">
                  {profile.first_name?.charAt(0)}
                  {profile.last_name?.charAt(0)}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {profile.first_name} {profile.last_name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {profile.email}
                  </p>
                </div>

              </div>

              {/* Edit / Cancel */}
              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <X size={16} />
                  Cancel
                </button>
              )}

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <div className="px-6 py-7 sm:px-8">

              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900">
                  Personal Information
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your personal details associated with this account.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* First Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    First Name
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  ) : (
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                      <User size={17} className="text-gray-400" />

                      <span className="text-sm text-gray-800">
                        {profile.first_name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Last Name
                  </label>

                  {isEditing ? (
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  ) : (
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                      <User size={17} className="text-gray-400" />

                      <span className="text-sm text-gray-800">
                        {profile.last_name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  ) : (
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                      <Mail size={17} className="text-gray-400" />

                      <span className="text-sm text-gray-800">
                        {profile.email}
                      </span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  {isEditing ? (
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  ) : (
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                      <Phone size={17} className="text-gray-400" />

                      <span className="text-sm text-gray-800">
                        {profile.number}
                      </span>
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>

                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                  ) : (
                    <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3">
                      <Calendar size={17} className="text-gray-400" />

                      <span className="text-sm text-gray-800">
                        {profile.dob}
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Save Footer */}
            {isEditing && (
              <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:px-8">

                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  <Save size={16} />
                  Save Changes
                </button>

              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

