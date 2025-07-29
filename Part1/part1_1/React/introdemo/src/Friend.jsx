const Friend = () => {
    const friends = [ 'Peter', 'Maya']
  
    return (
      <div>
        <p>{friends}</p>
        <FriendApp />
      </div>
    )
  }

  const FriendApp = () => {
    const friends = [
      { name: 'Peter', age: 4 },
      { name: 'Maya', age: 10 },
    ]
  
    return (
      <div>
        <p>{friends[0].name} {friends[0].age}</p>
        <p>{friends[1].name} {friends[1].age}</p>
      </div>
    )
  }
  
  export default Friend