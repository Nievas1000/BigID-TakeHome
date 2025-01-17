import useFetch from '../hooks/useFetch';

const Comments = () => {
    const { data: comments, loading, error } = useFetch('/comment');

    return (
      <div>
        <h2>Comments</h2>
        {loading ? (
          <p>Loading comments...</p>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Content</th>
                <th>User</th>
                <th>Article Title</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(comment => (
                <tr key={comment.id}>
                  <td>{comment.content}</td>
                  <td>{comment.user?.username || 'N/A'}</td>
                  <td>{comment.article?.title || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

export default Comments;