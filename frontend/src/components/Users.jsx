import useFetch from '../hooks/useFetch';

const Users = () => {
    const { data: users, loading, error } = useFetch('/user');
  
    return (
      <div>
        <h2>Users</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Organization</th>
                <th>Article Count</th>
                <th>Comment Count</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.organizationName}</td>
                  <td>{user.articleCount}</td>
                  <td>{user.commentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

export default Users;