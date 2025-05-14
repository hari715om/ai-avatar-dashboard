import { useState, useEffect } from 'react';
import './index.css';

interface Avatar {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  type: string;
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [avatars, setAvatars] = useState<Avatar[]>([]); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    imageUrl: '',
    type: 'Personal Assistant',
  }); // Form data for new avatar

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://reqres.in/api/users?per_page=3') 
      .then((res) => res.json())
      .then((data) => {
        const fetchedAvatars = data.data.map((user: any) => ({
          id: user.id.toString(),
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          imageUrl: user.avatar,
          type: 'Personal Assistant', 
        }));
        setAvatars(fetchedAvatars); 
        setLoading(false); 
      })
      .catch((err) => {
        console.error('Failed to fetch avatars:', err);
        setLoading(false); 
      });
  }, []);

  const handleCreateAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    const newAvatar: Avatar = {
      id: Date.now().toString(),
      ...formData,
    };
    setAvatars([...avatars, newAvatar]);
    setFormData({
      name: '',
      email: '',
      imageUrl: '',
      type: 'Personal Assistant',
    });
    setShowForm(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>AI Avatar Dashboard</h1>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="welcome-section">
            <h2 className="welcome-message">Welcome back, User ✨</h2>
          </div>

          <section className="avatars-section">
            <h2 className="section-title">Your AI Avatars</h2>
            <p className="section-description">
              Manage and customize your intelligent companions
            </p>

            {loading ? (
              <div className="no-avatars">Loading avatars...</div>
            ) : avatars.length === 0 ? (
              <div className="no-avatars">No avatars found</div>
            ) : (
              <div className="avatar-grid">
                {avatars.map((avatar) => (
                  <div key={avatar.id} className="avatar-card">
                    <img
                      src={avatar.imageUrl}
                      alt={avatar.name}
                      className="avatar-img"
                    />
                    <h3>{avatar.name}</h3>
                    <p>{avatar.email}</p>
                    <p>{avatar.type}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary"
            >
              + Create New Avatar
            </button>
          </section>

          {/* Avatar Creation Form */}
          {showForm && (
            <section className="form-section">
              <h2 className="section-title">Create New Avatar</h2>
              <form onSubmit={handleCreateAvatar}>
                <div className="form-group">
                  <label className="form-label">Avatar Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter avatar name"
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
                    placeholder="avatar@example.com"
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
                    placeholder="https://example.com/avatar"
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
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    Create Avatar
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
