interface Avatar {
  id: string
  name: string
  email: string
  imageUrl: string
  type: string
}

function AvatarCard({ avatar }: { avatar: Avatar }) {
  return (
    <div className="avatar-card">
      <img src={avatar.imageUrl} alt={avatar.name} className="avatar-image" />
      <h3>{avatar.name}</h3>
      <p>{avatar.email}</p>
      <p>{avatar.type}</p>
      <button className="btn btn-secondary">Edit</button>
    </div>
  )
}

export default AvatarCard
