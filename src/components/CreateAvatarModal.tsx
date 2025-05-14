import { useState } from 'react'

interface Avatar {
  id: string
  name: string
  email: string
  imageUrl: string
  type: string
}

function CreateAvatarModal({
  onClose,
  onCreate
}: {
  onClose: () => void
  onCreate: (avatar: Avatar) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    imageUrl: '',
    type: 'Personal Assistant'
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAvatar: Avatar = {
      id: Date.now().toString(),
      ...formData
    }
    onCreate(newAvatar)
    onClose()
  }

  return (
    <section className="form-section">
      <h2 className="section-title">Create New Avatar</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Avatar Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Avatar Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Avatar Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="form-select"
          >
            <option>Personal Assistant</option>
            <option>Teacher</option>
            <option>Friend</option>
            <option>Coach</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Create Avatar
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateAvatarModal
