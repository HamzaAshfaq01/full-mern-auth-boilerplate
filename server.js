require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Load routes
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');

// Use Routes
app.use('/api', authRouter);
app.use('/api', userRouter);

app.use((req, res) => {
	res.status(404).json({
		success: false,
		msg: 'Page not founded',
	});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
