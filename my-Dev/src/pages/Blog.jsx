import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  CircularProgress,
  Alert,
  TextField,
  Box,
  Stack,
} from '@mui/material';

export default function Blog() {
  // ── Post list state ──────────────────────────────────────────────
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  function loadPosts() {
    setLoading(true);
    setFetchError('');
    axios
      .get('https://jsonplaceholder.typicode.com/posts?_limit=6')
      .then((res) => setPosts(res.data))
      .catch(() => setFetchError('Failed to load posts. Please try again.'))
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadPosts(); }, []);

  // ── Create post form state ───────────────────────────────────────
  const [title,  setTitle]  = useState('');
  const [body,   setBody]   = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});
  const [formAlert, setFormAlert] = useState(null); // { type, msg }

  function validate() {
    const e = {};
    if (!title.trim())  e.title  = true;
    if (!body.trim())   e.body   = true;
    if (!author.trim()) e.author = true;
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);

    if (Object.keys(e2).length > 0) {
      setFormAlert({ type: 'error', msg: 'Please fill in all required fields.' });
      return;
    }

    setFormAlert({ type: 'success', msg: 'Post created successfully! (demo)' });
    setTimeout(() => {
      setTitle('');
      setBody('');
      setAuthor('');
      setErrors({});
      setFormAlert(null);
    }, 2000);
  }

  // ── Render ───────────────────────────────────────────────────────
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>

      {/* Page heading */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        MetaBank Blog
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Latest articles and updates from MetaBank.
      </Typography>

      {/* ── Post list ── */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {fetchError && (
        <Alert
          severity="error"
          sx={{ mb: 4 }}
          action={
            <Button color="inherit" size="small" onClick={loadPosts}>
              Retry
            </Button>
          }
        >
          {fetchError}
        </Alert>
      )}

      {!loading && !fetchError && (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.body}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
                  <Button size="small" variant="text" color="primary">
                    Read more
                  </Button>
                  <Chip label={`#${post.id}`} size="small" color="primary" variant="outlined" />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ── Create post form ── */}
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Write a Post
      </Typography>

      {formAlert && (
        <Alert severity={formAlert.type} sx={{ mb: 2 }}>
          {formAlert.msg}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            error={!!errors.title}
            helperText={errors.title ? 'Title is required' : ''}
            fullWidth
          />
          <TextField
            label="Post Content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            multiline
            rows={4}
            error={!!errors.body}
            helperText={errors.body ? 'Content is required' : ''}
            fullWidth
          />
          <TextField
            label="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            error={!!errors.author}
            helperText={errors.author ? 'Author is required' : ''}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large">
            Publish Post
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
