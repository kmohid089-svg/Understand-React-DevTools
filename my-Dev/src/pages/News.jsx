import { useState, useEffect } from 'react';
import axios from 'axios';
import { SectionTitle } from '../components/Ui';

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        setPosts(res.data);
      } catch (err) {
        setError('Failed to load');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-5 py-16">
      <SectionTitle
        eyebrow="API Data"
        title="Live posts from JSONPlaceholder"
        center
      />

      {loading && (
        <p className="mt-10 text-center text-slate-500 font-semibold">Loading posts…</p>
      )}

      {error && (
        <p className="mt-10 text-center text-red-500 font-semibold">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-700">
                Post #{post.id}
              </p>
              <h3 className="text-lg font-extrabold capitalize text-slate-950 leading-snug">
                {post.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{post.body}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
