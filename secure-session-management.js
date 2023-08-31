const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: 'mongodb://localhost/session-store' }),
    cookie: {
      secure: true, // Set secure attribute for HTTPS
      httpOnly: true, // Restrict access to cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Example route accessing session data
app.get('/profile', (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json({ user });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Example route for logging in and creating session
app.post('/login', (req, res) => {
  // Perform authentication logic

  // Store authenticated user in session
  req.session.user = { id: userId, username: 'john' };
  res.json({ message: 'Logged in successfully' });
});
