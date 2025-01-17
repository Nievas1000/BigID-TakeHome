import useFetch from "../hooks/useFetch";

const Organizations = () => {
    const { data: organizations, loading, error } = useFetch('/organization');
  
    return (
      <div>
        <h2>Organizations</h2>
        {loading ? (
          <p>Loading organizations...</p>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>User Count</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map(org => (
                <tr key={org.id}>
                  <td>{org.name}</td>
                  <td>{org.userCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  
  export default Organizations;