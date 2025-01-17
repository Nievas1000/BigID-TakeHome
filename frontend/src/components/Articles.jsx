import useFetch from "../hooks/useFetch";

const Articles = () => {
    const { data: articles, loading, error } = useFetch('/article');

    return (
      <div>
        <h2>Articles</h2>
        {loading ? (
          <p>Loading articles...</p>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Author Email</th>
                <th>Comment Count</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.content}</td>
                  <td>{article.user?.email || 'N/A'}</td>
                  <td>{article.commentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

export default Articles;