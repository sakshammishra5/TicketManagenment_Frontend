import React, { useEffect, useState } from "react";
import "./Team.css";
import {
  getTeamMembers,
  addTeamMember,
  updateMember,
  deleteMember,
} from "../../../services/api";
import { Edit2, Trash2, Plus } from "lucide-react";

const emptyForm = {
  id: null,
  name: "",
  email: "",
  phone: "",
  role: "Member",
};

const Team = () => {
  const [members, setMembers] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [isEditMode, setIsEditMode] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getTeamMembers();
        const list = res.data || [];
        setMembers(list);
      } catch (err) {
        console.error("Failed to load members", err);
      }
    };
    fetchMembers();
  }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData(emptyForm);
    setShowFormModal(true);
  };

  const openEditModal = (member) => {
    setIsEditMode(true);
    setFormData({
      id: member.id,
      name: member.firstName || member.fullName || "",
      email: member.email || "",
      phone: member.phone || "",
      role: member.role || "Member",
    });
    setShowFormModal(true);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setFormData(emptyForm);
  };

  const handleFormChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      username: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
    };

    try {
      if (isEditMode) {
        const res = await updateMember(formData.id, payload);
        setMembers((prev) =>
          prev.map((m) => (m.id === formData.id ? res.data : m))
        );
      } else {
        const res = await addTeamMember(payload);
        setMembers((prev) => [...prev, res.data]);
      }
      closeFormModal();
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  const openDeleteModal = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setMemberToDelete(null);
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    try {
      await deleteMember(memberToDelete.id);
      setMembers((prev) => prev.filter((m) => m.id !== memberToDelete.id));
      closeDeleteModal();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <div className="team-page">
      {/* Header */}
      <div className="team-header-row">
        <h2 className="team-title">Team</h2>
      </div>

      {/* Divider */}
      <div className="team-divider" />

      {/* Table */}
      <div className="team-table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>
                Full Name
                <span className="sort-arrow">▾</span>
              </th>
              <th>Phone</th>
              <th>Email</th>
              <th>role</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-row">
                  No team members yet.
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div className="member-cell">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m._id}`}
                        alt={m.firstName || "Member"}
                        className="avatar"
                      />
                      <span className="member-name">
                        {m.firstName || m.fullName || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td>{m.phone || "—"}</td>
                  <td>{m.email || "—"}</td>
                  <td>{m.role || "Member"}</td>
                  <td className="actions-col">
                    {m.role !== "Admin" && (
                      <>
                        <button
                          className="icon-btn"
                          onClick={() => openEditModal(m)}
                          title="Edit"
                          aria-label="Edit member"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          className="icon-btn"
                          onClick={() => openDeleteModal(m)}
                          title="Delete"
                          aria-label="Delete member"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Button */}
      <div className="team-footer">
        <button className="add-btn" onClick={openAddModal}>
          <span className="add-btn-icon">
            <Plus size={16} strokeWidth={2.5} />
          </span>
          <span>Add Team members</span>
        </button>
      </div>

      {/* ADD/EDIT MODAL */}
      {showFormModal && (
        <div className="modal-overlay" onClick={closeFormModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEditMode ? "Edit Member" : "Add Team members"}</h3>
            </div>

            <p className="modal-subtitle">
              Talk with colleagues in a group chat. Messages in this group are
              only visible to its participants. New teammates may only be
              invited by the administrators.
            </p>

            <form onSubmit={handleSave} className="modal-form">
              <label className="modal-label">
                Full name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="modal-input"
                  placeholder="Full name"
                  required
                />
              </label>

              <label className="modal-label">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="modal-input"
                  placeholder="example@gmail.com"
                  required
                />
              </label>

              <label className="modal-label">
                Phone
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="modal-input"
                  placeholder="+1 (000) 000-0000"
                />
              </label>

              <label className="modal-label">
                Role
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  className="modal-select"
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                </select>
              </label>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeFormModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div
            className="modal-card modal-card--small"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="delete-text">This teammate will be deleted.</p>

            <div className="modal-footer modal-footer--center">
              <button className="btn-cancel" onClick={closeDeleteModal}>
                Cancel
              </button>

              <button className="btn-primary" onClick={confirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;