// ==============================
// Import Dependencies
// ==============================
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const { cp } = require('fs');

// ==============================
// App Initialization
// ==============================
const app = express();
const PORT = 5050;

// ==============================
// Database Connection
// ==============================
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'booksaw_co',
  charset: 'utf8mb4',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected ✅');
});

// ==============================
// Middleware
// ==============================

// Static files
app.use(express.static('public'));
app.use(express.static('public', { index: false }));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session config
app.use(
  session({
    secret: 'bhoopendra',
    resave: false,
    saveUninitialized: false,
  })
);

// Cache control and locals injection
app.use((req, res, next) => {
  res.header(
    'Cache-Control',
    'no-cache, no-store, must-revalidate, private, max-stale=0, post-check=0, pre-check=0'
  );

  // Admin Session Data
  res.locals.aname = req.session.ana;
  res.locals.aem = req.session.aem;

  // User Session Data
  res.locals.user = req.session.uname;
  res.locals.uEmail = req.session.uemail;
  res.locals.ToCount = req.session.Tcount;

  // Order Session Data
  res.locals.total_amt = req.session.totalSum;
  res.locals.delDate = req.session.del_date;

  next();
});

// ==============================
// Multer uploads
// ==============================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './public/images/book_img');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// ==============================
// Routes
// ==============================

/* ------------------------
      PUBLIC ROUTES
------------------------ */

// Landing / Home
app.get(['/', '/index', '/back_home'], (req, res) => {
  const popularBooksQuery = `SELECT book_name, author, cate, file_name, SUM(quantity) AS total_sold FROM order_items WHERE status != 'Cancelled' GROUP BY book_name, author, cate, file_name, price ORDER BY total_sold DESC LIMIT 6`;

  db.query(popularBooksQuery, (err, result) => {
    if (err) throw err;

    res.render('landing', {
      user: req.session.uname || null,
      uEmail: req.session.uemail || null,
      popularBooks: result,
      currentPage: 'home',
    });
  });
});

/* ------------------------
USER AUTH
------------------------ */

// Register, Login Pages & update password
app.get('/reg', (req, res) => res.render('userSignup', { error: null }));
app.get('/login', (req, res) => res.render('userLogin', { error: null }));
app.get('/updPasswd', (req, res) =>
  res.render('userUpdatePwd', { error: null })
);

// Registration
app.post('/regProcess', (req, res) => {
  const { name, email, pwd } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2)
    errors.push('Please enter a valid name.');
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    errors.push('Enter a valid email.');
  if (!pwd || pwd.length < 6)
    errors.push('Password must be at least 6 characters.');

  // Validation errors → 422
  if (errors.length) {
    return res.status(422).render('userSignup', { error: errors.join(' | ') });
  }

  const check = 'SELECT 1 FROM members WHERE email = ? LIMIT 1';
  db.query(check, [email], (err, rows) => {
    // DB/server error → 500
    if (err)
      return res
        .status(500)
        .render('userSignup', { error: 'Server error. Try again.' });

    // Conflict (duplicate email) → 409
    if (rows.length)
      return res
        .status(409)
        .render('userSignup', { error: 'Email already registered.' });

    const insert = 'INSERT INTO members (name, email, pwd) VALUES (?, ?, ?)';
    db.query(insert, [name, email, pwd], (err2) => {
      // DB/server error → 500
      if (err2)
        return res
          .status(500)
          .render('userSignup', { error: 'Could not create account.' });

      // Success → redirect (no error status needed)
      res.redirect('/login?registered=1');
    });
  });
});

// Login
app.post('/logProcess', (req, res) => {
  const { email, pwd } = req.body;

  // Validation error → 422
  if (!email || !pwd) {
    return res.status(422).render('userLogin', {
      error: 'Both email and password are required.',
    });
  }

  const query = 'SELECT * FROM members WHERE email = ? LIMIT 1';
  db.query(query, [email], (err, result) => {
    // DB/server error → 500
    if (err)
      return res
        .status(500)
        .render('userLogin', { error: 'Server error. Try again.' });

    // Not found → 401 (unauthorized)
    if (!result.length)
      return res.status(401).render('userLogin', { error: 'Email not found.' });

    const user = result[0];
    // Wrong password → 401 (unauthorized)
    if (user.pwd !== pwd) {
      return res
        .status(401)
        .render('userLogin', { error: 'Incorrect password.' });
    }

    // Success → redirect
    req.session.uname = user.name;
    req.session.uemail = user.email;
    res.redirect('/');
  });
});

// Update Password
app.post('/updPasswdProcess', (req, res) => {
  const { email, pwd, new_pwd } = req.body;

  // 1. Basic validation
  if (!email || !pwd || !new_pwd) {
    return res.status(422).render('userUpdatePwd', {
      error: 'Email, old password, and new password are required.',
    });
  }
  if (new_pwd.length < 6) {
    return res.status(422).render('userUpdatePwd', {
      error: 'New password must be at least 6 characters long.',
    });
  }

  // 2. Check if email + old password match
  const checkQuery = 'SELECT * FROM members WHERE email = ? LIMIT 1';
  db.query(checkQuery, [email], (err, result) => {
    if (err) {
      return res.status(500).render('userUpdatePwd', {
        error: 'Server error. Please try again later.',
      });
    }

    if (!result.length) {
      return res.status(401).render('userUpdatePwd', {
        error: 'Email not found.',
      });
    }

    const user = result[0];
    if (user.pwd !== pwd) {
      return res.status(401).render('userUpdatePwd', {
        error: 'Old password is incorrect.',
      });
    }

    // 3. Update password
    const updQuery = 'UPDATE members SET pwd = ? WHERE email = ?';
    db.query(updQuery, [new_pwd, email], (err2) => {
      if (err2) {
        return res.status(500).render('userUpdatePwd', {
          error: 'Could not update password. Try again.',
        });
      }

      // 4. Success → redirect to login
      res.redirect('/login?pwdUpdated=1');
    });
  });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// Manage Customer profile
app.get('/profileData', (req, res) => {
  const userEmail = req.session.uemail;
  if (!userEmail) return res.status(401).send('Unauthorized');

  const query = `
    SELECT m.name, m.email, d.u_mobileNo, d.address, d.city, d.pin, d.state, d.country
    FROM members m
    LEFT JOIN delivery_detail d ON m.email = d.u_email
    WHERE m.email = ?
  `;

  db.query(query, [userEmail], (err, results) => {
    if (err) throw err;
    const data = results[0] || {};
    res.json(data); // send as JSON
  });
});

// update customer's data
app.post('/updateProfile', (req, res) => {
  const userEmail = req.session.uemail; // get from session (email = PK)
  const { name, mobile, address, city, pin, state, country } = req.body;

  if (!userEmail) {
    return res.redirect('/login');
  }

  // 1. Update name in members
  const updateMemberQuery = 'UPDATE members SET name = ? WHERE email = ?';
  db.query(updateMemberQuery, [name, userEmail], (err, memberResult) => {
    if (err) throw err;

    // 2. Check if delivery_detail exists for this user
    const checkQuery =
      'SELECT delivery_id FROM delivery_detail WHERE u_email = ?';
    db.query(checkQuery, [userEmail], (err, rows) => {
      if (err) throw err;

      if (rows.length > 0) {
        // Already exists → UPDATE
        const updateDelivery =
          'UPDATE delivery_detail SET u_name=?, u_mobileNo=?, address=?, city=?, pin=?, state=?, country=? WHERE u_email=?';
        db.query(
          updateDelivery,
          [name, mobile, address, city, pin, state, country, userEmail],
          (err, deliveryResult) => {
            if (err) throw err;
            res.redirect('/'); // or wherever you want
          }
        );
      } else {
        // No record → INSERT new
        const insertDelivery =
          'INSERT INTO delivery_detail (u_name, u_email, u_mobileNo, address, city, pin, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(
          insertDelivery,
          [name, userEmail, mobile, address, city, pin, state, country],
          (err, deliveryResult) => {
            if (err) throw err;
            res.redirect('/');
          }
        );
      }
    });
  });
});

// Customer can delete a/c
// Handle profile deletion
app.post('/deleteProfile', (req, res) => {
  const userEmail = req.session.uemail;

  db.query('DELETE FROM members WHERE email = ?', [userEmail], (err) => {
    if (err) throw err;

    // Destroy session after delete
    req.session.destroy((err) => {
      if (err) console.error('Session destroy error:', err);
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

/* ------------------------
      ADMIN ROUTES
------------------------ */
// ADMIN Login Page
app.get('/login_admin', (req, res) => {
  res.render('adminLogin', { error: null });
});

// Admin Dashboard
app.get(['/admin', '/backHome'], (req, res) => {
  // not logged in
  if (!req.session.ana) {
    return res.redirect('/login_admin');
  }

  const membersQuery = 'SELECT * FROM members';
  const booksQuery = 'SELECT * FROM Books';
  const ordersQuery = `SELECT SUM(oi.price * oi.quantity) as revenue FROM order_items oi 
        WHERE oi.status !='cancelled'`;
  const orderItemsQuery = `SELECT SUM(quantity) as bookSold FROM order_items 
        WHERE status !='cancelled' `;

  db.query(membersQuery, (err, members) => {
    if (err) throw err;
    const count = members.length;

    db.query(booksQuery, (err, books) => {
      if (err) throw err;
      const bCount = books.length;

      db.query(ordersQuery, (err, revenue) => {
        if (err) throw err;
        // const totalRevenue = revenue['sum(total_amount)'];
        const totalRevenue = revenue[0].revenue || 0;

        db.query(orderItemsQuery, (err, bookSold) => {
          if (err) throw err;
          const totalSold = bookSold[0].bookSold || 0;

          const popularBooksQuery = `SELECT book_name, author, cate, file_name, price,
                SUM(quantity) AS total_sold, SUM(quantity * price) AS total_sales
                FROM order_items WHERE status != 'Cancelled'
                GROUP BY book_name, author, cate, file_name, price
                ORDER BY total_sold DESC
                LIMIT 10`;

          db.query(popularBooksQuery, (err, popularBooksResult) => {
            if (err) throw err;

            res.render('admin', {
              ana: req.session.ana,
              aem: req.session.aem,
              bCount,
              count,
              revenue: totalRevenue,
              bookSold: totalSold,
              popularBooks: popularBooksResult,
              currentPage: 'home',
            });
          });
        });
      });
    });
  });
});

// Admin Login Process
app.post('/admin_logProcess', (req, res) => {
  const { email, pwd } = req.body;

  // Basic validation → 422
  if (!email || !pwd) {
    return res.status(422).render('adminLogin', {
      error: 'Both email and password are required.',
    });
  }

  const adminQuery = 'SELECT * FROM admin_log WHERE email = ? LIMIT 1';
  db.query(adminQuery, [email], (err, result) => {
    // DB/server error → 500
    if (err) {
      return res.status(500).render('adminLogin', {
        error: 'Server error. Try again.',
      });
    }

    // Email not found → 401
    if (!result.length) {
      return res.status(401).render('adminLogin', {
        error: 'Email not found.',
      });
    }

    const admin = result[0];

    // Wrong password → 401
    if (admin.pwd !== pwd) {
      return res.status(401).render('adminLogin', {
        error: 'Incorrect password.',
      });
    }

    // Success → redirect
    req.session.ana = admin.name;
    req.session.aem = admin.email;
    res.redirect('/admin');
  });
});

// Logout ADMIN
app.get('/logout_admin', (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.clearCookie('connect.sid');
    res.redirect('/login_admin');
  });
});

// Show Users / Books / Counts
app.get('/show_customers', (req, res) => {
  // not logged in
  if (!req.session.ana) {
    return res.redirect('/login_admin');
  }

  db.query('SELECT * FROM members', (err, users) => {
    if (err) throw err;
    res.render('users', {
      data: users,
      currentPage: 'customers',
    });
  });
});

app.get('/show_books', (req, res) => {
  // not logged in
  if (!req.session.ana) {
    return res.redirect('/login_admin');
  }

  db.query('SELECT * FROM books', (err, books) => {
    if (err) throw err;

    const bookCountQuery = `SELECT count(book_id) AS total_books FROM books;`;

    db.query(bookCountQuery, (err, totalBooks) => {
      if (err) throw err;

      const bestSellerBookQuery = `SELECT author, file_name,
       SUM(quantity) AS total_sold
        FROM order_items
        WHERE status != 'cancelled'
        GROUP BY book_name
        ORDER BY total_sold DESC
        LIMIT 1;
        `;

      db.query(bestSellerBookQuery, (err, bestSellerBook) => {
        if (err) throw err;

        res.render('new_book', {
          data: books,
          totalBooks: totalBooks[0].total_books || 0,
          bestSellerBook: bestSellerBook[0] || null,
          currentPage: 'books',
        });
      });
    });
  });
});
app.get('/api/best_seller_categories', (req, res) => {
  const q = `
    SELECT cate AS category, SUM(quantity) AS total_sold
    FROM order_items
    WHERE status != 'cancelled'
    GROUP BY cate
    ORDER BY total_sold DESC
    LIMIT 5;
  `;
  db.query(q, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Add / Delete Books & Members
app.get('/addNewBook', (req, res) => {
  // not logged in
  if (!req.session.ana) {
    return res.redirect('/login_admin');
  }

  res.render('add_book', {
    currentPage: 'books',
  });
});

app.post('/add_book', upload.single('file_name'), (req, res) => {
  //   console.log(req.file, req.body);
  const { cate, book_name, price, author, descp } = req.body;
  const file_name = req.file ? req.file.filename : null; // get uploaded file name
  if (!file_name) {
    // Handle missing file
    return res.status(400).send('File upload required');
  }
  const query =
    'INSERT INTO books (cate, book_name, price, author, descp, file_name) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [cate, book_name, price, author, descp, file_name], (err) => {
    if (err) throw err;
    res.redirect('/show_books');
  });
});

// update book price
app.post('/updateBook_Price', (req, res) => {
  const { bookId, new_price } = req.body;

  const updateQuery = `
    UPDATE books
    SET price = ?
    WHERE book_id = ?`;

  db.query(updateQuery, [new_price, bookId], (err, result) => {
    if (err) throw err;
    res.redirect('/show_books');
  });
});

app.get('/delProcess', (req, res) => {
  db.query('DELETE FROM members WHERE email = ?', [req.query.em], (err) => {
    if (err) throw err;
    res.redirect('/show_customers');
  });
});

app.get('/del_book', (req, res) => {
  db.query('DELETE FROM books WHERE book_id = ?', [req.query.bookId], (err) => {
    if (err) throw err;
    res.redirect('/show_books');
  });
});

// Order Management
app.get('/orders', (req, res) => {
  if (!req.session.ana) return res.redirect('/login_admin');

  // Auto-update overdue statuses
  const autoUpdate = `
    UPDATE order_items oi 
    JOIN orders o ON oi.order_id = o.order_id
    SET oi.status = 'delivered'
    WHERE oi.status != 'delivered'
      AND o.delivery_date IS NOT NULL
      AND o.delivery_date <= CURDATE()
  `;

  db.query(autoUpdate, (err) => {
    if (err) throw err;

    const orderRecord = `
      SELECT 
        o.order_id,
        oi.id,
        oi.file_name,
        oi.book_name,
        oi.author,
        m.name AS customer,
        oi.quantity,
        o.order_date,
        o.payment_method,
        o.delivery_date,
        oi.status
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN members m ON o.user_email = m.email
      ORDER BY o.order_date DESC
    `;

    db.query(orderRecord, (err, orderRecordResult) => {
      if (err) throw err;

      const orderStats = `
        SELECT
          COUNT(*) AS total_items,
          SUM(status = 'pending') AS pending_count,
          SUM(status = 'shipped') AS shipped_count,
          SUM(status = 'delivered') AS delivered_count,
          SUM(status = 'cancelled') AS cancelled_count
        FROM order_items;
      `;

      db.query(orderStats, (err, statsResult) => {
        if (err) throw err;

        res.render('admin_orders', {
          data: orderRecordResult,
          stats: statsResult[0],
          currentPage: 'orders',
        });
      });
    });
  });
});

// update status od Order item
app.post('/updateOrder_Status', (req, res) => {
  const { order_item_id, status } = req.body;

  const updateQuery = `UPDATE order_items SET status = ?
    WHERE id = ? AND status != 'delivered' AND status !='cancelled'
  `;

  db.query(updateQuery, [status, order_item_id], (err, result) => {
    if (err) throw err;
    res.redirect('/orders');
  });
});

// Show customers requested books
app.get('/show_requestedBooks', (req, res) => {
  // not logged in
  if (!req.session.ana) {
    return res.redirect('/login_admin');
  }

  const showRequestedBooksQuery =
    'SELECT * FROM requested_books ORDER BY created_at DESC';
  const countRequestedBooksQuery =
    'SELECT COUNT(*) AS total FROM requested_books';

  db.query(showRequestedBooksQuery, (err, requestedBooksResult) => {
    if (err) throw err;

    db.query(countRequestedBooksQuery, (err, countRequestedBooksResult) => {
      if (err) throw err;

      res.render('requestedBooks', {
        data: requestedBooksResult,
        totalFeedbacks: countRequestedBooksResult[0].total,
        currentPage: 'request',
      });
    });
  });
});

// Show customers feedback
app.get('/show_feedbacks', (req, res) => {
  // not logged in
  if (!req.session.ana) {
    return res.redirect('/login_admin');
  }

  const showFeedbackQuery = 'SELECT * FROM feedbacks ORDER BY created_at DESC';
  const countFeedbackQuery = 'SELECT COUNT(*) AS total FROM feedbacks';

  db.query(showFeedbackQuery, (err, feedbackResult) => {
    if (err) throw err;

    db.query(countFeedbackQuery, (err, countFeedbackResult) => {
      if (err) throw err;

      res.render('feedback', {
        data: feedbackResult,
        totalFeedbacks: countFeedbackResult[0].total,
        currentPage: 'feedback',
      });
    });
  });
});

/* ------------------------
USER BOOKS ROUTES
------------------------ */
// Show all books
app.get('/books_user', (req, res) => {
  db.query('SELECT * FROM books', (err, books) => {
    if (err) throw err;
    res.render('all_books', {
      data: books,
      user: req.session.uname,
      uEmail: req.session.uemail,
      currentPage: 'books',
    });
  });
});

/* ------------------------
      CATEGORY FILTER ROUTES
------------------------ */

// Utility to render category pages
function renderCategory(req, res, category, view) {
  const query = 'SELECT * FROM books WHERE cate = ?';
  db.query(query, [category], (err, books) => {
    if (err) throw err;
    res.render(view, {
      data: books,
      user: req.session.uname,
      uEmail: req.session.uemail,
      categoryName: category,
      currentPage: 'category',
    });
  });
}

app.get('/personal', (req, res) =>
  renderCategory(req, res, 'Personal Development', 'personal_dev')
);
app.get('/Spirit', (req, res) =>
  renderCategory(req, res, 'Spirituality', 'spirituality')
);
app.get('/Fantasy', (req, res) =>
  renderCategory(req, res, 'Fantasy novel', 'fantasy')
);
app.get('/Bus&Eco', (req, res) =>
  renderCategory(req, res, 'Business & Economics', 'business')
);
app.get('/Biography', (req, res) =>
  renderCategory(req, res, 'Biography', 'biography')
);
app.get('/Philosophy', (req, res) =>
  renderCategory(req, res, 'Philosophy', 'philosophy')
);
app.get('/SciFi', (req, res) => renderCategory(req, res, 'SciFi', 'SciFi'));
app.get('/History', (req, res) =>
  renderCategory(req, res, 'History', 'history')
);
app.get('/Autography', (req, res) =>
  renderCategory(req, res, 'Autography', 'autography')
);
app.get('/Act&dAd', (req, res) =>
  renderCategory(req, res, 'Action and Adventure', 'action')
);
app.get('/Det&My', (req, res) =>
  renderCategory(req, res, 'Detective and Mystery', 'detective')
);
app.get('/Novel', (req, res) => renderCategory(req, res, 'Novel', 'novel'));
app.get('/Science', (req, res) =>
  renderCategory(req, res, 'Science', 'science')
);

/* ------------------------
      Customer Request a book 
------------------------ */
app.get('/wishlist', (req, res) => {
  res.render('wishList', {
    user: req.session.uname,
    uEmail: req.session.uemail,
    currentPage: 'wishlist',
  });
});

/* ------------------------
      Customer Request a book 
------------------------ */
app.post('/requested_book', (req, res) => {
  const { book_name, author } = req.body;
  const userName = req.session.uname;
  const userEmail = req.session.uemail;

  if (!userEmail) {
    return res.redirect('/login');
  }

  const requestQuery =
    'Insert into requested_books (user_name, user_email, book_name, author) values ( ?, ?, ?, ? )';

  db.query(
    requestQuery,
    [userName, userEmail, book_name, author],
    (err, result) => {
      if (err) throw err;
      res.json({ success: true, message: 'Book request saved successfully!' });
    }
  );
});

/* ------------------------
      Customer Feedback 
------------------------ */
app.post('/feedback', (req, res) => {
  const { emotion, feedback_msg } = req.body;
  const userName = req.session.uname;
  const userEmail = req.session.uemail;

  if (!userEmail) {
    return res.redirect('/login');
  }

  const feedbackQuery =
    'Insert into feedbacks (user_name, user_email, emotion, msg) values ( ?, ?, ?, ? )';

  db.query(
    feedbackQuery,
    [userName, userEmail, emotion, feedback_msg],
    (err, result) => {
      if (err) throw err;
      res.json({ success: true, message: 'Feedback saved successfully!' });
    }
  );
});

/* ------------------------
      Apply coupons 
------------------------ */
app.post('/applyCoupon', (req, res) => {
  const userEmail = req.session.uemail; // user must be logged in
  const { promo, subtotal } = req.body;

  const query = `
    SELECT * FROM coupons 
    WHERE code = ? AND status = 'active' 
      AND expiry_date >= CURDATE() 
      AND used_count < usage_limit
  `;

  db.query(query, [promo], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.json({ success: false, message: 'Invalid or expired code' });
    }

    const coupon = result[0];

    // 🔹 Check if first_time_only coupon
    if (coupon.first_time_only) {
      const orderCheckQuery = `SELECT COUNT(*) AS orderCount FROM orders WHERE user_email = ?`;
      db.query(orderCheckQuery, [userEmail], (err, orderResult) => {
        if (err) throw err;

        if (orderResult[0].orderCount > 0) {
          return res.json({
            success: false,
            message: 'This coupon is only for first-time customers.',
          });
        }

        // ✅ Apply discount since user is first-time
        applyDiscountAndRespond(coupon, subtotal, res);
      });
    } else {
      // Normal coupon
      applyDiscountAndRespond(coupon, subtotal, res);
    }
  });
});

// Helper function to calculate and respond
function applyDiscountAndRespond(coupon, subtotal, res) {
  let discount = 0;

  if (coupon.discount_type === 'percentage') {
    discount = (subtotal * coupon.discount_value) / 100;
  } else {
    discount = coupon.discount_value;
  }

  let total = subtotal - discount;
  if (total < 0) total = 0;
  console.log(discount, total);

  res.json({
    success: true,
    message: 'Coupon applied successfully.',
    discount,
    total,
  });
}

/* ------------------------
      CART ROUTES
------------------------ */

// Add to Cart
// Add to Cart with Login Check - Returns JSON
// Add to Cart with Login Check and Quantity Handling
app.get('/store', (req, res) => {
  const { id } = req.query;
  const uName = req.session.uname;
  const uEmail = req.session.uemail;

  // User must be logged in
  if (!uName || !uEmail) {
    return res
      .status(401)
      .json({ success: false, message: 'Login required', redirect: '/login' });
  }

  // Check if the book exists in the database
  db.query('SELECT * FROM books WHERE book_id = ?', [id], (err, books) => {
    if (err) {
      console.error('Error fetching book:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error while fetching the book.',
      });
    }

    if (!books.length) {
      console.log('Book not found');
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    const book = books[0];

    // Now check if this book is already in the cart for this user
    const checkQuery = 'SELECT * FROM cart WHERE book_id = ? AND u_email = ?';
    db.query(checkQuery, [id, uEmail], (err, result) => {
      if (err) {
        console.error('Error checking cart:', err);
        return res.status(500).json({
          success: false,
          message: 'Server error while checking cart.',
        });
      }

      if (result.length > 0) {
        // Book already in cart -> update quantity
        const currentQuantity = result[0].quantity || 1;
        const newQuantity = currentQuantity + 1;

        const updateQuery = 'UPDATE cart SET quantity = ? WHERE cart_id = ?';
        db.query(updateQuery, [newQuantity, result[0].cart_id], (err) => {
          if (err) {
            console.error('Error updating quantity:', err);
            return res.status(500).json({
              success: false,
              message: 'Failed to update cart quantity.',
            });
          }

          console.log(
            `Updated quantity to ${newQuantity} for ${book.book_name}`
          );
          return res.json({
            success: true,
            message: 'Book quantity updated in cart!',
          });
        });
      } else {
        // Book not in cart -> insert new record with quantity = 1
        const insertQuery = `
          INSERT INTO cart (book_id, u_name, u_email, quantity)
          VALUES (?, ?, ?, ?)`;

        db.query(insertQuery, [id, uName, uEmail, 1], (err) => {
          if (err) {
            console.error('Error inserting into cart:', err);
            return res.status(500).json({
              success: false,
              message: 'Error adding book to cart.',
            });
          }

          console.log('Book added to cart successfully!');
          return res.json({
            success: true,
            message: 'Book added to cart successfully!',
          });
        });
      }
    });
  });
});

app.post('/update_quantity', (req, res) => {
  console.log('req.body:', req.body); // <-- ADD THIS LINE
  const { cart_id, quantity } = req.body;

  console.log('Received cart_id:', cart_id, 'and quantity:', quantity);

  if (!cart_id || quantity < 1) {
    return res.status(400).send('Invalid data');
  }

  const updateQuery = 'UPDATE cart SET quantity = ? WHERE cart_id = ?';

  db.query(updateQuery, [quantity, cart_id], (err) => {
    if (err) {
      console.error('Error updating quantity:', err);
      return res.status(500).send('Server error');
    }

    console.log(`Updated cart_id ${cart_id} to quantity ${quantity}`);
    res.json({ success: true, message: 'Quantity updated successfully' });
  });
});

// Show Cart
app.get('/show_cart', (req, res) => {
  const user = req.session.uname;
  const uEmail = req.session.uemail;

  if (!uEmail) {
    return res.redirect('/login');
  }

  const query = `
    SELECT c.cart_id, c.quantity, 
           b.book_id, b.book_name, b.price, b.author, b.cate, b.file_name
    FROM cart c
    JOIN books b ON c.book_id = b.book_id
    WHERE c.u_email = ?
    ORDER BY c.cart_id DESC
  `;

  db.query(query, [uEmail], (err, cart) => {
    if (err) {
      console.error('Error fetching cart:', err);
      return res.status(500).send('Server error');
    }

    const totalSum = Array.isArray(cart)
      ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;

    res.render('cart', {
      data: cart,
      user: user,
      uEmail: uEmail,
      totalSum: totalSum.toFixed(2),
      currentPage: 'cart',
    });
  });
});

// Delete Cart Item
app.get('/del_cart', (req, res) => {
  db.query('DELETE FROM cart WHERE cart_id = ?', [req.query.id], (err) => {
    if (err) throw err;
    res.redirect('show_cart');
  });
});

// Clear Cart
app.get('/all_clear', (req, res) => {
  db.query('DELETE FROM cart WHERE u_email = ?', [req.query.em], (err) => {
    if (err) throw err;
    res.redirect('show_cart');
  });
});

/* ------------------------
      CHECKOUT / ORDER ROUTES
------------------------ */
// Show Checkout Page

// Checkout POST
app.post('/show_checkout', (req, res) => {
  const { totalSum, couponCode, discount } = req.body;

  req.session.checkout = {
    totalSum: parseFloat(totalSum), // always store
    couponCode: couponCode || null, // null if not used
    discount: parseFloat(discount) || 0, // 0 if not used
  };

  res.redirect('/show_checkout');
});

// Checkout GET
app.get('/show_checkout', (req, res) => {
  const checkout = req.session.checkout || {};
  const { totalSum, couponCode, discount } = checkout;

  const user = req.session.uname;
  const userEmail = req.session.uemail;

  if (!userEmail) {
    return res.redirect('/login');
  }

  const checkDetailQuery = 'SELECT * FROM delivery_detail WHERE u_email = ?';
  db.query(checkDetailQuery, [userEmail], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      res.redirect('/place_order');
    } else {
      const cartQuery = `
        SELECT c.cart_id, c.quantity, 
               b.book_id, b.book_name, b.price, b.author, b.file_name
        FROM cart c
        JOIN books b ON c.book_id = b.book_id
        WHERE c.u_email = ?
        ORDER BY c.cart_id DESC
      `;

      db.query(cartQuery, [userEmail], (err, cartResult) => {
        if (err) throw err;
        res.render('checkout', {
          data: cartResult,
          user: user,
          uEmail: userEmail,
          totalSum: totalSum,
          couponCode: couponCode, // ✅ pass along
          discount: discount, // ✅ pass along
          currentPage: 'cart',
        });
      });
    }
  });
});

// Store Delivery Details
app.post('/detailProcess', (req, res) => {
  const userName = req.session.uname;
  const userEmail = req.session.uemail;
  const { mobile, add, city_na, pin, state, country_na } = req.body;

  const insertQuery = `INSERT INTO delivery_detail (u_name, u_email, u_mobileNo, address, city, pin, state, country) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertQuery,
    [userName, userEmail, mobile, add, city_na, pin, state, country_na],
    (err) => {
      if (err) throw err;
      res.redirect('place_order');
    }
  );
});

// Show Order Page
app.get('/place_order', (req, res) => {
  const { totalSum, couponCode, discount } = req.session.checkout || {};
  const user = req.session.uname;
  const userEmail = req.session.uemail;

  if (!userEmail) {
    return res.redirect('/login');
  }

  if (!totalSum) {
    return res.redirect('/show_cart'); // fallback if session expired or empty
  }

  const deliveryQuery = 'SELECT * FROM delivery_detail WHERE u_email = ?';

  db.query(deliveryQuery, [userEmail], (err, deliveryResult) => {
    if (err) throw err;
    const cartQuery = `
            SELECT c.cart_id, c.quantity, 
                b.book_id, b.book_name, b.price, b.author, b.file_name
            FROM cart c
            JOIN books b ON c.book_id = b.book_id
            WHERE c.u_email = ?
            ORDER BY c.cart_id DESC
        `;

    db.query(cartQuery, [userEmail], (err, cartResult) => {
      if (err) throw err;
      res.render('order', {
        data: { deliveryDetails: deliveryResult, cartItems: cartResult },
        user: user,
        uEmail: userEmail,
        totalSum: totalSum,
        currentPage: 'cart',
      });
    });
  });
});

// Update Delivery Details
app.get('/update_detail', (req, res) => {
  const { totalSum, couponCode, discount } = req.session.checkout || {};
  const user = req.session.uname;
  const userEmail = req.session.uemail;

  if (!userEmail) {
    return res.redirect('/login');
  }

  if (!totalSum) {
    return res.redirect('/cart'); // fallback if session expired or empty
  }

  const cartQuery = `
            SELECT c.cart_id, c.quantity, 
                b.book_id, b.book_name, b.price, b.author, b.file_name
            FROM cart c
            JOIN books b ON c.book_id = b.book_id
            WHERE c.u_email = ?
            ORDER BY c.cart_id DESC
        `;

  db.query(cartQuery, [userEmail], (err, cartResult) => {
    if (err) throw err;
    res.render('upd_detail', {
      data: { cartItems: cartResult },
      user: user,
      uEmail: userEmail,
      totalSum: totalSum,
      currentPage: 'cart',
    });
  });
});

app.post('/updateDeliveryDetails', (req, res) => {
  const userEmail = req.session.uemail;
  const userName = req.session.uname;
  const { mobile, address, city, pin, state, country } = req.body;

  const updateQuery = `UPDATE delivery_detail 
                         SET u_name = ?, u_mobileNo = ?, address = ?, city = ?, pin = ?, state = ?, country = ? 
                         WHERE u_email = ?`;

  db.query(
    updateQuery,
    [userName, mobile, address, city, pin, state, country, userEmail],
    (err) => {
      if (err) throw err;
      res.redirect('place_order');
    }
  );
});

// Process Order
app.post('/orderProcess', (req, res) => {
  const { couponCode, discount } = req.session.checkout || {};
  const { deliveryDate, note, paymentMethod, totalAmount } = req.body;
  const userEmail = req.session.uemail;

  const getDeliveryIdQuery =
    'SELECT delivery_id FROM delivery_detail WHERE u_email = ?';
  db.query(getDeliveryIdQuery, [userEmail], (err, deliveryResult) => {
    if (err) throw err;
    const deliveryId = deliveryResult[0].delivery_id;

    const insertOrderQuery = `INSERT INTO orders (user_email, total_amount, coupon_code, discount, payment_method, delivery_id, delivery_date, delivery_note) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      insertOrderQuery,
      [
        userEmail,
        totalAmount,
        couponCode,
        discount,
        paymentMethod,
        deliveryId,
        deliveryDate,
        note,
      ],
      (err, insertResult) => {
        if (err) throw err;

        const newOrderId = insertResult.insertId;

        // Step 3: fetch items from cart (JOIN with books for details)
        const cartQuery = `
          SELECT c.quantity, 
                b.book_name, b.author, b.file_name, b.cate, b.price
          FROM cart c
          JOIN books b ON c.book_id = b.book_id
          WHERE c.u_email = ?
        `;

        db.query(cartQuery, [userEmail], (err, cartItems) => {
          if (err) throw err;

          if (cartItems.length === 0) {
            // no items, just redirect
            return res.redirect(`/order_placed/${newOrderId}`);
          }

          // Step 4: prepare data for order_items
          const orderItemsData = cartItems.map((item) => [
            newOrderId,
            userEmail,
            item.book_name,
            item.author,
            item.file_name,
            item.cate,
            item.quantity,
            item.price,
            'pending', // default status
          ]);

          // insert items into order_items
          const insertOrderItemsQuery = `
            INSERT INTO order_items 
              (order_id, u_email, book_name, author, file_name, cate, quantity, price, status)
            VALUES ?
          `;
          db.query(insertOrderItemsQuery, [orderItemsData], (err) => {
            if (err) throw err;

            // Step 5: clear the cart
            const emptyCartQuery = 'DELETE FROM cart WHERE u_email = ?';
            db.query(emptyCartQuery, [userEmail], (err) => {
              if (err) throw err;
              res.redirect(`/order_placed/${newOrderId}`);
            });
          });
        });
      }
    );
  });
});

app.get('/order_placed/:orderId', (req, res) => {
  const userName = req.session.uname;
  const userEmail = req.session.uemail;
  const orderId = req.params.orderId;

  if (!userEmail) {
    return res.status(401).send('Unauthorized: No session found');
  }

  const getOrderSummary = `
    SELECT 
      o.total_amount, 
      o.delivery_date, 
      SUM(oi.quantity) AS total_items
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    WHERE o.order_id = ? AND o.user_email = ?
    GROUP BY o.total_amount, o.delivery_date
  `;

  db.query(getOrderSummary, [orderId, userEmail], (err, orderResult) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (orderResult.length === 0) {
      return res.status(404).send('Order not found');
    }

    const {
      delivery_date: deliveryDate,
      total_amount: totalAmount,
      total_items: totalItems,
    } = orderResult[0];

    res.render('order_placed', {
      userName,
      deliveryDate,
      totalAmount,
      totalItems,
    });
  });
});

// Show Orders
app.get('/show_orders', (req, res) => {
  const userEmail = req.session.uemail;
  if (!userEmail) {
    return res.redirect('/login');
  }

  // Step 1: Get orders + delivery details
  const ordersQuery = `
    SELECT o.*, d.u_name, d.u_mobileNo, d.address, d.city, d.pin, d.state, d.country
    FROM orders o
    LEFT JOIN delivery_detail d ON o.delivery_id = d.delivery_id
    WHERE o.user_email = ?
    ORDER BY o.order_date DESC
  `;

  db.query(ordersQuery, [userEmail], (err, orders) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).send('Server error');
    }

    // Step 2: Handle "no orders" case
    if (orders.length === 0) {
      return res.render('show_orders', {
        orders: [],
        currentPage: 'orders',
      });
    }

    // Step 3: Fetch all order items for this user
    const itemsQuery = `SELECT * FROM order_items WHERE u_email = ? AND status != 'Cancelled'`;
    db.query(itemsQuery, [userEmail], (err, allItems) => {
      if (err) {
        console.error('Error fetching cart items:', err);
        return res.status(500).send('Server error');
      }

      // Step 4: Group items by order_id
      const itemsByOrderId = allItems.reduce((acc, item) => {
        if (!acc[item.order_id]) {
          acc[item.order_id] = [];
        }
        acc[item.order_id].push(item);
        return acc;
      }, {});

      // Step 5: Attach items to each order
      const ordersWithItems = orders.map((order) => ({
        ...order,
        items: itemsByOrderId[order.order_id] || [],
      }));

      // Step 6: Render with delivery details included
      res.render('show_orders', {
        orders: ordersWithItems,
        currentPage: 'orders',
      });
    });
  });
});

// Cancel Order
app.get('/cancel_order', (req, res) => {
  const orderId = req.query.orderItemId;
  const userEmail = req.session.uemail;

  const updateCancelQuery = `UPDATE order_items SET status = 'Cancelled' WHERE id = ? AND u_email = ?`;

  db.query(updateCancelQuery, [orderId, userEmail], (err) => {
    if (err) throw err;
    res.redirect('show_orders');
  });
});

/* ------------------------
      UTILITY FUNCTIONS
------------------------ */

function renderPage(res, pageName) {
  res.render('landing', {
    user: res.locals.user,
    uEmail: res.locals.uEmail,
    currentPage: pageName,
  });
}

// ==============================
// Start Server
// ==============================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
